#!/usr/bin/env python3
"""Master generator for the simplified solar car 3D workbench, datasets, drawings, and documentation."""

from __future__ import annotations
import json
from pathlib import Path

from car_spec_builder import (
    build_assembly_placements,
    build_assembly_steps,
    build_meshes_for_parts,
    build_part_definitions,
)
from generate_docs_and_views import generate_docs_and_tables, generate_part_catalog
from generate_webapp import write_webapp_files

ROOT = Path(__file__).resolve().parents[1]
WEB_DIR = ROOT / "solar-car-r5"
DOCS_DIR = WEB_DIR / "docs"
CATALOG_DIR = DOCS_DIR / "零件图册"


def main() -> None:
    parts = build_part_definitions()
    meshes = build_meshes_for_parts(parts)
    placements = build_assembly_placements(parts)
    steps = build_assembly_steps()

    total_instances = sum(int(p["quantity"]) for p in parts)
    total_features = sum(len(p["features"]) for p in parts)

    spec_payload = {
        "project": {
            "name": "工创赛太阳能小车（四轮同轴全向舵轮[非麦轮]与双凸轮底部传动版）",
            "version": "OmniSwerve-V2",
            "envelopeMm": [216.0, 164.0, 106.0],
            "limitsMm": {"maxLength": 250.0, "maxWidth": 200.0},
            "driveRatio": "1 : 4 主减速 (18齿主动小齿轮 : 72齿主减速大齿轮) + 正交锥齿轮四轮同轴分动",
            "steeringMechanism": "四轮独立同轴全向舵轮(非麦轮) + 1:30单头蜗杆蜗轮 + 上下双凸轮(主航向凸轮C01 + 差动副凸轮C02) + 前/后桥平行四边形转向横拉杆",
            "partTypeCount": len(parts),
            "totalInstanceCount": total_instances,
            "placementCount": len(placements),
            "featureCount": total_features,
            "namingRule": "网页显示零件名与 SolidWorks 零件文件名 (<零件名>.SLDPRT) 1:1 严格对应",
        },
        "parts": parts,
        "placements": placements,
        "assemblySteps": steps,
    }

    DOCS_DIR.mkdir(parents=True, exist_ok=True)
    spec_json_str = json.dumps(spec_payload, ensure_ascii=False, indent=2)
    (DOCS_DIR / "完整尺寸数据.json").write_text(spec_json_str, encoding="utf-8")

    # Write model-data.js and model-meshes.js
    (WEB_DIR / "model-data.js").write_text(
        f"window.CAR_SPEC = {spec_json_str};\n", encoding="utf-8"
    )
    meshes_json_str = json.dumps(meshes, ensure_ascii=False, separators=(",", ":"))
    (WEB_DIR / "model-meshes.js").write_text(
        f"window.CAR_MESHES = {meshes_json_str};\n", encoding="utf-8"
    )

    # Generate part catalog HTMLs, docs, CSVs, and root markdown files
    generate_part_catalog(parts, CATALOG_DIR)
    generate_docs_and_tables(parts, placements, steps, DOCS_DIR, ROOT)
    write_webapp_files(WEB_DIR, len(parts), len(placements))

    # Update root 交付文件清单.json
    manifest = {
        "project": spec_payload["project"],
        "entryHtml": "打开太阳能小车.html",
        "workbenchHtml": "solar-car-r5/index.html",
        "solidworksBuildScript": "tools/sw_build_all.py",
        "partMapping": [
            {
                "id": p["id"],
                "webPartName": p["name"],
                "solidworksPartName": p["solidworksName"],
                "solidworksFile": f"solidworks/{p['solidworksFile']}",
                "drawingHtml": f"solar-car-r5/{p['drawingUrl']}",
                "quantity": p["quantity"],
            }
            for p in parts
        ],
    }
    (ROOT / "交付文件清单.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(
        f"[OK] Generated simplified solar car: {len(parts)} part types, "
        f"{len(placements)} 3D instances, {total_features} features."
    )


if __name__ == "__main__":
    main()
