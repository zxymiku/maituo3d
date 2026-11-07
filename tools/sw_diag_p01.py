#!/usr/bin/env python3
"""诊断 P01: 读取原始包围盒、草图点坐标、拉伸深度与方向。"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / ".skills" / "solidworks-automation" / "scripts"))

from sw_session import SolidWorksSession  # noqa: E402
from sw_connect import get_com_member  # noqa: E402

MM = 1.0 / 1000.0

s = SolidWorksSession()
try:
    m = s.open(str(ROOT / "solidworks" / "铝合金主底板.SLDPRT"))
    box = m.GetPartBox(False)
    print("raw box:", [round(v, 6) for v in box])
    feat = get_com_member(m, "FirstFeature")
    while feat is not None:
        tn = str(get_com_member(feat, "GetTypeName2"))
        if tn == "ProfileFeature":
            sk = get_com_member(feat, "GetSpecificFeature2")
            pts = list(get_com_member(sk, "GetSketchPoints2") or [])
            print("sketch", get_com_member(feat, "Name"), "n_points:", len(pts))
            for p in pts[:4]:
                print("   pt", round(float(p.X), 6), round(float(p.Y), 6))
        if tn == "Extrusion":
            ex = get_com_member(feat, "GetSpecificFeature2")
            print(
                "extrusion", get_com_member(feat, "Name"),
                "D1=", float(get_com_member(ex, "GetDepth", False)),
                "startCond=", int(get_com_member(ex, "GetStartCondition")),
            )
        feat = get_com_member(feat, "GetNextFeature")
finally:
    s.close()
