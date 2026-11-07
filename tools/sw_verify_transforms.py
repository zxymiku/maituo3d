#!/usr/bin/env python3
"""早期绑定核验总装: 逐组件回读 Transform2.TranslationData 与网页 placement 对比。"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))
sys.path.insert(0, str(ROOT / "tools"))

import win32com.client  # noqa: E402
import pythoncom  # noqa: E402

from sw_connect import VARIANT  # noqa: E402
from sw_session import SolidWorksSession  # noqa: E402


def transform_translation(t):
    """读取 IMathTransform 平移分量 (SW2024 GetData2 by-ref 出参)。"""
    import math as _math
    try:
        from sw_connect import get_com_member as _gcm
        t_eb = t
        xa = VARIANT(pythoncom.VT_BYREF | pythoncom.VT_VARIANT, None)
        ya = VARIANT(pythoncom.VT_BYREF | pythoncom.VT_VARIANT, None)
        za = VARIANT(pythoncom.VT_BYREF | pythoncom.VT_VARIANT, None)
        tr = VARIANT(pythoncom.VT_BYREF | pythoncom.VT_VARIANT, None)
        t_eb.GetData2(xa, ya, za, tr)
        return list(tr.value)
    except Exception:
        return None

MM = 1.0 / 1000.0

spec = json.loads((ROOT / "solar-car-r5" / "docs" / "完整尺寸数据.json").read_text(encoding="utf-8"))
expected_by_part = {}
for pl in spec["placements"]:
    expected_by_part.setdefault(pl["partName"], []).append([float(v) for v in pl["position"]])

session = SolidWorksSession()
try:
    model = session.open(str(ROOT / "solidworks" / "太阳能小车R5总装.SLDASM"), read_only=True)
    # makepy 模块已生成, 用原始 _oleobj_ 重新包装以获得早期绑定
    model_eb = win32com.client.Dispatch(model._oleobj_)
    comps = list(model_eb.GetComponents(False))
    comps = [win32com.client.Dispatch(c._oleobj_) if hasattr(c, "_oleobj_") else c for c in comps]
    print("components:", len(comps))
    checked = mismatch = 0
    max_dev = 0.0
    unmatched = []
    for c in comps:
        name = str(c.Name2)
        part_name = name.split("/")[-1].rsplit("-", 1)[0]
        t = c.Transform2
        trans = transform_translation(t)
        if trans is None:
            continue
        got = [round(v / MM, 3) for v in trans]
        cands = expected_by_part.get(part_name, [])
        if not cands:
            unmatched.append(name)
            continue
        bi = min(range(len(cands)), key=lambda i: max(abs(a - b) for a, b in zip(cands[i], got)))
        dev = max(abs(a - b) for a, b in zip(cands[bi], got))
        cands.pop(bi)
        max_dev = max(max_dev, dev)
        checked += 1
        if dev > 0.01:
            mismatch += 1
            if mismatch <= 8:
                print(f"  MISMATCH {name}: got {got} dev={dev:.3f}mm")
    print(f"checked={checked} mismatch={mismatch} max_dev={max_dev:.4f}mm unmatched={unmatched[:3]}")
finally:
    session.close()
