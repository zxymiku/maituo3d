// High-Precision Procedural 3D CAD Detail Builder & Collision-Free Kinematics Enhancer
// Covers BOTH Mechanical Drivetrain/Steering Parts AND Non-Mechanical Electronic/Energy/Housing Modules
// without altering SolidWorks 1:1 part names or generator scripts.
(function () {
  const TWO_PI = Math.PI * 2;

  function makeMat(hex, opts) {
    return new THREE.MeshStandardMaterial(
      Object.assign(
        {
          color: new THREE.Color(hex),
          metalness: 0.55,
          roughness: 0.35,
          side: THREE.DoubleSide,
        },
        opts || {}
      )
    );
  }

  function addEdges(mesh, opacity) {
    if (!mesh || !mesh.geometry) return;
    const edges = new THREE.EdgesGeometry(mesh.geometry, 26);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({
        color: 0x090d16,
        transparent: true,
        opacity: opacity !== undefined ? opacity : 0.42,
      })
    );
    line.userData.isEdgeLine = true;
    mesh.add(line);
  }

  function orientCyl(mesh, axis) {
    if (axis === "Z") mesh.rotation.x = Math.PI / 2;
    else if (axis === "X") mesh.rotation.z = -Math.PI / 2;
    return mesh;
  }

  function makeHollowCylinder(rOut, rIn, length, axis, mat, radialSegs) {
    const segs = radialSegs || 36;
    const shape = new THREE.Shape();
    shape.absarc(0, 0, rOut, 0, TWO_PI, false);
    if (rIn > 0.05 && rIn < rOut - 0.05) {
      const hole = new THREE.Path();
      hole.absarc(0, 0, rIn, 0, TWO_PI, true);
      shape.holes.push(hole);
    }
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: length,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: Math.min(0.22, (rOut - rIn) * 0.15),
      bevelThickness: Math.min(0.22, length * 0.08),
      curveSegments: segs,
    });
    geom.translate(0, 0, -length * 0.5);
    if (axis === "Y") {
      geom.rotateX(Math.PI / 2);
    } else if (axis === "X") {
      geom.rotateY(Math.PI / 2);
    }
    geom.computeVertexNormals();
    const m = new THREE.Mesh(geom, mat);
    addEdges(m, 0.35);
    return m;
  }

  // Helper: M3 Socket Head Cap Screw (内六角圆柱头螺钉)
  function makeSocketScrew(axis, x, y, z) {
    const screwMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.18 });
    const darkMat = makeMat("#0f172a", { metalness: 0.5, roughness: 0.6 });
    const grp = new THREE.Group();
    const head = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 2.2, 18), screwMat);
    const hexSocket = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 2.3, 6), darkMat);
    orientCyl(head, axis);
    orientCyl(hexSocket, axis);
    grp.add(head, hexSocket);
    grp.position.set(x, y, z);
    return grp;
  }

  // ============================================================================
  // 1. Procedural Canvas Textures for Non-Mechanical Modules (LCD, Solar, Supercap, PCB, RFID)
  // ============================================================================
  const texCache = {};

  function getSolarCellTexture() {
    if (texCache.solar) return texCache.solar;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 1024;
    const ctx = c.getContext("2d");
    // Deep anti-reflective monocrystalline silicon blue background
    ctx.fillStyle = "#0f296b";
    ctx.fillRect(0, 0, c.width, c.height);

    // 4x8 monocrystalline wafer cells with chamfered corners
    const cols = 4, rows = 8;
    const cw = c.width / cols, ch = c.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let col = 0; col < cols; col++) {
        const x0 = col * cw + 4, y0 = r * ch + 4;
        const w = cw - 8, h = ch - 8;
        const grad = ctx.createLinearGradient(x0, y0, x0 + w, y0 + h);
        grad.addColorStop(0, "#17388a");
        grad.addColorStop(0.5, "#1e40af");
        grad.addColorStop(1, "#112868");
        ctx.fillStyle = grad;
        ctx.beginPath();
        const chf = 10;
        ctx.moveTo(x0 + chf, y0);
        ctx.lineTo(x0 + w - chf, y0);
        ctx.lineTo(x0 + w, y0 + chf);
        ctx.lineTo(x0 + w, y0 + h - chf);
        ctx.lineTo(x0 + w - chf, y0 + h);
        ctx.lineTo(x0 + chf, y0 + h);
        ctx.lineTo(x0, y0 + h - chf);
        ctx.lineTo(x0, y0 + chf);
        ctx.closePath();
        ctx.fill();

        // Fine horizontal silver collector fingers
        ctx.strokeStyle = "rgba(226, 232, 240, 0.48)";
        ctx.lineWidth = 1.2;
        for (let fy = y0 + 10; fy < y0 + h - 6; fy += 12) {
          ctx.beginPath();
          ctx.moveTo(x0 + 3, fy);
          ctx.lineTo(x0 + w - 3, fy);
          ctx.stroke();
        }
        // Dual vertical silver busbars per cell column
        ctx.fillStyle = "rgba(241, 245, 249, 0.88)";
        ctx.fillRect(x0 + w * 0.28, y0, 3.2, h);
        ctx.fillRect(x0 + w * 0.72, y0, 3.2, h);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    texCache.solar = tex;
    return tex;
  }

  function getWattmeterLcdTexture() {
    if (texCache.lcd) return texCache.lcd;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 512;
    const ctx = c.getContext("2d");
    // Backlit cyan-blue LCD background
    const grad = ctx.createLinearGradient(0, 0, 256, 512);
    grad.addColorStop(0, "#0369a1");
    grad.addColorStop(1, "#075985");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 512);

    ctx.strokeStyle = "#38bdf8";
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 236, 492);

    ctx.save();
    ctx.translate(128, 256);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#e0f2fe";
    ctx.font = "bold 26px monospace";
    ctx.fillText("SOLAR MPPT METER", -190, -76);
    ctx.fillStyle = "#7dd3fc";
    ctx.font = "bold 34px monospace";
    ctx.fillText("U: 14.85 V   I: 1.42 A", -210, -22);
    ctx.fillStyle = "#fde047";
    ctx.font = "bold 36px monospace";
    ctx.fillText("P: 21.09 W   E: 486 J", -210, 34);
    ctx.fillStyle = "#86efac";
    ctx.font = "bold 24px monospace";
    ctx.fillText("CAP: 98%  [OMNI-OK]", -190, 84);
    ctx.restore();

    const tex = new THREE.CanvasTexture(c);
    texCache.lcd = tex;
    return tex;
  }

  function getSupercapLabelTexture() {
    if (texCache.supercap) return texCache.supercap;
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#172554";
    ctx.fillRect(0, 0, 256, 256);
    // Negative polarity silver stripe
    ctx.fillStyle = "#cbd5e1";
    ctx.fillRect(200, 0, 36, 256);
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 28px monospace";
    for (let y = 36; y < 250; y += 56) {
      ctx.fillText("-", 210, y);
    }
    // Gold/cyan capacitor rating text
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("SUPERCAP", 24, 90);
    ctx.fillStyle = "#facc15";
    ctx.font = "bold 30px monospace";
    ctx.fillText("2.7V 500F", 20, 140);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "18px monospace";
    ctx.fillText("LOW-ESR 105°C", 24, 185);
    const tex = new THREE.CanvasTexture(c);
    texCache.supercap = tex;
    return tex;
  }

  function getRfidCoilTexture() {
    if (texCache.rfid) return texCache.rfid;
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#075985";
    ctx.fillRect(0, 0, 512, 512);
    // Golden rectangular spiral RF planar antenna traces
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 4.5;
    for (let i = 0; i < 9; i++) {
      const m = 18 + i * 11;
      ctx.strokeRect(m, m, 512 - 2 * m, 512 - 2 * m);
    }
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "bold 26px monospace";
    ctx.fillText("13.56MHz RFID", 150, 405);
    const tex = new THREE.CanvasTexture(c);
    texCache.rfid = tex;
    return tex;
  }

  // ============================================================================
  // 2. Non-Mechanical & Electronic Components High-Precision 3D Builders
  // ============================================================================

  // E01: 单晶硅太阳能电池板 (66 x 113 x 3 mm)
  function buildSolarPanelGroup(part) {
    const grp = new THREE.Group();
    const sx = part.size[0], sy = part.size[1], sz = part.size[2];
    const frameMat = makeMat("#94a3b8", { metalness: 0.85, roughness: 0.24 });
    const glassMat = new THREE.MeshStandardMaterial({
      map: getSolarCellTexture(),
      metalness: 0.25,
      roughness: 0.12,
    });
    const busbarMat = makeMat("#f8fafc", { metalness: 0.95, roughness: 0.1 });
    const jboxMat = makeMat("#1e293b", { metalness: 0.2, roughness: 0.6 });

    // Anodized aluminum perimeter frame with stepped bezel
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz * 0.72), frameMat);
    basePlate.position.z = -sz * 0.14;
    addEdges(basePlate, 0.45);
    grp.add(basePlate);

    // 4 Bezel frame rails
    const railH = sz * 0.96;
    const railX = new THREE.Mesh(new THREE.BoxGeometry(sx, 2.4, railH), frameMat);
    const railX2 = railX.clone();
    railX.position.set(0, sy * 0.5 - 1.2, 0);
    railX2.position.set(0, -sy * 0.5 + 1.2, 0);
    const railY = new THREE.Mesh(new THREE.BoxGeometry(2.4, sy - 4.8, railH), frameMat);
    const railY2 = railY.clone();
    railY.position.set(sx * 0.5 - 1.2, 0, 0);
    railY2.position.set(-sx * 0.5 + 1.2, 0, 0);
    grp.add(railX, railX2, railY, railY2);

    // Monocrystalline silicon textured glass laminate
    const wafer = new THREE.Mesh(new THREE.BoxGeometry(sx - 4.8, sy - 4.8, 0.8), glassMat);
    wafer.position.z = sz * 0.28;
    grp.add(wafer);

    // Raised silver cross-ribbon interconnects at top & bottom headers
    [-sy * 0.45, sy * 0.45].forEach((yPos) => {
      const ribbon = new THREE.Mesh(new THREE.BoxGeometry(sx - 10.0, 1.8, 0.3), busbarMat);
      ribbon.position.set(0, yPos, sz * 0.48);
      grp.add(ribbon);
    });

    // Bottom Junction Box (背面防水接线盒 + 肖特基防反充二极管盒 + 正负极引线端)
    const jbox = new THREE.Mesh(new THREE.BoxGeometry(18.0, 22.0, 4.2), jboxMat);
    jbox.position.set(0, -sy * 0.32, -sz * 0.5 - 2.1);
    addEdges(jbox, 0.4);
    const cableRed = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 14.0, 12),
      makeMat("#ef4444", { metalness: 0.1, roughness: 0.6 })
    );
    cableRed.position.set(4.0, -sy * 0.32 - 14.0, -sz * 0.5 - 2.1);
    const cableBlk = new THREE.Mesh(
      new THREE.CylinderGeometry(1.1, 1.1, 14.0, 12),
      makeMat("#0f172a", { metalness: 0.1, roughness: 0.6 })
    );
    cableBlk.position.set(-4.0, -sy * 0.32 - 14.0, -sz * 0.5 - 2.1);
    grp.add(jbox, cableRed, cableBlk);

    // 4 Corner M3 mounting ears with screws
    for (const cx of [-sx * 0.44, sx * 0.44]) {
      for (const cy of [-sy * 0.44, sy * 0.44]) {
        grp.add(makeSocketScrew("Z", cx, cy, sz * 0.5));
      }
    }
    return grp;
  }

  // P50: 太阳能板承载框 (72 x 119 x 5 mm) — Stepped L-channel frame + X-truss carbon-fiber ribs
  function buildSolarFrameGroup(part, baseGeom) {
    const grp = new THREE.Group();
    const cfMat = makeMat("#334155", { metalness: 0.45, roughness: 0.42 });
    const accentMat = makeMat("#64748b", { metalness: 0.7, roughness: 0.3 });

    const mainFrame = new THREE.Mesh(baseGeom, cfMat);
    addEdges(mainFrame, 0.45);
    grp.add(mainFrame);

    // Diagonal X-brace stiffening ribs across the open window
    const diagLen = Math.hypot(58.0, 105.0);
    const diagAng = Math.atan2(105.0, 58.0);
    const rib1 = new THREE.Mesh(new THREE.BoxGeometry(diagLen, 3.6, 2.8), cfMat);
    rib1.position.z = -1.0;
    rib1.rotation.z = diagAng;
    addEdges(rib1, 0.4);
    const rib2 = new THREE.Mesh(new THREE.BoxGeometry(diagLen, 3.6, 2.8), cfMat);
    rib2.position.z = -1.0;
    rib2.rotation.z = -diagAng;
    addEdges(rib2, 0.4);
    // Central hub ring at X-intersection
    const centerRing = makeHollowCylinder(9.0, 4.0, 3.2, "Z", accentMat, 24);
    centerRing.position.z = -1.0;
    grp.add(rib1, rib2, centerRing);

    // 4 Standoff mounting bosses at (X = ±30, Y = ±46)
    for (const cx of [-30.0, 30.0]) {
      for (const cy of [-46.0, 46.0]) {
        const boss = makeHollowCylinder(5.0, 1.6, 5.4, "Z", accentMat, 20);
        boss.position.set(cx, cy, 0);
        grp.add(boss);
      }
    }
    return grp;
  }

  // P51: 太阳能板支撑立柱 (Φ6 x 48 mm) — Hexagonal CNC standoff with knurled waist & flanged ends
  function buildSolarPillarGroup(part) {
    const grp = new THREE.Group();
    const aluMat = makeMat("#94a3b8", { metalness: 0.85, roughness: 0.22 });
    const goldMat = makeMat("#38bdf8", { metalness: 0.78, roughness: 0.25 });

    // Hexagonal main pillar body (6-sided prism along Z)
    const hexBody = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 42.0, 6), aluMat);
    orientCyl(hexBody, "Z");
    addEdges(hexBody, 0.45);
    grp.add(hexBody);

    // Top & bottom flanged collars + central anodized ring
    [-22.5, 22.5].forEach((zOff) => {
      const fl = makeHollowCylinder(4.6, 1.5, 3.0, "Z", goldMat, 24);
      fl.position.z = zOff;
      grp.add(fl);
    });
    const midBand = makeHollowCylinder(3.5, 1.5, 6.0, "Z", goldMat, 24);
    grp.add(midBand);
    return grp;
  }

  // E02: 超级电容储能模组 (68 x 48 x 34 mm) — 2x3 500F Farad Supercapacitors + Dual Balancing PCBs + Nickel Busbars + XT30
  function buildSupercapModuleGroup() {
    const grp = new THREE.Group();
    const pcbMat = makeMat("#065f46", { metalness: 0.28, roughness: 0.5 });
    const capWrapMat = new THREE.MeshStandardMaterial({
      map: getSupercapLabelTexture(),
      metalness: 0.3,
      roughness: 0.35,
    });
    const aluTopMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.18 });
    const rubberSealMat = makeMat("#0f172a", { metalness: 0.1, roughness: 0.8 });
    const busbarMat = makeMat("#f8fafc", { metalness: 0.95, roughness: 0.12 });
    const copperMat = makeMat("#d97706", { metalness: 0.88, roughness: 0.2 });
    const xt30Mat = makeMat("#eab308", { metalness: 0.2, roughness: 0.45 });
    const smdMat = makeMat("#1e293b", { metalness: 0.3, roughness: 0.5 });
    const ledMat = makeMat("#10b981", {
      emissive: new THREE.Color("#10b981"),
      emissiveIntensity: 0.8,
    });

    // 1. Lower base PCB (Z = -15.2) & Upper balancing bridge PCB (Z = +14.8)
    const lowerPcb = new THREE.Mesh(new THREE.BoxGeometry(67.6, 47.6, 2.4), pcbMat);
    lowerPcb.position.z = -15.2;
    addEdges(lowerPcb, 0.4);
    grp.add(lowerPcb);

    // 4 Corner M3 Brass Standoffs connecting lower & upper PCBs
    for (const cx of [-30.5, 30.5]) {
      for (const cy of [-20.5, 20.5]) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 30.0, 6), copperMat);
        orientCyl(pillar, "Z");
        pillar.position.set(cx, cy, -0.5);
        grp.add(pillar);
        grp.add(makeSocketScrew("Z", cx, cy, 15.5));
      }
    }

    // 2. 2x3 Array of 6 Supercapacitor Cells (Φ18.8 x 29.5 mm)
    const ventGrooveGeo = new THREE.BoxGeometry(12.0, 0.55, 0.35);
    for (let ix = 0; ix < 3; ix++) {
      const cx = (ix - 1) * 20.5;
      for (let iy = 0; iy < 2; iy++) {
        const cy = (iy === 0 ? -1 : 1) * 11.2;

        // Cylindrical heat-shrink body with procedural 2.7V 500F label
        const cell = new THREE.Mesh(new THREE.CylinderGeometry(9.3, 9.3, 28.5, 28), capWrapMat);
        orientCyl(cell, "Z");
        cell.position.set(cx, cy, 0.0);
        addEdges(cell, 0.28);
        grp.add(cell);

        // Top crimped insulation shoulder + rubber seal ring
        const crimp = makeHollowCylinder(9.35, 7.6, 1.8, "Z", rubberSealMat, 24);
        crimp.position.set(cx, cy, 14.0);
        grp.add(crimp);

        // Brushed aluminum safety vent top disc + Y-shaped explosion-proof score lines
        const ventDisc = new THREE.Mesh(new THREE.CylinderGeometry(7.6, 7.6, 0.6, 24), aluTopMat);
        orientCyl(ventDisc, "Z");
        ventDisc.position.set(cx, cy, 14.4);
        grp.add(ventDisc);

        for (let k = 0; k < 3; k++) {
          const groove = new THREE.Mesh(ventGrooveGeo, rubberSealMat);
          groove.position.set(cx, cy, 14.8);
          groove.rotation.z = (k * Math.PI) / 3;
          grp.add(groove);
        }

        // SMD cell-balancing resistor + green balancing LED next to each cell
        const balRes = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.8, 1.0), smdMat);
        balRes.position.set(cx - 4.0, cy * 1.72, -13.5);
        const balLed = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 1.0), ledMat);
        balLed.position.set(cx + 4.0, cy * 1.72, -13.5);
        grp.add(balRes, balLed);
      }
    }

    // 3. Heavy Nickel-Plated Copper Series/Parallel Interconnect Busbars on top
    const busLong1 = new THREE.Mesh(new THREE.BoxGeometry(44.0, 4.2, 0.8), busbarMat);
    busLong1.position.set(0, -11.2, 15.2);
    const busLong2 = new THREE.Mesh(new THREE.BoxGeometry(44.0, 4.2, 0.8), busbarMat);
    busLong2.position.set(0, 11.2, 15.2);
    const busCross = new THREE.Mesh(new THREE.BoxGeometry(5.0, 24.0, 0.9), copperMat);
    busCross.position.set(20.5, 0, 15.4);
    addEdges(busLong1, 0.4);
    addEdges(busLong2, 0.4);
    addEdges(busCross, 0.4);
    grp.add(busLong1, busLong2, busCross);

    // 4. Yellow XT30 High-Current Output Connector + Red/Black Silicone Pigtails
    const xt30Body = new THREE.Mesh(new THREE.BoxGeometry(9.5, 11.0, 6.2), xt30Mat);
    xt30Body.position.set(-29.5, 0, 11.0);
    addEdges(xt30Body, 0.5);
    const pinPos = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 4.0, 12), copperMat);
    pinPos.rotation.z = Math.PI / 2;
    pinPos.position.set(-34.5, 2.6, 11.0);
    const pinNeg = pinPos.clone();
    pinNeg.position.set(-34.5, -2.6, 11.0);
    grp.add(xt30Body, pinPos, pinNeg);

    return grp;
  }

  // P52: 超级电容固定座 (72 x 52 x 8 mm) — Ribbed cradle tray with 4 snap-fit retention clips & mounting ears
  function buildSupercapHolderGroup(part, baseGeom) {
    const grp = new THREE.Group();
    const trayMat = makeMat("#475569", { metalness: 0.4, roughness: 0.48 });
    const clipMat = makeMat("#0284c7", { metalness: 0.5, roughness: 0.35 });

    const baseTray = new THREE.Mesh(baseGeom, trayMat);
    addEdges(baseTray, 0.45);
    grp.add(baseTray);

    // 4 Snap-fit spring retention clips gripping the supercap bank
    [
      { x: 0, y: 25.5, w: 18.0, h: 2.2 },
      { x: 0, y: -25.5, w: 18.0, h: 2.2 },
      { x: 35.5, y: 0, w: 2.2, h: 16.0 },
      { x: -35.5, y: 0, w: 2.2, h: 16.0 },
    ].forEach((c) => {
      const clip = new THREE.Mesh(new THREE.BoxGeometry(c.w, c.h, 11.0), clipMat);
      clip.position.set(c.x, c.y, 4.5);
      addEdges(clip, 0.4);
      grp.add(clip);
    });

    // Bottom cross-grid support ribs so the supercap doesn't fall through
    for (const rx of [-18.0, 0.0, 18.0]) {
      const rib = new THREE.Mesh(new THREE.BoxGeometry(3.2, 46.0, 2.2), trayMat);
      rib.position.set(rx, 0, -2.8);
      grp.add(rib);
    }
    return grp;
  }

  // E03: 充电与语音控制电路板 (64 x 44 x 5 mm) — MPPT Toroidal Inductor + Heatsink + MCU + Voice Chip + Mic + Speaker
  function buildControlPcbGroup(part) {
    const grp = new THREE.Group();
    const sx = part.size[0], sy = part.size[1];
    const pcbMat = makeMat("#15803d", { metalness: 0.25, roughness: 0.48 });
    const goldMat = makeMat("#facc15", { metalness: 0.9, roughness: 0.15 });
    const icMat = makeMat("#0f172a", { metalness: 0.2, roughness: 0.45 });
    const copperMat = makeMat("#d97706", { metalness: 0.88, roughness: 0.2 });
    const coreMat = makeMat("#1e293b", { metalness: 0.3, roughness: 0.6 });
    const heatsinkMat = makeMat("#38bdf8", { metalness: 0.82, roughness: 0.24 });
    const termMat = makeMat("#16a34a", { metalness: 0.15, roughness: 0.55 });
    const aluMat = makeMat("#cbd5e1", { metalness: 0.88, roughness: 0.2 });

    // 1. Main FR-4 PCB substrate (1.8mm thick) with 4 gold mounting pads
    const board = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, 1.8), pcbMat);
    board.position.z = -1.2;
    addEdges(board, 0.45);
    grp.add(board);

    for (const [cx, cy] of [[-24, -16], [-24, 14], [24, -16], [24, 14]]) {
      const pad = makeHollowCylinder(3.2, 1.5, 2.0, "Z", goldMat, 20);
      pad.position.set(cx, cy, -1.2);
      grp.add(pad);
      grp.add(makeSocketScrew("Z", cx, cy, 0.5));
    }

    // 2. MPPT Solar Charge Controller Section (Left half X < 0):
    // Toroidal Inductor (磁环电感 + 铜漆包线绕组)
    const toroidCore = makeHollowCylinder(5.8, 3.0, 4.2, "Z", coreMat, 24);
    toroidCore.position.set(-15.0, -5.0, 1.8);
    grp.add(toroidCore);
    const wireGeo = new THREE.TorusGeometry(4.4, 1.6, 10, 20);
    const wireMesh = new THREE.Mesh(wireGeo, copperMat);
    wireMesh.position.set(-15.0, -5.0, 1.8);
    grp.add(wireMesh);

    // Finned Anodized Aluminum Heatsink over MPPT MOSFETs
    const hsBase = new THREE.Mesh(new THREE.BoxGeometry(11.0, 13.0, 1.5), heatsinkMat);
    hsBase.position.set(-15.0, 10.0, 0.8);
    grp.add(hsBase);
    for (let fx = -19.5; fx <= -10.5; fx += 2.2) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 13.0, 5.2), heatsinkMat);
      fin.position.set(fx, 10.0, 3.4);
      grp.add(fin);
    }

    // 2 SMD Electrolytic Smoothing Capacitors (Φ6.3 x 7mm)
    [-4.0, 3.5].forEach((xPos) => {
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 6.5, 20), aluMat);
      orientCyl(cap, "Z");
      cap.position.set(xPos, 11.0, 2.6);
      addEdges(cap, 0.3);
      grp.add(cap);
    });

    // 3. Voice Recognition & Broadcast Section (Right half X > 0):
    // 32-bit Main MCU (LQFP-48 IC) + Voice Synthesis Chip (SOP-16)
    const mcu = new THREE.Mesh(new THREE.BoxGeometry(9.0, 9.0, 1.6), icMat);
    mcu.position.set(8.0, -2.0, 0.5);
    const mcuPads = new THREE.Mesh(new THREE.BoxGeometry(10.6, 10.6, 0.6), aluMat);
    mcuPads.position.set(8.0, -2.0, 0.1);
    const voiceIc = new THREE.Mesh(new THREE.BoxGeometry(6.0, 9.5, 1.6), icMat);
    voiceIc.position.set(20.0, -2.0, 0.5);
    addEdges(mcu, 0.4);
    addEdges(voiceIc, 0.4);
    grp.add(mcu, mcuPads, voiceIc);

    // Cylindrical Electret Microphone (驻极体语音识别麦克风, Φ6 x 5mm with black acoustic felt top)
    const micBody = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.2, 4.8, 20), aluMat);
    orientCyl(micBody, "Z");
    micBody.position.set(14.0, 13.0, 1.8);
    const micFelt = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.7, 0.5, 20), coreMat);
    orientCyl(micFelt, "Z");
    micFelt.position.set(14.0, 13.0, 4.3);
    grp.add(micBody, micFelt);

    // Mini Acoustic Speaker / Buzzer (语音播报腔体扬声器, Φ12 x 5.5mm with sound hole)
    const buzzer = makeHollowCylinder(5.8, 1.6, 5.2, "Z", icMat, 24);
    buzzer.position.set(-2.0, -12.0, 2.0);
    grp.add(buzzer);

    // Green Screw Terminal Blocks (Solar In / Cap In / Motor Out) & Type-C Port
    const term1 = new THREE.Mesh(new THREE.BoxGeometry(10.0, 6.5, 6.2), termMat);
    term1.position.set(-26.0, -3.0, 2.4);
    addEdges(term1, 0.4);
    const usbPort = new THREE.Mesh(new THREE.BoxGeometry(7.5, 9.0, 3.2), aluMat);
    usbPort.position.set(27.5, 2.0, 1.2);
    addEdges(usbPort, 0.4);
    grp.add(term1, usbPort);

    // 3 Glowing Status SMD LEDs (Red Power, Blue MPPT Tracking, Green Voice Ready)
    [
      { y: -12, col: "#ef4444" },
      { y: -15, col: "#38bdf8" },
      { y: -18, col: "#10b981" },
    ].forEach((st) => {
      const led = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 1.4, 1.1),
        makeMat(st.col, { emissive: new THREE.Color(st.col), emissiveIntensity: 0.85 })
      );
      led.position.set(16.0, st.y, 0.4);
      grp.add(led);
    });

    return grp;
  }

  // E04: 顶部电能检测模块 (35 x 84 x 24 mm) — Instrument Enclosure + Canvas Backlit LCD + Shunt Terminals
  function buildWattmeterGroup() {
    const grp = new THREE.Group();
    const caseMat = makeMat("#0f172a", { metalness: 0.25, roughness: 0.48 });
    const bezelMat = makeMat("#1e293b", { metalness: 0.35, roughness: 0.38 });
    const lcdMat = new THREE.MeshStandardMaterial({
      map: getWattmeterLcdTexture(),
      metalness: 0.1,
      roughness: 0.15,
      emissive: new THREE.Color("#0284c7"),
      emissiveMap: getWattmeterLcdTexture(),
      emissiveIntensity: 0.65,
    });
    const brassMat = makeMat("#eab308", { metalness: 0.85, roughness: 0.2 });

    // Main instrument body with stepped front bezel
    const body = new THREE.Mesh(new THREE.BoxGeometry(33.0, 80.0, 21.0), caseMat);
    body.position.z = -1.0;
    addEdges(body, 0.45);
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(35.0, 84.0, 3.2), bezelMat);
    bezel.position.z = 10.2;
    addEdges(bezel, 0.45);
    grp.add(body, bezel);

    // Backlit High-Contrast Digital LCD Screen
    const screen = new THREE.Mesh(new THREE.BoxGeometry(25.0, 66.0, 0.8), lcdMat);
    screen.position.set(-1.2, 0, 11.7);
    grp.add(screen);

    // Mode / Reset tactile calibration button on the front bezel
    const btn = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 2.2, 2.2, 16),
      makeMat("#ef4444", { metalness: 0.3, roughness: 0.4 })
    );
    orientCyl(btn, "Z");
    btn.position.set(13.5, -32.0, 12.2);
    grp.add(btn);

    // Side snap-in retention clips & bottom 4-pole current shunt brass terminals
    for (const sy of [-24.0, -8.0, 8.0, 24.0]) {
      const shunt = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 5.0, 16), brassMat);
      orientCyl(shunt, "Z");
      shunt.position.set(0, sy, -12.5);
      grp.add(shunt);
    }
    return grp;
  }

  // P53: 电能检测模块支架 (38 x 92 x 28 mm) — Portal Gantry Bridge + Dedicated Side Mount for Red LED E05
  function buildWattmeterBracketGroup(part, baseGeom) {
    const grp = new THREE.Group();
    const mat = makeMat("#475569", { metalness: 0.65, roughness: 0.32 });
    const accentMat = makeMat("#38bdf8", { metalness: 0.75, roughness: 0.28 });

    const mainGantry = new THREE.Mesh(baseGeom, mat);
    addEdges(mainGantry, 0.45);
    grp.add(mainGantry);

    // Bottom bolting feet at Y = ±42mm with M3 socket screws
    [-42.0, 42.0].forEach((yPos) => {
      const foot = new THREE.Mesh(new THREE.BoxGeometry(36.0, 8.0, 3.5), accentMat);
      foot.position.set(0, yPos, -12.2);
      addEdges(foot, 0.4);
      grp.add(foot);
      grp.add(makeSocketScrew("Z", -12.0, yPos, -10.0));
      grp.add(makeSocketScrew("Z", 12.0, yPos, -10.0));
    });
    return grp;
  }

  // E05: 顶部红色LED指示灯 (Φ10 x 14 mm) — Stainless Bezel + Hex Nut + Glowing Ruby Dome + Leads
  function buildRedLedGroup() {
    const grp = new THREE.Group();
    const chromeMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.16 });
    const nutMat = makeMat("#94a3b8", { metalness: 0.82, roughness: 0.25 });
    const lensMat = makeMat("#ef4444", {
      metalness: 0.08,
      roughness: 0.12,
      emissive: new THREE.Color("#dc2626"),
      emissiveIntensity: 0.85,
    });
    const coreGlowMat = makeMat("#fca5a5", {
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 1.0,
    });

    // Threaded metal body & hex mounting nut
    const body = makeHollowCylinder(4.8, 2.0, 7.5, "Z", chromeMat, 24);
    body.position.z = -3.2;
    const hexNut = new THREE.Mesh(new THREE.CylinderGeometry(6.4, 6.4, 2.4, 6), nutMat);
    orientCyl(hexNut, "Z");
    hexNut.position.z = -1.5;
    const bezelCollar = makeHollowCylinder(5.6, 4.2, 2.0, "Z", chromeMat, 28);
    bezelCollar.position.z = 0.8;
    grp.add(body, hexNut, bezelCollar);

    // Glowing Φ9mm ruby-red cylindrical barrel + hemispherical dome lens
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(4.4, 4.4, 4.2, 28), lensMat);
    orientCyl(barrel, "Z");
    barrel.position.z = 3.2;
    const dome = new THREE.Mesh(new THREE.SphereGeometry(4.4, 28, 18), lensMat);
    dome.position.z = 5.3;
    const emitterCore = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 12), coreGlowMat);
    emitterCore.position.z = 3.5;
    grp.add(barrel, dome, emitterCore);
    return grp;
  }

  // E06: 底部RFID读卡器模块 (40 x 40 x 3 mm) — Spiral Planar Antenna PCB + RC522 RF IC + Crystal + Pin Header
  function buildRfidModuleGroup(part) {
    const grp = new THREE.Group();
    const sx = part.size[0], sy = part.size[1];
    const pcbMat = new THREE.MeshStandardMaterial({
      map: getRfidCoilTexture(),
      metalness: 0.35,
      roughness: 0.35,
    });
    const icMat = makeMat("#0f172a", { metalness: 0.2, roughness: 0.4 });
    const crystalMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.15 });
    const goldMat = makeMat("#facc15", { metalness: 0.9, roughness: 0.15 });

    const board = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, 1.6), pcbMat);
    addEdges(board, 0.4);
    grp.add(board);

    // Central RC522 QFN-32 RF Transceiver IC + 27.12MHz Quartz Crystal
    const rfIc = new THREE.Mesh(new THREE.BoxGeometry(7.0, 7.0, 1.2), icMat);
    rfIc.position.set(0, 2.0, 1.2);
    const xtal = new THREE.Mesh(new THREE.BoxGeometry(5.0, 3.2, 1.2), crystalMat);
    xtal.position.set(-8.0, 2.0, 1.2);
    grp.add(rfIc, xtal);

    // 8-pin Right-Angle Gold Header Connector
    const hdrBase = new THREE.Mesh(new THREE.BoxGeometry(20.0, 2.5, 2.5), icMat);
    hdrBase.position.set(0, -15.5, 1.4);
    grp.add(hdrBase);
    for (let i = 0; i < 8; i++) {
      const pin = new THREE.Mesh(new THREE.BoxGeometry(0.6, 4.5, 0.6), goldMat);
      pin.position.set(-8.75 + i * 2.5, -17.0, 1.4);
      grp.add(pin);
    }
    return grp;
  }

  // P54: 底部读卡器防护盒 (48 x 48 x 7 mm) — Sealed RF-Transparent ABS Skid Box with Bolted Mounting Ears
  function buildRfidBoxGroup(part, baseGeom) {
    const grp = new THREE.Group();
    const boxMat = makeMat("#475569", { metalness: 0.25, roughness: 0.55 });
    const skidMat = makeMat("#0284c7", { metalness: 0.35, roughness: 0.45 });

    const mainBox = new THREE.Mesh(baseGeom, boxMat);
    addEdges(mainBox, 0.45);
    grp.add(mainBox);

    // 4 Bolted mounting ears attaching to underside of lower sub-plate P02
    [
      [-23.5, -18.0],
      [-23.5, 18.0],
      [23.5, -18.0],
      [23.5, 18.0],
    ].forEach(([ex, ey]) => {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(6.0, 8.0, 2.5), skidMat);
      ear.position.set(ex, ey, 2.2);
      addEdges(ear, 0.4);
      grp.add(ear);
      grp.add(makeSocketScrew("Z", ex, ey, -2.2));
    });

    // Bottom wear-resistant RF window ring
    const rfRing = makeHollowCylinder(16.0, 13.5, 0.8, "Z", skidMat, 32);
    rfRing.position.z = -3.6;
    grp.add(rfRing);
    return grp;
  }

  // P07 & P08: Front Crumple Bumper & Rear Datum Bumper
  function buildBumperGroup(part, baseGeom, isFront) {
    const grp = new THREE.Group();
    const mainMat = makeMat(part.color, { metalness: isFront ? 0.35 : 0.72, roughness: 0.35 });
    const ribMat = makeMat("#0f172a", { metalness: 0.4, roughness: 0.5 });

    const body = new THREE.Mesh(baseGeom, mainMat);
    addEdges(body, 0.45);
    grp.add(body);

    // Front honeycomb energy-absorbing bumper slots / Rear tow-eyes
    for (let y = -48.0; y <= 48.0; y += 16.0) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(4.0, 9.0, 5.2), ribMat);
      slot.position.set(isFront ? 6.2 : -5.2, y, 0);
      grp.add(slot);
    }
    grp.add(makeSocketScrew("Z", 0, -45.0, 4.2));
    grp.add(makeSocketScrew("Z", 0, 45.0, 4.2));
    return grp;
  }

  // F01: M3铜柱与紧固件套件 (Φ6 x 10 mm) — True Hexagonal Brass Standoff + M3 Socket Cap Screw + Washer
  function buildBrassStandoffGroup() {
    const grp = new THREE.Group();
    const brassMat = makeMat("#eab308", { metalness: 0.88, roughness: 0.2 });
    const hexPillar = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 8.5, 6), brassMat);
    orientCyl(hexPillar, "Z");
    addEdges(hexPillar, 0.45);
    grp.add(hexPillar);
    grp.add(makeSocketScrew("Z", 0, 0, 4.8));
    return grp;
  }

  // P16: 万向十字联轴器节 (Φ11 x 14 mm) — Dual Fork Yokes + Central Cross Spider Pin
  function buildUniversalJointGroup() {
    const grp = new THREE.Group();
    const steelMat = makeMat("#cbd5e1", { metalness: 0.88, roughness: 0.2 });
    const spiderMat = makeMat("#f59e0b", { metalness: 0.82, roughness: 0.25 });

    const hubL = makeHollowCylinder(5.5, 2.5, 4.5, "X", steelMat, 24);
    hubL.position.x = -4.7;
    const hubR = makeHollowCylinder(5.5, 2.5, 4.5, "X", steelMat, 24);
    hubR.position.x = 4.7;
    const crossPinY = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 10.6, 16), spiderMat);
    const crossPinZ = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 10.6, 16), spiderMat);
    crossPinZ.rotation.x = Math.PI / 2;
    grp.add(hubL, hubR, crossPinY, crossPinZ);
    return grp;
  }

  // P49: 连杆关节鱼眼轴承接头 (Φ7 x 8 mm) — Spherical Heim Joint Housing + Chrome Ball Swivel + Stud
  function buildHeimJointGroup() {
    const grp = new THREE.Group();
    const bodyMat = makeMat("#94a3b8", { metalness: 0.82, roughness: 0.26 });
    const ballMat = makeMat("#f8fafc", { metalness: 0.95, roughness: 0.1 });

    const ring = makeHollowCylinder(3.6, 2.2, 3.2, "Z", bodyMat, 24);
    const ball = makeHollowCylinder(2.3, 1.5, 4.8, "Z", ballMat, 20);
    const shank = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 4.5, 14), bodyMat);
    shank.position.set(0, -4.5, 0);
    grp.add(ring, ball, shank);
    return grp;
  }

  // P68: 微分刻度游标调节旋钮 (Φ12 x 6 mm) — Knurled Vernier Dial with 18 Tick Marks
  function buildMicrometerKnobGroup() {
    const grp = new THREE.Group();
    const redAnodized = makeMat("#ef4444", { metalness: 0.78, roughness: 0.25 });
    const tickMat = makeMat("#f8fafc", { metalness: 0.9, roughness: 0.15 });

    grp.add(makeHollowCylinder(6.0, 2.0, 6.0, "Y", redAnodized, 32));
    const tickGeo = new THREE.BoxGeometry(0.45, 5.6, 0.7);
    for (let i = 0; i < 18; i++) {
      const a = (i * TWO_PI) / 18;
      const tick = new THREE.Mesh(tickGeo, tickMat);
      tick.position.set(Math.cos(a) * 6.0, 0, Math.sin(a) * 6.0);
      tick.rotation.y = -a;
      grp.add(tick);
    }
    return grp;
  }

  // ============================================================================
  // 3. Mechanical Drivetrain & Steering High-Precision 3D Builders
  // ============================================================================

  function buildBevelGearGroup(moduleMm, teeth, thickness, boreD, axis, baseColor) {
    const grp = new THREE.Group();
    const pitchR = 0.5 * moduleMm * teeth;
    const outerR = pitchR + moduleMm;
    const frontR = Math.max(boreD * 0.65 + 0.8, pitchR * 0.68);
    const boreR = boreD * 0.5;
    const brassMat = makeMat(baseColor || "#d97706", { metalness: 0.78, roughness: 0.25 });
    const hubMat = makeMat("#b45309", { metalness: 0.72, roughness: 0.32 });
    const darkMat = makeMat("#1e293b", { metalness: 0.6, roughness: 0.4 });

    const coneBlank = new THREE.Mesh(
      new THREE.CylinderGeometry(frontR * 0.92, outerR * 0.9, thickness * 0.78, 32),
      brassMat
    );
    orientCyl(coneBlank, axis);
    addEdges(coneBlank, 0.38);
    grp.add(coneBlank);

    const toothGeo = new THREE.BoxGeometry(moduleMm * 1.35, thickness * 0.76, moduleMm * 1.9);
    for (let i = 0; i < teeth; i++) {
      const ang = (i * TWO_PI) / teeth;
      const tooth = new THREE.Mesh(toothGeo, brassMat);
      const rMid = (frontR + outerR) * 0.47;
      if (axis === "Z") {
        tooth.position.set(Math.cos(ang) * rMid, Math.sin(ang) * rMid, 0);
        tooth.rotation.z = ang + Math.PI / 2;
        tooth.rotation.x = 0.52;
      } else if (axis === "Y") {
        tooth.position.set(Math.cos(ang) * rMid, 0, Math.sin(ang) * rMid);
        tooth.rotation.y = -ang;
        tooth.rotation.x = 0.52;
      } else {
        tooth.position.set(0, Math.cos(ang) * rMid, Math.sin(ang) * rMid);
        tooth.rotation.x = ang;
        tooth.rotation.z = 0.52;
      }
      grp.add(tooth);
    }

    const hubR = Math.max(boreR + 1.4, pitchR * 0.55);
    const hub = makeHollowCylinder(hubR, boreR, thickness * 0.72, axis, hubMat, 24);
    const offset = -thickness * 0.32;
    if (axis === "Z") hub.position.z = offset;
    else if (axis === "Y") hub.position.y = offset;
    else hub.position.x = offset;
    grp.add(hub);

    const boreRing = makeHollowCylinder(boreR + 0.35, Math.max(0.4, boreR - 0.1), thickness * 1.12, axis, darkMat, 20);
    grp.add(boreRing);
    return grp;
  }

  function buildHelicalWormGroup(outerD, length, boreD, turns, axis, colorHex) {
    const grp = new THREE.Group();
    const rRoot = outerD * 0.34;
    const rTip = outerD * 0.5;
    const metalMat = makeMat(colorHex || "#d97706", { metalness: 0.82, roughness: 0.22 });
    const collarMat = makeMat("#334155", { metalness: 0.7, roughness: 0.3 });

    const core = makeHollowCylinder(rRoot, boreD * 0.5, length, axis, metalMat, 28);
    grp.add(core);

    class HelixCurve extends THREE.Curve {
      getPoint(t) {
        const theta = t * turns * TWO_PI;
        const axial = (t - 0.5) * (length * 0.82);
        const u = Math.cos(theta) * (rRoot + (rTip - rRoot) * 0.55);
        const v = Math.sin(theta) * (rRoot + (rTip - rRoot) * 0.55);
        if (axis === "Y") return new THREE.Vector3(u, axial, v);
        if (axis === "X") return new THREE.Vector3(axial, u, v);
        return new THREE.Vector3(u, v, axial);
      }
    }
    const threadRadius = Math.max(0.32, (rTip - rRoot) * 0.62);
    const tubeGeo = new THREE.TubeGeometry(new HelixCurve(), Math.max(64, turns * 16), threadRadius, 10, false);
    const threadMesh = new THREE.Mesh(tubeGeo, metalMat);
    addEdges(threadMesh, 0.25);
    grp.add(threadMesh);

    [-0.44 * length, 0.44 * length].forEach((pos) => {
      const col = makeHollowCylinder(rRoot * 1.15, boreD * 0.5, length * 0.1, axis, collarMat, 24);
      if (axis === "Y") col.position.y = pos;
      else if (axis === "X") col.position.x = pos;
      else col.position.z = pos;
      grp.add(col);
    });
    return grp;
  }

  function buildCoiledSpringGroup(outerD, length, turns, axis, colorHex, isTorsion) {
    const grp = new THREE.Group();
    const rCoil = outerD * 0.42;
    const wireR = Math.max(0.42, outerD * 0.085);
    const springMat = makeMat(colorHex || "#cbd5e1", { metalness: 0.85, roughness: 0.2 });

    class SpringCurve extends THREE.Curve {
      getPoint(t) {
        const theta = t * turns * TWO_PI;
        const axial = (t - 0.5) * (length * 0.86);
        const u = Math.cos(theta) * rCoil;
        const v = Math.sin(theta) * rCoil;
        if (axis === "X") return new THREE.Vector3(axial, u, v);
        if (axis === "Y") return new THREE.Vector3(u, axial, v);
        return new THREE.Vector3(u, v, axial);
      }
    }
    const coilGeo = new THREE.TubeGeometry(new SpringCurve(), turns * 20, wireR, 10, false);
    const coilMesh = new THREE.Mesh(coilGeo, springMat);
    grp.add(coilMesh);

    if (isTorsion) {
      const hookGeo = new THREE.CylinderGeometry(wireR, wireR, outerD * 0.55, 8);
      const h1 = new THREE.Mesh(hookGeo, springMat);
      h1.position.set(rCoil, 0, length * 0.42);
      const h2 = new THREE.Mesh(hookGeo, springMat);
      h2.position.set(-rCoil, 0, -length * 0.42);
      grp.add(h1, h2);
    }
    return grp;
  }

  function buildBallBearingGroup(outerD, boreD, width, axis) {
    const grp = new THREE.Group();
    const rOut = outerD * 0.5;
    const rIn = boreD * 0.5;
    const ringSpan = rOut - rIn;
    const rOuterInner = rOut - ringSpan * 0.28;
    const rInnerOuter = rIn + ringSpan * 0.28;
    const rPitch = (rOut + rIn) * 0.5;
    const ballR = Math.max(0.45, Math.min(ringSpan * 0.26, width * 0.34));

    const chromeMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.16 });
    const shieldMat = makeMat("#475569", { metalness: 0.65, roughness: 0.38 });
    const ballMat = makeMat("#f8fafc", { metalness: 0.95, roughness: 0.1 });

    grp.add(makeHollowCylinder(rOut, rOuterInner, width, axis, chromeMat, 32));
    grp.add(makeHollowCylinder(rInnerOuter, rIn, width * 1.04, axis, chromeMat, 28));
    grp.add(makeHollowCylinder(rOuterInner, rInnerOuter, width * 0.68, axis, shieldMat, 28));

    const numBalls = 8;
    const ballGeo = new THREE.SphereGeometry(ballR, 12, 12);
    for (let i = 0; i < numBalls; i++) {
      const a = (i * TWO_PI) / numBalls;
      const b1 = new THREE.Mesh(ballGeo, ballMat);
      const b2 = new THREE.Mesh(ballGeo, ballMat);
      const off = width * 0.36;
      if (axis === "Z") {
        b1.position.set(Math.cos(a) * rPitch, Math.sin(a) * rPitch, off);
        b2.position.set(Math.cos(a) * rPitch, Math.sin(a) * rPitch, -off);
      } else if (axis === "Y") {
        b1.position.set(Math.cos(a) * rPitch, off, Math.sin(a) * rPitch);
        b2.position.set(Math.cos(a) * rPitch, -off, Math.sin(a) * rPitch);
      } else {
        b1.position.set(off, Math.cos(a) * rPitch, Math.sin(a) * rPitch);
        b2.position.set(-off, Math.cos(a) * rPitch, Math.sin(a) * rPitch);
      }
      grp.add(b1, b2);
    }
    return grp;
  }

  function buildSwerveTireGroup() {
    const grp = new THREE.Group();
    const rubberMat = makeMat("#1e293b", { metalness: 0.12, roughness: 0.88 });
    const treadMat = makeMat("#0f172a", { metalness: 0.15, roughness: 0.92 });
    const rimRingMat = makeMat("#38bdf8", { metalness: 0.7, roughness: 0.3 });

    grp.add(makeHollowCylinder(19.4, 15.8, 9.6, "Y", rubberMat, 40));

    [-4.85, 4.85].forEach((yPos) => {
      const ring = makeHollowCylinder(17.4, 16.2, 0.4, "Y", rimRingMat, 36);
      ring.position.y = yPos;
      grp.add(ring);
    });

    const lugGeo = new THREE.BoxGeometry(1.6, 4.4, 0.9);
    for (let i = 0; i < 24; i++) {
      const a = (i * TWO_PI) / 24;
      const r = 19.65;
      const lugL = new THREE.Mesh(lugGeo, treadMat);
      lugL.position.set(Math.cos(a) * r, 2.2, Math.sin(a) * r);
      lugL.rotation.y = -a + Math.PI / 2;
      lugL.rotation.z = 0.38;

      const lugR = new THREE.Mesh(lugGeo, treadMat);
      lugR.position.set(Math.cos(a) * r, -2.2, Math.sin(a) * r);
      lugR.rotation.y = -a + Math.PI / 2;
      lugR.rotation.z = -0.38;
      grp.add(lugL, lugR);
    }
    return grp;
  }

  function buildWheelHubGroup() {
    const grp = new THREE.Group();
    const aluMat = makeMat("#94a3b8", { metalness: 0.82, roughness: 0.25 });
    const hubAnodized = makeMat("#38bdf8", { metalness: 0.75, roughness: 0.28 });

    grp.add(makeHollowCylinder(15.8, 13.5, 9.0, "Y", aluMat, 36));
    grp.add(makeHollowCylinder(6.2, 2.5, 9.4, "Y", hubAnodized, 28));

    const spokeGeo = new THREE.BoxGeometry(2.2, 6.2, 8.2);
    const boltGeo = new THREE.CylinderGeometry(0.8, 0.8, 9.8, 12);
    const boltMat = makeMat("#f8fafc", { metalness: 0.9, roughness: 0.15 });
    for (let i = 0; i < 6; i++) {
      const a = (i * TWO_PI) / 6;
      const rMid = 9.8;
      const spoke = new THREE.Mesh(spokeGeo, aluMat);
      spoke.position.set(Math.cos(a) * rMid, 0, Math.sin(a) * rMid);
      spoke.rotation.y = -a;
      addEdges(spoke, 0.35);
      grp.add(spoke);

      const bolt = new THREE.Mesh(boltGeo, boltMat);
      bolt.position.set(Math.cos(a + Math.PI / 6) * 4.5, 0, Math.sin(a + Math.PI / 6) * 4.5);
      grp.add(bolt);
    }
    return grp;
  }

  function buildSwerveForkGroup() {
    const grp = new THREE.Group();
    const forkMat = makeMat("#0284c7", { metalness: 0.72, roughness: 0.28 });
    const bossMat = makeMat("#38bdf8", { metalness: 0.78, roughness: 0.22 });

    const crown = new THREE.Mesh(new THREE.BoxGeometry(18.0, 23.0, 4.0), forkMat);
    crown.position.set(0, 0, 18.0);
    addEdges(crown, 0.45);
    grp.add(crown);

    const kpCollar = makeHollowCylinder(7.2, 2.8, 4.5, "Z", bossMat, 24);
    kpCollar.position.set(0, 0, 20.5);
    grp.add(kpCollar);

    [-9.5, 9.5].forEach((yOff) => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(14.0, 3.8, 25.0), forkMat);
      leg.position.set(0, yOff, 4.5);
      addEdges(leg, 0.45);
      grp.add(leg);

      const rib = new THREE.Mesh(new THREE.BoxGeometry(8.0, 2.8, 6.0), bossMat);
      rib.position.set(0, yOff * 0.72, 14.5);
      grp.add(rib);

      const axleBoss = makeHollowCylinder(6.5, 2.5, 4.8, "Y", bossMat, 24);
      axleBoss.position.set(0, yOff, -5.0);
      grp.add(axleBoss);
    });
    return grp;
  }

  function buildTimingBeltGroup() {
    const grp = new THREE.Group();
    const beltMat = makeMat("#1e293b", { metalness: 0.15, roughness: 0.85 });
    const cordMat = makeMat("#475569", { metalness: 0.3, roughness: 0.6 });

    const R_out = 6.2;
    const R_in = 5.0;
    const halfSpan = 11.0;
    const shape = new THREE.Shape();
    shape.absarc(0, halfSpan, R_out, 0, Math.PI, false);
    shape.absarc(0, -halfSpan, R_out, Math.PI, TWO_PI, false);
    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, halfSpan, R_in, 0, Math.PI, false);
    hole.absarc(0, -halfSpan, R_in, Math.PI, TWO_PI, false);
    hole.closePath();
    shape.holes.push(hole);

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 5.0,
      bevelEnabled: false,
      curveSegments: 28,
    });
    extrude.translate(0, 0, -2.5);
    extrude.rotateX(Math.PI / 2);
    const beltMesh = new THREE.Mesh(extrude, beltMat);
    addEdges(beltMesh, 0.35);
    grp.add(beltMesh);

    const toothGeo = new THREE.BoxGeometry(0.9, 4.8, 0.8);
    for (let z = -9.5; z <= 9.5; z += 2.1) {
      const tL = new THREE.Mesh(toothGeo, cordMat);
      tL.position.set(-R_in + 0.3, 0, z);
      const tR = new THREE.Mesh(toothGeo, cordMat);
      tR.position.set(R_in - 0.3, 0, z);
      grp.add(tL, tR);
    }
    return grp;
  }

  function buildInternalRingGearGroup() {
    const grp = new THREE.Group();
    const steelMat = makeMat("#f59e0b", { metalness: 0.8, roughness: 0.25 });
    const flangeMat = makeMat("#d97706", { metalness: 0.75, roughness: 0.3 });

    grp.add(makeHollowCylinder(14.0, 12.2, 12.0, "X", steelMat, 40));
    [-5.6, 5.6].forEach((xOff) => {
      const fl = makeHollowCylinder(15.2, 11.5, 1.2, "X", flangeMat, 36);
      fl.position.x = xOff;
      grp.add(fl);
    });

    const toothGeo = new THREE.BoxGeometry(10.0, 0.8, 1.1);
    for (let i = 0; i < 24; i++) {
      const a = (i * TWO_PI) / 24;
      const r = 11.9;
      const t = new THREE.Mesh(toothGeo, steelMat);
      t.position.set(0, Math.cos(a) * r, Math.sin(a) * r);
      t.rotation.x = a;
      grp.add(t);
    }
    return grp;
  }

  function buildN20MotorGroup() {
    const grp = new THREE.Group();
    const canMat = makeMat("#cbd5e1", { metalness: 0.88, roughness: 0.22 });
    const brassMat = makeMat("#eab308", { metalness: 0.82, roughness: 0.26 });
    const capMat = makeMat("#dc2626", { metalness: 0.25, roughness: 0.5 });
    const shaftMat = makeMat("#f8fafc", { metalness: 0.92, roughness: 0.14 });

    const motorCan = new THREE.Mesh(new THREE.CylinderGeometry(5.8, 5.8, 15.0, 28), canMat);
    motorCan.position.set(0, -5.5, 0);
    motorCan.scale.set(1.0, 1.0, 0.84);
    addEdges(motorCan, 0.35);
    grp.add(motorCan);

    const endCap = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 5.6, 2.5, 24), capMat);
    endCap.position.set(0, -13.5, 0);
    endCap.scale.set(1.0, 1.0, 0.84);
    grp.add(endCap);

    // Copper solder tabs on rear brush cap
    [-3.2, 3.2].forEach((xTab) => {
      const tab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.5, 0.4), brassMat);
      tab.position.set(xTab, -15.5, 0);
      grp.add(tab);
    });

    const gearbox = new THREE.Mesh(new THREE.BoxGeometry(12.0, 9.0, 10.0), brassMat);
    gearbox.position.set(0, 6.5, 0);
    addEdges(gearbox, 0.45);
    grp.add(gearbox);

    const collar = makeHollowCylinder(3.2, 1.5, 2.0, "Y", canMat, 20);
    collar.position.set(0, 11.8, 0);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 10.0, 20), shaftMat);
    shaft.position.set(0, 16.0, 0);
    grp.add(collar, shaft);
    return grp;
  }

  // 27. P55: Streamlined Aerodynamic Quick-Release Shell (轻量化快拆外壳)
  function buildAerodynamicShellGroup(part, baseGeom) {
    const group = new THREE.Group();
    const shellMat = makeMat(part.color || "#93c5fd", {
      metalness: 0.15,
      roughness: 0.18,
      transparent: true,
      opacity: 0.24,
    });
    const trimMat = makeMat("#1e40af", {
      metalness: 0.45,
      roughness: 0.3,
      transparent: true,
      opacity: 0.55,
    });
    const magnetMat = makeMat("#e2e8f0", { metalness: 0.92, roughness: 0.15 });

    const baseMesh = new THREE.Mesh(baseGeom, shellMat);
    addEdges(baseMesh, 0.42);
    group.add(baseMesh);

    const sx = part.size[0];
    const sy = part.size[1];
    const sz = part.size[2];

    // Side cooling louvers (侧鳃散热百叶窗) on left & right flanks
    for (const side of [-1, 1]) {
      for (let i = -3; i <= 3; i++) {
        const louver = new THREE.Mesh(new THREE.BoxGeometry(10.0, 1.4, 8.5), trimMat);
        louver.position.set(i * 12.0, side * (sy / 2 - 0.8), 1.5);
        louver.rotation.z = side * 0.28;
        group.add(louver);
      }
      // Front and rear wheel-arch fender flares (轮拱宽体护翼)
      for (const fx of [-65.0, 65.0]) {
        const arch = makeHollowCylinder(33.0, 29.5, 5.0, "Y", trimMat, 24);
        arch.position.set(fx, side * (sy / 2 - 1.5), -sz / 2 + 4.0);
        group.add(arch);
      }
    }

    // Top window bezel reinforcement around solar panel & wattmeter (顶部天窗加强筋框)
    const topRimL = new THREE.Mesh(new THREE.BoxGeometry(sx * 0.78, 3.0, 1.8), trimMat);
    topRimL.position.set(0, sy * 0.36, sz / 2 - 0.5);
    group.add(topRimL);
    const topRimR = new THREE.Mesh(new THREE.BoxGeometry(sx * 0.78, 3.0, 1.8), trimMat);
    topRimR.position.set(0, -sy * 0.36, sz / 2 - 0.5);
    group.add(topRimR);

    // 4 Corner Φ6×2 Neodymium magnet quick-release mounting bosses (四角钕磁铁快拆柱)
    for (const [mx, my] of [[-78, -58], [-78, 58], [78, -58], [78, 58]]) {
      const boss = makeHollowCylinder(5.0, 3.0, 6.0, "Z", trimMat, 20);
      boss.position.set(mx, my, -sz / 2 + 3.0);
      group.add(boss);
      const mag = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 2.2, 20), magnetMat);
      mag.rotation.x = Math.PI / 2;
      mag.position.set(mx, my, -sz / 2 + 0.8);
      group.add(mag);
    }

    return group;
  }

  // 28. P18: Transparent Acrylic Gearbox Dust Cover (齿轮箱透明防尘上盖)
  function buildAcrylicCoverGroup(part, baseGeom) {
    const group = new THREE.Group();
    const acrylicMat = makeMat(part.color || "#bae6fd", {
      metalness: 0.1,
      roughness: 0.15,
      transparent: true,
      opacity: 0.42,
    });
    const sealMat = makeMat("#0f172a", { metalness: 0.15, roughness: 0.8 });
    const brassPlugMat = makeMat("#f59e0b", { metalness: 0.88, roughness: 0.22 });

    const baseMesh = new THREE.Mesh(baseGeom, acrylicMat);
    addEdges(baseMesh, 0.5);
    group.add(baseMesh);

    const sx = part.size[0];
    const sy = part.size[1];
    const sz = part.size[2];

    const gasketL = new THREE.Mesh(new THREE.BoxGeometry(sx - 2, 1.2, 0.8), sealMat);
    gasketL.position.set(0, sy / 2 - 1.2, -sz / 2);
    group.add(gasketL);
    const gasketR = new THREE.Mesh(new THREE.BoxGeometry(sx - 2, 1.2, 0.8), sealMat);
    gasketR.position.set(0, -sy / 2 + 1.2, -sz / 2);
    group.add(gasketR);

    const oilPlug = new THREE.Mesh(new THREE.CylinderGeometry(2.6, 2.6, 1.4, 6), brassPlugMat);
    oilPlug.rotation.x = Math.PI / 2;
    oilPlug.position.set(0, 0, sz / 2 + 0.4);
    group.add(oilPlug);

    for (const cx of [-sx * 0.4, 0, sx * 0.4]) {
      for (const cy of [-sy * 0.38, sy * 0.38]) {
        group.add(makeSocketScrew("Z", cx, cy, sz / 2));
      }
    }
    return group;
  }

  // 29. P47 & P48: 3-Mode Steering Selector Block & Detent Pin (全向运动模式三挡切换器 & 锁销)
  function buildModeSelectorGroup(part, baseGeom, isPin) {
    const group = new THREE.Group();
    const mat = makeMat(part.color || (isPin ? "#ef4444" : "#f43f5e"), {
      metalness: 0.68,
      roughness: 0.28,
    });
    const baseMesh = new THREE.Mesh(baseGeom, mat);
    addEdges(baseMesh, 0.45);
    group.add(baseMesh);

    if (isPin) {
      const ringMat = makeMat("#e2e8f0", { metalness: 0.9, roughness: 0.2 });
      const pullRing = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.7, 10, 20), ringMat);
      pullRing.position.set(0, 0, part.size[2] / 2 + 2.4);
      group.add(pullRing);
    } else {
      const bushMat = makeMat("#fbbf24", { metalness: 0.85, roughness: 0.22 });
      for (const dx of [-5.0, 0.0, 5.0]) {
        const bush = makeHollowCylinder(2.4, 1.5, part.size[2] + 0.4, "Z", bushMat, 16);
        bush.position.set(dx, 0, 0);
        group.add(bush);
      }
      group.add(makeSocketScrew("Z", -part.size[0] * 0.38, -part.size[1] * 0.32, part.size[2] / 2));
      group.add(makeSocketScrew("Z", part.size[0] * 0.38, -part.size[1] * 0.32, part.size[2] / 2));
    }
    return group;
  }

  // Placement & Rotation Overrides (fixes all static/dynamic collisions & bevel gear orientations)
  const PLACEMENT_OVERRIDES = {
    "16齿正交从动锥齿轮(前桥左出)": { rotCad: [Math.PI / 2, 0, 0] },
    "16齿正交从动锥齿轮(前桥右出)": { rotCad: [-Math.PI / 2, 0, 0] },
    "12齿行星差速小齿轮(#1)": { pos: [-6.0, 9.0, 28.0] },
    "12齿行星差速小齿轮(#2)": { pos: [-6.0, -4.5, 35.79] },
    "12齿行星差速小齿轮(#3)": { pos: [-6.0, -4.5, 20.21] },
    "四槽马耳他间歇分度槽轮": { pos: [-19.86, 14.14, 41.5] },
    "槽轮分度立式精密转轴": { pos: [-19.86, 14.14, 42.0] },
    "前桥横向消隙转向齿条": { pos: [78.5, 0.0, 53.5] },
    "后桥横向消隙转向齿条": { pos: [-78.5, 0.0, 53.5] },
    "前桥平行四边形转向横拉杆": { pos: [86.0, 0.0, 59.0] },
    "后桥平行四边形转向横拉杆": { pos: [-86.0, 0.0, 59.0] },
  };

  function buildPartDetailObject(part, pl, baseGeom) {
    const pid = part.id;
    let obj = null;

    if (pid === "G06") {
      obj = buildBevelGearGroup(0.5, 16, 5.0, 5.0, "X", part.color);
    } else if (pid === "G10") {
      obj = buildBevelGearGroup(0.5, 16, 5.0, 5.0, "Z", part.color);
    } else if (pid === "G07") {
      obj = buildBevelGearGroup(0.5, 20, 4.0, 5.0, "Y", part.color);
    } else if (pid === "G03") {
      obj = buildHelicalWormGroup(11.0, 18.0, 5.0, 7, "Y", part.color);
    } else if (pid === "P67") {
      obj = buildHelicalWormGroup(4.0, 28.0, 0.0, 12, "Y", part.color);
    } else if (pid === "SP1") {
      obj = buildCoiledSpringGroup(10.0, 18.0, 7, "X", part.color, false);
    } else if (pid === "SP2") {
      obj = buildCoiledSpringGroup(15.0, 5.0, 3, "Y", part.color, false);
    } else if (pid === "SP3") {
      obj = buildCoiledSpringGroup(14.0, 3.0, 3, "Z", part.color, true);
    } else if (pid === "B01") {
      obj = buildBallBearingGroup(16.0, 5.0, 5.0, "Y");
    } else if (pid === "B02") {
      obj = buildBallBearingGroup(8.0, 4.0, 3.0, "Z");
    } else if (pid === "B03") {
      obj = buildBallBearingGroup(15.0, 10.0, 4.0, "Z");
    } else if (pid === "B04") {
      obj = buildBallBearingGroup(8.0, 5.0, 3.0, "Z");
    } else if (pid === "B05") {
      obj = buildBallBearingGroup(12.0, 8.0, 4.0, "Z");
    } else if (pid === "W01") {
      obj = buildSwerveTireGroup();
    } else if (pid === "P32") {
      obj = buildWheelHubGroup();
    } else if (pid === "P29") {
      obj = buildSwerveForkGroup();
    } else if (pid === "P24") {
      obj = buildTimingBeltGroup();
    } else if (pid === "G13") {
      obj = buildInternalRingGearGroup();
    } else if (pid === "M01") {
      obj = buildN20MotorGroup();
    } else if (pid === "E01") {
      obj = buildSolarPanelGroup(part);
    } else if (pid === "P50") {
      obj = buildSolarFrameGroup(part, baseGeom);
    } else if (pid === "P51") {
      obj = buildSolarPillarGroup(part);
    } else if (pid === "E02") {
      obj = buildSupercapModuleGroup();
    } else if (pid === "P52") {
      obj = buildSupercapHolderGroup(part, baseGeom);
    } else if (pid === "E03") {
      obj = buildControlPcbGroup(part);
    } else if (pid === "E04") {
      obj = buildWattmeterGroup();
    } else if (pid === "P53") {
      obj = buildWattmeterBracketGroup(part, baseGeom);
    } else if (pid === "E05") {
      obj = buildRedLedGroup();
    } else if (pid === "E06") {
      obj = buildRfidModuleGroup(part);
    } else if (pid === "P54") {
      obj = buildRfidBoxGroup(part, baseGeom);
    } else if (pid === "P07") {
      obj = buildBumperGroup(part, baseGeom, true);
    } else if (pid === "P08") {
      obj = buildBumperGroup(part, baseGeom, false);
    } else if (pid === "F01") {
      obj = buildBrassStandoffGroup();
    } else if (pid === "P16") {
      obj = buildUniversalJointGroup();
    } else if (pid === "P49") {
      obj = buildHeimJointGroup();
    } else if (pid === "P68") {
      obj = buildMicrometerKnobGroup();
    } else if (pid === "P55") {
      obj = buildAerodynamicShellGroup(part, baseGeom);
    } else if (pid === "P18") {
      obj = buildAcrylicCoverGroup(part, baseGeom);
    } else if (pid === "P47") {
      obj = buildModeSelectorGroup(part, baseGeom, false);
    } else if (pid === "P48") {
      obj = buildModeSelectorGroup(part, baseGeom, true);
    } else {
      const isShell = pid === "P55";
      const isAcrylic = pid === "P18";
      const isGearOrCam = pid.startsWith("G") || pid.startsWith("C");
      const mat = makeMat(pl.color || part.color || "#38bdf8", {
        metalness: isShell || isAcrylic ? 0.1 : isGearOrCam ? 0.78 : part.category.includes("电子") ? 0.25 : 0.68,
        roughness: isShell || isAcrylic ? 0.2 : isGearOrCam ? 0.24 : 0.32,
        transparent: isShell || isAcrylic,
        opacity: isShell ? 0.24 : isAcrylic ? 0.42 : 1.0,
      });
      const mainMesh = new THREE.Mesh(baseGeom, mat);
      addEdges(mainMesh, 0.45);

      if (pid === "P46" || pid === "G16") {
        const grp = new THREE.Group();
        grp.add(mainMesh);
        const collar = makeHollowCylinder(7.2, 5.0, pid === "P46" ? 7.5 : 3.6, "Z", mat, 28);
        grp.add(collar);
        obj = grp;
      } else if (pid === "P26" || pid === "P35" || pid === "P19" || pid === "P20" || pid === "P12") {
        // Add 4 corner M3 socket cap screws on bearing blocks, differential housings, and motor clamp cap
        const grp = new THREE.Group();
        grp.add(mainMesh);
        const sx = part.size[0] * 0.36;
        const sy = part.size[1] * 0.36;
        const sz = part.size[2] * 0.5;
        for (const cx of [-sx, sx]) {
          for (const cy of [-sy, sy]) {
            grp.add(makeSocketScrew("Z", cx, cy, sz));
          }
        }
        obj = grp;
      } else {
        obj = mainMesh;
      }
    }

    const materials = [];
    obj.traverse((child) => {
      if (child.isMesh) {
        child.userData = { instance: pl, part: part };
        if (child.material) {
          child.material = child.material.clone();
          child.material.userData = {
            baseOpacity: child.material.opacity !== undefined ? child.material.opacity : 1.0,
            baseTransparent: Boolean(child.material.transparent),
            baseEmissiveHex: child.material.emissive ? child.material.emissive.getHex() : 0x000000,
            baseEmissiveIntensity: child.material.emissiveIntensity || 0.0,
          };
          materials.push(child.material);
        }
      }
    });

    return { object3D: obj, materials: materials };
  }

  window.CADDetailBuilder = {
    PLACEMENT_OVERRIDES: PLACEMENT_OVERRIDES,
    buildPartDetailObject: buildPartDetailObject,
  };
})();
