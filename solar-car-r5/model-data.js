window.CAR_SPEC = {
  "project": {
    "name": "工创赛太阳能小车（四轮同轴全向舵轮[非麦轮]与双凸轮底部传动版）",
    "version": "OmniSwerve-V2",
    "envelopeMm": [
      216.0,
      164.0,
      106.0
    ],
    "limitsMm": {
      "maxLength": 250.0,
      "maxWidth": 200.0
    },
    "driveRatio": "1 : 4 主减速 (18齿主动小齿轮 : 72齿主减速大齿轮) + 正交锥齿轮四轮同轴分动",
    "steeringMechanism": "四轮独立同轴全向舵轮(非麦轮) + 1:30单头蜗杆蜗轮 + 上下双凸轮(主航向凸轮C01 + 差动副凸轮C02) + 前/后桥平行四边形转向横拉杆",
    "partTypeCount": 106,
    "totalInstanceCount": 287,
    "placementCount": 267,
    "featureCount": 246,
    "namingRule": "网页显示零件名与 SolidWorks 零件文件名 (<零件名>.SLDPRT) 1:1 严格对应"
  },
  "parts": [
    {
      "id": "P01",
      "name": "铝合金主底板",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金铣削",
      "material": "6061-T6铝合金",
      "color": "#475569",
      "quantity": 1,
      "size": [
        204.0,
        156.0,
        4.0
      ],
      "note": "上层主承载底板(Z=46mm，高于Φ40车轮最高点6mm，彻底杜绝碰轮)，四角设Φ15mm全向舵轮主销孔(X=±72,Y=±58mm)",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "204.0 × 156.0 × 4.0 mm",
          "note": "安装高度 Z=46.0mm，高于车轮顶部(Z=40mm)"
        },
        {
          "name": "四轮主销孔距",
          "value": "144.0 × 116.0 mm",
          "note": "四角坐标 X=±72.0, Y=±58.0 mm"
        }
      ],
      "features": [
        {
          "id": "P01-F01",
          "name": "铝合金主底板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 204.0,
            "h": 156.0,
            "fillet": 12.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -72.0,
              "cy": -58.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": -72.0,
              "cy": 58.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": 72.0,
              "cy": -58.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": 72.0,
              "cy": 58.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": -34.0,
              "cy": 0.0,
              "r": 6.0
            },
            {
              "shape": "rect",
              "cx": -34.0,
              "cy": 26.0,
              "w": 36.0,
              "h": 18.0,
              "fillet": 3.0
            },
            {
              "shape": "rect",
              "cx": 22.0,
              "cy": -26.0,
              "w": 40.0,
              "h": 18.0,
              "fillet": 3.0
            },
            {
              "shape": "rect",
              "cx": 22.0,
              "cy": 26.0,
              "w": 40.0,
              "h": 18.0,
              "fillet": 3.0
            }
          ]
        },
        {
          "id": "P01-F02",
          "name": "铝合金主底板四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 77.52,
            "cy": 59.28,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P01-F03",
          "name": "铝合金主底板对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": -77.52,
            "cy": -59.28,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-001",
      "solidworksName": "铝合金主底板",
      "solidworksFile": "铝合金主底板.SLDPRT",
      "drawingUrl": "docs/零件图册/P01.html",
      "featureCount": 3
    },
    {
      "id": "P02",
      "name": "底部中置传动副底板",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金铣削",
      "material": "6061-T6铝合金",
      "color": "#334155",
      "quantity": 1,
      "size": [
        168.0,
        56.0,
        4.0
      ],
      "note": "下层中置窄体齿轮箱底板(Z=20mm，宽度严格限制在Y∈[-28,+28]mm，距离Y=±58mm处的Φ40全向舵轮留有9mm以上净空，100%不与车轮重合！)",
      "keyDimensions": [
        {
          "name": "中置窄板尺寸",
          "value": "168.0 × 56.0 × 4.0 mm",
          "note": "Y∈[-28,+28]mm，与Y=±58mm车轮360°扫掠区零干涉"
        },
        {
          "name": "离地高度",
          "value": "Z = 20.0 mm",
          "note": "与中置齿轮箱左右立板构成封闭式中央传动通道"
        }
      ],
      "features": [
        {
          "id": "P02-F01",
          "name": "底部中置传动副底板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 168.0,
            "h": 56.0,
            "fillet": 6.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": -48.0,
              "cy": 16.0,
              "w": 38.0,
              "h": 8.0,
              "fillet": 2.0
            },
            {
              "shape": "circle",
              "cx": -34.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        },
        {
          "id": "P02-F02",
          "name": "底部中置传动副底板四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 63.84,
            "cy": 21.28,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P02-F03",
          "name": "底部中置传动副底板对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": -63.84,
            "cy": -21.28,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-002",
      "solidworksName": "底部中置传动副底板",
      "solidworksFile": "底部中置传动副底板.SLDPRT",
      "drawingUrl": "docs/零件图册/P02.html",
      "featureCount": 3
    },
    {
      "id": "P03",
      "name": "四角舵轮高架悬臂梁",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#64748b",
      "quantity": 4,
      "size": [
        32.0,
        36.0,
        6.0
      ],
      "note": "共4件安装在主底板四角上方(Z=51mm)，加固全向舵轮主销轴承座并支承高架横向分动传动半轴",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "32.0 × 36.0 × 6.0 mm",
          "note": "高架于Z=51mm，避开下部车轮"
        }
      ],
      "features": [
        {
          "id": "P03-F01",
          "name": "四角舵轮高架悬臂梁主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 32.0,
            "h": 36.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 7.5
            }
          ]
        },
        {
          "id": "P03-F02",
          "name": "四角舵轮高架悬臂梁四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 12.16,
            "cy": 13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P03-F03",
          "name": "四角舵轮高架悬臂梁对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -12.16,
            "cy": -13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-003",
      "solidworksName": "四角舵轮高架悬臂梁",
      "solidworksFile": "四角舵轮高架悬臂梁.SLDPRT",
      "drawingUrl": "docs/零件图册/P03.html",
      "featureCount": 3
    },
    {
      "id": "P04",
      "name": "中置齿轮箱左侧立板",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#475569",
      "quantity": 1,
      "size": [
        156.0,
        4.0,
        22.0
      ],
      "note": "连接铝合金主底板与底部中置传动副底板的左侧纵向承力墙(Y=+26mm, Z∈[22,44]mm)，将全部传动齿轮封装在中置通道内",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "156.0 × 4.0 × 22.0 mm",
          "note": "位于Y=+26mm，完全处于四轮内侧安全区"
        }
      ],
      "features": [
        {
          "id": "P04-F01",
          "name": "中置齿轮箱左侧立板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 156.0,
            "h": 22.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -48.0,
              "cy": 0.0,
              "r": 5.0
            },
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 36.0,
              "h": 10.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P04-F02",
          "name": "中置齿轮箱左侧立板四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 59.28,
            "cy": 8.36,
            "w": 8.0,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P04-F03",
          "name": "中置齿轮箱左侧立板对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": -59.28,
            "cy": -8.36,
            "w": 8.0,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-004",
      "solidworksName": "中置齿轮箱左侧立板",
      "solidworksFile": "中置齿轮箱左侧立板.SLDPRT",
      "drawingUrl": "docs/零件图册/P04.html",
      "featureCount": 3
    },
    {
      "id": "P05",
      "name": "中置齿轮箱右侧立板",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#475569",
      "quantity": 1,
      "size": [
        156.0,
        4.0,
        22.0
      ],
      "note": "连接铝合金主底板与底部中置传动副底板的右侧纵向承力墙(Y=-26mm, Z∈[22,44]mm)，保证中央分动轴系高刚度",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "156.0 × 4.0 × 22.0 mm",
          "note": "位于Y=-26mm，与右侧车轮留有11mm以上净空"
        }
      ],
      "features": [
        {
          "id": "P05-F01",
          "name": "中置齿轮箱右侧立板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 156.0,
            "h": 22.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -48.0,
              "cy": 0.0,
              "r": 5.0
            },
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 36.0,
              "h": 10.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P05-F02",
          "name": "中置齿轮箱右侧立板四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 59.28,
            "cy": 8.36,
            "w": 8.0,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P05-F03",
          "name": "中置齿轮箱右侧立板对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": -59.28,
            "cy": -8.36,
            "w": 8.0,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-005",
      "solidworksName": "中置齿轮箱右侧立板",
      "solidworksFile": "中置齿轮箱右侧立板.SLDPRT",
      "drawingUrl": "docs/零件图册/P05.html",
      "featureCount": 3
    },
    {
      "id": "P06",
      "name": "底盘层间六角支撑柱",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "数控车削",
      "material": "6061-T6铝合金",
      "color": "#94a3b8",
      "quantity": 8,
      "size": [
        7.0,
        7.0,
        22.0
      ],
      "note": "8根Φ7×22mm支撑立柱，分布于中置传动副底板四周(Y=±24mm)，锁紧上下两层底板",
      "keyDimensions": [
        {
          "name": "外径 × 长度",
          "value": "Φ7.0 × 22.0 mm",
          "note": "中心M3螺纹通孔"
        }
      ],
      "features": [
        {
          "id": "P06-F01",
          "name": "底盘层间六角支撑柱回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -11.0,
          "w1": 11.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "P06-F02",
          "name": "底盘层间六角支撑柱端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -11.8,
          "w1": 11.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-006",
      "solidworksName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "drawingUrl": "docs/零件图册/P06.html",
      "featureCount": 2
    },
    {
      "id": "P07",
      "name": "车头防撞缓冲前杠",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC加工/3D打印",
      "material": "高韧性尼龙PA12",
      "color": "#0284c7",
      "quantity": 1,
      "size": [
        16.0,
        136.0,
        8.0
      ],
      "note": "安装在铝合金主底板前端(X=+104, Y=0, Z=46mm)，保护前桥平行四边形转向横拉杆与扇形齿轮摇臂",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "16.0 × 136.0 × 8.0 mm",
          "note": "圆弧防撞导角"
        }
      ],
      "features": [
        {
          "id": "P07-F01",
          "name": "车头防撞缓冲前杠主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 16.0,
            "h": 136.0,
            "fillet": 5.0
          },
          "holes": []
        },
        {
          "id": "P07-F02",
          "name": "车头防撞缓冲前杠加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 4.0,
          "w1": 5.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 5.12,
            "h": 43.52,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-007",
      "solidworksName": "车头防撞缓冲前杠",
      "solidworksFile": "车头防撞缓冲前杠.SLDPRT",
      "drawingUrl": "docs/零件图册/P07.html",
      "featureCount": 2
    },
    {
      "id": "P08",
      "name": "车尾铝合金定位后杠",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#0369a1",
      "quantity": 1,
      "size": [
        14.0,
        132.0,
        8.0
      ],
      "note": "安装在铝合金主底板后端(X=-103, Y=0, Z=46mm)，保护后桥平行四边形转向横拉杆",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "14.0 × 132.0 × 8.0 mm",
          "note": "带赛场发车定位基准面"
        }
      ],
      "features": [
        {
          "id": "P08-F01",
          "name": "车尾铝合金定位后杠主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 14.0,
            "h": 132.0,
            "fillet": 4.0
          },
          "holes": []
        },
        {
          "id": "P08-F02",
          "name": "车尾铝合金定位后杠加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 4.0,
          "w1": 5.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 4.48,
            "h": 42.24,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-008",
      "solidworksName": "车尾铝合金定位后杠",
      "solidworksFile": "车尾铝合金定位后杠.SLDPRT",
      "drawingUrl": "docs/零件图册/P08.html",
      "featureCount": 2
    },
    {
      "id": "P09",
      "name": "横轴法兰轴承座",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金镗孔",
      "material": "6061-T6铝合金",
      "color": "#3b82f6",
      "quantity": 6,
      "size": [
        20.0,
        8.0,
        18.0
      ],
      "note": "共6件：2件支承底部横向主传动轴(X=-48,Y=±22mm)，4件支承上层高架横向分动传动半轴",
      "keyDimensions": [
        {
          "name": "轴承孔径",
          "value": "Φ16.0 H7 mm",
          "note": "配合625ZZ深沟球轴承"
        }
      ],
      "features": [
        {
          "id": "P09-F01",
          "name": "横轴法兰轴承座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 20.0,
            "h": 18.0,
            "fillet": 2.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 7.5
            }
          ]
        },
        {
          "id": "P09-F02",
          "name": "横轴法兰轴承座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": 7.6,
            "cy": 6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P09-F03",
          "name": "横轴法兰轴承座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": -7.6,
            "cy": -6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-009",
      "solidworksName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P09.html",
      "featureCount": 3
    },
    {
      "id": "P10",
      "name": "纵轴立式双轴承座",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金镗孔",
      "material": "6061-T6铝合金",
      "color": "#2563eb",
      "quantity": 4,
      "size": [
        8.0,
        20.0,
        18.0
      ],
      "note": "共4件沿中置传动副底板中心线(Y=0, X=-58/-18/+18/+54mm)布置，支承底部纵向贯通传动主轴",
      "keyDimensions": [
        {
          "name": "轴承孔径",
          "value": "Φ16.0 H7 mm",
          "note": "四点高同轴度支承"
        }
      ],
      "features": [
        {
          "id": "P10-F01",
          "name": "纵轴立式双轴承座主体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 20.0,
            "h": 18.0,
            "fillet": 2.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 7.5
            }
          ]
        },
        {
          "id": "P10-F02",
          "name": "纵轴立式双轴承座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": 7.6,
            "cy": 6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P10-F03",
          "name": "纵轴立式双轴承座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": -7.6,
            "cy": -6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-010",
      "solidworksName": "纵轴立式双轴承座",
      "solidworksFile": "纵轴立式双轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P10.html",
      "featureCount": 3
    },
    {
      "id": "B01",
      "name": "625ZZ深沟球轴承",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "外购标准件",
      "process": "轴承钢标准件",
      "material": "GCr15轴承钢",
      "color": "#94a3b8",
      "quantity": 24,
      "size": [
        16.0,
        5.0,
        16.0
      ],
      "note": "全车Φ5mm主传动轴与轮轴标准轴承(Φ5×Φ16×5mm，共24只)",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "Φ5.0 × Φ16.0 × 5.0 mm",
          "note": "ABEC-5高精度低阻轴承"
        }
      ],
      "features": [
        {
          "id": "B01-F01",
          "name": "625ZZ深沟球轴承回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 8.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "B01-F02",
          "name": "625ZZ深沟球轴承端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.3,
          "w1": 3.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.53
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-011",
      "solidworksName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B01.html",
      "featureCount": 2
    },
    {
      "id": "B04",
      "name": "MF85ZZ法兰微型轴承",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "外购标准件",
      "process": "轴承钢标准件",
      "material": "GCr15轴承钢",
      "color": "#cbd5e1",
      "quantity": 12,
      "size": [
        8.0,
        8.0,
        3.0
      ],
      "note": "Φ5×Φ8×2.5mm带法兰微型球轴承，用于钟形转换摇臂、张紧轮及分动过渡轴支承",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "Φ5.0 × Φ8.0 × 2.5 mm",
          "note": "带定位外法兰"
        }
      ],
      "features": [
        {
          "id": "B04-F01",
          "name": "MF85ZZ法兰微型轴承回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "B04-F02",
          "name": "MF85ZZ法兰微型轴承轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -0.54,
          "w1": 0.54,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.12
          },
          "holes": []
        }
      ],
      "partNumber": "SC-012",
      "solidworksName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B04.html",
      "featureCount": 2
    },
    {
      "id": "P11",
      "name": "N20电机固定座",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#1d4ed8",
      "quantity": 1,
      "size": [
        24.0,
        20.0,
        16.0
      ],
      "note": "刚性锁紧在底部中置传动副底板上(X=-25.5, Y=+10, Z=30mm)，半圆鞍座贴合N20电机，杜绝电机悬空",
      "keyDimensions": [
        {
          "name": "中心距定位",
          "value": "22.50 mm",
          "note": "精确保证18齿主动轮与72齿主减速大齿轮啮合"
        }
      ],
      "features": [
        {
          "id": "P11-F01",
          "name": "N20电机固定座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -10.0,
          "w1": 10.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 16.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 12.2,
              "h": 10.2,
              "fillet": 1.0
            }
          ]
        },
        {
          "id": "P11-F02",
          "name": "N20电机固定座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": 9.12,
            "cy": 6.08,
            "w": 4.32,
            "h": 2.88,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P11-F03",
          "name": "N20电机固定座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": -9.12,
            "cy": -6.08,
            "w": 4.32,
            "h": 2.88,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-013",
      "solidworksName": "N20电机固定座",
      "solidworksFile": "N20电机固定座.SLDPRT",
      "drawingUrl": "docs/零件图册/P11.html",
      "featureCount": 3
    },
    {
      "id": "P12",
      "name": "N20电机抱箍压盖",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#3b82f6",
      "quantity": 1,
      "size": [
        24.0,
        20.0,
        6.0
      ],
      "note": "与N20电机固定座上下对合锁紧，4颗M3螺栓将电机刚性抱死在中置传动箱内",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "24.0 × 20.0 × 6.0 mm",
          "note": "上下分体式抱箍锁紧"
        }
      ],
      "features": [
        {
          "id": "P12-F01",
          "name": "N20电机抱箍压盖主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 20.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "P12-F02",
          "name": "N20电机抱箍压盖加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 7.68,
            "h": 6.4,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-014",
      "solidworksName": "N20电机抱箍压盖",
      "solidworksFile": "N20电机抱箍压盖.SLDPRT",
      "drawingUrl": "docs/零件图册/P12.html",
      "featureCount": 2
    },
    {
      "id": "M01",
      "name": "N20直流减速电机",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购标准件",
      "process": "成品微电机",
      "material": "金属齿轮箱+永磁直流电机",
      "color": "#64748b",
      "quantity": 1,
      "size": [
        12.0,
        36.0,
        10.0
      ],
      "note": "整车唯一动力源(单电机驱动)，输出轴直联18齿电机主动齿轮，驱动四轮全向分动链与三层凸轮转向发生器",
      "keyDimensions": [
        {
          "name": "机身包络",
          "value": "12.0 × 10.0 × 26.0 mm (轴长10mm)",
          "note": "额定6V高扭矩金属减速箱"
        }
      ],
      "features": [
        {
          "id": "M01-F01",
          "name": "N20电机主体",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -13.0,
          "w1": 13.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 12.0,
            "h": 10.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "M01-F02",
          "name": "N20输出轴",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 13.0,
          "w1": 23.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 1.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-015",
      "solidworksName": "N20直流减速电机",
      "solidworksFile": "N20直流减速电机.SLDPRT",
      "drawingUrl": "docs/零件图册/M01.html",
      "featureCount": 2
    },
    {
      "id": "G02",
      "name": "18齿电机主动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购/定制传动件",
      "process": "黄铜精密滚齿",
      "material": "H59黄铜",
      "color": "#f59e0b",
      "quantity": 1,
      "size": [
        10.0,
        6.0,
        10.0
      ],
      "note": "模数m=0.5，齿数z1=18，分度圆直径d1=9.0mm，直联N20电机输出轴",
      "keyDimensions": [
        {
          "name": "齿数 / 模数",
          "value": "z1 = 18, m = 0.5 mm",
          "note": "与72齿主减速大齿轮构成精确1:4减速"
        }
      ],
      "features": [
        {
          "id": "G02-F01",
          "name": "18齿电机主动齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 18
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "G02-F02",
          "name": "18齿电机主动齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-016",
      "solidworksName": "18齿电机主动齿轮",
      "solidworksFile": "18齿电机主动齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G02.html",
      "featureCount": 2
    },
    {
      "id": "G01",
      "name": "72齿主减速大齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购/定制传动件",
      "process": "POM赛钢精密滚齿",
      "material": "POM聚甲醛(赛钢)",
      "color": "#eab308",
      "quantity": 1,
      "size": [
        37.0,
        6.0,
        37.0
      ],
      "note": "模数m=0.5，齿数z2=72，分度圆直径d2=36.0mm，安装在底部横向主传动轴(X=-48,Y=+16,Z=30mm)，实现精确1:4主减速",
      "keyDimensions": [
        {
          "name": "传动比 / 中心距",
          "value": "i = 72/18 = 4.0 (精确1:4), a = 22.50 mm",
          "note": "配合过载保护摩擦离合器盘传递主扭矩"
        }
      ],
      "features": [
        {
          "id": "G01-F01",
          "name": "72齿主减速大齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 72
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 9.0,
              "cy": 0.0,
              "r": 3.0
            },
            {
              "shape": "circle",
              "cx": -9.0,
              "cy": 0.0,
              "r": 3.0
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 9.0,
              "r": 3.0
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -9.0,
              "r": 3.0
            }
          ]
        },
        {
          "id": "G01-F02",
          "name": "72齿主减速大齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 9.36
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-017",
      "solidworksName": "72齿主减速大齿轮",
      "solidworksFile": "72齿主减速大齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G01.html",
      "featureCount": 2
    },
    {
      "id": "P13",
      "name": "过载保护摩擦离合器盘",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "CNC车削+摩擦片",
      "material": "7075铝合金+碳纤摩擦垫",
      "color": "#d97706",
      "quantity": 1,
      "size": [
        20.0,
        5.0,
        20.0
      ],
      "note": "安装在底部横向主传动轴上紧贴72齿主减速大齿轮端面，由碟形弹簧压紧，当车轮受阻过载时打滑保护全车齿轮系",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ20.0 × 5.0 mm",
          "note": "设定打滑极限扭矩 0.35 N·m"
        }
      ],
      "features": [
        {
          "id": "P13-F01",
          "name": "过载保护摩擦离合器盘回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 10.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P13-F02",
          "name": "过载保护摩擦离合器盘端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.3,
          "w1": 3.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.62
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-018",
      "solidworksName": "过载保护摩擦离合器盘",
      "solidworksFile": "过载保护摩擦离合器盘.SLDPRT",
      "drawingUrl": "docs/零件图册/P13.html",
      "featureCount": 2
    },
    {
      "id": "SP2",
      "name": "离合器碟形压紧弹簧",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购标准件",
      "process": "弹簧钢冲压",
      "material": "65Mn弹簧钢",
      "color": "#a8a29e",
      "quantity": 1,
      "size": [
        15.0,
        5.0,
        15.0
      ],
      "note": "提供恒定轴向正压力将72齿主减速大齿轮压紧在过载保护摩擦离合器盘上",
      "keyDimensions": [
        {
          "name": "外径 × 自由长",
          "value": "Φ15.0 × 5.0 mm",
          "note": "可由锁紧环调节预紧力"
        }
      ],
      "features": [
        {
          "id": "SP2-F01",
          "name": "离合器碟形压紧弹簧回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.6
            }
          ]
        },
        {
          "id": "SP2-F02",
          "name": "离合器碟形压紧弹簧端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.3,
          "w1": 3.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.29
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.6
            }
          ]
        }
      ],
      "partNumber": "SC-019",
      "solidworksName": "离合器碟形压紧弹簧",
      "solidworksFile": "离合器碟形压紧弹簧.SLDPRT",
      "drawingUrl": "docs/零件图册/SP2.html",
      "featureCount": 2
    },
    {
      "id": "P14",
      "name": "底部横向主传动轴",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制传动件",
      "process": "精密磨削光轴",
      "material": "304不锈钢",
      "color": "#e2e8f0",
      "quantity": 1,
      "size": [
        5.0,
        52.0,
        5.0
      ],
      "note": "布置于中置齿轮箱内(X=-48, Y∈[-26,+26], Z=30mm)，集成72齿大齿轮、摩擦离合器、0.5模单头自锁蜗杆与中央分动齿轮",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 52.0 mm",
          "note": "完全处于中置窄体箱内，不外伸碰轮"
        }
      ],
      "features": [
        {
          "id": "P14-F01",
          "name": "底部横向主传动轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -26.0,
          "w1": 26.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P14-F02",
          "name": "底部横向主传动轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-020",
      "solidworksName": "底部横向主传动轴",
      "solidworksFile": "底部横向主传动轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P14.html",
      "featureCount": 2
    },
    {
      "id": "G08",
      "name": "24齿中央分动主动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购/定制传动件",
      "process": "45钢精密滚齿",
      "material": "45钢表面氮化",
      "color": "#f59e0b",
      "quantity": 1,
      "size": [
        13.0,
        5.0,
        13.0
      ],
      "note": "安装在底部横向主传动轴右侧，将1:4主减速后的扭矩传递至中央纵向贯通轴系",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z = 24",
          "note": "分度圆直径 12.0 mm"
        }
      ],
      "features": [
        {
          "id": "G08-F01",
          "name": "24齿中央分动主动齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 24
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G08-F02",
          "name": "24齿中央分动主动齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.7,
          "w1": 3.7,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-021",
      "solidworksName": "24齿中央分动主动齿轮",
      "solidworksFile": "24齿中央分动主动齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G08.html",
      "featureCount": 2
    },
    {
      "id": "G09",
      "name": "24齿中央分动从动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购/定制传动件",
      "process": "45钢精密滚齿",
      "material": "45钢表面氮化",
      "color": "#fbbf24",
      "quantity": 1,
      "size": [
        5.0,
        13.0,
        13.0
      ],
      "note": "安装在底部纵向贯通传动主轴中段，与24齿中央分动主动齿轮1:1啮合稳速传力",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z = 24",
          "note": "1:1等速分动"
        }
      ],
      "features": [
        {
          "id": "G09-F01",
          "name": "24齿中央分动从动齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "YZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 24
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G09-F02",
          "name": "24齿中央分动从动齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.7,
          "w1": 3.7,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-022",
      "solidworksName": "24齿中央分动从动齿轮",
      "solidworksFile": "24齿中央分动从动齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G09.html",
      "featureCount": 2
    },
    {
      "id": "P15",
      "name": "底部纵向贯通传动主轴",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制传动件",
      "process": "精密磨削光轴",
      "material": "304不锈钢",
      "color": "#cbd5e1",
      "quantity": 1,
      "size": [
        152.0,
        5.0,
        5.0
      ],
      "note": "沿中置传动副底板中心线(Y=0, Z=28mm, X∈[-76,+76]mm)纵向贯通，两端输入前/后桥十字正交分动箱壳",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 152.0 mm",
          "note": "由4座纵轴立式双轴承座支承"
        }
      ],
      "features": [
        {
          "id": "P15-F01",
          "name": "底部纵向贯通传动主轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -76.0,
          "w1": 76.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P15-F02",
          "name": "底部纵向贯通传动主轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-023",
      "solidworksName": "底部纵向贯通传动主轴",
      "solidworksFile": "底部纵向贯通传动主轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P15.html",
      "featureCount": 2
    },
    {
      "id": "P16",
      "name": "万向十字联轴器节",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购/自制传动件",
      "process": "精密车铣",
      "material": "304不锈钢",
      "color": "#94a3b8",
      "quantity": 2,
      "size": [
        14.0,
        11.0,
        11.0
      ],
      "note": "共2件串联在底部纵向贯通传动主轴前/后段(X=±36, Y=0, Z=28mm)，消除长轴装配微同轴度误差并便于拆装维护",
      "keyDimensions": [
        {
          "name": "外径 × 长度",
          "value": "Φ11.0 × 14.0 mm",
          "note": "零背隙刚性十字销联轴器"
        }
      ],
      "features": [
        {
          "id": "P16-F01",
          "name": "万向十字联轴器节回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -7.0,
          "w1": 7.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P16-F02",
          "name": "万向十字联轴器节端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -7.8,
          "w1": 7.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.15
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-024",
      "solidworksName": "万向十字联轴器节",
      "solidworksFile": "万向十字联轴器节.SLDPRT",
      "drawingUrl": "docs/零件图册/P16.html",
      "featureCount": 2
    },
    {
      "id": "P17",
      "name": "传动轴轴向限位锁紧环",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "外购标准件",
      "process": "车削加工",
      "material": "6061铝合金表面阳极黑",
      "color": "#1e293b",
      "quantity": 8,
      "size": [
        4.0,
        10.0,
        10.0
      ],
      "note": "共8件安装在横向主轴、纵向贯通轴与凸轮竖轴两端，带M3顶丝防止锥齿轮与蜗杆轴向窜动",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "Φ5.0内孔 × Φ10.0外径 × 4.0 mm",
          "note": "轴向间隙控制在≤0.03mm"
        }
      ],
      "features": [
        {
          "id": "P17-F01",
          "name": "传动轴轴向限位锁紧环回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P17-F02",
          "name": "传动轴轴向限位锁紧环端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -2.8,
          "w1": 2.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.88
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-025",
      "solidworksName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "drawingUrl": "docs/零件图册/P17.html",
      "featureCount": 2
    },
    {
      "id": "P18",
      "name": "齿轮箱透明防尘上盖",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制结构件",
      "process": "激光切割",
      "material": "高透亚克力PMMA",
      "color": "#38bdf8",
      "quantity": 1,
      "size": [
        92.0,
        52.0,
        2.5
      ],
      "note": "封装在中置齿轮箱上方(Z=43mm)，防止赛场灰尘进入1:4主减速齿轮与1:30蜗轮蜗杆副，同时支持透明观察啮合状态",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "92.0 × 52.0 × 2.5 mm",
          "note": "设凸轮竖轴过孔"
        }
      ],
      "features": [
        {
          "id": "P18-F01",
          "name": "齿轮箱透明防尘上盖主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.25,
          "w1": 1.25,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 92.0,
            "h": 52.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -34.0,
              "cy": 0.0,
              "r": 7.0
            }
          ]
        },
        {
          "id": "P18-F02",
          "name": "齿轮箱透明防尘上盖四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 1.25,
          "w1": 2.25,
          "shape": "rect",
          "params": {
            "cx": 34.96,
            "cy": 19.76,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P18-F03",
          "name": "齿轮箱透明防尘上盖对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 1.25,
          "w1": 2.25,
          "shape": "rect",
          "params": {
            "cx": -34.96,
            "cy": -19.76,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-026",
      "solidworksName": "齿轮箱透明防尘上盖",
      "solidworksFile": "齿轮箱透明防尘上盖.SLDPRT",
      "drawingUrl": "docs/零件图册/P18.html",
      "featureCount": 3
    },
    {
      "id": "P19",
      "name": "前桥十字正交分动箱壳",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制核心件",
      "process": "CNC五面精密铣削",
      "material": "6061-T6铝合金",
      "color": "#0284c7",
      "quantity": 1,
      "size": [
        32.0,
        36.0,
        20.0
      ],
      "note": "安装在中置传动副底板前端(X=+72, Y=0, Z=28mm)，内部容纳1只16齿主动锥齿轮与左右2只16齿从动锥齿轮，实现前桥左右90°正交分动",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "32.0 × 36.0 × 20.0 mm",
          "note": "位于Y∈[-18,+18]mm，完全处于两前轮内侧"
        }
      ],
      "features": [
        {
          "id": "P19-F01",
          "name": "前桥十字正交分动箱壳主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -10.0,
          "w1": 10.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 32.0,
            "h": 36.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 22.0,
              "h": 24.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P19-F02",
          "name": "前桥十字正交分动箱壳四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": 12.16,
            "cy": 13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P19-F03",
          "name": "前桥十字正交分动箱壳对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": -12.16,
            "cy": -13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-027",
      "solidworksName": "前桥十字正交分动箱壳",
      "solidworksFile": "前桥十字正交分动箱壳.SLDPRT",
      "drawingUrl": "docs/零件图册/P19.html",
      "featureCount": 3
    },
    {
      "id": "P20",
      "name": "后桥十字正交分动箱壳",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制核心件",
      "process": "CNC五面精密铣削",
      "material": "6061-T6铝合金",
      "color": "#0369a1",
      "quantity": 1,
      "size": [
        32.0,
        36.0,
        20.0
      ],
      "note": "安装在中置传动副底板后端(X=-72, Y=0, Z=28mm)，将纵向主轴动力90°正交分流至后桥左右同步带升距机构",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "32.0 × 36.0 × 20.0 mm",
          "note": "位于Y∈[-18,+18]mm，完全处于两后轮内侧"
        }
      ],
      "features": [
        {
          "id": "P20-F01",
          "name": "后桥十字正交分动箱壳主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -10.0,
          "w1": 10.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 32.0,
            "h": 36.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 22.0,
              "h": 24.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P20-F02",
          "name": "后桥十字正交分动箱壳四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": 12.16,
            "cy": 13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P20-F03",
          "name": "后桥十字正交分动箱壳对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 10.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": -12.16,
            "cy": -13.68,
            "w": 5.76,
            "h": 6.4799999999999995,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-028",
      "solidworksName": "后桥十字正交分动箱壳",
      "solidworksFile": "后桥十字正交分动箱壳.SLDPRT",
      "drawingUrl": "docs/零件图册/P20.html",
      "featureCount": 3
    },
    {
      "id": "P21",
      "name": "分动箱法兰端盖",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制结构件",
      "process": "CNC车削",
      "material": "6061-T6铝合金",
      "color": "#38bdf8",
      "quantity": 4,
      "size": [
        18.0,
        4.0,
        18.0
      ],
      "note": "共4件锁紧在前/后桥十字正交分动箱壳左右两侧端面(X=±72, Y=±18, Z=28mm)，精确调整锥齿轮啮合侧隙",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ18.0 × 4.0 mm",
          "note": "内嵌轴承支承分动输出轴"
        }
      ],
      "features": [
        {
          "id": "P21-F01",
          "name": "分动箱法兰端盖回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 9.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P21-F02",
          "name": "分动箱法兰端盖端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.8,
          "w1": 2.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.08
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-029",
      "solidworksName": "分动箱法兰端盖",
      "solidworksFile": "分动箱法兰端盖.SLDPRT",
      "drawingUrl": "docs/零件图册/P21.html",
      "featureCount": 2
    },
    {
      "id": "G06",
      "name": "16齿正交主动锥齿轮",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "外购/定制传动件",
      "process": "黄铜精密铣齿",
      "material": "H59黄铜",
      "color": "#d97706",
      "quantity": 6,
      "size": [
        5.0,
        9.0,
        9.0
      ],
      "note": "模数m=0.5，齿数z=16，分度圆锥角45°，用于纵向主轴两端(2只)及高架横向分动半轴外端(4只)",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 轴交角",
          "value": "m = 0.5 mm, z = 16, Σ = 90°",
          "note": "1:1正交转向传力"
        }
      ],
      "features": [
        {
          "id": "G06-F01",
          "name": "16齿正交主动锥齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "YZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 16
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G06-F02",
          "name": "16齿正交主动锥齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.7,
          "w1": 3.7,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-030",
      "solidworksName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G06.html",
      "featureCount": 2
    },
    {
      "id": "G10",
      "name": "16齿正交从动锥齿轮",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "外购/定制传动件",
      "process": "黄铜精密铣齿",
      "material": "H59黄铜",
      "color": "#f59e0b",
      "quantity": 6,
      "size": [
        9.0,
        9.0,
        5.0
      ],
      "note": "模数m=0.5，齿数z=16，与16齿正交主动锥齿轮90°配对啮合，安装于分动箱左右输出端(2只)与四角舵轮同轴中心传力竖轴顶端(4只)",
      "keyDimensions": [
        {
          "name": "配对关系",
          "value": "与G06构成90°正交1:1锥齿轮副",
          "note": "齿侧间隙0.04mm"
        }
      ],
      "features": [
        {
          "id": "G10-F01",
          "name": "16齿正交从动锥齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 16
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G10-F02",
          "name": "16齿正交从动锥齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.7,
          "w1": 3.7,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-031",
      "solidworksName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G10.html",
      "featureCount": 2
    },
    {
      "id": "P22",
      "name": "横向分动传动半轴",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制传动件",
      "process": "精密磨削",
      "material": "304不锈钢",
      "color": "#e2e8f0",
      "quantity": 4,
      "size": [
        5.0,
        38.0,
        5.0
      ],
      "note": "共4根高架布置于上层主底板上方(X=±72, Y=±39, Z=50mm)，从高架同步带轮横向延伸至四角全向舵轮主销正上方，完全处于车轮上方10mm处，绝不碰轮！",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 × 38.0 mm (高架高度 Z=50.0mm)",
          "note": "彻底跨越下部车轮360°转向空间"
        }
      ],
      "features": [
        {
          "id": "P22-F01",
          "name": "横向分动传动半轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -19.0,
          "w1": 19.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P22-F02",
          "name": "横向分动传动半轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-032",
      "solidworksName": "横向分动传动半轴",
      "solidworksFile": "横向分动传动半轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P22.html",
      "featureCount": 2
    },
    {
      "id": "P23",
      "name": "半轴高架转角齿轮箱座",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#0284c7",
      "quantity": 4,
      "size": [
        18.0,
        10.0,
        32.0
      ],
      "note": "共4座立于中置传动箱外侧边缘(X=±72, Y=±22, Z=39mm)，将下层分动箱动力(Z=28mm)垂直抬升22mm至上层横向分动传动半轴(Z=50mm)",
      "keyDimensions": [
        {
          "name": "上下轴心垂直跨距",
          "value": "22.0 mm (Z=28mm → Z=50mm)",
          "note": "高架跨桥设计的核心支座"
        }
      ],
      "features": [
        {
          "id": "P23-F01",
          "name": "半轴高架转角齿轮箱座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -5.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 18.0,
            "h": 32.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -11.0,
              "r": 4.0
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 11.0,
              "r": 4.0
            }
          ]
        },
        {
          "id": "P23-F02",
          "name": "半轴高架转角齿轮箱座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 5.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": 6.84,
            "cy": 12.16,
            "w": 3.2399999999999998,
            "h": 5.76,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P23-F03",
          "name": "半轴高架转角齿轮箱座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 5.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": -6.84,
            "cy": -12.16,
            "w": 3.2399999999999998,
            "h": 5.76,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-033",
      "solidworksName": "半轴高架转角齿轮箱座",
      "solidworksFile": "半轴高架转角齿轮箱座.SLDPRT",
      "drawingUrl": "docs/零件图册/P23.html",
      "featureCount": 3
    },
    {
      "id": "G11",
      "name": "20齿同步带轮",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "外购标准件",
      "process": "铝合金精车滚齿",
      "material": "6061铝合金",
      "color": "#cbd5e1",
      "quantity": 8,
      "size": [
        11.0,
        6.0,
        11.0
      ],
      "note": "共8只(下层分动箱输出4只 Z=28mm + 上层横向半轴内端4只 Z=50mm)，通过闭环同步带实现零滑移1:1跨层传力",
      "keyDimensions": [
        {
          "name": "齿数 / 节距",
          "value": "20齿 2GT同步带轮",
          "note": "1:1等速垂直升距传动"
        }
      ],
      "features": [
        {
          "id": "G11-F01",
          "name": "20齿同步带轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 20
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G11-F02",
          "name": "20齿同步带轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-034",
      "solidworksName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G11.html",
      "featureCount": 2
    },
    {
      "id": "P24",
      "name": "闭环橡胶同步齿形带",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "外购标准件",
      "process": "模具硫化成型",
      "material": "氯丁橡胶+玻纤芯线",
      "color": "#1e293b",
      "quantity": 4,
      "size": [
        14.0,
        5.0,
        34.0
      ],
      "note": "共4条连接上下层20齿同步带轮(X=±72, Y=±22, Z∈[28,50]mm)，将下层分动箱扭矩平稳提升至上层高架横向半轴",
      "keyDimensions": [
        {
          "name": "节线长 × 带宽",
          "value": "2GT-84mm × 宽5.0 mm",
          "note": "玻纤抗拉芯线零伸长"
        }
      ],
      "features": [
        {
          "id": "P24-F01",
          "name": "闭环橡胶同步齿形带主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 14.0,
            "h": 34.0,
            "fillet": 6.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 9.0,
              "h": 24.0,
              "fillet": 4.0
            }
          ]
        },
        {
          "id": "P24-F02",
          "name": "闭环橡胶同步齿形带四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 5.32,
            "cy": 12.92,
            "w": 2.52,
            "h": 6.12,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P24-F03",
          "name": "闭环橡胶同步齿形带对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": -5.32,
            "cy": -12.92,
            "w": 2.52,
            "h": 6.12,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-035",
      "solidworksName": "闭环橡胶同步齿形带",
      "solidworksFile": "闭环橡胶同步齿形带.SLDPRT",
      "drawingUrl": "docs/零件图册/P24.html",
      "featureCount": 3
    },
    {
      "id": "P25",
      "name": "同步带偏心张紧轮",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "category": "自制/标准件",
      "process": "精密车削",
      "material": "POM赛钢+微型轴承",
      "color": "#f59e0b",
      "quantity": 4,
      "size": [
        8.0,
        6.0,
        8.0
      ],
      "note": "共4件安装在半轴高架转角齿轮箱座中部(X=±64, Y=±22, Z=39mm)，通过偏心套调节4条闭环橡胶同步齿形带张紧力",
      "keyDimensions": [
        {
          "name": "外径 × 宽度",
          "value": "Φ8.0 × 6.0 mm",
          "note": "偏心量1.5mm无级张紧"
        }
      ],
      "features": [
        {
          "id": "P25-F01",
          "name": "同步带偏心张紧轮回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "P25-F02",
          "name": "同步带偏心张紧轮端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.8,
          "w1": 3.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.88
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-036",
      "solidworksName": "同步带偏心张紧轮",
      "solidworksFile": "同步带偏心张紧轮.SLDPRT",
      "drawingUrl": "docs/零件图册/P25.html",
      "featureCount": 2
    },
    {
      "id": "P26",
      "name": "全向舵轮主销轴承座",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "CNC铝合金精密镗孔",
      "material": "6061-T6铝合金",
      "color": "#2563eb",
      "quantity": 4,
      "size": [
        28.0,
        28.0,
        16.0
      ],
      "note": "四角对称锁紧在铝合金主底板(X=±72, Y=±58, Z=46mm)，内嵌上下双6700ZZ薄壁转向轴承，支承4套全向舵轮360°无死角回转",
      "keyDimensions": [
        {
          "name": "轴承室孔径",
          "value": "Φ15.0 H7 mm",
          "note": "安装坐标 X=±72.0, Y=±58.0, Z=46.0 mm"
        }
      ],
      "features": [
        {
          "id": "P26-F01",
          "name": "全向舵轮主销轴承座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -8.0,
          "w1": 8.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 28.0,
            "h": 28.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 7.5
            }
          ]
        },
        {
          "id": "P26-F02",
          "name": "全向舵轮主销轴承座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 8.0,
          "w1": 9.0,
          "shape": "rect",
          "params": {
            "cx": 10.64,
            "cy": 10.64,
            "w": 5.04,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P26-F03",
          "name": "全向舵轮主销轴承座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 8.0,
          "w1": 9.0,
          "shape": "rect",
          "params": {
            "cx": -10.64,
            "cy": -10.64,
            "w": 5.04,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-037",
      "solidworksName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P26.html",
      "featureCount": 3
    },
    {
      "id": "B03",
      "name": "6700ZZ薄壁转向轴承",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "外购标准件",
      "process": "轴承钢标准件",
      "material": "GCr15轴承钢",
      "color": "#cbd5e1",
      "quantity": 8,
      "size": [
        15.0,
        15.0,
        4.0
      ],
      "note": "Φ10×Φ15×4mm薄壁深沟球轴承，每座全向舵轮主销轴承座内安装2只(共8只)，大内孔支承全向转向空心主销套筒",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "Φ10.0 × Φ15.0 × 4.0 mm",
          "note": "薄壁高刚度转向主销轴承"
        }
      ],
      "features": [
        {
          "id": "B03-F01",
          "name": "6700ZZ薄壁转向轴承回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        },
        {
          "id": "B03-F02",
          "name": "6700ZZ薄壁转向轴承端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.8,
          "w1": 2.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.38
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        }
      ],
      "partNumber": "SC-038",
      "solidworksName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B03.html",
      "featureCount": 2
    },
    {
      "id": "P27",
      "name": "全向转向空心主销套筒",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "数控精密车削",
      "material": "304不锈钢",
      "color": "#38bdf8",
      "quantity": 4,
      "size": [
        10.0,
        10.0,
        26.0
      ],
      "note": "外径Φ10mm配合6700ZZ薄壁转向轴承，内孔Φ5.2mm供『舵轮同轴中心传力竖轴』无接触穿过，下端连接全向舵轮U型转向叉架，上端锁紧舵轮同步转向扇形齿轮摇臂",
      "keyDimensions": [
        {
          "name": "外径 × 内孔 × 长度",
          "value": "Φ10.0 g6 × Φ5.2 × 26.0 mm",
          "note": "实现转向与驱动同轴解耦的核心套筒"
        }
      ],
      "features": [
        {
          "id": "P27-F01",
          "name": "全向转向空心主销套筒回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -13.0,
          "w1": 13.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.6
            }
          ]
        },
        {
          "id": "P27-F02",
          "name": "全向转向空心主销套筒端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -13.8,
          "w1": 13.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.92
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.6
            }
          ]
        }
      ],
      "partNumber": "SC-039",
      "solidworksName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "drawingUrl": "docs/零件图册/P27.html",
      "featureCount": 2
    },
    {
      "id": "P28",
      "name": "舵轮同轴中心传力竖轴",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "精密磨削",
      "material": "304不锈钢",
      "color": "#f8fafc",
      "quantity": 4,
      "size": [
        4.0,
        4.0,
        36.0
      ],
      "note": "同轴穿过全向转向空心主销套筒中心(X=±72, Y=±58, Z∈[20,56]mm)，顶端锥齿轮接收上层横向分动传动半轴扭矩，底端锥齿轮驱动20齿舵轮轮边锥齿圈",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ4.0 g6 × 36.0 mm",
          "note": "车轮任意360°转向时动力同轴恒定传输"
        }
      ],
      "features": [
        {
          "id": "P28-F01",
          "name": "舵轮同轴中心传力竖轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -18.0,
          "w1": 18.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.0
          },
          "holes": []
        },
        {
          "id": "P28-F02",
          "name": "舵轮同轴中心传力竖轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.56
          },
          "holes": []
        }
      ],
      "partNumber": "SC-040",
      "solidworksName": "舵轮同轴中心传力竖轴",
      "solidworksFile": "舵轮同轴中心传力竖轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P28.html",
      "featureCount": 2
    },
    {
      "id": "B05",
      "name": "主销内孔推力球轴承",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "外购标准件",
      "process": "轴承钢标准件",
      "material": "GCr15轴承钢",
      "color": "#94a3b8",
      "quantity": 4,
      "size": [
        12.0,
        12.0,
        4.0
      ],
      "note": "安装在全向舵轮U型转向叉架顶部台阶与主销轴承座下端面之间(Z=36mm)，承受整车重力载荷使360°全向转向轻盈顺滑",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "Φ10.0 × Φ14.0 × 4.0 mm",
          "note": "轴向推力球轴承"
        }
      ],
      "features": [
        {
          "id": "B05-F01",
          "name": "主销内孔推力球轴承回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 4.0
            }
          ]
        },
        {
          "id": "B05-F02",
          "name": "主销内孔推力球轴承端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.8,
          "w1": 2.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.1
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 4.0
            }
          ]
        }
      ],
      "partNumber": "SC-041",
      "solidworksName": "主销内孔推力球轴承",
      "solidworksFile": "主销内孔推力球轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B05.html",
      "featureCount": 2
    },
    {
      "id": "P29",
      "name": "全向舵轮U型转向叉架",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "CNC铝合金五轴铣削",
      "material": "6061-T6铝合金",
      "color": "#0284c7",
      "quantity": 4,
      "size": [
        26.0,
        24.0,
        22.0
      ],
      "note": "共4件悬挂在四角空心主销套筒下端(X=±72, Y=±58, Z=25mm)，随主销360°同步旋转，下部支承舵轮精密固定横轴与高抓地全向舵轮",
      "keyDimensions": [
        {
          "name": "U型叉内宽 × 高度",
          "value": "16.0 × 22.0 mm",
          "note": "上部与主底板留有足够间隙，四周无任何基板阻挡"
        }
      ],
      "features": [
        {
          "id": "P29-F01",
          "name": "全向舵轮U型转向叉架主体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -13.0,
          "w1": 13.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 22.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": -3.0,
              "w": 16.0,
              "h": 16.0,
              "fillet": 1.0
            }
          ]
        },
        {
          "id": "P29-F02",
          "name": "全向舵轮U型转向叉架四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 13.0,
          "w1": 14.0,
          "shape": "rect",
          "params": {
            "cx": 9.12,
            "cy": 8.36,
            "w": 4.32,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P29-F03",
          "name": "全向舵轮U型转向叉架对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 13.0,
          "w1": 14.0,
          "shape": "rect",
          "params": {
            "cx": -9.12,
            "cy": -8.36,
            "w": 4.32,
            "h": 3.96,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-042",
      "solidworksName": "全向舵轮U型转向叉架",
      "solidworksFile": "全向舵轮U型转向叉架.SLDPRT",
      "drawingUrl": "docs/零件图册/P29.html",
      "featureCount": 3
    },
    {
      "id": "P30",
      "name": "舵轮侧置锥齿轮减速盒",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#0369a1",
      "quantity": 4,
      "size": [
        14.0,
        8.0,
        18.0
      ],
      "note": "安装在全向舵轮U型转向叉架内侧臂上(Z=22mm)，保护同轴传力竖轴底端锥齿轮与20齿舵轮轮边锥齿圈的正交啮合副",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "14.0 × 8.0 × 18.0 mm",
          "note": "随转向叉架一体回转"
        }
      ],
      "features": [
        {
          "id": "P30-F01",
          "name": "舵轮侧置锥齿轮减速盒主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 14.0,
            "h": 18.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "P30-F02",
          "name": "舵轮侧置锥齿轮减速盒加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 4.0,
          "w1": 5.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 4.48,
            "h": 5.76,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-043",
      "solidworksName": "舵轮侧置锥齿轮减速盒",
      "solidworksFile": "舵轮侧置锥齿轮减速盒.SLDPRT",
      "drawingUrl": "docs/零件图册/P30.html",
      "featureCount": 2
    },
    {
      "id": "G07",
      "name": "20齿舵轮轮边锥齿圈",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "外购/定制传动件",
      "process": "黄铜精密铣齿",
      "material": "H59黄铜",
      "color": "#f59e0b",
      "quantity": 4,
      "size": [
        11.0,
        4.0,
        11.0
      ],
      "note": "固连在高抓地全向舵轮铝合金轮毂内侧端面(Z=20mm)，与舵轮同轴中心传力竖轴下端锥齿轮正交啮合驱动车轮",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z = 20",
          "note": "轮边终传比 20:16 = 1.25"
        }
      ],
      "features": [
        {
          "id": "G07-F01",
          "name": "20齿舵轮轮边锥齿圈渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XZ",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 20
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G07-F02",
          "name": "20齿舵轮轮边锥齿圈中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.2,
          "w1": 3.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-044",
      "solidworksName": "20齿舵轮轮边锥齿圈",
      "solidworksFile": "20齿舵轮轮边锥齿圈.SLDPRT",
      "drawingUrl": "docs/零件图册/G07.html",
      "featureCount": 2
    },
    {
      "id": "P31",
      "name": "舵轮精密固定横轴",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制传动件",
      "process": "精密磨削",
      "material": "304不锈钢",
      "color": "#cbd5e1",
      "quantity": 4,
      "size": [
        5.0,
        24.0,
        5.0
      ],
      "note": "穿入4件全向舵轮U型转向叉架下部轴孔(X=±72, Y=±58, Z=20mm)，通过内部625ZZ轴承支承高抓地全向舵轮旋转",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 24.0 mm",
          "note": "轮心离地高 Z = 20.0 mm"
        }
      ],
      "features": [
        {
          "id": "P31-F01",
          "name": "舵轮精密固定横轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -12.0,
          "w1": 12.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P31-F02",
          "name": "舵轮精密固定横轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-045",
      "solidworksName": "舵轮精密固定横轴",
      "solidworksFile": "舵轮精密固定横轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P31.html",
      "featureCount": 2
    },
    {
      "id": "P32",
      "name": "高抓地全向舵轮铝合金轮毂",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制核心件",
      "process": "CNC铝合金车铣复合",
      "material": "6061-T6铝合金",
      "color": "#64748b",
      "quantity": 4,
      "size": [
        32.0,
        9.0,
        32.0
      ],
      "note": "Φ32×9mm高刚度CNC轻量化轮毂，内嵌625ZZ轴承，外圈套装高抓地全向舵轮防滑橡胶胎，侧面锁紧20齿舵轮轮边锥齿圈",
      "keyDimensions": [
        {
          "name": "外径 × 宽度",
          "value": "Φ32.0 × 9.0 mm",
          "note": "6孔轻量化辐条设计"
        }
      ],
      "features": [
        {
          "id": "P32-F01",
          "name": "高抓地全向舵轮铝合金轮毂回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -4.5,
          "w1": 4.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 16.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P32-F02",
          "name": "高抓地全向舵轮铝合金轮毂端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -5.3,
          "w1": 5.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 9.93
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-046",
      "solidworksName": "高抓地全向舵轮铝合金轮毂",
      "solidworksFile": "高抓地全向舵轮铝合金轮毂.SLDPRT",
      "drawingUrl": "docs/零件图册/P32.html",
      "featureCount": 2
    },
    {
      "id": "W01",
      "name": "高抓地全向舵轮防滑橡胶胎",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制/标准轮组",
      "process": "模具精密成型",
      "material": "高摩擦硅胶实心胎(邵氏60A)",
      "color": "#1e293b",
      "quantity": 4,
      "size": [
        40.0,
        10.0,
        40.0
      ],
      "note": "Φ40×10mm实心防滑橡胶胎（绝不使用麦克纳姆轮！），依靠四轮独立同轴转向舵轮实现零打滑全向平移、蟹行、斜行与原地回转",
      "keyDimensions": [
        {
          "name": "外径 D × 胎宽 B",
          "value": "Φ40.0 × 10.0 mm (内径Φ32.0mm)",
          "note": "四周净空充足，与底部中置传动副底板相距≥10mm零干涉"
        }
      ],
      "features": [
        {
          "id": "W01-F01",
          "name": "高抓地全向舵轮防滑橡胶胎回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -5.0,
          "w1": 5.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 20.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 15.75
            }
          ]
        },
        {
          "id": "W01-F02",
          "name": "高抓地全向舵轮防滑橡胶胎端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -5.8,
          "w1": 5.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 18.09
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 15.75
            }
          ]
        }
      ],
      "partNumber": "SC-047",
      "solidworksName": "高抓地全向舵轮防滑橡胶胎",
      "solidworksFile": "高抓地全向舵轮防滑橡胶胎.SLDPRT",
      "drawingUrl": "docs/零件图册/W01.html",
      "featureCount": 2
    },
    {
      "id": "P33",
      "name": "舵轮端面锁紧法兰盖",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制结构件",
      "process": "CNC车削阳极红",
      "material": "6061铝合金",
      "color": "#ef4444",
      "quantity": 4,
      "size": [
        14.0,
        2.5,
        14.0
      ],
      "note": "锁紧在4只高抓地全向舵轮外侧端面，轴向压紧轮毂轴承防止全向横移时车轮脱出",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ14.0 × 2.5 mm",
          "note": "中心M3锁紧螺钉"
        }
      ],
      "features": [
        {
          "id": "P33-F01",
          "name": "舵轮端面锁紧法兰盖回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -1.25,
          "w1": 1.25,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "P33-F02",
          "name": "舵轮端面锁紧法兰盖端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -2.05,
          "w1": 2.05,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.53
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-048",
      "solidworksName": "舵轮端面锁紧法兰盖",
      "solidworksFile": "舵轮端面锁紧法兰盖.SLDPRT",
      "drawingUrl": "docs/零件图册/P33.html",
      "featureCount": 2
    },
    {
      "id": "G03",
      "name": "0.5模单头自锁蜗杆",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "外购/定制传动件",
      "process": "黄铜精密车削",
      "material": "H59黄铜",
      "color": "#d97706",
      "quantity": 1,
      "size": [
        11.0,
        18.0,
        11.0
      ],
      "note": "锁紧在底部横向主传动轴中段(X=-48, Y=0, Z=30mm)，驱动30齿青铜蜗轮实现1:30转向时基减速与反向自锁",
      "keyDimensions": [
        {
          "name": "模数 / 头数 / 分度圆",
          "value": "m = 0.5 mm, z1 = 1, d1 = 11.0 mm",
          "note": "螺旋升角2.6°，具备可靠反向自锁能力"
        }
      ],
      "features": [
        {
          "id": "G03-F01",
          "name": "0.5模单头自锁蜗杆回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -9.0,
          "w1": 9.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G03-F02",
          "name": "0.5模单头自锁蜗杆端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -9.8,
          "w1": 9.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.15
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-049",
      "solidworksName": "0.5模单头自锁蜗杆",
      "solidworksFile": "0.5模单头自锁蜗杆.SLDPRT",
      "drawingUrl": "docs/零件图册/G03.html",
      "featureCount": 2
    },
    {
      "id": "G04",
      "name": "30齿青铜蜗轮",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "外购/定制传动件",
      "process": "锡青铜精密滚齿",
      "material": "QSn6.5-0.1锡青铜",
      "color": "#b45309",
      "quantity": 1,
      "size": [
        16.0,
        16.0,
        6.0
      ],
      "note": "锁紧在双凸轮同轴传力竖轴下端(X=-34, Y=0, Z=30mm)，与0.5模单头自锁蜗杆构成1:30减速，驱动三层共轭凸轮组",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 传动比",
          "value": "m = 0.5 mm, z2 = 30, i = 1:30",
          "note": "中心距 a = 13.0~14.0 mm"
        }
      ],
      "features": [
        {
          "id": "G04-F01",
          "name": "30齿青铜蜗轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 30
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G04-F02",
          "name": "30齿青铜蜗轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.9
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-050",
      "solidworksName": "30齿青铜蜗轮",
      "solidworksFile": "30齿青铜蜗轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G04.html",
      "featureCount": 2
    },
    {
      "id": "P34",
      "name": "双凸轮同轴传力竖轴",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制传动件",
      "process": "精密磨削",
      "material": "304不锈钢",
      "color": "#cbd5e1",
      "quantity": 1,
      "size": [
        5.0,
        5.0,
        52.0
      ],
      "note": "垂直布置于(X=-34, Y=0, Z∈[22,74]mm)，同轴串联30齿青铜蜗轮、横向蟹行偏置凸轮盘(C03)、凸轮相位微调分度盘(P36)、差动相位共轭副凸轮盘(C02)与主航向五次多项式转向凸轮(C01)",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 52.0 mm",
          "note": "三凸轮同轴同步时基基准轴"
        }
      ],
      "features": [
        {
          "id": "P34-F01",
          "name": "双凸轮同轴传力竖轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -26.0,
          "w1": 26.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P34-F02",
          "name": "双凸轮同轴传力竖轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-051",
      "solidworksName": "双凸轮同轴传力竖轴",
      "solidworksFile": "双凸轮同轴传力竖轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P34.html",
      "featureCount": 2
    },
    {
      "id": "P35",
      "name": "凸轮轴立式双轴承座",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制结构件",
      "process": "CNC铝合金镗孔",
      "material": "6061-T6铝合金",
      "color": "#3b82f6",
      "quantity": 1,
      "size": [
        28.0,
        28.0,
        16.0
      ],
      "note": "锁紧在铝合金主底板(X=-34, Y=0, Z=46mm)，内置上下双625ZZ深沟球轴承承受三层凸轮径向推力",
      "keyDimensions": [
        {
          "name": "轴承孔径",
          "value": "Φ16.0 H7 mm",
          "note": "高刚度抗倾覆法兰座"
        }
      ],
      "features": [
        {
          "id": "P35-F01",
          "name": "凸轮轴立式双轴承座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -8.0,
          "w1": 8.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 28.0,
            "h": 28.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 8.0
            }
          ]
        },
        {
          "id": "P35-F02",
          "name": "凸轮轴立式双轴承座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 8.0,
          "w1": 9.0,
          "shape": "rect",
          "params": {
            "cx": 10.64,
            "cy": 10.64,
            "w": 5.04,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P35-F03",
          "name": "凸轮轴立式双轴承座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 8.0,
          "w1": 9.0,
          "shape": "rect",
          "params": {
            "cx": -10.64,
            "cy": -10.64,
            "w": 5.04,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-052",
      "solidworksName": "凸轮轴立式双轴承座",
      "solidworksFile": "凸轮轴立式双轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P35.html",
      "featureCount": 3
    },
    {
      "id": "C01",
      "name": "主航向五次多项式转向凸轮",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC五轴精密铣削",
      "material": "7075-T6航空铝合金",
      "color": "#ef4444",
      "quantity": 1,
      "size": [
        46.4,
        46.4,
        4.5
      ],
      "note": "上层主凸轮(Z=62mm)，采用五次多项式无冲击廓线 s1(u)=h1(10u³-15u⁴+6u⁵)，基圆r0=18mm，升程h1=±5.2mm，控制前桥全向舵轮主航向偏角",
      "keyDimensions": [
        {
          "name": "基圆 r0 / 升程 h1",
          "value": "r0 = 18.0 mm, h1 = ±5.20 mm",
          "note": "最大压力角 25.4° < 30°"
        },
        {
          "name": "数学方程",
          "value": "s1(u) = h1(10u³ - 15u⁴ + 6u⁵)",
          "note": "起止速度/加速度均为0"
        }
      ],
      "features": [
        {
          "id": "C01-F01",
          "name": "主航向五次多项式转向凸轮五次多项式廓线拉伸",
          "type": "凸轮曲线拉伸",
          "plane": "XY",
          "w0": -2.25,
          "w1": 2.25,
          "shape": "cam",
          "params": {
            "base_r": 18.0,
            "stroke": 5.2
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 7.5,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": -7.5,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "C01-F02",
          "name": "主航向五次多项式转向凸轮双面精密锁紧法兰毂",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.75,
          "w1": 3.75,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-053",
      "solidworksName": "主航向五次多项式转向凸轮",
      "solidworksFile": "主航向五次多项式转向凸轮.SLDPRT",
      "drawingUrl": "docs/零件图册/C01.html",
      "featureCount": 2
    },
    {
      "id": "C02",
      "name": "差动相位共轭副凸轮盘",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC五轴精密铣削",
      "material": "7075-T6航空铝合金",
      "color": "#f97316",
      "quantity": 1,
      "size": [
        40.0,
        40.0,
        4.5
      ],
      "note": "中层差动副凸轮(Z=55mm)，采用共轭五次多项式廓线 s2(θ)，独立驱动后桥差动转向副推杆，实现前后轮反向全向急转(δF=-δR)或阿克曼轨迹",
      "keyDimensions": [
        {
          "name": "基圆 r0 / 升程 h2",
          "value": "r0 = 16.0 mm, h2 = ±4.00 mm",
          "note": "控制后桥相对前桥的转向相位差"
        }
      ],
      "features": [
        {
          "id": "C02-F01",
          "name": "差动相位共轭副凸轮盘五次多项式廓线拉伸",
          "type": "凸轮曲线拉伸",
          "plane": "XY",
          "w0": -2.25,
          "w1": 2.25,
          "shape": "cam",
          "params": {
            "base_r": 16.0,
            "stroke": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 7.5,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": -7.5,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "C02-F02",
          "name": "差动相位共轭副凸轮盘双面精密锁紧法兰毂",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.75,
          "w1": 3.75,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-054",
      "solidworksName": "差动相位共轭副凸轮盘",
      "solidworksFile": "差动相位共轭副凸轮盘.SLDPRT",
      "drawingUrl": "docs/零件图册/C02.html",
      "featureCount": 2
    },
    {
      "id": "C03",
      "name": "横向蟹行偏置凸轮盘",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC五轴精密铣削",
      "material": "7075-T6航空铝合金",
      "color": "#eab308",
      "quantity": 1,
      "size": [
        37.0,
        37.0,
        4.0
      ],
      "note": "下层蟹行专用凸轮盘(Z=37mm)，专用于全向蟹行横移阶段提供前后桥1:1同向等幅推程補償，使四轮严格平行斜行",
      "keyDimensions": [
        {
          "name": "基圆 r0 / 升程 h3",
          "value": "r0 = 15.0 mm, h3 = ±3.50 mm",
          "note": "四轮同向蟹行平移专用时基凸轮"
        }
      ],
      "features": [
        {
          "id": "C03-F01",
          "name": "横向蟹行偏置凸轮盘五次多项式廓线拉伸",
          "type": "凸轮曲线拉伸",
          "plane": "XY",
          "w0": -2.0,
          "w1": 2.0,
          "shape": "cam",
          "params": {
            "base_r": 15.0,
            "stroke": 3.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 7.5,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": -7.5,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "C03-F02",
          "name": "横向蟹行偏置凸轮盘双面精密锁紧法兰毂",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.5,
          "w1": 3.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-055",
      "solidworksName": "横向蟹行偏置凸轮盘",
      "solidworksFile": "横向蟹行偏置凸轮盘.SLDPRT",
      "drawingUrl": "docs/零件图册/C03.html",
      "featureCount": 2
    },
    {
      "id": "P36",
      "name": "凸轮相位微调分度盘",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC精密钻铣",
      "material": "7075铝合金阳极金",
      "color": "#facc15",
      "quantity": 1,
      "size": [
        24.0,
        24.0,
        3.0
      ],
      "note": "安装在主航向凸轮C01与差动副凸轮C02之间(Z=58.5mm)，圆周均布12组游标分度孔，支持以2.5°步进快速微调前后桥转向凸轮相位差",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ24.0 × 3.0 mm",
          "note": "12孔游标分度锁紧结构"
        }
      ],
      "features": [
        {
          "id": "P36-F01",
          "name": "凸轮相位微调分度盘回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 12.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P36-F02",
          "name": "凸轮相位微调分度盘端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.3,
          "w1": 2.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.73
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-056",
      "solidworksName": "凸轮相位微调分度盘",
      "solidworksFile": "凸轮相位微调分度盘.SLDPRT",
      "drawingUrl": "docs/零件图册/P36.html",
      "featureCount": 2
    },
    {
      "id": "B02",
      "name": "MR84ZZ凸轮滚子轴承",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "外购标准件",
      "process": "轴承钢标准件",
      "material": "GCr15轴承钢",
      "color": "#94a3b8",
      "quantity": 4,
      "size": [
        8.0,
        8.0,
        3.0
      ],
      "note": "共4只(Φ8×Φ4×3mm)，成对安装在主航向滚子推杆滑架与差动副凸轮滚子推杆滑架上，双侧共轭夹持凸轮轮廓实现零回差纯滚动从动",
      "keyDimensions": [
        {
          "name": "外径 D × 内径 d × 宽 B",
          "value": "Φ8.0 × Φ4.0 × 3.0 mm",
          "note": "滚子半径 rr = 4.0 mm"
        }
      ],
      "features": [
        {
          "id": "B02-F01",
          "name": "MR84ZZ凸轮滚子轴承回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.0
            }
          ]
        },
        {
          "id": "B02-F02",
          "name": "MR84ZZ凸轮滚子轴承端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.3,
          "w1": 2.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.1
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.0
            }
          ]
        }
      ],
      "partNumber": "SC-057",
      "solidworksName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B02.html",
      "featureCount": 2
    },
    {
      "id": "P37",
      "name": "主航向滚子推杆滑架",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC铝合金线切割",
      "material": "7075-T6铝合金",
      "color": "#10b981",
      "quantity": 1,
      "size": [
        48.0,
        32.0,
        6.0
      ],
      "note": "环抱上层主航向五次多项式转向凸轮(C01)的双滚子共轭框式滑架(Z=62mm)，前后端各装1只MR84ZZ凸轮滚子轴承，正反向均由几何锁合+弹簧双重驱动",
      "keyDimensions": [
        {
          "name": "内框跨距",
          "value": "38.0 × 22.0 mm",
          "note": "前后双滚子共轭几何锁合"
        }
      ],
      "features": [
        {
          "id": "P37-F01",
          "name": "主航向滚子推杆滑架主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 48.0,
            "h": 32.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 36.0,
              "h": 20.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P37-F02",
          "name": "主航向滚子推杆滑架四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 18.24,
            "cy": 12.16,
            "w": 8.0,
            "h": 5.76,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P37-F03",
          "name": "主航向滚子推杆滑架对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -18.24,
            "cy": -12.16,
            "w": 8.0,
            "h": 5.76,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-058",
      "solidworksName": "主航向滚子推杆滑架",
      "solidworksFile": "主航向滚子推杆滑架.SLDPRT",
      "drawingUrl": "docs/零件图册/P37.html",
      "featureCount": 3
    },
    {
      "id": "P38",
      "name": "差动副凸轮滚子推杆滑架",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC铝合金线切割",
      "material": "7075-T6铝合金",
      "color": "#34d399",
      "quantity": 1,
      "size": [
        44.0,
        28.0,
        6.0
      ],
      "note": "环抱中层差动相位共轭副凸轮盘(C02)的双滚子从动滑架(Z=55mm)，将副凸轮位移精准输出至后桥差动转向副推杆",
      "keyDimensions": [
        {
          "name": "内框跨距",
          "value": "34.0 × 18.0 mm",
          "note": "独立控制后桥全向转向角"
        }
      ],
      "features": [
        {
          "id": "P38-F01",
          "name": "差动副凸轮滚子推杆滑架主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 44.0,
            "h": 28.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 32.0,
              "h": 16.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P38-F02",
          "name": "差动副凸轮滚子推杆滑架四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 16.72,
            "cy": 10.64,
            "w": 7.92,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P38-F03",
          "name": "差动副凸轮滚子推杆滑架对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -16.72,
            "cy": -10.64,
            "w": 7.92,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-059",
      "solidworksName": "差动副凸轮滚子推杆滑架",
      "solidworksFile": "差动副凸轮滚子推杆滑架.SLDPRT",
      "drawingUrl": "docs/零件图册/P38.html",
      "featureCount": 3
    },
    {
      "id": "SP1",
      "name": "推杆复位圆柱弹簧",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "外购标准件",
      "process": "弹簧钢绕制",
      "material": "65Mn弹簧钢",
      "color": "#a8a29e",
      "quantity": 4,
      "size": [
        18.0,
        10.0,
        10.0
      ],
      "note": "共4件套设在前后转向推杆导轨段，消除连杆铰接微间隙并提供凸轮贴合预紧力",
      "keyDimensions": [
        {
          "name": "外径 × 自由长",
          "value": "Φ10.0 × 18.0 mm",
          "note": "线径0.8mm精密压缩弹簧"
        }
      ],
      "features": [
        {
          "id": "SP1-F01",
          "name": "推杆复位圆柱弹簧回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -9.0,
          "w1": 9.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 3.5
            }
          ]
        },
        {
          "id": "SP1-F02",
          "name": "推杆复位圆柱弹簧轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.4
          },
          "holes": []
        }
      ],
      "partNumber": "SC-060",
      "solidworksName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "drawingUrl": "docs/零件图册/SP1.html",
      "featureCount": 2
    },
    {
      "id": "P39",
      "name": "纵向同步转向主推杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#10b981",
      "quantity": 1,
      "size": [
        92.0,
        7.0,
        5.0
      ],
      "note": "沿上层主底板中线(X∈[-12,+80], Y=0, Z=62mm)往复移动，连接主航向滚子推杆滑架与前桥转向钟形转换摇臂",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "92.0 × 7.0 × 5.0 mm",
          "note": "行程 ±5.20 mm"
        }
      ],
      "features": [
        {
          "id": "P39-F01",
          "name": "纵向同步转向主推杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 92.0,
            "h": 7.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "P39-F02",
          "name": "纵向同步转向主推杆加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 29.44,
            "h": 4.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-061",
      "solidworksName": "纵向同步转向主推杆",
      "solidworksFile": "纵向同步转向主推杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P39.html",
      "featureCount": 2
    },
    {
      "id": "P40",
      "name": "后桥差动转向副推杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#34d399",
      "quantity": 1,
      "size": [
        54.0,
        7.0,
        5.0
      ],
      "note": "沿上层主底板后段中线(X∈[-84,-30], Y=0, Z=55mm)移动，连接差动副凸轮滚子推杆滑架、全向运动模式三挡切换器与后桥转向钟形转换摇臂",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "54.0 × 7.0 × 5.0 mm",
          "note": "行程 ±4.00~±5.20 mm"
        }
      ],
      "features": [
        {
          "id": "P40-F01",
          "name": "后桥差动转向副推杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 54.0,
            "h": 7.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "P40-F02",
          "name": "后桥差动转向副推杆加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 17.28,
            "h": 4.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-062",
      "solidworksName": "后桥差动转向副推杆",
      "solidworksFile": "后桥差动转向副推杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P40.html",
      "featureCount": 2
    },
    {
      "id": "P41",
      "name": "转向推杆直线导轨座",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制结构件",
      "process": "CNC加工",
      "material": "POM聚甲醛(自润滑)",
      "color": "#059669",
      "quantity": 4,
      "size": [
        12.0,
        20.0,
        18.0
      ],
      "note": "共4座沿车体纵向中心线(X=-60/-8/+16/+46, Y=0, Z=55mm)安装，约束主推杆与后差动副推杆严格沿X轴作无偏摆直线运动",
      "keyDimensions": [
        {
          "name": "导向孔精度",
          "value": "7.1 × 5.1 H7 mm",
          "note": "POM自润滑直线滑座"
        }
      ],
      "features": [
        {
          "id": "P41-F01",
          "name": "转向推杆直线导轨座主体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -6.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 20.0,
            "h": 18.0,
            "fillet": 2.5
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 2.0,
              "w": 7.4,
              "h": 5.4,
              "fillet": 0.5
            }
          ]
        },
        {
          "id": "P41-F02",
          "name": "转向推杆直线导轨座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 6.0,
          "w1": 7.0,
          "shape": "rect",
          "params": {
            "cx": 7.6,
            "cy": 6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P41-F03",
          "name": "转向推杆直线导轨座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 6.0,
          "w1": 7.0,
          "shape": "rect",
          "params": {
            "cx": -7.6,
            "cy": -6.84,
            "w": 3.5999999999999996,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-063",
      "solidworksName": "转向推杆直线导轨座",
      "solidworksFile": "转向推杆直线导轨座.SLDPRT",
      "drawingUrl": "docs/零件图册/P41.html",
      "featureCount": 3
    },
    {
      "id": "P42",
      "name": "前桥转向钟形转换摇臂",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金铣削",
      "material": "7075-T6铝合金",
      "color": "#06b6d4",
      "quantity": 1,
      "size": [
        24.0,
        24.0,
        6.0
      ],
      "note": "90°L型钟形转换杠杆(Bell-Crank)，铰接于前桥中心(X=+72, Y=0, Z=58mm)，将纵向同步转向主推杆的X向位移1:1正交转化为前桥平行四边形转向横拉杆的Y向横移",
      "keyDimensions": [
        {
          "name": "正交杠杆臂比",
          "value": "L_x : L_y = 14.0 : 14.0 mm (1:1正交转换)",
          "note": "内置MF85ZZ法兰微型轴承"
        }
      ],
      "features": [
        {
          "id": "P42-F01",
          "name": "前桥转向钟形转换摇臂主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 24.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": -9.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 9.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "P42-F02",
          "name": "前桥转向钟形转换摇臂四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 9.12,
            "cy": 9.12,
            "w": 4.32,
            "h": 4.32,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P42-F03",
          "name": "前桥转向钟形转换摇臂对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -9.12,
            "cy": -9.12,
            "w": 4.32,
            "h": 4.32,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-064",
      "solidworksName": "前桥转向钟形转换摇臂",
      "solidworksFile": "前桥转向钟形转换摇臂.SLDPRT",
      "drawingUrl": "docs/零件图册/P42.html",
      "featureCount": 3
    },
    {
      "id": "P43",
      "name": "后桥转向钟形转换摇臂",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金铣削",
      "material": "7075-T6铝合金",
      "color": "#0891b2",
      "quantity": 1,
      "size": [
        24.0,
        24.0,
        6.0
      ],
      "note": "90°L型钟形转换杠杆，铰接于后桥中心(X=-72, Y=0, Z=58mm)，将后桥差动转向副推杆的X向位移正交转化为后桥平行四边形转向横拉杆的Y向横移",
      "keyDimensions": [
        {
          "name": "正交杠杆臂比",
          "value": "L_x : L_y = 14.0 : 14.0 mm",
          "note": "实现前后桥独立或同步全向转向控制"
        }
      ],
      "features": [
        {
          "id": "P43-F01",
          "name": "后桥转向钟形转换摇臂主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 24.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 9.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 9.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "P43-F02",
          "name": "后桥转向钟形转换摇臂四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 9.12,
            "cy": 9.12,
            "w": 4.32,
            "h": 4.32,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P43-F03",
          "name": "后桥转向钟形转换摇臂对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -9.12,
            "cy": -9.12,
            "w": 4.32,
            "h": 4.32,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-065",
      "solidworksName": "后桥转向钟形转换摇臂",
      "solidworksFile": "后桥转向钟形转换摇臂.SLDPRT",
      "drawingUrl": "docs/零件图册/P43.html",
      "featureCount": 3
    },
    {
      "id": "P44",
      "name": "前桥平行四边形转向横拉杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#06b6d4",
      "quantity": 1,
      "size": [
        10.0,
        124.0,
        5.0
      ],
      "note": "横向布置于前桥高架层(X=+84, Y∈[-58,+58], Z=58mm)，两端通过鱼眼轴承接头连接左前、右前『舵轮同步转向扇形齿轮摇臂』，构成平行四边形等角同步机构",
      "keyDimensions": [
        {
          "name": "两端铰接孔距",
          "value": "116.0 mm (精确匹配前轮距 Y = ±58.0 mm)",
          "note": "保证左前与右前全向舵轮1:1严格同角偏转"
        }
      ],
      "features": [
        {
          "id": "P44-F01",
          "name": "前桥平行四边形转向横拉杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 10.0,
            "h": 124.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -58.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 58.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "P44-F02",
          "name": "前桥平行四边形转向横拉杆四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 3.8,
            "cy": 47.12,
            "w": 1.7999999999999998,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P44-F03",
          "name": "前桥平行四边形转向横拉杆对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": -3.8,
            "cy": -47.12,
            "w": 1.7999999999999998,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-066",
      "solidworksName": "前桥平行四边形转向横拉杆",
      "solidworksFile": "前桥平行四边形转向横拉杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P44.html",
      "featureCount": 3
    },
    {
      "id": "P45",
      "name": "后桥平行四边形转向横拉杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#0891b2",
      "quantity": 1,
      "size": [
        10.0,
        124.0,
        5.0
      ],
      "note": "横向布置于后桥高架层(X=-84, Y∈[-58,+58], Z=58mm)，连接左后、右后『舵轮同步转向扇形齿轮摇臂』，实现后两轮同步同向蟹行或反向急转",
      "keyDimensions": [
        {
          "name": "两端铰接孔距",
          "value": "116.0 mm (精确匹配后轮距 Y = ±58.0 mm)",
          "note": "与前桥平行四边形横拉杆对称匹配"
        }
      ],
      "features": [
        {
          "id": "P45-F01",
          "name": "后桥平行四边形转向横拉杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 10.0,
            "h": 124.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -58.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 58.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "P45-F02",
          "name": "后桥平行四边形转向横拉杆四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 3.8,
            "cy": 47.12,
            "w": 1.7999999999999998,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P45-F03",
          "name": "后桥平行四边形转向横拉杆对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": -3.8,
            "cy": -47.12,
            "w": 1.7999999999999998,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-067",
      "solidworksName": "后桥平行四边形转向横拉杆",
      "solidworksFile": "后桥平行四边形转向横拉杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P45.html",
      "featureCount": 3
    },
    {
      "id": "P46",
      "name": "舵轮同步转向扇形齿轮摇臂",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金精铣",
      "material": "7075-T6铝合金",
      "color": "#0ea5e9",
      "quantity": 4,
      "size": [
        15.0,
        15.0,
        6.0
      ],
      "note": "共4件锁紧在四角『全向转向空心主销套筒』顶端(X=±72, Y=±58, Z=58mm)，外缘带m=0.5啮合齿与偏心摇臂孔(R=12mm)，由前/后平行四边形转向横拉杆驱动实现大角度全向偏转",
      "keyDimensions": [
        {
          "name": "主销孔径 / 摇臂半径",
          "value": "内孔Φ10.0mm夹紧, 摇臂半径 R = 12.0 mm",
          "note": "推杆5.2mm行程即可产生±25°~±45°全向偏转角"
        }
      ],
      "features": [
        {
          "id": "P46-F01",
          "name": "舵轮同步转向扇形齿轮摇臂渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 28
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        },
        {
          "id": "P46-F02",
          "name": "舵轮同步转向扇形齿轮摇臂中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.64
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        }
      ],
      "partNumber": "SC-068",
      "solidworksName": "舵轮同步转向扇形齿轮摇臂",
      "solidworksFile": "舵轮同步转向扇形齿轮摇臂.SLDPRT",
      "drawingUrl": "docs/零件图册/P46.html",
      "featureCount": 2
    },
    {
      "id": "P47",
      "name": "全向运动模式三挡切换器",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "7075铝合金阳极玫红",
      "color": "#ec4899",
      "quantity": 1,
      "size": [
        28.0,
        20.0,
        10.0
      ],
      "note": "位于主推杆与后差动副推杆耦合桥处(X=-54, Y=0, Z=58mm)，通过切换定位插销档位可纯机械锁定：【1:+1 四轮同向蟹行平移】、【1:-1 四轮反向原地急转】、【双凸轮独立复合轨迹】",
      "keyDimensions": [
        {
          "name": "三挡定位孔距",
          "value": "+8.0 mm (同向蟹行) / 0.0 mm (双凸轮复合) / -8.0 mm (反向急转)",
          "note": "纯机械多模态全向切换滑块"
        }
      ],
      "features": [
        {
          "id": "P47-F01",
          "name": "全向运动模式三挡切换器主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -5.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 28.0,
            "h": 20.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -8.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 8.0,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        },
        {
          "id": "P47-F02",
          "name": "全向运动模式三挡切换器四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 5.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": 10.64,
            "cy": 7.6,
            "w": 5.04,
            "h": 3.5999999999999996,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P47-F03",
          "name": "全向运动模式三挡切换器对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 5.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": -10.64,
            "cy": -7.6,
            "w": 5.04,
            "h": 3.5999999999999996,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-069",
      "solidworksName": "全向运动模式三挡切换器",
      "solidworksFile": "全向运动模式三挡切换器.SLDPRT",
      "drawingUrl": "docs/零件图册/P47.html",
      "featureCount": 3
    },
    {
      "id": "P48",
      "name": "模式切换滚花定位插销",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制连接件",
      "process": "数控车削+滚花",
      "material": "303不锈钢",
      "color": "#f43f5e",
      "quantity": 2,
      "size": [
        6.0,
        6.0,
        16.0
      ],
      "note": "共2件带滚花手柄的Φ3mm快拆插销，插入全向运动模式三挡切换器不同档位孔即可免工具切换全向行驶模式",
      "keyDimensions": [
        {
          "name": "销径 × 长度",
          "value": "Φ3.0 f7 × 16.0 mm",
          "note": "带球头弹簧珠防振脱"
        }
      ],
      "features": [
        {
          "id": "P48-F01",
          "name": "模式切换滚花定位插销回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -8.0,
          "w1": 8.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.0
          },
          "holes": []
        },
        {
          "id": "P48-F02",
          "name": "模式切换滚花定位插销轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.88,
          "w1": 2.88,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.84
          },
          "holes": []
        }
      ],
      "partNumber": "SC-070",
      "solidworksName": "模式切换滚花定位插销",
      "solidworksFile": "模式切换滚花定位插销.SLDPRT",
      "drawingUrl": "docs/零件图册/P48.html",
      "featureCount": 2
    },
    {
      "id": "P49",
      "name": "连杆关节鱼眼轴承接头",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "外购标准件",
      "process": "精密铸造+球面轴承",
      "material": "轴承钢镀镍",
      "color": "#e2e8f0",
      "quantity": 8,
      "size": [
        7.0,
        7.0,
        8.0
      ],
      "note": "共8件M3微型鱼眼关节杆端轴承，安装在前后平行四边形转向横拉杆与钟形转换摇臂的8个铰接点，彻底消除连杆运动卡滞与多平面应力",
      "keyDimensions": [
        {
          "name": "球头内孔 × 外径",
          "value": "Φ3.0 × Φ7.0 × 8.0 mm",
          "note": "允许±12°空间摆角补偿"
        }
      ],
      "features": [
        {
          "id": "P49-F01",
          "name": "连杆关节鱼眼轴承接头回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "P49-F02",
          "name": "连杆关节鱼眼轴承接头端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.8,
          "w1": 4.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-071",
      "solidworksName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "drawingUrl": "docs/零件图册/P49.html",
      "featureCount": 2
    },
    {
      "id": "E01",
      "name": "单晶硅太阳能电池板",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "层压封装成品件",
      "material": "单晶硅+钢化玻璃",
      "color": "#1e3a8a",
      "quantity": 1,
      "size": [
        66.0,
        113.0,
        3.0
      ],
      "note": "严格符合三期考核尺寸(66×113×3mm)，平置安装于车体中后部正上方(X=-22, Y=0, Z=99mm)，受光面朝+Z正上方100%无遮挡",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "66.0 × 113.0 × 3.0 mm",
          "note": "顶部受光面零遮挡"
        }
      ],
      "features": [
        {
          "id": "E01-F01",
          "name": "单晶硅太阳能电池板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 66.0,
            "h": 113.0,
            "fillet": 1.5
          },
          "holes": []
        },
        {
          "id": "E01-F02",
          "name": "单晶硅太阳能电池板加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 1.5,
          "w1": 2.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 21.12,
            "h": 36.16,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-072",
      "solidworksName": "单晶硅太阳能电池板",
      "solidworksFile": "单晶硅太阳能电池板.SLDPRT",
      "drawingUrl": "docs/零件图册/E01.html",
      "featureCount": 2
    },
    {
      "id": "P50",
      "name": "太阳能板承载框",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "自制结构件",
      "process": "3D打印/CNC加工",
      "material": "PLA-CF碳纤增强",
      "color": "#334155",
      "quantity": 1,
      "size": [
        72.0,
        119.0,
        5.0
      ],
      "note": "带护边定位槽的太阳能板轻量化承载框架(Z=96.5mm)，四角连接4根太阳能板支撑立柱",
      "keyDimensions": [
        {
          "name": "外框尺寸",
          "value": "72.0 × 119.0 × 5.0 mm",
          "note": "中心大开窗减重散热"
        }
      ],
      "features": [
        {
          "id": "P50-F01",
          "name": "太阳能板承载框主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 72.0,
            "h": 119.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 58.0,
              "h": 105.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P50-F02",
          "name": "太阳能板承载框四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 27.36,
            "cy": 45.22,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P50-F03",
          "name": "太阳能板承载框对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": -27.36,
            "cy": -45.22,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-073",
      "solidworksName": "太阳能板承载框",
      "solidworksFile": "太阳能板承载框.SLDPRT",
      "drawingUrl": "docs/零件图册/P50.html",
      "featureCount": 3
    },
    {
      "id": "P51",
      "name": "太阳能板支撑立柱",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "自制结构件",
      "process": "数控车削",
      "material": "6061铝合金",
      "color": "#64748b",
      "quantity": 4,
      "size": [
        6.0,
        6.0,
        48.0
      ],
      "note": "4根Φ6×48mm铝合金立柱(X=-52/+8, Y=±46, Z=72mm)，将太阳能板承载框稳固架高在主底板上方",
      "keyDimensions": [
        {
          "name": "外径 × 长度",
          "value": "Φ6.0 × 48.0 mm",
          "note": "两端M3内螺纹"
        }
      ],
      "features": [
        {
          "id": "P51-F01",
          "name": "太阳能板支撑立柱回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -24.0,
          "w1": 24.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "P51-F02",
          "name": "太阳能板支撑立柱轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.84
          },
          "holes": []
        }
      ],
      "partNumber": "SC-074",
      "solidworksName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "drawingUrl": "docs/零件图册/P51.html",
      "featureCount": 2
    },
    {
      "id": "E02",
      "name": "超级电容储能模组",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "成品法拉电容模组",
      "material": "超级电容组+均衡保护板",
      "color": "#047857",
      "quantity": 1,
      "size": [
        68.0,
        48.0,
        34.0
      ],
      "note": "符合三期考核规范(≤70×70×50mm)，安装于铝合金主底板上表面右侧超级电容固定座内(X=+4, Y=-34, Z=66mm)",
      "keyDimensions": [
        {
          "name": "包络尺寸",
          "value": "68.0 × 48.0 × 34.0 mm",
          "note": "大容量低内阻储能模组"
        }
      ],
      "features": [
        {
          "id": "E02-F01",
          "name": "超级电容储能模组主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -17.0,
          "w1": 17.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 68.0,
            "h": 48.0,
            "fillet": 4.0
          },
          "holes": []
        },
        {
          "id": "E02-F02",
          "name": "超级电容储能模组加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 17.0,
          "w1": 18.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 21.76,
            "h": 15.36,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-075",
      "solidworksName": "超级电容储能模组",
      "solidworksFile": "超级电容储能模组.SLDPRT",
      "drawingUrl": "docs/零件图册/E02.html",
      "featureCount": 2
    },
    {
      "id": "P52",
      "name": "超级电容固定座",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "自制结构件",
      "process": "3D打印",
      "material": "ABS工程塑料",
      "color": "#475569",
      "quantity": 1,
      "size": [
        72.0,
        52.0,
        8.0
      ],
      "note": "安装在主底板上表面右侧(X=+4, Y=-34, Z=50mm)，四周围挡卡紧超级电容储能模组防止全向急转时位移",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "72.0 × 52.0 × 8.0 mm",
          "note": "内腔68.4×48.4mm"
        }
      ],
      "features": [
        {
          "id": "P52-F01",
          "name": "超级电容固定座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 72.0,
            "h": 52.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 64.0,
              "h": 44.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P52-F02",
          "name": "超级电容固定座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": 27.36,
            "cy": 19.76,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P52-F03",
          "name": "超级电容固定座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 4.0,
          "w1": 5.0,
          "shape": "rect",
          "params": {
            "cx": -27.36,
            "cy": -19.76,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-076",
      "solidworksName": "超级电容固定座",
      "solidworksFile": "超级电容固定座.SLDPRT",
      "drawingUrl": "docs/零件图册/P52.html",
      "featureCount": 3
    },
    {
      "id": "E03",
      "name": "充电与语音控制电路板",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "PCB贴片成品模块",
      "material": "FR-4玻纤板+电子器件",
      "color": "#15803d",
      "quantity": 1,
      "size": [
        64.0,
        44.0,
        5.0
      ],
      "note": "符合三期考核尺寸(≤65×45mm)，通过M3铜柱安装在主底板上表面左侧(X=+4, Y=+34, Z=56mm)，集成MPPT充电与语音识别控制",
      "keyDimensions": [
        {
          "name": "PCB尺寸",
          "value": "64.0 × 44.0 × 5.0 mm",
          "note": "四角M3安装孔"
        }
      ],
      "features": [
        {
          "id": "E03-F01",
          "name": "充电与语音控制电路板主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 64.0,
            "h": 44.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "E03-F02",
          "name": "充电与语音控制电路板加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 20.48,
            "h": 14.08,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-077",
      "solidworksName": "充电与语音控制电路板",
      "solidworksFile": "充电与语音控制电路板.SLDPRT",
      "drawingUrl": "docs/零件图册/E03.html",
      "featureCount": 2
    },
    {
      "id": "E04",
      "name": "顶部电能检测模块",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "成品数字功率表",
      "material": "ABS壳体+LCD液晶屏",
      "color": "#0f172a",
      "quantity": 1,
      "size": [
        35.0,
        84.0,
        24.0
      ],
      "note": "严格按开会记录要求(35×84×26mm)置于车头正上方(X=+54, Y=0, Z=88mm)，液晶显示窗朝+Z正上方100%无遮挡",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "35.0 × 84.0 × 24.0 mm",
          "note": "顶部100%无遮挡"
        }
      ],
      "features": [
        {
          "id": "E04-F01",
          "name": "顶部电能检测模块主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -12.0,
          "w1": 12.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 35.0,
            "h": 84.0,
            "fillet": 2.0
          },
          "holes": []
        },
        {
          "id": "E04-F02",
          "name": "顶部电能检测模块加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 12.0,
          "w1": 13.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 11.2,
            "h": 26.88,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-078",
      "solidworksName": "顶部电能检测模块",
      "solidworksFile": "顶部电能检测模块.SLDPRT",
      "drawingUrl": "docs/零件图册/E04.html",
      "featureCount": 2
    },
    {
      "id": "P53",
      "name": "电能检测模块支架",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "自制结构件",
      "process": "3D打印/CNC折弯",
      "material": "PLA-CF/铝合金",
      "color": "#475569",
      "quantity": 1,
      "size": [
        38.0,
        92.0,
        28.0
      ],
      "note": "龙门式高架托架(X=+54, Y=0, Z=64mm)，跨过纵向同步转向主推杆上方，稳固托举顶部电能检测模块与顶部红色LED指示灯",
      "keyDimensions": [
        {
          "name": "跨度 × 高度",
          "value": "92.0 × 28.0 mm",
          "note": "下部留出净空供转向推杆与横拉杆运动"
        }
      ],
      "features": [
        {
          "id": "P53-F01",
          "name": "电能检测模块支架主体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -19.0,
          "w1": 19.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 92.0,
            "h": 28.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": -3.0,
              "w": 74.0,
              "h": 20.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P53-F02",
          "name": "电能检测模块支架四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 19.0,
          "w1": 20.0,
          "shape": "rect",
          "params": {
            "cx": 34.96,
            "cy": 10.64,
            "w": 8.0,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P53-F03",
          "name": "电能检测模块支架对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 19.0,
          "w1": 20.0,
          "shape": "rect",
          "params": {
            "cx": -34.96,
            "cy": -10.64,
            "w": 8.0,
            "h": 5.04,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-079",
      "solidworksName": "电能检测模块支架",
      "solidworksFile": "电能检测模块支架.SLDPRT",
      "drawingUrl": "docs/零件图册/P53.html",
      "featureCount": 3
    },
    {
      "id": "E05",
      "name": "顶部红色LED指示灯",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "成品LED灯珠组件",
      "material": "高亮红光环氧透镜+金属座",
      "color": "#dc2626",
      "quantity": 1,
      "size": [
        10.0,
        10.0,
        14.0
      ],
      "note": "符合开会记录『车顶部放置一个不小于8mm的红色LED指示灯』要求，采用Φ10mm高亮红色LED置于车头顶部(X=+54, Y=+48, Z=90mm)，无遮挡",
      "keyDimensions": [
        {
          "name": "发光灯头直径",
          "value": "Φ10.0 mm (≥ Φ8.0 mm要求)",
          "note": "顶部直视100%无遮挡"
        }
      ],
      "features": [
        {
          "id": "E05-F01",
          "name": "顶部红色LED指示灯回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -7.0,
          "w1": 7.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.0
          },
          "holes": []
        },
        {
          "id": "E05-F02",
          "name": "顶部红色LED指示灯轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.52,
          "w1": 2.52,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.4
          },
          "holes": []
        }
      ],
      "partNumber": "SC-080",
      "solidworksName": "顶部红色LED指示灯",
      "solidworksFile": "顶部红色LED指示灯.SLDPRT",
      "drawingUrl": "docs/零件图册/E05.html",
      "featureCount": 2
    },
    {
      "id": "E06",
      "name": "底部RFID读卡器模块",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "射频PCB成品件",
      "material": "FR-4射频天线板",
      "color": "#0284c7",
      "quantity": 1,
      "size": [
        40.0,
        40.0,
        3.0
      ],
      "note": "符合三期考核尺寸(40×40×3mm)，安装在底部中置传动副底板下表面(X=+20, Y=0, Z=15.5mm)，由底部读卡器防护盒全封闭包裹不外露",
      "keyDimensions": [
        {
          "name": "模块尺寸",
          "value": "40.0 × 40.0 × 3.0 mm",
          "note": "完全处于Y∈[-20,+20]mm中央安全区"
        }
      ],
      "features": [
        {
          "id": "E06-F01",
          "name": "底部RFID读卡器模块主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 40.0,
            "h": 40.0,
            "fillet": 1.5
          },
          "holes": []
        },
        {
          "id": "E06-F02",
          "name": "底部RFID读卡器模块加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 1.5,
          "w1": 2.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 12.8,
            "h": 12.8,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-081",
      "solidworksName": "底部RFID读卡器模块",
      "solidworksFile": "底部RFID读卡器模块.SLDPRT",
      "drawingUrl": "docs/零件图册/E06.html",
      "featureCount": 2
    },
    {
      "id": "P54",
      "name": "底部读卡器防护盒",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "category": "自制结构件",
      "process": "3D打印",
      "material": "ABS非金属透波塑料",
      "color": "#64748b",
      "quantity": 1,
      "size": [
        48.0,
        48.0,
        7.0
      ],
      "note": "严格落实开会记录『读卡器放在小车底部，不能外露』要求，采用非金属透波盒将底部RFID读卡器模块全包裹封装于副底板下方(X=+20, Y=0, Z=14.5mm)",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "48.0 × 48.0 × 7.0 mm",
          "note": "全封闭不外露且与四角车轮相距34mm以上"
        }
      ],
      "features": [
        {
          "id": "P54-F01",
          "name": "底部读卡器防护盒主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 48.0,
            "h": 48.0,
            "fillet": 3.0
          },
          "holes": []
        },
        {
          "id": "P54-F02",
          "name": "底部读卡器防护盒加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.5,
          "w1": 4.7,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 15.36,
            "h": 15.36,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-082",
      "solidworksName": "底部读卡器防护盒",
      "solidworksFile": "底部读卡器防护盒.SLDPRT",
      "drawingUrl": "docs/零件图册/P54.html",
      "featureCount": 2
    },
    {
      "id": "P55",
      "name": "轻量化快拆外壳",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "category": "自制外观件",
      "process": "3D打印一体成型",
      "material": "半透轻质PLA",
      "color": "#38bdf8",
      "quantity": 1,
      "size": [
        212.0,
        162.0,
        34.0
      ],
      "note": "流线型薄壁快拆护罩(Z=65mm)，顶部大开口完全避让单晶硅太阳能电池板、顶部电能检测模块与顶部红色LED指示灯，下部高于车轮最高点28mm绝不碰轮",
      "keyDimensions": [
        {
          "name": "外包络尺寸",
          "value": "212.0 × 162.0 × 34.0 mm",
          "note": "严格满足整车长≤250mm、宽≤200mm红线"
        }
      ],
      "features": [
        {
          "id": "P55-F01",
          "name": "轻量化快拆外壳主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -17.0,
          "w1": 17.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 212.0,
            "h": 162.0,
            "fillet": 16.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 204.0,
              "h": 154.0,
              "fillet": 13.0
            }
          ]
        },
        {
          "id": "P55-F02",
          "name": "轻量化快拆外壳四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 17.0,
          "w1": 18.0,
          "shape": "rect",
          "params": {
            "cx": 80.56,
            "cy": 61.56,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P55-F03",
          "name": "轻量化快拆外壳对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 17.0,
          "w1": 18.0,
          "shape": "rect",
          "params": {
            "cx": -80.56,
            "cy": -61.56,
            "w": 8.0,
            "h": 8.0,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-083",
      "solidworksName": "轻量化快拆外壳",
      "solidworksFile": "轻量化快拆外壳.SLDPRT",
      "drawingUrl": "docs/零件图册/P55.html",
      "featureCount": 3
    },
    {
      "id": "F01",
      "name": "M3铜柱与紧固件套件",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "category": "外购标准件",
      "process": "标准紧固件",
      "material": "H59黄铜/304不锈钢",
      "color": "#facc15",
      "quantity": 12,
      "size": [
        6.0,
        6.0,
        10.0
      ],
      "note": "全车统一采用M3紧固体系（含电路板支撑铜柱、轴承座锁紧螺栓与分动箱端盖螺钉）",
      "keyDimensions": [
        {
          "name": "螺纹规格",
          "value": "M3 × 0.5 标准紧固件",
          "note": "全车单一2.5mm内六角扳手拆装"
        }
      ],
      "features": [
        {
          "id": "F01-F01",
          "name": "M3铜柱与紧固件套件回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -5.0,
          "w1": 5.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "F01-F02",
          "name": "M3铜柱与紧固件套件轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.7999999999999998,
          "w1": 1.7999999999999998,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.84
          },
          "holes": []
        }
      ],
      "partNumber": "SC-084",
      "solidworksName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "drawingUrl": "docs/零件图册/F01.html",
      "featureCount": 2
    },
    {
      "id": "G12",
      "name": "四槽马耳他间歇分度槽轮",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC慢走丝线切割+精磨",
      "material": "Cr12MoV模具钢淬火",
      "color": "#ec4899",
      "quantity": 1,
      "size": [
        28.0,
        28.0,
        4.5
      ],
      "note": "工创赛核心创新机构：安装在槽轮分度立式精密转轴(X=-14, Y=+16, Z=40mm)上，具有4条正交径向拨槽与4段内凹锁止圆弧；凸轮竖轴每旋转1周，主动拨销进入槽轮驱动其精确间歇分度90°（动-停-动），其余270°由内凹锁止弧严格自锁！",
      "keyDimensions": [
        {
          "name": "槽数 z / 外径 D",
          "value": "z = 4 槽, Φ28.0 × 4.5 mm",
          "note": "单次转角 90°，动停时间比 τ = 1:3"
        },
        {
          "name": "中心距 / 拨销半径",
          "value": "中心距 L = 20.0 mm, R_pin = 14.14 mm",
          "note": "实现定距里程处纯机械自动切换行驶模态"
        }
      ],
      "features": [
        {
          "id": "G12-F01",
          "name": "四槽马耳他间歇分度槽轮马耳他径向槽与锁止弧拉伸",
          "type": "槽轮轮廓拉伸",
          "plane": "XY",
          "w0": -2.25,
          "w1": 2.25,
          "shape": "geneva",
          "params": {
            "outer_r": 14.0,
            "slots": 4,
            "slot_depth": 5.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G12-F02",
          "name": "四槽马耳他间歇分度槽轮双面精密锁紧法兰毂",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.75,
          "w1": 3.75,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-085",
      "solidworksName": "四槽马耳他间歇分度槽轮",
      "solidworksFile": "四槽马耳他间歇分度槽轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G12.html",
      "featureCount": 2
    },
    {
      "id": "P56",
      "name": "槽轮主动拨盘与止动圆弧盘",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "CNC五轴车铣复合",
      "material": "7075铝合金+淬火钢弧",
      "color": "#f43f5e",
      "quantity": 1,
      "size": [
        22.0,
        22.0,
        4.5
      ],
      "note": "同轴锁紧在双凸轮同轴传力竖轴(X=-34, Y=0, Z=40mm)上，上层集成R=14.14mm偏心圆销孔，下层集成缺口半月形凸起止动锁止弧，在不拨动槽轮时精确卡入四槽马耳他槽轮的内凹圆弧槽防止游移",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ22.0 × 4.5 mm",
          "note": "集成270°凸起止动锁止弧与90°月牙让位缺口"
        }
      ],
      "features": [
        {
          "id": "P56-F01",
          "name": "槽轮主动拨盘与止动圆弧盘回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.25,
          "w1": 2.25,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 11.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P56-F02",
          "name": "槽轮主动拨盘与止动圆弧盘端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.05,
          "w1": 3.05,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.18
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-086",
      "solidworksName": "槽轮主动拨盘与止动圆弧盘",
      "solidworksFile": "槽轮主动拨盘与止动圆弧盘.SLDPRT",
      "drawingUrl": "docs/零件图册/P56.html",
      "featureCount": 2
    },
    {
      "id": "P57",
      "name": "槽轮间歇拨销与滚针套",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制核心件",
      "process": "精密磨削+淬火",
      "material": "GCr15轴承钢",
      "color": "#fda4af",
      "quantity": 1,
      "size": [
        4.0,
        4.0,
        7.0
      ],
      "note": "安装在槽轮主动拨盘偏心R=14.14mm处(X=-24, Y=+10, Z=40mm)，外层套滚动耐磨滚针套，无冲击切入四槽马耳他间歇分度槽轮径向槽推动90°分度",
      "keyDimensions": [
        {
          "name": "滚针套外径 × 长度",
          "value": "Φ4.0 h5 × 7.0 mm",
          "note": "切向无冲击进入槽轮径向槽"
        }
      ],
      "features": [
        {
          "id": "P57-F01",
          "name": "槽轮间歇拨销与滚针套回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.5,
          "w1": 3.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.0
            }
          ]
        },
        {
          "id": "P57-F02",
          "name": "槽轮间歇拨销与滚针套轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.26,
          "w1": 1.26,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.56
          },
          "holes": []
        }
      ],
      "partNumber": "SC-087",
      "solidworksName": "槽轮间歇拨销与滚针套",
      "solidworksFile": "槽轮间歇拨销与滚针套.SLDPRT",
      "drawingUrl": "docs/零件图册/P57.html",
      "featureCount": 2
    },
    {
      "id": "P58",
      "name": "槽轮分度立式精密转轴",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "category": "自制传动件",
      "process": "精密磨削光轴",
      "material": "304不锈钢",
      "color": "#e2e8f0",
      "quantity": 1,
      "size": [
        5.0,
        5.0,
        32.0
      ],
      "note": "垂直安装于中置传动箱与主底板之间(X=-14, Y=+16, Z∈[24,56]mm)，支承四槽马耳他间歇分度槽轮并将90°步进角输出至上层模态自动切换拨叉连杆",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 32.0 mm",
          "note": "上下双法兰微型轴承支承"
        }
      ],
      "features": [
        {
          "id": "P58-F01",
          "name": "槽轮分度立式精密转轴回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -16.0,
          "w1": 16.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        },
        {
          "id": "P58-F02",
          "name": "槽轮分度立式精密转轴轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.2
          },
          "holes": []
        }
      ],
      "partNumber": "SC-088",
      "solidworksName": "槽轮分度立式精密转轴",
      "solidworksFile": "槽轮分度立式精密转轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P58.html",
      "featureCount": 2
    },
    {
      "id": "P59",
      "name": "模态自动切换拨叉连杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金线切割",
      "material": "7075-T6铝合金",
      "color": "#db2777",
      "quantity": 1,
      "size": [
        28.0,
        18.0,
        5.0
      ],
      "note": "连接槽轮分度立式精密转轴顶端偏心销与全向运动模式三挡切换器(X=-34, Y=+8, Z=58mm)，随着四槽马耳他槽轮每90°间歇分度，自动将小车在『直行巡航 → 四轮同向蟹行横移 → 四轮反向S弯急转』之间无动力损耗切换！",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "28.0 × 18.0 × 5.0 mm",
          "note": "槽轮间歇分度驱动的纯机械自动模态状态机"
        }
      ],
      "features": [
        {
          "id": "P59-F01",
          "name": "模态自动切换拨叉连杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 28.0,
            "h": 18.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -9.0,
              "cy": 0.0,
              "r": 2.5
            },
            {
              "shape": "rect",
              "cx": 5.0,
              "cy": 0.0,
              "w": 10.0,
              "h": 4.2,
              "fillet": 1.5
            }
          ]
        },
        {
          "id": "P59-F02",
          "name": "模态自动切换拨叉连杆四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": 10.64,
            "cy": 6.84,
            "w": 5.04,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P59-F03",
          "name": "模态自动切换拨叉连杆对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 2.5,
          "w1": 3.5,
          "shape": "rect",
          "params": {
            "cx": -10.64,
            "cy": -6.84,
            "w": 5.04,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-089",
      "solidworksName": "模态自动切换拨叉连杆",
      "solidworksFile": "模态自动切换拨叉连杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P59.html",
      "featureCount": 3
    },
    {
      "id": "G13",
      "name": "48齿中央行星内齿圈壳",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "CNC插齿+车削",
      "material": "40Cr合金钢调质",
      "color": "#f59e0b",
      "quantity": 1,
      "size": [
        12.0,
        28.0,
        28.0
      ],
      "note": "串联在底部纵向贯通传动主轴中段(X=-6, Y=0, Z=28mm)，内孔加工模数m=0.5、齿数z=48精密内齿圈，与内部太阳轮及3只行星轮构成行星齿轮中央差速与扭矩均衡分配器",
      "keyDimensions": [
        {
          "name": "内齿圈参数",
          "value": "m = 0.5 mm, z_r = 48 (外径Φ28.0×12.0mm)",
          "note": "满足行星配齿条件 z_s + 2·z_p = 24 + 2×12 = 48"
        }
      ],
      "features": [
        {
          "id": "G13-F01",
          "name": "48齿中央行星内齿圈壳回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -6.0,
          "w1": 6.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 14.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 9.0
            }
          ]
        },
        {
          "id": "G13-F02",
          "name": "48齿中央行星内齿圈壳端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -6.8,
          "w1": 6.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 11.75
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 9.0
            }
          ]
        }
      ],
      "partNumber": "SC-090",
      "solidworksName": "48齿中央行星内齿圈壳",
      "solidworksFile": "48齿中央行星内齿圈壳.SLDPRT",
      "drawingUrl": "docs/零件图册/G13.html",
      "featureCount": 2
    },
    {
      "id": "G14",
      "name": "24齿行星差速太阳轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "黄铜精密滚齿",
      "material": "H59黄铜",
      "color": "#fbbf24",
      "quantity": 1,
      "size": [
        6.0,
        13.0,
        13.0
      ],
      "note": "位于48齿中央行星内齿圈壳中心(X=-6, Y=0, Z=28mm)，与周围120°均布的3只12齿行星差速小齿轮恒定啮合，均衡分配前后桥四轮全向驱动扭矩",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z_s = 24",
          "note": "分度圆直径 12.0 mm"
        }
      ],
      "features": [
        {
          "id": "G14-F01",
          "name": "24齿行星差速太阳轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "YZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 24
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "G14-F02",
          "name": "24齿行星差速太阳轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -4.2,
          "w1": 4.2,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-091",
      "solidworksName": "24齿行星差速太阳轮",
      "solidworksFile": "24齿行星差速太阳轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G14.html",
      "featureCount": 2
    },
    {
      "id": "G15",
      "name": "12齿行星差速小齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "粉末冶金/精密滚齿",
      "material": "20CrMnTi渗碳钢",
      "color": "#fde047",
      "quantity": 3,
      "size": [
        5.0,
        7.0,
        7.0
      ],
      "note": "共3只按120°圆周均布在三销行星齿轮架总成上(X=-6, Z/Y半径9.0mm)，同时啮合24齿行星差速太阳轮与48齿中央行星内齿圈壳",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z_p = 12 (共3只)",
          "note": "行星轮系传动比 i = 1 + z_r/z_s = 3.0"
        }
      ],
      "features": [
        {
          "id": "G15-F01",
          "name": "12齿行星差速小齿轮渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "YZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 12
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        },
        {
          "id": "G15-F02",
          "name": "12齿行星差速小齿轮中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.7,
          "w1": 3.7,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.6
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-092",
      "solidworksName": "12齿行星差速小齿轮",
      "solidworksFile": "12齿行星差速小齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G15.html",
      "featureCount": 2
    },
    {
      "id": "P60",
      "name": "三销行星齿轮架总成",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "CNC车铣复合",
      "material": "7075-T6铝合金",
      "color": "#eab308",
      "quantity": 1,
      "size": [
        5.0,
        22.0,
        22.0
      ],
      "note": "支承3只12齿行星差速小齿轮的行星架法兰盘(X=-2, Y=0, Z=28mm)，圆周120°均布3根Φ3mm精密行星销轴，输出平稳合成扭矩",
      "keyDimensions": [
        {
          "name": "销轴分布圆直径",
          "value": "Φ18.0 mm (3×120°均布)",
          "note": "高刚度双侧支承行星架"
        }
      ],
      "features": [
        {
          "id": "P60-F01",
          "name": "三销行星齿轮架总成回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -2.5,
          "w1": 2.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 11.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P60-F02",
          "name": "三销行星齿轮架总成端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.3,
          "w1": 3.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.18
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-093",
      "solidworksName": "三销行星齿轮架总成",
      "solidworksFile": "三销行星齿轮架总成.SLDPRT",
      "drawingUrl": "docs/零件图册/P60.html",
      "featureCount": 2
    },
    {
      "id": "P61",
      "name": "双速犬牙啮合套换挡滑块",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "CNC五轴铣削",
      "material": "40Cr合金钢氮化",
      "color": "#f97316",
      "quantity": 1,
      "size": [
        8.0,
        16.0,
        16.0
      ],
      "note": "花键滑动套设在底部纵向贯通传动主轴(X=+10, Y=0, Z=28mm)上，端面带6齿犬牙啮合爪(Dog-Clutch)，可向左接合行星减速挡(高扭矩爬坡/蟹行模式)或向右接合1:1直驱挡(高速冲刺模式)",
      "keyDimensions": [
        {
          "name": "外径 × 宽度",
          "value": "Φ16.0 × 8.0 mm (外环设拨叉槽)",
          "note": "双速挡位无级快速切换"
        }
      ],
      "features": [
        {
          "id": "P61-F01",
          "name": "双速犬牙啮合套换挡滑块回转体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -4.0,
          "w1": 4.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 8.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        },
        {
          "id": "P61-F02",
          "name": "双速犬牙啮合套换挡滑块端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -4.8,
          "w1": 4.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 5.53
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.5
            }
          ]
        }
      ],
      "partNumber": "SC-094",
      "solidworksName": "双速犬牙啮合套换挡滑块",
      "solidworksFile": "双速犬牙啮合套换挡滑块.SLDPRT",
      "drawingUrl": "docs/零件图册/P61.html",
      "featureCount": 2
    },
    {
      "id": "P62",
      "name": "高低速换挡拨叉与锁紧座",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "category": "自制核心件",
      "process": "CNC铝合金加工",
      "material": "7075铝合金阳极橙",
      "color": "#ea580c",
      "quantity": 1,
      "size": [
        16.0,
        22.0,
        18.0
      ],
      "note": "安装在中置传动副底板上(X=+10, Y=-12, Z=30mm)，拨叉卡入双速犬牙啮合套换挡滑块环形槽，带弹簧定位珠锁定『高速直驱挡 / 行星增扭挡』",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "16.0 × 22.0 × 18.0 mm",
          "note": "完全处于中置齿轮箱Y∈[-23,+23]mm安全区内"
        }
      ],
      "features": [
        {
          "id": "P62-F01",
          "name": "高低速换挡拨叉与锁紧座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -11.0,
          "w1": 11.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 16.0,
            "h": 18.0,
            "fillet": 2.5
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.5
            }
          ]
        },
        {
          "id": "P62-F02",
          "name": "高低速换挡拨叉与锁紧座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 11.0,
          "w1": 12.0,
          "shape": "rect",
          "params": {
            "cx": 6.08,
            "cy": 6.84,
            "w": 2.88,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P62-F03",
          "name": "高低速换挡拨叉与锁紧座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 11.0,
          "w1": 12.0,
          "shape": "rect",
          "params": {
            "cx": -6.08,
            "cy": -6.84,
            "w": 2.88,
            "h": 3.2399999999999998,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-095",
      "solidworksName": "高低速换挡拨叉与锁紧座",
      "solidworksFile": "高低速换挡拨叉与锁紧座.SLDPRT",
      "drawingUrl": "docs/零件图册/P62.html",
      "featureCount": 3
    },
    {
      "id": "P63",
      "name": "前桥横向消隙转向齿条",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC精密铣齿+磨削",
      "material": "45钢调质表面发黑",
      "color": "#0ea5e9",
      "quantity": 1,
      "size": [
        8.0,
        128.0,
        6.0
      ],
      "note": "横向布置于前桥高架主销旁(X=+79, Y∈[-64,+64], Z=54mm)，直接与左前、右前全向舵轮主销顶端的扇形齿轮及舵轮主销消隙副齿轮片啮合，与平行四边形横拉杆组成【双冗余齿轮齿条+四连杆】零回差360°全向转向机构！",
      "keyDimensions": [
        {
          "name": "模数 / 有效齿长",
          "value": "m = 0.5 mm, 齿条全长 128.0 mm",
          "note": "高架于Z=54mm，高于车轮顶面14mm绝不碰轮"
        }
      ],
      "features": [
        {
          "id": "P63-F01",
          "name": "前桥横向消隙转向齿条主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 8.0,
            "h": 128.0,
            "fillet": 1.5
          },
          "holes": []
        },
        {
          "id": "P63-F02",
          "name": "前桥横向消隙转向齿条加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 4.0,
            "h": 40.96,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-096",
      "solidworksName": "前桥横向消隙转向齿条",
      "solidworksFile": "前桥横向消隙转向齿条.SLDPRT",
      "drawingUrl": "docs/零件图册/P63.html",
      "featureCount": 2
    },
    {
      "id": "P64",
      "name": "后桥横向消隙转向齿条",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC精密铣齿+磨削",
      "material": "45钢调质表面发黑",
      "color": "#0284c7",
      "quantity": 1,
      "size": [
        8.0,
        128.0,
        6.0
      ],
      "note": "横向布置于后桥高架主销旁(X=-79, Y∈[-64,+64], Z=54mm)，与左后、右后全向舵轮主销顶端双片错齿消隙齿轮直接啮合，确保后桥全向蟹行与反向急转角度绝对精确",
      "keyDimensions": [
        {
          "name": "模数 / 有效齿长",
          "value": "m = 0.5 mm, 齿条全长 128.0 mm",
          "note": "高架于Z=54mm，零回差同步驱动后两轮"
        }
      ],
      "features": [
        {
          "id": "P64-F01",
          "name": "后桥横向消隙转向齿条主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 8.0,
            "h": 128.0,
            "fillet": 1.5
          },
          "holes": []
        },
        {
          "id": "P64-F02",
          "name": "后桥横向消隙转向齿条加强筋凸台特征",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.2,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 4.0,
            "h": 40.96,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-097",
      "solidworksName": "后桥横向消隙转向齿条",
      "solidworksFile": "后桥横向消隙转向齿条.SLDPRT",
      "drawingUrl": "docs/零件图册/P64.html",
      "featureCount": 2
    },
    {
      "id": "P65",
      "name": "转向齿条燕尾直线滑轨座",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制结构件",
      "process": "CNC精密铣削",
      "material": "POM赛钢/铜合金镶条",
      "color": "#0369a1",
      "quantity": 4,
      "size": [
        14.0,
        14.0,
        8.0
      ],
      "note": "共4座对称安装在主底板前后桥上方(X=±79, Y=±32, Z=52mm)，内部燕尾滑槽精密托举前/后桥横向消隙转向齿条，抵抗齿轮啮合径向分力",
      "keyDimensions": [
        {
          "name": "滑槽截面",
          "value": "8.1 × 6.1 H7 mm 燕尾导槽",
          "note": "保证齿条与主销齿轮恒定中心距"
        }
      ],
      "features": [
        {
          "id": "P65-F01",
          "name": "转向齿条燕尾直线滑轨座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -7.0,
          "w1": 7.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 14.0,
            "h": 8.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 1.0,
              "w": 8.4,
              "h": 5.0,
              "fillet": 0.5
            }
          ]
        },
        {
          "id": "P65-F02",
          "name": "转向齿条燕尾直线滑轨座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 7.0,
          "w1": 8.0,
          "shape": "rect",
          "params": {
            "cx": 5.32,
            "cy": 3.04,
            "w": 2.52,
            "h": 1.44,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P65-F03",
          "name": "转向齿条燕尾直线滑轨座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": 7.0,
          "w1": 8.0,
          "shape": "rect",
          "params": {
            "cx": -5.32,
            "cy": -3.04,
            "w": 2.52,
            "h": 1.44,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-098",
      "solidworksName": "转向齿条燕尾直线滑轨座",
      "solidworksFile": "转向齿条燕尾直线滑轨座.SLDPRT",
      "drawingUrl": "docs/零件图册/P65.html",
      "featureCount": 3
    },
    {
      "id": "G16",
      "name": "舵轮主销消隙副齿轮片",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "黄铜慢走丝精切",
      "material": "H59黄铜",
      "color": "#f59e0b",
      "quantity": 4,
      "size": [
        15.0,
        15.0,
        2.5
      ],
      "note": "共4片同轴叠装在四角『舵轮同步转向扇形齿轮摇臂』(P46)下方(X=±72, Y=±58, Z=54mm)，通过错齿消隙扭转弹簧产生周向预紧微转角，上下双片齿面分别贴紧转向齿条左右齿廓，彻底消除0.15mm齿轮齿侧间隙！",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 厚度",
          "value": "m = 0.5 mm, z = 28, 厚 2.5 mm",
          "note": "双片错齿弹簧预紧，转向回差 = 0.00°"
        }
      ],
      "features": [
        {
          "id": "G16-F01",
          "name": "舵轮主销消隙副齿轮片渐开线齿廓拉伸",
          "type": "齿轮轮廓拉伸",
          "plane": "XY",
          "w0": -1.25,
          "w1": 1.25,
          "shape": "gear",
          "params": {
            "module": 0.5,
            "teeth": 28
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        },
        {
          "id": "G16-F02",
          "name": "舵轮主销消隙副齿轮片中心定位轴毂凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.45,
          "w1": 2.45,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 3.64
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.0
            }
          ]
        }
      ],
      "partNumber": "SC-099",
      "solidworksName": "舵轮主销消隙副齿轮片",
      "solidworksFile": "舵轮主销消隙副齿轮片.SLDPRT",
      "drawingUrl": "docs/零件图册/G16.html",
      "featureCount": 2
    },
    {
      "id": "SP3",
      "name": "错齿消隙扭转弹簧",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "外购标准件",
      "process": "弹簧钢精密绕制",
      "material": "65Mn琴钢丝",
      "color": "#fbbf24",
      "quantity": 4,
      "size": [
        14.0,
        14.0,
        3.0
      ],
      "note": "共4只安装在四角舵轮同步转向扇形齿轮摇臂与舵轮主销消隙副齿轮片之间(X=±72, Y=±58, Z=56mm)，提供恒定周向错齿消隙扭矩",
      "keyDimensions": [
        {
          "name": "外径 × 高度",
          "value": "Φ14.0 × 3.0 mm",
          "note": "雙扭臂挂钩结构"
        }
      ],
      "features": [
        {
          "id": "SP3-F01",
          "name": "错齿消隙扭转弹簧回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.1
            }
          ]
        },
        {
          "id": "SP3-F02",
          "name": "错齿消隙扭转弹簧端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.3,
          "w1": 2.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.15
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.1
            }
          ]
        }
      ],
      "partNumber": "SC-100",
      "solidworksName": "错齿消隙扭转弹簧",
      "solidworksFile": "错齿消隙扭转弹簧.SLDPRT",
      "drawingUrl": "docs/零件图册/SP3.html",
      "featureCount": 2
    },
    {
      "id": "P66",
      "name": "可变杠杆比转向调节摇杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "CNC铝合金精铣",
      "material": "7075-T6航空铝合金",
      "color": "#14b8a6",
      "quantity": 1,
      "size": [
        18.0,
        38.0,
        6.0
      ],
      "note": "工创赛微调创新机构：安装在纵向同步转向主推杆中段(X=+36, Y=0, Z=62mm)，设有长24mm精密T型刻度滑槽，移动铰接滑块位置即可在0.8×~1.4×范围内无级连续放大或缩小全车全向转向角幅值，无需更换凸轮即可适配不同赛场桩距！",
      "keyDimensions": [
        {
          "name": "杠杆比连续调节范围",
          "value": "K_L = 0.80 ~ 1.40 无级可调",
          "note": "激光刻线分辨率 0.5 mm"
        }
      ],
      "features": [
        {
          "id": "P66-F01",
          "name": "可变杠杆比转向调节摇杆主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 18.0,
            "h": 38.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 5.0,
              "h": 24.0,
              "fillet": 2.0
            }
          ]
        },
        {
          "id": "P66-F02",
          "name": "可变杠杆比转向调节摇杆四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 6.84,
            "cy": 14.44,
            "w": 3.2399999999999998,
            "h": 6.84,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P66-F03",
          "name": "可变杠杆比转向调节摇杆对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -6.84,
            "cy": -14.44,
            "w": 3.2399999999999998,
            "h": 6.84,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-101",
      "solidworksName": "可变杠杆比转向调节摇杆",
      "solidworksFile": "可变杠杆比转向调节摇杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P66.html",
      "featureCount": 3
    },
    {
      "id": "P67",
      "name": "千分尺螺纹偏航微调丝杠",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "精密螺纹磨削",
      "material": "304不锈钢",
      "color": "#e2e8f0",
      "quantity": 1,
      "size": [
        4.0,
        28.0,
        4.0
      ],
      "note": "M4×0.35细牙精密千分尺丝杠(X=+36, Y=+16, Z=62mm)，驱动可变杠杆比转向调节摇杆上的滑块移动，实现0.01°级直线行驶零位偏航角精修",
      "keyDimensions": [
        {
          "name": "螺纹规格 × 导程",
          "value": "M4 × 0.35 mm 精密细牙丝杠",
          "note": "旋钮每转1格(10°)对应推杆行程微调0.0097mm"
        }
      ],
      "features": [
        {
          "id": "P67-F01",
          "name": "千分尺螺纹偏航微调丝杠回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -14.0,
          "w1": 14.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.0
          },
          "holes": []
        },
        {
          "id": "P67-F02",
          "name": "千分尺螺纹偏航微调丝杠轴肩定位挡圈凸台",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.56
          },
          "holes": []
        }
      ],
      "partNumber": "SC-102",
      "solidworksName": "千分尺螺纹偏航微调丝杠",
      "solidworksFile": "千分尺螺纹偏航微调丝杠.SLDPRT",
      "drawingUrl": "docs/零件图册/P67.html",
      "featureCount": 2
    },
    {
      "id": "P68",
      "name": "微分刻度游标调节旋钮",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制核心件",
      "process": "数控车削+激光刻字",
      "material": "7075铝合金阳极红",
      "color": "#ef4444",
      "quantity": 1,
      "size": [
        12.0,
        6.0,
        12.0
      ],
      "note": "锁紧在千分尺螺纹偏航微调丝杠外端(X=+36, Y=+30, Z=62mm)，外圆滚花并激光雕刻36等分千分尺游标刻度，供赛前发车区3秒内完成直线度微调",
      "keyDimensions": [
        {
          "name": "外径 × 刻度分度",
          "value": "Φ12.0 × 6.0 mm (圆周36格游标)",
          "note": "带防松阻尼O圈"
        }
      ],
      "features": [
        {
          "id": "P68-F01",
          "name": "微分刻度游标调节旋钮回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 6.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.0
            }
          ]
        },
        {
          "id": "P68-F02",
          "name": "微分刻度游标调节旋钮端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XZ",
          "w0": -3.8,
          "w1": 3.8,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 4.2
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.0
            }
          ]
        }
      ],
      "partNumber": "SC-103",
      "solidworksName": "微分刻度游标调节旋钮",
      "solidworksFile": "微分刻度游标调节旋钮.SLDPRT",
      "drawingUrl": "docs/零件图册/P68.html",
      "featureCount": 2
    },
    {
      "id": "P69",
      "name": "微调滑块导轨支座",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#0d9488",
      "quantity": 1,
      "size": [
        14.0,
        12.0,
        12.0
      ],
      "note": "固定在纵向同步转向主推杆与可变杠杆比转向调节摇杆交汇处(X=+36, Y=+8, Z=62mm)，支承千分尺螺纹偏航微调丝杠并消除轴向螺纹间隙",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "14.0 × 12.0 × 12.0 mm",
          "note": "内置预紧铜螺母"
        }
      ],
      "features": [
        {
          "id": "P69-F01",
          "name": "微调滑块导轨支座主体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -6.0,
          "w1": 6.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 14.0,
            "h": 12.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 2.0
            }
          ]
        },
        {
          "id": "P69-F02",
          "name": "微调滑块导轨支座四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 6.0,
          "w1": 7.0,
          "shape": "rect",
          "params": {
            "cx": 5.32,
            "cy": 4.56,
            "w": 2.52,
            "h": 2.16,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P69-F03",
          "name": "微调滑块导轨支座对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": 6.0,
          "w1": 7.0,
          "shape": "rect",
          "params": {
            "cx": -5.32,
            "cy": -4.56,
            "w": 2.52,
            "h": 2.16,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-104",
      "solidworksName": "微调滑块导轨支座",
      "solidworksFile": "微调滑块导轨支座.SLDPRT",
      "drawingUrl": "docs/零件图册/P69.html",
      "featureCount": 3
    },
    {
      "id": "P70",
      "name": "中置齿轮箱横向加强隔板",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "category": "自制结构件",
      "process": "CNC铝合金铣削",
      "material": "6061-T6铝合金",
      "color": "#475569",
      "quantity": 2,
      "size": [
        6.0,
        52.0,
        20.0
      ],
      "note": "共2件横向嵌装在中置齿轮箱内部(X=-28/+28, Y=0, Z=32mm)，将中置传动箱分隔为『主减速与蜗杆室』、『中央行星差速室』与『前后锥齿分动室』，大幅提升底盘抗扭刚度且完全处于Y∈[-26,+26]mm安全区内",
      "keyDimensions": [
        {
          "name": "尺寸",
          "value": "6.0 × 52.0 × 20.0 mm",
          "note": "中心设Φ16mm轴承孔与过轴孔"
        }
      ],
      "features": [
        {
          "id": "P70-F01",
          "name": "中置齿轮箱横向加强隔板主体拉伸",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": -3.0,
          "w1": 3.0,
          "shape": "rect",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 52.0,
            "h": 20.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 6.5
            }
          ]
        },
        {
          "id": "P70-F02",
          "name": "中置齿轮箱横向加强隔板四角安装基准凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": 19.76,
            "cy": 7.6,
            "w": 8.0,
            "h": 3.5999999999999996,
            "fillet": 1.0
          },
          "holes": []
        },
        {
          "id": "P70-F03",
          "name": "中置齿轮箱横向加强隔板对称锁紧定位凸台",
          "type": "拉伸凸台",
          "plane": "YZ",
          "w0": 3.0,
          "w1": 4.0,
          "shape": "rect",
          "params": {
            "cx": -19.76,
            "cy": -7.6,
            "w": 8.0,
            "h": 3.5999999999999996,
            "fillet": 1.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-105",
      "solidworksName": "中置齿轮箱横向加强隔板",
      "solidworksFile": "中置齿轮箱横向加强隔板.SLDPRT",
      "drawingUrl": "docs/零件图册/P70.html",
      "featureCount": 3
    },
    {
      "id": "P71",
      "name": "舵轮主销防尘迷宫密封盖",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "category": "自制结构件",
      "process": "CNC精密车削",
      "material": "POM聚甲醛(赛钢)",
      "color": "#38bdf8",
      "quantity": 4,
      "size": [
        18.0,
        18.0,
        3.0
      ],
      "note": "共4件压装在四角『全向舵轮主销轴承座』下端面(X=±72, Y=±58, Z=38.5mm)，采用非接触式迷宫槽密封保护6700ZZ薄壁转向轴承与主销内孔推力球轴承免受地面沙尘侵入",
      "keyDimensions": [
        {
          "name": "外径 × 厚度",
          "value": "Φ18.0 × 3.0 mm",
          "note": "内孔Φ10.2mm迷宫防尘槽"
        }
      ],
      "features": [
        {
          "id": "P71-F01",
          "name": "舵轮主销防尘迷宫密封盖回转体拉伸",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -1.5,
          "w1": 1.5,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 9.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.1
            }
          ]
        },
        {
          "id": "P71-F02",
          "name": "舵轮主销防尘迷宫密封盖端面精密定位止口台阶",
          "type": "拉伸凸台",
          "plane": "XY",
          "w0": -2.3,
          "w1": 2.3,
          "shape": "circle",
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 7.25
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 0.0,
              "r": 5.1
            }
          ]
        }
      ],
      "partNumber": "SC-106",
      "solidworksName": "舵轮主销防尘迷宫密封盖",
      "solidworksFile": "舵轮主销防尘迷宫密封盖.SLDPRT",
      "drawingUrl": "docs/零件图册/P71.html",
      "featureCount": 2
    }
  ],
  "placements": [
    {
      "instanceId": "I001",
      "partId": "P01",
      "partName": "铝合金主底板",
      "solidworksFile": "铝合金主底板.SLDPRT",
      "label": "铝合金主底板(上层Z=46)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#475569",
      "position": [
        0.0,
        0.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I002",
      "partId": "P02",
      "partName": "底部中置传动副底板",
      "solidworksFile": "底部中置传动副底板.SLDPRT",
      "label": "底部中置传动副底板(下层中置窄板Z=20, Y∈[-28,+28])",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#334155",
      "position": [
        0.0,
        0.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I003",
      "partId": "P04",
      "partName": "中置齿轮箱左侧立板",
      "solidworksFile": "中置齿轮箱左侧立板.SLDPRT",
      "label": "中置齿轮箱左侧立板(Y=+26)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#475569",
      "position": [
        0.0,
        26.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I004",
      "partId": "P05",
      "partName": "中置齿轮箱右侧立板",
      "solidworksFile": "中置齿轮箱右侧立板.SLDPRT",
      "label": "中置齿轮箱右侧立板(Y=-26)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#475569",
      "position": [
        0.0,
        -26.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I005",
      "partId": "P03",
      "partName": "四角舵轮高架悬臂梁",
      "solidworksFile": "四角舵轮高架悬臂梁.SLDPRT",
      "label": "四角舵轮高架悬臂梁(左前)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#64748b",
      "position": [
        72.0,
        58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I006",
      "partId": "P03",
      "partName": "四角舵轮高架悬臂梁",
      "solidworksFile": "四角舵轮高架悬臂梁.SLDPRT",
      "label": "四角舵轮高架悬臂梁(右前)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#64748b",
      "position": [
        72.0,
        -58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I007",
      "partId": "P03",
      "partName": "四角舵轮高架悬臂梁",
      "solidworksFile": "四角舵轮高架悬臂梁.SLDPRT",
      "label": "四角舵轮高架悬臂梁(左后)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#64748b",
      "position": [
        -72.0,
        58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I008",
      "partId": "P03",
      "partName": "四角舵轮高架悬臂梁",
      "solidworksFile": "四角舵轮高架悬臂梁.SLDPRT",
      "label": "四角舵轮高架悬臂梁(右后)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#64748b",
      "position": [
        -72.0,
        -58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I009",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(左X=-62)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -62.0,
        24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I010",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(右X=-62)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -62.0,
        -24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I011",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(左X=-20)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -20.0,
        24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I012",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(右X=-20)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -20.0,
        -24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I013",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(左X=20)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        20.0,
        24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I014",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(右X=20)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        20.0,
        -24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I015",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(左X=62)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        62.0,
        24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I016",
      "partId": "P06",
      "partName": "底盘层间六角支撑柱",
      "solidworksFile": "底盘层间六角支撑柱.SLDPRT",
      "label": "底盘层间六角支撑柱(右X=62)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        62.0,
        -24.0,
        33.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I017",
      "partId": "P07",
      "partName": "车头防撞缓冲前杠",
      "solidworksFile": "车头防撞缓冲前杠.SLDPRT",
      "label": "车头防撞缓冲前杠",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#0284c7",
      "position": [
        104.0,
        0.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I018",
      "partId": "P08",
      "partName": "车尾铝合金定位后杠",
      "solidworksFile": "车尾铝合金定位后杠.SLDPRT",
      "label": "车尾铝合金定位后杠",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#0369a1",
      "position": [
        -103.0,
        0.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I019",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(横主轴左)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        -48.0,
        22.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I020",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(横主轴左)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -48.0,
        22.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I021",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(横主轴右)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        -48.0,
        -22.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I022",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(横主轴右)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -48.0,
        -22.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I023",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(左前高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        72.0,
        44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I024",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(左前高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        72.0,
        44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I025",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(右前高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        72.0,
        -44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I026",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(右前高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        72.0,
        -44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I027",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(左后高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        -72.0,
        44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I028",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(左后高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -72.0,
        44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I029",
      "partId": "P09",
      "partName": "横轴法兰轴承座",
      "solidworksFile": "横轴法兰轴承座.SLDPRT",
      "label": "横轴法兰轴承座(右后高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#3b82f6",
      "position": [
        -72.0,
        -44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I030",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(右后高架)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -72.0,
        -44.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I031",
      "partId": "P10",
      "partName": "纵轴立式双轴承座",
      "solidworksFile": "纵轴立式双轴承座.SLDPRT",
      "label": "纵轴立式双轴承座(后段)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#2563eb",
      "position": [
        -58.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I032",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(纵轴后段)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -58.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I033",
      "partId": "P10",
      "partName": "纵轴立式双轴承座",
      "solidworksFile": "纵轴立式双轴承座.SLDPRT",
      "label": "纵轴立式双轴承座(中后)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#2563eb",
      "position": [
        -18.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I034",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(纵轴中后)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -18.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I035",
      "partId": "P10",
      "partName": "纵轴立式双轴承座",
      "solidworksFile": "纵轴立式双轴承座.SLDPRT",
      "label": "纵轴立式双轴承座(中前)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#2563eb",
      "position": [
        18.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I036",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(纵轴中前)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        18.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I037",
      "partId": "P10",
      "partName": "纵轴立式双轴承座",
      "solidworksFile": "纵轴立式双轴承座.SLDPRT",
      "label": "纵轴立式双轴承座(前段)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#2563eb",
      "position": [
        54.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I038",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(纵轴前段)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        54.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I039",
      "partId": "P70",
      "partName": "中置齿轮箱横向加强隔板",
      "solidworksFile": "中置齿轮箱横向加强隔板.SLDPRT",
      "label": "中置齿轮箱横向加强隔板(后隔墙X=-28)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#475569",
      "position": [
        -28.0,
        0.0,
        32.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I040",
      "partId": "P70",
      "partName": "中置齿轮箱横向加强隔板",
      "solidworksFile": "中置齿轮箱横向加强隔板.SLDPRT",
      "label": "中置齿轮箱横向加强隔板(前隔墙X=+28)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#475569",
      "position": [
        28.0,
        0.0,
        32.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 1,
      "motion": "static"
    },
    {
      "instanceId": "I041",
      "partId": "P11",
      "partName": "N20电机固定座",
      "solidworksFile": "N20电机固定座.SLDPRT",
      "label": "N20电机固定座",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1d4ed8",
      "position": [
        -25.5,
        6.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "static"
    },
    {
      "instanceId": "I042",
      "partId": "P12",
      "partName": "N20电机抱箍压盖",
      "solidworksFile": "N20电机抱箍压盖.SLDPRT",
      "label": "N20电机抱箍压盖",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#3b82f6",
      "position": [
        -25.5,
        6.0,
        38.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "static"
    },
    {
      "instanceId": "I043",
      "partId": "M01",
      "partName": "N20直流减速电机",
      "solidworksFile": "N20直流减速电机.SLDPRT",
      "label": "N20直流减速电机",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#64748b",
      "position": [
        -25.5,
        2.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "static"
    },
    {
      "instanceId": "I044",
      "partId": "G02",
      "partName": "18齿电机主动齿轮",
      "solidworksFile": "18齿电机主动齿轮.SLDPRT",
      "label": "18齿电机主动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#f59e0b",
      "position": [
        -25.5,
        16.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "motor_pinion"
    },
    {
      "instanceId": "I045",
      "partId": "G01",
      "partName": "72齿主减速大齿轮",
      "solidworksFile": "72齿主减速大齿轮.SLDPRT",
      "label": "72齿主减速大齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#eab308",
      "position": [
        -48.0,
        16.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I046",
      "partId": "P13",
      "partName": "过载保护摩擦离合器盘",
      "solidworksFile": "过载保护摩擦离合器盘.SLDPRT",
      "label": "过载保护摩擦离合器盘",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#d97706",
      "position": [
        -48.0,
        10.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I047",
      "partId": "SP2",
      "partName": "离合器碟形压紧弹簧",
      "solidworksFile": "离合器碟形压紧弹簧.SLDPRT",
      "label": "离合器碟形压紧弹簧",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#a8a29e",
      "position": [
        -48.0,
        5.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I048",
      "partId": "P14",
      "partName": "底部横向主传动轴",
      "solidworksFile": "底部横向主传动轴.SLDPRT",
      "label": "底部横向主传动轴",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#e2e8f0",
      "position": [
        -48.0,
        0.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I049",
      "partId": "G08",
      "partName": "24齿中央分动主动齿轮",
      "solidworksFile": "24齿中央分动主动齿轮.SLDPRT",
      "label": "24齿中央分动主动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#f59e0b",
      "position": [
        -48.0,
        -12.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I050",
      "partId": "G09",
      "partName": "24齿中央分动从动齿轮",
      "solidworksFile": "24齿中央分动从动齿轮.SLDPRT",
      "label": "24齿中央分动从动齿轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#fbbf24",
      "position": [
        -48.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I051",
      "partId": "G13",
      "partName": "48齿中央行星内齿圈壳",
      "solidworksFile": "48齿中央行星内齿圈壳.SLDPRT",
      "label": "48齿中央行星内齿圈壳",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#f59e0b",
      "position": [
        -6.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I052",
      "partId": "G14",
      "partName": "24齿行星差速太阳轮",
      "solidworksFile": "24齿行星差速太阳轮.SLDPRT",
      "label": "24齿行星差速太阳轮",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#fbbf24",
      "position": [
        -6.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I053",
      "partId": "G15",
      "partName": "12齿行星差速小齿轮",
      "solidworksFile": "12齿行星差速小齿轮.SLDPRT",
      "label": "12齿行星差速小齿轮(#1)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#fde047",
      "position": [
        -6.0,
        7.5,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I054",
      "partId": "G15",
      "partName": "12齿行星差速小齿轮",
      "solidworksFile": "12齿行星差速小齿轮.SLDPRT",
      "label": "12齿行星差速小齿轮(#2)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#fde047",
      "position": [
        -6.0,
        -3.8,
        34.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I055",
      "partId": "G15",
      "partName": "12齿行星差速小齿轮",
      "solidworksFile": "12齿行星差速小齿轮.SLDPRT",
      "label": "12齿行星差速小齿轮(#3)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#fde047",
      "position": [
        -6.0,
        -3.8,
        21.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I056",
      "partId": "P60",
      "partName": "三销行星齿轮架总成",
      "solidworksFile": "三销行星齿轮架总成.SLDPRT",
      "label": "三销行星齿轮架总成",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#eab308",
      "position": [
        -1.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I057",
      "partId": "P61",
      "partName": "双速犬牙啮合套换挡滑块",
      "solidworksFile": "双速犬牙啮合套换挡滑块.SLDPRT",
      "label": "双速犬牙啮合套换挡滑块",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#f97316",
      "position": [
        9.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I058",
      "partId": "P62",
      "partName": "高低速换挡拨叉与锁紧座",
      "solidworksFile": "高低速换挡拨叉与锁紧座.SLDPRT",
      "label": "高低速换挡拨叉与锁紧座",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#ea580c",
      "position": [
        9.0,
        -12.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "static"
    },
    {
      "instanceId": "I059",
      "partId": "P15",
      "partName": "底部纵向贯通传动主轴",
      "solidworksFile": "底部纵向贯通传动主轴.SLDPRT",
      "label": "底部纵向贯通传动主轴",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#cbd5e1",
      "position": [
        0.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I060",
      "partId": "P16",
      "partName": "万向十字联轴器节",
      "solidworksFile": "万向十字联轴器节.SLDPRT",
      "label": "万向十字联轴器节(前)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#94a3b8",
      "position": [
        36.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I061",
      "partId": "P16",
      "partName": "万向十字联轴器节",
      "solidworksFile": "万向十字联轴器节.SLDPRT",
      "label": "万向十字联轴器节(后)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#94a3b8",
      "position": [
        -36.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I062",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(X=-64)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -64.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I063",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(X=-24)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -24.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I064",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(X=24)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        24.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I065",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(X=60)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        60.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I066",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(横轴Y=-19)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -48.0,
        -19.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I067",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(横轴Y=19)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -48.0,
        19.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I068",
      "partId": "P18",
      "partName": "齿轮箱透明防尘上盖",
      "solidworksFile": "齿轮箱透明防尘上盖.SLDPRT",
      "label": "齿轮箱透明防尘上盖",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#38bdf8",
      "position": [
        -10.0,
        0.0,
        43.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "static"
    },
    {
      "instanceId": "I069",
      "partId": "P19",
      "partName": "前桥十字正交分动箱壳",
      "solidworksFile": "前桥十字正交分动箱壳.SLDPRT",
      "label": "前桥十字正交分动箱壳(X=+72,Y=0)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0284c7",
      "position": [
        72.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I070",
      "partId": "P20",
      "partName": "后桥十字正交分动箱壳",
      "solidworksFile": "后桥十字正交分动箱壳.SLDPRT",
      "label": "后桥十字正交分动箱壳(X=-72,Y=0)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0369a1",
      "position": [
        -72.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I071",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(前分动输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        66.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I072",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(后分动输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        -66.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "long_shaft"
    },
    {
      "instanceId": "I073",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(前桥左出)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        72.0,
        8.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I074",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(前桥右出)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        72.0,
        -8.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I075",
      "partId": "P21",
      "partName": "分动箱法兰端盖",
      "solidworksFile": "分动箱法兰端盖.SLDPRT",
      "label": "分动箱法兰端盖(左前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#38bdf8",
      "position": [
        72.0,
        18.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I076",
      "partId": "P23",
      "partName": "半轴高架转角齿轮箱座",
      "solidworksFile": "半轴高架转角齿轮箱座.SLDPRT",
      "label": "半轴高架转角齿轮箱座(左前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0284c7",
      "position": [
        72.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I077",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(左前下层Z=28)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        72.0,
        22.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I078",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(左前上层Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        72.0,
        22.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I079",
      "partId": "P24",
      "partName": "闭环橡胶同步齿形带",
      "solidworksFile": "闭环橡胶同步齿形带.SLDPRT",
      "label": "闭环橡胶同步齿形带(左前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#1e293b",
      "position": [
        72.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I080",
      "partId": "P25",
      "partName": "同步带偏心张紧轮",
      "solidworksFile": "同步带偏心张紧轮.SLDPRT",
      "label": "同步带偏心张紧轮(左前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        64.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I081",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(左前张紧轮)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        64.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I082",
      "partId": "P22",
      "partName": "横向分动传动半轴",
      "solidworksFile": "横向分动传动半轴.SLDPRT",
      "label": "横向分动传动半轴(左前高架Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#e2e8f0",
      "position": [
        72.0,
        40.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I083",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(左前主销顶输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        72.0,
        55.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I084",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(左前同轴竖轴顶)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        72.0,
        58.0,
        48.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I085",
      "partId": "P21",
      "partName": "分动箱法兰端盖",
      "solidworksFile": "分动箱法兰端盖.SLDPRT",
      "label": "分动箱法兰端盖(右前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#38bdf8",
      "position": [
        72.0,
        -18.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I086",
      "partId": "P23",
      "partName": "半轴高架转角齿轮箱座",
      "solidworksFile": "半轴高架转角齿轮箱座.SLDPRT",
      "label": "半轴高架转角齿轮箱座(右前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0284c7",
      "position": [
        72.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I087",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(右前下层Z=28)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        72.0,
        -22.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I088",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(右前上层Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        72.0,
        -22.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I089",
      "partId": "P24",
      "partName": "闭环橡胶同步齿形带",
      "solidworksFile": "闭环橡胶同步齿形带.SLDPRT",
      "label": "闭环橡胶同步齿形带(右前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#1e293b",
      "position": [
        72.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I090",
      "partId": "P25",
      "partName": "同步带偏心张紧轮",
      "solidworksFile": "同步带偏心张紧轮.SLDPRT",
      "label": "同步带偏心张紧轮(右前)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        64.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I091",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(右前张紧轮)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        64.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I092",
      "partId": "P22",
      "partName": "横向分动传动半轴",
      "solidworksFile": "横向分动传动半轴.SLDPRT",
      "label": "横向分动传动半轴(右前高架Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#e2e8f0",
      "position": [
        72.0,
        -40.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I093",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(右前主销顶输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        72.0,
        -55.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I094",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(右前同轴竖轴顶)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        72.0,
        -58.0,
        48.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I095",
      "partId": "P21",
      "partName": "分动箱法兰端盖",
      "solidworksFile": "分动箱法兰端盖.SLDPRT",
      "label": "分动箱法兰端盖(左后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#38bdf8",
      "position": [
        -72.0,
        18.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I096",
      "partId": "P23",
      "partName": "半轴高架转角齿轮箱座",
      "solidworksFile": "半轴高架转角齿轮箱座.SLDPRT",
      "label": "半轴高架转角齿轮箱座(左后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0284c7",
      "position": [
        -72.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I097",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(左后下层Z=28)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        22.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I098",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(左后上层Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        22.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I099",
      "partId": "P24",
      "partName": "闭环橡胶同步齿形带",
      "solidworksFile": "闭环橡胶同步齿形带.SLDPRT",
      "label": "闭环橡胶同步齿形带(左后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#1e293b",
      "position": [
        -72.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I100",
      "partId": "P25",
      "partName": "同步带偏心张紧轮",
      "solidworksFile": "同步带偏心张紧轮.SLDPRT",
      "label": "同步带偏心张紧轮(左后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        -64.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I101",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(左后张紧轮)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        -64.0,
        22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I102",
      "partId": "P22",
      "partName": "横向分动传动半轴",
      "solidworksFile": "横向分动传动半轴.SLDPRT",
      "label": "横向分动传动半轴(左后高架Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#e2e8f0",
      "position": [
        -72.0,
        40.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I103",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(左后主销顶输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        -72.0,
        55.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I104",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(左后同轴竖轴顶)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        -72.0,
        58.0,
        48.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I105",
      "partId": "P21",
      "partName": "分动箱法兰端盖",
      "solidworksFile": "分动箱法兰端盖.SLDPRT",
      "label": "分动箱法兰端盖(右后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#38bdf8",
      "position": [
        -72.0,
        -18.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I106",
      "partId": "P23",
      "partName": "半轴高架转角齿轮箱座",
      "solidworksFile": "半轴高架转角齿轮箱座.SLDPRT",
      "label": "半轴高架转角齿轮箱座(右后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#0284c7",
      "position": [
        -72.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I107",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(右后下层Z=28)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        -22.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I108",
      "partId": "G11",
      "partName": "20齿同步带轮",
      "solidworksFile": "20齿同步带轮.SLDPRT",
      "label": "20齿同步带轮(右后上层Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        -22.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I109",
      "partId": "P24",
      "partName": "闭环橡胶同步齿形带",
      "solidworksFile": "闭环橡胶同步齿形带.SLDPRT",
      "label": "闭环橡胶同步齿形带(右后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#1e293b",
      "position": [
        -72.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I110",
      "partId": "P25",
      "partName": "同步带偏心张紧轮",
      "solidworksFile": "同步带偏心张紧轮.SLDPRT",
      "label": "同步带偏心张紧轮(右后)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        -64.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I111",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(右后张紧轮)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        -64.0,
        -22.0,
        39.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "static"
    },
    {
      "instanceId": "I112",
      "partId": "P22",
      "partName": "横向分动传动半轴",
      "solidworksFile": "横向分动传动半轴.SLDPRT",
      "label": "横向分动传动半轴(右后高架Z=50)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#e2e8f0",
      "position": [
        -72.0,
        -40.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I113",
      "partId": "G06",
      "partName": "16齿正交主动锥齿轮",
      "solidworksFile": "16齿正交主动锥齿轮.SLDPRT",
      "label": "16齿正交主动锥齿轮(右后主销顶输入)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#d97706",
      "position": [
        -72.0,
        -55.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I114",
      "partId": "G10",
      "partName": "16齿正交从动锥齿轮",
      "solidworksFile": "16齿正交从动锥齿轮.SLDPRT",
      "label": "16齿正交从动锥齿轮(右后同轴竖轴顶)",
      "subsystem": "03 前后桥正交锥齿分动箱与同步带升距传动链",
      "color": "#f59e0b",
      "position": [
        -72.0,
        -58.0,
        48.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I115",
      "partId": "P26",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#2563eb",
      "position": [
        72.0,
        58.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I116",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左前上)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I117",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左前下)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        58.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I118",
      "partId": "P71",
      "partName": "舵轮主销防尘迷宫密封盖",
      "solidworksFile": "舵轮主销防尘迷宫密封盖.SLDPRT",
      "label": "舵轮主销防尘迷宫密封盖(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        72.0,
        58.0,
        38.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I119",
      "partId": "P27",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        72.0,
        58.0,
        45.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I120",
      "partId": "P28",
      "partName": "舵轮同轴中心传力竖轴",
      "solidworksFile": "舵轮同轴中心传力竖轴.SLDPRT",
      "label": "舵轮同轴中心传力竖轴(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f8fafc",
      "position": [
        72.0,
        58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I121",
      "partId": "B05",
      "partName": "主销内孔推力球轴承",
      "solidworksFile": "主销内孔推力球轴承.SLDPRT",
      "label": "主销内孔推力球轴承(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#94a3b8",
      "position": [
        72.0,
        58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I122",
      "partId": "P29",
      "partName": "全向舵轮U型转向叉架",
      "solidworksFile": "全向舵轮U型转向叉架.SLDPRT",
      "label": "全向舵轮U型转向叉架(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0284c7",
      "position": [
        72.0,
        58.0,
        25.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I123",
      "partId": "P30",
      "partName": "舵轮侧置锥齿轮减速盒",
      "solidworksFile": "舵轮侧置锥齿轮减速盒.SLDPRT",
      "label": "舵轮侧置锥齿轮减速盒(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0369a1",
      "position": [
        72.0,
        52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I124",
      "partId": "G07",
      "partName": "20齿舵轮轮边锥齿圈",
      "solidworksFile": "20齿舵轮轮边锥齿圈.SLDPRT",
      "label": "20齿舵轮轮边锥齿圈(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f59e0b",
      "position": [
        72.0,
        53.5,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I125",
      "partId": "P31",
      "partName": "舵轮精密固定横轴",
      "solidworksFile": "舵轮精密固定横轴.SLDPRT",
      "label": "舵轮精密固定横轴(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I126",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(左前轮毂)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I127",
      "partId": "P32",
      "partName": "高抓地全向舵轮铝合金轮毂",
      "solidworksFile": "高抓地全向舵轮铝合金轮毂.SLDPRT",
      "label": "高抓地全向舵轮铝合金轮毂(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#64748b",
      "position": [
        72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I128",
      "partId": "W01",
      "partName": "高抓地全向舵轮防滑橡胶胎",
      "solidworksFile": "高抓地全向舵轮防滑橡胶胎.SLDPRT",
      "label": "高抓地全向舵轮防滑橡胶胎(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#1e293b",
      "position": [
        72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I129",
      "partId": "P33",
      "partName": "舵轮端面锁紧法兰盖",
      "solidworksFile": "舵轮端面锁紧法兰盖.SLDPRT",
      "label": "舵轮端面锁紧法兰盖(左前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#ef4444",
      "position": [
        72.0,
        64.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I130",
      "partId": "P26",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#2563eb",
      "position": [
        72.0,
        -58.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I131",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右前上)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        -58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I132",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右前下)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        -58.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I133",
      "partId": "P71",
      "partName": "舵轮主销防尘迷宫密封盖",
      "solidworksFile": "舵轮主销防尘迷宫密封盖.SLDPRT",
      "label": "舵轮主销防尘迷宫密封盖(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        72.0,
        -58.0,
        38.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I134",
      "partId": "P27",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        72.0,
        -58.0,
        45.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I135",
      "partId": "P28",
      "partName": "舵轮同轴中心传力竖轴",
      "solidworksFile": "舵轮同轴中心传力竖轴.SLDPRT",
      "label": "舵轮同轴中心传力竖轴(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f8fafc",
      "position": [
        72.0,
        -58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I136",
      "partId": "B05",
      "partName": "主销内孔推力球轴承",
      "solidworksFile": "主销内孔推力球轴承.SLDPRT",
      "label": "主销内孔推力球轴承(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#94a3b8",
      "position": [
        72.0,
        -58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I137",
      "partId": "P29",
      "partName": "全向舵轮U型转向叉架",
      "solidworksFile": "全向舵轮U型转向叉架.SLDPRT",
      "label": "全向舵轮U型转向叉架(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0284c7",
      "position": [
        72.0,
        -58.0,
        25.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I138",
      "partId": "P30",
      "partName": "舵轮侧置锥齿轮减速盒",
      "solidworksFile": "舵轮侧置锥齿轮减速盒.SLDPRT",
      "label": "舵轮侧置锥齿轮减速盒(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0369a1",
      "position": [
        72.0,
        -52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I139",
      "partId": "G07",
      "partName": "20齿舵轮轮边锥齿圈",
      "solidworksFile": "20齿舵轮轮边锥齿圈.SLDPRT",
      "label": "20齿舵轮轮边锥齿圈(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f59e0b",
      "position": [
        72.0,
        -53.5,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I140",
      "partId": "P31",
      "partName": "舵轮精密固定横轴",
      "solidworksFile": "舵轮精密固定横轴.SLDPRT",
      "label": "舵轮精密固定横轴(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I141",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(右前轮毂)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I142",
      "partId": "P32",
      "partName": "高抓地全向舵轮铝合金轮毂",
      "solidworksFile": "高抓地全向舵轮铝合金轮毂.SLDPRT",
      "label": "高抓地全向舵轮铝合金轮毂(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#64748b",
      "position": [
        72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I143",
      "partId": "W01",
      "partName": "高抓地全向舵轮防滑橡胶胎",
      "solidworksFile": "高抓地全向舵轮防滑橡胶胎.SLDPRT",
      "label": "高抓地全向舵轮防滑橡胶胎(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#1e293b",
      "position": [
        72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I144",
      "partId": "P33",
      "partName": "舵轮端面锁紧法兰盖",
      "solidworksFile": "舵轮端面锁紧法兰盖.SLDPRT",
      "label": "舵轮端面锁紧法兰盖(右前)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#ef4444",
      "position": [
        72.0,
        -64.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I145",
      "partId": "P26",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#2563eb",
      "position": [
        -72.0,
        58.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I146",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左后上)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I147",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左后下)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        58.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I148",
      "partId": "P71",
      "partName": "舵轮主销防尘迷宫密封盖",
      "solidworksFile": "舵轮主销防尘迷宫密封盖.SLDPRT",
      "label": "舵轮主销防尘迷宫密封盖(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -72.0,
        58.0,
        38.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I149",
      "partId": "P27",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -72.0,
        58.0,
        45.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I150",
      "partId": "P28",
      "partName": "舵轮同轴中心传力竖轴",
      "solidworksFile": "舵轮同轴中心传力竖轴.SLDPRT",
      "label": "舵轮同轴中心传力竖轴(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f8fafc",
      "position": [
        -72.0,
        58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I151",
      "partId": "B05",
      "partName": "主销内孔推力球轴承",
      "solidworksFile": "主销内孔推力球轴承.SLDPRT",
      "label": "主销内孔推力球轴承(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#94a3b8",
      "position": [
        -72.0,
        58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I152",
      "partId": "P29",
      "partName": "全向舵轮U型转向叉架",
      "solidworksFile": "全向舵轮U型转向叉架.SLDPRT",
      "label": "全向舵轮U型转向叉架(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0284c7",
      "position": [
        -72.0,
        58.0,
        25.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I153",
      "partId": "P30",
      "partName": "舵轮侧置锥齿轮减速盒",
      "solidworksFile": "舵轮侧置锥齿轮减速盒.SLDPRT",
      "label": "舵轮侧置锥齿轮减速盒(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0369a1",
      "position": [
        -72.0,
        52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I154",
      "partId": "G07",
      "partName": "20齿舵轮轮边锥齿圈",
      "solidworksFile": "20齿舵轮轮边锥齿圈.SLDPRT",
      "label": "20齿舵轮轮边锥齿圈(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f59e0b",
      "position": [
        -72.0,
        53.5,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I155",
      "partId": "P31",
      "partName": "舵轮精密固定横轴",
      "solidworksFile": "舵轮精密固定横轴.SLDPRT",
      "label": "舵轮精密固定横轴(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I156",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(左后轮毂)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I157",
      "partId": "P32",
      "partName": "高抓地全向舵轮铝合金轮毂",
      "solidworksFile": "高抓地全向舵轮铝合金轮毂.SLDPRT",
      "label": "高抓地全向舵轮铝合金轮毂(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#64748b",
      "position": [
        -72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I158",
      "partId": "W01",
      "partName": "高抓地全向舵轮防滑橡胶胎",
      "solidworksFile": "高抓地全向舵轮防滑橡胶胎.SLDPRT",
      "label": "高抓地全向舵轮防滑橡胶胎(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#1e293b",
      "position": [
        -72.0,
        58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I159",
      "partId": "P33",
      "partName": "舵轮端面锁紧法兰盖",
      "solidworksFile": "舵轮端面锁紧法兰盖.SLDPRT",
      "label": "舵轮端面锁紧法兰盖(左后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#ef4444",
      "position": [
        -72.0,
        64.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I160",
      "partId": "P26",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#2563eb",
      "position": [
        -72.0,
        -58.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I161",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右后上)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        -58.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I162",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右后下)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        -58.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I163",
      "partId": "P71",
      "partName": "舵轮主销防尘迷宫密封盖",
      "solidworksFile": "舵轮主销防尘迷宫密封盖.SLDPRT",
      "label": "舵轮主销防尘迷宫密封盖(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -72.0,
        -58.0,
        38.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I164",
      "partId": "P27",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -72.0,
        -58.0,
        45.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I165",
      "partId": "P28",
      "partName": "舵轮同轴中心传力竖轴",
      "solidworksFile": "舵轮同轴中心传力竖轴.SLDPRT",
      "label": "舵轮同轴中心传力竖轴(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f8fafc",
      "position": [
        -72.0,
        -58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I166",
      "partId": "B05",
      "partName": "主销内孔推力球轴承",
      "solidworksFile": "主销内孔推力球轴承.SLDPRT",
      "label": "主销内孔推力球轴承(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#94a3b8",
      "position": [
        -72.0,
        -58.0,
        36.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "static"
    },
    {
      "instanceId": "I167",
      "partId": "P29",
      "partName": "全向舵轮U型转向叉架",
      "solidworksFile": "全向舵轮U型转向叉架.SLDPRT",
      "label": "全向舵轮U型转向叉架(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0284c7",
      "position": [
        -72.0,
        -58.0,
        25.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I168",
      "partId": "P30",
      "partName": "舵轮侧置锥齿轮减速盒",
      "solidworksFile": "舵轮侧置锥齿轮减速盒.SLDPRT",
      "label": "舵轮侧置锥齿轮减速盒(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#0369a1",
      "position": [
        -72.0,
        -52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I169",
      "partId": "G07",
      "partName": "20齿舵轮轮边锥齿圈",
      "solidworksFile": "20齿舵轮轮边锥齿圈.SLDPRT",
      "label": "20齿舵轮轮边锥齿圈(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#f59e0b",
      "position": [
        -72.0,
        -53.5,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I170",
      "partId": "P31",
      "partName": "舵轮精密固定横轴",
      "solidworksFile": "舵轮精密固定横轴.SLDPRT",
      "label": "舵轮精密固定横轴(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I171",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(右后轮毂)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I172",
      "partId": "P32",
      "partName": "高抓地全向舵轮铝合金轮毂",
      "solidworksFile": "高抓地全向舵轮铝合金轮毂.SLDPRT",
      "label": "高抓地全向舵轮铝合金轮毂(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#64748b",
      "position": [
        -72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I173",
      "partId": "W01",
      "partName": "高抓地全向舵轮防滑橡胶胎",
      "solidworksFile": "高抓地全向舵轮防滑橡胶胎.SLDPRT",
      "label": "高抓地全向舵轮防滑橡胶胎(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#1e293b",
      "position": [
        -72.0,
        -58.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I174",
      "partId": "P33",
      "partName": "舵轮端面锁紧法兰盖",
      "solidworksFile": "舵轮端面锁紧法兰盖.SLDPRT",
      "label": "舵轮端面锁紧法兰盖(右后)",
      "subsystem": "04 四轮独立360度同轴全向舵轮总成(非麦轮)",
      "color": "#ef4444",
      "position": [
        -72.0,
        -64.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I175",
      "partId": "G03",
      "partName": "0.5模单头自锁蜗杆",
      "solidworksFile": "0.5模单头自锁蜗杆.SLDPRT",
      "label": "0.5模单头自锁蜗杆",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#d97706",
      "position": [
        -48.0,
        0.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I176",
      "partId": "G04",
      "partName": "30齿青铜蜗轮",
      "solidworksFile": "30齿青铜蜗轮.SLDPRT",
      "label": "30齿青铜蜗轮",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#b45309",
      "position": [
        -34.0,
        0.0,
        30.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I177",
      "partId": "P34",
      "partName": "双凸轮同轴传力竖轴",
      "solidworksFile": "双凸轮同轴传力竖轴.SLDPRT",
      "label": "双凸轮同轴传力竖轴",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#cbd5e1",
      "position": [
        -34.0,
        0.0,
        46.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I178",
      "partId": "P35",
      "partName": "凸轮轴立式双轴承座",
      "solidworksFile": "凸轮轴立式双轴承座.SLDPRT",
      "label": "凸轮轴立式双轴承座",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#3b82f6",
      "position": [
        -34.0,
        0.0,
        48.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I179",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(凸轮座上)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -34.0,
        0.0,
        52.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I180",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(凸轮座下)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#94a3b8",
      "position": [
        -34.0,
        0.0,
        44.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I181",
      "partId": "C01",
      "partName": "主航向五次多项式转向凸轮",
      "solidworksFile": "主航向五次多项式转向凸轮.SLDPRT",
      "label": "主航向五次多项式转向凸轮(上层Z=62)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#ef4444",
      "position": [
        -34.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I182",
      "partId": "P36",
      "partName": "凸轮相位微调分度盘",
      "solidworksFile": "凸轮相位微调分度盘.SLDPRT",
      "label": "凸轮相位微调分度盘(Z=58.5)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#facc15",
      "position": [
        -34.0,
        0.0,
        58.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I183",
      "partId": "C02",
      "partName": "差动相位共轭副凸轮盘",
      "solidworksFile": "差动相位共轭副凸轮盘.SLDPRT",
      "label": "差动相位共轭副凸轮盘(中层Z=55)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#f97316",
      "position": [
        -34.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft_sub"
    },
    {
      "instanceId": "I184",
      "partId": "C03",
      "partName": "横向蟹行偏置凸轮盘",
      "solidworksFile": "横向蟹行偏置凸轮盘.SLDPRT",
      "label": "横向蟹行偏置凸轮盘(下层Z=37)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#eab308",
      "position": [
        -34.0,
        0.0,
        37.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I185",
      "partId": "P56",
      "partName": "槽轮主动拨盘与止动圆弧盘",
      "solidworksFile": "槽轮主动拨盘与止动圆弧盘.SLDPRT",
      "label": "槽轮主动拨盘与止动圆弧盘",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#f43f5e",
      "position": [
        -34.0,
        0.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I186",
      "partId": "P57",
      "partName": "槽轮间歇拨销与滚针套",
      "solidworksFile": "槽轮间歇拨销与滚针套.SLDPRT",
      "label": "槽轮间歇拨销与滚针套",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#fda4af",
      "position": [
        -24.0,
        10.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I187",
      "partId": "P58",
      "partName": "槽轮分度立式精密转轴",
      "solidworksFile": "槽轮分度立式精密转轴.SLDPRT",
      "label": "槽轮分度立式精密转轴",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#e2e8f0",
      "position": [
        -18.0,
        14.0,
        42.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "geneva_wheel"
    },
    {
      "instanceId": "I188",
      "partId": "G12",
      "partName": "四槽马耳他间歇分度槽轮",
      "solidworksFile": "四槽马耳他间歇分度槽轮.SLDPRT",
      "label": "四槽马耳他间歇分度槽轮",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#ec4899",
      "position": [
        -18.0,
        14.0,
        41.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "geneva_wheel"
    },
    {
      "instanceId": "I189",
      "partId": "P59",
      "partName": "模态自动切换拨叉连杆",
      "solidworksFile": "模态自动切换拨叉连杆.SLDPRT",
      "label": "模态自动切换拨叉连杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#db2777",
      "position": [
        -34.0,
        8.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I190",
      "partId": "P37",
      "partName": "主航向滚子推杆滑架",
      "solidworksFile": "主航向滚子推杆滑架.SLDPRT",
      "label": "主航向滚子推杆滑架",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#10b981",
      "position": [
        -34.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I191",
      "partId": "P38",
      "partName": "差动副凸轮滚子推杆滑架",
      "solidworksFile": "差动副凸轮滚子推杆滑架.SLDPRT",
      "label": "差动副凸轮滚子推杆滑架",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#34d399",
      "position": [
        -34.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I192",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(主凸轮前)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#94a3b8",
      "position": [
        -14.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I193",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(主凸轮后)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#94a3b8",
      "position": [
        -54.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I194",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(副凸轮前)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#94a3b8",
      "position": [
        -16.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I195",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(副凸轮后)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#94a3b8",
      "position": [
        -52.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I196",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(X=18)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#a8a29e",
      "position": [
        18.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I197",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(X=44)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#a8a29e",
      "position": [
        44.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I198",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(X=-58)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#a8a29e",
      "position": [
        -58.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I199",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(X=-66)",
      "subsystem": "05 1:30蜗轮蜗杆与三层共轭凸轮转向发生器",
      "color": "#a8a29e",
      "position": [
        -66.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I200",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(凸轮轴顶)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -34.0,
        0.0,
        68.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I201",
      "partId": "P17",
      "partName": "传动轴轴向限位锁紧环",
      "solidworksFile": "传动轴轴向限位锁紧环.SLDPRT",
      "label": "传动轴轴向限位锁紧环(凸轮轴底)",
      "subsystem": "02 单电机1:4主减速与过载离合中央分动箱",
      "color": "#1e293b",
      "position": [
        -34.0,
        0.0,
        24.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I202",
      "partId": "P39",
      "partName": "纵向同步转向主推杆",
      "solidworksFile": "纵向同步转向主推杆.SLDPRT",
      "label": "纵向同步转向主推杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#10b981",
      "position": [
        28.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I203",
      "partId": "P40",
      "partName": "后桥差动转向副推杆",
      "solidworksFile": "后桥差动转向副推杆.SLDPRT",
      "label": "后桥差动转向副推杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#34d399",
      "position": [
        -62.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I204",
      "partId": "P66",
      "partName": "可变杠杆比转向调节摇杆",
      "solidworksFile": "可变杠杆比转向调节摇杆.SLDPRT",
      "label": "可变杠杆比转向调节摇杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#14b8a6",
      "position": [
        36.0,
        0.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I205",
      "partId": "P69",
      "partName": "微调滑块导轨支座",
      "solidworksFile": "微调滑块导轨支座.SLDPRT",
      "label": "微调滑块导轨支座",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0d9488",
      "position": [
        36.0,
        8.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I206",
      "partId": "P67",
      "partName": "千分尺螺纹偏航微调丝杠",
      "solidworksFile": "千分尺螺纹偏航微调丝杠.SLDPRT",
      "label": "千分尺螺纹偏航微调丝杠",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        36.0,
        16.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I207",
      "partId": "P68",
      "partName": "微分刻度游标调节旋钮",
      "solidworksFile": "微分刻度游标调节旋钮.SLDPRT",
      "label": "微分刻度游标调节旋钮",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#ef4444",
      "position": [
        36.0,
        30.0,
        62.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I208",
      "partId": "P41",
      "partName": "转向推杆直线导轨座",
      "solidworksFile": "转向推杆直线导轨座.SLDPRT",
      "label": "转向推杆直线导轨座(后段)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#059669",
      "position": [
        -60.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I209",
      "partId": "P41",
      "partName": "转向推杆直线导轨座",
      "solidworksFile": "转向推杆直线导轨座.SLDPRT",
      "label": "转向推杆直线导轨座(中后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#059669",
      "position": [
        -8.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I210",
      "partId": "P41",
      "partName": "转向推杆直线导轨座",
      "solidworksFile": "转向推杆直线导轨座.SLDPRT",
      "label": "转向推杆直线导轨座(中前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#059669",
      "position": [
        16.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I211",
      "partId": "P41",
      "partName": "转向推杆直线导轨座",
      "solidworksFile": "转向推杆直线导轨座.SLDPRT",
      "label": "转向推杆直线导轨座(前段)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#059669",
      "position": [
        48.0,
        0.0,
        55.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I212",
      "partId": "P42",
      "partName": "前桥转向钟形转换摇臂",
      "solidworksFile": "前桥转向钟形转换摇臂.SLDPRT",
      "label": "前桥转向钟形转换摇臂",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#06b6d4",
      "position": [
        72.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I213",
      "partId": "P43",
      "partName": "后桥转向钟形转换摇臂",
      "solidworksFile": "后桥转向钟形转换摇臂.SLDPRT",
      "label": "后桥转向钟形转换摇臂",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0891b2",
      "position": [
        -72.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I214",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(前钟形摇臂上)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        72.0,
        0.0,
        60.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I215",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(前钟形摇臂下)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        72.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I216",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(后钟形摇臂上)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        0.0,
        60.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I217",
      "partId": "B04",
      "partName": "MF85ZZ法兰微型轴承",
      "solidworksFile": "MF85ZZ法兰微型轴承.SLDPRT",
      "label": "MF85ZZ法兰微型轴承(后钟形摇臂下)",
      "subsystem": "01 双层中置笼式车架与悬臂走廊骨架",
      "color": "#cbd5e1",
      "position": [
        -72.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I218",
      "partId": "P63",
      "partName": "前桥横向消隙转向齿条",
      "solidworksFile": "前桥横向消隙转向齿条.SLDPRT",
      "label": "前桥横向消隙转向齿条",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0ea5e9",
      "position": [
        79.0,
        0.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I219",
      "partId": "P64",
      "partName": "后桥横向消隙转向齿条",
      "solidworksFile": "后桥横向消隙转向齿条.SLDPRT",
      "label": "后桥横向消隙转向齿条",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0284c7",
      "position": [
        -79.0,
        0.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I220",
      "partId": "P65",
      "partName": "转向齿条燕尾直线滑轨座",
      "solidworksFile": "转向齿条燕尾直线滑轨座.SLDPRT",
      "label": "转向齿条燕尾直线滑轨座(左前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0369a1",
      "position": [
        79.0,
        32.0,
        52.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I221",
      "partId": "P65",
      "partName": "转向齿条燕尾直线滑轨座",
      "solidworksFile": "转向齿条燕尾直线滑轨座.SLDPRT",
      "label": "转向齿条燕尾直线滑轨座(右前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0369a1",
      "position": [
        79.0,
        -32.0,
        52.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I222",
      "partId": "P65",
      "partName": "转向齿条燕尾直线滑轨座",
      "solidworksFile": "转向齿条燕尾直线滑轨座.SLDPRT",
      "label": "转向齿条燕尾直线滑轨座(左后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0369a1",
      "position": [
        -79.0,
        32.0,
        52.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I223",
      "partId": "P65",
      "partName": "转向齿条燕尾直线滑轨座",
      "solidworksFile": "转向齿条燕尾直线滑轨座.SLDPRT",
      "label": "转向齿条燕尾直线滑轨座(右后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0369a1",
      "position": [
        -79.0,
        -32.0,
        52.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "static"
    },
    {
      "instanceId": "I224",
      "partId": "P44",
      "partName": "前桥平行四边形转向横拉杆",
      "solidworksFile": "前桥平行四边形转向横拉杆.SLDPRT",
      "label": "前桥平行四边形转向横拉杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#06b6d4",
      "position": [
        84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I225",
      "partId": "P45",
      "partName": "后桥平行四边形转向横拉杆",
      "solidworksFile": "后桥平行四边形转向横拉杆.SLDPRT",
      "label": "后桥平行四边形转向横拉杆",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0891b2",
      "position": [
        -84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I226",
      "partId": "P46",
      "partName": "舵轮同步转向扇形齿轮摇臂",
      "solidworksFile": "舵轮同步转向扇形齿轮摇臂.SLDPRT",
      "label": "舵轮同步转向扇形齿轮摇臂(左前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0ea5e9",
      "position": [
        72.0,
        58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I227",
      "partId": "G16",
      "partName": "舵轮主销消隙副齿轮片",
      "solidworksFile": "舵轮主销消隙副齿轮片.SLDPRT",
      "label": "舵轮主销消隙副齿轮片(左前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f59e0b",
      "position": [
        72.0,
        58.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I228",
      "partId": "SP3",
      "partName": "错齿消隙扭转弹簧",
      "solidworksFile": "错齿消隙扭转弹簧.SLDPRT",
      "label": "错齿消隙扭转弹簧(左前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#fbbf24",
      "position": [
        72.0,
        58.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I229",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(左前外)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        84.0,
        58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I230",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(左前中)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I231",
      "partId": "P46",
      "partName": "舵轮同步转向扇形齿轮摇臂",
      "solidworksFile": "舵轮同步转向扇形齿轮摇臂.SLDPRT",
      "label": "舵轮同步转向扇形齿轮摇臂(右前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0ea5e9",
      "position": [
        72.0,
        -58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I232",
      "partId": "G16",
      "partName": "舵轮主销消隙副齿轮片",
      "solidworksFile": "舵轮主销消隙副齿轮片.SLDPRT",
      "label": "舵轮主销消隙副齿轮片(右前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f59e0b",
      "position": [
        72.0,
        -58.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I233",
      "partId": "SP3",
      "partName": "错齿消隙扭转弹簧",
      "solidworksFile": "错齿消隙扭转弹簧.SLDPRT",
      "label": "错齿消隙扭转弹簧(右前)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#fbbf24",
      "position": [
        72.0,
        -58.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I234",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(右前外)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        84.0,
        -58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I235",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(右前中)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I236",
      "partId": "P46",
      "partName": "舵轮同步转向扇形齿轮摇臂",
      "solidworksFile": "舵轮同步转向扇形齿轮摇臂.SLDPRT",
      "label": "舵轮同步转向扇形齿轮摇臂(左后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0ea5e9",
      "position": [
        -72.0,
        58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I237",
      "partId": "G16",
      "partName": "舵轮主销消隙副齿轮片",
      "solidworksFile": "舵轮主销消隙副齿轮片.SLDPRT",
      "label": "舵轮主销消隙副齿轮片(左后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f59e0b",
      "position": [
        -72.0,
        58.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I238",
      "partId": "SP3",
      "partName": "错齿消隙扭转弹簧",
      "solidworksFile": "错齿消隙扭转弹簧.SLDPRT",
      "label": "错齿消隙扭转弹簧(左后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#fbbf24",
      "position": [
        -72.0,
        58.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I239",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(左后外)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        -84.0,
        58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I240",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(左后中)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        -84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I241",
      "partId": "P46",
      "partName": "舵轮同步转向扇形齿轮摇臂",
      "solidworksFile": "舵轮同步转向扇形齿轮摇臂.SLDPRT",
      "label": "舵轮同步转向扇形齿轮摇臂(右后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#0ea5e9",
      "position": [
        -72.0,
        -58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I242",
      "partId": "G16",
      "partName": "舵轮主销消隙副齿轮片",
      "solidworksFile": "舵轮主销消隙副齿轮片.SLDPRT",
      "label": "舵轮主销消隙副齿轮片(右后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f59e0b",
      "position": [
        -72.0,
        -58.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I243",
      "partId": "SP3",
      "partName": "错齿消隙扭转弹簧",
      "solidworksFile": "错齿消隙扭转弹簧.SLDPRT",
      "label": "错齿消隙扭转弹簧(右后)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#fbbf24",
      "position": [
        -72.0,
        -58.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I244",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(右后外)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        -84.0,
        -58.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I245",
      "partId": "P49",
      "partName": "连杆关节鱼眼轴承接头",
      "solidworksFile": "连杆关节鱼眼轴承接头.SLDPRT",
      "label": "连杆关节鱼眼轴承接头(右后中)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#e2e8f0",
      "position": [
        -84.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I246",
      "partId": "P47",
      "partName": "全向运动模式三挡切换器",
      "solidworksFile": "全向运动模式三挡切换器.SLDPRT",
      "label": "全向运动模式三挡切换器",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#ec4899",
      "position": [
        -54.0,
        0.0,
        58.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I247",
      "partId": "P48",
      "partName": "模式切换滚花定位插销",
      "solidworksFile": "模式切换滚花定位插销.SLDPRT",
      "label": "模式切换滚花定位插销(主挡位)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f43f5e",
      "position": [
        -54.0,
        0.0,
        64.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I248",
      "partId": "P48",
      "partName": "模式切换滚花定位插销",
      "solidworksFile": "模式切换滚花定位插销.SLDPRT",
      "label": "模式切换滚花定位插销(副锁销)",
      "subsystem": "06 前后钟形摇臂、平行四边形横拉杆与三挡全向切换器",
      "color": "#f43f5e",
      "position": [
        -46.0,
        0.0,
        64.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 5,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I249",
      "partId": "E06",
      "partName": "底部RFID读卡器模块",
      "solidworksFile": "底部RFID读卡器模块.SLDPRT",
      "label": "底部RFID读卡器模块",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#0284c7",
      "position": [
        20.0,
        0.0,
        15.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I250",
      "partId": "P54",
      "partName": "底部读卡器防护盒",
      "solidworksFile": "底部读卡器防护盒.SLDPRT",
      "label": "底部读卡器防护盒",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        20.0,
        0.0,
        14.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I251",
      "partId": "P52",
      "partName": "超级电容固定座",
      "solidworksFile": "超级电容固定座.SLDPRT",
      "label": "超级电容固定座",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#475569",
      "position": [
        4.0,
        -34.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I252",
      "partId": "E02",
      "partName": "超级电容储能模组",
      "solidworksFile": "超级电容储能模组.SLDPRT",
      "label": "超级电容储能模组",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#047857",
      "position": [
        4.0,
        -34.0,
        66.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I253",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(X=-20,Y=18)",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "color": "#facc15",
      "position": [
        -20.0,
        18.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I254",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(X=-20,Y=48)",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "color": "#facc15",
      "position": [
        -20.0,
        48.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I255",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(X=28,Y=18)",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "color": "#facc15",
      "position": [
        28.0,
        18.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I256",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(X=28,Y=48)",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "color": "#facc15",
      "position": [
        28.0,
        48.0,
        51.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I257",
      "partId": "E03",
      "partName": "充电与语音控制电路板",
      "solidworksFile": "充电与语音控制电路板.SLDPRT",
      "label": "充电与语音控制电路板",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#15803d",
      "position": [
        4.0,
        34.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I258",
      "partId": "P53",
      "partName": "电能检测模块支架",
      "solidworksFile": "电能检测模块支架.SLDPRT",
      "label": "电能检测模块支架",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#475569",
      "position": [
        54.0,
        0.0,
        64.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I259",
      "partId": "E04",
      "partName": "顶部电能检测模块",
      "solidworksFile": "顶部电能检测模块.SLDPRT",
      "label": "顶部电能检测模块",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#0f172a",
      "position": [
        54.0,
        0.0,
        88.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I260",
      "partId": "E05",
      "partName": "顶部红色LED指示灯",
      "solidworksFile": "顶部红色LED指示灯.SLDPRT",
      "label": "顶部红色LED指示灯",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#dc2626",
      "position": [
        54.0,
        48.0,
        90.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I261",
      "partId": "P51",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(左后)",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        -52.0,
        46.0,
        72.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I262",
      "partId": "P51",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(右后)",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        -52.0,
        -46.0,
        72.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I263",
      "partId": "P51",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(左前)",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        8.0,
        46.0,
        72.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I264",
      "partId": "P51",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(右前)",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        8.0,
        -46.0,
        72.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I265",
      "partId": "P50",
      "partName": "太阳能板承载框",
      "solidworksFile": "太阳能板承载框.SLDPRT",
      "label": "太阳能板承载框",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#334155",
      "position": [
        -22.0,
        0.0,
        96.5
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I266",
      "partId": "E01",
      "partName": "单晶硅太阳能电池板",
      "solidworksFile": "单晶硅太阳能电池板.SLDPRT",
      "label": "单晶硅太阳能电池板",
      "subsystem": "07 太阳能供电与赛会电控检测系统",
      "color": "#1e3a8a",
      "position": [
        -22.0,
        0.0,
        99.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    },
    {
      "instanceId": "I267",
      "partId": "P55",
      "partName": "轻量化快拆外壳",
      "solidworksFile": "轻量化快拆外壳.SLDPRT",
      "label": "轻量化快拆外壳",
      "subsystem": "08 流线快拆外壳与标准紧固件",
      "color": "#38bdf8",
      "position": [
        0.0,
        0.0,
        65.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 6,
      "motion": "static"
    }
  ],
  "assemblySteps": [
    {
      "step": 1,
      "title": "步骤 1：双层中置笼式车架、加强隔板与四角高架悬臂走廊装配（100%零碰轮基准）",
      "summary": "以『铝合金主底板』(Z=46mm，高于车轮顶面6mm)与中置窄体『底部中置传动副底板』(Z=20mm，宽度严格控制在Y∈[-28,+28]mm，距离Y=±58mm处的Φ40车轮留有10mm以上绝对净空)为上下基准，配合『中置齿轮箱左侧立板』、『中置齿轮箱右侧立板』、2块『中置齿轮箱横向加强隔板』与8根『底盘层间六角支撑柱』锁紧成三舱室封闭式中置传动箱；在四角上方安装『四角舵轮高架悬臂梁』，并安装『车头防撞缓冲前杠』、『车尾铝合金定位后杠』、『横轴法兰轴承座』、『纵轴立式双轴承座』及『625ZZ深沟球轴承』。",
      "parts": [
        "铝合金主底板",
        "底部中置传动副底板",
        "四角舵轮高架悬臂梁",
        "中置齿轮箱左侧立板",
        "中置齿轮箱右侧立板",
        "中置齿轮箱横向加强隔板",
        "底盘层间六角支撑柱",
        "车头防撞缓冲前杠",
        "车尾铝合金定位后杠",
        "横轴法兰轴承座",
        "纵轴立式双轴承座",
        "625ZZ深沟球轴承",
        "MF85ZZ法兰微型轴承"
      ],
      "checkPoint": "几何干涉复核：『底部中置传动副底板』Y向边界为±28mm，四角全向舵轮360°旋转包络Y向内边界为±37.4mm，净空达9.4mm，彻底消除副底板与车轮重合问题！"
    },
    {
      "step": 2,
      "title": "步骤 2：单电机 1:4 主减速、过载离合器、中央行星差速器与双速犬牙换挡箱装配",
      "summary": "在中置传动副底板上用『N20电机固定座』与『N20电机抱箍压盖』刚性锁紧『N20直流减速电机』(零悬空)，输出轴安装『18齿电机主动齿轮』，与『底部横向主传动轴』上的『72齿主减速大齿轮』构成精确 1:4 主减速(中心距22.50mm)，同轴加装『过载保护摩擦离合器盘』与『离合器碟形压紧弹簧』。经『24齿中央分动主动齿轮』与『24齿中央分动从动齿轮』进入中央行星差速室：在『底部纵向贯通传动主轴』上依次装配『48齿中央行星内齿圈壳』、『24齿行星差速太阳轮』、3只『12齿行星差速小齿轮』、『三销行星齿轮架总成』以及『双速犬牙啮合套换挡滑块』与『高低速换挡拨叉与锁紧座』，上方加盖『齿轮箱透明防尘上盖』。",
      "parts": [
        "N20电机固定座",
        "N20电机抱箍压盖",
        "N20直流减速电机",
        "18齿电机主动齿轮",
        "72齿主减速大齿轮",
        "过载保护摩擦离合器盘",
        "离合器碟形压紧弹簧",
        "底部横向主传动轴",
        "24齿中央分动主动齿轮",
        "24齿中央分动从动齿轮",
        "48齿中央行星内齿圈壳",
        "24齿行星差速太阳轮",
        "12齿行星差速小齿轮",
        "三销行星齿轮架总成",
        "双速犬牙啮合套换挡滑块",
        "高低速换挡拨叉与锁紧座",
        "底部纵向贯通传动主轴",
        "万向十字联轴器节",
        "传动轴轴向限位锁紧环",
        "齿轮箱透明防尘上盖"
      ],
      "checkPoint": "测试18:72主减速、中央行星差速器(zs=24, zp=12, zr=48)与双速犬牙换挡机构啮合顺畅，调定摩擦离合器极限打滑扭矩为0.35 N·m。"
    },
    {
      "step": 3,
      "title": "步骤 3：前后桥十字正交锥齿分动箱与高架同步带升距传动链装配",
      "summary": "在纵向贯通主轴前/后端安装『前桥十字正交分动箱壳』与『后桥十字正交分动箱壳』(配4件『分动箱法兰端盖』)，内部通过『16齿正交主动锥齿轮』与『16齿正交从动锥齿轮』实现90°正交分流。在分动箱两侧立起4座『半轴高架转角齿轮箱座』，通过上下8只『20齿同步带轮』、4条『闭环橡胶同步齿形带』及『同步带偏心张紧轮』将动力从下层Z=28mm垂直抬升至上层Z=50mm的4根『横向分动传动半轴』，从车轮上方跨越进入四角舵轮主销顶端。",
      "parts": [
        "前桥十字正交分动箱壳",
        "后桥十字正交分动箱壳",
        "分动箱法兰端盖",
        "16齿正交主动锥齿轮",
        "16齿正交从动锥齿轮",
        "横向分动传动半轴",
        "半轴高架转角齿轮箱座",
        "20齿同步带轮",
        "闭环橡胶同步齿形带",
        "同步带偏心张紧轮"
      ],
      "checkPoint": "确认4根『横向分动传动半轴』位于Z=50mm高架走廊，高于下部车轮顶面10mm，完全不占用车轮360°转向空间。"
    },
    {
      "step": 4,
      "title": "步骤 4：四轮独立360°双套筒同轴全向舵轮总成（非麦轮+迷宫防尘密封）装配",
      "summary": "在主底板四角(X=±72,Y=±58mm)锁紧4座『全向舵轮主销轴承座』，压入8只『6700ZZ薄壁转向轴承』与4件『舵轮主销防尘迷宫密封盖』，穿入『全向转向空心主销套筒』与『主销内孔推力球轴承』，下端连接『全向舵轮U型转向叉架』与『舵轮侧置锥齿轮减速盒』。在空心主销套筒中心穿入『舵轮同轴中心传力竖轴』，使其底端锥齿轮与『20齿舵轮轮边锥齿圈』正交啮合；最后用『舵轮精密固定横轴』安装『高抓地全向舵轮铝合金轮毂』、『高抓地全向舵轮防滑橡胶胎』(非麦轮)与『舵轮端面锁紧法兰盖』。",
      "parts": [
        "全向舵轮主销轴承座",
        "6700ZZ薄壁转向轴承",
        "舵轮主销防尘迷宫密封盖",
        "全向转向空心主销套筒",
        "舵轮同轴中心传力竖轴",
        "主销内孔推力球轴承",
        "全向舵轮U型转向叉架",
        "舵轮侧置锥齿轮减速盒",
        "20齿舵轮轮边锥齿圈",
        "舵轮精密固定横轴",
        "高抓地全向舵轮铝合金轮毂",
        "高抓地全向舵轮防滑橡胶胎",
        "舵轮端面锁紧法兰盖"
      ],
      "checkPoint": "手动将4只全向舵轮旋转360°，验证车轮与底部中置传动副底板、高架半轴之间留有≥9.4mm净空，零干涉且动力同轴连续传递。"
    },
    {
      "step": 5,
      "title": "步骤 5：1:30蜗轮蜗杆、三层共轭凸轮、四槽马耳他间歇槽轮、双片错齿消隙齿条与千分尺微调器联调",
      "summary": "在横向主轴上锁紧『0.5模单头自锁蜗杆』驱动『30齿青铜蜗轮』(1:30减速)，在『双凸轮同轴传力竖轴』上依次安装『主航向五次多项式转向凸轮』(C01)、『凸轮相位微调分度盘』、『差动相位共轭副凸轮盘』(C02)、『槽轮主动拨盘与止动圆弧盘』(带『槽轮间歇拨销与滚针套』)及『横向蟹行偏置凸轮盘』(C03)。在旁侧『槽轮分度立式精密转轴』上安装『四槽马耳他间歇分度槽轮』与『模态自动切换拨叉连杆』，实现凸轮每转1周自动步进90°切换行驶模态！随后安装双滚子共轭滑架、千分尺微调器(『可变杠杆比转向调节摇杆』、『千分尺螺纹偏航微调丝杠』、『微分刻度游标调节旋钮』、『微调滑块导轨支座』)、前后『横向消隙转向齿条』(配4座『转向齿条燕尾直线滑轨座』)与平行四边形横拉杆，在四角主销顶端叠装『舵轮同步转向扇形齿轮摇臂』、『舵轮主销消隙副齿轮片』与『错齿消隙扭转弹簧』，实现0.00°零回差全向转向！",
      "parts": [
        "0.5模单头自锁蜗杆",
        "30齿青铜蜗轮",
        "双凸轮同轴传力竖轴",
        "凸轮轴立式双轴承座",
        "主航向五次多项式转向凸轮",
        "差动相位共轭副凸轮盘",
        "横向蟹行偏置凸轮盘",
        "凸轮相位微调分度盘",
        "四槽马耳他间歇分度槽轮",
        "槽轮主动拨盘与止动圆弧盘",
        "槽轮间歇拨销与滚针套",
        "槽轮分度立式精密转轴",
        "模态自动切换拨叉连杆",
        "MR84ZZ凸轮滚子轴承",
        "主航向滚子推杆滑架",
        "差动副凸轮滚子推杆滑架",
        "推杆复位圆柱弹簧",
        "纵向同步转向主推杆",
        "后桥差动转向副推杆",
        "可变杠杆比转向调节摇杆",
        "千分尺螺纹偏航微调丝杠",
        "微分刻度游标调节旋钮",
        "微调滑块导轨支座",
        "转向推杆直线导轨座",
        "前桥转向钟形转换摇臂",
        "后桥转向钟形转换摇臂",
        "前桥横向消隙转向齿条",
        "后桥横向消隙转向齿条",
        "转向齿条燕尾直线滑轨座",
        "前桥平行四边形转向横拉杆",
        "后桥平行四边形转向横拉杆",
        "舵轮同步转向扇形齿轮摇臂",
        "舵轮主销消隙副齿轮片",
        "错齿消隙扭转弹簧",
        "全向运动模式三挡切换器",
        "模式切换滚花定位插销",
        "连杆关节鱼眼轴承接头"
      ],
      "checkPoint": "验证四槽马耳他槽轮90°间歇分度与止动圆弧自锁精准可靠，双片错齿消隙齿轮与横向转向齿条啮合零背隙，千分尺微调旋钮分辨率达0.01°。"
    },
    {
      "step": 6,
      "title": "步骤 6：太阳能供电、赛会电控检测模块与流线快拆外壳总装",
      "summary": "在中置副底板下方安装『底部RFID读卡器模块』并封装于非金属『底部读卡器防护盒』(不外露)；在主底板上安装『超级电容固定座』、『超级电容储能模组』、12套『M3铜柱与紧固件套件』与『充电与语音控制电路板』；前部安装『电能检测模块支架』，顶部无遮挡安装『顶部电能检测模块』与Φ10mm『顶部红色LED指示灯』；用4根『太阳能板支撑立柱』架起『太阳能板承载框』与『单晶硅太阳能电池板』，最后扣合『轻量化快拆外壳』。",
      "parts": [
        "单晶硅太阳能电池板",
        "太阳能板承载框",
        "太阳能板支撑立柱",
        "超级电容储能模组",
        "超级电容固定座",
        "充电与语音控制电路板",
        "顶部电能检测模块",
        "电能检测模块支架",
        "顶部红色LED指示灯",
        "底部RFID读卡器模块",
        "底部读卡器防护盒",
        "轻量化快拆外壳",
        "M3铜柱与紧固件套件"
      ],
      "checkPoint": "整车共87种核心零件(205个3D装配实例、200+个特征)，包络216×164×106mm，全部零件零干涉，且网页零件名与SolidWorks零件名(.SLDPRT) 100%一一对应。"
    }
  ]
};
