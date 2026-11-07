#!/usr/bin/env python3
"""探测 SolidWorks 三个基准面的草图坐标方向与拉伸起始偏移行为。

网页建模 (mesh_builder.map_plane_to_3d) 的坐标系约定:
  "XY": (u, v, w) -> 全局 (u, v, w)   法向 +Z
  "XZ": (u, v, w) -> 全局 (u, w, v)   法向 +Y   (草图X->全局X, 草图Y->全局Z)
  "YZ": (u, v, w) -> 全局 (w, u, v)   法向 +X   (草图X->全局Y, 草图Y->全局Z)

本脚本在 Front/Top/Right 平面各画一个不对称三角形 (10,2)-(14,2)-(10,6)（单位 mm），
拉伸 3mm 后回读包围盒，从而实证确定每个基准面草图 u/v/法向 的全局轴与符号。
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / ".skills" / "solidworks-automation" / "scripts"
sys.path.insert(0, str(SKILL))

from sw_session import SolidWorksSession  # noqa: E402
from sw_part import sketch, sketch_line, extrude_boss  # noqa: E402

MM = 1.0 / 1000.0
TRI = [(10.0, 2.0), (14.0, 2.0), (10.0, 6.0)]


def probe_plane(session, plane_name: str) -> None:
    model = session.new_part()
    with sketch(model, plane_name) as sketch_name:
        pts = [(x * MM, y * MM) for x, y in TRI]
        for i in range(len(pts)):
            x1, y1 = pts[i]
            x2, y2 = pts[(i + 1) % len(pts)]
            sketch_line(model, x1, y1, x2, y2)
    feat = extrude_boss(model, sketch_name, 3.0 * MM)
    model.ForceRebuild3(False)
    box = model.GetPartBox(False)  # (x1,y1,z1,x2,y2,z2) 米
    lo = [round(v / MM, 2) for v in box[:3]]
    hi = [round(v / MM, 2) for v in box[3:]]
    ok = feat is not None
    print(f"{plane_name:12s} feat_ok={ok} bbox_lo={lo} bbox_hi={hi}")
    session.close()


def probe_offset(session) -> None:
    model = session.new_part()
    with sketch(model, "Front Plane") as sketch_name:
        pts = [(x * MM, y * MM) for x, y in TRI]
        for i in range(len(pts)):
            x1, y1 = pts[i]
            x2, y2 = pts[(i + 1) % len(pts)]
            sketch_line(model, x1, y1, x2, y2)
    feat = extrude_boss(model, sketch_name, 3.0 * MM, start_offset=5.0 * MM)
    model.ForceRebuild3(False)
    box = model.GetPartBox(False)
    lo = [round(v / MM, 2) for v in box[:3]]
    hi = [round(v / MM, 2) for v in box[3:]]
    print(f"offset+5..8  feat_ok={feat is not None} bbox_lo={lo} bbox_hi={hi}  (期望 Z: 5 -> 8)")
    session.close()


def probe_offset_negative(session) -> None:
    model = session.new_part()
    with sketch(model, "Front Plane") as sketch_name:
        pts = [(x * MM, y * MM) for x, y in TRI]
        for i in range(len(pts)):
            x1, y1 = pts[i]
            x2, y2 = pts[(i + 1) % len(pts)]
            sketch_line(model, x1, y1, x2, y2)
    feat = extrude_boss(model, sketch_name, 3.0 * MM, start_offset=-8.0 * MM)
    model.ForceRebuild3(False)
    box = model.GetPartBox(False)
    lo = [round(v / MM, 2) for v in box[:3]]
    hi = [round(v / MM, 2) for v in box[3:]]
    print(f"offset-8..-5 feat_ok={feat is not None} bbox_lo={lo} bbox_hi={hi}  (期望 Z: -8 -> -5)")
    session.close()


def main() -> int:
    with SolidWorksSession() as session:
        for plane in ("Front Plane", "Top Plane", "Right Plane"):
            probe_plane(session, plane)
        probe_offset(session)
        probe_offset_negative(session)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
