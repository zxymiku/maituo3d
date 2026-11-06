# agent.md — maituo3d 太阳能小车 SolidWorks 建模协作规范

> 本文件约束所有在本工作区进行 SolidWorks 建模 / 装配 / 出图的 AI Agent 与人工操作者。
> 项目：R4.1 单电机模块化太阳能小车（来源：GPT6.1sol 网页建模交付包）。
> 真实 SolidWorks 建模唯一落盘位置：`C:\dev\maituo3d\solidworks`。

---

## 1. 目录与数据源约定

| 路径 | 作用 |
|---|---|
| `C:\dev\maituo3d\太阳能小车R4.1实选审查完整交付包\` | GPT6.1sol 网页建模原始交付包（唯一设计真源） |
| `...\solar-car\model-data.js` | `window.CAR_SPEC`：206 类零件、1206 项特征、装配步骤（mm / °） |
| `...\solar-car\docs\完整尺寸数据.json` | 归一化建模数据（solids / subtractions / cutters / volumeMm3），供自动建模脚本消费 |
| `C:\dev\maituo3d\solidworks\` | **唯一**的原生 SolidWorks 零件 / 装配输出目录 |
| `C:\dev\maituo3d\solidworks\检查记录\` | 审计记录：`build-index-v2.json`（逐件状态账本）、预览 BMP、审查报告 |
| `C:\dev\maituo3d\.skills\solidworks-automation\` | SolidWorks 自动化 Skill（能力真源 `capabilities.yaml`） |
| `C:\dev\maituo3d\tools\sw_build_all.py` | 批量原生建模脚本（v2，带断点续建） |
| `C:\dev\maituo3d\零件表.md` | 全部 206 件打勾跟踪表，完成一件勾一件 |
| `C:\dev\maituo3d\agent.md` | 本规范 |

## 2. 建模铁律

1. **先读 Skill 再动手**：任何 SolidWorks 操作前阅读 `.skills/solidworks-automation/SKILL.md`；能力等级以 `capabilities.yaml` 为准，`reference_only` / `not_implemented` 能力不得无人值守交付。
2. **单位**：API 一律米；用 `mm()` 换算。源数据 mm / °。
3. **草图完全定义**：每个特征草图必须经 `fully_define_sketch()`（禁止批量 Fix 代替设计参数），验收标准：`GetConstrainedStatus()==3` 且至少 1 个驱动尺寸且 fix 关系数为 0。多顶点多边形轮廓应先加设计尺寸（半径 / 长宽 / 关键定位），再补关系。
4. **几何真源**：轮廓、孔位、深度一律取自 `完整尺寸数据.json` / `model-data.js`，不得凭空想象尺寸。确需简化（齿轮齿形→齿坯、>60 点多边形→外包矩形、螺纹→光孔）必须写入该零件 `approximations` 记录。
5. **及时保存**：每完成一个零件立即 `session.save()` 到 `C:\dev\maituo3d\solidworks\<零件ID>.SLDPRT`；保存后重开复核草图状态。
6. **审计先行**：每件结果（状态、草图证据、体积误差、简化项）实时写入 `检查记录\build-index-v2.json`；体积误差仅作参考，草图完全定义 + 落盘成功才是通过标准。
7. **预览自审**：新几何用 `sw_review.py` 导出等轴测等视图并目视复核；发现缺件 / 重叠 / 方位错误先返工再汇报。

## 3. 多 Agent 协作纪律（重要）

1. **COM 串行**：SolidWorks COM 操作必须串行。动手前先检查是否有别的建模进程在跑：
   `powershell "Get-CimInstance Win32_Process -Filter \"Name like '%python%'\" | Select ProcessId,CommandLine"`。
   若发现 `sw_build_all.py` 或其他建模脚本正在运行：**等待或错峰，不要并发调用 COM，更不要杀对方进程**。
2. **窗口隔离**：豆包等其他 Agent 可能占用已打开的 SolidWorks 实例。需要独占建模时可另行启动独立 SolidWorks 实例再连接；连接时核对 `process_id`，确认目标实例后再操作。
3. **只关自己打开的文档**：关闭旧窗口 / 释放内存时只关闭**本轮自己创建并已保存**的文档（`session.close_owned_documents()`）；用户手动打开的、锁文件（`~$*.SLDPRT`）对应的文档一律不碰。
4. **内存卫生**：每件保存 + 重开审计完成后立即关闭该文档，不让几十个零件同时滞留内存；批次结束后清理残余文档。SolidWorks 进程内存 >6GB 时建议提醒用户重启实例再继续。
5. **文件锁**：看到 `~$xxx.SLDPRT` 说明该文件被某实例打开，跳过或等待，不要强删。

## 4. 批量建模流程（tools/sw_build_all.py）

```bash
# 断点续建（读取 build-index-v2.json，跳过已成功件）：
cd C:\dev\maituo3d && python tools\sw_build_all.py
# 只补指定件：
python tools\sw_build_all.py --ids P19 P20 M01
```

- 状态账本：`solidworks\检查记录\build-index-v2.json`，`native_saved` / `saved_review_sketch` 视为完成，`failed` 需修复后重跑。
- 单件失败常见根因与对策：
  - `circle failed` → 重试 / 微偏心画圆（脚本已内置），仍失败检查基准面名称（中英文兼容）。
  - `草图未通过完全定义` 且 `dimension_count=0` → 轮廓缺设计尺寸：先加半径 / 长宽尺寸再 `FullyDefineSketch`。
  - `cutter failed` / `boss failed` → 特征返回 None：检查轮廓闭合、深度方向与起始偏移。
  - `KeyError: 'profile'` → 源数据特征缺 profile 字段，按 features 手工补建。

## 5. 装配规范

1. 装配体保存为 `C:\dev\maituo3d\solidworks\<名称>.SLDASM`（整车装配建议 `SOLAR_CAR_R41.SLDASM`）。
2. 添加组件用 `sw_assembly.add_component()`（SW2024 中文版下自动回退 `AddComponent5`）。
3. 旋转件用同心 Mate 且 `lock_rotation=False`，不得用三基准面把可动件锁死；齿轮传动用真实 Gear Mate。
4. 配合创建后用 `collect_mate_feature_summary()` 验证 MateGroup 下存在真实 Mate 特征。
5. 装配前确认全部零件已 `native_saved` 且草图通过；缺件先补件再装配。

## 6. 零件表维护

- `C:\dev\maituo3d\零件表.md` 是唯一进度看板：全部 206 件逐行列出，完成即把 `[ ]` 改 `[x]` 并填入文件名与体积误差。
- 每完成一件（保存 + 审计通过后）**立即**更新零件表，不要攒批。
- 修复/重建某件后在表中补记日期与备注。

## 7. 关键经验（2026-11-05 实测，必读）

1. **草图绘制必须包在 `SketchManager.AddToDB = True ... False` 里**：自动化新启动的 SolidWorks 实例会因捕捉/推理（snap/inferencing）破坏精确草图几何——实测 `CreateCircleByRadius(1.001,1.001,r1.0)` 变成 r=2.001 的圆心在原点的圆；50×1.6 的窄矩形轮廓无法拉伸；微小圆(r<1.2mm)创建失败。AddToDB 直写数据库后这些问题全部消失。
2. **画完必须回读验证**：对圆读取 `GetRadius/GetCenterPoint2`，与名义值比对，不符即删除重画（回退链：AddToDB 圆 → CreateCircle → 精确原点 → 两段 3 点弧）。
3. **Create3PointArc 实测签名**：`Create3PointArc(X1,Y1,Z1, X2,Y2,Z2, X3,Y3,Z3)` 从点 1 扫到**点 2**、经过点 3（即 start, END, mid），与直觉相反；6 参数调用报“非选择性的参数”。
4. **CreateArc 的 180° 半圆方向不可靠**（D 形/槽端盖）：改用 Create3PointArc 或折线近似（24 段折线误差 < 0.1%r）。
5. **FullyDefineSketch(MoveEntities=True) 会移动草图实体**：对六角螺母、D 形等异形轮廓，先补齐驱动尺寸（半径/弦长/弦位置）再调用，否则几何被拖变形（实测 D 弦从 1.2 被拖到 0.6）。
6. **内孔形状支持**：矩形/槽形/D 形内孔必须显式绘制并切除（槽孔可按“矩形+两端圆”或“整体矩形”切除），不要把非圆内孔“当作实体保留”。
7. **非原点位置的草图必须经过 `sketch_xy(axis, center, off, u, v)` 映射**（含 UV 翻转），否则孔/槽画到体外，切除静默失败。
8. **冗余切除（重切/复切）要跳过**：孔向导底孔与螺纹底孔同径同轴时，第二次切除切到空气，FeatureCut4 返回 None。
9. **每阶段一个 SolidWorks 实例**：`run_sw.py` 等待干净状态 → Dispatch 启动 → 结束 `quit_owned_instance()`；跨脚本附着 Dispatch 启动的实例会 ROT 失败。
10. **闭环轮廓（同步带/胶框垫）**：不要把 >60 点闭环简化成外接矩形（体积差 7 倍）；同步带 = 两轮心距 d、外半径 ro、内半径 ri 的“跑道环”（外槽拉伸 + 内槽切除，误差 <0.1%）。

## 8.1 装配方向与配合教训（2026-11-05 补充）

1. **坐标系**：网页建模 Z 向上，SolidWorks 标准视图 Y 向上。装配组件落位后必须整体叠加 R_x(-90°)，否则小车在默认视图中"躺倒"。组件变换 = R_global × R_instance，平移 = R_global × pos（mm→m）。
2. **演示性同心配合会拖拽部件**：同心配合释放轴向自由度，任何 SetTransformAndSolve2/重建都可能让轮/轴/齿轮沿轴滑动（实测被拖出 88 m）。名义位置装配不要保留这类配合；运动学装配必须补齐端面/宽度约束。
3. **组件名 "PART-N" 的 N 是插入顺序**：与源实例表中该零件的第 N 个实例对应，可用于确定性匹配（位置匹配在部件被拖远后会失配）。
4. **轻量化组件**：GetSuppression2 返回 2（LIGHTWEIGHT）时 SetTransformAndSolve2 可能不生效，需先 resolve_component。

## 8. 交付状态（2026-11-05 04:30）

- 零件：206/206 落盘于 `C:\dev\maituo3d\solidworks\<ID>.SLDPRT`；205 件草图完全定义并通过保存重开复核；P05 有 7/30 张草图在强制重建后降级为欠定义（几何正确、体积误差 2.7%，已记录）。
- 体积误差：除 G02（齿轮齿形简化 9.3%）、P23（30.1%）、P26（8.5%）外全部 ≤2.7%；每件简化项记录在 `build-index-v2.json` 的 approximations。
- 装配：`太阳能小车_R4_1_总装.SLDASM`（316 实例，名义位置）；`太阳能小车_R4_1_清扫工具装配.SLDASM`（362 实例 + 6 组同心配合：P04↔B01.01/B01.02/G01.01、K03↔K02/B01.14/B01.15）。
- 账本：`solidworks\检查记录uild-index-v2.json`（逐件状态）、`audit-all.json`（重开复核）、`assembly_enhance_report.json`（装配）。

## 9. 红线

- 禁止修改 / 删除网页交付包原始数据来“迁就”建模脚本。
- 禁止把未通过验收的零件标记为完成。
- 禁止在未保存的情况下关闭文档窗口。
- 禁止同时向同一 SolidWorks 实例并发提交两个自动化任务。
- 网页建模的包络 / 相位检查结论不能替代原生 SolidWorks 重开复核。

## 10. R5 用户授权设计修订（2026-11-05）

用户要求取消左右外壳、仅保留一块置于PCB上方的光伏板、合并电源板、采用薄轮面及凸轮机械转向。新版真源为 solar-car-r5/docs/完整尺寸数据.json；R4.1原交付包仍冻结，不得覆盖。R5原生件以 solidworks/R5_ 前缀另存，复核在 solidworks/检查记录/R5；入口 打开太阳能小车.html 指向R5。

用户明确要求：完成一件建模后立即保存、重开复核并关闭对应窗口。装配时自动打开的本轮零件依赖也须在保存后关闭，避免遗留大量窗口和内存占用；不关闭本轮开始前已有的用户窗口。
