import * as THREE from 'three';

export class AboutArchitectureScene {
  public group: THREE.Group;
  private framesGroup: THREE.Group;
  private glassPanelsGroup: THREE.Group;
  private nodesGroup: THREE.Group;
  private linesMesh: THREE.LineSegments;
  private floatingParticles: THREE.Points;
  private frameBoxes: THREE.Mesh[] = [];
  private glassPlates: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'AboutArchitectureScene';
    this.group.position.set(0, 0, -28); // Positioned deeper in world space

    // 1. Geometric Structural Frames (Architectural beams & portals)
    this.framesGroup = new THREE.Group();
    this.group.add(this.framesGroup);

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: false,
    });

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });

    // Create a grand architectural corridor with portals and floating pavilions
    const corridorDepths = [10, 5, 0, -5, -10, -15];
    corridorDepths.forEach((zPos, idx) => {
      // Outer portal frame
      const width = 8 + (idx % 2) * 2;
      const height = 6 + (idx % 3) * 1.5;
      const boxGeo = new THREE.BoxGeometry(width, height, 0.4);
      const edges = new THREE.EdgesGeometry(boxGeo);
      const line = new THREE.LineSegments(edges, edgeMat);
      line.position.set(0, 0, zPos);
      this.framesGroup.add(line);

      // Structural side column beams
      const colGeo = new THREE.BoxGeometry(0.5, height + 3, 0.5);
      const colLeft = new THREE.Mesh(colGeo, frameMat);
      colLeft.position.set(-width / 2, 0, zPos);
      const colRight = new THREE.Mesh(colGeo, frameMat);
      colRight.position.set(width / 2, 0, zPos);

      this.framesGroup.add(colLeft);
      this.framesGroup.add(colRight);
      this.frameBoxes.push(colLeft, colRight);

      // Architectural roof transverse girder
      const girderGeo = new THREE.BoxGeometry(width + 2, 0.4, 0.4);
      const girder = new THREE.Mesh(girderGeo, frameMat);
      girder.position.set(0, height / 2 + 0.2, zPos);
      this.framesGroup.add(girder);
      this.frameBoxes.push(girder);
    });

    // 2. Floating High-Clarity Glass Architectural Panels
    this.glassPanelsGroup = new THREE.Group();
    this.group.add(this.glassPanelsGroup);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      emissive: 0x000000,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.96,
      thickness: 0.15,
      ior: 1.45,
      transparent: true,
      opacity: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      side: THREE.DoubleSide,
    });

    // Multiple angled glass planes suspended in space
    const panelConfigs = [
      { w: 5, h: 3.5, x: -3.5, y: 1.5, z: 6, rx: 0.1, ry: 0.25, rz: 0.05 },
      { w: 4.5, h: 4, x: 3.8, y: -1, z: 2, rx: -0.15, ry: -0.3, rz: -0.05 },
      { w: 6, h: 3, x: -2.8, y: -2, z: -4, rx: 0.2, ry: 0.15, rz: 0.1 },
      { w: 5, h: 4.5, x: 3.2, y: 2, z: -8, rx: -0.1, ry: -0.2, rz: 0 },
      { w: 4, h: 3, x: 0, y: 3.2, z: -1, rx: 0.35, ry: 0, rz: 0 },
      { w: 4.5, h: 3, x: 0, y: -3.5, z: -7, rx: -0.3, ry: 0, rz: 0 },
    ];

    panelConfigs.forEach((cfg) => {
      const pGeo = new THREE.PlaneGeometry(cfg.w, cfg.h);
      const mesh = new THREE.Mesh(pGeo, glassMat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.rotation.set(cfg.rx, cfg.ry, cfg.rz);

      // Crisply defined perimeter outline so the glass boundaries are visible without obscuring
      const pEdges = new THREE.EdgesGeometry(pGeo);
      const edgeLine = new THREE.LineSegments(
        pEdges,
        new THREE.LineBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.65 })
      );
      mesh.add(edgeLine);

      this.glassPanelsGroup.add(mesh);
      this.glassPlates.push(mesh);
    });

    // 3. Glowing Junction Nodes (Interconnecting spheres at frame intersections)
    this.nodesGroup = new THREE.Group();
    this.group.add(this.nodesGroup);

    const nodeGeo = new THREE.OctahedronGeometry(0.18, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });

    for (let i = 0; i < 24; i++) {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 22
      );
      this.nodesGroup.add(nodeMesh);
    }

    // 4. Thin glowing structural lines connecting coordinates
    const linePoints: number[] = [];
    for (let i = 0; i < 36; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 7;
      const z1 = (Math.random() - 0.5) * 24;

      const x2 = x1 + (Math.random() - 0.5) * 5;
      const y2 = y1 + (Math.random() - 0.5) * 4;
      const z2 = z1 - 2 - Math.random() * 6;

      linePoints.push(x1, y1, z1, x2, y2, z2);
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    this.linesMesh = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.4,
      })
    );
    this.group.add(this.linesMesh);

    // 5. Ambient Architectural Particle Dust
    const pCount = 350;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 26;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    this.floatingParticles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.05,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.5,
      })
    );
    this.group.add(this.floatingParticles);
  }

  public update(
    time: number,
    progress: number, // active between ~0.14 -> 0.38
    mouse: THREE.Vector2
  ) {
    // Only render when near About section
    const isNear = progress > 0.10 && progress < 0.44;
    this.group.visible = isNear;
    if (!isNear) return;

    // Relative progress in About section (0 to 1)
    const localT = THREE.MathUtils.clamp((progress - 0.14) / 0.20, 0, 1);

    // Assembly / Disassembly effect:
    // When entering (localT ~ 0.0 -> 0.3), structures assemble inwards
    // When exiting (localT ~ 0.7 -> 1.0), structures part ways as camera flies THROUGH!
    let assemblyFactor = 1.0;
    if (localT < 0.3) {
      assemblyFactor = localT / 0.3; // 0 to 1
    } else if (localT > 0.7) {
      // Disassembly as camera flies through
      const exitT = (localT - 0.7) / 0.3;
      assemblyFactor = 1.0 + exitT * 1.5;
    }

    // Expand frames slightly on fly-through
    this.framesGroup.scale.set(
      1 + (assemblyFactor - 1) * 0.5,
      1 + (assemblyFactor - 1) * 0.5,
      1
    );

    // Gentle kinetic breathing of glass panels
    this.glassPlates.forEach((plate, idx) => {
      plate.position.y += Math.sin(time * 0.8 + idx) * 0.002;
      plate.rotation.z += Math.cos(time * 0.5 + idx) * 0.001;
    });

    // Rotate nodes slightly
    this.nodesGroup.children.forEach((n, idx) => {
      n.rotation.x = time * 0.5 + idx;
      n.rotation.y = time * 0.7 + idx;
    });

    // Mouse parallax reaction on the architectural group
    this.group.rotation.y = mouse.x * 0.06;
    this.group.rotation.x = -mouse.y * 0.05;
  }
}
