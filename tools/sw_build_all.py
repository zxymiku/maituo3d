#!/usr/bin/env python3
"""
太阳能小车 (R5 四轮同轴全向舵轮版) — SolidWorks 自动化 1:1 建模脚本
====================================================================
基于 `.skills/solidworks-automation` 技能脚本重写（旧版脚本 API 调用有误无法运行）。

数据源（唯一真源）:
    solar-car-r5/docs/完整尺寸数据.json  —— 106 种零件 / 267 个装配实例 / 246 个特征。

与网页建模 (tools/mesh_builder.py, solar-car-r5/index.html) 保持一致的约定:
  1. 零件文件名 1:1 对应网页零件名: `solidworks/<零件名>.SLDPRT`。
  2. 网页坐标即 SolidWorks 全局坐标（Z 向上，X 车长，Y 车宽），通过
     `map_plane_to_3d` 定义的基准面映射换算（映射方向已用 tools/sw_probe_planes.py
     在 SolidWorks 2024 中实证校准）:
       网页 "XY" -> SW 前视基准面(Front Plane),  草图 (u,  v), 法向 w -> 全局 Z
       网页 "XZ" -> SW 上视基准面(Top Plane),    草图 (u, -v), 法向 w -> 全局 Y
       网页 "YZ" -> SW 右视基准面(Right Plane),  草图 (-v, u), 法向 w -> 全局 X
  3. 拉伸体素区间 [w0, w1]: 实证 (SW2024) `direction=False`（沿 +法向）且
     `start_offset=s, depth=d` 时材料区间为 [s, s+d]，故统一使用
     start_offset=w0, depth=w1-w0。
  3b. IModelDoc2::GetPartBox 返回文档长度单位值（本机默认模板为 mm），
     包围盒验收做 mm/m 单位歧义消解后再比较。
  4. 草图轮廓:
       circle            -> 原生草图圆（半径 = 网孔 r）
       rect(无圆角)       -> 原生中心矩形
       rect(带圆角)       -> 4 直线 + 4 相切圆弧（真实圆角半径 = fillet；
                            网页网格为该圆角的弦线近似）
       gear/cam/geneva   -> 与网页 `make_gear_loop` / `make_cam_loop` /
                            `make_geneva_loop` 完全相同的离散点折线
  5. 草图完全定义:
       实体数 <= FULL_DEFINE_MAX_ENTITIES 时走技能官方 `FullyDefineSketch`
       (1023 关系掩码 + 原点基准，不含 Fix)；
       离散数据轮廓 (齿轮/凸轮/槽轮折线) 与官方完全定义失败的草图按数据点
       Fix 固定（离散廓线本身就是数据定义，无设计参数可标注），并回读
       GetConstrainedStatus == 3 (swSketchFullyDefined) 验收。
  6. 装配体: 267 个实例按网页 placement.position 平移放置（网页全部实例旋转
     均为 (0,0,0)）。实证 (SW2024 SP5, 本机): AddComponent5 将组件的
     “包围盒中心”放置在 (x,y,z) 而非文档所述的零件原点，故运行时先用一个
     不对称零件试放标定本机语义 (calibrate_placement_mode)，若为 bbox_center
     则按 (位置 - 局部包围盒中心) 补偿传入，使零件原点精确落在网页位置。
  7. 内存策略: 按零件文件分组添加实例，每组建完立即关闭源文档，避免 106 个
     零件文档同时驻留内存触发 SolidWorks 低内存保护对话框。
  7. 齿轮零件内孔大于外圆的两处规格异常 (P46-F02 / G16-F02)，网页网格实际
     渲染为内孔轮廓 (Φ10 盘)，本脚本按该有效轮廓建模并在审计中记录。

用法:
    python tools/sw_build_all.py --dry-run                # 纯 Python 预检
    python tools/sw_build_all.py --build-all              # 生成全部 106 零件
    python tools/sw_build_all.py --build-all --with-assembly
    python tools/sw_build_all.py --part P01               # 单件试制
"""

from __future__ import annotations

import argparse
import json
import math
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Tuple

ROOT = Path(__file__).resolve().parents[1]
SKILL_SCRIPTS_DIR = ROOT / ".skills" / "solidworks-automation" / "scripts"
TOOLS_DIR = ROOT / "tools"
SPEC_JSON_PATH = ROOT / "solar-car-r5" / "docs" / "完整尺寸数据.json"

for _p in (SKILL_SCRIPTS_DIR, TOOLS_DIR):
    if str(_p) not in sys.path:
        sys.path.insert(0, str(_p))

from mesh_builder import (  # noqa: E402
    ensure_ccw,
    ensure_cw,
    make_cam_loop,
    make_circle_loop,
    make_gear_loop,
    make_geneva_loop,
    make_rect_loop,
    merge_holes_into_outer,
)

MM = 1.0 / 1000.0  # 毫米 -> 米
FULL_DEFINE_MAX_ENTITIES = 48  # 超过该实体数的离散轮廓走 Fix 数据点路线
BBOX_TOL_MM = 0.05             # 包围盒验收容差 (mm)

# 网页基准面 -> (SW 基准面英文名, SW 基准面中文名, 草图坐标变换)
# 变换: 网页 (u, v) -> SW 草图 (su, sv)。已由 tools/sw_probe_planes.py 实证校准。
PLANE_MAP = {
    "XY": ("Front Plane", "前视基准面", lambda u, v: (u, v)),
    "XZ": ("Top Plane", "上视基准面", lambda u, v: (u, -v)),
    "YZ": ("Right Plane", "右视基准面", lambda u, v: (-v, u)),
}


def mm(value: float) -> float:
    return float(value) * MM


# ---------------------------------------------------------------------------
# 数据加载与 Python 侧几何预检
# ---------------------------------------------------------------------------

def load_car_spec() -> Dict[str, object]:
    if not SPEC_JSON_PATH.exists():
        raise FileNotFoundError(f"缺少数据源: {SPEC_JSON_PATH}")
    return json.loads(SPEC_JSON_PATH.read_text(encoding="utf-8"))


def outer_loop_of(feat: Dict[str, object]) -> List[Tuple[float, float]]:
    p = feat["params"]
    shape = feat["shape"]
    if shape == "rect":
        return make_rect_loop(
            float(p["cx"]), float(p["cy"]), float(p["w"]), float(p["h"]), float(p.get("fillet", 0.0))
        )
    if shape == "circle":
        return make_circle_loop(float(p["cx"]), float(p["cy"]), float(p["r"]), 36)
    if shape == "gear":
        return make_gear_loop(float(p["module"]), int(p["teeth"]))
    if shape == "cam":
        return make_cam_loop(float(p["base_r"]), float(p["stroke"]), 96)
    if shape == "geneva":
        return make_geneva_loop(
            float(p.get("outer_r", 14.0)), int(p.get("slots", 4)), float(p.get("slot_depth", 5.5))
        )
    raise ValueError(f"未知特征形状: {shape}")


def hole_loop_of(hole: Dict[str, object]) -> List[Tuple[float, float]]:
    if hole["shape"] == "circle":
        return make_circle_loop(float(hole["cx"]), float(hole["cy"]), float(hole["r"]), 24)
    if hole["shape"] == "rect":
        return make_rect_loop(
            float(hole["cx"]), float(hole["cy"]), float(hole["w"]), float(hole["h"]), float(hole.get("fillet", 0.0))
        )
    raise ValueError(f"未知孔形状: {hole['shape']}")


def point_in_polygon(pt: Tuple[float, float], poly: Sequence[Tuple[float, float]]) -> bool:
    x, y = pt
    n = len(poly)
    inside = False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]
        xj, yj = poly[j]
        if (yi > y) != (yj > y):
            x_cross = (xj - xi) * (y - yi) / (yj - yi) + xi
            if x < x_cross:
                inside = not inside
        j = i
    return inside


def _seg_point_distance(pt: Tuple[float, float], a: Tuple[float, float], b: Tuple[float, float]) -> float:
    ax, ay = a
    bx, by = b
    px, py = pt
    dx, dy = bx - ax, by - ay
    l2 = dx * dx + dy * dy
    if l2 <= 1e-20:
        return math.hypot(px - ax, py - ay)
    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / l2))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def _min_distance_to_loop(pt: Tuple[float, float], loop: Sequence[Tuple[float, float]]) -> float:
    n = len(loop)
    return min(_seg_point_distance(pt, loop[i], loop[(i + 1) % n]) for i in range(n))


def effective_profile(
    feat: Dict[str, object],
) -> Tuple[Tuple[str, Dict[str, object], List[Tuple[float, float]]], List[Tuple[str, Dict[str, object], List[Tuple[float, float]]]], List[Dict[str, object]], str]:
    """返回 ((外轮廓kind, params, loop), [(保留孔kind, params, loop)...], [切除孔...], 备注)。

    kind: "circle" | "rect" | "polyline"。
    特殊情形处理（均与网页网格渲染结果对齐）:
      1. 内孔完全包含外圆 (P46-F02/G16-F02): 网页 keyhole 桥接渲染出的
         有效轮廓 = 孔轮廓，故有效外轮廓 = 该孔轮廓。
      2. 内孔接触/穿越外轮廓边界 (P29-F01 U型叉架): SolidWorks 无法拉伸
         重合/键孔轮廓，改为独立切除特征 (cut-extrude) 实现，几何结果与
         网页网格一致 (开放的 U 形槽)。"""
    outer_loop = ensure_ccw(outer_loop_of(feat))
    shape = str(feat["shape"])
    if shape in ("circle", "rect"):
        outer: Tuple[str, Dict[str, object], List[Tuple[float, float]]] = (shape, dict(feat["params"]), outer_loop)
    else:
        outer = ("polyline", {}, outer_loop)
    note = ""
    kept: List[Tuple[str, Dict[str, object], List[Tuple[float, float]]]] = []
    cut_holes: List[Dict[str, object]] = []
    for idx, hole in enumerate(feat.get("holes", [])):
        hole_loop = ensure_ccw(hole_loop_of(hole))
        strictly_inside = all(point_in_polygon(pt, outer_loop) for pt in hole_loop) and min(
            _min_distance_to_loop(pt, outer_loop) for pt in hole_loop
        ) > 0.02
        if strictly_inside:
            kept.append((str(hole["shape"]) if str(hole["shape"]) in ("circle", "rect") else "polyline", dict(hole), hole_loop))
            continue
        if all(point_in_polygon(pt, hole_loop) for pt in outer_loop):
            # 外轮廓完全位于孔内: 网页渲染出的有效轮廓 = 孔轮廓
            outer = ("polyline", {}, hole_loop)
            note = f"hole#{idx} fully contains outer; effective profile = hole outline (matches web mesh)"
        else:
            # 孔接触/穿越外轮廓: 独立切除特征 (与网页开槽结果一致)
            cut_holes.append(dict(hole))
    if cut_holes:
        note = (note + "; " if note else "") + (
            f"{len(cut_holes)} touching/crossing hole(s) modeled as separate cut-extrude feature(s)"
        )
    return outer, kept, cut_holes, note


def expected_part_bbox(part: Dict[str, object]) -> Tuple[List[float], List[float]]:
    """按网页映射规则计算零件局部坐标包围盒 (mm)。"""
    lo = [math.inf] * 3
    hi = [-math.inf] * 3

    def acc(plane: str, u: float, v: float, w: float) -> None:
        if plane == "XY":
            g = (u, v, w)
        elif plane == "XZ":
            g = (u, w, v)
        elif plane == "YZ":
            g = (w, u, v)
        else:
            raise ValueError(plane)
        for k in range(3):
            lo[k] = min(lo[k], g[k])
            hi[k] = max(hi[k], g[k])

    for feat in part["features"]:
        plane = str(feat["plane"])
        w0, w1 = float(feat["w0"]), float(feat["w1"])
        outer, holes, _cut_holes, _ = effective_profile(feat)
        for _kind, _params, loop in [outer] + holes:
            for u, v in loop:
                acc(plane, u, v, w0)
                acc(plane, u, v, w1)
        for hole in _cut_holes:
            for u, v in hole_loop_of(hole):
                acc(plane, u, v, w0)
                acc(plane, u, v, w1)
    return lo, hi


def validate_spec_python(spec: Dict[str, object]) -> List[str]:
    problems: List[str] = []
    parts: List[Dict[str, object]] = spec["parts"]  # type: ignore[assignment]
    seen = set()
    for part in parts:
        name = str(part["name"])
        if name in seen:
            problems.append(f"重复零件名: {name}")
        seen.add(name)
        if str(part["solidworksFile"]) != f"{name}.SLDPRT":
            problems.append(f"文件名不 1:1: {name} vs {part['solidworksFile']}")
        if len(outer_loop_of(part["features"][0])) < 3:
            problems.append(f"{part['id']} 外轮廓顶点不足")
        for feat in part["features"]:
            w0, w1 = float(feat["w0"]), float(feat["w1"])
            if w1 <= w0:
                problems.append(f"{feat['id']} 区间异常 w1<=w0")
            outer, holes, _cut_holes, _ = effective_profile(feat)
            _kind, _params, outer_loop = outer
            for hi_idx, (_hk, _hp, hole_loop) in enumerate(holes):
                if not all(point_in_polygon(pt, outer_loop) for pt in hole_loop):
                    problems.append(f"{feat['id']} hole#{hi_idx} 未完全位于外轮廓内（拉伸会失败）")
    return problems


# ---------------------------------------------------------------------------
# SolidWorks 技能模块加载
# ---------------------------------------------------------------------------

def load_sw_skill_modules() -> Dict[str, object]:
    from sw_appearance import set_document_appearance  # noqa: F401
    from sw_assembly import add_component, collect_mate_feature_summary, resolve_component
    from sw_connect import create_empty_dispatch_variant
    from sw_part import (
        end_sketch,
        extrude_boss,
        extrude_cut,
        sketch,
        sketch_arc,
        sketch_circle,
        sketch_line,
        sketch_rectangle,
        start_sketch,
    )
    from sw_review import run_review
    from sw_session import SolidWorksSession
    from sw_sketch_quality import fully_define_sketch, inspect_model_sketches, inspect_sketch

    return {
        "SolidWorksSession": SolidWorksSession,
        "sketch": sketch,
        "start_sketch": start_sketch,
        "end_sketch": end_sketch,
        "sketch_line": sketch_line,
        "sketch_rectangle": sketch_rectangle,
        "sketch_circle": sketch_circle,
        "sketch_arc": sketch_arc,
        "extrude_boss": extrude_boss,
        "extrude_cut": extrude_cut,
        "fully_define_sketch": fully_define_sketch,
        "inspect_model_sketches": inspect_model_sketches,
        "inspect_sketch": inspect_sketch,
        "set_document_appearance": set_document_appearance,
        "run_review": run_review,
        "add_component": add_component,
        "resolve_component": resolve_component,
        "collect_mate_feature_summary": collect_mate_feature_summary,
        "create_empty_dispatch_variant": create_empty_dispatch_variant,
    }


# ---------------------------------------------------------------------------
# 草图绘制（网页轮廓 -> SW 草图实体）
# ---------------------------------------------------------------------------

def _sketch_circle_at(model, cx_mm: float, cy_mm: float, r_mm: float) -> List[object]:
    sw_circle = SK["sketch_circle"]
    obj = sw_circle(model, mm(cx_mm), mm(cy_mm), mm(r_mm))
    if obj is None:
        raise RuntimeError(f"草图圆创建失败 ({cx_mm},{cy_mm},r{r_mm})")
    return [obj]


def _sketch_rect_plain(model, cx_mm: float, cy_mm: float, w_mm: float, h_mm: float) -> List[object]:
    sw_rect = SK["sketch_rectangle"]  # 中心点 + 宽高（米）
    obj = sw_rect(model, mm(cx_mm), mm(cy_mm), mm(w_mm), mm(h_mm))
    if obj is None:
        raise RuntimeError(f"草图矩形创建失败 ({cx_mm},{cy_mm},{w_mm}x{h_mm})")
    return [obj]


def _sketch_line_seg(model, p1_mm: Tuple[float, float], p2_mm: Tuple[float, float]) -> object:
    obj = SK["sketch_line"](model, mm(p1_mm[0]), mm(p1_mm[1]), mm(p2_mm[0]), mm(p2_mm[1]))
    if obj is None:
        raise RuntimeError(f"草图直线创建失败 {p1_mm}->{p2_mm}")
    return obj


def _sketch_rect_fillet(model, cx_mm: float, cy_mm: float, w_mm: float, h_mm: float, fillet_mm: float) -> List[object]:
    """带圆角矩形: 4 直线 + 4 圆弧，端点精确共享并显式添加相切关系。返回 COM 对象列表。"""
    hw, hh = 0.5 * w_mm, 0.5 * h_mm
    r = min(max(0.0, fillet_mm), hw * 0.45, hh * 0.45)  # 与 mesh_builder.make_rect_loop 相同的圆角钳制
    if r <= 1e-9:
        return _sketch_rect_plain(model, cx_mm, cy_mm, w_mm, h_mm)

    # 与 make_rect_loop 相同的四角定义: (圆心偏移, 起始角, 终止角)
    corners = [
        (hw - r, hh - r, 0.0, 0.5 * math.pi),
        (-(hw - r), hh - r, 0.5 * math.pi, math.pi),
        (-(hw - r), -(hh - r), math.pi, 1.5 * math.pi),
        (hw - r, -(hh - r), 1.5 * math.pi, 2.0 * math.pi),
    ]
    arc_objs = []  # (起点, 终点, COM对象)
    for ox, oy, a0, a1 in corners:
        center = (cx_mm + ox, cy_mm + oy)
        p_start, p_end = (center[0] + r * math.cos(a0), center[1] + r * math.sin(a0)), (
            center[0] + r * math.cos(a1),
            center[1] + r * math.sin(a1),
        )
        arc = SK["sketch_arc"](model, mm(center[0]), mm(center[1]), mm(p_start[0]), mm(p_start[1]), mm(p_end[0]), mm(p_end[1]), 1)
        if arc is None:
            raise RuntimeError(f"草图圆弧创建失败 c={center} r={r}")
        arc_objs.append((p_start, p_end, arc))
    line_objs = []
    for i in range(4):
        p1 = arc_objs[i][1]
        p2 = arc_objs[(i + 1) % 4][0]
        line = SK["sketch_line"](model, mm(p1[0]), mm(p1[1]), mm(p2[0]), mm(p2[1]))
        if line is None:
            raise RuntimeError(f"草图直线创建失败 {p1}->{p2}")
        line_objs.append(line)
    # 相切关系: line[i] 两端分别与 arc[i]、arc[i+1] 相切（AddToDB=True 无自动推理）
    _add_tangent_pairs(model, [(line_objs[i], arc_objs[i][2], arc_objs[(i + 1) % 4][2]) for i in range(4)])
    return line_objs + [a[2] for a in arc_objs]


def _add_tangent_pairs(model, pairs: Sequence[Tuple[object, object, object]]) -> None:
    """为 (line, arc_a, arc_b) 组合添加 line-arc 相切关系。"""
    callout = SK["create_empty_dispatch_variant"]()
    added = 0
    for line, arc_a, arc_b in pairs:
        for arc in (arc_a, arc_b):
            try:
                model.ClearSelection2(True)
                if arc.Select4(False, callout) and line.Select4(True, callout):
                    model.SketchAddConstraints("sgTANGENT")
                    added += 1
            except Exception:
                pass
    try:
        model.ClearSelection2(True)
    except Exception:
        pass
    return added


def _sketch_polyline(model, pts_mm: Sequence[Tuple[float, float]]) -> List[object]:
    n = len(pts_mm)
    objs = []
    for i in range(n):
        p1 = pts_mm[i]
        p2 = pts_mm[(i + 1) % n]
        objs.append(_sketch_line_seg(model, p1, p2))
    return objs


def transform_point(plane: str, u: float, v: float) -> Tuple[float, float]:
    return PLANE_MAP[plane][2](u, v)


def transform_loop(plane: str, loop: Sequence[Tuple[float, float]]) -> List[Tuple[float, float]]:
    return [PLANE_MAP[plane][2](u, v) for u, v in loop]


def rect_draw_extents(plane: str, w: float, h: float) -> Tuple[float, float]:
    """矩形在 SW 草图坐标系中的 (宽, 高)。
    YZ 变换 (u,v)->(-v,u) 交换草图轴: u 方向尺寸(w)落在 sv, v 方向尺寸(h)落在 su。"""
    if plane == "YZ":
        return h, w
    return w, h


def draw_profile(model, plane: str, kind: str, params: Dict[str, object], loop: Sequence[Tuple[float, float]]) -> List[object]:
    """在活动草图中绘制一个闭合轮廓（自动套用网页->SW 基准面坐标变换）。返回 COM 对象列表。"""
    if kind == "circle":
        cu, cv = transform_point(plane, float(params["cx"]), float(params["cy"]))
        return _sketch_circle_at(model, cu, cv, float(params["r"]))
    if kind == "rect":
        cu, cv = transform_point(plane, float(params["cx"]), float(params["cy"]))
        w_draw, h_draw = rect_draw_extents(plane, float(params["w"]), float(params["h"]))
        fillet = float(params.get("fillet", 0.0))
        if fillet <= 1e-9:
            return _sketch_rect_plain(model, cu, cv, w_draw, h_draw)
        return _sketch_rect_fillet(model, cu, cv, w_draw, h_draw, fillet)
    return _sketch_polyline(model, transform_loop(plane, loop))


# ---------------------------------------------------------------------------
# 草图完全定义
# ---------------------------------------------------------------------------

def fix_all_sketch_entities(model, entities) -> Dict[str, object]:
    """离散数据轮廓: 将全部草图实体按数据点固定，回读约束状态验收。"""
    active = model.SketchManager.ActiveSketch
    if active is None:
        return {"status": "blocked", "reason": "no active sketch"}
    callout = SK["create_empty_dispatch_variant"]()
    model.ClearSelection2(True)
    # 快路径: 全选后一次添加 Fix
    all_selected = True
    for seg in entities:
        try:
            if not seg.Select4(True, callout):
                all_selected = False
                break
        except Exception:
            all_selected = False
            break
    if all_selected and entities:
        try:
            model.SketchAddConstraints("sgFIXED")
            model.ClearSelection2(True)
            record = SK["inspect_sketch"](active)
            if record.get("constrained_status") == 3:
                record.update({"method": "fix_all_selected", "entity_count": len(entities)})
                return record
        except Exception:
            model.ClearSelection2(True)
    # 慢路径: 逐个实体 Fix
    model.ClearSelection2(True)
    fixed = 0
    for seg in entities:
        try:
            if seg.Select4(False, callout):
                model.SketchAddConstraints("sgFIXED")
                fixed += 1
        except Exception:
            pass
        finally:
            model.ClearSelection2(True)
    record = SK["inspect_sketch"](active)
    record.update({"method": "fix_per_entity", "entity_count": len(entities), "fixed": fixed})
    return record


def fully_define_feature_sketch(model, entities) -> Dict[str, object]:
    """草图完全定义: 优先官方 FullyDefineSketch，离散轮廓/失败回退 Fix 数据点。"""
    entity_count = len(entities)
    if entity_count <= FULL_DEFINE_MAX_ENTITIES:
        try:
            record = SK["fully_define_sketch"](model)  # 成功即 constrained_status==3 且无 Fix
            record["method"] = "FullyDefineSketch"
            return record
        except Exception as exc:
            record = fix_all_sketch_entities(model, entities)
            record["method"] = f"FullyDefineSketch_failed_then_{record.get('method')}"
            record["fully_define_error"] = str(exc)
            return record
    record = fix_all_sketch_entities(model, entities)
    record["method"] = f"fix_profile_data_points({record.get('method')})"
    return record


# ---------------------------------------------------------------------------
# 特征创建
# ---------------------------------------------------------------------------

def _extrude_with_fallback(model, sketch_ref, depth_m: float, w0_m: float, merge: bool, feat_id: str):
    """拉伸凸台 (实证: direction=False 沿 +法向, start_offset=s 时材料区间 [s, s+depth])。"""
    feature = None
    attempt_errors = []
    for attempt_merge in (merge, False):
        try:
            feature = SK["extrude_boss"](model, sketch_ref, depth_m, direction=False, merge=attempt_merge, start_offset=w0_m)
        except Exception as exc:
            attempt_errors.append(str(exc))
            feature = None
        if feature is not None:
            break
    if feature is None:
        raise RuntimeError(f"拉伸失败 {feat_id}: {attempt_errors}")
    return feature


def _draw_cut_hole_and_cut(model, plane: str, hole: Dict[str, object], cut_depth_m: float, feat_id: str) -> Dict[str, object]:
    """为接触/穿越外轮廓的孔建立独立切除特征 (贯穿整个零件)。"""
    kind = str(hole["shape"])
    params = dict(hole)
    loop = hole_loop_of(hole)
    plane_name = PLANE_MAP[plane][0]
    with SK["sketch"](model, plane_name) as cut_sketch_ref:
        manager = model.SketchManager
        old_add_to_db = old_display = None
        try:
            old_add_to_db = bool(manager.AddToDB)
            old_display = bool(manager.DisplayWhenAdded)
            manager.AddToDB = True
            manager.DisplayWhenAdded = False
        except Exception:
            old_add_to_db = None
        try:
            entities = draw_profile(model, plane, kind if kind in ("circle", "rect") else "polyline", params, loop)
        finally:
            try:
                if old_add_to_db is not None:
                    manager.AddToDB = old_add_to_db
                    manager.DisplayWhenAdded = old_display
            except Exception:
                pass
        define_record = fully_define_feature_sketch(model, entities)
    # 贯穿切除: depth=0 时技能封装使用 swEndCondThroughAll
    cut_feat = None
    cut_errors = []
    for direction in (True, False):
        try:
            cut_feat = SK["extrude_cut"](model, cut_sketch_ref, 0.0, direction=direction)
        except Exception as exc:
            cut_errors.append(str(exc))
            cut_feat = None
        if cut_feat is not None:
            break
    if cut_feat is None:
        raise RuntimeError(f"切除失败 {feat_id}: {cut_errors}")
    return {"cut": cut_feat, "define": define_record, "entities": len(entities)}


def build_feature(session, model, feat: Dict[str, object], merge: bool) -> Dict[str, object]:
    plane = str(feat["plane"])
    w0, w1 = float(feat["w0"]), float(feat["w1"])
    depth = w1 - w0
    outer, holes, cut_holes, profile_note = effective_profile(feat)
    outer_kind, outer_params, outer_loop = outer

    sw_sketch = SK["sketch"]
    plane_name = PLANE_MAP[plane][0]  # sketch()/start_sketch() 内部自选中英文基准面候选
    with sw_sketch(model, plane_name) as sketch_ref:
        manager = model.SketchManager
        old_add_to_db = old_display = None
        try:
            old_add_to_db = bool(manager.AddToDB)
            old_display = bool(manager.DisplayWhenAdded)
            manager.AddToDB = True
            manager.DisplayWhenAdded = False
        except Exception:
            old_add_to_db = None
        try:
            sketch_entities: List[object] = []
            sketch_entities.extend(draw_profile(model, plane, outer_kind, outer_params, outer_loop))
            for kind, params, loop in holes:
                sketch_entities.extend(draw_profile(model, plane, kind, params, loop))
        finally:
            try:
                if old_add_to_db is not None:
                    manager.AddToDB = old_add_to_db
                    manager.DisplayWhenAdded = old_display
            except Exception:
                pass
        define_record = fully_define_feature_sketch(model, sketch_entities)
    feature = _extrude_with_fallback(model, sketch_ref, mm(depth), mm(w0), merge, feat["id"])

    cut_records = []
    for ci, hole in enumerate(cut_holes):
        cut_records.append(_draw_cut_hole_and_cut(model, plane, hole, depth, f"{feat['id']}-cut{ci}"))

    return {
        "feature": feature,
        "define": define_record,
        "note": profile_note,
        "entities": len(sketch_entities),
        "cuts": cut_records,
    }


# ---------------------------------------------------------------------------
# 单个零件构建
# ---------------------------------------------------------------------------

def build_single_part(session, part: Dict[str, object], output_dir: Path, preview_root: Path, with_previews: bool) -> Dict[str, object]:
    part_name = str(part["name"])
    out_path = output_dir / str(part["solidworksFile"])
    out_path.parent.mkdir(parents=True, exist_ok=True)

    model = session.new_part()
    feature_records = []
    for idx, feat in enumerate(part["features"]):
        rec = build_feature(session, model, feat, merge=(idx > 0))
        entry = {
            "id": feat["id"],
            "name": feat["name"],
            "plane": feat["plane"],
            "spanMm": [feat["w0"], feat["w1"]],
            "sketchEntities": rec["entities"],
            "fullyDefined": rec["define"].get("constrained_status") == 3,
            "defineMethod": rec["define"].get("method"),
            "fixCount": rec["define"].get("fix_count"),
            "dimensionCount": rec["define"].get("dimension_count"),
            "note": rec["note"],
        }
        if rec.get("cuts"):
            entry["cutFeatures"] = [
                {
                    "fullyDefined": c["define"].get("constrained_status") == 3,
                    "defineMethod": c["define"].get("method"),
                }
                for c in rec["cuts"]
            ]
        feature_records.append(entry)

    model.ForceRebuild3(False)
    try:
        model.ShowNamedView2("*Isometric", 7)
    except Exception:
        model.ShowNamedView2("*等轴测", 7)
    model.ViewZoomtofit2()

    # 外观: 与网页工作台一致的颜色（P55 外壳在网页中为半透明）
    color = str(part.get("color", "#38bdf8"))
    try:
        SK["set_document_appearance"](model, color)
        if part["id"] == "P55":
            apply_shell_transparency(model)
    except Exception as exc:
        feature_records.append({"id": "appearance", "error": str(exc)})

    # 包围盒验收（网页局部坐标期望值 vs SolidWorks 实测值）。
    # 实证: SW2024 GetPartBox 返回文档长度单位值（本机默认模板为 mm），
    # 故对 raw 做单位歧义消解（mm 或 m）后与期望 mm 值比较。
    exp_lo, exp_hi = expected_part_bbox(part)
    box = list(model.GetPartBox(False) or [])
    bbox_check = {"status": "blocked", "expectedLo": exp_lo, "expectedHi": exp_hi}
    if len(box) == 6:
        best = None
        for unit_name, scale in (("mm", 1.0), ("m", 1000.0)):
            got_lo = [round(v * scale, 3) for v in box[:3]]
            got_hi = [round(v * scale, 3) for v in box[3:]]
            dev = max(
                max(abs(got_lo[k] - exp_lo[k]) for k in range(3)),
                max(abs(got_hi[k] - exp_hi[k]) for k in range(3)),
            )
            if best is None or dev < best["deviationMm"]:
                best = {
                    "status": "pass" if dev <= BBOX_TOL_MM else "fail",
                    "unitInterpretation": unit_name,
                    "deviationMm": round(dev, 4),
                    "expectedLo": exp_lo,
                    "expectedHi": exp_hi,
                    "actualLo": got_lo,
                    "actualHi": got_hi,
                }
        bbox_check = best

    # 草图完全定义复核（保存后的整棵特征树）
    sketch_audit = SK["inspect_model_sketches"](model)
    all_defined = all(s.get("constrained_status") == 3 for s in sketch_audit.get("sketches", []))

    ok_save = session.save(model, str(out_path))

    review_info: Dict[str, object] = {}
    if with_previews:
        part_preview_dir = preview_root / part_name
        part_preview_dir.mkdir(parents=True, exist_ok=True)
        try:
            report, _path = SK["run_review"](
                model,
                str(part_preview_dir),
                basename=part_name,
                views=("isometric", "front", "top", "right"),
                expected_outputs=[str(out_path)],
            )
            review_info = {
                "status": report.get("evaluation", {}).get("status"),
                "issues": report.get("evaluation", {}).get("issues", [])[:5],
            }
        except Exception as exc:
            review_info = {"status": "error", "issues": [str(exc)]}

    session.close()

    status = "completed" if (ok_save and bbox_check["status"] == "pass" and all_defined) else "review_required"
    return {
        "id": part["id"],
        "webPartName": part_name,
        "solidworksFile": str(out_path.relative_to(ROOT)),
        "features": feature_records,
        "sketchAuditStatus": sketch_audit.get("status"),
        "allSketchesFullyDefined": all_defined,
        "bboxCheck": bbox_check,
        "saved": bool(ok_save),
        "review": review_info,
        "status": status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


def apply_shell_transparency(model) -> None:
    """P55 快拆外壳在网页中以 opacity=0.28 渲染，SolidWorks 中设 72% 透明。"""
    try:
        from sw_appearance import material_variant, material_values
        values = material_values("#38bdf8", transparency=0.72)
        model.MaterialPropertyValues = material_variant(values)
    except Exception:
        pass


# ---------------------------------------------------------------------------
# 总装
# ---------------------------------------------------------------------------

def get_open_doc_model(sw_app, part_path: Path):
    """若零件文档已在 SolidWorks 中打开则返回其文档对象，否则 None。"""
    try:
        doc = sw_app.GetOpenDocumentByName(str(part_path))
        return doc
    except Exception:
        return None


def close_doc_by_path(sw_app, part_path: Path) -> None:
    """关闭零件源文档以释放内存；关闭失败不影响总装流程。"""
    try:
        doc = get_open_doc_model(sw_app, part_path)
        if doc is None:
            return
        try:
            doc.SetSaveFlag()  # 标记未修改，避免 CloseDoc 弹出保存提示
        except Exception:
            pass
        title = str(doc.GetTitle)
        sw_app.CloseDoc(title)
        print(f"[ASM] 已关闭源文档: {title}")
    except Exception as exc:
        print(f"[ASM] 关闭源文档失败({part_path.name}): {exc}")


def calibrate_placement_mode(session, output_dir: Path, idx_rec: Dict[str, Dict[str, object]]) -> str:
    """运行时标定 AddComponent5 的放置语义 ("origin" 或 "bbox_center")。

    SW2024 SP5 (本机) 实测: 组件“包围盒中心”落在 (x,y,z) 而非文档所述的零件
    原点。此函数用一个局部包围盒明显不对称的零件在 (0,0,0) 试放并回读包围盒,
    自动判定本机 SolidWorks 的实际语义, 使脚本在不同 SW 版本上都放置正确。
    任何一步失败都以原始 origin 语义处理并打印原因。"""
    candidate = None
    for pid, rec in idx_rec.items():
        if rec.get("bboxCheck", {}).get("status") != "pass":
            continue
        lo = rec["bboxCheck"]["expectedLo"]
        hi = rec["bboxCheck"]["expectedHi"]
        center = [(lo[k] + hi[k]) / 2.0 for k in range(3)]
        if max(abs(c) for c in center) >= 1.0:
            candidate = (pid, rec, center)
            break
    if candidate is None:
        print("[ASM] 放置语义标定: 无不对称零件可用, 按 origin 处理")
        return "origin"
    pid, rec, center = candidate
    # 审计记录中的 solidworksFile 是相对 ROOT 的路径 ("solidworks\<名>.SLDPRT"),
    # 分隔符随平台; 取文件名拼接 output_dir 最稳妥
    rec_name = Path(str(rec["solidworksFile"])).name
    part_file = output_dir / rec_name
    if not part_file.exists():
        print(f"[ASM] 放置语义标定: 零件不存在 {part_file}, 按 origin 处理")
        return "origin"
    try:
        probe = session.new_assembly()
        SK["add_component"](probe, str(part_file), x=0.0, y=0.0, z=0.0, sw=session.sw)
        probe.ForceRebuild3(False)
        box = list(probe.GetBox(0) or [])
        close_doc_by_path(session.sw, part_file)
        session.close()
        if len(box) != 6:
            print(f"[ASM] 放置语义标定: 探针包围盒异常 ({len(box)} 值), 按 origin 处理")
            return "origin"
        got = [v * 1000.0 for v in box]
        lo = [float(v) for v in rec["bboxCheck"]["expectedLo"]]
        hi = [float(v) for v in rec["bboxCheck"]["expectedHi"]]
        # 若“原点落在给定点”: box == (lo, hi);
        # 若“包围盒中心落在给定点”: box == (lo-center, hi-center)
        dev_origin = max(max(abs(got[k] - lo[k]), abs(got[k + 3] - hi[k])) for k in range(3))
        dev_center = max(
            max(abs(got[k] - (lo[k] - center[k])), abs(got[k + 3] - (hi[k] - center[k]))) for k in range(3)
        )
        mode = "bbox_center" if dev_center < dev_origin else "origin"
        print(f"[ASM] 放置语义标定: {mode} (probe={pid}, dev_origin={dev_origin:.3f}, dev_center={dev_center:.3f}, box={[round(g,2) for g in got]})")
        return mode
    except Exception as exc:
        print(f"[ASM] 放置语义标定失败, 按 origin 处理: {exc}")
        try:
            session.close()
        except Exception:
            pass
        return "origin"


def build_assembly(session, spec: Dict[str, object], output_dir: Path) -> Dict[str, object]:
    placements: List[Dict[str, object]] = spec["placements"]  # type: ignore[assignment]
    asm_path = output_dir / "太阳能小车R5总装.SLDASM"
    idx_rec = {}
    index_file = output_dir / "检查记录" / "build-index-v2.json"
    if index_file.exists():
        try:
            for r in json.loads(index_file.read_text(encoding="utf-8")).get("built", []):
                if isinstance(r, dict) and r.get("id"):
                    idx_rec[str(r["id"])] = r
        except Exception:
            idx_rec = {}

    placement_mode = calibrate_placement_mode(session, output_dir, idx_rec)
    parts_by_id = {str(p["id"]): p for p in spec["parts"]}  # type: ignore[union-attr]

    def bbox_center_offset(part_id: str) -> Tuple[float, float, float]:
        """零件局部包围盒中心 (mm)。审计记录缺失时直接按规格计算。"""
        if placement_mode != "bbox_center":
            return (0.0, 0.0, 0.0)
        part = parts_by_id.get(part_id)
        if part is not None:
            lo, hi = expected_part_bbox(part)
        else:
            rec = idx_rec.get(part_id)
            if not rec or rec.get("bboxCheck", {}).get("status") != "pass":
                return (0.0, 0.0, 0.0)
            lo = rec["bboxCheck"]["expectedLo"]
            hi = rec["bboxCheck"]["expectedHi"]
        return tuple((float(lo[k]) + float(hi[k])) / 2.0 for k in range(3))  # type: ignore[return-value]

    asm_model = session.new_assembly()
    sw_app = session.sw
    component_records = []
    missing = []
    # 按零件文件分组添加: 同一零件的全部实例一次性加入后立即关闭源文档，
    # 避免 106 个零件文档同时在内存中触发 SolidWorks 低内存保护。
    groups: Dict[str, List[Dict[str, object]]] = {}
    for pl in placements:
        groups.setdefault(str(pl["solidworksFile"]), []).append(pl)
    done = 0
    for sw_file, pls in groups.items():
        part_file = output_dir / sw_file
        part_id = str(pls[0].get("partId", ""))
        center = bbox_center_offset(part_id)
        if not part_file.exists():
            missing.extend(str(pl["instanceId"]) for pl in pls)
            continue
        for pl in pls:
            x_m, y_m, z_m = [mm(float(v)) for v in pl["position"]]
            # 实证: 包围盒中心落在给定点 → 传 (位置 + 包围盒中心) 使原点落在位置
            comp = SK["add_component"](
                asm_model,
                str(part_file),
                x=x_m + mm(center[0]),
                y=y_m + mm(center[1]),
                z=z_m + mm(center[2]),
                sw=sw_app,
            )
            if comp is None:
                missing.append(f"{pl['instanceId']}(add failed)")
                continue
            comp_name = getattr(comp, "Name2", "")
            component_records.append(
                {
                    "instanceId": pl["instanceId"],
                    "partName": pl["partName"],
                    "componentName": comp_name,
                    "positionMm": list(pl["position"]),
                    "bboxCenterCompensationMm": [round(v, 3) for v in center],
                }
            )
        done += len(pls)
        print(f"[ASM] {sw_file} 完成 {len(pls)} 实例 (累计 {done}/{len(placements)})")
        # 关闭该零件源文档释放内存 (装配体保留缓存几何)
        close_doc_by_path(sw_app, part_file)
    asm_model.ForceRebuild3(False)
    asm_model.ShowNamedView2("*Isometric", 7)
    asm_model.ViewZoomtofit2()

    # 总装包围盒 vs 网页整车包络期望值
    parts_by_id = {p["id"]: p for p in spec["parts"]}
    exp_lo = [math.inf] * 3
    exp_hi = [-math.inf] * 3
    for pl in placements:
        part = parts_by_id.get(pl["partId"])
        if part is None:
            continue
        plo, phi = expected_part_bbox(part)
        pos = [float(v) for v in pl["position"]]
        for k in range(3):
            exp_lo[k] = min(exp_lo[k], plo[k] + pos[k])
            exp_hi[k] = max(exp_hi[k], phi[k] + pos[k])
    box = None
    for getter in (lambda: asm_model.GetBox(0), lambda: asm_model.GetPartBox(False)):
        try:
            value = getter()
            if value and len(list(value)) == 6:
                box = list(value)
                break
        except Exception:
            continue
    asm_bbox = {"expectedLo": [round(v, 2) for v in exp_lo], "expectedHi": [round(v, 2) for v in exp_hi]}
    if box:
        best = None
        for unit_name, scale in (("mm", 1.0), ("m", 1000.0)):
            got_lo = [round(v * scale, 2) for v in box[:3]]
            got_hi = [round(v * scale, 2) for v in box[3:]]
            dev = max(
                max(abs(got_lo[k] - exp_lo[k]) for k in range(3)),
                max(abs(got_hi[k] - exp_hi[k]) for k in range(3)),
            )
            if best is None or dev < best["deviationMm"]:
                best = {
                    "actualLo": got_lo,
                    "actualHi": got_hi,
                    "unitInterpretation": unit_name,
                    "deviationMm": round(dev, 3),
                    "status": "pass" if dev <= 0.1 else "fail",
                }
        asm_bbox.update(best)

    ok_save = session.save(asm_model, str(asm_path))
    mate_summary = {}
    try:
        mate_summary = SK["collect_mate_feature_summary"](asm_model)
    except Exception:
        pass
    session.close()
    return {
        "assemblyFile": str(asm_path.relative_to(ROOT)),
        "placementMode": placement_mode,
        "componentCount": len(component_records),
        "missingComponents": missing,
        "bboxCheck": asm_bbox,
        "mateSummary": mate_summary,
        "saved": bool(ok_save),
    }


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------

SK: Dict[str, object] = {}


def write_index(audit_dir: Path, payload: Dict[str, object]) -> None:
    audit_dir.mkdir(parents=True, exist_ok=True)
    (audit_dir / "build-index-v2.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def dry_run(spec: Dict[str, object], output_dir: Path) -> int:
    parts: List[Dict[str, object]] = spec["parts"]  # type: ignore[assignment]
    problems = validate_spec_python(spec)
    print("=" * 96)
    print(f"太阳能小车 R5 — SolidWorks 1:1 建模预检: {len(parts)} 种零件 / {len(spec['placements'])} 实例 / "
          f"{sum(len(p['features']) for p in parts)} 特征")
    print("=" * 96)
    for idx, p in enumerate(parts, start=1):
        lo, hi = expected_part_bbox(p)
        size = [round(hi[k] - lo[k], 1) for k in range(3)]
        print(f"{idx:>3} | {p['id']:<4} | {p['name']:<22} | {p['solidworksFile']:<30} "
              f"| 包络 {size[0]:>6}x{size[1]:<6}x{size[2]:<5} | 特征 {len(p['features'])}")
    print("-" * 96)
    if problems:
        print(f"[FAIL] {len(problems)} 个问题:")
        for item in problems:
            print("  -", item)
        return 1
    print("[PASS] 网页零件名 <-> solidworks/<零件名>.SLDPRT 1:1 对应, 全部特征区间/孔位校验通过。")
    write_index(
        output_dir / "检查记录",
        {
            "project": spec.get("project", {}),
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "namingRule": "1:1 exact match between web part.name and solidworks/<part.name>.SLDPRT",
            "planeMapping": {k: {"swPlane": v[0], "sketchTransform": f"(u,v)->({v[2](1,0)[0]:g},{v[2](0,1)[1]:g})"} for k, v in PLANE_MAP.items()},
            "partCount": len(parts),
            "parts": [
                {
                    "id": p["id"],
                    "webPartName": p["name"],
                    "solidworksFile": f"solidworks/{p['solidworksFile']}",
                    "featureCount": len(p["features"]),
                    "bboxMm": [round(v, 2) for v in (lambda lo, hi: [hi[k] - lo[k] for k in range(3)])(*expected_part_bbox(p))],
                }
                for p in parts
            ],
        },
    )
    print(f"[OK] 预检索引已写入: {(output_dir / '检查记录' / 'build-index-v2.json').relative_to(ROOT)}")
    return 0


def main() -> int:
    global SK
    parser = argparse.ArgumentParser(description="太阳能小车 R5 SolidWorks 自动化 1:1 建模")
    parser.add_argument("--dry-run", action="store_true", help="纯 Python 预检（不启动 SolidWorks）")
    parser.add_argument("--build-all", action="store_true", help="生成全部零件")
    parser.add_argument("--assembly-only", action="store_true", help="只生成总装 (零件须已存在)")
    parser.add_argument("--part", type=str, default=None, help="仅生成指定零件（代号如 P01 或零件名，支持逗号分隔）")
    parser.add_argument("--with-assembly", action="store_true", help="生成整车总装 SLDASM")
    parser.add_argument("--no-previews", action="store_true", help="跳过逐件四视图预览导出（提速）")
    parser.add_argument("--visible", action="store_true", default=True, help="SolidWorks 窗口可见")
    parser.add_argument("--output-dir", type=Path, default=ROOT / "solidworks", help="输出目录")
    args = parser.parse_args()

    spec = load_car_spec()
    output_dir = args.output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.dry_run or not (args.build_all or args.part or args.with_assembly or args.assembly_only):
        return dry_run(spec, output_dir)

    SK = load_sw_skill_modules()
    parts: List[Dict[str, object]] = spec["parts"]  # type: ignore[assignment]
    if args.assembly_only:
        parts = []  # 只生成总装，不重建零件
    elif args.part:
        targets = [t.strip() for t in str(args.part).split(",") if t.strip()]
        parts = [p for p in parts if any(t in (p["id"], p["name"], p["solidworksFile"]) for t in targets)]
        if not parts:
            print(f"[ERROR] 未找到零件: {targets}", file=sys.stderr)
            return 1

    preview_root = output_dir / "预览图"
    audit_dir = output_dir / "检查记录"
    audit_dir.mkdir(parents=True, exist_ok=True)
    index_path = audit_dir / "build-index-v2.json"

    session = SK["SolidWorksSession"](visible=args.visible)
    failures: List[str] = []
    # 审计索引按零件 id 累积合并，重跑/中断不丢历史记录
    prior_by_id: Dict[str, Dict[str, object]] = {}
    if index_path.exists():
        try:
            prev = json.loads(index_path.read_text(encoding="utf-8"))
            for r in prev.get("built", []):
                if isinstance(r, dict) and r.get("id"):
                    prior_by_id[str(r["id"])] = r
        except Exception:
            prior_by_id = {}
    built: List[Dict[str, object]] = [prior_by_id[k] for k in prior_by_id]
    try:
        if parts:
            for idx, part in enumerate(parts, start=1):
                print(f"[{idx}/{len(parts)}] 构建 {part['id']} {part['name']} -> {part['solidworksFile']}")
                t0 = time.time()
                try:
                    record = build_single_part(session, part, output_dir, preview_root, with_previews=not args.no_previews)
                except Exception as exc:
                    record = {
                        "id": part["id"],
                        "webPartName": part["name"],
                        "solidworksFile": f"solidworks/{part['solidworksFile']}",
                        "status": "failed",
                        "error": str(exc),
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    }
                    try:
                        session.close()
                    except Exception:
                        pass
                prior_by_id[str(part["id"])] = record
                built = [prior_by_id[k] for k in prior_by_id]
                elapsed = time.time() - t0
                flag = record["status"]
                print(f"      -> {flag} ({elapsed:.1f}s)")
                if flag != "completed":
                    failures.append(f"{part['id']} {record.get('error') or record}")
                write_index(audit_dir, {"generatedAt": datetime.now(timezone.utc).isoformat(), "built": built})

            summary = {
                "total": len(built),
                "completed": sum(1 for r in built if r["status"] == "completed"),
                "failed": [r["id"] for r in built if r["status"] == "failed"],
                "reviewRequired": [r["id"] for r in built if r["status"] == "review_required"],
            }
            print("[SUMMARY]", json.dumps(summary, ensure_ascii=False))

        if args.with_assembly or args.assembly_only:
            print("[ASM] 生成总装 太阳能小车R5总装.SLDASM ...")
            asm_record = build_assembly(session, spec, output_dir)
            print("[ASM]", json.dumps({k: asm_record[k] for k in ("assemblyFile", "componentCount", "missingComponents", "bboxCheck", "saved")}, ensure_ascii=False))
            write_index(audit_dir, {"generatedAt": datetime.now(timezone.utc).isoformat(), "built": built, "assembly": asm_record})
    finally:
        # 全部构建完成后保持 SolidWorks 与总装文档打开供人工检查；
        # 会话由自动化启动，进程在无文档且非本会话启动时才会自动退出。
        pass

    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
