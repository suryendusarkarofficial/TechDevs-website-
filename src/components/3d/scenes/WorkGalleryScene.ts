import * as THREE from 'three';

export class WorkGalleryScene {
  public group: THREE.Group;
  public screens: THREE.Group[] = [];
  private connectingLineSystem: THREE.LineSegments;
  private screenInitialTransforms: { pos: THREE.Vector3; rot: THREE.Euler }[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'WorkGalleryScene';
    this.group.position.set(0, 0, -95); // Deep in 3D world space

    // 3 Major Floating Website Viewport Screens (Project 01, Project 02, Project 03)
    const projectConfigs = [
      {
        tag: 'PROJECT 01',
        status: 'COMING SOON',
        color: 0x818cf8,
        x: -2.8,
        y: 0.5,
        z: 4,
        rotY: 0.35,
        rotX: -0.05,
      },
      {
        tag: 'PROJECT 02',
        status: 'COMING SOON',
        color: 0x38bdf8,
        x: 3.2,
        y: -0.8,
        z: -2,
        rotY: -0.4,
        rotX: 0.08,
      },
      {
        tag: 'PROJECT 03',
        status: 'COMING SOON',
        color: 0x34d399,
        x: -0.5,
        y: 2.2,
        z: -9,
        rotY: 0.15,
        rotX: 0.18,
      },
    ];

    projectConfigs.forEach((cfg) => {
      const screenGroup = this.createProjectScreen(cfg.tag, cfg.status, cfg.color);
      screenGroup.position.set(cfg.x, cfg.y, cfg.z);
      screenGroup.rotation.set(cfg.rotX, cfg.rotY, 0);

      this.screenInitialTransforms.push({
        pos: new THREE.Vector3(cfg.x, cfg.y, cfg.z),
        rot: new THREE.Euler(cfg.rotX, cfg.rotY, 0),
      });

      this.screens.push(screenGroup);
      this.group.add(screenGroup);
    });

    // Connecting geometric lines that form the pathway into Process during transition
    const pathwayPoints: number[] = [];
    const pCount = 50;
    for (let i = 0; i < pCount; i++) {
      const t = i / pCount;
      const x = Math.sin(t * Math.PI * 3) * 3.5;
      const y = Math.cos(t * Math.PI * 2) * 1.5;
      const z = 8 - t * 28;

      pathwayPoints.push(x, y, z);
      if (i > 0 && i < pCount - 1) {
        pathwayPoints.push(x, y, z);
      }
    }

    const pathwayGeo = new THREE.BufferGeometry();
    pathwayGeo.setAttribute('position', new THREE.Float32BufferAttribute(pathwayPoints, 3));
    this.connectingLineSystem = new THREE.LineSegments(
      pathwayGeo,
      new THREE.LineBasicMaterial({
        color: 0x06b6d4,
        transparent: true,
        opacity: 0.0, // hidden initially, revealed in transition
      })
    );
    this.group.add(this.connectingLineSystem);
  }

  private createProjectScreen(tag: string, status: string, accentColor: number): THREE.Group {
    const screen = new THREE.Group();

    // 1. Sleek Glass Bezel Frame
    const frameW = 4.2;
    const frameH = 2.6;
    const frameGeo = new THREE.BoxGeometry(frameW, frameH, 0.08);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      metalness: 0.9,
      roughness: 0.1,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    screen.add(frameMesh);

    // Glowing rim border
    const edgeGeo = new THREE.EdgesGeometry(frameGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.75,
    });
    const edgeMesh = new THREE.LineSegments(edgeGeo, edgeMat);
    screen.add(edgeMesh);

    // 2. Holographic Screen Surface with clear glass plate & UI wireframe elements
    const glassGeo = new THREE.PlaneGeometry(frameW - 0.2, frameH - 0.2);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: accentColor,
      emissiveIntensity: 0.06,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.92,
      ior: 1.45,
      transparent: true,
      opacity: 0.28,
      clearcoat: 1.0,
    });
    const glassPlane = new THREE.Mesh(glassGeo, glassMat);
    glassPlane.position.z = 0.05;
    screen.add(glassPlane);

    // 3. UI Browser Top Bar
    const topBarGeo = new THREE.PlaneGeometry(frameW - 0.3, 0.25);
    const topBarMat = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      side: THREE.DoubleSide,
    });
    const topBar = new THREE.Mesh(topBarGeo, topBarMat);
    topBar.position.set(0, frameH / 2 - 0.22, 0.06);
    screen.add(topBar);

    // Three browser control dots
    [-0.3, 0, 0.3].forEach((offset, i) => {
      const dotGeo = new THREE.CircleGeometry(0.04, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0xef4444 : i === 1 ? 0xf59e0b : 0x10b981,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(-frameW / 2 + 0.35 + offset, frameH / 2 - 0.22, 0.07);
      screen.add(dot);
    });

    // 4. Wireframe Layout Mockup Grid inside screen
    const layoutLines: number[] = [
      // Hero headline placeholder bar
      -1.4, 0.6, 0.06, 0.8, 0.6, 0.06,
      // Subtext bars
      -1.4, 0.35, 0.06, 0.2, 0.35, 0.06,
      -1.4, 0.18, 0.06, -0.2, 0.18, 0.06,
      // CTA button block
      -1.4, -0.2, 0.06, -0.6, -0.2, 0.06,
      -1.4, -0.4, 0.06, -0.6, -0.4, 0.06,
      // Right feature graphic box
      0.4, 0.4, 0.06, 1.6, 0.4, 0.06,
      1.6, 0.4, 0.06, 1.6, -0.6, 0.06,
      1.6, -0.6, 0.06, 0.4, -0.6, 0.06,
      0.4, -0.6, 0.06, 0.4, 0.4, 0.06,
    ];
    const layoutGeo = new THREE.BufferGeometry();
    layoutGeo.setAttribute('position', new THREE.Float32BufferAttribute(layoutLines, 3));
    const layoutMesh = new THREE.LineSegments(
      layoutGeo,
      new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.65 })
    );
    screen.add(layoutMesh);

    return screen;
  }

  public update(
    time: number,
    progress: number, // active between ~0.50 -> 0.72
    mouse: THREE.Vector2
  ) {
    const isNear = progress > 0.46 && progress < 0.76;
    this.group.visible = isNear;
    if (!isNear) return;

    // Transition 4 (Work -> Process): screens rotate and break into pathway lines
    const transitionT = THREE.MathUtils.clamp((progress - 0.64) / 0.09, 0, 1);

    this.screens.forEach((screen, idx) => {
      const init = this.screenInitialTransforms[idx];

      if (transitionT > 0) {
        // Rotate screens 90 degrees and expand/break outward
        screen.rotation.y = init.rot.y + transitionT * Math.PI * 0.5;
        screen.rotation.x = init.rot.x + transitionT * 0.4;
        screen.scale.setScalar(Math.max(0.01, 1 - transitionT * 0.75));

        // Reveal connecting pathway line system
        const pathMat = this.connectingLineSystem.material as THREE.LineBasicMaterial;
        pathMat.opacity = transitionT * 0.85;
      } else {
        // Normal gallery float & mouse tilt
        screen.rotation.set(
          init.rot.x + mouse.y * 0.1,
          init.rot.y + mouse.x * 0.15,
          Math.sin(time + idx) * 0.03
        );
        screen.position.y = init.pos.y + Math.sin(time * 0.8 + idx) * 0.12;
        screen.scale.setScalar(1.0);
        (this.connectingLineSystem.material as THREE.LineBasicMaterial).opacity = 0.0;
      }
    });
  }
}
