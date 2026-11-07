#!/usr/bin/env python3
"""迷你总装策略测试: 6 种零件 / 17 实例, 验证 分组添加+关闭源文档 路径。"""
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tools"))
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))

import sw_build_all as B  # noqa: E402

TEST_DIR = ROOT / "solidworks-test-asm"
TEST_DIR.mkdir(exist_ok=True)

spec = B.load_car_spec()
# 取前 6 种不同零件的全部实例 (P01×1, P02×1, P04×1, P05×1, P06×6, P07×1 ...)
part_ids = []
placements = []
for pl in spec["placements"]:
    if pl["partId"] not in part_ids and len(part_ids) < 6:
        part_ids.append(pl["partId"])
    if pl["partId"] in part_ids:
        placements.append(pl)
parts = [p for p in spec["parts"] if p["id"] in part_ids]
for p in parts:
    shutil.copy2(ROOT / "solidworks" / p["solidworksFile"], TEST_DIR / p["solidworksFile"])
spec_small = {"parts": parts, "placements": placements}
print("test parts:", part_ids, "instances:", len(placements))

B.SK = B.load_sw_skill_modules()
session = B.SK["SolidWorksSession"]()
try:
    rec = B.build_assembly(session, spec_small, TEST_DIR)
    print(json.dumps({k: v for k, v in rec.items() if k != "mateSummary"}, ensure_ascii=False, indent=1)[:1500])
finally:
    pass
