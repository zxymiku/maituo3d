#!/usr/bin/env python3
"""Generate solar-car-r5/index.html and solar-car-r5/viewer-r4.js for the simplified solar car workbench."""

from __future__ import annotations
from pathlib import Path


def write_webapp_files(web_dir: Path) -> None:
    index_html = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>工创赛太阳能小车 — 极简机械设计 3D 工作台 (1:1 SolidWorks 零件对应)</title>
  <style>
    :root {
      --bg: #0b1120;
      --panel: #111827;
      --card: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --green: #10b981;
      --amber: #f59e0b;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    header {
      height: 58px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      flex-shrink: 0;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand h1 {
      font-size: 17px;
      margin: 0;
      font-weight: 700;
    }
    .tag {
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.4);
      padding: 2px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 600;
    }
    .nav-links {
      display: flex;
      gap: 10px;
      font-size: 13px;
    }
    .nav-links a {
      color: var(--text);
      background: var(--card);
      border: 1px solid var(--border);
      padding: 6px 12px;
      border-radius: 6px;
      text-decoration: none;
      transition: all 0.15s;
    }
    .nav-links a:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .main-layout {
      display: grid;
      grid-template-columns: 350px 1fr 410px;
      flex: 1;
      min-height: 0;
    }
    .sidebar-left, .sidebar-right {
      background: var(--panel);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      min-height: 0;
      overflow-y: auto;
      padding: 14px;
      gap: 14px;
    }
    .sidebar-right {
      border-right: none;
      border-left: 1px solid var(--border);
    }
    .card {
      background: rgba(30, 41, 59, 0.65);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
    }
    .card h2 {
      font-size: 14px;
      margin: 0 0 10px 0;
      color: var(--accent);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .kpi {
      background: #0f172a;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 10px;
    }
    .kpi .label {
      font-size: 11px;
      color: var(--muted);
    }
    .kpi .val {
      font-size: 14px;
      font-weight: 700;
      margin-top: 2px;
      color: var(--text);
    }
    .btn-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    button {
      background: var(--card);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 6px 10px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s;
    }
    button:hover, button.active {
      background: rgba(56, 189, 248, 0.2);
      border-color: var(--accent);
      color: var(--accent);
    }
    .slider-row {
      margin-top: 10px;
      font-size: 12px;
    }
    .slider-row label {
      display: flex;
      justify-content: space-between;
      color: var(--muted);
      margin-bottom: 4px;
    }
    input[type="range"] {
      width: 100%;
      accent-color: var(--accent);
    }
    .viewport-wrap {
      position: relative;
      background: radial-gradient(circle at center, #1e293b 0%, #090d16 100%);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    #canvas-container {
      flex: 1;
      width: 100%;
      height: 100%;
      position: relative;
    }
    .hud-overlay {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(15, 23, 42, 0.85);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 12px;
      pointer-events: none;
      max-width: 440px;
      backdrop-filter: blur(6px);
    }
    .hud-overlay .title {
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 4px;
    }
    .kinematics-bar {
      position: absolute;
      bottom: 14px;
      left: 14px;
      right: 14px;
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      font-family: monospace;
    }
    .search-box {
      width: 100%;
      padding: 8px 10px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: #0f172a;
      color: var(--text);
      font-size: 12px;
      margin-bottom: 8px;
    }
    .part-table-wrap {
      max-height: 320px;
      overflow-y: auto;
      border: 1px solid var(--border);
      border-radius: 6px;
    }
    table.part-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    table.part-table th, table.part-table td {
      padding: 7px 8px;
      border-bottom: 1px solid #1e293b;
      text-align: left;
    }
    table.part-table th {
      background: #0f172a;
      color: var(--muted);
      position: sticky;
      top: 0;
    }
    table.part-table tr {
      cursor: pointer;
    }
    table.part-table tr:hover, table.part-table tr.selected {
      background: rgba(56, 189, 248, 0.18);
    }
    .sw-code {
      font-family: monospace;
      color: var(--accent);
      font-size: 11px;
    }
    .step-item {
      border: 1px solid var(--border);
      background: #0f172a;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 6px;
      font-size: 12px;
      cursor: pointer;
    }
    .step-item.active {
      border-color: var(--green);
      background: rgba(16, 185, 129, 0.12);
    }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <h1>工创赛太阳能小车 — 极简机械设计 3D 工作台</h1>
      <span class="tag">38种零件 · 1:1 SolidWorks零件名对应</span>
      <span class="tag" style="color:#10b981;border-color:rgba(16,185,129,0.4);background:rgba(16,185,129,0.12);">单电机 1:4 齿轮 + 1:30 蜗轮凸轮转向</span>
    </div>
    <div class="nav-links">
      <a href="docs/零件图册/index.html" target="_blank">📐 零件工程图册 (38件)</a>
      <a href="docs/可筛选尺寸表.html" target="_blank">📏 可筛选尺寸与SW对照表</a>
      <a href="docs/建模技术文档.html" target="_blank">🧮 凸轮公式与建模文档</a>
      <a href="docs/装配步骤.html" target="_blank">🔧 6步标准装配规程</a>
    </div>
  </header>

  <div class="main-layout">
    <!-- Left Sidebar: Overview, Controls, Assembly Steps -->
    <div class="sidebar-left">
      <div class="card">
        <h2>整车核心技术指标 <span>✅ 全部合规</span></h2>
        <div class="kpi-grid">
          <div class="kpi">
            <div class="label">整车尺寸 (要求≤250×200)</div>
            <div class="val">210 × 152 × 104 mm</div>
          </div>
          <div class="kpi">
            <div class="label">零件种类 / 装配总数</div>
            <div class="val" id="kpi-part-count">38 种 / 47 件</div>
          </div>
          <div class="kpi">
            <div class="label">单电机主减速比</div>
            <div class="val">1 : 4 (18齿:72齿)</div>
          </div>
          <div class="kpi">
            <div class="label">凸轮转向时基减速比</div>
            <div class="val">1 : 30 (单头蜗杆:30齿)</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>3D 视图与机构运动控制</h2>
        <div class="btn-row">
          <button id="btn-play" class="active" onclick="window.toggleAnimation()">⏸ 暂停机构运动</button>
          <button onclick="window.setCameraPreset('iso')">等轴测</button>
          <button onclick="window.setCameraPreset('top')">俯视图</button>
          <button onclick="window.setCameraPreset('side')">侧视图</button>
          <button onclick="window.setCameraPreset('front')">前视图</button>
          <button onclick="window.setCameraPreset('bottom')">仰视底盘(读卡器/电机座)</button>
        </div>
        <div class="btn-row">
          <button id="btn-shell" onclick="window.toggleShell()">隐藏/显示快拆外壳</button>
          <button id="btn-solar" onclick="window.toggleSolar()">透视顶部太阳能板</button>
          <button onclick="window.resetSelection()">显示全部零件</button>
        </div>
        <div class="slider-row">
          <label><span>爆炸拆解视图 (Explode)</span><span id="explode-val">0%</span></label>
          <input id="explode-slider" type="range" min="0" max="100" value="0" oninput="window.setExplode(this.value)" />
        </div>
        <div class="slider-row">
          <label><span>凸轮相位角 θ (手动观察推杆与前叉转角)</span><span id="cam-angle-val">0°</span></label>
          <input id="cam-slider" type="range" min="0" max="360" value="0" oninput="window.setManualCamAngle(this.value)" />
        </div>
      </div>

      <div class="card">
        <h2>6 步渐进式装配教学 <span style="font-size:11px;color:var(--muted);">点击切换步骤</span></h2>
        <div class="btn-row" style="margin-bottom:8px;">
          <button class="active" id="step-btn-all" onclick="window.setAssemblyStep(0)">展示整车 (全6步)</button>
        </div>
        <div id="steps-container"></div>
      </div>
    </div>

    <!-- Center 3D Viewport -->
    <div class="viewport-wrap">
      <div id="canvas-container"></div>
      <div class="hud-overlay">
        <div class="title">纯机械凸轮转向与 1:4 齿轮传动实时仿真</div>
        <div>• <strong>后桥驱动</strong>：<code>N20直流减速电机</code> → <code>18齿电机主动齿轮</code> : <code>72齿后轴从动大齿轮</code> (i=1:4) → <code>后左驱动轮</code></div>
        <div>• <strong>凸轮转向</strong>：<code>0.5模单头蜗杆</code> : <code>30齿青铜蜗轮</code> (i=1:30) → <code>盘形转向凸轮</code> → <code>转向直线推杆</code> → <code>前轮转向叉架</code></div>
        <div style="margin-top:4px;color:#38bdf8;">💡 鼠标左键旋转 · 右键平移 · 滚轮缩放 · 点击任意零件高亮查看其 1:1 SolidWorks 文件名</div>
      </div>
      <div class="kinematics-bar">
        <span id="kin-motor">电机转速: 120 rpm | 后轴: 30 rpm (1:4)</span>
        <span id="kin-cam">凸轮相位 θ = 0.0° | 推杆位移 s = +0.00 mm</span>
        <span id="kin-steer">前叉转向角 δ = +0.0°</span>
      </div>
    </div>

    <!-- Right Sidebar:Selected Part Detail + 1:1 Part Table -->
    <div class="sidebar-right">
      <div class="card" id="part-detail-card">
        <h2>选中零件详情 (网页名 1:1 对应 SolidWorks)</h2>
        <div id="part-detail-body" style="font-size:12.5px;line-height:1.55;">
          点击 3D 模型或下方零件表中的任意零件，即可查看其精确三维尺寸、建模特征以及一一对应的 SolidWorks 零件文件名 (<code>.SLDPRT</code>)。
        </div>
      </div>

      <div class="card" style="flex:1;display:flex;flex-direction:column;min-height:0;">
        <h2>全车零件清单 (1:1 对应 SolidWorks 零件名)</h2>
        <input id="part-search" class="search-box" type="text" placeholder="过滤零件名、SolidWorks文件名或子系统..." oninput="window.filterPartTable()" />
        <div class="part-table-wrap" style="flex:1;">
          <table class="part-table">
            <thead>
              <tr>
                <th>代号</th>
                <th>网页零件名 (点击定位)</th>
                <th>SolidWorks 零件文件名</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody id="part-table-tbody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <script src="vendor/three.min.js"></script>
  <script src="model-data.js"></script>
  <script src="model-meshes.js"></script>
  <script src="viewer-r4.js"></script>
</body>
</html>"""

    viewer_js = """// Simplified Solar Car 3D Interactive Workbench & Kinematics Engine
(function () {
  const spec = window.CAR_SPEC;
  const meshesData = window.CAR_MESHES;
  if (!spec || !meshesData) {
    console.error("Missing CAR_SPEC or CAR_MESHES");
    return;
  }

  const container = document.getElementById("canvas-container");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1120);

  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 1, 2500);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Lights
  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambient);
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.85);
  dirLight1.position.set(220, 340, 260);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.45);
  dirLight2.position.set(-220, -180, -140);
  scene.add(dirLight2);

  // Ground reference grid (Z-up in CAD -> Y-up in Three.js: we put car in CAD X, Z->Y, -Y->Z)
  const grid = new THREE.GridHelper(360, 18, 0x334155, 0x1e293b);
  grid.position.y = 0;
  scene.add(grid);

  // Root car group converting CAD (X forward, Y left, Z up) -> Three.js (X forward, Y up, Z right)
  const carRoot = new THREE.Group();
  scene.add(carRoot);

  function cadToThreePos(x, y, z) {
    return new THREE.Vector3(x, z, -y);
  }

  // Build Three.js BufferGeometry cache per partId
  const geoCache = {};
  for (const part of spec.parts) {
    const m = meshesData[part.id];
    const geom = new THREE.BufferGeometry();
    if (m && m.positions && m.positions.length > 0) {
      geom.setAttribute("position", new THREE.Float32BufferAttribute(m.positions, 3));
      geom.setAttribute("normal", new THREE.Float32BufferAttribute(m.normals, 3));
      geom.setIndex(m.indices);
    }
    geoCache[part.id] = geom;
  }

  const partById = {};
  spec.parts.forEach((p) => { partById[p.id] = p; });

  const instanceObjects = [];
  let selectedPartId = null;
  let hideShell = false;
  let transparentSolar = false;
  let activeStep = 0;
  let explodeFactor = 0.0;

  // Create each placement instance
  spec.placements.forEach((pl) => {
    const part = partById[pl.partId];
    const geom = geoCache[pl.partId];
    const isShell = pl.partId === "P18";
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(pl.color || "#38bdf8"),
      metalness: part.category.includes("电子") ? 0.15 : 0.35,
      roughness: 0.42,
      transparent: isShell,
      opacity: isShell ? 0.32 : 1.0,
      side: THREE.DoubleSide,
    });

    // Convert CAD coordinates inside mesh (u=x, v=y, w=z) by rotating mesh group so Z is up
    const holder = new THREE.Group();
    const basePos = cadToThreePos(pl.position[0], pl.position[1], pl.position[2]);
    holder.position.copy(basePos);

    const cadOrient = new THREE.Group();
    // Map CAD (X, Y, Z) -> Three (X, Z, -Y): rotate -90 deg around X
    cadOrient.rotation.x = -Math.PI / 2;
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData = { instance: pl, part: part };

    // Subtle edge wireframe for crisp mechanical look
    const edges = new THREE.EdgesGeometry(geom, 28);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x0f172a,
      transparent: true,
      opacity: 0.45,
    });
    const wire = new THREE.LineSegments(edges, lineMat);
    mesh.add(wire);

    cadOrient.add(mesh);
    holder.add(cadOrient);
    carRoot.add(holder);

    // Compute explode direction from car center
    const expDir = basePos.clone().sub(new THREE.Vector3(0, 42, 0));
    if (expDir.length() < 5) expDir.set(0, 35, 0);
    expDir.normalize();

    instanceObjects.push({
      pl,
      part,
      holder,
      cadOrient,
      mesh,
      mat,
      basePos,
      expDir,
    });
  });

  // Simple Orbit Camera Controller
  let camSpherical = { radius: 310, theta: 0.72, phi: 1.05 };
  let camTarget = new THREE.Vector3(0, 42, 0);
  let isDragging = false;
  let dragButton = 0;
  let prevMouse = { x: 0, y: 0 };

  function updateCamera() {
    camSpherical.phi = Math.max(0.12, Math.min(Math.PI - 0.12, camSpherical.phi));
    camSpherical.radius = Math.max(90, Math.min(900, camSpherical.radius));
    const x = camTarget.x + camSpherical.radius * Math.sin(camSpherical.phi) * Math.cos(camSpherical.theta);
    const y = camTarget.y + camSpherical.radius * Math.cos(camSpherical.phi);
    const z = camTarget.z + camSpherical.radius * Math.sin(camSpherical.phi) * Math.sin(camSpherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(camTarget);
  }
  updateCamera();

  renderer.domElement.addEventListener("contextmenu", (e) => e.preventDefault());
  renderer.domElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragButton = e.button;
    prevMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener("mouseup", () => { isDragging = false; });
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    prevMouse = { x: e.clientX, y: e.clientY };
    if (dragButton === 0) {
      camSpherical.theta += dx * 0.008;
      camSpherical.phi -= dy * 0.008;
    } else {
      const panSpeed = camSpherical.radius * 0.0015;
      camTarget.x -= dx * panSpeed * Math.sin(camSpherical.theta);
      camTarget.z += dx * panSpeed * Math.cos(camSpherical.theta);
      camTarget.y += dy * panSpeed;
    }
    updateCamera();
  });
  renderer.domElement.addEventListener("wheel", (e) => {
    e.preventDefault();
    camSpherical.radius *= e.deltaY > 0 ? 1.08 : 0.92;
    updateCamera();
  }, { passive: false });

  // Raycast click to select part
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  renderer.domElement.addEventListener("click", (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const visibleMeshes = instanceObjects.filter((o) => o.holder.visible).map((o) => o.mesh);
    const hits = raycaster.intersectObjects(visibleMeshes, false);
    if (hits.length > 0) {
      const hitPart = hits[0].object.userData.part;
      if (hitPart) window.selectPart(hitPart.id);
    }
  });

  // 5th-degree polynomial cam displacement s(theta) in mm
  function camDisplacementMm(thetaRad) {
    const deg = ((thetaRad * 180 / Math.PI) % 360 + 360) % 360;
    const h = 3.8;
    function poly5(u) {
      u = Math.max(0, Math.min(1, u));
      return u * u * u * (10 - 15 * u + 6 * u * u);
    }
    if (deg < 60) return 0;
    if (deg < 150) return h * poly5((deg - 60) / 90);
    if (deg < 210) return h * (1 - 2 * poly5((deg - 150) / 60));
    if (deg < 300) return -h * (1 - poly5((deg - 210) / 90));
    return 0;
  }

  let isPlaying = true;
  let camAngleRad = 0;

  function applyKinematicsAndVisibility() {
    const sMm = camDisplacementMm(camAngleRad);
    const steerAngleRad = Math.atan2(sMm, 18.0); // Lever arm L = 18 mm
    const rearAxleRad = camAngleRad * 30.0;      // 1:30 worm ratio
    const motorPinionRad = -rearAxleRad * 4.0;   // 1:4 spur gear ratio

    instanceObjects.forEach((obj) => {
      const { pl, part, holder, mesh, mat, basePos, expDir } = obj;

      // Visibility by assembly step and toggles
      let vis = activeStep === 0 || pl.step <= activeStep;
      if (pl.partId === "P18" && hideShell) vis = false;
      holder.visible = vis;

      // Transparency for solar panel inspection or unselected dimming
      if (pl.partId === "P18") {
        mat.transparent = true;
        mat.opacity = selectedPartId === "P18" ? 0.65 : 0.26;
      } else if ((pl.partId === "E01" || pl.partId === "P15") && transparentSolar) {
        mat.transparent = true;
        mat.opacity = 0.25;
      } else if (selectedPartId && selectedPartId !== part.id) {
        mat.transparent = true;
        mat.opacity = 0.28;
      } else {
        mat.transparent = false;
        mat.opacity = 1.0;
      }

      if (selectedPartId === part.id) {
        mat.emissive.setHex(0x1d4ed8);
        mat.emissiveIntensity = 0.45;
      } else {
        mat.emissive.setHex(0x000000);
        mat.emissiveIntensity = 0;
      }

      // Position = base + explode + kinematic translation
      const pos = basePos.clone().addScaledVector(expDir, explodeFactor * 75.0);
      mesh.rotation.set(0, 0, 0);

      if (pl.motion === "motor_pinion") {
        mesh.rotation.y = motorPinionRad;
      } else if (pl.motion === "rear_axle") {
        mesh.rotation.y = rearAxleRad;
      } else if (pl.motion === "rear_free_wheel") {
        mesh.rotation.y = rearAxleRad * 0.92;
      } else if (pl.motion === "cam_shaft") {
        mesh.rotation.z = camAngleRad;
      } else if (pl.motion === "pushrod") {
        pos.x += sMm;
      } else if (pl.motion === "front_steer") {
        mesh.rotation.z = steerAngleRad;
      } else if (pl.motion === "front_wheel") {
        mesh.rotation.z = steerAngleRad;
      }

      holder.position.copy(pos);
    });

    const deg = ((camAngleRad * 180 / Math.PI) % 360 + 360) % 360;
    const steerDeg = steerAngleRad * 180 / Math.PI;
    document.getElementById("kin-cam").textContent =
      `凸轮相位 θ = ${deg.toFixed(1)}° | 推杆位移 s = ${(sMm >= 0 ? "+" : "") + sMm.toFixed(2)} mm`;
    document.getElementById("kin-steer").textContent =
      `前叉转向角 δ = ${(steerDeg >= 0 ? "+" : "") + steerDeg.toFixed(1)}°`;
    document.getElementById("cam-angle-val").textContent = `${ Math.round(deg) }°`;
    const slider = document.getElementById("cam-slider");
    if (isPlaying && slider) slider.value = Math.round(deg);
  }

  // UI Exposed handlers
  window.toggleAnimation = function () {
    isPlaying = !isPlaying;
    const btn = document.getElementById("btn-play");
    btn.textContent = isPlaying ? "⏸ 暂停机构运动" : "▶ 播放机构运动";
    btn.classList.toggle("active", isPlaying);
  };

  window.setCameraPreset = function (preset) {
    camTarget.set(0, 42, 0);
    if (preset === "iso") camSpherical = { radius: 310, theta: 0.72, phi: 1.05 };
    if (preset === "top") camSpherical = { radius: 320, theta: 0.0, phi: 0.14 };
    if (preset === "side") camSpherical = { radius: 300, theta: Math.PI / 2, phi: 1.48 };
    if (preset === "front") camSpherical = { radius: 290, theta: 0.0, phi: 1.42 };
    if (preset === "bottom") camSpherical = { radius: 300, theta: 0.5, phi: 2.65 };
    updateCamera();
  };

  window.toggleShell = function () {
    hideShell = !hideShell;
    document.getElementById("btn-shell").classList.toggle("active", hideShell);
    applyKinematicsAndVisibility();
  };

  window.toggleSolar = function () {
    transparentSolar = !transparentSolar;
    document.getElementById("btn-solar").classList.toggle("active", transparentSolar);
    applyKinematicsAndVisibility();
  };

  window.setExplode = function (val) {
    explodeFactor = Number(val) / 100.0;
    document.getElementById("explode-val").textContent = `${val}%`;
    applyKinematicsAndVisibility();
  };

  window.setManualCamAngle = function (degVal) {
    isPlaying = false;
    const btn = document.getElementById("btn-play");
    btn.textContent = "▶ 播放机构运动";
    btn.classList.remove("active");
    camAngleRad = (Number(degVal) * Math.PI) / 180.0;
    applyKinematicsAndVisibility();
  };

  window.resetSelection = function () {
    selectedPartId = null;
    document.querySelectorAll("#part-table-tbody tr").forEach((tr) => tr.classList.remove("selected"));
    applyKinematicsAndVisibility();
  };

  window.selectPart = function (partId) {
    selectedPartId = partId;
    const p = partById[partId];
    if (!p) return;
    document.querySelectorAll("#part-table-tbody tr").forEach((tr) => {
      tr.classList.toggle("selected", tr.dataset.partId === partId);
    });
    const dimsHtml = (p.keyDimensions || [])
      .map((d) => `<li><strong>${d.name}</strong>：<code>${d.value}</code>（${d.note}）</li>`)
      .join("");
    document.getElementById("part-detail-body").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:15px;font-weight:700;color:#f8fafc;">${p.name} <span style="color:#94a3b8;font-size:12px;">(${p.id})</span></span>
        <a href="${p.drawingUrl}" target="_blank" style="color:#38bdf8;font-size:12px;">查看三视图 →</a>
      </div>
      <div style="background:#0f172a;border:1px solid #334155;padding:7px 10px;border-radius:6px;margin-bottom:8px;">
        <div style="color:#94a3b8;font-size:11px;">1:1 对应 SolidWorks 零件文件名：</div>
        <div style="color:#38bdf8;font-family:monospace;font-weight:700;font-size:13px;">solidworks/${p.solidworksFile}</div>
      </div>
      <div><strong>所属子系统：</strong>${p.subsystem}</div>
      <div><strong>材料 / 工艺：</strong>${p.material}（${p.process}） | <strong>单车数量：</strong>${p.quantity} 件</div>
      <div><strong>外包络尺寸：</strong><code>${p.size[0]} × ${p.size[1]} × ${p.size[2]} mm</code></div>
      <div style="margin-top:4px;color:#cbd5e1;">${p.note}</div>
      <ul style="margin:6px 0 0 18px;padding:0;">${dimsHtml}</ul>
    `;
    applyKinematicsAndVisibility();
  };

  window.setAssemblyStep = function (stepNum) {
    activeStep = stepNum;
    document.getElementById("step-btn-all").classList.toggle("active", stepNum === 0);
    document.querySelectorAll(".step-item").forEach((el) => {
      el.classList.toggle("active", Number(el.dataset.step) === stepNum);
    });
    applyKinematicsAndVisibility();
  };

  // Populate assembly steps
  const stepsContainer = document.getElementById("steps-container");
  spec.assemblySteps.forEach((s) => {
    const div = document.createElement("div");
    div.className = "step-item";
    div.dataset.step = s.step;
    div.innerHTML = `<div style="font-weight:700;color:#f8fafc;margin-bottom:3px;">${s.title}</div>
                     <div style="color:#94a3b8;">${s.summary}</div>`;
    div.onclick = () => window.setAssemblyStep(s.step);
    stepsContainer.appendChild(div);
  });

  // Populate 1:1 part table
  const tbody = document.getElementById("part-table-tbody");
  spec.parts.forEach((p) => {
    const tr = document.createElement("tr");
    tr.dataset.partId = p.id;
    tr.innerHTML = `
      <td><code>${p.id}</code></td>
      <td><strong>${p.name}</strong></td>
      <td class="sw-code">${p.solidworksFile}</td>
      <td>${p.quantity}</td>
    `;
    tr.onclick = () => window.selectPart(p.id);
    tbody.appendChild(tr);
  });

  window.filterPartTable = function () {
    const q = document.getElementById("part-search").value.toLowerCase();
    document.querySelectorAll("#part-table-tbody tr").forEach((tr) => {
      const p = partById[tr.dataset.partId];
      const text = `${p.id} ${p.name} ${p.solidworksFile} ${p.subsystem} ${p.material}`.toLowerCase();
      tr.style.display = text.includes(q) ? "" : "none";
    });
  };

  // Select P01 by default so the detail card is populated immediately
  window.selectPart("P01");
  window.resetSelection();

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    if (isPlaying) {
      camAngleRad = (camAngleRad + 0.008) % (Math.PI * 2);
      applyKinematicsAndVisibility();
    }
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
})();
"""

    (web_dir / "index.html").write_text(index_html, encoding="utf-8")
    (web_dir / "viewer-r4.js").write_text(viewer_js, encoding="utf-8")
