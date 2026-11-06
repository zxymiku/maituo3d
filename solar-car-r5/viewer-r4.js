// 4-Wheel Coaxial Swerve (Non-Mecanum) & Dual-Cam Omnidirectional Solar Car Workbench
(function () {
  const spec = window.CAR_SPEC;
  const meshesData = window.CAR_MESHES;
  if (!spec || !meshesData) return;

  const container = document.getElementById("canvas-container");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1120);

  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 1, 2500);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.68));
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.88);
  dirLight1.position.set(220, 340, 260);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.48);
  dirLight2.position.set(-220, -220, -140);
  scene.add(dirLight2);

  const grid = new THREE.GridHelper(380, 19, 0x334155, 0x1e293b);
  grid.position.y = 0;
  scene.add(grid);

  const carRoot = new THREE.Group();
  scene.add(carRoot);

  function cadToThreePos(x, y, z) {
    return new THREE.Vector3(x, z, -y);
  }

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
  let cutawayUpper = false;
  let activeStep = 0;
  let explodeFactor = 0.0;
  let omniMode = "crab"; // 'crab' | 'turn' | 'dual'

  spec.placements.forEach((pl) => {
    const part = partById[pl.partId];
    const geom = geoCache[pl.partId];
    const isShell = pl.partId === "P55";
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(pl.color || "#38bdf8"),
      metalness: part.category.includes("电子") ? 0.15 : 0.38,
      roughness: 0.4,
      transparent: isShell,
      opacity: isShell ? 0.28 : 1.0,
      side: THREE.DoubleSide,
    });

    const holder = new THREE.Group();
    const basePos = cadToThreePos(pl.position[0], pl.position[1], pl.position[2]);
    holder.position.copy(basePos);

    const cadOrient = new THREE.Group();
    cadOrient.rotation.x = -Math.PI / 2;
    const mesh = new THREE.Mesh(geom, mat);
    mesh.userData = { instance: pl, part: part };

    const edges = new THREE.EdgesGeometry(geom, 28);
    const wire = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.45 })
    );
    mesh.add(wire);

    cadOrient.add(mesh);
    holder.add(cadOrient);
    carRoot.add(holder);

    const expDir = basePos.clone().sub(new THREE.Vector3(0, 38, 0));
    if (expDir.length() < 5) expDir.set(0, 35, 0);
    expDir.normalize();

    instanceObjects.push({ pl, part, holder, cadOrient, mesh, mat, basePos, expDir });
  });

  // Orbit Camera
  let camSpherical = { radius: 325, theta: 0.72, phi: 1.08 };
  let camTarget = new THREE.Vector3(0, 38, 0);
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

  // Raycast part selection
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

  // 5th-degree polynomial cam profile
  function camDisplacementMm(thetaRad, stroke) {
    const deg = ((thetaRad * 180 / Math.PI) % 360 + 360) % 360;
    function poly5(u) {
      u = Math.max(0, Math.min(1, u));
      return u * u * u * (10 - 15 * u + 6 * u * u);
    }
    if (deg < 40) return 0;
    if (deg < 140) return stroke * poly5((deg - 40) / 100);
    if (deg < 220) return stroke * (1 - 2 * poly5((deg - 140) / 80));
    if (deg < 320) return -stroke * (1 - poly5((deg - 220) / 100));
    return 0;
  }

  let isPlaying = true;
  let camAngleRad = 0;

  function applyKinematicsAndVisibility() {
    const s1 = camDisplacementMm(camAngleRad, 5.2);
    let s2 = s1;
    if (omniMode === "turn") {
      s2 = -s1;
    } else if (omniMode === "dual") {
      s2 = camDisplacementMm(camAngleRad + Math.PI / 3, 4.2);
    }

    // Steering angles of front & rear coaxial swerve wheel pods (lever arm 14mm)
    const steerFrontRad = Math.atan2(s1, 14.0);
    const steerRearRad = Math.atan2(s2, 14.0);

    // Whole-body subtle omnidirectional preview motion on the grid
    carRoot.position.z = -s1 * 1.6;
    carRoot.rotation.y = (steerFrontRad - steerRearRad) * 0.22;

    const primaryShaftRad = camAngleRad * 30.0; // 1:30 worm ratio
    const motorPinionRad = -primaryShaftRad * 4.0; // 1:4 primary gear ratio

    const upperDeckIds = new Set(["P01", "P18", "E01", "P50", "P51", "E02", "P52", "E03", "E04", "P53", "E05", "P55"]);

    instanceObjects.forEach((obj) => {
      const { pl, part, holder, mesh, mat, basePos, expDir } = obj;
      let vis = activeStep === 0 || pl.step <= activeStep;
      if (pl.partId === "P55" && hideShell) vis = false;
      holder.visible = vis;

      if (pl.partId === "P55") {
        mat.transparent = true;
        mat.opacity = selectedPartId === "P55" ? 0.65 : 0.24;
      } else if (cutawayUpper && upperDeckIds.has(pl.partId) && selectedPartId !== pl.partId) {
        mat.transparent = true;
        mat.opacity = 0.16;
      } else if (selectedPartId && selectedPartId !== part.id) {
        mat.transparent = true;
        mat.opacity = 0.26;
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

      const pos = basePos.clone().addScaledVector(expDir, explodeFactor * 78.0);
      mesh.rotation.set(0, 0, 0);

      if (pl.motion === "motor_pinion") {
        mesh.rotation.y = motorPinionRad;
      } else if (pl.motion === "primary_shaft") {
        mesh.rotation.y = primaryShaftRad;
      } else if (pl.motion === "long_shaft") {
        mesh.rotation.x = primaryShaftRad;
      } else if (pl.motion === "bevel_spin") {
        mesh.rotation.z = primaryShaftRad;
      } else if (pl.motion === "cam_shaft") {
        mesh.rotation.z = camAngleRad;
      } else if (pl.motion === "cam_shaft_sub") {
        mesh.rotation.z = -camAngleRad;
      } else if (pl.motion === "pushrod_main") {
        pos.x += s1;
      } else if (pl.motion === "pushrod_rear") {
        pos.x += s2;
      } else if (pl.motion === "tie_rod_front") {
        pos.z -= s1 * 1.1;
      } else if (pl.motion === "tie_rod_rear") {
        pos.z -= s2 * 1.1;
      } else if (pl.motion === "swerve_front") {
        mesh.rotation.z = steerFrontRad;
      } else if (pl.motion === "swerve_rear") {
        mesh.rotation.z = steerRearRad;
      }

      holder.position.copy(pos);
    });

    const deg = ((camAngleRad * 180 / Math.PI) % 360 + 360) % 360;
    const fDeg = steerFrontRad * 180 / Math.PI;
    const rDeg = steerRearRad * 180 / Math.PI;
    const modeLabel =
      omniMode === "crab"
        ? "四轮同向全向斜行(蟹行平移 δF = δR)"
        : omniMode === "turn"
        ? "四轮反向全向急转(原地回转 δF = -δR)"
        : "双凸轮复合全向轨迹(独立相位)";
    document.getElementById("kin-mode").textContent = `当前模式: ${modeLabel}`;
    document.getElementById("kin-cam").textContent =
      `双凸轮相位 θ = ${deg.toFixed(1)}° | 主推杆 s1 = ${(s1 >= 0 ? "+" : "") + s1.toFixed(2)} mm`;
    document.getElementById("kin-steer").textContent =
      `前轮全向角 δF = ${(fDeg >= 0 ? "+" : "") + fDeg.toFixed(1)}° | 后轮全向角 δR = ${(rDeg >= 0 ? "+" : "") + rDeg.toFixed(1)}°`;
    document.getElementById("cam-angle-val").textContent = `${Math.round(deg)}°`;
    const slider = document.getElementById("cam-slider");
    if (isPlaying && slider) slider.value = Math.round(deg);
  }

  window.setOmniMode = function (mode) {
    omniMode = mode;
    document.getElementById("mode-crab").classList.toggle("active", mode === "crab");
    document.getElementById("mode-turn").classList.toggle("active", mode === "turn");
    document.getElementById("mode-dual").classList.toggle("active", mode === "dual");
    applyKinematicsAndVisibility();
  };

  window.toggleAnimation = function () {
    isPlaying = !isPlaying;
    const btn = document.getElementById("btn-play");
    btn.textContent = isPlaying ? "⏸ 暂停机构运动" : "▶ 播放机构运动";
    btn.classList.toggle("active", isPlaying);
  };

  window.setCameraPreset = function (preset) {
    camTarget.set(0, 36, 0);
    if (preset === "iso") camSpherical = { radius: 325, theta: 0.72, phi: 1.08 };
    if (preset === "top") camSpherical = { radius: 330, theta: 0.0, phi: 0.14 };
    if (preset === "side") camSpherical = { radius: 310, theta: Math.PI / 2, phi: 1.48 };
    if (preset === "bottom") camSpherical = { radius: 295, theta: 0.55, phi: 2.55 };
    updateCamera();
  };

  window.toggleCutaway = function () {
    cutawayUpper = !cutawayUpper;
    document.getElementById("btn-cutaway").classList.toggle("active", cutawayUpper);
    applyKinematicsAndVisibility();
  };

  window.toggleShell = function () {
    hideShell = !hideShell;
    document.getElementById("btn-shell").classList.toggle("active", hideShell);
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

  window.selectPart("P11");
  window.resetSelection();

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
