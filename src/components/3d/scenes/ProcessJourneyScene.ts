import * as THREE from 'three';

export class ProcessJourneyScene {
  public group: THREE.Group;
  public pathwayCurve: THREE.CatmullRomCurve3;
  private runwayMesh: THREE.Mesh;
  public nodePositions: THREE.Vector3[] = [];
  public nodeObjects: THREE.Group[] = [];
  private portalRings: THREE.Mesh[] = [];
  private lidarRings: THREE.Mesh[] = [];
  private convergeParticles: THREE.Points;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'ProcessJourneyScene';
    this.group.position.set(0, 0, -135); // Positioned along continuous Z axis

    // 1. Grand 3D Pathway (Spline Curve running through space)
    const curvePoints = [
      new THREE.Vector3(-4, 2, 10),    // Pre-node 1
      new THREE.Vector3(-3, 0, 4),     // Node 1: DISCOVER
      new THREE.Vector3(2.5, 1.5, -4),  // Node 2: DESIGN
      new THREE.Vector3(-2, -1.0, -12), // Node 3: DEVELOP
      new THREE.Vector3(0, 0, -22),     // Node 4: LAUNCH PORTAL
      new THREE.Vector3(0, 0, -32),     // Portal exit into hyper-space
    ];

    this.pathwayCurve = new THREE.CatmullRomCurve3(curvePoints);

    // Create glowing runway tube along the curve
    const tubeGeo = new THREE.TubeGeometry(this.pathwayCurve, 120, 0.08, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.75,
    });
    this.runwayMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.group.add(this.runwayMesh);

    // Parallel glowing guardrail lines
    const railPoints1: THREE.Vector3[] = [];
    const railPoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= 60; i++) {
      const pt = this.pathwayCurve.getPoint(i / 60);
      railPoints1.push(new THREE.Vector3(pt.x + 0.8, pt.y - 0.2, pt.z));
      railPoints2.push(new THREE.Vector3(pt.x - 0.8, pt.y - 0.2, pt.z));
    }
    const railGeo1 = new THREE.BufferGeometry().setFromPoints(railPoints1);
    const railGeo2 = new THREE.BufferGeometry().setFromPoints(railPoints2);
    const railMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.5 });
    this.group.add(new THREE.Line(railGeo1, railMat));
    this.group.add(new THREE.Line(railGeo2, railMat));

    // Store landmark coordinates along the curve
    this.nodePositions = [
      this.pathwayCurve.getPoint(0.20), // 01 DISCOVER
      this.pathwayCurve.getPoint(0.42), // 02 DESIGN
      this.pathwayCurve.getPoint(0.66), // 03 DEVELOP
      this.pathwayCurve.getPoint(0.88), // 04 LAUNCH
    ];

    // NODE 01: DISCOVER — Scanning sphere with oscillating lidar rings
    const node01 = this.createDiscoverNode();
    node01.position.copy(this.nodePositions[0]);
    this.nodeObjects.push(node01);
    this.group.add(node01);

    // NODE 02: DESIGN — Morphing wireframe polyhedral structure
    const node02 = this.createDesignNode();
    node02.position.copy(this.nodePositions[1]);
    this.nodeObjects.push(node02);
    this.group.add(node02);

    // NODE 03: DEVELOP — Layered digital architecture voxel processor
    const node03 = this.createDevelopNode();
    node03.position.copy(this.nodePositions[2]);
    this.nodeObjects.push(node03);
    this.group.add(node03);

    // NODE 04: LAUNCH — Monumental expanding geometric portal
    const node04 = this.createLaunchPortalNode();
    node04.position.copy(this.nodePositions[3]);
    this.nodeObjects.push(node04);
    this.group.add(node04);

    // Converging Particles for Transition 5 (Portal -> TechDevs Core)
    const pCount = 800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pPos[i * 3 + 2] = -22 + (Math.random() - 0.5) * 15;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    this.convergeParticles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.08,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
      })
    );
    this.group.add(this.convergeParticles);
  }

  // NODE 01: DISCOVER
  private createDiscoverNode(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Node_Discover';

    // Core central sphere
    const sph = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        metalness: 0.8,
        roughness: 0.2,
      })
    );
    g.add(sph);

    // Lidar scanning sweep rings
    for (let i = 0; i < 3; i++) {
      const r = new THREE.Mesh(
        new THREE.RingGeometry(1.3 + i * 0.4, 1.35 + i * 0.4, 48),
        new THREE.MeshBasicMaterial({
          color: 0x38bdf8,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7,
        })
      );
      r.rotation.x = Math.PI / 2 + i * 0.3;
      this.lidarRings.push(r);
      g.add(r);
    }

    return g;
  }

  // NODE 02: DESIGN
  private createDesignNode(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Node_Design';

    // Outer crystalline wireframe
    const outerGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const outerWire = new THREE.Mesh(
      outerGeo,
      new THREE.MeshBasicMaterial({ color: 0x818cf8, wireframe: true })
    );
    g.add(outerWire);

    // Inner clear glass crystal
    const innerCrystal = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.MeshPhysicalMaterial({
        color: 0xc084fc,
        emissive: 0x6b21a8,
        emissiveIntensity: 0.25,
        metalness: 0.05,
        roughness: 0.02,
        transmission: 0.94,
        transparent: true,
        opacity: 0.35,
        clearcoat: 1.0,
      })
    );
    g.add(innerCrystal);

    return g;
  }

  // NODE 03: DEVELOP
  private createDevelopNode(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Node_Develop';

    // Tiered computational voxel architecture
    const mat = new THREE.MeshStandardMaterial({
      color: 0x059669,
      metalness: 0.85,
      roughness: 0.15,
    });

    for (let level = 0; level < 4; level++) {
      const size = 1.4 - level * 0.3;
      const box = new THREE.Mesh(new THREE.BoxGeometry(size, 0.25, size), mat);
      box.position.y = (level - 1.5) * 0.45;
      g.add(box);

      // Edge glow lines
      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(box.geometry),
        new THREE.LineBasicMaterial({ color: 0x34d399 })
      );
      edge.position.y = box.position.y;
      g.add(edge);
    }

    return g;
  }

  // NODE 04: LAUNCH PORTAL
  private createLaunchPortalNode(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Node_Launch_Portal';

    // Concentric nesting portal rings
    const ringRadii = [1.8, 2.4, 3.1];
    ringRadii.forEach((r, idx) => {
      const torusGeo = new THREE.TorusGeometry(r, 0.08, 16, 64);
      const torusMat = new THREE.MeshStandardMaterial({
        color: idx % 2 === 0 ? 0x06b6d4 : 0xec4899,
        metalness: 0.9,
        roughness: 0.1,
      });
      const ring = new THREE.Mesh(torusGeo, torusMat);
      this.portalRings.push(ring);
      g.add(ring);
    });

    // Central portal event horizon
    const horizon = new THREE.Mesh(
      new THREE.CircleGeometry(1.7, 32),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      })
    );
    g.add(horizon);

    return g;
  }

  public update(
    time: number,
    progress: number, // active between ~0.66 -> 0.90
    activeStageIndex: number
  ) {
    const isNear = progress > 0.62 && progress < 0.94;
    this.group.visible = isNear;
    if (!isNear) return;

    // Transition 5: Portal expansion and camera warp into Contact (~0.84 -> 0.92)
    const portalT = THREE.MathUtils.clamp((progress - 0.83) / 0.08, 0, 1);

    // Node 01 Lidar sweep
    this.lidarRings.forEach((r, idx) => {
      r.rotation.z += 0.02 * (idx + 1);
    });

    // Node 02 Crystal rotation
    this.nodeObjects[1].rotation.x = time * 0.4;
    this.nodeObjects[1].rotation.y = time * 0.6;

    // Node 03 Voxel rotation
    this.nodeObjects[2].rotation.y = time * 0.5;

    // Node 04 Portal expansion & spin
    this.portalRings.forEach((ring, idx) => {
      ring.rotation.z += (idx % 2 === 0 ? 0.03 : -0.04) * (1 + portalT * 6);
      if (portalT > 0) {
        // Expand dramatically as camera approaches
        ring.scale.setScalar(1 + portalT * 2.8);
      } else {
        ring.scale.setScalar(1.0);
      }
    });

    // Active node highlight: Pulse the current stage node
    this.nodeObjects.forEach((node, idx) => {
      if (idx === activeStageIndex) {
        node.scale.lerp(new THREE.Vector3(1.25, 1.25, 1.25), 0.08);
      } else {
        node.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.08);
      }
    });

    // Converging particles activation during portal warp
    const cpMat = this.convergeParticles.material as THREE.PointsMaterial;
    if (portalT > 0) {
      cpMat.opacity = portalT * 0.9;
    } else {
      cpMat.opacity = 0.0;
    }
  }
}
