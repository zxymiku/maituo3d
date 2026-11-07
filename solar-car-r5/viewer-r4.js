// High-Precision 4-Wheel Coaxial Swerve (Non-Mecanum), Geneva Intermittent Mode-Switcher,
// Planetary Differential & Dual-Cam Anti-Backlash Omnidirectional Solar Car 3D Workbench
(function () {
  const spec = window.CAR_SPEC;
  const meshesData = window.CAR_MESHES;
  const detailBuilder = window.CADDetailBuilder;
  if (!spec || !meshesData) return;

  const container = document.getElementById("canvas-container");
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1120);

  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 1, 2500);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.72));
  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.92);
  dirLight1.position.set(240, 360, 280);
  scene.add(dirLight1);
  const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 0.52);
  dirLight2.position.set(-240, -200, -160);
  scene.add(dirLight2);
  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.32);
  rimLight.position.set(0, 180, -300);
  scene.add(rimLight);

  const grid = new THREE.GridHelper(420, 21, 0x334155, 0x1e293b);
  grid.position.y = 0;
  scene.add(grid);

  const carRoot = new THREE.Group();
  scene.add(carRoot);

  function cadToThreePos(x, y, z) {
    return new THREE.Vector3(x, z, -y);
  }

  // Build 4 Ground Swerve Compass Rings & Velocity Vector Arrows under the 4 wheels (X=±72, Y=±58, Z=0.4)
  const vectorIndicatorsGroup = new THREE.Group();
  carRoot.add(vectorIndicatorsGroup);
  const wheelCompassArrows = [];
  const wheelPodCoords = [
    { tag: "左前", x: 72.0, y: 58.0, group: "front" },
    { tag: "右前", x: 72.0, y: -58.0, group: "front" },
    { tag: "左后", x: -72.0, y: 58.0, group: "rear" },
    { tag: "右后", x: -72.0, y: -58.0, group: "rear" },
  ];
  wheelPodCoords.forEach((wp) => {
    const podInd = new THREE.Group();
    podInd.position.copy(cadToThreePos(wp.x, wp.y, 0.4));
    // Compass ring on ground
    const ringGeo = new THREE.RingGeometry(21.5, 23.2, 36);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMesh = new THREE.Mesh(
      ringGeo,
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9, side: THREE.DoubleSide, transparent: true, opacity: 0.45 })
    );
    podInd.add(ringMesh);

    // Direction arrow group
    const arrowGrp = new THREE.Group();
    const shaftGeo = new THREE.BoxGeometry(18.0, 0.6, 2.2);
    shaftGeo.translate(10.0, 0, 0);
    const shaftMesh = new THREE.Mesh(shaftGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    const headGeo = new THREE.ConeGeometry(3.6, 7.5, 12);
    headGeo.rotateZ(-Math.PI / 2);
    headGeo.translate(22.0, 0, 0);
    const headMesh = new THREE.Mesh(headGeo, new THREE.MeshBasicMaterial({ color: 0x34d399 }));
    arrowGrp.add(shaftMesh, headMesh);
    podInd.add(arrowGrp);

    vectorIndicatorsGroup.add(podInd);
    wheelCompassArrows.push({ wp, arrowGrp });
  });

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
  spec.parts.forEach((p) => {
    partById[p.id] = p;
  });

  const instanceObjects = [];
  const allPickableMeshes = [];
  let selectedPartId = null;
  let hideShell = false;
  let cutawayUpper = false;
  let showVectors = true;
  let flowHighlightMode = null; // null | 'drive' | 'steer'
  let activeStep = 0;
  let explodeFactor = 0.0;
  let omniMode = "crab"; // 'crab' | 'turn' | 'dual'

  const driveChainIds = new Set([
    "M01", "G02", "G01", "P13", "SP2", "P14", "G08", "G09", "G13", "G14", "G15",
    "P60", "P61", "P62", "P15", "P16", "P19", "P20", "G06", "G10", "G11", "P24",
    "P25", "P22", "P28", "G07", "P31", "P32", "W01"
  ]);
  const steerChainIds = new Set([
    "G03", "G04", "P34", "C01", "C02", "C03", "P36", "G12", "P56", "P57", "P58",
    "P59", "P37", "P38", "B02", "SP1", "P39", "P40", "P66", "P67", "P68", "P69",
    "P42", "P43", "P63", "P64", "P65", "P44", "P45", "P46", "G16", "SP3", "P47",
    "P48", "P49", "P27", "P29"
  ]);
  const wheelRollingIds = new Set(["W01", "P32", "G07", "P33"]);

  spec.placements.forEach((pl) => {
    const part = partById[pl.partId];
    const baseGeom = geoCache[pl.partId];
    const ov = detailBuilder && detailBuilder.PLACEMENT_OVERRIDES[pl.label];
    const cadPos = ov && ov.pos ? ov.pos : pl.position;
    const baseRotCad = ov && ov.rotCad ? ov.rotCad : [0, 0, 0];

    const holder = new THREE.Group();
    const basePos = cadToThreePos(cadPos[0], cadPos[1], cadPos[2]);
    holder.position.copy(basePos);

    const cadOrient = new THREE.Group();
    cadOrient.rotation.x = -Math.PI / 2;

    let object3D;
    let materials = [];
    if (detailBuilder) {
      const built = detailBuilder.buildPartDetailObject(part, pl, baseGeom);
      object3D = built.object3D;
      materials = built.materials;
    } else {
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(pl.color || "#38bdf8") });
      object3D = new THREE.Mesh(baseGeom, mat);
      object3D.userData = { instance: pl, part: part };
      materials = [mat];
    }

    object3D.traverse((ch) => {
      if (ch.isMesh) allPickableMeshes.push(ch);
    });

    cadOrient.add(object3D);
    holder.add(cadOrient);
    carRoot.add(holder);

    // Determine nearest kingpin center (X=±72, Y=±58) for swerve_front / swerve_rear orbital kinematics
    let kingpinCad = null;
    if (pl.motion === "swerve_front" || pl.motion === "swerve_rear") {
      if (Math.abs(cadPos[1]) > 20.0) {
        kingpinCad = [cadPos[0] >= 0 ? 72.0 : -72.0, cadPos[1] >= 0 ? 58.0 : -58.0, cadPos[2]];
      }
    }

    const expDir = basePos.clone().sub(new THREE.Vector3(0, 38, 0));
    if (expDir.length() < 5) expDir.set(0, 35, 0);
    expDir.normalize();

    instanceObjects.push({
      pl,
      part,
      holder,
      cadOrient,
      mesh: object3D,
      materials,
      cadPos,
      basePos,
      baseRotCad,
      kingpinCad,
      expDir,
    });
  });

  // Orbit Camera
  let camSpherical = { radius: 325, theta: 0.72, phi: 1.08 };
  let camTarget = new THREE.Vector3(0, 38, 0);
  let isDragging = false;
  let dragButton = 0;
  let prevMouse = { x: 0, y: 0 };

  function updateCamera() {
    camSpherical.phi = Math.max(0.12, Math.min(Math.PI - 0.12, camSpherical.phi));
    camSpherical.radius = Math.max(85, Math.min(900, camSpherical.radius));
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
  window.addEventListener("mouseup", () => {
    isDragging = false;
  });
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
  renderer.domElement.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      camSpherical.radius *= e.deltaY > 0 ? 1.08 : 0.92;
      updateCamera();
    },
    { passive: false }
  );

  // Raycast part selection
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  renderer.domElement.addEventListener("click", (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const activeMeshes = allPickableMeshes.filter((m) => {
      let p = m;
      while (p) {
        if (p.visible === false) return false;
        p = p.parent;
      }
      return true;
    });
    const hits = raycaster.intersectObjects(activeMeshes, false);
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

  // Exact 4-Slot Maltese Geneva Intermittent Indexing Law:
  // φ2(φ1) = atan( λ sin(φ1) / (1 - λ cos(φ1)) ) during engagement φ1 in [-π/4, +π/4], λ = √2/2
  function genevaIntermittentAngle(crankRad) {
    const lambda = Math.SQRT1_2;
    const norm = ((crankRad % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    // Engagement window centered at π/4 (0 to π/2)
    if (norm < Math.PI * 0.5) {
      const phi1 = norm - Math.PI * 0.25;
      const phi2 = Math.atan2(lambda * Math.sin(phi1), 1.0 - lambda * Math.cos(phi1));
      return -(phi2 + Math.PI * 0.25);
    }
    return -Math.PI * 0.5;
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

    // Steering angles of front & rear coaxial swerve wheel pods (lever arm 12.0mm)
    const steerFrontRad = Math.atan2(s1, 12.0);
    const steerRearRad = Math.atan2(s2, 12.0);

    // Whole-body subtle omnidirectional preview motion on the grid
    carRoot.position.z = -s1 * 1.6;
    carRoot.rotation.y = (steerFrontRad - steerRearRad) * 0.22;

    // Ground compass arrows update
    vectorIndicatorsGroup.visible = showVectors;
    wheelCompassArrows.forEach((item) => {
      const ang = item.wp.group === "front" ? steerFrontRad : steerRearRad;
      item.arrowGrp.rotation.y = ang;
    });

    const primaryShaftRad = camAngleRad * 30.0; // 1:30 worm ratio
    const motorPinionRad = -primaryShaftRad * 4.0; // 1:4 primary gear ratio
    const wheelRollRad = primaryShaftRad * 0.8; // 16:20 wheel bevel final drive ratio

    const upperDeckIds = new Set(["P01", "P18", "E01", "P50", "P51", "E02", "P52", "E03", "E04", "P53", "E05", "P55"]);

    instanceObjects.forEach((obj) => {
      const { pl, part, holder, mesh, materials, cadPos, basePos, baseRotCad, kingpinCad, expDir } = obj;
      let vis = activeStep === 0 || pl.step <= activeStep;
      if (pl.partId === "P55" && hideShell) vis = false;
      holder.visible = vis;

      const isFlowMatched =
        (flowHighlightMode === "drive" && driveChainIds.has(part.id)) ||
        (flowHighlightMode === "steer" && steerChainIds.has(part.id));

      materials.forEach((mat) => {
        const u = mat.userData || {};
        if (pl.partId === "P55") {
          mat.transparent = true;
          mat.opacity = selectedPartId === "P55" ? 0.65 : 0.22;
        } else if (cutawayUpper && upperDeckIds.has(pl.partId) && selectedPartId !== pl.partId) {
          mat.transparent = true;
          mat.opacity = 0.15;
        } else if (selectedPartId && selectedPartId !== part.id) {
          mat.transparent = true;
          mat.opacity = 0.22;
        } else if (flowHighlightMode && !isFlowMatched) {
          mat.transparent = true;
          mat.opacity = 0.2;
        } else {
          mat.transparent = Boolean(u.baseTransparent);
          mat.opacity = u.baseOpacity !== undefined ? u.baseOpacity : 1.0;
        }

        if (selectedPartId === part.id) {
          mat.emissive.setHex(0x2563eb);
          mat.emissiveIntensity = 0.5;
        } else if (isFlowMatched) {
          mat.emissive.setHex(flowHighlightMode === "drive" ? 0xd97706 : 0x059669);
          mat.emissiveIntensity = 0.42;
        } else {
          mat.emissive.setHex(u.baseEmissiveHex || 0x000000);
          mat.emissiveIntensity = u.baseEmissiveIntensity || 0;
        }
      });

      const pos = basePos.clone().addScaledVector(expDir, explodeFactor * 78.0);
      mesh.rotation.set(baseRotCad[0], baseRotCad[1], baseRotCad[2]);

      if (pl.motion === "motor_pinion") {
        mesh.rotation.y += motorPinionRad;
      } else if (pl.motion === "primary_shaft") {
        mesh.rotation.y += primaryShaftRad;
      } else if (pl.motion === "long_shaft") {
        if (part.id === "G15") {
          // Planetary pinion spins on its own axis (-2.0x) while orbiting
          mesh.rotation.x += -primaryShaftRad * 2.0;
        } else {
          mesh.rotation.x += primaryShaftRad;
        }
      } else if (pl.motion === "bevel_spin") {
        if (pl.label.includes("左出") || pl.label.includes("右出")) {
          mesh.rotation.y += primaryShaftRad;
        } else {
          mesh.rotation.z += primaryShaftRad;
        }
      } else if (pl.motion === "cam_shaft") {
        if (part.id === "P57") {
          // Geneva driving pin orbits around cam shaft (-34, 0) at radius R=14.14mm
          const rPin = 14.14;
          const pinX = -34.0 + rPin * Math.cos(camAngleRad + Math.PI * 0.25);
          const pinY = 0.0 + rPin * Math.sin(camAngleRad + Math.PI * 0.25);
          const orbitThree = cadToThreePos(pinX, pinY, cadPos[2]);
          pos.x = orbitThree.x + expDir.x * explodeFactor * 78.0;
          pos.z = orbitThree.z + expDir.z * explodeFactor * 78.0;
        }
        mesh.rotation.z += camAngleRad;
      } else if (pl.motion === "cam_shaft_sub") {
        mesh.rotation.z += -camAngleRad;
      } else if (pl.motion === "geneva_wheel") {
        mesh.rotation.z += genevaIntermittentAngle(camAngleRad);
      } else if (pl.motion === "pushrod_main") {
        pos.x += s1;
      } else if (pl.motion === "pushrod_rear") {
        pos.x += s2;
      } else if (pl.motion === "tie_rod_front") {
        pos.z -= s1 * 1.1;
      } else if (pl.motion === "tie_rod_rear") {
        pos.z -= s2 * 1.1;
      } else if (pl.motion === "swerve_front" || pl.motion === "swerve_rear") {
        const steerAng = pl.motion === "swerve_front" ? steerFrontRad : steerRearRad;
        // Orbit around kingpin axis (X=±72, Y=±58) if offset from kingpin center (e.g. P30, G07, P33)
        if (kingpinCad) {
          const dx = cadPos[0] - kingpinCad[0];
          const dy = cadPos[1] - kingpinCad[1];
          const cosA = Math.cos(steerAng);
          const sinA = Math.sin(steerAng);
          const newCadX = kingpinCad[0] + dx * cosA - dy * sinA;
          const newCadY = kingpinCad[1] + dx * sinA + dy * cosA;
          const orbited = cadToThreePos(newCadX, newCadY, cadPos[2]);
          pos.x = orbited.x + expDir.x * explodeFactor * 78.0;
          pos.z = orbited.z + expDir.z * explodeFactor * 78.0;
        }
        // Apply yaw steering + simultaneous wheel rolling spin for tires/hubs/bevel rings
        mesh.rotation.order = "ZYX";
        mesh.rotation.z = steerAng;
        if (wheelRollingIds.has(part.id)) {
          mesh.rotation.y = wheelRollRad;
        }
      }

      holder.position.copy(pos);
    });

    const deg = ((camAngleRad * 180 / Math.PI) % 360 + 360) % 360;
    const fDeg = steerFrontRad * 180 / Math.PI;
    const rDeg = steerRearRad * 180 / Math.PI;
    const genevaDeg = Math.abs((genevaIntermittentAngle(camAngleRad) * 180) / Math.PI);
    const modeLabel =
      omniMode === "crab"
        ? "四轮同向全向斜行(蟹行平移 δF = δR)"
        : omniMode === "turn"
        ? "四轮反向全向急转(原地回转 δF = -δR)"
        : "双凸轮复合全向轨迹(独立相位)";
    document.getElementById("kin-mode").textContent = `当前模式: ${modeLabel}`;
    document.getElementById("kin-cam").textContent =
      `凸轮 θ = ${deg.toFixed(1)}° | 马耳他槽轮分度 φ2 = ${genevaDeg.toFixed(1)}° | 推杆 s1 = ${(s1 >= 0 ? "+" : "") + s1.toFixed(2)} mm`;
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

  window.toggleFlowHighlight = function (mode) {
    flowHighlightMode = flowHighlightMode === mode ? null : mode;
    const btnDrive = document.getElementById("btn-flow-drive");
    const btnSteer = document.getElementById("btn-flow-steer");
    if (btnDrive) btnDrive.classList.toggle("active", flowHighlightMode === "drive");
    if (btnSteer) btnSteer.classList.toggle("active", flowHighlightMode === "steer");
    applyKinematicsAndVisibility();
  };

  window.toggleVectors = function () {
    showVectors = !showVectors;
    const btn = document.getElementById("btn-vectors");
    if (btn) btn.classList.toggle("active", showVectors);
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
    flowHighlightMode = null;
    const btnDrive = document.getElementById("btn-flow-drive");
    const btnSteer = document.getElementById("btn-flow-steer");
    if (btnDrive) btnDrive.classList.remove("active");
    if (btnSteer) btnSteer.classList.remove("active");
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
