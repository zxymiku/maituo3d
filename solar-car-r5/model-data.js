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
    "partTypeCount": 52,
    "totalInstanceCount": 136,
    "placementCount": 106,
    "featureCount": 53,
    "namingRule": "网页显示零件名与 SolidWorks 零件文件名 (<零件名>.SLDPRT) 1:1 严格对应"
  },
  "parts": [
    {
      "id": "P01",
      "name": "铝合金主底板",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "category": "自制结构件",
      "process": "CNC铝合金精密铣削",
      "material": "6061-T6铝合金",
      "color": "#475569",
      "quantity": 1,
      "size": [
        200.0,
        150.0,
        4.0
      ],
      "note": "上层主承载基准板(Z=42mm)，四角设Φ15mm全向舵轮主销通孔(X=±68,Y=±52mm)，中部设双凸轮竖轴孔与轻量化观察窗",
      "keyDimensions": [
        {
          "name": "总长 × 总宽 × 板厚",
          "value": "200.0 × 150.0 × 4.0 mm",
          "note": "整车包络216×164mm，严格小于250×200mm红线"
        },
        {
          "name": "四轮全向主销孔距",
          "value": "轴距 136.0 mm × 轮距 104.0 mm",
          "note": "四角对称坐标 (X=±68.0, Y=±52.0 mm)"
        },
        {
          "name": "凸轮竖轴基准孔",
          "value": "X = -30.0 mm, Y = 0.0 mm",
          "note": "安装凸轮轴立式轴承座"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 200.0,
            "h": 150.0,
            "fillet": 12.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -68.0,
              "cy": -52.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": -68.0,
              "cy": 52.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": 68.0,
              "cy": -52.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": 68.0,
              "cy": 52.0,
              "r": 7.5
            },
            {
              "shape": "circle",
              "cx": -30.0,
              "cy": 0.0,
              "r": 6.0
            },
            {
              "shape": "rect",
              "cx": -30.0,
              "cy": 30.0,
              "w": 42.0,
              "h": 22.0,
              "fillet": 3.0
            },
            {
              "shape": "rect",
              "cx": 24.0,
              "cy": -30.0,
              "w": 44.0,
              "h": 24.0,
              "fillet": 3.0
            },
            {
              "shape": "rect",
              "cx": 24.0,
              "cy": 30.0,
              "w": 44.0,
              "h": 24.0,
              "fillet": 3.0
            }
          ]
        }
      ],
      "partNumber": "SC-01",
      "solidworksName": "铝合金主底板",
      "solidworksFile": "铝合金主底板.SLDPRT",
      "drawingUrl": "docs/零件图册/P01.html",
      "featureCount": 1
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
      "size": [
        176.0,
        124.0,
        3.5
      ],
      "note": "下层传动齿轮箱基准底板(Z=18mm)，与铝合金主底板构成双层笼式结构，承载横向主轴、纵向分动长轴、前后锥齿分动箱与电机座",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "176.0 × 124.0 × 3.5 mm",
          "note": "四角内收避让4只全向舵轮360°回转包络"
        },
        {
          "name": "层间净高",
          "value": "20.0 mm (Z ∈ [20, 40] mm)",
          "note": "容纳底部1:4主减速、锥齿轮分动箱及差动副凸轮"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 176.0,
            "h": 124.0,
            "fillet": 8.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": -68.0,
              "cy": -50.0,
              "w": 36.0,
              "h": 24.0,
              "fillet": 4.0
            },
            {
              "shape": "rect",
              "cx": -68.0,
              "cy": 50.0,
              "w": 36.0,
              "h": 24.0,
              "fillet": 4.0
            },
            {
              "shape": "rect",
              "cx": 68.0,
              "cy": -50.0,
              "w": 36.0,
              "h": 24.0,
              "fillet": 4.0
            },
            {
              "shape": "rect",
              "cx": 68.0,
              "cy": 50.0,
              "w": 36.0,
              "h": 24.0,
              "fillet": 4.0
            },
            {
              "shape": "rect",
              "cx": -42.0,
              "cy": 28.0,
              "w": 40.0,
              "h": 10.0,
              "fillet": 2.0
            }
          ]
        }
      ],
      "partNumber": "SC-02",
      "solidworksName": "底部传动副底板",
      "solidworksFile": "底部传动副底板.SLDPRT",
      "drawingUrl": "docs/零件图册/P02.html",
      "featureCount": 1
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
      "size": [
        8.0,
        8.0,
        20.0
      ],
      "note": "6根Φ8×20mm高刚度台阶支撑柱，刚性锁紧上层铝合金主底板与下层底部传动副底板",
      "keyDimensions": [
        {
          "name": "外径 × 高度",
          "value": "Φ8.0 × 20.0 mm",
          "note": "中心贯穿M3内螺纹孔"
        }
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
        }
      ],
      "partNumber": "SC-03",
      "solidworksName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "drawingUrl": "docs/零件图册/P03.html",
      "featureCount": 1
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
      "size": [
        22.0,
        10.0,
        18.0
      ],
      "note": "共4件安装在底部传动副底板上：2件支承底部横向主传动轴(X=-42,Y=±38mm)，2件支承底部纵向分动长轴(X=±36,Y=0mm)",
      "keyDimensions": [
        {
          "name": "轴承孔径",
          "value": "Φ16.0 H7 mm",
          "note": "内嵌625ZZ深沟球轴承"
        },
        {
          "name": "中心高",
          "value": "8.0 mm (对应Z=28mm传动轴线)",
          "note": "确保全车底部齿轮轴系平行度与正交度"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 22.0,
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
        }
      ],
      "partNumber": "SC-04",
      "solidworksName": "主传动轴立式轴承座",
      "solidworksFile": "主传动轴立式轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P04.html",
      "featureCount": 1
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
      "size": [
        28.0,
        28.0,
        18.0
      ],
      "note": "四角对称锁紧在铝合金主底板(X=±68,Y=±52mm)，内嵌上下双6700ZZ薄壁转向轴承，支承4套全向舵轮360°自由回转",
      "keyDimensions": [
        {
          "name": "轴承室孔径",
          "value": "Φ15.0 H7 mm",
          "note": "配合6700ZZ薄壁深沟球轴承(Φ10×Φ15×4mm)"
        },
        {
          "name": "法兰尺寸",
          "value": "28.0 × 28.0 × 18.0 mm",
          "note": "4×M3螺栓锁紧于主底板四角"
        }
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
            },
            {
              "shape": "circle",
              "cx": -10.0,
              "cy": -10.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 10.0,
              "cy": -10.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": -10.0,
              "cy": 10.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": 10.0,
              "cy": 10.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-05",
      "solidworksName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P05.html",
      "featureCount": 1
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
      "size": [
        16.0,
        5.0,
        16.0
      ],
      "note": "Φ5×Φ16×5mm标准轴承：用于主传动轴立式轴承座(4只)、前后分动箱十字轴承座(6只)、凸轮竖轴座(2只)及4只全向舵轮轮毂(4只)",
      "keyDimensions": [
        {
          "name": "内径 d × 外径 D × 宽度 B",
          "value": "Φ5.0 × Φ16.0 × 5.0 mm",
          "note": "支承全车Φ5mm传动轴系"
        }
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
        }
      ],
      "partNumber": "SC-06",
      "solidworksName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B01.html",
      "featureCount": 1
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
      "size": [
        15.0,
        15.0,
        4.0
      ],
      "note": "Φ10×Φ15×4mm薄壁深沟球轴承，每个全向舵轮主销轴承座内上下安装2只(共8只)，支承Φ10mm全向转向空心主销套筒",
      "keyDimensions": [
        {
          "name": "内径 d × 外径 D × 宽度 B",
          "value": "Φ10.0 × Φ15.0 × 4.0 mm",
          "note": "大内孔设计以便中心穿过同轴传力竖销"
        }
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
        }
      ],
      "partNumber": "SC-07",
      "solidworksName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B03.html",
      "featureCount": 1
    },
    {
      "id": "P06",
      "name": "N20电机固定座",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "category": "自制结构件",
      "process": "CNC铝合金加工",
      "material": "6061-T6铝合金",
      "color": "#1d4ed8",
      "quantity": 1,
      "size": [
        28.0,
        24.0,
        18.0
      ],
      "note": "刚性锁紧在底部传动副底板上表面(X=-19.5,Y=+12,Z=28mm)，抱死N20电机机身杜绝悬空，保证1:4齿轮中心距22.50mm",
      "keyDimensions": [
        {
          "name": "电机防转内腔",
          "value": "12.0 × 10.0 mm",
          "note": "贴合N20扁平减速箱"
        },
        {
          "name": "1:4啮合中心距",
          "value": "22.50 mm",
          "note": "电机轴X=-19.5mm至横向主传动轴X=-42.0mm"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 18.0,
            "fillet": 2.5
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
        }
      ],
      "partNumber": "SC-08",
      "solidworksName": "N20电机固定座",
      "solidworksFile": "N20电机固定座.SLDPRT",
      "drawingUrl": "docs/零件图册/P06.html",
      "featureCount": 1
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
      "size": [
        12.0,
        36.0,
        10.0
      ],
      "note": "全车唯一动力源(单电机驱动)，输出轴直联18齿电机主动齿轮，驱动全车四轮分动箱与双凸轮转向时基",
      "keyDimensions": [
        {
          "name": "机身尺寸",
          "value": "12.0 × 10.0 × 26.0 mm (轴长10mm)",
          "note": "输出轴径Φ3.0mm D字轴"
        }
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
          "name": "电机D型输出轴",
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
      "partNumber": "SC-09",
      "solidworksName": "N20直流减速电机",
      "solidworksFile": "N20直流减速电机.SLDPRT",
      "drawingUrl": "docs/零件图册/M01.html",
      "featureCount": 2
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
      "size": [
        10.0,
        6.0,
        10.0
      ],
      "note": "模数m=0.5，齿数z1=18，分度圆d1=9.0mm，安装在N20电机输出轴上，与72齿主减速大齿轮构成精确1:4减速",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z1 = 18",
          "note": "分度圆d1=9.0mm，齿顶圆da1=10.0mm"
        }
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
        }
      ],
      "partNumber": "SC-10",
      "solidworksName": "18齿电机主动齿轮",
      "solidworksFile": "18齿电机主动齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G02.html",
      "featureCount": 1
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
      "size": [
        37.0,
        6.0,
        37.0
      ],
      "note": "模数m=0.5，齿数z2=72，分度圆d2=36.0mm，锁紧在底部横向主传动轴(X=-42,Y=+28,Z=28mm)，实现精确1:4主减速比",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 传动比",
          "value": "m = 0.5, z2 = 72, i = 72/18 = 4.0 (精确1:4)",
          "note": "标准中心距 a = 22.50 mm"
        }
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
              "cx": 10.0,
              "cy": 0.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": -10.0,
              "cy": 0.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 10.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -10.0,
              "r": 3.5
            }
          ]
        }
      ],
      "partNumber": "SC-11",
      "solidworksName": "72齿主减速大齿轮",
      "solidworksFile": "72齿主减速大齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G01.html",
      "featureCount": 1
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
      "size": [
        5.0,
        92.0,
        5.0
      ],
      "note": "布置于下层传动箱(X=-42,Z=28mm)，承接72齿主减速大齿轮动力，同时驱动0.5模单头蜗杆(转向时基)与16齿正交传力锥齿轮(四驱分动)",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 92.0 mm",
          "note": "两端由主传动轴立式轴承座支承"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-12",
      "solidworksName": "底部横向主传动轴",
      "solidworksFile": "底部横向主传动轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P07.html",
      "featureCount": 1
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
      "size": [
        11.0,
        6.0,
        11.0
      ],
      "note": "模数m=0.5，齿数z=20，分度圆d=10.0mm，安装在底部纵向分动长轴中段稳速传递扭矩",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z = 20",
          "note": "内孔Φ5.0mm"
        }
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
        }
      ],
      "partNumber": "SC-13",
      "solidworksName": "20齿分动直齿轮",
      "solidworksFile": "20齿分动直齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G05.html",
      "featureCount": 1
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
      "size": [
        152.0,
        5.0,
        5.0
      ],
      "note": "贯通下层底盘中心线(Y=0, Z=28mm, X∈[-76,+76]mm)，将主减速动力同步输送至前桥与后桥分动箱十字轴承座",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 152.0 mm",
          "note": "全车四轮驱动中央贯通主轴"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-14",
      "solidworksName": "底部纵向分动长轴",
      "solidworksFile": "底部纵向分动长轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P08.html",
      "featureCount": 1
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
      "size": [
        32.0,
        32.0,
        20.0
      ],
      "note": "前后对称安装在底部传动副底板(X=±68,Y=0,Z=28mm)，正交十字轴孔约束16齿正交传力锥齿轮副，将纵向动力90°分流至左右横向分动短轴",
      "keyDimensions": [
        {
          "name": "正交轴孔夹角",
          "value": "90.0° ± 0.05°",
          "note": "保证1:1锥齿轮正交啮合精度"
        },
        {
          "name": "外形尺寸",
          "value": "32.0 × 32.0 × 20.0 mm",
          "note": "内腔容纳3只正交啮合锥齿轮"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 32.0,
            "h": 32.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 22.0,
              "h": 22.0,
              "fillet": 2.0
            }
          ]
        }
      ],
      "partNumber": "SC-15",
      "solidworksName": "分动箱十字轴承座",
      "solidworksFile": "分动箱十字轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P10.html",
      "featureCount": 1
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
      "size": [
        10.0,
        10.0,
        6.0
      ],
      "note": "模数m=0.5，齿数z=16，分度圆锥角45°(1:1正交传动)，用于中央十字分动箱(4只)及四角全向舵轮主销顶部/底部同轴换向(8只)",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 轴交角",
          "value": "m = 0.5 mm, z = 16, Σ = 90°",
          "note": "实现全向舵轮旋转中心同轴传力"
        }
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
          "params": {
            "module": 0.5,
            "teeth": 16
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
      "partNumber": "SC-16",
      "solidworksName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G06.html",
      "featureCount": 1
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
      "size": [
        5.0,
        48.0,
        5.0
      ],
      "note": "共4根布置于前/后桥左右两侧(X=±68, Y=±28, Z=28mm)，将十字分动箱扭矩横向传递至四角全向舵轮主销上方锥齿轮",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 × 48.0 mm",
          "note": "两端安装16齿正交传力锥齿轮"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-17",
      "solidworksName": "横向分动短轴",
      "solidworksFile": "横向分动短轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P09.html",
      "featureCount": 1
    },
    {
      "id": "P11",
      "name": "全向转向空心主销套筒",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "category": "自制核心件",
      "process": "精密数控车削",
      "material": "304不锈钢",
      "color": "#38bdf8",
      "quantity": 4,
      "size": [
        10.0,
        10.0,
        28.0
      ],
      "note": "外径Φ10mm配合6700ZZ薄壁转向轴承，内孔Φ5.2mm供『舵轮同轴传力竖销』无干涉穿过，下端刚性连接全向舵轮转向叉架，上端锁紧舵轮同步转向摇臂",
      "keyDimensions": [
        {
          "name": "外径 D × 内孔 d × 长 L",
          "value": "Φ10.0 g6 × Φ5.2 × 28.0 mm",
          "note": "同轴双自由度解耦核心零件(外筒控转向、内轴传动力)"
        }
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
        }
      ],
      "partNumber": "SC-18",
      "solidworksName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "drawingUrl": "docs/零件图册/P11.html",
      "featureCount": 1
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
      "size": [
        26.0,
        24.0,
        26.0
      ],
      "note": "共4件分布于底盘四角(X=±68,Y=±52,Z=22mm)，随空心主销套筒同步偏转±90°/360°，下部支承舵轮固定横轴与高抓地全向舵轮",
      "keyDimensions": [
        {
          "name": "U型叉内宽",
          "value": "16.0 mm",
          "note": "容纳10mm宽全向舵轮与侧面舵轮轮边锥齿圈"
        },
        {
          "name": "轮心高度",
          "value": "Z = 20.0 mm",
          "note": "配合Φ40mm舵轮实现整车离地间隙16.25mm"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 26.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": -4.0,
              "w": 16.0,
              "h": 18.0,
              "fillet": 1.0
            }
          ]
        }
      ],
      "partNumber": "SC-19",
      "solidworksName": "全向舵轮转向叉架",
      "solidworksFile": "全向舵轮转向叉架.SLDPRT",
      "drawingUrl": "docs/零件图册/P12.html",
      "featureCount": 1
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
      "size": [
        4.0,
        4.0,
        34.0
      ],
      "note": "同轴穿过『全向转向空心主销套筒』中心通孔，上端装16齿锥齿轮接收横向分动短轴动力，下端装16齿锥齿轮驱动舵轮轮边锥齿圈",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ4.0 g6 × 34.0 mm",
          "note": "确保车轮朝任意方向转向时驱动力矩恒定不中断"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-20",
      "solidworksName": "舵轮同轴传力竖销",
      "solidworksFile": "舵轮同轴传力竖销.SLDPRT",
      "drawingUrl": "docs/零件图册/P13.html",
      "featureCount": 1
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
      "size": [
        12.0,
        4.0,
        12.0
      ],
      "note": "固连在4只高抓地全向舵轮内侧端面，与舵轮同轴传力竖销下端锥齿轮正交啮合，实现轮边终传驱动",
      "keyDimensions": [
        {
          "name": "模数 / 齿数",
          "value": "m = 0.5 mm, z = 20",
          "note": "分度圆直径10.0mm"
        }
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
        }
      ],
      "partNumber": "SC-21",
      "solidworksName": "舵轮轮边锥齿圈",
      "solidworksFile": "舵轮轮边锥齿圈.SLDPRT",
      "drawingUrl": "docs/零件图册/G07.html",
      "featureCount": 1
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
      "size": [
        5.0,
        26.0,
        5.0
      ],
      "note": "安装在4只全向舵轮转向叉架下部轴孔(Z=20mm)，支承高抓地全向舵轮旋转",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 × 26.0 mm",
          "note": "两端卡簧限位"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-22",
      "solidworksName": "舵轮固定横轴",
      "solidworksFile": "舵轮固定横轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P14.html",
      "featureCount": 1
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
      "size": [
        40.0,
        10.0,
        40.0
      ],
      "note": "共4件分布于四轮独立转向舵轮总成(绝不使用麦克纳姆轮！)，依靠舵轮主销同向/反向同步偏转实现零侧滑全方向平移、斜行与急转",
      "keyDimensions": [
        {
          "name": "外径 D × 轮宽 B",
          "value": "Φ40.0 × 10.0 mm",
          "note": "实心硅胶窄胎，抓地力高、无麦轮辊子打滑损耗"
        },
        {
          "name": "全向移动原理",
          "value": "四轮同步独立转向舵轮 (Swerve Drive)",
          "note": "支持直行、蟹行横移、45°斜行、阿克曼转弯与原地回转"
        }
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
              "r": 2.5
            },
            {
              "shape": "circle",
              "cx": 11.0,
              "cy": 0.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": -11.0,
              "cy": 0.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": 11.0,
              "r": 3.5
            },
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -11.0,
              "r": 3.5
            }
          ]
        }
      ],
      "partNumber": "SC-23",
      "solidworksName": "高抓地全向舵轮",
      "solidworksFile": "高抓地全向舵轮.SLDPRT",
      "drawingUrl": "docs/零件图册/W01.html",
      "featureCount": 1
    },
    {
      "id": "G03",
      "name": "0.5模单头蜗杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "category": "外购/定制传动件",
      "process": "黄铜车削",
      "material": "H59黄铜",
      "color": "#d97706",
      "quantity": 1,
      "size": [
        11.0,
        18.0,
        11.0
      ],
      "note": "锁紧在底部横向主传动轴中段(X=-42,Y=0,Z=28mm)，驱动30齿青铜蜗轮构成1:30转向时基减速并具备反向自锁能力",
      "keyDimensions": [
        {
          "name": "模数 / 头数 / 分度圆",
          "value": "m = 0.5 mm, z1 = 1, d1 = 11.0 mm",
          "note": "自锁防地面冲击反驱"
        }
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
        }
      ],
      "partNumber": "SC-24",
      "solidworksName": "0.5模单头蜗杆",
      "solidworksFile": "0.5模单头蜗杆.SLDPRT",
      "drawingUrl": "docs/零件图册/G03.html",
      "featureCount": 1
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
      "size": [
        16.0,
        16.0,
        6.0
      ],
      "note": "锁紧在凸轮传力竖轴下端(X=-30,Y=0,Z=28mm)，与0.5模单头蜗杆啮合(中心距12.0~13.0mm)，实现1:30减速驱动上下双凸轮盘",
      "keyDimensions": [
        {
          "name": "模数 / 齿数 / 减速比",
          "value": "m = 0.5 mm, z2 = 30, i = 1:30",
          "note": "同步驱动主航向凸轮C01与差动副凸轮C02"
        }
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
        }
      ],
      "partNumber": "SC-25",
      "solidworksName": "30齿青铜蜗轮",
      "solidworksFile": "30齿青铜蜗轮.SLDPRT",
      "drawingUrl": "docs/零件图册/G04.html",
      "featureCount": 1
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
      "size": [
        5.0,
        5.0,
        52.0
      ],
      "note": "垂直贯穿上下双层底板(X=-30,Y=0,Z∈[16,68]mm)，下段装30齿蜗轮与差动转向副凸轮盘(Z=35mm)，上段装主航向盘形转向凸轮(Z=56mm)",
      "keyDimensions": [
        {
          "name": "轴径 × 长度",
          "value": "Φ5.0 g6 × 52.0 mm",
          "note": "同轴串联双凸轮实现全向航向与前后差动解耦"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-26",
      "solidworksName": "凸轮传力竖轴",
      "solidworksFile": "凸轮传力竖轴.SLDPRT",
      "drawingUrl": "docs/零件图册/P15.html",
      "featureCount": 1
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
      "size": [
        28.0,
        28.0,
        20.0
      ],
      "note": "安装在铝合金主底板(X=-30,Y=0,Z=42mm)，内置双625ZZ深沟球轴承承受上下双凸轮推杆径向合力",
      "keyDimensions": [
        {
          "name": "轴承室孔径",
          "value": "Φ16.0 H7 mm",
          "note": "双轴承高刚度支承"
        }
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
        }
      ],
      "partNumber": "SC-27",
      "solidworksName": "凸轮轴立式轴承座",
      "solidworksFile": "凸轮轴立式轴承座.SLDPRT",
      "drawingUrl": "docs/零件图册/P16.html",
      "featureCount": 1
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
      "size": [
        46.4,
        46.4,
        5.0
      ],
      "note": "上层主凸轮(Z=56mm)，采用五次多项式曲线 s1(u)=h1(10u³-15u⁴+6u⁵)，基圆r0=18mm，升程h1=±5.2mm，驱动纵向同步转向主推杆控制四轮基准航向角",
      "keyDimensions": [
        {
          "name": "基圆半径 r0 / 升程 h1",
          "value": "r0 = 18.0 mm, h1 = ±5.20 mm",
          "note": "驱动16mm摇臂产生最大±18°~±25°同步全向偏转"
        },
        {
          "name": "五次多项式方程",
          "value": "s1(u) = h1(10u³ - 15u⁴ + 6u⁵)",
          "note": "无冲击连续高阶导数，最大压力角25.4°<30°"
        }
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
              "cx": 8.0,
              "cy": 0.0,
              "r": 1.6
            },
            {
              "shape": "circle",
              "cx": -8.0,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-28",
      "solidworksName": "主航向盘形转向凸轮",
      "solidworksFile": "主航向盘形转向凸轮.SLDPRT",
      "drawingUrl": "docs/零件图册/C01.html",
      "featureCount": 1
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
      "size": [
        39.6,
        39.6,
        5.0
      ],
      "note": "同轴布置于下层传动腔(Z=35mm)，采用共轭五次多项式廓线 s2(θ)，独立驱动『后桥差动相位推杆』，控制后轮与前轮同向蟹行(δ前=δ后)或反向急转(δ前=-δ后)",
      "keyDimensions": [
        {
          "name": "基圆半径 r0 / 差动升程 h2",
          "value": "r0 = 16.0 mm, h2 = ±3.80 mm",
          "note": "与主凸轮C01协同合成任意全向移动矢量"
        }
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
          "params": {
            "base_r": 16.0,
            "stroke": 3.8
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
        }
      ],
      "partNumber": "SC-29",
      "solidworksName": "差动转向副凸轮盘",
      "solidworksFile": "差动转向副凸轮盘.SLDPRT",
      "drawingUrl": "docs/零件图册/C02.html",
      "featureCount": 1
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
      "size": [
        8.0,
        8.0,
        3.0
      ],
      "note": "共2只(Φ8×Φ4×3mm)，分别安装在纵向同步转向主推杆与后桥差动相位推杆的滚子叉口上，紧贴上下双凸轮轮廓低阻滚动",
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
          "name": "MR84ZZ滚子轴承环",
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
        }
      ],
      "partNumber": "SC-30",
      "solidworksName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "drawingUrl": "docs/零件图册/B02.html",
      "featureCount": 1
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
      "size": [
        116.0,
        8.0,
        5.0
      ],
      "note": "沿上层底盘中心线(Z=56mm)往复运动，由主航向盘形转向凸轮(C01)推动，前端联动『前桥平行四边形转向横拉杆』，并通过全向模式切换滑块联动后桥",
      "keyDimensions": [
        {
          "name": "总长 × 截面",
          "value": "116.0 × 8.0 × 5.0 mm",
          "note": "行程 ±5.20 mm"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 116.0,
            "h": 8.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -52.0,
              "cy": 0.0,
              "r": 2.0
            },
            {
              "shape": "rect",
              "cx": 52.0,
              "cy": 0.0,
              "w": 6.0,
              "h": 3.2,
              "fillet": 1.5
            }
          ]
        }
      ],
      "partNumber": "SC-31",
      "solidworksName": "纵向同步转向主推杆",
      "solidworksFile": "纵向同步转向主推杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P17.html",
      "featureCount": 1
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
      "size": [
        14.0,
        22.0,
        20.0
      ],
      "note": "前后对称安装在铝合金主底板上表面(X=+2与X=+44, Y=0)，精密矩形滑槽约束纵向同步转向主推杆平稳移动",
      "keyDimensions": [
        {
          "name": "滑槽尺寸",
          "value": "8.2 × 5.2 mm",
          "note": "自润滑零卡滞导向"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 22.0,
            "h": 20.0,
            "fillet": 2.5
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 4.0,
              "w": 8.4,
              "h": 5.4,
              "fillet": 0.5
            }
          ]
        }
      ],
      "partNumber": "SC-32",
      "solidworksName": "转向推杆直线导向座",
      "solidworksFile": "转向推杆直线导向座.SLDPRT",
      "drawingUrl": "docs/零件图册/P18.html",
      "featureCount": 1
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
      "size": [
        22.0,
        12.0,
        12.0
      ],
      "note": "共2件：分别套设在纵向同步转向主推杆与后桥差动相位推杆上，提供恒定预紧力使两只MR84ZZ滚子轴承始终贴紧上下双凸轮",
      "keyDimensions": [
        {
          "name": "外径 × 自由长",
          "value": "Φ12.0 × 22.0 mm",
          "note": "双弹簧独立力锁合"
        }
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
              "r": 4.2
            }
          ]
        }
      ],
      "partNumber": "SC-33",
      "solidworksName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "drawingUrl": "docs/零件图册/SP1.html",
      "featureCount": 1
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
      "size": [
        58.0,
        7.0,
        5.0
      ],
      "note": "布置于凸轮竖轴后方(X∈[-74,-16]mm, Z=35mm)，由下层『差动转向副凸轮盘』(C02)驱动，控制『后桥平行四边形转向横拉杆』实现同向蟹行或反向转向",
      "keyDimensions": [
        {
          "name": "总长 × 截面",
          "value": "58.0 × 7.0 × 5.0 mm",
          "note": "连接副凸轮C02滚子至后桥转向横拉杆"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 58.0,
            "h": 7.0,
            "fillet": 2.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 24.0,
              "cy": 0.0,
              "r": 2.0
            },
            {
              "shape": "circle",
              "cx": -24.0,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-34",
      "solidworksName": "后桥差动相位推杆",
      "solidworksFile": "后桥差动相位推杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P19.html",
      "featureCount": 1
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
      "size": [
        10.0,
        112.0,
        5.0
      ],
      "note": "横向布置于前桥上方(X=+82, Y∈[-52,+52], Z=54mm)，与左右前轮『舵轮同步转向摇臂』构成平行四边形机构，确保左前与右前全向舵轮1:1严格同角偏转",
      "keyDimensions": [
        {
          "name": "两端铰接孔距",
          "value": "104.0 mm (对应轮距 Y = ±52.0 mm)",
          "note": "平行四边形1:1等角同步连杆"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 10.0,
            "h": 112.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -52.0,
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
              "cy": 52.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-35",
      "solidworksName": "前桥平行四边形转向横拉杆",
      "solidworksFile": "前桥平行四边形转向横拉杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P20.html",
      "featureCount": 1
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
      "size": [
        10.0,
        112.0,
        5.0
      ],
      "note": "横向布置于后桥(X=-82, Y∈[-52,+52], Z=54mm)，与左右后轮『舵轮同步转向摇臂』构成后平行四边形机构，实现后两轮同步同向蟹行或反向急转",
      "keyDimensions": [
        {
          "name": "两端铰接孔距",
          "value": "104.0 mm (Y = ±52.0 mm)",
          "note": "与前桥横拉杆对称匹配"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 10.0,
            "h": 112.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": 0.0,
              "cy": -52.0,
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
              "cy": 52.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-36",
      "solidworksName": "后桥平行四边形转向横拉杆",
      "solidworksFile": "后桥平行四边形转向横拉杆.SLDPRT",
      "drawingUrl": "docs/零件图册/P21.html",
      "featureCount": 1
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
      "size": [
        24.0,
        14.0,
        6.0
      ],
      "note": "共4件分别锁紧在四角『全向转向空心主销套筒』顶端(X=±68,Y=±52,Z=54mm)，摇臂孔距14.0mm，由前/后平行四边形转向横拉杆同步驱动",
      "keyDimensions": [
        {
          "name": "有效摇臂半径 R_arm",
          "value": "14.0 mm",
          "note": "主销孔Φ10.0mm夹紧结构，销孔Φ3.0mm连接横拉杆"
        }
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
          "params": {
            "cx": 4.0,
            "cy": 0.0,
            "w": 24.0,
            "h": 14.0,
            "fillet": 4.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -2.0,
              "cy": 0.0,
              "r": 4.8
            },
            {
              "shape": "circle",
              "cx": 12.0,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-37",
      "solidworksName": "舵轮同步转向摇臂",
      "solidworksFile": "舵轮同步转向摇臂.SLDPRT",
      "drawingUrl": "docs/零件图册/P22.html",
      "featureCount": 1
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
      "size": [
        26.0,
        18.0,
        10.0
      ],
      "note": "位于前/后转向推杆耦合桥处(X=-58,Y=0,Z=50mm)，通过插拔『模式切换定位销』可在【同向蟹行全向平移(1:+1)】、【反向最小半径急转(1:-1)】与【双凸轮独立耦合】三种全向移动模式间一键切换",
      "keyDimensions": [
        {
          "name": "多模态耦合孔距",
          "value": "同向孔 +7.0 mm / 反向孔 -7.0 mm / 差动孔 0.0 mm",
          "note": "纯机械实现全向底盘多模态运动切换"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 26.0,
            "h": 18.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "circle",
              "cx": -7.0,
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
              "cx": 7.0,
              "cy": 0.0,
              "r": 1.6
            }
          ]
        }
      ],
      "partNumber": "SC-38",
      "solidworksName": "全向模式切换滑块",
      "solidworksFile": "全向模式切换滑块.SLDPRT",
      "drawingUrl": "docs/零件图册/P23.html",
      "featureCount": 1
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
      "size": [
        6.0,
        6.0,
        16.0
      ],
      "note": "带滚花帽头的Φ3mm快拆定位销，用于锁定全向模式切换滑块及前/后桥横拉杆耦合点",
      "keyDimensions": [
        {
          "name": "销径 × 总长",
          "value": "Φ3.0 f7 × 16.0 mm",
          "note": "免工具徒手切换蟹行/急转/复合模式"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "r": 2.8
          },
          "holes": []
        }
      ],
      "partNumber": "SC-39",
      "solidworksName": "模式切换定位销",
      "solidworksFile": "模式切换定位销.SLDPRT",
      "drawingUrl": "docs/零件图册/P24.html",
      "featureCount": 1
    },
    {
      "id": "E01",
      "name": "单晶硅太阳能电池板",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "category": "赛会指定电子件",
      "process": "层压成品件",
      "material": "单晶硅+钢化玻璃",
      "color": "#1e3a8a",
      "quantity": 1,
      "size": [
        66.0,
        113.0,
        3.0
      ],
      "note": "严格符合三期考核尺寸(66×113×3mm)，平置安装于车体中后部正上方(X=-22,Y=0,Z=96mm)，受光面100%无遮挡",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "66.0 × 113.0 × 3.0 mm",
          "note": "受光面朝+Z正上方"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 66.0,
            "h": 113.0,
            "fillet": 1.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-40",
      "solidworksName": "单晶硅太阳能电池板",
      "solidworksFile": "单晶硅太阳能电池板.SLDPRT",
      "drawingUrl": "docs/零件图册/E01.html",
      "featureCount": 1
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
      "size": [
        72.0,
        119.0,
        5.0
      ],
      "note": "承托66×113×3mm单晶硅太阳能电池板的轻量化护边框架(Z=93.5mm)",
      "keyDimensions": [
        {
          "name": "外框尺寸",
          "value": "72.0 × 119.0 × 5.0 mm",
          "note": "四角连接4根太阳能板支撑立柱"
        }
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
        }
      ],
      "partNumber": "SC-41",
      "solidworksName": "太阳能板承载框",
      "solidworksFile": "太阳能板承载框.SLDPRT",
      "drawingUrl": "docs/零件图册/P25.html",
      "featureCount": 1
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
      "size": [
        6.0,
        6.0,
        48.0
      ],
      "note": "4根Φ6×48mm立柱，将太阳能板承载框稳固支承在铝合金主底板上方",
      "keyDimensions": [
        {
          "name": "外径 × 长度",
          "value": "Φ6.0 × 48.0 mm",
          "note": "两端M3螺纹连接"
        }
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
        }
      ],
      "partNumber": "SC-42",
      "solidworksName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "drawingUrl": "docs/零件图册/P26.html",
      "featureCount": 1
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
      "size": [
        68.0,
        48.0,
        36.0
      ],
      "note": "符合三期考核规范(≤70×70×50mm)，布置于主底板中右部超级电容固定座内(X=+4,Y=-36,Z=62mm)",
      "keyDimensions": [
        {
          "name": "包络尺寸",
          "value": "68.0 × 48.0 × 36.0 mm",
          "note": "重心居中偏下，提高全向急转稳定性"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 68.0,
            "h": 48.0,
            "fillet": 4.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-43",
      "solidworksName": "超级电容储能模组",
      "solidworksFile": "超级电容储能模组.SLDPRT",
      "drawingUrl": "docs/零件图册/E02.html",
      "featureCount": 1
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
      "size": [
        72.0,
        52.0,
        10.0
      ],
      "note": "锁紧在铝合金主底板上表面右侧，四周波纹卡槽固定超级电容储能模组",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "72.0 × 52.0 × 10.0 mm",
          "note": "内腔68.4×48.4mm"
        }
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
        }
      ],
      "partNumber": "SC-44",
      "solidworksName": "超级电容固定座",
      "solidworksFile": "超级电容固定座.SLDPRT",
      "drawingUrl": "docs/零件图册/P27.html",
      "featureCount": 1
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
      "size": [
        64.0,
        44.0,
        6.0
      ],
      "note": "符合三期考核尺寸(≤65×45mm)，通过M3铜柱安装在铝合金主底板中左侧(X=+4,Y=+36,Z=52mm)",
      "keyDimensions": [
        {
          "name": "PCB尺寸",
          "value": "64.0 × 44.0 × 6.0 mm",
          "note": "集成MPPT太阳能充电管理与语音控制"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 64.0,
            "h": 44.0,
            "fillet": 2.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-45",
      "solidworksName": "充电与语音控制电路板",
      "solidworksFile": "充电与语音控制电路板.SLDPRT",
      "drawingUrl": "docs/零件图册/E03.html",
      "featureCount": 1
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
      "size": [
        35.0,
        84.0,
        24.0
      ],
      "note": "严格按开会记录要求(35×84×26mm)置于车头顶部正上方(X=+60,Y=0,Z=86mm)，液晶显示窗朝上100%无遮挡",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "35.0 × 84.0 × 24.0 mm",
          "note": "顶部完全无遮挡"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 35.0,
            "h": 84.0,
            "fillet": 2.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-46",
      "solidworksName": "顶部电能检测模块",
      "solidworksFile": "顶部电能检测模块.SLDPRT",
      "drawingUrl": "docs/零件图册/E04.html",
      "featureCount": 1
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
      "size": [
        38.0,
        92.0,
        32.0
      ],
      "note": "龙门式高架托架，跨过前桥平行四边形转向横拉杆上方，将顶部电能检测模块与红色LED指示灯稳固托举在车头顶部",
      "keyDimensions": [
        {
          "name": "跨度 × 高度",
          "value": "92.0 × 32.0 mm",
          "note": "下部净空完全避让前桥转向横拉杆"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 92.0,
            "h": 32.0,
            "fillet": 3.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": -4.0,
              "w": 74.0,
              "h": 24.0,
              "fillet": 2.0
            }
          ]
        }
      ],
      "partNumber": "SC-47",
      "solidworksName": "电能检测模块支架",
      "solidworksFile": "电能检测模块支架.SLDPRT",
      "drawingUrl": "docs/零件图册/P28.html",
      "featureCount": 1
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
      "size": [
        12.0,
        12.0,
        14.0
      ],
      "note": "符合开会记录『车顶部放置一个不小于8mm的红色LED指示灯』要求，采用Φ10mm高亮红色LED置于车头顶部(X=+60,Y=+50,Z=88mm)，无任何遮挡",
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
          "name": "Φ10mm红色LED灯体",
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
        }
      ],
      "partNumber": "SC-48",
      "solidworksName": "顶部红色LED指示灯",
      "solidworksFile": "顶部红色LED指示灯.SLDPRT",
      "drawingUrl": "docs/零件图册/E05.html",
      "featureCount": 1
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
      "size": [
        40.0,
        40.0,
        3.0
      ],
      "note": "符合三期考核尺寸(40×40×3mm)，安装在下层底部传动副底板下表面(X=+22,Y=0,Z=14mm)，由底部读卡器防护盒全封闭包裹不外露",
      "keyDimensions": [
        {
          "name": "模块尺寸",
          "value": "40.0 × 40.0 × 3.0 mm",
          "note": "距地面高度14mm，读卡灵敏度极佳"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 40.0,
            "h": 40.0,
            "fillet": 1.5
          },
          "holes": []
        }
      ],
      "partNumber": "SC-49",
      "solidworksName": "底部RFID读卡器模块",
      "solidworksFile": "底部RFID读卡器模块.SLDPRT",
      "drawingUrl": "docs/零件图册/E06.html",
      "featureCount": 1
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
      "size": [
        48.0,
        48.0,
        7.0
      ],
      "note": "严格落实开会记录『读卡器放在小车底部，不能外露』要求，全包裹封装底部RFID读卡器模块于副底板下方(Z=13mm)",
      "keyDimensions": [
        {
          "name": "外形尺寸",
          "value": "48.0 × 48.0 × 7.0 mm",
          "note": "非金属透波防护壳，完全不外露"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 48.0,
            "h": 48.0,
            "fillet": 3.0
          },
          "holes": []
        }
      ],
      "partNumber": "SC-50",
      "solidworksName": "底部读卡器防护盒",
      "solidworksFile": "底部读卡器防护盒.SLDPRT",
      "drawingUrl": "docs/零件图册/P29.html",
      "featureCount": 1
    },
    {
      "id": "P30",
      "name": "轻量化快拆外壳",
      "subsystem": "06 外壳护罩与标准紧固件",
      "category": "自制外观件",
      "process": "3D打印一体成型",
      "material": "半透轻质PLA",
      "color": "#38bdf8",
      "quantity": 1,
      "size": [
        208.0,
        158.0,
        36.0
      ],
      "note": "流线型全向车体快拆护罩，顶部大开口完全避让单晶硅太阳能板、顶部电能检测模块与红色LED指示灯，四角轮拱避让全向舵轮360°转向",
      "keyDimensions": [
        {
          "name": "外包络尺寸",
          "value": "208.0 × 158.0 × 36.0 mm",
          "note": "满足整车长≤250mm、宽≤200mm规范"
        }
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
          "params": {
            "cx": 0.0,
            "cy": 0.0,
            "w": 208.0,
            "h": 158.0,
            "fillet": 16.0
          },
          "holes": [
            {
              "shape": "rect",
              "cx": 0.0,
              "cy": 0.0,
              "w": 200.0,
              "h": 150.0,
              "fillet": 13.0
            }
          ]
        }
      ],
      "partNumber": "SC-51",
      "solidworksName": "轻量化快拆外壳",
      "solidworksFile": "轻量化快拆外壳.SLDPRT",
      "drawingUrl": "docs/零件图册/P30.html",
      "featureCount": 1
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
      "size": [
        6.0,
        6.0,
        10.0
      ],
      "note": "全车统一采用M3紧固体系（含电路板支撑铜柱与轴承座锁紧螺钉）",
      "keyDimensions": [
        {
          "name": "规格",
          "value": "M3 × 0.5 标准螺纹组件",
          "note": "全车单一扳手拆装"
        }
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
        }
      ],
      "partNumber": "SC-52",
      "solidworksName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "drawingUrl": "docs/零件图册/F01.html",
      "featureCount": 1
    }
  ],
  "placements": [
    {
      "instanceId": "I01",
      "partId": "P01",
      "partName": "铝合金主底板",
      "solidworksFile": "铝合金主底板.SLDPRT",
      "label": "铝合金主底板(上层Z=42)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#475569",
      "position": [
        0.0,
        0.0,
        42.0
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
      "instanceId": "I02",
      "partId": "P02",
      "partName": "底部传动副底板",
      "solidworksFile": "底部传动副底板.SLDPRT",
      "label": "底部传动副底板(下层Z=18)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#334155",
      "position": [
        0.0,
        0.0,
        18.0
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
      "instanceId": "I03",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(左后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        -54.0,
        56.0,
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
      "instanceId": "I04",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(右后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        -54.0,
        -56.0,
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
      "instanceId": "I05",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(左中)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        0.0,
        56.0,
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
      "instanceId": "I06",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(右中)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        0.0,
        -56.0,
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
      "instanceId": "I07",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(左前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        54.0,
        56.0,
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
      "instanceId": "I08",
      "partId": "P03",
      "partName": "底盘层间支撑柱",
      "solidworksFile": "底盘层间支撑柱.SLDPRT",
      "label": "底盘层间支撑柱(右前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        54.0,
        -56.0,
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
      "instanceId": "I09",
      "partId": "P04",
      "partName": "主传动轴立式轴承座",
      "solidworksFile": "主传动轴立式轴承座.SLDPRT",
      "label": "主传动轴立式轴承座(横轴左)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#3b82f6",
      "position": [
        -42.0,
        40.0,
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
      "instanceId": "I10",
      "partId": "P04",
      "partName": "主传动轴立式轴承座",
      "solidworksFile": "主传动轴立式轴承座.SLDPRT",
      "label": "主传动轴立式轴承座(横轴右)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#3b82f6",
      "position": [
        -42.0,
        -40.0,
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
      "instanceId": "I11",
      "partId": "P04",
      "partName": "主传动轴立式轴承座",
      "solidworksFile": "主传动轴立式轴承座.SLDPRT",
      "label": "主传动轴立式轴承座(纵轴后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#3b82f6",
      "position": [
        -12.0,
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
      "instanceId": "I12",
      "partId": "P04",
      "partName": "主传动轴立式轴承座",
      "solidworksFile": "主传动轴立式轴承座.SLDPRT",
      "label": "主传动轴立式轴承座(纵轴前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#3b82f6",
      "position": [
        38.0,
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
      "instanceId": "I13",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(横轴左)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        -42.0,
        40.0,
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
      "instanceId": "I14",
      "partId": "B01",
      "partName": "625ZZ深沟球轴承",
      "solidworksFile": "625ZZ深沟球轴承.SLDPRT",
      "label": "625ZZ深沟球轴承(横轴右)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#94a3b8",
      "position": [
        -42.0,
        -40.0,
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
      "instanceId": "I15",
      "partId": "P05",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(左前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#2563eb",
      "position": [
        68.0,
        52.0,
        42.0
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
      "instanceId": "I16",
      "partId": "P05",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(右前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#2563eb",
      "position": [
        68.0,
        -52.0,
        42.0
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
      "instanceId": "I17",
      "partId": "P05",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(左后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#2563eb",
      "position": [
        -68.0,
        52.0,
        42.0
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
      "instanceId": "I18",
      "partId": "P05",
      "partName": "全向舵轮主销轴承座",
      "solidworksFile": "全向舵轮主销轴承座.SLDPRT",
      "label": "全向舵轮主销轴承座(右后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#2563eb",
      "position": [
        -68.0,
        -52.0,
        42.0
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
      "instanceId": "I19",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#cbd5e1",
      "position": [
        68.0,
        52.0,
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
      "instanceId": "I20",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右前)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#cbd5e1",
      "position": [
        68.0,
        -52.0,
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
      "instanceId": "I21",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(左后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        52.0,
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
      "instanceId": "I22",
      "partId": "B03",
      "partName": "6700ZZ薄壁转向轴承",
      "solidworksFile": "6700ZZ薄壁转向轴承.SLDPRT",
      "label": "6700ZZ薄壁转向轴承(右后)",
      "subsystem": "01 双层高刚度全向底盘骨架",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        -52.0,
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
      "instanceId": "I23",
      "partId": "P06",
      "partName": "N20电机固定座",
      "solidworksFile": "N20电机固定座.SLDPRT",
      "label": "N20电机固定座",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#1d4ed8",
      "position": [
        -19.5,
        12.0,
        28.0
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
      "instanceId": "I24",
      "partId": "M01",
      "partName": "N20直流减速电机",
      "solidworksFile": "N20直流减速电机.SLDPRT",
      "label": "N20直流减速电机",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#64748b",
      "position": [
        -19.5,
        12.0,
        28.0
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
      "instanceId": "I25",
      "partId": "G02",
      "partName": "18齿电机主动齿轮",
      "solidworksFile": "18齿电机主动齿轮.SLDPRT",
      "label": "18齿电机主动齿轮",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#f59e0b",
      "position": [
        -19.5,
        28.0,
        28.0
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
      "instanceId": "I26",
      "partId": "G01",
      "partName": "72齿主减速大齿轮",
      "solidworksFile": "72齿主减速大齿轮.SLDPRT",
      "label": "72齿主减速大齿轮",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#eab308",
      "position": [
        -42.0,
        28.0,
        28.0
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
      "instanceId": "I27",
      "partId": "P07",
      "partName": "底部横向主传动轴",
      "solidworksFile": "底部横向主传动轴.SLDPRT",
      "label": "底部横向主传动轴",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#e2e8f0",
      "position": [
        -42.0,
        0.0,
        28.0
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
      "instanceId": "I28",
      "partId": "G05",
      "partName": "20齿分动直齿轮",
      "solidworksFile": "20齿分动直齿轮.SLDPRT",
      "label": "20齿分动直齿轮(前)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#f59e0b",
      "position": [
        16.0,
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
      "instanceId": "I29",
      "partId": "G05",
      "partName": "20齿分动直齿轮",
      "solidworksFile": "20齿分动直齿轮.SLDPRT",
      "label": "20齿分动直齿轮(后)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#f59e0b",
      "position": [
        -52.0,
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
      "instanceId": "I30",
      "partId": "P08",
      "partName": "底部纵向分动长轴",
      "solidworksFile": "底部纵向分动长轴.SLDPRT",
      "label": "底部纵向分动长轴",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
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
      "instanceId": "I31",
      "partId": "P10",
      "partName": "分动箱十字轴承座",
      "solidworksFile": "分动箱十字轴承座.SLDPRT",
      "label": "分动箱十字轴承座(前桥)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#0284c7",
      "position": [
        68.0,
        0.0,
        28.0
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
      "instanceId": "I32",
      "partId": "P10",
      "partName": "分动箱十字轴承座",
      "solidworksFile": "分动箱十字轴承座.SLDPRT",
      "label": "分动箱十字轴承座(后桥)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#0284c7",
      "position": [
        -68.0,
        0.0,
        28.0
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
      "instanceId": "I33",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(前分动箱中)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        68.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I34",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(后分动箱中)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        -68.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I35",
      "partId": "P09",
      "partName": "横向分动短轴",
      "solidworksFile": "横向分动短轴.SLDPRT",
      "label": "横向分动短轴(左前)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#cbd5e1",
      "position": [
        68.0,
        26.0,
        28.0
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
      "instanceId": "I36",
      "partId": "P09",
      "partName": "横向分动短轴",
      "solidworksFile": "横向分动短轴.SLDPRT",
      "label": "横向分动短轴(右前)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#cbd5e1",
      "position": [
        68.0,
        -26.0,
        28.0
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
      "instanceId": "I37",
      "partId": "P09",
      "partName": "横向分动短轴",
      "solidworksFile": "横向分动短轴.SLDPRT",
      "label": "横向分动短轴(左后)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        26.0,
        28.0
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
      "instanceId": "I38",
      "partId": "P09",
      "partName": "横向分动短轴",
      "solidworksFile": "横向分动短轴.SLDPRT",
      "label": "横向分动短轴(右后)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        -26.0,
        28.0
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
      "instanceId": "I39",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(左前主销顶)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        68.0,
        52.0,
        34.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I40",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(右前主销顶)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        68.0,
        -52.0,
        34.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I41",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(左后主销顶)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        -68.0,
        52.0,
        34.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I42",
      "partId": "G06",
      "partName": "16齿正交传力锥齿轮",
      "solidworksFile": "16齿正交传力锥齿轮.SLDPRT",
      "label": "16齿正交传力锥齿轮(右后主销顶)",
      "subsystem": "02 单电机1:4主减速与四轮锥齿分动系统",
      "color": "#d97706",
      "position": [
        -68.0,
        -52.0,
        34.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 2,
      "motion": "bevel_spin"
    },
    {
      "instanceId": "I43",
      "partId": "P11",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#38bdf8",
      "position": [
        68.0,
        52.0,
        40.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I44",
      "partId": "P13",
      "partName": "舵轮同轴传力竖销",
      "solidworksFile": "舵轮同轴传力竖销.SLDPRT",
      "label": "舵轮同轴传力竖销(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f8fafc",
      "position": [
        68.0,
        52.0,
        34.0
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
      "instanceId": "I45",
      "partId": "P12",
      "partName": "全向舵轮转向叉架",
      "solidworksFile": "全向舵轮转向叉架.SLDPRT",
      "label": "全向舵轮转向叉架(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#0284c7",
      "position": [
        68.0,
        52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I46",
      "partId": "P14",
      "partName": "舵轮固定横轴",
      "solidworksFile": "舵轮固定横轴.SLDPRT",
      "label": "舵轮固定横轴(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        68.0,
        52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I47",
      "partId": "G07",
      "partName": "舵轮轮边锥齿圈",
      "solidworksFile": "舵轮轮边锥齿圈.SLDPRT",
      "label": "舵轮轮边锥齿圈(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f59e0b",
      "position": [
        68.0,
        47.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I48",
      "partId": "W01",
      "partName": "高抓地全向舵轮",
      "solidworksFile": "高抓地全向舵轮.SLDPRT",
      "label": "高抓地全向舵轮(左前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#1e293b",
      "position": [
        68.0,
        52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I49",
      "partId": "P11",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#38bdf8",
      "position": [
        68.0,
        -52.0,
        40.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I50",
      "partId": "P13",
      "partName": "舵轮同轴传力竖销",
      "solidworksFile": "舵轮同轴传力竖销.SLDPRT",
      "label": "舵轮同轴传力竖销(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f8fafc",
      "position": [
        68.0,
        -52.0,
        34.0
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
      "instanceId": "I51",
      "partId": "P12",
      "partName": "全向舵轮转向叉架",
      "solidworksFile": "全向舵轮转向叉架.SLDPRT",
      "label": "全向舵轮转向叉架(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#0284c7",
      "position": [
        68.0,
        -52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I52",
      "partId": "P14",
      "partName": "舵轮固定横轴",
      "solidworksFile": "舵轮固定横轴.SLDPRT",
      "label": "舵轮固定横轴(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        68.0,
        -52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I53",
      "partId": "G07",
      "partName": "舵轮轮边锥齿圈",
      "solidworksFile": "舵轮轮边锥齿圈.SLDPRT",
      "label": "舵轮轮边锥齿圈(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f59e0b",
      "position": [
        68.0,
        -47.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I54",
      "partId": "W01",
      "partName": "高抓地全向舵轮",
      "solidworksFile": "高抓地全向舵轮.SLDPRT",
      "label": "高抓地全向舵轮(右前)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#1e293b",
      "position": [
        68.0,
        -52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_front"
    },
    {
      "instanceId": "I55",
      "partId": "P11",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -68.0,
        52.0,
        40.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I56",
      "partId": "P13",
      "partName": "舵轮同轴传力竖销",
      "solidworksFile": "舵轮同轴传力竖销.SLDPRT",
      "label": "舵轮同轴传力竖销(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f8fafc",
      "position": [
        -68.0,
        52.0,
        34.0
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
      "instanceId": "I57",
      "partId": "P12",
      "partName": "全向舵轮转向叉架",
      "solidworksFile": "全向舵轮转向叉架.SLDPRT",
      "label": "全向舵轮转向叉架(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#0284c7",
      "position": [
        -68.0,
        52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I58",
      "partId": "P14",
      "partName": "舵轮固定横轴",
      "solidworksFile": "舵轮固定横轴.SLDPRT",
      "label": "舵轮固定横轴(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I59",
      "partId": "G07",
      "partName": "舵轮轮边锥齿圈",
      "solidworksFile": "舵轮轮边锥齿圈.SLDPRT",
      "label": "舵轮轮边锥齿圈(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f59e0b",
      "position": [
        -68.0,
        47.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I60",
      "partId": "W01",
      "partName": "高抓地全向舵轮",
      "solidworksFile": "高抓地全向舵轮.SLDPRT",
      "label": "高抓地全向舵轮(左后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#1e293b",
      "position": [
        -68.0,
        52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I61",
      "partId": "P11",
      "partName": "全向转向空心主销套筒",
      "solidworksFile": "全向转向空心主销套筒.SLDPRT",
      "label": "全向转向空心主销套筒(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#38bdf8",
      "position": [
        -68.0,
        -52.0,
        40.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I62",
      "partId": "P13",
      "partName": "舵轮同轴传力竖销",
      "solidworksFile": "舵轮同轴传力竖销.SLDPRT",
      "label": "舵轮同轴传力竖销(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f8fafc",
      "position": [
        -68.0,
        -52.0,
        34.0
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
      "instanceId": "I63",
      "partId": "P12",
      "partName": "全向舵轮转向叉架",
      "solidworksFile": "全向舵轮转向叉架.SLDPRT",
      "label": "全向舵轮转向叉架(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#0284c7",
      "position": [
        -68.0,
        -52.0,
        22.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I64",
      "partId": "P14",
      "partName": "舵轮固定横轴",
      "solidworksFile": "舵轮固定横轴.SLDPRT",
      "label": "舵轮固定横轴(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#cbd5e1",
      "position": [
        -68.0,
        -52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I65",
      "partId": "G07",
      "partName": "舵轮轮边锥齿圈",
      "solidworksFile": "舵轮轮边锥齿圈.SLDPRT",
      "label": "舵轮轮边锥齿圈(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#f59e0b",
      "position": [
        -68.0,
        -47.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I66",
      "partId": "W01",
      "partName": "高抓地全向舵轮",
      "solidworksFile": "高抓地全向舵轮.SLDPRT",
      "label": "高抓地全向舵轮(右后)",
      "subsystem": "03 四轮独立全向舵轮模组(非麦轮)",
      "color": "#1e293b",
      "position": [
        -68.0,
        -52.0,
        20.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 3,
      "motion": "swerve_rear"
    },
    {
      "instanceId": "I67",
      "partId": "G03",
      "partName": "0.5模单头蜗杆",
      "solidworksFile": "0.5模单头蜗杆.SLDPRT",
      "label": "0.5模单头蜗杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#d97706",
      "position": [
        -42.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "primary_shaft"
    },
    {
      "instanceId": "I68",
      "partId": "G04",
      "partName": "30齿青铜蜗轮",
      "solidworksFile": "30齿青铜蜗轮.SLDPRT",
      "label": "30齿青铜蜗轮",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#b45309",
      "position": [
        -30.0,
        0.0,
        28.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I69",
      "partId": "P15",
      "partName": "凸轮传力竖轴",
      "solidworksFile": "凸轮传力竖轴.SLDPRT",
      "label": "凸轮传力竖轴",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#cbd5e1",
      "position": [
        -30.0,
        0.0,
        42.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I70",
      "partId": "P16",
      "partName": "凸轮轴立式轴承座",
      "solidworksFile": "凸轮轴立式轴承座.SLDPRT",
      "label": "凸轮轴立式轴承座",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#3b82f6",
      "position": [
        -30.0,
        0.0,
        44.0
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
      "instanceId": "I71",
      "partId": "C01",
      "partName": "主航向盘形转向凸轮",
      "solidworksFile": "主航向盘形转向凸轮.SLDPRT",
      "label": "主航向盘形转向凸轮(上层Z=56)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#ef4444",
      "position": [
        -30.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "cam_shaft"
    },
    {
      "instanceId": "I72",
      "partId": "C02",
      "partName": "差动转向副凸轮盘",
      "solidworksFile": "差动转向副凸轮盘.SLDPRT",
      "label": "差动转向副凸轮盘(下层Z=35)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#f97316",
      "position": [
        -30.0,
        0.0,
        35.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "cam_shaft_sub"
    },
    {
      "instanceId": "I73",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(主凸轮从动)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#94a3b8",
      "position": [
        -8.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I74",
      "partId": "B02",
      "partName": "MR84ZZ凸轮滚子轴承",
      "solidworksFile": "MR84ZZ凸轮滚子轴承.SLDPRT",
      "label": "MR84ZZ凸轮滚子轴承(副凸轮从动)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#94a3b8",
      "position": [
        -50.0,
        0.0,
        35.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I75",
      "partId": "P17",
      "partName": "纵向同步转向主推杆",
      "solidworksFile": "纵向同步转向主推杆.SLDPRT",
      "label": "纵向同步转向主推杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#10b981",
      "position": [
        26.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I76",
      "partId": "P18",
      "partName": "转向推杆直线导向座",
      "solidworksFile": "转向推杆直线导向座.SLDPRT",
      "label": "转向推杆直线导向座(中)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#059669",
      "position": [
        4.0,
        0.0,
        52.0
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
      "instanceId": "I77",
      "partId": "P18",
      "partName": "转向推杆直线导向座",
      "solidworksFile": "转向推杆直线导向座.SLDPRT",
      "label": "转向推杆直线导向座(前)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#059669",
      "position": [
        46.0,
        0.0,
        52.0
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
      "instanceId": "I78",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(主推杆)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#a8a29e",
      "position": [
        25.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_main"
    },
    {
      "instanceId": "I79",
      "partId": "P19",
      "partName": "后桥差动相位推杆",
      "solidworksFile": "后桥差动相位推杆.SLDPRT",
      "label": "后桥差动相位推杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#34d399",
      "position": [
        -62.0,
        0.0,
        35.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I80",
      "partId": "SP1",
      "partName": "推杆复位圆柱弹簧",
      "solidworksFile": "推杆复位圆柱弹簧.SLDPRT",
      "label": "推杆复位圆柱弹簧(后差动推杆)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#a8a29e",
      "position": [
        -62.0,
        0.0,
        35.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I81",
      "partId": "P22",
      "partName": "舵轮同步转向摇臂",
      "solidworksFile": "舵轮同步转向摇臂.SLDPRT",
      "label": "舵轮同步转向摇臂(左前)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#0ea5e9",
      "position": [
        74.0,
        52.0,
        54.0
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
      "instanceId": "I82",
      "partId": "P22",
      "partName": "舵轮同步转向摇臂",
      "solidworksFile": "舵轮同步转向摇臂.SLDPRT",
      "label": "舵轮同步转向摇臂(右前)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#0ea5e9",
      "position": [
        74.0,
        -52.0,
        54.0
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
      "instanceId": "I83",
      "partId": "P22",
      "partName": "舵轮同步转向摇臂",
      "solidworksFile": "舵轮同步转向摇臂.SLDPRT",
      "label": "舵轮同步转向摇臂(左后)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#0ea5e9",
      "position": [
        -74.0,
        52.0,
        54.0
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
      "instanceId": "I84",
      "partId": "P22",
      "partName": "舵轮同步转向摇臂",
      "solidworksFile": "舵轮同步转向摇臂.SLDPRT",
      "label": "舵轮同步转向摇臂(右后)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#0ea5e9",
      "position": [
        -74.0,
        -52.0,
        54.0
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
      "instanceId": "I85",
      "partId": "P20",
      "partName": "前桥平行四边形转向横拉杆",
      "solidworksFile": "前桥平行四边形转向横拉杆.SLDPRT",
      "label": "前桥平行四边形转向横拉杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#06b6d4",
      "position": [
        82.0,
        0.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I86",
      "partId": "P21",
      "partName": "后桥平行四边形转向横拉杆",
      "solidworksFile": "后桥平行四边形转向横拉杆.SLDPRT",
      "label": "后桥平行四边形转向横拉杆",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#0891b2",
      "position": [
        -82.0,
        0.0,
        54.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "tie_rod_rear"
    },
    {
      "instanceId": "I87",
      "partId": "P23",
      "partName": "全向模式切换滑块",
      "solidworksFile": "全向模式切换滑块.SLDPRT",
      "label": "全向模式切换滑块",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#ec4899",
      "position": [
        -58.0,
        0.0,
        50.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I88",
      "partId": "P24",
      "partName": "模式切换定位销",
      "solidworksFile": "模式切换定位销.SLDPRT",
      "label": "模式切换定位销(前桥耦合)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#f43f5e",
      "position": [
        82.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "tie_rod_front"
    },
    {
      "instanceId": "I89",
      "partId": "P24",
      "partName": "模式切换定位销",
      "solidworksFile": "模式切换定位销.SLDPRT",
      "label": "模式切换定位销(模式选择)",
      "subsystem": "04 双凸轮正交连杆与四轮同步全向转向机构",
      "color": "#f43f5e",
      "position": [
        -58.0,
        0.0,
        56.0
      ],
      "rotation": [
        0.0,
        0.0,
        0.0
      ],
      "step": 4,
      "motion": "pushrod_rear"
    },
    {
      "instanceId": "I90",
      "partId": "E06",
      "partName": "底部RFID读卡器模块",
      "solidworksFile": "底部RFID读卡器模块.SLDPRT",
      "label": "底部RFID读卡器模块",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#0284c7",
      "position": [
        22.0,
        0.0,
        14.5
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
      "instanceId": "I91",
      "partId": "P29",
      "partName": "底部读卡器防护盒",
      "solidworksFile": "底部读卡器防护盒.SLDPRT",
      "label": "底部读卡器防护盒",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        22.0,
        0.0,
        13.5
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
      "instanceId": "I92",
      "partId": "P27",
      "partName": "超级电容固定座",
      "solidworksFile": "超级电容固定座.SLDPRT",
      "label": "超级电容固定座",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#475569",
      "position": [
        4.0,
        -36.0,
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
      "instanceId": "I93",
      "partId": "E02",
      "partName": "超级电容储能模组",
      "solidworksFile": "超级电容储能模组.SLDPRT",
      "label": "超级电容储能模组",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#047857",
      "position": [
        4.0,
        -36.0,
        62.0
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
      "instanceId": "I94",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(控制板左前)",
      "subsystem": "06 外壳护罩与标准紧固件",
      "color": "#facc15",
      "position": [
        28.0,
        48.0,
        47.0
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
      "instanceId": "I95",
      "partId": "F01",
      "partName": "M3铜柱与紧固件套件",
      "solidworksFile": "M3铜柱与紧固件套件.SLDPRT",
      "label": "M3铜柱与紧固件套件(控制板左后)",
      "subsystem": "06 外壳护罩与标准紧固件",
      "color": "#facc15",
      "position": [
        -20.0,
        48.0,
        47.0
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
      "instanceId": "I96",
      "partId": "E03",
      "partName": "充电与语音控制电路板",
      "solidworksFile": "充电与语音控制电路板.SLDPRT",
      "label": "充电与语音控制电路板",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#15803d",
      "position": [
        4.0,
        36.0,
        53.0
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
      "instanceId": "I97",
      "partId": "P28",
      "partName": "电能检测模块支架",
      "solidworksFile": "电能检测模块支架.SLDPRT",
      "label": "电能检测模块支架",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#475569",
      "position": [
        58.0,
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
      "instanceId": "I98",
      "partId": "E04",
      "partName": "顶部电能检测模块",
      "solidworksFile": "顶部电能检测模块.SLDPRT",
      "label": "顶部电能检测模块",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#0f172a",
      "position": [
        58.0,
        0.0,
        86.0
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
      "instanceId": "I99",
      "partId": "E05",
      "partName": "顶部红色LED指示灯",
      "solidworksFile": "顶部红色LED指示灯.SLDPRT",
      "label": "顶部红色LED指示灯",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#dc2626",
      "position": [
        60.0,
        50.0,
        88.0
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
      "instanceId": "I100",
      "partId": "P26",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(左后)",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        -52.0,
        50.0,
        68.0
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
      "instanceId": "I101",
      "partId": "P26",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(右后)",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        -52.0,
        -50.0,
        68.0
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
      "instanceId": "I102",
      "partId": "P26",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(左前)",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        8.0,
        50.0,
        68.0
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
      "instanceId": "I103",
      "partId": "P26",
      "partName": "太阳能板支撑立柱",
      "solidworksFile": "太阳能板支撑立柱.SLDPRT",
      "label": "太阳能板支撑立柱(右前)",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#64748b",
      "position": [
        8.0,
        -50.0,
        68.0
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
      "instanceId": "I104",
      "partId": "P25",
      "partName": "太阳能板承载框",
      "solidworksFile": "太阳能板承载框.SLDPRT",
      "label": "太阳能板承载框",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#334155",
      "position": [
        -22.0,
        0.0,
        93.5
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
      "instanceId": "I105",
      "partId": "E01",
      "partName": "单晶硅太阳能电池板",
      "solidworksFile": "单晶硅太阳能电池板.SLDPRT",
      "label": "单晶硅太阳能电池板",
      "subsystem": "05 太阳能供电与赛会电控检测系统",
      "color": "#1e3a8a",
      "position": [
        -22.0,
        0.0,
        96.0
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
      "instanceId": "I106",
      "partId": "P30",
      "partName": "轻量化快拆外壳",
      "solidworksFile": "轻量化快拆外壳.SLDPRT",
      "label": "轻量化快拆外壳",
      "subsystem": "06 外壳护罩与标准紧固件",
      "color": "#38bdf8",
      "position": [
        0.0,
        0.0,
        60.0
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
      "title": "步骤 1：双层高刚度全向底盘骨架与四角舵轮主销轴承座装配",
      "summary": "以『铝合金主底板』(200×150×4mm, Z=42mm)与『底部传动副底板』(176×124×3.5mm, Z=18mm)构成的上下双层笼式结构为基准，用6根『底盘层间支撑柱』刚性锁紧；在副底板上安装4件『主传动轴立式轴承座』(含『625ZZ深沟球轴承』)；在主底板四角(X=±68,Y=±52mm)安装4件『全向舵轮主销轴承座』并压入8只『6700ZZ薄壁转向轴承』。",
      "parts": [
        "铝合金主底板",
        "底部传动副底板",
        "底盘层间支撑柱",
        "主传动轴立式轴承座",
        "全向舵轮主销轴承座",
        "625ZZ深沟球轴承",
        "6700ZZ薄壁转向轴承"
      ],
      "checkPoint": "确认上下双层底板平行度≤0.05mm，四角全向舵轮主销轴承孔垂直于底板平面。"
    },
    {
      "step": 2,
      "title": "步骤 2：单电机 1:4 主减速与四轮正交锥齿轮分动系统装配",
      "summary": "在底部传动副底板上锁紧『N20电机固定座』与『N20直流减速电机』(杜绝悬空)，电机轴装『18齿电机主动齿轮』，与『底部横向主传动轴』上的『72齿主减速大齿轮』精确构成 1:4 主减速(中心距22.50mm)。通过『20齿分动直齿轮』驱动贯通前后的『底部纵向分动长轴』，经前/后『分动箱十字轴承座』内的『16齿正交传力锥齿轮』90°分流至4根『横向分动短轴』及四角主销顶部锥齿轮。",
      "parts": [
        "N20电机固定座",
        "N20直流减速电机",
        "18齿电机主动齿轮",
        "72齿主减速大齿轮",
        "底部横向主传动轴",
        "20齿分动直齿轮",
        "底部纵向分动长轴",
        "分动箱十字轴承座",
        "16齿正交传力锥齿轮",
        "横向分动短轴"
      ],
      "checkPoint": "手动旋转72齿主减速大齿轮，检查前后桥4根横向分动短轴与四角顶部锥齿轮同步顺畅旋转。"
    },
    {
      "step": 3,
      "title": "步骤 3：四轮独立同轴全向舵轮模组（非麦轮）装配",
      "summary": "在四角『全向舵轮主销轴承座』中穿入4件『全向转向空心主销套筒』，下端锁紧『全向舵轮转向叉架』；在空心主销套筒中心通孔内穿入『舵轮同轴传力竖销』，使其上下两端锥齿轮分别与横向分动短轴及『舵轮轮边锥齿圈』正交啮合；最后用『舵轮固定横轴』安装4只『高抓地全向舵轮』(Φ40×10mm实心防滑橡胶胎，绝不使用麦轮)。",
      "parts": [
        "全向转向空心主销套筒",
        "全向舵轮转向叉架",
        "舵轮同轴传力竖销",
        "舵轮轮边锥齿圈",
        "舵轮固定横轴",
        "高抓地全向舵轮"
      ],
      "checkPoint": "验证4只全向舵轮绕各自竖直主销偏转任意角度(±90°/360°)时，中心同轴传力竖销均能无干涉传递驱动力矩。"
    },
    {
      "step": 4,
      "title": "步骤 4：1:30 蜗轮蜗杆与双凸轮正交连杆全向转向系统联调",
      "summary": "在横向主传动轴中段锁紧『0.5模单头蜗杆』，驱动『凸轮传力竖轴』下端的『30齿青铜蜗轮』(1:30减速)；在竖轴上层(Z=56mm)安装『主航向盘形转向凸轮』(C01)，下层(Z=35mm)安装『差动转向副凸轮盘』(C02)。安装『纵向同步转向主推杆』、『后桥差动相位推杆』、『转向推杆直线导向座』、『推杆复位圆柱弹簧』与2只『MR84ZZ凸轮滚子轴承』；在4只空心主销套筒顶端锁紧『舵轮同步转向摇臂』，用『前桥平行四边形转向横拉杆』、『后桥平行四边形转向横拉杆』、『全向模式切换滑块』与『模式切换定位销』完成前后四轮同步全向转向闭环。",
      "parts": [
        "0.5模单头蜗杆",
        "30齿青铜蜗轮",
        "凸轮传力竖轴",
        "凸轮轴立式轴承座",
        "主航向盘形转向凸轮",
        "差动转向副凸轮盘",
        "MR84ZZ凸轮滚子轴承",
        "纵向同步转向主推杆",
        "转向推杆直线导向座",
        "推杆复位圆柱弹簧",
        "后桥差动相位推杆",
        "前桥平行四边形转向横拉杆",
        "后桥平行四边形转向横拉杆",
        "舵轮同步转向摇臂",
        "全向模式切换滑块",
        "模式切换定位销"
      ],
      "checkPoint": "切换定位销位置，验证【四轮同向蟹行全向平移(δ前=δ后)】与【四轮反向急转(δ前=-δ后)】两种全向转向模式顺畅无卡滞。"
    },
    {
      "step": 5,
      "title": "步骤 5：太阳能电池板、超级电容、控制板、顶部电能表与底部读卡器安装",
      "summary": "在副底板底部安装『底部RFID读卡器模块』并套上非金属『底部读卡器防护盒』(完全不外露)；在主底板上安装『超级电容固定座』、『超级电容储能模组』、『M3铜柱与紧固件套件』与『充电与语音控制电路板』；在车头跨接『电能检测模块支架』，顶部无遮挡安装『顶部电能检测模块』与Φ10mm『顶部红色LED指示灯』；用4根『太阳能板支撑立柱』架起『太阳能板承载框』与『单晶硅太阳能电池板』。",
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
        "M3铜柱与紧固件套件"
      ],
      "checkPoint": "确认顶部太阳能电池板、顶部电能检测模块显示屏、顶部Φ10mm红色LED指示灯100%无遮挡，底部RFID读卡器完全不外露。"
    },
    {
      "step": 6,
      "title": "步骤 6：轻量化快拆外壳总装与全向运动终检",
      "summary": "扣合『轻量化快拆外壳』，核验整车总尺寸为 216mm(长) × 164mm(宽) × 106mm(高)，严格满足赛题『宽≤200mm、长≤250mm』要求。",
      "parts": [
        "轻量化快拆外壳"
      ],
      "checkPoint": "全车共38种核心零件(106个装配实例)，网页显示的每一个零件名与SolidWorks零件文件名(.SLDPRT) 100%一一对应。"
    }
  ]
};
