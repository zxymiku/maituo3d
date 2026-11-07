#!/usr/bin/env python3
"""总装核验: 打开已保存的总装, 逐组件回读变换平移量, 与网页 placement 对比;
并回读装配 GetBox 与精确包络。"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))
sys.path.insert(0, str(ROOT / "tools"))

from sw_session import SolidWorksSession  # noqa: E402
from sw_connect import get_com_member  # noqa: E402

MM = 1.0 / 1000.0

spec = json.loads((ROOT / "solar-car-r5" / "docs" / "完整尺寸数据.json").read_text(encoding="utf-8"))
expect = {}  # componentName -> (instanceId, posMm)
for pl in spec["placements"]:
    expect[str(pl["instanceId"])] = [float(v) for v in pl["position"]]

session = SolidWorksSession()
try:
    model = session.open(str(ROOT / "solidworks" / "太阳能小车R5总装.SLDASM"), read_only=True)
    comps = list(get_com_member(model, "GetComponents", False) or [])
    print("components:", len(comps))
    # 逐组件回读平移量 (动态 dispatch 对 Transform2 属性支持不稳, 用 GetTotalTransform 兜底)
    mismatch = 0
    checked = 0
    for c in comps:
        name = str(get_com_member(c, "Name2"))
        got_mm = None
        for member in ("GetTotalTransform", "Transform2"):
            try:
                transform = get_com_member(c, member)
                if transform is None:
                    continue
                trans = None
                for tm in ("TranslationData", "Translation"):
                    try:
                        trans = get_com_member(transform, tm)
                        break
                    except Exception:
                        continue
                if trans and len(list(trans)) == 3:
                    got_mm = [round(v / MM, 3) for v in trans]
                    break
            except Exception:
                continue
        if got_mm is None:
            continue
        best = min(expect.items(), key=lambda kv: sum(abs(a - b) for a, b in zip(kv[1], got_mm)))
        dev = max(abs(a - b) for a, b in zip(best[1], got_mm))
        checked += 1
        if dev > 0.01:
            mismatch += 1
            if mismatch <= 5:
                print(f"  MISMATCH {name}: got {got_mm} vs nearest {best[0]} {best[1]} dev={dev:.3f}mm")
    print(f"transform check: {checked} checked, {mismatch} mismatches (>0.01mm)")
    for flag in (0, 1):
        try:
            box = list(get_com_member(model, "GetBox", flag) or [])
            if len(box) == 6:
                lo = [round(v / MM, 2) for v in box[:3]]
                hi = [round(v / MM, 2) for v in box[3:]]
                print(f"GetBox({flag}) mm-interp: lo={lo} hi={hi}")
        except Exception as exc:
            print(f"GetBox({flag}) failed: {exc}")
finally:
    session.close()
