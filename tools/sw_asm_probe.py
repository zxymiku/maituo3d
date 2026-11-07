#!/usr/bin/env python3
"""只读诊断: 附着到运行中的 SolidWorks, 统计当前装配体的组件数。"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))

import win32com.client  # noqa: E402
from sw_connect import get_com_member  # noqa: E402

sw = win32com.client.GetActiveObject("SldWorks.Application")
model = get_com_member(sw, "ActiveDoc")
title = get_com_member(model, "GetTitle")
print("active doc:", title)
n = get_com_member(model, "GetComponentCount")
print("component count:", n)
comps = list(get_com_member(model, "GetComponents", False) or [])
print("GetComponents len:", len(comps))
from collections import Counter
names = Counter()
for c in comps[:1000]:
    try:
        names[str(get_com_member(c, "Name2")).split("-")[0].rstrip("0123456789")] += 1
    except Exception:
        pass
print("unique parts so far:", len(names))
print("top:", names.most_common(5))
