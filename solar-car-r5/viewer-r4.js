// Simplified Solar Car 3D Interactive Workbench & Kinematics Engine
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
