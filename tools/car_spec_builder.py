#!/usr/bin/env python3
"""Complete mechanical specification, 3D features, and assembly layout for the simplified solar car."""

from __future__ import annotations
import math
from typing import Dict, List, Tuple
from mesh_builder import (
    MeshAccumulator,
    make_cam_loop,
    make_circle_loop,
    make_gear_loop,
    make_rect_loop,
)


def build_part_definitions() -> List[Dict[str, object]]:
    """Return all 37 simplified solar car parts with 1-to-1 SolidWorks part names."""
    raw_parts = [
        # --- 01 底盘与承载骨架 ---
        {
            "id": "P01",
            "name": "铝合金主底板",
            "subsystem": "01 底盘与承载骨架",
            "category": "自制结构件",
            "process": "CNC铝合金激光切割/钻孔",
            "material": "6061-T6铝合金",
            "color": "#5b7083",
            "quantity": 1,
            "size": [190.0, 130.0, 4.0],
            "note": "整车基准承载底板，含后轴轴承座槽、N20电机座孔、蜗轮竖轴孔(X=-52,Y=0)、前转向主销孔(X=+75,Y=0)及减重槽",
            "keyDimensions": [
                {"name": "总长 L", "value": "190.0 mm", "note": "X ∈ [-95, +95] mm，满足整车总长≤250mm"},
                {"name": "总宽 W", "value": "130.0 mm", "note": "Y ∈ [-65, +65] mm，满足整车总宽≤200mm"},
                {"name": "板厚 T", "value": "4.0 mm", "note": "保证传动与转向轴系刚度"},
                {"name": "前转向主销孔心距", "value": "140.0 mm", "note": "后轴X=-65mm至前主销X=+75mm轴距"},
            ],
            "features": [
                {
                    "id": "P01-F01",
                    "name": "主底板外轮廓拉伸",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.0,
                    "w1": 2.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 190.0, "h": 130.0, "fillet": 10.0},
                    "holes": [
                        # 凸轮竖轴通孔 (X=-52, Y=0, D=12)
                        {"shape": "circle", "cx": -52.0, "cy": 0.0, "r": 6.0},
                        # 前转向主销通孔 (X=+75, Y=0, D=12)
                        {"shape": "circle", "cx": 75.0, "cy": 0.0, "r": 6.0},
                        # 后轴大齿轮与蜗杆避让窗口
                        {"shape": "rect", "cx": -65.0, "cy": 34.0, "w": 42.0, "h": 12.0, "fillet": 2.0},
                        {"shape": "rect", "cx": -65.0, "cy": 0.0, "w": 24.0, "h": 14.0, "fillet": 2.0},
                        # 对称轻量化减重窗
                        {"shape": "rect", "cx": -12.0, "cy": -32.0, "w": 46.0, "h": 28.0, "fillet": 4.0},
                        {"shape": "rect", "cx": -12.0, "cy": 32.0, "w": 46.0, "h": 28.0, "fillet": 4.0},
                        {"shape": "rect", "cx": 42.0, "cy": -32.0, "w": 32.0, "h": 26.0, "fillet": 4.0},
                        {"shape": "rect", "cx": 42.0, "cy": 32.0, "w": 32.0, "h": 26.0, "fillet": 4.0},
                        # 四角立柱安装孔 M3
                        {"shape": "circle", "cx": -50.0, "cy": -48.0, "r": 1.6},
                        {"shape": "circle", "cx": -50.0, "cy": 48.0, "r": 1.6},
                        {"shape": "circle", "cx": 6.0, "cy": -48.0, "r": 1.6},
                        {"shape": "circle", "cx": 6.0, "cy": 48.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P02",
            "name": "后轴轴承座",
            "subsystem": "01 底盘与承载骨架",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#3b82f6",
            "quantity": 2,
            "size": [26.0, 12.0, 20.0],
            "note": "左右对称安装在主底板下表面(X=-65, Y=±52mm)，内嵌625ZZ轴承(Φ16孔)支承后轮驱动长轴",
            "keyDimensions": [
                {"name": "轴承室孔径", "value": "Φ16.0 H7 mm", "note": "配合625ZZ深沟球轴承外圈"},
                {"name": "孔心距底板安装面", "value": "8.0 mm", "note": "底板下表面Z=32mm，后轴中心Z=24mm"},
                {"name": "座体宽度", "value": "12.0 mm", "note": "含轴承定位台阶"},
            ],
            "features": [
                {
                    "id": "P02-F01",
                    "name": "立式轴承座主体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 24.0, "h": 18.0, "fillet": 3.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": -1.0, "r": 7.5}],
                },
                {
                    "id": "P02-F02",
                    "name": "顶部安装法兰耳",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": 6.0,
                    "w1": 9.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 26.0, "h": 12.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": -10.0, "cy": 0.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": 0.0, "r": 1.6},
                    ],
                },
            ],
        },
        {
            "id": "P03",
            "name": "N20电机固定座",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "自制结构件",
            "process": "3D打印/CNC加工",
            "material": "6061铝合金/高强尼龙",
            "color": "#2563eb",
            "quantity": 1,
            "size": [28.0, 24.0, 18.0],
            "note": "刚性锁紧N20直流减速电机于底板下表面(X=-42.5, Y=+16mm)，彻底杜绝电机悬空，保证1:4齿轮中心距22.50mm",
            "keyDimensions": [
                {"name": "电机夹持内腔", "value": "12.0 × 10.0 mm", "note": "贴合N20减速箱扁平截面防转"},
                {"name": "齿轮中心距定位", "value": "22.50 mm", "note": "与后轴X=-65mm精确啮合(18齿+72齿, m=0.5)"},
                {"name": "安装法兰厚", "value": "3.5 mm", "note": "4×M3螺栓锁紧于主底板"},
            ],
            "features": [
                {
                    "id": "P03-F01",
                    "name": "电机抱箍主体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -10.0,
                    "w1": 10.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 20.0, "h": 16.0, "fillet": 2.5},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": -1.0, "w": 12.2, "h": 10.2, "fillet": 1.0}],
                },
                {
                    "id": "P03-F02",
                    "name": "底板连接法兰",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": 5.0,
                    "w1": 8.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 28.0, "h": 24.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": -11.0, "cy": -8.0, "r": 1.6},
                        {"shape": "circle", "cx": 11.0, "cy": -8.0, "r": 1.6},
                        {"shape": "circle", "cx": -11.0, "cy": 8.0, "r": 1.6},
                        {"shape": "circle", "cx": 11.0, "cy": 8.0, "r": 1.6},
                    ],
                },
            ],
        },
        # --- 02 单电机1:4齿轮驱动系统 ---
        {
            "id": "M01",
            "name": "N20直流减速电机",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "外购标准件",
            "process": "外购成品件",
            "material": "金属齿轮箱+永磁直流电机",
            "color": "#64748b",
            "quantity": 1,
            "size": [12.0, 36.0, 10.0],
            "note": "整车唯一动力源(单电机驱动)，额定电压6V，D字输出轴Φ3mm直联18齿主动齿轮",
            "keyDimensions": [
                {"name": "机身截面", "value": "12.0 × 10.0 mm", "note": "标准N20金属减速箱尺寸"},
                {"name": "机身+输出轴总长", "value": "36.0 mm", "note": "机身26mm + 输出轴10mm"},
                {"name": "输出轴径", "value": "Φ3.0 mm (D型扁位)", "note": "驱动18齿主动小齿轮"},
            ],
            "features": [
                {
                    "id": "M01-F01",
                    "name": "N20减速箱与电机筒",
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
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "外购/定制传动件",
            "process": "黄铜精密滚齿",
            "material": "H59黄铜",
            "color": "#f59e0b",
            "quantity": 1,
            "size": [10.0, 6.0, 10.0],
            "note": "模数m=0.5，齿数z1=18，分度圆直径d1=9.0mm，齿顶圆da1=10.0mm，与72齿后轴大齿轮构成精确1:4减速",
            "keyDimensions": [
                {"name": "模数 m", "value": "0.5 mm", "note": "标准渐开线直齿圆柱齿轮"},
                {"name": "齿数 z1", "value": "18 齿", "note": "主动小齿轮，配72齿大齿轮实现i=1:4"},
                {"name": "分度圆直径 d1", "value": "9.0 mm", "note": "d1 = m × z1 = 0.5 × 18"},
                {"name": "中心距 a", "value": "22.50 mm", "note": "a = m(z1+z2)/2 = 0.5×(18+72)/2"},
            ],
            "features": [
                {
                    "id": "G02-F01",
                    "name": "18齿渐开线直齿主体",
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
            "name": "72齿后轴从动大齿轮",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "外购/定制传动件",
            "process": "POM赛钢精密加工",
            "material": "POM聚甲醛(赛钢)",
            "color": "#eab308",
            "quantity": 1,
            "size": [37.0, 6.0, 37.0],
            "note": "模数m=0.5，齿数z2=72，分度圆直径d2=36.0mm，齿顶圆da2=37.0mm，锁紧于后轮驱动长轴",
            "keyDimensions": [
                {"name": "模数 m", "value": "0.5 mm", "note": "与18齿主动轮啮合"},
                {"name": "齿数 z2", "value": "72 齿", "note": "传动比 i = z2/z1 = 72/18 = 4.0 (精确1:4)"},
                {"name": "分度圆直径 d2", "value": "36.0 mm", "note": "d2 = m × z2 = 0.5 × 72"},
                {"name": "内孔直径", "value": "Φ5.0 H7 mm", "note": "带顶丝锁紧孔，固定于后驱动轴"},
            ],
            "features": [
                {
                    "id": "G01-F01",
                    "name": "72齿渐开线大齿轮主体",
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
            "id": "P04",
            "name": "后轮驱动长轴",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "自制传动件",
            "process": "精密磨削光轴",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 1,
            "size": [5.0, 148.0, 5.0],
            "note": "贯穿左右后轴轴承座，左端锁紧后左驱动轮，中段安装72齿大齿轮与0.5模单头蜗杆，右端活套轴承随动轮",
            "keyDimensions": [
                {"name": "轴径 d", "value": "Φ5.0 g6 mm", "note": "配合625ZZ轴承内圈"},
                {"name": "总长 L", "value": "148.0 mm", "note": "Y ∈ [-74, +74] mm"},
            ],
            "features": [
                {
                    "id": "P04-F01",
                    "name": "后驱动精密光轴",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -74.0,
                    "w1": 74.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "W01",
            "name": "后左驱动轮",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "自制/标准轮组",
            "process": "铝合金轮毂+硅胶防滑胎圈",
            "material": "铝合金+高摩擦硅胶圈",
            "color": "#1e293b",
            "quantity": 1,
            "size": [48.0, 10.0, 48.0],
            "note": "刚性锁紧在后轮驱动长轴左端(Y=+68mm)，单轮驱动配合右后随动轮实现无差速器零滑移转弯",
            "keyDimensions": [
                {"name": "外径 D", "value": "Φ48.0 mm", "note": "后轴中心高Z=24.0mm"},
                {"name": "轮宽 B", "value": "10.0 mm", "note": "含外圈防滑O型硅胶胎"},
                {"name": "中心孔径", "value": "Φ5.0 mm (锁紧毂)", "note": "与后驱动轴同步旋转"},
            ],
            "features": [
                {
                    "id": "W01-F01",
                    "name": "驱动轮外胎与轮辋",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 24.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": 13.0, "cy": 0.0, "r": 4.2},
                        {"shape": "circle", "cx": -13.0, "cy": 0.0, "r": 4.2},
                        {"shape": "circle", "cx": 0.0, "cy": 13.0, "r": 4.2},
                        {"shape": "circle", "cx": 0.0, "cy": -13.0, "r": 4.2},
                    ],
                },
                {
                    "id": "W01-F02",
                    "name": "驱动轮锁紧轴毂",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -7.0,
                    "w1": 5.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 6.5},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5}],
                },
            ],
        },
        {
            "id": "W02",
            "name": "轴承随动轮",
            "subsystem": "02 单电机1:4齿轮驱动系统",
            "category": "自制/标准轮组",
            "process": "铝合金轮毂+内嵌双轴承",
            "material": "铝合金+硅胶胎圈",
            "color": "#334155",
            "quantity": 2,
            "size": [48.0, 10.0, 48.0],
            "note": "共2件：分别用于后右随动轮(X=-65,Y=-68)与前转向轮(X=+75,Y=0)，轮毂内嵌625ZZ轴承实现自由差速滚动",
            "keyDimensions": [
                {"name": "外径 D", "value": "Φ48.0 mm", "note": "与后左驱动轮同径，保证车身水平"},
                {"name": "轴承孔径", "value": "Φ16.0 H7 mm", "note": "内置625ZZ轴承，轮体相对轴自由旋转"},
                {"name": "轮宽 B", "value": "10.0 mm", "note": "低滚阻窄轮设计"},
            ],
            "features": [
                {
                    "id": "W02-F01",
                    "name": "随动轮轮辋与胎圈",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -5.0,
                    "w1": 5.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 24.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0},
                        {"shape": "circle", "cx": 14.0, "cy": 0.0, "r": 3.8},
                        {"shape": "circle", "cx": -14.0, "cy": 0.0, "r": 3.8},
                        {"shape": "circle", "cx": 0.0, "cy": 14.0, "r": 3.8},
                        {"shape": "circle", "cx": 0.0, "cy": -14.0, "r": 3.8},
                    ],
                }
            ],
        },
        # --- 03 蜗轮蜗杆与凸轮转向机构 ---
        {
            "id": "G03",
            "name": "0.5模单头蜗杆",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "外购/定制传动件",
            "process": "黄铜车削螺纹加工",
            "material": "H59黄铜",
            "color": "#d97706",
            "quantity": 1,
            "size": [11.0, 18.0, 11.0],
            "note": "安装在后轮驱动长轴中段(X=-65,Y=0,Z=24mm)，模数m=0.5，头数z1=1，分度圆直径d1=11.0mm，驱动30齿蜗轮",
            "keyDimensions": [
                {"name": "模数 m / 头数 z1", "value": "m = 0.5 mm, z1 = 1", "note": "单头自锁蜗杆，防前轮地面反力倒驱"},
                {"name": "分度圆直径 d1", "value": "11.0 mm", "note": "齿顶圆直径 da1 = 12.0 mm"},
                {"name": "蜗杆长度 L", "value": "18.0 mm", "note": "内孔Φ5.0mm锁紧在后驱动轴上"},
            ],
            "features": [
                {
                    "id": "G03-F01",
                    "name": "单头蜗杆螺旋体",
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
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "外购/定制传动件",
            "process": "锡青铜滚齿",
            "material": "QSn6.5-0.1锡青铜",
            "color": "#b45309",
            "quantity": 1,
            "size": [16.0, 16.0, 6.0],
            "note": "安装在凸轮传力竖轴下端(X=-52,Y=0,Z=24mm)，齿数z2=30，与单头蜗杆构成1:30减速（后轮每转30圈，凸轮转1圈完成完整周期轨迹）",
            "keyDimensions": [
                {"name": "模数 m / 齿数 z2", "value": "m = 0.5 mm, z2 = 30", "note": "减速比 i_w = 30/1 = 30"},
                {"name": "分度圆直径 d2", "value": "15.0 mm", "note": "蜗杆蜗轮中心距 a = (11+15)/2 = 13.0 mm"},
                {"name": "单个凸轮周期行程", "value": "30 × π × 48 ≈ 4524 mm", "note": "覆盖赛场完整直行+S弯引导周期"},
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
            "id": "P05",
            "name": "凸轮传力竖轴",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制传动件",
            "process": "精密磨削光轴",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 1,
            "size": [5.0, 5.0, 46.0],
            "note": "垂直布置于(X=-52,Y=0)，下端装30齿蜗轮(Z=24)，中段由立式双轴承座支承，上端装盘形转向凸轮(Z=54)",
            "keyDimensions": [
                {"name": "轴径 d", "value": "Φ5.0 g6 mm", "note": "配合上下两只625ZZ轴承"},
                {"name": "轴长 L", "value": "46.0 mm", "note": "Z ∈ [16, 62] mm"},
            ],
            "features": [
                {
                    "id": "P05-F01",
                    "name": "凸轮竖向传动主轴",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -23.0,
                    "w1": 23.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P06",
            "name": "凸轮轴立式轴承座",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#3b82f6",
            "quantity": 1,
            "size": [28.0, 28.0, 22.0],
            "note": "法兰式立式双轴承座，锁紧在主底板(X=-52,Y=0)孔位，内部上下布置2只625ZZ轴承抵消凸轮径向推力",
            "keyDimensions": [
                {"name": "轴承室孔径", "value": "Φ16.0 H7 mm", "note": "容纳上下双625ZZ深沟球轴承"},
                {"name": "法兰底盘尺寸", "value": "28.0 × 28.0 mm", "note": "4×M3螺栓固定于主底板"},
                {"name": "总高 H", "value": "22.0 mm", "note": "高刚度抗倾覆设计"},
            ],
            "features": [
                {
                    "id": "P06-F01",
                    "name": "轴承座安装底法兰",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -11.0,
                    "w1": -6.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 28.0, "h": 28.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0},
                        {"shape": "circle", "cx": -10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": -10.0, "cy": 10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": 10.0, "r": 1.6},
                    ],
                },
                {
                    "id": "P06-F02",
                    "name": "立式双轴承圆筒",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -6.0,
                    "w1": 11.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 11.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0}],
                },
            ],
        },
        {
            "id": "C01",
            "name": "盘形转向凸轮",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制核心件",
            "process": "CNC精密铣削/线切割",
            "material": "7075航空铝合金/POM",
            "color": "#ef4444",
            "quantity": 1,
            "size": [39.6, 39.6, 5.0],
            "note": "采用五次多项式无冲击运动规律 s(u)=h(10u³-15u⁴+6u⁵)，基圆r0=16mm，升程h=±3.8mm，最大压力角26.8°<30°",
            "keyDimensions": [
                {"name": "基圆半径 r0", "value": "16.0 mm (直径32.0 mm)", "note": "滚子半径 rr = 4.0 mm (MR84ZZ轴承)"},
                {"name": "转向推程 h", "value": "±3.80 mm", "note": "对应前叉摆臂(L=18mm)转角 ±12.1°"},
                {"name": "五次多项式方程", "value": "s(u) = h(10u³ - 15u⁴ + 6u⁵)", "note": "起止位置速度与加速度均为0，无柔性冲击"},
                {"name": "最大压力角 α_max", "value": "26.8° (< 30°许用值)", "note": "杜绝推杆卡滞，最小曲率半径ρ_min=9.4mm>4mm"},
            ],
            "features": [
                {
                    "id": "C01-F01",
                    "name": "五次多项式盘形凸轮轮廓",
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
            "id": "C02",
            "name": "直行校准凸轮盘",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制替换凸轮",
            "process": "CNC精密铣削",
            "material": "POM聚甲醛(赛钢)",
            "color": "#f97316",
            "quantity": 1,
            "size": [32.8, 32.8, 5.0],
            "note": "长距离直线赛道专用替换凸轮(基圆r0=16mm，微调偏置h=±0.4mm)，通过顶部2颗M3螺丝5秒快拆替换C01",
            "keyDimensions": [
                {"name": "基圆半径 r0", "value": "16.0 mm", "note": "与C01安装孔位完全兼容"},
                {"name": "微调修正升程 h", "value": "±0.40 mm", "note": "补偿装配微偏角，实现高精度直线行驶"},
            ],
            "features": [
                {
                    "id": "C02-F01",
                    "name": "直行微调凸轮盘轮廓",
                    "type": "凸轮曲线拉伸",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "cam",
                    "params": {"base_r": 16.0, "stroke": 0.4},
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
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "外购标准件",
            "process": "轴承钢标准件",
            "material": "GCr15轴承钢",
            "color": "#94a3b8",
            "quantity": 1,
            "size": [8.0, 8.0, 3.0],
            "note": "安装在转向直线推杆后端叉口(X=-32,Y=0,Z=54mm)，外径Φ8mm(滚子半径rr=4mm)贴合盘形凸轮外廓滚动",
            "keyDimensions": [
                {"name": "外径 D × 内径 d × 厚 B", "value": "Φ8.0 × Φ4.0 × 3.0 mm", "note": "将凸轮滑动摩擦转化为滚动摩擦"},
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
            "id": "P07",
            "name": "转向直线推杆",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金线切割",
            "material": "6061-T6铝合金",
            "color": "#10b981",
            "quantity": 1,
            "size": [106.0, 8.0, 5.0],
            "note": "沿车身X轴中心线(Y=0,Z=54mm)往复直线运动，后端装MR84ZZ滚子轴承，前端腰形槽驱动前叉转向摆臂",
            "keyDimensions": [
                {"name": "总长 L", "value": "106.0 mm", "note": "连接X=-32mm滚子中心至X=+68mm前叉摆臂销"},
                {"name": "杆身截面", "value": "8.0 × 5.0 mm", "note": "穿过前后两只转向推杆导向座"},
                {"name": "往复行程", "value": "±3.80 mm", "note": "由复位弹簧提供恒定正压力贴合凸轮"},
            ],
            "features": [
                {
                    "id": "P07-F01",
                    "name": "直线推杆主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -2.5,
                    "w1": 2.5,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 106.0, "h": 8.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": -49.0, "cy": 0.0, "r": 2.0},
                        {"shape": "rect", "cx": 49.0, "cy": 0.0, "w": 6.0, "h": 3.2, "fillet": 1.5},
                    ],
                }
            ],
        },
        {
            "id": "P08",
            "name": "转向推杆导向座",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制结构件",
            "process": "CNC/3D打印加工",
            "material": "POM聚甲醛(自润滑)",
            "color": "#059669",
            "quantity": 2,
            "size": [14.0, 22.0, 24.0],
            "note": "前后对称布置于主底板上表面(X=-12mm与X=+42mm, Y=0)，精密矩形导向孔约束推杆仅沿X轴平动",
            "keyDimensions": [
                {"name": "导向槽尺寸", "value": "8.2 × 5.2 mm", "note": "配合8×5mm推杆，低摩擦直线导向"},
                {"name": "导向中心高度", "value": "18.0 mm (距底板上表面)", "note": "对应Z=54.0mm凸轮平面高度"},
            ],
            "features": [
                {
                    "id": "P08-F01",
                    "name": "导向座立柱与滑槽孔",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -7.0,
                    "w1": 7.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 22.0, "h": 24.0, "fillet": 2.5},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 6.0, "w": 8.4, "h": 5.4, "fillet": 0.5}],
                }
            ],
        },
        {
            "id": "SP1",
            "name": "推杆复位圆柱弹簧",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "外购标准件",
            "process": "弹簧钢绕制",
            "material": "65Mn弹簧钢",
            "color": "#a8a29e",
            "quantity": 1,
            "size": [24.0, 12.0, 12.0],
            "note": "套设在转向直线推杆中段(X=+15,Y=0,Z=54mm)，使推杆后端滚子始终压紧盘形转向凸轮工作面(力锁合)",
            "keyDimensions": [
                {"name": "外径 D × 自由长 L0", "value": "Φ12.0 × 24.0 mm", "note": "线径1.0mm，预压量5.0mm"},
            ],
            "features": [
                {
                    "id": "SP1-F01",
                    "name": "圆柱螺旋压缩弹簧包络",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -12.0,
                    "w1": 12.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 6.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 4.2}],
                }
            ],
        },
        {
            "id": "P09",
            "name": "前转向主销轴承座",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制结构件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#3b82f6",
            "quantity": 1,
            "size": [28.0, 28.0, 20.0],
            "note": "锁紧于主底板前端(X=+75,Y=0)，内嵌上下2只625ZZ轴承支承前轮转向叉架主销，转向灵活无旷量",
            "keyDimensions": [
                {"name": "轴承孔径", "value": "Φ16.0 H7 mm", "note": "上下双625ZZ轴承支承"},
                {"name": "安装中心坐标", "value": "X = +75.0 mm, Y = 0.0 mm", "note": "整车前轮转向主销基准点"},
            ],
            "features": [
                {
                    "id": "P09-F01",
                    "name": "前主销轴承座法兰",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -10.0,
                    "w1": -5.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 28.0, "h": 28.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0},
                        {"shape": "circle", "cx": -10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": -10.0, "r": 1.6},
                        {"shape": "circle", "cx": -10.0, "cy": 10.0, "r": 1.6},
                        {"shape": "circle", "cx": 10.0, "cy": 10.0, "r": 1.6},
                    ],
                },
                {
                    "id": "P09-F02",
                    "name": "前主销轴承筒",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -5.0,
                    "w1": 10.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 11.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 8.0}],
                },
            ],
        },
        {
            "id": "P10",
            "name": "前轮转向叉架",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金一体铣削",
            "material": "6061-T6铝合金",
            "color": "#0284c7",
            "quantity": 1,
            "size": [26.0, 26.0, 44.0],
            "note": "U型前叉与上端Φ5mm转向主销一体成型，下部安装前轮固定短轴与前轴承随动轮(Z=24mm)，上部连接前叉转向摆臂",
            "keyDimensions": [
                {"name": "叉架内宽", "value": "16.0 mm", "note": "容纳10mm宽前随动轮及两侧垫圈"},
                {"name": "转向主销轴径", "value": "Φ5.0 g6 × 24.0 mm", "note": "穿过前转向主销轴承座"},
                {"name": "前轮轴孔高", "value": "Z = 24.0 mm", "note": "与后轴等高，保证底板水平"},
            ],
            "features": [
                {
                    "id": "P10-F01",
                    "name": "U型前叉主体",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -10.0,
                    "w1": 10.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": -8.0, "w": 24.0, "h": 24.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": -11.0, "w": 15.0, "h": 18.0, "fillet": 1.0}],
                },
                {
                    "id": "P10-F02",
                    "name": "一体式转向主销立轴",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": 4.0,
                    "w1": 28.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                },
            ],
        },
        {
            "id": "P11",
            "name": "前叉转向摆臂",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制核心件",
            "process": "CNC铝合金加工",
            "material": "6061-T6铝合金",
            "color": "#0ea5e9",
            "quantity": 1,
            "size": [28.0, 14.0, 6.0],
            "note": "锁紧在前轮转向叉架主销顶端(Z=50mm)，有效摇臂长L=18.0mm，将推杆±3.8mm直线位移转化为前轮±12.1°转角",
            "keyDimensions": [
                {"name": "有效摇臂孔距 L", "value": "18.0 mm", "note": "tan(δ) = s / L，s=3.8mm时 δ = 11.9°~12.1°"},
                {"name": "主销孔径", "value": "Φ5.0 mm (夹紧开口结构)", "note": "可微调初始零位角"},
            ],
            "features": [
                {
                    "id": "P11-F01",
                    "name": "转向摇臂主体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "rect",
                    "params": {"cx": -5.0, "cy": 5.0, "w": 26.0, "h": 18.0, "fillet": 5.0},
                    "holes": [
                        {"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 2.5},
                        {"shape": "circle", "cx": -7.0, "cy": 10.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "P12",
            "name": "前叉快拆插销",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制连接件",
            "process": "车削加工",
            "material": "303不锈钢",
            "color": "#e2e8f0",
            "quantity": 1,
            "size": [6.0, 6.0, 14.0],
            "note": "带滚花手柄的Φ3mm台阶铰接销，连接转向直线推杆前端腰形槽与前叉转向摆臂，拔出即可自由推车调校",
            "keyDimensions": [
                {"name": "工作销径", "value": "Φ3.0 f7 mm", "note": "滑动配合推杆前端槽"},
                {"name": "滚花帽头直径", "value": "Φ6.0 mm", "note": "免工具徒手拔插"},
            ],
            "features": [
                {
                    "id": "P12-F01",
                    "name": "插销杆与滚花帽",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -7.0,
                    "w1": 7.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "P19",
            "name": "前轮固定短轴",
            "subsystem": "03 蜗轮蜗杆与凸轮转向机构",
            "category": "自制传动件",
            "process": "精密车削",
            "material": "304不锈钢",
            "color": "#cbd5e1",
            "quantity": 1,
            "size": [5.0, 28.0, 5.0],
            "note": "穿入前轮转向叉架下部轴孔(X=+75,Y=0,Z=24mm)，支承前轴承随动轮旋转",
            "keyDimensions": [
                {"name": "轴径 × 长度", "value": "Φ5.0 × 28.0 mm", "note": "两端卡簧槽防脱"},
            ],
            "features": [
                {
                    "id": "P19-F01",
                    "name": "前轮短轴圆柱体",
                    "type": "拉伸凸台",
                    "plane": "XZ",
                    "w0": -14.0,
                    "w1": 14.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 2.5},
                    "holes": [],
                }
            ],
        },
        {
            "id": "B01",
            "name": "625ZZ深沟球轴承",
            "subsystem": "01 底盘与承载骨架",
            "category": "外购标准件",
            "process": "轴承钢标准件",
            "material": "GCr15轴承钢",
            "color": "#94a3b8",
            "quantity": 10,
            "size": [16.0, 5.0, 16.0],
            "note": "全车统一主轴承规格(Φ5×Φ16×5mm)：后轴轴承座2只、后右随动轮2只、前随动轮2只、凸轮竖轴座2只、前主销座2只",
            "keyDimensions": [
                {"name": "内径 d × 外径 D × 宽 B", "value": "Φ5.0 × Φ16.0 × 5.0 mm", "note": "全车轴承规格归一，降低备件复杂度"},
            ],
            "features": [
                {
                    "id": "B01-F01",
                    "name": "625ZZ轴承内外圈主体",
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
        # --- 04 太阳能供电与电控检测系统 ---
        {
            "id": "E01",
            "name": "单晶硅太阳能电池板",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "层压封装成品件",
            "material": "单晶硅+钢化玻璃层压",
            "color": "#1e3a8a",
            "quantity": 1,
            "size": [66.0, 113.0, 3.0],
            "note": "符合三期考核规范尺寸(66×113×3mm)，平置安装于车身后上方太阳能板承载框内(Z=94mm)，顶部无任何遮挡",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "66.0 × 113.0 × 3.0 mm", "note": "严格匹配三期考核文档表1参数"},
                {"name": "安装高度", "value": "Z = 94.0 mm", "note": "受光面朝向+Z正上方，100%无遮挡"},
            ],
            "features": [
                {
                    "id": "E01-F01",
                    "name": "太阳能电池板层压板",
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
            "id": "P15",
            "name": "太阳能板承载框",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "自制结构件",
            "process": "3D打印/CNC加工",
            "material": "PLA-CF碳纤增强/铝合金",
            "color": "#334155",
            "quantity": 1,
            "size": [72.0, 119.0, 5.0],
            "note": "带3mm护边台阶的轻量化托框，承托66×113×3mm单晶硅太阳能电池板，四角连接4根支撑立柱",
            "keyDimensions": [
                {"name": "外框尺寸", "value": "72.0 × 119.0 × 5.0 mm", "note": "内嵌槽66.4×113.4mm"},
            ],
            "features": [
                {
                    "id": "P15-F01",
                    "name": "太阳能板外护框",
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
            "id": "P16",
            "name": "太阳能板支撑立柱",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "自制结构件",
            "process": "车削/六角铝柱",
            "material": "6061铝合金",
            "color": "#64748b",
            "quantity": 4,
            "size": [6.0, 6.0, 54.0],
            "note": "4根等高Φ6mm铝合金立柱(长54mm)，下端锁紧于主底板(Z=36mm)，上端支承太阳能板承载框(Z=90mm)",
            "keyDimensions": [
                {"name": "外径 × 长度", "value": "Φ6.0 × 54.0 mm", "note": "两端M3内螺纹孔"},
            ],
            "features": [
                {
                    "id": "P16-F01",
                    "name": "支撑立柱圆柱体",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -27.0,
                    "w1": 27.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 3.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
        {
            "id": "E02",
            "name": "超级电容储能模组",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品模组",
            "material": "法拉电容组+均衡保护板",
            "color": "#047857",
            "quantity": 1,
            "size": [68.0, 48.0, 36.0],
            "note": "紧凑布置于主底板中右部超级电容固定座内(X=-10,Y=-32,Z=56mm)，包络满足三期考核≤70×70×50mm要求",
            "keyDimensions": [
                {"name": "模组包络尺寸", "value": "68.0 × 48.0 × 36.0 mm", "note": "符合≤70×70×50mm规范"},
            ],
            "features": [
                {
                    "id": "E02-F01",
                    "name": "超级电容组封装主体",
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
            "id": "P13",
            "name": "超级电容固定座",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "自制结构件",
            "process": "3D打印",
            "material": "PLA/ABS工程塑料",
            "color": "#475569",
            "quantity": 1,
            "size": [72.0, 52.0, 12.0],
            "note": "安装在主底板上表面右侧(X=-10,Y=-32,Z=36mm)，四周围挡卡紧超级电容储能模组防止急转弯晃动",
            "keyDimensions": [
                {"name": "内腔尺寸", "value": "68.4 × 48.4 mm", "note": "围栏高10mm，底部M3沉头孔"},
            ],
            "features": [
                {
                    "id": "P13-F01",
                    "name": "电容卡座围框",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -6.0,
                    "w1": 6.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 72.0, "h": 52.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 64.0, "h": 44.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "E03",
            "name": "充电与语音控制电路板",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "PCB贴片成品件",
            "material": "FR-4玻纤板+电子元器件",
            "color": "#15803d",
            "quantity": 1,
            "size": [64.0, 44.0, 6.0],
            "note": "集成MPPT太阳能充电管理与语音识别启动控制模块(64×44mm，满足≤65×45mm)，安装于主底板中左侧(X=-10,Y=+32,Z=45mm)",
            "keyDimensions": [
                {"name": "PCB尺寸", "value": "64.0 × 44.0 × 1.6 mm (含器件高6mm)", "note": "符合三期考核充电控制板+语音模块尺寸"},
            ],
            "features": [
                {
                    "id": "E03-F01",
                    "name": "控制电路板基板",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -3.0,
                    "w1": 3.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 64.0, "h": 44.0, "fillet": 2.0},
                    "holes": [
                        {"shape": "circle", "cx": -28.0, "cy": -18.0, "r": 1.6},
                        {"shape": "circle", "cx": 28.0, "cy": -18.0, "r": 1.6},
                        {"shape": "circle", "cx": -28.0, "cy": 18.0, "r": 1.6},
                        {"shape": "circle", "cx": 28.0, "cy": 18.0, "r": 1.6},
                    ],
                }
            ],
        },
        {
            "id": "E04",
            "name": "顶部电能检测模块",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品仪表模块",
            "material": "ABS外壳+LCD液晶屏",
            "color": "#0f172a",
            "quantity": 1,
            "size": [35.0, 84.0, 24.0],
            "note": "严格按开会记录与三期考核要求(35×84×26mm)置于车体前部正上方(X=+58,Y=0,Z=82mm)，液晶屏朝上100%无遮挡",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "35.0 × 84.0 × 24.0 mm", "note": "严格符合开会记录『电能检测模块放在顶部且不能有遮挡』"},
                {"name": "安装高度", "value": "Z = 82.0 mm", "note": "高于前叉转向机构，互不干涉"},
            ],
            "features": [
                {
                    "id": "E04-F01",
                    "name": "电能检测表壳体与液晶窗",
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
            "id": "P14",
            "name": "电能检测模块支架",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "自制结构件",
            "process": "3D打印/折弯件",
            "material": "PLA-CF/铝合金",
            "color": "#475569",
            "quantity": 1,
            "size": [40.0, 96.0, 34.0],
            "note": "龙门式跨接支架，跨过前部转向推杆与前叉摆臂上方，将顶部电能检测模块与红色LED指示灯稳固托举在车头顶部",
            "keyDimensions": [
                {"name": "跨度 × 高度", "value": "96.0 × 34.0 mm", "note": "下部留出净高28mm供转向推杆与前叉摆臂运动"},
            ],
            "features": [
                {
                    "id": "P14-F01",
                    "name": "龙门式托架主梁",
                    "type": "拉伸凸台",
                    "plane": "YZ",
                    "w0": -20.0,
                    "w1": 20.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 96.0, "h": 34.0, "fillet": 3.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": -4.0, "w": 76.0, "h": 26.0, "fillet": 2.0}],
                }
            ],
        },
        {
            "id": "E05",
            "name": "顶部红色LED指示灯",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "成品LED灯珠组件",
            "material": "高透红光环氧透镜+金属座",
            "color": "#dc2626",
            "quantity": 1,
            "size": [12.0, 12.0, 14.0],
            "note": "满足开会记录与三期考核『车顶部放置一个不小于8mm的红色LED指示灯』要求，采用Φ10mm高亮红光LED置于车头顶部右侧(Z=84mm)",
            "keyDimensions": [
                {"name": "发光灯头直径", "value": "Φ10.0 mm (≥ Φ8.0 mm要求)", "note": "底座法兰Φ12.0mm，顶部无遮挡"},
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
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "赛会指定电子件",
            "process": "PCB射频天线模块",
            "material": "FR-4玻纤天线板",
            "color": "#0284c7",
            "quantity": 1,
            "size": [40.0, 40.0, 3.0],
            "note": "符合三期考核尺寸(40×40×3mm)，平贴于主底板下表面(X=+20,Y=0,Z=29mm)，外部由非金属防护盒完全包裹不外露",
            "keyDimensions": [
                {"name": "模块尺寸", "value": "40.0 × 40.0 × 3.0 mm", "note": "距地面高度29mm，感应赛道地标卡灵敏"},
            ],
            "features": [
                {
                    "id": "E06-F01",
                    "name": "RFID读卡器正方形PCB",
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
            "id": "P17",
            "name": "底部读卡器防护盒",
            "subsystem": "04 太阳能供电与电控检测系统",
            "category": "自制结构件",
            "process": "3D打印",
            "material": "ABS非金属透波塑料",
            "color": "#64748b",
            "quantity": 1,
            "size": [48.0, 48.0, 8.0],
            "note": "严格落实开会记录『读卡器放在小车底部，不能外露』要求，采用非金属薄壁盒将RFID读卡器封装于底板下表面(X=+20,Y=0,Z=28mm)",
            "keyDimensions": [
                {"name": "外形尺寸", "value": "48.0 × 48.0 × 8.0 mm", "note": "全包裹防护且不屏蔽RFID射频信号"},
            ],
            "features": [
                {
                    "id": "P17-F01",
                    "name": "读卡器全包裹防护壳",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -4.0,
                    "w1": 4.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 48.0, "h": 48.0, "fillet": 3.0},
                    "holes": [
                        {"shape": "circle", "cx": -20.0, "cy": -20.0, "r": 1.6},
                        {"shape": "circle", "cx": 20.0, "cy": -20.0, "r": 1.6},
                        {"shape": "circle", "cx": -20.0, "cy": 20.0, "r": 1.6},
                        {"shape": "circle", "cx": 20.0, "cy": 20.0, "r": 1.6},
                    ],
                }
            ],
        },
        # --- 05 外壳护罩与标准紧固件 ---
        {
            "id": "P18",
            "name": "轻量化快拆外壳",
            "subsystem": "05 外壳护罩与标准紧固件",
            "category": "自制外观件",
            "process": "3D打印一体成型",
            "material": "透明/半透轻质PLA",
            "color": "#38bdf8",
            "quantity": 1,
            "size": [196.0, 136.0, 38.0],
            "note": "流线型薄壁快拆护罩，顶部大开口完全避让单晶硅太阳能板、顶部电能检测模块与红色LED指示灯，侧面设散热百叶窗",
            "keyDimensions": [
                {"name": "外包络尺寸", "value": "196.0 × 136.0 × 38.0 mm", "note": "远小于250×200mm红线"},
                {"name": "顶部避让窗口", "value": "156.0 × 106.0 mm", "note": "确保太阳能板、电能表与LED指示灯零遮挡"},
            ],
            "features": [
                {
                    "id": "P18-F01",
                    "name": "快拆环形流线护罩",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -19.0,
                    "w1": 19.0,
                    "shape": "rect",
                    "params": {"cx": 0.0, "cy": 0.0, "w": 196.0, "h": 136.0, "fillet": 14.0},
                    "holes": [{"shape": "rect", "cx": 0.0, "cy": 0.0, "w": 188.0, "h": 128.0, "fillet": 11.0}],
                }
            ],
        },
        {
            "id": "F01",
            "name": "M3铜柱与紧固件套件",
            "subsystem": "05 外壳护罩与标准紧固件",
            "category": "外购标准件",
            "process": "标准紧固件",
            "material": "H59黄铜/304不锈钢",
            "color": "#facc15",
            "quantity": 4,
            "size": [6.0, 6.0, 12.0],
            "note": "全车统一采用M3紧固体系（含控制板支撑M3×8六角铜柱及内六角螺钉），拒绝多规格混用",
            "keyDimensions": [
                {"name": "螺纹规格", "value": "M3 × 0.5 标准螺纹", "note": "全车仅需一把2.5mm内六角扳手即可完成拆装"},
            ],
            "features": [
                {
                    "id": "F01-F01",
                    "name": "M3六角支撑铜柱",
                    "type": "拉伸凸台",
                    "plane": "XY",
                    "w0": -6.0,
                    "w1": 6.0,
                    "shape": "circle",
                    "params": {"cx": 0.0, "cy": 0.0, "r": 3.0},
                    "holes": [{"shape": "circle", "cx": 0.0, "cy": 0.0, "r": 1.5}],
                }
            ],
        },
    ]

    # Enrich each part with 1-to-1 SolidWorks naming & inspection metadata
    for idx, p in enumerate(raw_parts, start=1):
        sw_name = p["name"]
        p["partNumber"] = f"SC-{idx:02d}"
        p["solidworksName"] = sw_name
        p["solidworksFile"] = f"{sw_name}.SLDPRT"
        p["drawingUrl"] = f"docs/零件图册/{p['id']}.html"
        p["featureCount"] = len(p["features"])
    return raw_parts


def build_meshes_for_parts(parts: List[Dict[str, object]]) -> Dict[str, Dict[str, object]]:
    """Generate 3D triangulated meshes for every part in `parts`."""
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
    """Return 3D assembly instances with exact vehicle coordinates (X: longitudinal, Y: lateral, Z: vertical)."""
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
        # Step 1: 铝合金主底板与轴承座基座
        inst("I01", "P01", "铝合金主底板", (0.0, 0.0, 34.0), (0, 0, 0), step=1),
        inst("I02", "P02", "后轴轴承座(左)", (-65.0, 52.0, 25.0), (0, 0, 0), step=1),
        inst("I03", "P02", "后轴轴承座(右)", (-65.0, -52.0, 25.0), (0, 0, 0), step=1),
        inst("I04", "B01", "625ZZ深沟球轴承(左后座)", (-65.0, 52.0, 24.0), (0, 0, 0), step=1),
        inst("I05", "B01", "625ZZ深沟球轴承(右后座)", (-65.0, -52.0, 24.0), (0, 0, 0), step=1),
        inst("I06", "P06", "凸轮轴立式轴承座", (-52.0, 0.0, 38.0), (0, 0, 0), step=1),
        inst("I07", "P09", "前转向主销轴承座", (75.0, 0.0, 38.0), (0, 0, 0), step=1),

        # Step 2: 单电机与1:4直齿圆柱齿轮减速后桥
        inst("I08", "P03", "N20电机固定座", (-42.5, 14.0, 24.5), (0, 0, 0), step=2),
        inst("I09", "M01", "N20直流减速电机", (-42.5, 14.0, 24.0), (0, 0, 0), step=2),
        inst("I10", "G02", "18齿电机主动齿轮", (-42.5, 34.0, 24.0), (0, 0, 0), step=2, motion="motor_pinion"),
        inst("I11", "P04", "后轮驱动长轴", (-65.0, 0.0, 24.0), (0, 0, 0), step=2, motion="rear_axle"),
        inst("I12", "G01", "72齿后轴从动大齿轮", (-65.0, 34.0, 24.0), (0, 0, 0), step=2, motion="rear_axle"),
        inst("I13", "W01", "后左驱动轮", (-65.0, 68.0, 24.0), (0, 0, 0), step=2, motion="rear_axle"),
        inst("I14", "W02", "轴承随动轮(后右)", (-65.0, -68.0, 24.0), (0, 0, 0), step=2, motion="rear_free_wheel"),
        inst("I15", "B01", "625ZZ深沟球轴承(右轮内)", (-65.0, -68.0, 24.0), (0, 0, 0), step=2),

        # Step 3: 1:30蜗杆蜗轮与五次多项式盘形凸轮机构
        inst("I16", "G03", "0.5模单头蜗杆", (-65.0, 0.0, 24.0), (0, 0, 0), step=3, motion="rear_axle"),
        inst("I17", "P05", "凸轮传力竖轴", (-52.0, 0.0, 39.0), (0, 0, 0), step=3, motion="cam_shaft"),
        inst("I18", "G04", "30齿青铜蜗轮", (-52.0, 0.0, 19.0), (0, 0, 0), step=3, motion="cam_shaft"),
        inst("I19", "C01", "盘形转向凸轮", (-52.0, 0.0, 54.0), (0, 0, 0), step=3, motion="cam_shaft"),
        inst("I20", "C02", "直行校准凸轮盘(备件展示位)", (-80.0, -48.0, 40.0), (0, 0, 0), step=3),

        # Step 4: 滚子推杆、复位弹簧与前叉转向总成
        inst("I21", "P08", "转向推杆导向座(后)", (-12.0, 0.0, 48.0), (0, 0, 0), step=4),
        inst("I22", "P08", "转向推杆导向座(前)", (42.0, 0.0, 48.0), (0, 0, 0), step=4),
        inst("I23", "P07", "转向直线推杆", (17.0, 0.0, 54.0), (0, 0, 0), step=4, motion="pushrod"),
        inst("I24", "B02", "MR84ZZ凸轮滚子轴承", (-32.0, 0.0, 54.0), (0, 0, 0), step=4, motion="pushrod"),
        inst("I25", "SP1", "推杆复位圆柱弹簧", (15.0, 0.0, 54.0), (0, 0, 0), step=4, motion="pushrod"),
        inst("I26", "P10", "前轮转向叉架", (75.0, 0.0, 28.0), (0, 0, 0), step=4, motion="front_steer"),
        inst("I27", "P19", "前轮固定短轴", (75.0, 0.0, 24.0), (0, 0, 0), step=4, motion="front_steer"),
        inst("I28", "W02", "轴承随动轮(前转向轮)", (75.0, 0.0, 24.0), (0, 0, 0), step=4, motion="front_wheel"),
        inst("I29", "P11", "前叉转向摆臂", (75.0, 0.0, 54.0), (0, 0, 0), step=4, motion="front_steer"),
        inst("I30", "P12", "前叉快拆插销", (68.0, 10.0, 54.0), (0, 0, 0), step=4, motion="front_steer"),

        # Step 5: 太阳能电池板、超级电容、控制板、顶部电能表与底部读卡器
        inst("I31", "E06", "底部RFID读卡器模块", (20.0, 0.0, 29.5), (0, 0, 0), step=5),
        inst("I32", "P17", "底部读卡器防护盒", (20.0, 0.0, 28.0), (0, 0, 0), step=5),
        inst("I33", "P13", "超级电容固定座", (-10.0, -34.0, 42.0), (0, 0, 0), step=5),
        inst("I34", "E02", "超级电容储能模组", (-10.0, -34.0, 56.0), (0, 0, 0), step=5),
        inst("I35", "F01", "M3铜柱与紧固件套件(左前)", (16.0, 46.0, 42.0), (0, 0, 0), step=5),
        inst("I36", "F01", "M3铜柱与紧固件套件(左后)", (-36.0, 46.0, 42.0), (0, 0, 0), step=5),
        inst("I37", "E03", "充电与语音控制电路板", (-10.0, 34.0, 48.0), (0, 0, 0), step=5),
        inst("I38", "P14", "电能检测模块支架", (58.0, 0.0, 53.0), (0, 0, 0), step=5),
        inst("I39", "E04", "顶部电能检测模块", (58.0, 0.0, 82.0), (0, 0, 0), step=5),
        inst("I40", "E05", "顶部红色LED指示灯", (72.0, 34.0, 82.0), (0, 0, 0), step=5),
        inst("I41", "P16", "太阳能板支撑立柱(左后)", (-50.0, 48.0, 63.0), (0, 0, 0), step=5),
        inst("I42", "P16", "太阳能板支撑立柱(右后)", (-50.0, -48.0, 63.0), (0, 0, 0), step=5),
        inst("I43", "P16", "太阳能板支撑立柱(左前)", (6.0, 48.0, 63.0), (0, 0, 0), step=5),
        inst("I44", "P16", "太阳能板支撑立柱(右前)", (6.0, -48.0, 63.0), (0, 0, 0), step=5),
        inst("I45", "P15", "太阳能板承载框", (-22.0, 0.0, 92.0), (0, 0, 0), step=5),
        inst("I46", "E01", "单晶硅太阳能电池板", (-22.0, 0.0, 94.5), (0, 0, 0), step=5),

        # Step 6: 轻量化快拆外壳
        inst("I47", "P18", "轻量化快拆外壳", (0.0, 0.0, 56.0), (0, 0, 0), step=6),
    ]
    return placements


def build_assembly_steps() -> List[Dict[str, object]]:
    return [
        {
            "step": 1,
            "title": "步骤 1：铝合金主底板与三大轴承座基准定位",
            "summary": "以『铝合金主底板』(190×130×4mm)为整车装配基准，在下表面左/右对称锁紧2件『后轴轴承座』并压入『625ZZ深沟球轴承』；在底板(X=-52,Y=0)和(X=+75,Y=0)通孔处分别锁紧『凸轮轴立式轴承座』与『前转向主销轴承座』。",
            "parts": ["铝合金主底板", "后轴轴承座", "凸轮轴立式轴承座", "前转向主销轴承座", "625ZZ深沟球轴承"],
            "checkPoint": "检查左右后轴轴承座同轴度≤0.05mm，所有旋转轴孔均配有实体轴承座支撑。",
        },
        {
            "step": 2,
            "title": "步骤 2：单电机固定座与 1:4 直齿减速后桥装配",
            "summary": "将『N20直流减速电机』装入『N20电机固定座』并锁紧于底板下表面(X=-42.5,Y=+14mm，杜绝电机悬空)，输出轴安装『18齿电机主动齿轮』(m=0.5,z=18)。穿入『后轮驱动长轴』，在Y=+34mm处锁紧『72齿后轴从动大齿轮』(m=0.5,z=72，中心距22.50mm，精确实现1:4减速)，左端锁紧『后左驱动轮』，右端活套内置轴承的『轴承随动轮』。",
            "parts": ["N20电机固定座", "N20直流减速电机", "18齿电机主动齿轮", "72齿后轴从动大齿轮", "后轮驱动长轴", "后左驱动轮", "轴承随动轮"],
            "checkPoint": "拨动72齿大齿轮检查18:72啮合侧隙适中，左轮驱动、右轮随动无差速干涉。",
        },
        {
            "step": 3,
            "title": "步骤 3：1:30 蜗杆蜗轮副与五次多项式转向凸轮安装",
            "summary": "在『后轮驱动长轴』中点(X=-65,Y=0)锁紧『0.5模单头蜗杆』；将『凸轮传力竖轴』穿入『凸轮轴立式轴承座』，下端锁紧『30齿青铜蜗轮』(中心距13.0mm，构成1:30减速)，上端安装『盘形转向凸轮』(或根据直线赛道需求快拆替换为『直行校准凸轮盘』)。",
            "parts": ["0.5模单头蜗杆", "30齿青铜蜗轮", "凸轮传力竖轴", "盘形转向凸轮", "直行校准凸轮盘"],
            "checkPoint": "后轮每旋转30圈，盘形转向凸轮精确旋转1圈(对应地面行驶约4.52m)。",
        },
        {
            "step": 4,
            "title": "步骤 4：滚子推杆、复位弹簧与前叉转向机构联调",
            "summary": "在主底板中线锁紧前后2只『转向推杆导向座』，穿入『转向直线推杆』并套入『推杆复位圆柱弹簧』，推杆后端安装『MR84ZZ凸轮滚子轴承』压紧凸轮外廓。将『前轮转向叉架』(含『前轮固定短轴』与前『轴承随动轮』)穿入『前转向主销轴承座』，顶端锁紧『前叉转向摆臂』，并用『前叉快拆插销』与推杆前端连接。",
            "parts": ["转向直线推杆", "转向推杆导向座", "MR84ZZ凸轮滚子轴承", "推杆复位圆柱弹簧", "前轮转向叉架", "前轮固定短轴", "前叉转向摆臂", "前叉快拆插销"],
            "checkPoint": "复位弹簧将MR84ZZ滚子恒定压紧在凸轮轮廓上；拔出前叉快拆插销即可手动自由推车。",
        },
        {
            "step": 5,
            "title": "步骤 5：太阳能板、超级电容、控制板、顶部电能表与底部读卡器安装",
            "summary": "在底板底部安装『底部RFID读卡器模块』并盖上非金属『底部读卡器防护盒』(完全不外露)；在底板中段安装『超级电容固定座』、『超级电容储能模组』、『M3铜柱与紧固件套件』及『充电与语音控制电路板』；在前部跨接『电能检测模块支架』，頂部无遮挡安装『顶部电能检测模块』与Φ10mm『顶部红色LED指示灯』；最后用4根『太阳能板支撑立柱』托起『太阳能板承载框』与『单晶硅太阳能电池板』。",
            "parts": ["单晶硅太阳能电池板", "太阳能板承载框", "太阳能板支撑立柱", "超级电容储能模组", "超级电容固定座", "充电与语音控制电路板", "顶部电能检测模块", "电能检测模块支架", "顶部红色LED指示灯", "底部RFID读卡器模块", "底部读卡器防护盒", "M3铜柱与紧固件套件"],
            "checkPoint": "确认顶部太阳能电池板、顶部电能检测模块液晶屏、顶部Φ10mm红色LED指示灯100%无遮挡，底部RFID读卡器完全封装不外露。",
        },
        {
            "step": 6,
            "title": "步骤 6：轻量化快拆外壳总装与整车尺度核验",
            "summary": "从上方扣合『轻量化快拆外壳』，核验整车包络尺寸为 210mm(长) × 152mm(宽) × 104mm(高)，严格满足赛题『宽≤200mm、长≤250mm』要求。",
            "parts": ["轻量化快拆外壳"],
            "checkPoint": "整车共38种零件(47个装配实例)，每一个网页零件名与SolidWorks零件名(.SLDPRT) 100%一一对应。",
        },
    ]
