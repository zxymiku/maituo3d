#!/usr/bin/env python3
"""探测装配体组件状态: E01 太阳能板组件是否被隐藏/压缩, 以及组件位置读取方式。"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))

from sw_session import SolidWorksSession  # noqa: E402
from sw_connect import get_com_member  # noqa: E402

MM = 1.0 / 1000.0

session = SolidWorksSession()
try:
    model = session.open(str(ROOT / "solidworks" / "太阳能小车R5总装.SLDASM"), read_only=True)
    comps = list(get_com_member(model, "GetComponents", False) or [])
    e01 = [c for c in comps if "单晶硅" in str(get_com_member(c, "Name2"))]
    print("E01 组件数:", len(e01))
    for c in e01:
        name = str(get_com_member(c, "Name2"))
        sup = get_com_member(c, "IsSuppressed")
        vis = None
        try:
            vis = int(get_com_member(c, "Visible"))
        except Exception:
            pass
        print(f"  {name}: IsSuppressed={sup} Visible={vis} (2=visible,1=hidden)")
        # 位置: 多种成员名兜底
        for member in ("Transform2", "GetTotalTransform"):
            try:
                t = get_com_member(c, member)
                print(f"    {member} -> {type(t)}")
                if t is not None:
                    for tm in dir(t):
                        if "rans" in tm:
                            print(f"      member: {tm}")
                    break
            except Exception as exc:
                print(f"    {member} failed: {exc}")
    # 全部组件状态统计
    from collections import Counter
    states = Counter()
    for c in comps:
        try:
            states[(int(get_com_member(c, "IsSuppressed")), int(get_com_member(c, "Visible")))] += 1
        except Exception:
            states["err"] += 1
    print("组件状态 (suppressed, visible):", dict(states))
finally:
    session.close()
