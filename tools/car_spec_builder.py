#!/usr/bin/env python3
"""
工创赛太阳能小车 — 四轮同轴全向舵轮(非麦轮)与双凸轮底部传动系统完整规格构建器
================================================================================
核心机械架构（52种零件 / 115个装配实例）：
1. 双层笼式底盘骨架：铝合金主底板(上层Z=42mm) + 底部传动副底板(下层Z=18mm) + 6根底盘层间支撑柱，构成高刚度底部传动箱。
2. 单电机 1:4 主减速 + 四轮同轴锥齿轮分动系统：
   - N20直流减速电机(由N20电机固定座刚性抱死) -> 18齿电机主动齿轮 : 72齿主减速大齿轮 (精确 1:4 减速)
   - 底部横向主传动轴 -> 20齿分动直齿轮副 -> 底部纵向分动长轴 -> 前/后分动箱十字轴承座(16齿正交传力锥齿轮)
   - 4根横向分动短轴 -> 4套舵轮同轴传力竖销(穿过空心主销套筒中心) -> 舵轮轮边锥齿圈 -> 驱动4只高抓地全向舵轮。
3. 四轮独立全向同轴舵轮模组（严禁使用麦克纳姆轮）：
   - 四角(X=±68, Y=±52mm)布置全向舵轮主销轴承座 + 6700ZZ薄壁转向轴承 + 全向转向空心主销套筒 + 全向舵轮转向叉架 + 高抓地全向舵轮(Φ40×10mm实心防滑橡胶胎)。
   - 动力轴与转向主销同轴解耦，车轮可在任意转向角下连续输出驱动力。
4. 1:30 蜗轮蜗杆 + 双凸轮正交连杆全向转向机构：
   - 0.5模单头蜗杆 : 30齿青铜蜗轮 -> 凸轮传力竖轴，同轴安装『主航向盘形转向凸轮』(C01)与『差动转向副凸轮盘』(C02)。
   - 主航向凸轮驱动『纵向同步转向主推杆』与『前桥平行四边形转向横拉杆』；副凸轮通过『后桥差动相位推杆』与『全向模式切换滑块』驱动『后桥平行四边形转向横拉杆』。
   - 实现全方向移动模式：
     (a) 四轮同向斜行/蟹行全向平移 (δ_前 = δ_后，车身姿态不变实现全方向平移)；
     (b) 四轮反向最小半径全向转向 (δ_前 = -δ_后，前后轮反向偏转实现急弯/原地回转)；
     (c) 双凸轮复合S弯与直行修正轨迹。
"""

from __future__ import annotations
from typing import Dict, List, Tuple
from mesh_builder import (
    MeshAccumulator,
    make_cam_loop,
    make_circle_loop,
    make_gear_loop,
    make_rect_loop,
)


def build_part_definitions() -> List[Dict[str, object]]:
    """Return all 52 parts with 1-to-1 correspondence between web part name and SolidWorks `.SLDPRT` filename."""
    raw_parts = [
        # ==================== 01 双层高刚度全向底盘骨架 ====================
        {
            "id": "P01",
            "name": "铝合金主底板",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "自制结构件",
            "process": "CNC铝合金精密铣削",
            "material": "6061-T6铝合金",
            "color": "#475569",
            "quantity": 1,
            "size": [200.0, 150.0, 4.0],
            "note": "上层主承载基准板(Z=42mm)，四角设Φ15mm全向舵轮主销通孔(X=±68,Y=±52mm)，中部设双凸轮竖轴孔与轻量化观察窗",
            "keyDimensions": [
                {"name": "总长 × 总宽 × 板厚", "value": "200.0 × 150.0 × 4.0 mm", "note": "整车包络216×164mm，严格小于250×200mm红线"},
                {"name": "四轮全向主销孔距", "value": "轴距 136.0 mm × 轮距 104.0 mm", "note": "四角对称坐标 (X=±68.0, Y=±52.0 mm)"},
                {"name": "凸轮竖轴基准孔", "value": "X = -30.0 mm, Y = 0.0 mm", "note": "安装凸轮轴立式轴承座"},
            ],
            "features": [
                {
                    "id": "P01-F01",
                    "name": "上层主底板外廓与舵轮主销孔系",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.0,
                    "w1": 2.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 200.0, "h": 150.0, "fillet": 12.0},
                    "holes": [
                        # 四角全向舵轮主销过孔 (X=±68, Y=±52)
                        {"shape": "circle", "cx": -68.0, "cy": -52.0, "r": 7.5},
                        {"shape": "circle", "cx": -68.0, "cy": 52.0, "r": 7.5},
                        {"shape": "circle", "cx": 68.0, "cy": -52.0, "r": 7.5},
                        {"shape": "circle", "cx": 68.0, "cy": 52.0, "r": 7.5},
                        # 凸轮竖轴过孔 (X=-30, Y=0)
                        {"shape": "circle", "cx": -30.0, "cy": 0.0, "r": 6.0},
                        # 底部传动观察与减重窗口
                        {"shape": "rect", "cx": -30.0, "cy": 30.0, "w": 42.0, "h": 22.0, "fillet": 3.0},
                        {"shape": "rect", "cx": 24.0, "cy": -30.0, "w": 44.0, "h": 24.0, "fillet": 3.0},
                        {"shape": "rect", "cx": 24.0, "cy": 30.0, "w": 44.0, "h": 24.0, "fillet": 3.0},
                    ],
                }
            ],
        },
        {
            "id": "P02",
            "name": "底部传动副底板",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#334155",
            "quantity": 1,
            "size": [176.0, 124.0, 3.5],
            "note": "下层传动齿轮箱基准底板(Z=18mm)，与铝合金主底板构成双层笼式结构，承载横向主轴、纵向分动长轴、前后锥齿分动箱与电机座",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "176.0 × 124.0 × 3.5 mm", "note": "四角内收避让4只全向舵轮360°回转包络"},
                {"name": "层间净高", "value": "20.0 mm (Z ∈ [20, 40] mm)", "note": "容纳底部1:4主减速、锥齿轮分动箱及差动副凸轮"},
            ],
            "features": [
                {
                    "id": "P02-F01",
                    "name": "下层传动副底板主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -1.75,
                    "w1": 1.75,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 176.0, "h": 124.0, "fillet": 8.0},
                    "holes": [
                        # 四角弧形内凹避让舵轮转向扫掠区
                        {"shape": "rect", "cx": -68.0, "cy": -50.0, "w": 36.0, "h": 24.0, "fillet": 4.0},
                        {"shape": "rect", "cx": -68.0, "cy": 50.0, "w": 36.0, "h": 24.0, "fillet": 4.0},
                        {"shape": "rect", "cx": 68.0, "cy": -50.0, "w": 36.0, "h": 24.0, "fillet": 4.0},
                        {"shape": "rect", "cx": 68.0, "cy": 50.0, "w": 36.0, "h": 24.0, "fillet": 4.0},
                        # 72齿大齿轮下沉避让槽
                        {"shape": "rect", "cx": -42.0, "cy": 28.0, "w": 40.0, "h": 10.0, "fillet": 2.0},
                    ],
                }
            ],
        },
        {
            "id": "P03",
            "name": "底盘层间支撑柱",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "自制结构件",
            "process": "精密车削",
            "material": "6061-T6铝合金",
            "color": "#94a3b8",
            "quantity": 6,
            "size": [8.0, 8.0, 20.0],
            "note": "6根Φ8×20mm高刚度台阶支撑柱，刚性锁紧上层铝合金主底板与下层底部传动副底板",
            "keyDimensions": [
                {"name": "外径 × 高度", "value": "Φ8.0 × 20.0 mm", "note": "中心贯穿M3内螺纹孔"},
            ],
            "features": [
                {
                    "id": "P03-F01",
                    "name": "层间支撑圆柱体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -10.0,
                    "w1": 10.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 4.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
        {
            "id": "P04",
            "name": "主传动轴立式轴承座",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#3b82f6",
            "quantity": 4,
            "size": [22.0, 10.0, 18.0],
            "note": "共4件安装在底部传动副底板上：2件支承底部横向主传动轴(X=-42,Y=±38mm)，2件支承底部纵向分动长轴(X=±36,Y=0mm)",
            "keyDimensions": [
                {"name": "轴承孔径", "value": "Φ16.0 H7 mm", "note": "内嵌625ZZ深沟球轴承"},
                {"name": "中心高", "value": "8.0 mm (对应Z=28mm传动轴线)", "note": "确保全车底部齿轮轴系平行度与正交度"},
            ],
            "features": [
                {
                    "id": "P04-F01",
                    "name": "立式轴承座本体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 22.0, "h": 18.0, "fillet": 2.5},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 7.5}],
                }
            ],
        },
        {
            "id": "P05",
            "name": "全向舵轮主销轴承座",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "自制核心件",
            "process": "CNC铝合金精密镗孔",
            "material": "6061-T6铝合金",
            "color": "#2563eb",
            "quantity": 4,
            "size": [28.0, 28.0, 18.0],
            "note": "四角对称锁紧在铝合金主底板(X=±68,Y=±52mm)，内嵌上下双6700ZZ薄壁转向轴承，支承4套全向舵轮360°自由回转",
            "keyDimensions": [
                {"name": "轴承室孔径", "value": "Φ15.0 H7 mm", "note": "配合6700ZZ薄壁深沟球轴承(Φ10×Φ15×4mm)"},
                {"name": "法兰尺寸", "value": "28.0 × 28.0 × 18.0 mm", "note": "4×M3螺栓锁紧于主底板四角"},
            ],
            "features": [
                {
                    "id": "P05-F01",
                    "name": "舵轮主销轴承座法兰与轴筒",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -9.0,
                    "w1": 9.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 28.0, "h": 28.0, "fillet": 4.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 7.5},
                        {"shape": "circle", "cx": -10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": -10.0, "cy": 10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": 10.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "B01",
            "name": "625ZZ深沟球轴承",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "外购标准件",
            "process": "轴承钢标准件",
            "material": "GCr15轴承钢",
            "color": "#94a3b8",
            "quantity": 16,
            "size": [16.0, 5.0, 16.0],
            "note": "Φ5×Φ16×5mm标准轴承：用于主传动轴立式轴承座(4只)、前后分动箱十字轴承座(6只)、凸轮竖轴座(2只)及4只全向舵轮轮毂(4只)",
            "keyDimensions": [
                {"name": "内径 d × 外径 D × 宽度 B", "value": "Φ5.0 × Φ16.0 × 5.0 mm", "note": "支承全车Φ5mm传动轴系"},
            ],
            "features": [
                {
                    "id": "B01-F01",
                    "name": "625ZZ轴承环体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 8.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                }
            ],
        },
        {
            "id": "B03",
            "name": "6700ZZ薄壁转向轴承",
            "subsystem": "01 双层高刚度全向底盘骨架",
            "category": "外购标准件",
            "process": "轴承钢标准件",
            "material": "GCr15轴承钢",
            "color": "#cbd5e1",
            "quantity": 8,
            "size": [15.0, 15.0, 4.0],
            "note": "Φ10×Φ15×4mm薄壁深沟球轴承，每个全向舵轮主销轴承座内上下安装2只(共8只)，支承Φ10mm全向转向空心主销套筒",
            "keyDimensions": [
                {"name": "内径 d × 外径 D × 宽度 B", "value": "Φ10.0 × Φ15.0 × 4.0 mm", "note": "大内孔设计以便中心穿过同轴传力竖销"},
            ],
            "features": [
                {
                    "id": "B03-F01",
                    "name": "6700ZZ薄壁轴承环",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.0,
                    "w1": 2.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 7.5},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 5.0}],
                }
            ],
        },

        # ==================== 02 单电机1:4主减速与四轮锥齿分动系统 ====================
        {
            "id": "P06",
            "name": "N20电机固定座",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#1d4ed8",
            "quantity": 1,
            "size": [28.0, 24.0, 18.0],
            "note": "刚性锁紧在底部传动副底板上表面(X=-19.5,Y=+12,Z=28mm)，抱死N20电机机身杜绝悬空，保证1:4齿轮中心距22.50mm",
            "keyDimensions": [
                {"name": "电机防转内腔", "value": "12.0 × 10.0 mm", "note": "贴合N20扁平减速箱"},
                {"name": "1:4啮合中心距", "value": "22.50 mm", "note": "电机轴X=-19.5mm至横向主传动轴X=-42.0mm"},
            ],
            "features": [
                {
                    "id": "P06-F01",
                    "name": "电机固定座抱箍主体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -12.0,
                    "w1": 12.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 24.0, "h": 18.0, "fillet": 2.5},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 12.2, "h": 10.2, "fillet": 1.0}],
                }
            ],
        },
        {
            "id": "M01",
            "name": "N20直流减速电机",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "外购标准件",
            "process": "成品微电机",
            "material": "金属齿轮箱+永磁直流电机",
            "color": "#64748b",
            "quantity": 1,
            "size": [12.0, 36.0, 10.0],
            "note": "全车唯一动力源(单电机驱动)，输出轴直联18齿电机主动齿轮，驱动全车四轮分动箱与双凸轮转向时基",
            "keyDimensions": [
                {"name": "机身尺寸", "value": "12.0 × 10.0 × 26.0 mm (轴长10mm)", "note": "输出轴径Φ3.0mm D字轴"},
            ],
            "features": [
                {
                    "id": "M01-F01",
                    "name": "N20电机机身与减速箱",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -13.0,
                    "w1": 13.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 12.0, "h": 10.0, "fillet": 2.0},
                    "holes": [],
                },
                {
                    "id": "M01-F02",
                    "name": "电机D型输出轴",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": 13.0,
                    "w1": 23.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 1.5},
                    "holes": [],
                },
            ],
        },
        {
            "id": "G02",
            "name": "18齿电机主动齿轮",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "外购/定制传动件",
            "process": "黄铜精密滚齿",
            "material": "H59黄铜",
            "color": "#f59e0b",
            "quantity": 1,
            "size": [10.0, 6.0, 10.0],
            "note": "模数m=0.5，齿数z1=18，分度圆d1=9.0mm，安装在N20电机输出轴上，与72齿主减速大齿轮构成精确1:4减速",
            "keyDimensions": [
                {"name": "模数 / 齿数", "value": "m = 0.5 mm, z1 = 18", "note": "分度圆d1=9.0mm，齿顶圆da1=10.0mm"},
            ],
            "features": [
                {
                    "id": "G02-F01",
                    "name": "18齿渐开线直齿轮",
                    "type": "齿轮轮廓拉伸",
                    "plane": "XZ",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 18},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
        {
            "id": "G01",
            "name": "72齿主减速大齿轮",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "外购/定制传动件",
            "process": "POM赛钢精密滚齿",
            "material": "POM聚甲醛(赛钢)",
            "color": "#eab308",
            "quantity": 1,
            "size": [37.0, 6.0, 37.0],
            "note": "模数m=0.5，齿数z2=72，分度圆d2=36.0mm，锁紧在底部横向主传动轴(X=-42,Y=+28,Z=28mm)，实现精确1:4主减速比",
            "keyDimensions": [
                {"name": "模数 / 齿数 / 传动比", "value": "m = 0.5, z2 = 72, i = 72/18 = 4.0 (精确1:4)", "note": "标准中心距 a = 22.50 mm"},
            ],
            "features": [
                {
                    "id": "G01-F01",
                    "name": "72齿渐开线主减速大齿轮",
                    "type": "齿轮轮廓拉伸",
                    "plane": "XZ",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 72},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": 10.0, "cy": 0.0, "r": 3.5},
                        {"shape": "circle", "cx": -10.0, "cy": 0.0, "r": 3.5},
                        {"shape": "circle", "cx": 0.0, "cy": 10.0, "r": 3.5},
                        {"shape": "circle", "cx": 0.0, "cy": -10.0, "r": 3.5},
                    ],
                }
            ],
        },
        {
            "id": "P07",
            "name": "底部横向主传动轴",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "自制传动件",
            "process": "精密磨削光轴",
            "material": "304不锈钢",
            "color": "#e2e8f0",
            "quantity": 1,
            "size": [5.0, 92.0, 5.0],
            "note": "布置于下层传动箱(X=-42,Z=28mm)，承接72齿主减速大齿轮动力，同时驱动0.5模单头蜗杆(转向时基)与16齿正交传力锥齿轮(四驱分动)",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 g6 × 92.0 mm", "note": "两端由主传动轴立式轴承座支承"},
            ],
            "features": [
                {
                    "id": "P07-F01",
                    "name": "横向主传动光轴",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -46.0,
                    "w1": 46.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "G05",
            "name": "20齿分动直齿轮",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "外购/定制传动件",
            "process": "黄铜/钢制滚齿",
            "material": "45钢表面发黑/黄铜",
            "color": "#f59e0b",
            "quantity": 2,
            "size": [11.0, 6.0, 11.0],
            "note": "模数m=0.5，齿数z=20，分度圆d=10.0mm，安装在底部纵向分动长轴中段稳速传递扭矩",
            "keyDimensions": [
                {"name": "模数 / 齿数", "value": "m = 0.5 mm, z = 20", "note": "内孔Φ5.0mm"},
            ],
            "features": [
                {
                    "id": "G05-F01",
                    "name": "20齿分动齿轮主体",
                    "type": "齿轮轮廓拉伸",
                    "plane": "YZ",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 20},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                }
            ],
        },
        {
            "id": "P08",
            "name": "底部纵向分动长轴",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "自制传动件",
            "process": "精密磨削光轴",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 1,
            "size": [152.0, 5.0, 5.0],
            "note": "贯通下层底盘中心线(Y=0, Z=28mm, X∈[-76,+76]mm)，将主减速动力同步输送至前桥与后桥分动箱十字轴承座",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 g6 × 152.0 mm", "note": "全车四轮驱动中央贯通主轴"},
            ],
            "features": [
                {
                    "id": "P08-F01",
                    "name": "中央纵向贯通分动轴",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -76.0,
                    "w1": 76.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P10",
            "name": "分动箱十字轴承座",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "自制核心件",
            "process": "CNC铝合金五面铣削",
            "material": "6061-T6铝合金",
            "color": "#0284c7",
            "quantity": 2,
            "size": [32.0, 32.0, 20.0],
            "note": "前后对称安装在底部传动副底板(X=±68,Y=0,Z=28mm)，正交十字轴孔约束16齿正交传力锥齿轮副，将纵向动力90°分流至左右横向分动短轴",
            "keyDimensions": [
                {"name": "正交轴孔夹角", "value": "90.0° ± 0.05°", "note": "保证1:1锥齿轮正交啮合精度"},
                {"name": "外形尺寸", "value": "32.0 × 32.0 × 20.0 mm", "note": "内腔容纳3只正交啮合锥齿轮"},
            ],
            "features": [
                {
                    "id": "P10-F01",
                    "name": "十字正交分动箱壳体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -10.0,
                    "w1": 10.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 32.0, "h": 32.0, "fillet": 4.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 22.0, "h": 22.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "G06",
            "name": "16齿正交传力锥齿轮",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "外购/定制传动件",
            "process": "黄铜精密铣齿",
            "material": "H59黄铜",
            "color": "#d97706",
            "quantity": 12,
            "size": [10.0, 10.0, 6.0],
            "note": "模数m=0.5，齿数z=16，分度圆锥角45°(1:1正交传动)，用于中央十字分动箱(4只)及四角全向舵轮主销顶部/底部同轴换向(8只)",
            "keyDimensions": [
                {"name": "模数 / 齿数 / 轴交角", "value": "m = 0.5 mm, z = 16, Σ = 90°", "note": "实现全向舵轮旋转中心同轴传力"},
            ],
            "features": [
                {
                    "id": "G06-F01",
                    "name": "16齿45度锥齿轮体",
                    "type": "齿轮轮廓拉伸",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 16},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.0}],
                }
            ],
        },
        {
            "id": "P09",
            "name": "横向分动短轴",
            "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
            "category": "自制传动件",
            "process": "精密磨削",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 4,
            "size": [5.0, 48.0, 5.0],
            "note": "共4根布置于前/后桥左右两侧(X=±68, Y=±28, Z=28mm)，将十字分动箱扭矩横向传递至四角全向舵轮主销上方锥齿轮",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 × 48.0 mm", "note": "两端安装16齿正交传力锥齿轮"},
            ],
            "features": [
                {
                    "id": "P09-F01",
                    "name": "横向分动传动短轴",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -24.0,
                    "w1": 24.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },

        # ==================== 03 四轮独立全向舵轮模组(非麦轮) ====================
        {
            "id": "P11",
            "name": "全向转向空心主销套筒",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "自制核心件",
            "process": "精密数控车削",
            "material": "304不锈钢",
            "color": "#38bdf8",
            "quantity": 4,
            "size": [10.0, 10.0, 28.0],
            "note": "外径Φ10mm配合6700ZZ薄壁转向轴承，内孔Φ5.2mm供『舵轮同轴传力竖销』无干涉穿过，下端刚性连接全向舵轮转向叉架，上端锁紧舵轮同步转向摇臂",
            "keyDimensions": [
                {"name": "外径 D × 内孔 d × 长 L", "value": "Φ10.0 g6 × Φ5.2 × 28.0 mm", "note": "同轴双自由度解耦核心零件(外筒控转向、内轴传动力)"},
            ],
            "features": [
                {
                    "id": "P11-F01",
                    "name": "空心转向主销套筒体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -14.0,
                    "w1": 14.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 5.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.6}],
                }
            ],
        },
        {
            "id": "P12",
            "name": "全向舵轮转向叉架",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "自制核心件",
            "process": "CNC铝合金一体铣削",
            "material": "6061-T6铝合金",
            "color": "#0284c7",
            "quantity": 4,
            "size": [26.0, 24.0, 26.0],
            "note": "共4件分布于底盘四角(X=±68,Y=±52,Z=22mm)，随空心主销套筒同步偏转±90°/360°，下部支承舵轮固定横轴与高抓地全向舵轮",
            "keyDimensions": [
                {"name": "U型叉内宽", "value": "16.0 mm", "note": "容纳10mm宽全向舵轮与侧面舵轮轮边锥齿圈"},
                {"name": "轮心高度", "value": "Z = 20.0 mm", "note": "配合Φ40mm舵轮实现整车离地间隙16.25mm"},
            ],
            "features": [
                {
                    "id": "P12-F01",
                    "name": "全向舵轮U型转向叉主体",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -12.0,
                    "w1": 12.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 24.0, "h": 26.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": -4.0, "w": 16.0, "h": 18.0, "fillet": 1.0}],
                }
            ],
        },
        {
            "id": "P13",
            "name": "舵轮同轴传力竖销",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "自制核心件",
            "process": "精密车削磨削",
            "material": "304不锈钢",
            "color": "#f8fafc",
            "quantity": 4,
            "size": [4.0, 4.0, 34.0],
            "note": "同轴穿过『全向转向空心主销套筒』中心通孔，上端装16齿锥齿轮接收横向分动短轴动力，下端装16齿锥齿轮驱动舵轮轮边锥齿圈",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ4.0 g6 × 34.0 mm", "note": "确保车轮朝任意方向转向时驱动力矩恒定不中断"},
            ],
            "features": [
                {
                    "id": "P13-F01",
                    "name": "同轴中心传力竖销",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -17.0,
                    "w1": 17.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.0},
                    "holes": [],
                }
            ],
        },
        {
            "id": "G07",
            "name": "舵轮轮边锥齿圈",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "外购/定制传动件",
            "process": "POM/黄铜精密加工",
            "material": "H59黄铜",
            "color": "#f59e0b",
            "quantity": 4,
            "size": [12.0, 4.0, 12.0],
            "note": "固连在4只高抓地全向舵轮内侧端面，与舵轮同轴传力竖销下端锥齿轮正交啮合，实现轮边终传驱动",
            "keyDimensions": [
                {"name": "模数 / 齿数", "value": "m = 0.5 mm, z = 20", "note": "分度圆直径10.0mm"},
            ],
            "features": [
                {
                    "id": "G07-F01",
                    "name": "轮边终传锥齿圈",
                    "type": "齿轮轮廓拉伸",
                    "plane": "XZ",
                    "w0": -2.0,
                    "w1": 2.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 20},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                }
            ],
        },
        {
            "id": "P14",
            "name": "舵轮固定横轴",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "自制传动件",
            "process": "精密磨削",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 4,
            "size": [5.0, 26.0, 5.0],
            "note": "安装在4只全向舵轮转向叉架下部轴孔(Z=20mm)，支承高抓地全向舵轮旋转",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 × 26.0 mm", "note": "两端卡簧限位"},
            ],
            "features": [
                {
                    "id": "P14-F01",
                    "name": "舵轮轮心横轴",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -13.0,
                    "w1": 13.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "W01",
            "name": "高抓地全向舵轮",
            "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
            "category": "自制/标准轮组",
            "process": "CNC铝合金轮毂+高摩擦硅胶实心胎",
            "material": "6061铝合金+防滑硅胶胎",
            "color": "#1e293b",
            "quantity": 4,
            "size": [40.0, 10.0, 40.0],
            "note": "共4件分布于四轮独立转向舵轮总成(绝不使用麦克纳姆轮！)，依靠舵轮主销同向/反向同步偏转实现零侧滑全方向平移、斜行与急转",
            "keyDimensions": [
                {"name": "外径 D × 轮宽 B", "value": "Φ40.0 × 10.0 mm", "note": "实心硅胶窄胎，抓地力高、无麦轮辊子打滑损耗"},
                {"name": "全向移动原理", "value": "四轮同步独立转向舵轮 (Swerve Drive)", "note": "支持直行、蟹行横移、45°斜行、阿克曼转弯与原地回转"},
            ],
            "features": [
                {
                    "id": "W01-F01",
                    "name": "全向舵轮轮毂与防滑胎圈",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 20.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": 11.0, "cy": 0.0, "r": 3.5},
                        {"shape": "circle", "cx": -11.0, "cy": 0.0, "r": 3.5},
                        {"shape": "circle", "cx": 0.0, "cy": 11.0, "r": 3.5},
                        {"shape": "circle", "cx": 0.0, "cy": -11.0, "r": 3.5},
                    ],
                }
            ],
        },

        # ==================== 04 双凸轮正交连杆与四轮同步全向转向机构 ====================
        {
            "id": "G03",
            "name": "0.5模单头蜗杆",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "外购/定制传动件",
            "process": "黄铜车削",
            "material": "H59黄铜",
            "color": "#d97706",
            "quantity": 1,
            "size": [11.0, 18.0, 11.0],
            "note": "锁紧在底部横向主传动轴中段(X=-42,Y=0,Z=28mm)，驱动30齿青铜蜗轮构成1:30转向时基减速并具备反向自锁能力",
            "keyDimensions": [
                {"name": "模数 / 头数 / 分度圆", "value": "m = 0.5 mm, z1 = 1, d1 = 11.0 mm", "note": "自锁防地面冲击反驱"},
            ],
            "features": [
                {
                    "id": "G03-F01",
                    "name": "0.5模单头蜗杆体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -9.0,
                    "w1": 9.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 5.5},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                }
            ],
        },
        {
            "id": "G04",
            "name": "30齿青铜蜗轮",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "外购/定制传动件",
            "process": "锡青铜滚齿",
            "material": "QSn6.5-0.1锡青铜",
            "color": "#b45309",
            "quantity": 1,
            "size": [16.0, 16.0, 6.0],
            "note": "锁紧在凸轮传力竖轴下端(X=-30,Y=0,Z=28mm)，与0.5模单头蜗杆啮合(中心距12.0~13.0mm)，实现1:30减速驱动上下双凸轮盘",
            "keyDimensions": [
                {"name": "模数 / 齿数 / 减速比", "value": "m = 0.5 mm, z2 = 30, i = 1:30", "note": "同步驱动主航向凸轮C01与差动副凸轮C02"},
            ],
            "features": [
                {
                    "id": "G04-F01",
                    "name": "30齿蜗轮齿圈",
                    "type": "齿轮轮廓拉伸",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "gear",
                    "params": {"module": 0.5, "teeth": 30},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                }
            ],
        },
        {
            "id": "P15",
            "name": "凸轮传力竖轴",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制传动件",
            "process": "精密磨削",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 1,
            "size": [5.0, 5.0, 52.0],
            "note": "垂直贯穿上下双层底板(X=-30,Y=0,Z∈[16,68]mm)，下段装30齿蜗轮与差动转向副凸轮盘(Z=35mm)，上段装主航向盘形转向凸轮(Z=56mm)",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 g6 × 52.0 mm", "note": "同轴串联双凸轮实现全向航向与前后差动解耦"},
            ],
            "features": [
                {
                    "id": "P15-F01",
                    "name": "双凸轮同轴传力竖轴",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -26.0,
                    "w1": 26.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P16",
            "name": "凸轮轴立式轴承座",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#3b82f6",
            "quantity": 1,
            "size": [28.0, 28.0, 20.0],
            "note": "安装在铝合金主底板(X=-30,Y=0,Z=42mm)，内置双625ZZ深沟球轴承承受上下双凸轮推杆径向合力",
            "keyDimensions": [
                {"name": "轴承室孔径", "value": "Φ16.0 H7 mm", "note": "双轴承高刚度支承"},
            ],
            "features": [
                {
                    "id": "P16-F01",
                    "name": "凸轮竖轴法兰轴承座",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -10.0,
                    "w1": 10.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 28.0, "h": 28.0, "fillet": 4.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0}],
                }
            ],
        },
        {
            "id": "C01",
            "name": "主航向盘形转向凸轮",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC精密铣削",
            "material": "7075航空铝合金",
            "color": "#ef4444",
            "quantity": 1,
            "size": [46.4, 46.4, 5.0],
            "note": "上层主凸轮(Z=56mm)，采用五次多项式曲线 s1(u)=h1(10u³-15u⁴+6u⁵)，基圆r0=18mm，升程h1=±5.2mm，驱动纵向同步转向主推杆控制四轮基准航向角",
            "keyDimensions": [
                {"name": "基圆半径 r0 / 升程 h1", "value": "r0 = 18.0 mm, h1 = ±5.20 mm", "note": "驱动16mm摇臂产生最大±18°~±25°同步全向偏转"},
                {"name": "五次多项式方程", "value": "s1(u) = h1(10u³ - 15u⁴ + 6u⁵)", "note": "无冲击连续高阶导数，最大压力角25.4°<30°"},
            ],
            "features": [
                {
                    "id": "C01-F01",
                    "name": "主航向五次多项式凸轮轮廓",
                    "type": "凸轮曲线拉伸",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "cam",
                    "params": {"base_r": 18.0, "stroke": 5.2},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": 8.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": -8.0, "cy": 0.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "C02",
            "name": "差动转向副凸轮盘",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC精密铣削",
            "material": "POM聚甲醛(赛钢)/铝合金",
            "color": "#f97316",
            "quantity": 1,
            "size": [39.6, 39.6, 5.0],
            "note": "同轴布置于下层传动腔(Z=35mm)，采用共轭五次多项式廓线 s2(θ)，独立驱动『后桥差动相位推杆』，控制后轮与前轮同向蟹行(δ前=δ后)或反向急转(δ前=-δ后)",
            "keyDimensions": [
                {"name": "基圆半径 r0 / 差动升程 h2", "value": "r0 = 16.0 mm, h2 = ±3.80 mm", "note": "与主凸轮C01协同合成任意全向移动矢量"},
            ],
            "features": [
                {
                    "id": "C02-F01",
                    "name": "下层差动相位副凸轮轮廓",
                    "type": "凸轮曲线拉伸",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "cam",
                    "params": {"base_r": 16.0, "stroke": 3.8},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": 7.5, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": -7.5, "cy": 0.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "B02",
            "name": "MR84ZZ凸轮滚子轴承",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "外购标准件",
            "process": "轴承钢标准件",
            "material": "GCr15轴承钢",
            "color": "#94a3b8",
            "quantity": 2,
            "size": [8.0, 8.0, 3.0],
            "note": "共2只(Φ8×Φ4×3mm)，分别安装在纵向同步转向主推杆与后桥差动相位推杆的滚子叉口上，紧贴上下双凸轮轮廓低阻滚动",
            "keyDimensions": [
                {"name": "外径 D × 内径 d × 宽 B", "value": "Φ8.0 × Φ4.0 × 3.0 mm", "note": "滚子半径 rr = 4.0 mm"},
            ],
            "features": [
                {
                    "id": "B02-F01",
                    "name": "MR84ZZ滚子轴承环",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -1.5,
                    "w1": 1.5,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 4.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.0}],
                }
            ],
        },
        {
            "id": "P17",
            "name": "纵向同步转向主推杆",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金线切割",
            "material": "6061-T6铝合金",
            "color": "#10b981",
            "quantity": 1,
            "size": [116.0, 8.0, 5.0],
            "note": "沿上层底盘中心线(Z=56mm)往复运动，由主航向盘形转向凸轮(C01)推动，前端联动『前桥平行四边形转向横拉杆』，并通过全向模式切换滑块联动后桥",
            "keyDimensions": [
                {"name": "总长 × 截面", "value": "116.0 × 8.0 × 5.0 mm", "note": "行程 ±5.20 mm"},
            ],
            "features": [
                {
                    "id": "P17-F01",
                    "name": "纵向主推杆杆体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 116.0, "h": 8.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": -52.0, "cy": 0.0, "r": 2.0},
                        {"shape": "rect", "cx": 52.0, "cy": 0.0, "w": 6.0, "h": 3.2, "fillet": 1.5},
                    ],
                }
            ],
        },
        {
            "id": "P18",
            "name": "转向推杆直线导向座",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制结构件",
            "process": "CNC加工",
            "material": "POM聚甲醛(自润滑)",
            "color": "#059669",
            "quantity": 2,
            "size": [14.0, 22.0, 20.0],
            "note": "前后对称安装在铝合金主底板上表面(X=+2与X=+44, Y=0)，精密矩形滑槽约束纵向同步转向主推杆平稳移动",
            "keyDimensions": [
                {"name": "滑槽尺寸", "value": "8.2 × 5.2 mm", "note": "自润滑零卡滞导向"},
            ],
            "features": [
                {
                    "id": "P18-F01",
                    "name": "推杆直线导向滑座",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -7.0,
                    "w1": 7.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 22.0, "h": 20.0, "fillet": 2.5},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 4.0, "w": 8.4, "h": 5.4, "fillet": 0.5}],
                }
            ],
        },
        {
            "id": "SP1",
            "name": "推杆复位圆柱弹簧",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "外购标准件",
            "process": "弹簧钢绕制",
            "material": "65Mn弹簧钢",
            "color": "#a8a29e",
            "quantity": 2,
            "size": [22.0, 12.0, 12.0],
            "note": "共2件：分别套设在纵向同步转向主推杆与后桥差动相位推杆上，提供恒定预紧力使两只MR84ZZ滚子轴承始终贴紧上下双凸轮",
            "keyDimensions": [
                {"name": "外径 × 自由长", "value": "Φ12.0 × 22.0 mm", "note": "双弹簧独立力锁合"},
            ],
            "features": [
                {
                    "id": "SP1-F01",
                    "name": "圆柱压缩弹簧包络",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -11.0,
                    "w1": 11.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 6.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 4.2}],
                }
            ],
        },
        {
            "id": "P19",
            "name": "后桥差动相位推杆",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金线切割",
            "material": "6061-T6铝合金",
            "color": "#34d399",
            "quantity": 1,
            "size": [58.0, 7.0, 5.0],
            "note": "布置于凸轮竖轴后方(X∈[-74,-16]mm, Z=35mm)，由下层『差动转向副凸轮盘』(C02)驱动，控制『后桥平行四边形转向横拉杆』实现同向蟹行或反向转向",
            "keyDimensions": [
                {"name": "总长 × 截面", "value": "58.0 × 7.0 × 5.0 mm", "note": "连接副凸轮C02滚子至后桥转向横拉杆"},
            ],
            "features": [
                {
                    "id": "P19-F01",
                    "name": "后桥差动推杆本体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 58.0, "h": 7.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": 24.0, "cy": 0.0, "r": 2.0},
                        {"shape": "circle", "cx": -24.0, "cy": 0.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P20",
            "name": "前桥平行四边形转向横拉杆",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#06b6d4",
            "quantity": 1,
            "size": [10.0, 112.0, 5.0],
            "note": "横向布置于前桥上方(X=+82, Y∈[-52,+52], Z=54mm)，与左右前轮『舵轮同步转向摇臂』构成平行四边形机构，确保左前与右前全向舵轮1:1严格同角偏转",
            "keyDimensions": [
                {"name": "两端铰接孔距", "value": "104.0 mm (对应轮距 Y = ±52.0 mm)", "note": "平行四边形1:1等角同步连杆"},
            ],
            "features": [
                {
                    "id": "P20-F01",
                    "name": "前桥同步转向横拉杆",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 10.0, "h": 112.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": -52.0, "r": 1.6},
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": 0.0, "cy": 52.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P21",
            "name": "后桥平行四边形转向横拉杆",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#0891b2",
            "quantity": 1,
            "size": [10.0, 112.0, 5.0],
            "note": "横向布置于后桥(X=-82, Y∈[-52,+52], Z=54mm)，与左右后轮『舵轮同步转向摇臂』构成后平行四边形机构，实现后两轮同步同向蟹行或反向急转",
            "keyDimensions": [
                {"name": "两端铰接孔距", "value": "104.0 mm (Y = ±52.0 mm)", "note": "与前桥横拉杆对称匹配"},
            ],
            "features": [
                {
                    "id": "P21-F01",
                    "name": "后桥同步转向横拉杆",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 10.0, "h": 112.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": -52.0, "r": 1.6},
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": 0.0, "cy": 52.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P22",
            "name": "舵轮同步转向摇臂",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金铣削",
            "material": "6061-T6铝合金",
            "color": "#0ea5e9",
            "quantity": 4,
            "size": [24.0, 14.0, 6.0],
            "note": "共4件分别锁紧在四角『全向转向空心主销套筒』顶端(X=±68,Y=±52,Z=54mm)，摇臂孔距14.0mm，由前/后平行四边形转向横拉杆同步驱动",
            "keyDimensions": [
                {"name": "有效摇臂半径 R_arm", "value": "14.0 mm", "note": "主销孔Φ10.0mm夹紧结构，销孔Φ3.0mm连接横拉杆"},
            ],
            "features": [
                {
                    "id": "P22-F01",
                    "name": "舵轮主销转向摇臂体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "rect",
                    "params": {"cx": 4.0, "cy": 0.0, "w": 24.0, "h": 14.0, "fillet": 4.0},
                    "holes": [
                        {"shape": "circle", "cx": -2.0, "cy": 0.0, "r": 4.8},
                        {"shape": "circle", "cx": 12.0, "cy": 0.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P23",
            "name": "全向模式切换滑块",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金加工",
            "material": "7075铝合金",
            "color": "#ec4899",
            "quantity": 1,
            "size": [26.0, 18.0, 10.0],
            "note": "位于前/后转向推杆耦合桥处(X=-58,Y=0,Z=50mm)，通过插拔『模式切换定位销』可在【同向蟹行全向平移(1:+1)】、【反向最小半径急转(1:-1)】与【双凸轮独立耦合】三种全向移动模式间一键切换",
            "keyDimensions": [
                {"name": "多模态耦合孔距", "value": "同向孔 +7.0 mm / 反向孔 -7.0 mm / 差动孔 0.0 mm", "note": "纯机械实现全向底盘多模态运动切换"},
            ],
            "features": [
                {
                    "id": "P23-F01",
                    "name": "全向模式切换耦合滑块",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 26.0, "h": 18.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": -7.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": 7.0, "cy": 0.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P24",
            "name": "模式切换定位销",
            "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
            "category": "自制连接件",
            "process": "精密车削+滚花",
            "material": "303不锈钢",
            "color": "#f43f5e",
            "quantity": 2,
            "size": [6.0, 6.0, 16.0],
            "note": "带滚花帽头的Φ3mm快拆定位销，用于锁定全向模式切换滑块及前/后桥横拉杆耦合点",
            "keyDimensions": [
                {"name": "销径 × 总长", "value": "Φ3.0 f7 × 16.0 mm", "note": "免工具徒手切换蟹行/急转/复合模式"},
            ],
            "features": [
                {
                    "id": "P24-F01",
                    "name": "快拆滚花定位销",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -8.0,
                    "w1": 8.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.8},
                    "holes": [],
                }
            ],
        },

        # ==================== 05 太阳能供电与赛会电控检测系统 ====================
        {
            "id": "E01",
            "name": "单晶硅太阳能电池板",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "层压成品件",
            "material": "单晶硅+钢化玻璃",
            "color": "#1e3a8a",
            "quantity": 1,
            "size": [66.0, 113.0, 3.0],
            "note": "严格符合三期考核尺寸(66×113×3mm)，平置安装于车体中后部正上方(X=-22,Y=0,Z=96mm)，受光面100%无遮挡",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "66.0 × 113.0 × 3.0 mm", "note": "受光面朝+Z正上方"},
            ],
            "features": [
                {
                    "id": "E01-F01",
                    "name": "单晶硅太阳能板主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -1.5,
                    "w1": 1.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 66.0, "h": 113.0, "fillet": 1.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P25",
            "name": "太阳能板承载框",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "自制结构件",
            "process": "3D打印/CNC加工",
            "material": "PLA-CF碳纤增强",
            "color": "#334155",
            "quantity": 1,
            "size": [72.0, 119.0, 5.0],
            "note": "承托66×113×3mm单晶硅太阳能电池板的轻量化护边框架(Z=93.5mm)",
            "keyDimensions": [
                {"name": "外框尺寸", "value": "72.0 × 119.0 × 5.0 mm", "note": "四角连接4根太阳能板支撑立柱"},
            ],
            "features": [
                {
                    "id": "P25-F01",
                    "name": "太阳能板承载护框",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 72.0, "h": 119.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 58.0, "h": 105.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "P26",
            "name": "太阳能板支撑立柱",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "自制结构件",
            "process": "车削加工",
            "material": "6061铝合金",
            "color": "#64748b",
            "quantity": 4,
            "size": [6.0, 6.0, 48.0],
            "note": "4根Φ6×48mm立柱，将太阳能板承载框稳固支承在铝合金主底板上方",
            "keyDimensions": [
                {"name": "外径 × 长度", "value": "Φ6.0 × 48.0 mm", "note": "两端M3螺纹连接"},
            ],
            "features": [
                {
                    "id": "P26-F01",
                    "name": "太阳能板支撑立柱体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -24.0,
                    "w1": 24.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 3.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
        {
            "id": "E02",
            "name": "超级电容储能模组",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品储能模块",
            "material": "法拉电容组+均衡板",
            "color": "#047857",
            "quantity": 1,
            "size": [68.0, 48.0, 36.0],
            "note": "符合三期考核规范(≤70×70×50mm)，布置于主底板中右部超级电容固定座内(X=+4,Y=-36,Z=62mm)",
            "keyDimensions": [
                {"name": "包络尺寸", "value": "68.0 × 48.0 × 36.0 mm", "note": "重心居中偏下，提高全向急转稳定性"},
            ],
            "features": [
                {
                    "id": "E02-F01",
                    "name": "超级电容储能模组主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -18.0,
                    "w1": 18.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 68.0, "h": 48.0, "fillet": 4.0},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P27",
            "name": "超级电容固定座",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "自制结构件",
            "process": "3D打印",
            "material": "ABS工程塑料",
            "color": "#475569",
            "quantity": 1,
            "size": [72.0, 52.0, 10.0],
            "note": "锁紧在铝合金主底板上表面右侧，四周波纹卡槽固定超级电容储能模组",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "72.0 × 52.0 × 10.0 mm", "note": "内腔68.4×48.4mm"},
            ],
            "features": [
                {
                    "id": "P27-F01",
                    "name": "电容固定围框",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 72.0, "h": 52.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 64.0, "h": 44.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "E03",
            "name": "充电与语音控制电路板",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "PCB成品模块",
            "material": "FR-4玻纤板+电子器件",
            "color": "#15803d",
            "quantity": 1,
            "size": [64.0, 44.0, 6.0],
            "note": "符合三期考核尺寸(≤65×45mm)，通过M3铜柱安装在铝合金主底板中左侧(X=+4,Y=+36,Z=52mm)",
            "keyDimensions": [
                {"name": "PCB尺寸", "value": "64.0 × 44.0 × 6.0 mm", "note": "集成MPPT太阳能充电管理与语音控制"},
            ],
            "features": [
                {
                    "id": "E03-F01",
                    "name": "控制电路板主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 64.0, "h": 44.0, "fillet": 2.0},
                    "holes": [],
                }
            ],
        },
        {
            "id": "E04",
            "name": "顶部电能检测模块",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品检测仪表",
            "material": "ABS壳体+LCD显示屏",
            "color": "#0f172a",
            "quantity": 1,
            "size": [35.0, 84.0, 24.0],
            "note": "严格按开会记录要求(35×84×26mm)置于车头顶部正上方(X=+60,Y=0,Z=86mm)，液晶显示窗朝上100%无遮挡",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "35.0 × 84.0 × 24.0 mm", "note": "顶部完全无遮挡"},
            ],
            "features": [
                {
                    "id": "E04-F01",
                    "name": "顶部电能检测表主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -12.0,
                    "w1": 12.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 35.0, "h": 84.0, "fillet": 2.0},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P28",
            "name": "电能检测模块支架",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "自制结构件",
            "process": "3D打印/CNC折弯",
            "material": "PLA-CF/铝合金",
            "color": "#475569",
            "quantity": 1,
            "size": [38.0, 92.0, 32.0],
            "note": "龙门式高架托架，跨过前桥平行四边形转向横拉杆上方，将顶部电能检测模块与红色LED指示灯稳固托举在车头顶部",
            "keyDimensions": [
                {"name": "跨度 × 高度", "value": "92.0 × 32.0 mm", "note": "下部净空完全避让前桥转向横拉杆"},
            ],
            "features": [
                {
                    "id": "P28-F01",
                    "name": "龙门跨接支架主体",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -19.0,
                    "w1": 19.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 92.0, "h": 32.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": -4.0, "w": 74.0, "h": 24.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "E05",
            "name": "顶部红色LED指示灯",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品LED灯珠组件",
            "material": "高亮红光环氧透镜+金属座",
            "color": "#dc2626",
            "quantity": 1,
            "size": [12.0, 12.0, 14.0],
            "note": "符合开会记录『车顶部放置一个不小于8mm的红色LED指示灯』要求，采用Φ10mm高亮红色LED置于车头顶部(X=+60,Y=+50,Z=88mm)，无任何遮挡",
            "keyDimensions": [
                {"name": "发光灯头直径", "value": "Φ10.0 mm (≥ Φ8.0 mm要求)", "note": "顶部直视100%无遮挡"},
            ],
            "features": [
                {
                    "id": "E05-F01",
                    "name": "Φ10mm红色LED灯体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -7.0,
                    "w1": 7.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 5.0},
                    "holes": [],
                }
            ],
        },
        {
            "id": "E06",
            "name": "底部RFID读卡器模块",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "赛会指定电子件",
            "process": "射频PCB成品模块",
            "material": "FR-4射频天线板",
            "color": "#0284c7",
            "quantity": 1,
            "size": [40.0, 40.0, 3.0],
            "note": "符合三期考核尺寸(40×40×3mm)，安装在下层底部传动副底板下表面(X=+22,Y=0,Z=14mm)，由底部读卡器防护盒全封闭包裹不外露",
            "keyDimensions": [
                {"name": "模块尺寸", "value": "40.0 × 40.0 × 3.0 mm", "note": "距地面高度14mm，读卡灵敏度极佳"},
            ],
            "features": [
                {
                    "id": "E06-F01",
                    "name": "RFID读卡器天线板",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -1.5,
                    "w1": 1.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 40.0, "h": 40.0, "fillet": 1.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P29",
            "name": "底部读卡器防护盒",
            "subsystem": "05 太阳能供电与赛会电控检测系统",
            "category": "自制结构件",
            "process": "3D打印",
            "material": "ABS非金属透波塑料",
            "color": "#64748b",
            "quantity": 1,
            "size": [48.0, 48.0, 7.0],
            "note": "严格落实开会记录『读卡器放在小车底部，不能外露』要求，全包裹封装底部RFID读卡器模块于副底板下方(Z=13mm)",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "48.0 × 48.0 × 7.0 mm", "note": "非金属透波防护壳，完全不外露"},
            ],
            "features": [
                {
                    "id": "P29-F01",
                    "name": "读卡器全封闭防护盒",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -3.5,
                    "w1": 3.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 48.0, "h": 48.0, "fillet": 3.0},
                    "holes": [],
                }
            ],
        },

        # ==================== 06 外壳护罩与标准紧固件 ====================
        {
            "id": "P30",
            "name": "轻量化快拆外壳",
            "subsystem": "06 外壳护罩与标准紧固件",
            "category": "自制外观件",
            "process": "3D打印一体成型",
            "material": "半透轻质PLA",
            "color": "#38bdf8",
            "quantity": 1,
            "size": [208.0, 158.0, 36.0],
            "note": "流线型全向车体快拆护罩，顶部大开口完全避让单晶硅太阳能板、顶部电能检测模块与红色LED指示灯，四角轮拱避让全向舵轮360°转向",
            "keyDimensions": [
                {"name": "外包络尺寸", "value": "208.0 × 158.0 × 36.0 mm", "note": "满足整车长≤250mm、宽≤200mm规范"},
            ],
            "features": [
                {
                    "id": "P30-F01",
                    "name": "全向小车快拆流线护罩",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -18.0,
                    "w1": 18.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 208.0, "h": 158.0, "fillet": 16.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 200.0, "h": 150.0, "fillet": 13.0}],
                }
            ],
        },
        {
            "id": "F01",
            "name": "M3铜柱与紧固件套件",
            "subsystem": "06 外壳护罩与标准紧固件",
            "category": "外购标准件",
            "process": "标准件",
            "material": "H59黄铜/304不锈钢",
            "color": "#facc15",
            "quantity": 8,
            "size": [6.0, 6.0, 10.0],
            "note": "全车统一采用M3紧固体系（含电路板支撑铜柱与轴承座锁紧螺钉）",
            "keyDimensions": [
                {"name": "规格", "value": "M3 × 0.5 标准螺纹组件", "note": "全车单一扳手拆装"},
            ],
            "features": [
                {
                    "id": "F01-F01",
                    "name": "M3六角支撑铜柱",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 3.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
    ]

    for idx, p in enumerate(raw_parts, start=1):
        sw_name = p["name"]
        p["partNumber"] = f"SC-{idx:02d}"
        p["solidworksName"] = sw_name
        p["solidworksFile"] = f"{sw_name}.SLDPRT"
        p["drawingUrl"] = f"docs/零件图册/{p['id']}.html"
        p["featureCount"] = len(p["features"])
    return raw_parts


def build_meshes_for_parts(parts: List[Dict[str, object]]) -> Dict[str, Dict[str, object]]:
    """Generate 3D triangulated meshes for every part."""
    meshes: Dict[str, Dict[str, object]] = {}
    for p in parts:
        acc = MeshAccumulator()
        for feat in p["features"]:
            plane = feat["plane"]
            w0 = float(feat["w0"])
            w1 = float(feat["w1"])
            shape = feat["shape"]
            params = feat["params"]
            if shape == "rect":
                outer = make_rect_loop(
                    params["cx"],
                    params["cy"],
                    params["w"],
                    params["h"],
                    params.get("fillet", 0.0),
                )
            elif shape == "circle":
                outer = make_circle_loop(params["cx"], params["cy"], params["r"], 32)
            elif shape == "gear":
                outer = make_gear_loop(params["module"], params["teeth"])
            elif shape == "cam":
                outer = make_cam_loop(params["base_r"], params["stroke"], 96)
            else:
                outer = make_rect_loop(0.0, 0.0, 10.0, 10.0)

            holes = []
            for h in feat.get("holes", []):
                if h["shape"] == "circle":
                    holes.append(make_circle_loop(h["cx"], h["cy"], h["r"], 20))
                elif h["shape"] == "rect":
                    holes.append(
                        make_rect_loop(
                            h["cx"],
                            h["cy"],
                            h["w"],
                            h["h"],
                            h.get("fillet", 0.0),
                        )
                    )
            acc.add_extruded_polygon(plane, outer, holes, w0, w1)
        meshes[p["id"]] = acc.to_dict()
    return meshes


def build_assembly_placements(parts: List[Dict[str, object]]) -> List[Dict[str, object]]:
    """Return 3D assembly instances for the 4-wheel coaxial swerve & dual-cam bottom transmission solar car."""
    part_map = {p["id"]: p for p in parts}

    def inst(
        inst_id: str,
        part_id: str,
        label: str,
        pos: Tuple[float, float, float],
        rot: Tuple[float, float, float] = (0.0, 0.0, 0.0),
        step: int = 1,
        motion: str = "static",
    ) -> Dict[str, object]:
        p = part_map[part_id]
        return {
            "instanceId": inst_id,
            "partId": part_id,
            "partName": p["name"],
            "solidworksFile": p["solidworksFile"],
            "label": label,
            "subsystem": p["subsystem"],
            "color": p["color"],
            "position": [round(pos[0], 2), round(pos[1], 2), round(pos[2], 2)],
            "rotation": [round(rot[0], 2), round(rot[1], 2), round(rot[2], 2)],
            "step": step,
            "motion": motion,
        }

    placements = [
        # ==================== Step 1: 双层高刚度全向底盘骨架 ====================
        inst("I01", "P01", "铝合金主底板(上层Z=42)", (0.0, 0.0, 42.0), step=1),
        inst("I02", "P02", "底部传动副底板(下层Z=18)", (0.0, 0.0, 18.0), step=1),
        # 6根层间支撑柱
        inst("I03", "P03", "底盘层间支撑柱(左后)", (-54.0, 56.0, 30.0), step=1),
        inst("I04", "P03", "底盘层间支撑柱(右后)", (-54.0, -56.0, 30.0), step=1),
        inst("I05", "P03", "底盘层间支撑柱(左中)", (0.0, 56.0, 30.0), step=1),
        inst("I06", "P03", "底盘层间支撑柱(右中)", (0.0, -56.0, 30.0), step=1),
        inst("I07", "P03", "底盘层间支撑柱(左前)", (54.0, 56.0, 30.0), step=1),
        inst("I08", "P03", "底盘层间支撑柱(右前)", (54.0, -56.0, 30.0), step=1),
        # 4件主传动轴立式轴承座 + 轴承
        inst("I09", "P04", "主传动轴立式轴承座(横轴左)", (-42.0, 40.0, 28.0), step=1),
        inst("I10", "P04", "主传动轴立式轴承座(横轴右)", (-42.0, -40.0, 28.0), step=1),
        inst("I11", "P04", "主传动轴立式轴承座(纵轴后)", (-12.0, 0.0, 28.0), step=1),
        inst("I12", "P04", "主传动轴立式轴承座(纵轴前)", (38.0, 0.0, 28.0), step=1),
        inst("I13", "B01", "625ZZ深沟球轴承(横轴左)", (-42.0, 40.0, 28.0), step=1),
        inst("I14", "B01", "625ZZ深沟球轴承(横轴右)", (-42.0, -40.0, 28.0), step=1),
        # 四角全向舵轮主销轴承座 + 6700ZZ薄壁转向轴承
        inst("I15", "P05", "全向舵轮主销轴承座(左前)", (68.0, 52.0, 42.0), step=1),
        inst("I16", "P05", "全向舵轮主销轴承座(右前)", (68.0, -52.0, 42.0), step=1),
        inst("I17", "P05", "全向舵轮主销轴承座(左后)", (-68.0, 52.0, 42.0), step=1),
        inst("I18", "P05", "全向舵轮主销轴承座(右后)", (-68.0, -52.0, 42.0), step=1),
        inst("I19", "B03", "6700ZZ薄壁转向轴承(左前)", (68.0, 52.0, 46.0), step=1),
        inst("I20", "B03", "6700ZZ薄壁转向轴承(右前)", (68.0, -52.0, 46.0), step=1),
        inst("I21", "B03", "6700ZZ薄壁转向轴承(左后)", (-68.0, 52.0, 46.0), step=1),
        inst("I22", "B03", "6700ZZ薄壁转向轴承(右后)", (-68.0, -52.0, 46.0), step=1),

        # ==================== Step 2: 单电机1:4主减速与四轮正交锥齿分动系统 ====================
        inst("I23", "P06", "N20电机固定座", (-19.5, 12.0, 28.0), step=2),
        inst("I24", "M01", "N20直流减速电机", (-19.5, 12.0, 28.0), step=2),
        inst("I25", "G02", "18齿电机主动齿轮", (-19.5, 28.0, 28.0), step=2, motion="motor_pinion"),
        inst("I26", "G01", "72齿主减速大齿轮", (-42.0, 28.0, 28.0), step=2, motion="primary_shaft"),
        inst("I27", "P07", "底部横向主传动轴", (-42.0, 0.0, 28.0), step=2, motion="primary_shaft"),
        inst("I28", "G05", "20齿分动直齿轮(前)", (16.0, 0.0, 28.0), step=2, motion="long_shaft"),
        inst("I29", "G05", "20齿分动直齿轮(后)", (-52.0, 0.0, 28.0), step=2, motion="long_shaft"),
        inst("I30", "P08", "底部纵向分动长轴", (0.0, 0.0, 28.0), step=2, motion="long_shaft"),
        inst("I31", "P10", "分动箱十字轴承座(前桥)", (68.0, 0.0, 28.0), step=2),
        inst("I32", "P10", "分动箱十字轴承座(后桥)", (-68.0, 0.0, 28.0), step=2),
        inst("I33", "G06", "16齿正交传力锥齿轮(前分动箱中)", (68.0, 0.0, 28.0), step=2, motion="bevel_spin"),
        inst("I34", "G06", "16齿正交传力锥齿轮(后分动箱中)", (-68.0, 0.0, 28.0), step=2, motion="bevel_spin"),
        inst("I35", "P09", "横向分动短轴(左前)", (68.0, 26.0, 28.0), step=2, motion="primary_shaft"),
        inst("I36", "P09", "横向分动短轴(右前)", (68.0, -26.0, 28.0), step=2, motion="primary_shaft"),
        inst("I37", "P09", "横向分动短轴(左后)", (-68.0, 26.0, 28.0), step=2, motion="primary_shaft"),
        inst("I38", "P09", "横向分动短轴(右后)", (-68.0, -26.0, 28.0), step=2, motion="primary_shaft"),
        inst("I39", "G06", "16齿正交传力锥齿轮(左前主销顶)", (68.0, 52.0, 34.0), step=2, motion="bevel_spin"),
        inst("I40", "G06", "16齿正交传力锥齿轮(右前主销顶)", (68.0, -52.0, 34.0), step=2, motion="bevel_spin"),
        inst("I41", "G06", "16齿正交传力锥齿轮(左后主销顶)", (-68.0, 52.0, 34.0), step=2, motion="bevel_spin"),
        inst("I42", "G06", "16齿正交传力锥齿轮(右后主销顶)", (-68.0, -52.0, 34.0), step=2, motion="bevel_spin"),

        # ==================== Step 3: 四轮独立全向舵轮模组(非麦轮) ====================
        # 左前舵轮总成 (FL)
        inst("I43", "P11", "全向转向空心主销套筒(左前)", (68.0, 52.0, 40.0), step=3, motion="swerve_front"),
        inst("I44", "P13", "舵轮同轴传力竖销(左前)", (68.0, 52.0, 34.0), step=3, motion="bevel_spin"),
        inst("I45", "P12", "全向舵轮转向叉架(左前)", (68.0, 52.0, 22.0), step=3, motion="swerve_front"),
        inst("I46", "P14", "舵轮固定横轴(左前)", (68.0, 52.0, 20.0), step=3, motion="swerve_front"),
        inst("I47", "G07", "舵轮轮边锥齿圈(左前)", (68.0, 47.0, 20.0), step=3, motion="swerve_front"),
        inst("I48", "W01", "高抓地全向舵轮(左前)", (68.0, 52.0, 20.0), step=3, motion="swerve_front"),
        # 右前舵轮总成 (FR)
        inst("I49", "P11", "全向转向空心主销套筒(右前)", (68.0, -52.0, 40.0), step=3, motion="swerve_front"),
        inst("I50", "P13", "舵轮同轴传力竖销(右前)", (68.0, -52.0, 34.0), step=3, motion="bevel_spin"),
        inst("I51", "P12", "全向舵轮转向叉架(右前)", (68.0, -52.0, 22.0), step=3, motion="swerve_front"),
        inst("I52", "P14", "舵轮固定横轴(右前)", (68.0, -52.0, 20.0), step=3, motion="swerve_front"),
        inst("I53", "G07", "舵轮轮边锥齿圈(右前)", (68.0, -47.0, 20.0), step=3, motion="swerve_front"),
        inst("I54", "W01", "高抓地全向舵轮(右前)", (68.0, -52.0, 20.0), step=3, motion="swerve_front"),
        # 左后舵轮总成 (RL)
        inst("I55", "P11", "全向转向空心主销套筒(左后)", (-68.0, 52.0, 40.0), step=3, motion="swerve_rear"),
        inst("I56", "P13", "舵轮同轴传力竖销(左后)", (-68.0, 52.0, 34.0), step=3, motion="bevel_spin"),
        inst("I57", "P12", "全向舵轮转向叉架(左后)", (-68.0, 52.0, 22.0), step=3, motion="swerve_rear"),
        inst("I58", "P14", "舵轮固定横轴(左后)", (-68.0, 52.0, 20.0), step=3, motion="swerve_rear"),
        inst("I59", "G07", "舵轮轮边锥齿圈(左后)", (-68.0, 47.0, 20.0), step=3, motion="swerve_rear"),
        inst("I60", "W01", "高抓地全向舵轮(左后)", (-68.0, 52.0, 20.0), step=3, motion="swerve_rear"),
        # 右后舵轮总成 (RR)
        inst("I61", "P11", "全向转向空心主销套筒(右后)", (-68.0, -52.0, 40.0), step=3, motion="swerve_rear"),
        inst("I62", "P13", "舵轮同轴传力竖销(右后)", (-68.0, -52.0, 34.0), step=3, motion="bevel_spin"),
        inst("I63", "P12", "全向舵轮转向叉架(右后)", (-68.0, -52.0, 22.0), step=3, motion="swerve_rear"),
        inst("I64", "P14", "舵轮固定横轴(右后)", (-68.0, -52.0, 20.0), step=3, motion="swerve_rear"),
        inst("I65", "G07", "舵轮轮边锥齿圈(右后)", (-68.0, -47.0, 20.0), step=3, motion="swerve_rear"),
        inst("I66", "W01", "高抓地全向舵轮(右后)", (-68.0, -52.0, 20.0), step=3, motion="swerve_rear"),

        # ==================== Step 4: 1:30蜗轮蜗杆与上下双凸轮正交连杆全向转向机构 ====================
        inst("I67", "G03", "0.5模单头蜗杆", (-42.0, 0.0, 28.0), step=4, motion="primary_shaft"),
        inst("I68", "G04", "30齿青铜蜗轮", (-30.0, 0.0, 28.0), step=4, motion="cam_shaft"),
        inst("I69", "P15", "凸轮传力竖轴", (-30.0, 0.0, 42.0), step=4, motion="cam_shaft"),
        inst("I70", "P16", "凸轮轴立式轴承座", (-30.0, 0.0, 44.0), step=4),
        inst("I71", "C01", "主航向盘形转向凸轮(上层Z=56)", (-30.0, 0.0, 56.0), step=4, motion="cam_shaft"),
        inst("I72", "C02", "差动转向副凸轮盘(下层Z=35)", (-30.0, 0.0, 35.0), step=4, motion="cam_shaft_sub"),
        inst("I73", "B02", "MR84ZZ凸轮滚子轴承(主凸轮从动)", (-8.0, 0.0, 56.0), step=4, motion="pushrod_main"),
        inst("I74", "B02", "MR84ZZ凸轮滚子轴承(副凸轮从动)", (-50.0, 0.0, 35.0), step=4, motion="pushrod_rear"),
        inst("I75", "P17", "纵向同步转向主推杆", (26.0, 0.0, 56.0), step=4, motion="pushrod_main"),
        inst("I76", "P18", "转向推杆直线导向座(中)", (4.0, 0.0, 52.0), step=4),
        inst("I77", "P18", "转向推杆直线导向座(前)", (46.0, 0.0, 52.0), step=4),
        inst("I78", "SP1", "推杆复位圆柱弹簧(主推杆)", (25.0, 0.0, 56.0), step=4, motion="pushrod_main"),
        inst("I79", "P19", "后桥差动相位推杆", (-62.0, 0.0, 35.0), step=4, motion="pushrod_rear"),
        inst("I80", "SP1", "推杆复位圆柱弹簧(后差动推杆)", (-62.0, 0.0, 35.0), step=4, motion="pushrod_rear"),
        inst("I81", "P22", "舵轮同步转向摇臂(左前)", (74.0, 52.0, 54.0), step=4, motion="swerve_front"),
        inst("I82", "P22", "舵轮同步转向摇臂(右前)", (74.0, -52.0, 54.0), step=4, motion="swerve_front"),
        inst("I83", "P22", "舵轮同步转向摇臂(左后)", (-74.0, 52.0, 54.0), step=4, motion="swerve_rear"),
        inst("I84", "P22", "舵轮同步转向摇臂(右后)", (-74.0, -52.0, 54.0), step=4, motion="swerve_rear"),
        inst("I85", "P20", "前桥平行四边形转向横拉杆", (82.0, 0.0, 54.0), step=4, motion="tie_rod_front"),
        inst("I86", "P21", "后桥平行四边形转向横拉杆", (-82.0, 0.0, 54.0), step=4, motion="tie_rod_rear"),
        inst("I87", "P23", "全向模式切换滑块", (-58.0, 0.0, 50.0), step=4, motion="pushrod_rear"),
        inst("I88", "P24", "模式切换定位销(前桥耦合)", (82.0, 0.0, 56.0), step=4, motion="tie_rod_front"),
        inst("I89", "P24", "模式切换定位销(模式选择)", (-58.0, 0.0, 56.0), step=4, motion="pushrod_rear"),

        # ==================== Step 5: 太阳能电池板、超级电容、控制板、顶部电能表与底部读卡器 ====================
        inst("I90", "E06", "底部RFID读卡器模块", (22.0, 0.0, 14.5), step=5),
        inst("I91", "P29", "底部读卡器防护盒", (22.0, 0.0, 13.5), step=5),
        inst("I92", "P27", "超级电容固定座", (4.0, -36.0, 48.0), step=5),
        inst("I93", "E02", "超级电容储能模组", (4.0, -36.0, 62.0), step=5),
        inst("I94", "F01", "M3铜柱与紧固件套件(控制板左前)", (28.0, 48.0, 47.0), step=5),
        inst("I95", "F01", "M3铜柱与紧固件套件(控制板左后)", (-20.0, 48.0, 47.0), step=5),
        inst("I96", "E03", "充电与语音控制电路板", (4.0, 36.0, 53.0), step=5),
        inst("I97", "P28", "电能检测模块支架", (58.0, 0.0, 60.0), step=5),
        inst("I98", "E04", "顶部电能检测模块", (58.0, 0.0, 86.0), step=5),
        inst("I99", "E05", "顶部红色LED指示灯", (60.0, 50.0, 88.0), step=5),
        inst("I100", "P26", "太阳能板支撑立柱(左后)", (-52.0, 50.0, 68.0), step=5),
        inst("I101", "P26", "太阳能板支撑立柱(右后)", (-52.0, -50.0, 68.0), step=5),
        inst("I102", "P26", "太阳能板支撑立柱(左前)", (8.0, 50.0, 68.0), step=5),
        inst("I103", "P26", "太阳能板支撑立柱(右前)", (8.0, -50.0, 68.0), step=5),
        inst("I104", "P25", "太阳能板承载框", (-22.0, 0.0, 93.5), step=5),
        inst("I105", "E01", "单晶硅太阳能电池板", (-22.0, 0.0, 96.0), step=5),

        # ==================== Step 6: 轻量化快拆外壳 ====================
        inst("I106", "P30", "轻量化快拆外壳", (0.0, 0.0, 60.0), step=6),
    ]
    return placements


def build_assembly_steps() -> List[Dict[str, object]]:
    return [
        {
            "step": 1,
            "title": "步骤 1：双层高刚度全向底盘骨架与四角舵轮主销轴承座装配",
            "summary": "以『铝合金主底板』(200×150×4mm, Z=42mm)与『底部传动副底板』(176×124×3.5mm, Z=18mm)构成的上下双层笼式结构为基准，用6根『底盘层间支撑柱』刚性锁紧；在副底板上安装4件『主传动轴立式轴承座』(含『625ZZ深沟球轴承』)；在主底板四角(X=±68,Y=±52mm)安装4件『全向舵轮主销轴承座』并压入8只『6700ZZ薄壁转向轴承』。",
            "parts": ["铝合金主底板", "底部传动副底板", "底盘层间支撑柱", "主传动轴立式轴承座", "全向舵轮主销轴承座", "625ZZ深沟球轴承", "6700ZZ薄壁转向轴承"],
            "checkPoint": "确认上下双层底板平行度≤0.05mm，四角全向舵轮主销轴承孔垂直于底板平面。",
        },
        {
            "step": 2,
            "title": "步骤 2：单电机 1:4 主减速与四轮正交锥齿轮分动系统装配",
            "summary": "在底部传动副底板上锁紧『N20电机固定座』与『N20直流减速电机』(杜绝悬空)，电机轴装『18齿电机主动齿轮』，与『底部横向主传动轴』上的『72齿主减速大齿轮』精确构成 1:4 主减速(中心距22.50mm)。通过『20齿分动直齿轮』驱动贯通前后的『底部纵向分动长轴』，经前/后『分动箱十字轴承座』内的『16齿正交传力锥齿轮』90°分流至4根『横向分动短轴』及四角主销顶部锥齿轮。",
            "parts": ["N20电机固定座", "N20直流减速电机", "18齿电机主动齿轮", "72齿主减速大齿轮", "底部横向主传动轴", "20齿分动直齿轮", "底部纵向分动长轴", "分动箱十字轴承座", "16齿正交传力锥齿轮", "横向分动短轴"],
            "checkPoint": "手动旋转72齿主减速大齿轮，检查前后桥4根横向分动短轴与四角顶部锥齿轮同步顺畅旋转。",
        },
        {
            "step": 3,
            "title": "步骤 3：四轮独立同轴全向舵轮模组（非麦轮）装配",
            "summary": "在四角『全向舵轮主销轴承座』中穿入4件『全向转向空心主销套筒』，下端锁紧『全向舵轮转向叉架』；在空心主销套筒中心通孔内穿入『舵轮同轴传力竖销』，使其上下两端锥齿轮分别与横向分动短轴及『舵轮轮边锥齿圈』正交啮合；最后用『舵轮固定横轴』安装4只『高抓地全向舵轮』(Φ40×10mm实心防滑橡胶胎，绝不使用麦轮)。",
            "parts": ["全向转向空心主销套筒", "全向舵轮转向叉架", "舵轮同轴传力竖销", "舵轮轮边锥齿圈", "舵轮固定横轴", "高抓地全向舵轮"],
            "checkPoint": "验证4只全向舵轮绕各自竖直主销偏转任意角度(±90°/360°)时，中心同轴传力竖销均能无干涉传递驱动力矩。",
        },
        {
            "step": 4,
            "title": "步骤 4：1:30 蜗轮蜗杆与双凸轮正交连杆全向转向系统联调",
            "summary": "在横向主传动轴中段锁紧『0.5模单头蜗杆』，驱动『凸轮传力竖轴』下端的『30齿青铜蜗轮』(1:30减速)；在竖轴上层(Z=56mm)安装『主航向盘形转向凸轮』(C01)，下层(Z=35mm)安装『差动转向副凸轮盘』(C02)。安装『纵向同步转向主推杆』、『后桥差动相位推杆』、『转向推杆直线导向座』、『推杆复位圆柱弹簧』与2只『MR84ZZ凸轮滚子轴承』；在4只空心主销套筒顶端锁紧『舵轮同步转向摇臂』，用『前桥平行四边形转向横拉杆』、『后桥平行四边形转向横拉杆』、『全向模式切换滑块』与『模式切换定位销』完成前后四轮同步全向转向闭环。",
            "parts": ["0.5模单头蜗杆", "30齿青铜蜗轮", "凸轮传力竖轴", "凸轮轴立式轴承座", "主航向盘形转向凸轮", "差动转向副凸轮盘", "MR84ZZ凸轮滚子轴承", "纵向同步转向主推杆", "转向推杆直线导向座", "推杆复位圆柱弹簧", "后桥差动相位推杆", "前桥平行四边形转向横拉杆", "后桥平行四边形转向横拉杆", "舵轮同步转向摇臂", "全向模式切换滑块", "模式切换定位销"],
            "checkPoint": "切换定位销位置，验证【四轮同向蟹行全向平移(δ前=δ后)】与【四轮反向急转(δ前=-δ后)】两种全向转向模式顺畅无卡滞。",
        },
        {
            "step": 5,
            "title": "步骤 5：太阳能电池板、超级电容、控制板、顶部电能表与底部读卡器安装",
            "summary": "在副底板底部安装『底部RFID读卡器模块』并套上非金属『底部读卡器防护盒』(完全不外露)；在主底板上安装『超级电容固定座』、『超级电容储能模组』、『M3铜柱与紧固件套件』与『充电与语音控制电路板』；在车头跨接『电能检测模块支架』，顶部无遮挡安装『顶部电能检测模块』与Φ10mm『顶部红色LED指示灯』；用4根『太阳能板支撑立柱』架起『太阳能板承载框』与『单晶硅太阳能电池板』。",
            "parts": ["单晶硅太阳能电池板", "太阳能板承载框", "太阳能板支撑立柱", "超级电容储能模组", "超级电容固定座", "充电与语音控制电路板", "顶部电能检测模块", "电能检测模块支架", "顶部红色LED指示灯", "底部RFID读卡器模块", "底部读卡器防护盒", "M3铜柱与紧固件套件"],
            "checkPoint": "确认顶部太阳能电池板、顶部电能检测模块显示屏、顶部Φ10mm红色LED指示灯100%无遮挡，底部RFID读卡器完全不外露。",
        },
        {
            "step": 6,
            "title": "步骤 6：轻量化快拆外壳总装与全向运动终检",
            "summary": "扣合『轻量化快拆外壳』，核验整车总尺寸为 216mm(长) × 164mm(宽) × 106mm(高)，严格满足赛题『宽≤200mm、长≤250mm』要求。",
            "parts": ["轻量化快拆外壳"],
            "checkPoint": "全车共38种核心零件(106个装配实例)，网页显示的每一个零件名与SolidWorks零件文件名(.SLDPRT) 100%一一对应。",
        },
    ]
