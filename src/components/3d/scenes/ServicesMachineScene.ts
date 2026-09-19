import * as THREE from 'three';
import { ServiceType } from '../../../types';

export class ServicesMachineScene {
  public group: THREE.Group;
  public modules: THREE.Group[] = [];
  private coreSpindle: THREE.Mesh;
  private turbineRings: THREE.Mesh[] = [];
  private serviceIndexMap: Record<ServiceType, number> = {
    design: 0,
    development: 1,
    redesign: 2,
    mobile: 3,
    landing: 4,
    maintenance: 5,
  };
  private activeServiceIndex: number = 0;
  private lightFixture: THREE.PointLight;
  private baseModuleTransforms: { pos: THREE.Vector3; rot: THREE.Euler }[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'ServicesMachineScene';
    this.group.position.set(0, 0, -60); // Positioned further down the world axis

    // Central Core Power Spindle
    const spindleGeo = new THREE.CylinderGeometry(0.7, 0.7, 5, 24);
    const spindleMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
    });
    this.coreSpindle = new THREE.Mesh(spindleGeo, spindleMat);
    this.group.add(this.coreSpindle);

    // Glowing energy conduit down the spindle center
    const energyGeo = new THREE.CylinderGeometry(0.3, 0.3, 5.2, 16);
    const energyMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
    });
    const energyMesh = new THREE.Mesh(energyGeo, energyMat);
    this.coreSpindle.add(energyMesh);

    // Dynamic point light that tracks the active module
    this.lightFixture = new THREE.PointLight(0x38bdf8, 4, 15);
    this.group.add(this.lightFixture);

    // Turbine collar rings
    const ringGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.9,
      roughness: 0.2,
    });
    for (let i = -1; i <= 1; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.y = i * 1.5;
      ring.rotation.x = Math.PI / 2;
      this.turbineRings.push(ring);
      this.group.add(ring);
    }

    // BUILD THE 6 DISTINCT MECHANICAL SERVICE MODULES
    // 01: DESIGN — Faceted polyhedral sensor head with optical prisms
    const mod01 = this.createDesignModule();
    // 02: DEVELOPMENT — Computational logic voxel processor block
    const mod02 = this.createDevModule();
    // 03: REDESIGN — Interlocking kinetic crystalline actuator wedges
    const mod03 = this.createRedesignModule();
    // 04: MOBILE — Sleek chamfered chassis with holographic UI layers
    const mod04 = this.createMobileModule();
    // 05: LANDING PAGES — Convergent optical laser projector with focusing iris
    const mod05 = this.createLandingModule();
    // 06: MAINTENANCE — Gyroscopic shielded containment sphere with orbiters
    const mod06 = this.createMaintenanceModule();

    this.modules = [mod01, mod02, mod03, mod04, mod05, mod06];

    // Arrange modules radially at 60-degree increments around the spindle
    const radius = 3.2;
    this.modules.forEach((mod, idx) => {
      const angle = (idx / 6) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;
      const y = (idx % 2 === 0 ? 0.4 : -0.4);

      mod.position.set(x, y, z);
      mod.rotation.y = angle + Math.PI; // facing outward

      this.baseModuleTransforms.push({
        pos: new THREE.Vector3(x, y, z),
        rot: new THREE.Euler(0, angle + Math.PI, 0),
      });

      this.group.add(mod);
    });
  }

  // 01: DESIGN
  private createDesignModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Design';

    const baseGeo = new THREE.IcosahedronGeometry(0.9, 1);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      metalness: 0.9,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    g.add(baseMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.5, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x4338ca,
      emissiveIntensity: 0.8,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.9,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    g.add(innerMesh);

    return g;
  }

  // 02: DEVELOPMENT
  private createDevModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Development';

    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (Math.random() > 0.4) {
            const b = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), boxMat);
            b.position.set(x * 0.42, y * 0.42, z * 0.42);
            g.add(b);
          }
        }
      }
    }
    return g;
  }

  // 03: REDESIGN
  private createRedesignModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Redesign';

    const wedgeGeo = new THREE.ConeGeometry(0.75, 1.6, 4);
    const wedgeMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false,
    });
    const w1 = new THREE.Mesh(wedgeGeo, wedgeMat);
    w1.rotation.z = Math.PI / 4;
    const w2 = new THREE.Mesh(wedgeGeo, wedgeMat);
    w2.rotation.z = -Math.PI / 4;
    w2.position.y = 0.3;
    g.add(w1, w2);

    return g;
  }

  // 04: MOBILE
  private createMobileModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Mobile';

    // Phone chassis
    const chassisGeo = new THREE.BoxGeometry(1.0, 1.8, 0.12);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.95,
      roughness: 0.1,
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    g.add(chassis);

    // Holographic floating screen offset
    const screenGeo = new THREE.PlaneGeometry(0.88, 1.65);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.z = 0.15;
    g.add(screen);

    return g;
  }

  // 05: LANDING
  private createLandingModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Landing';

    const coneGeo = new THREE.CylinderGeometry(0.2, 0.9, 1.4, 16, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      side: THREE.DoubleSide,
    });
    const cone = new THREE.Mesh(coneGeo, coneMat);
    cone.rotation.x = Math.PI / 2;
    g.add(cone);

    const emitterGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const emitterMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const emitter = new THREE.Mesh(emitterGeo, emitterMat);
    emitter.position.z = -0.6;
    g.add(emitter);

    return g;
  }

  // 06: MAINTENANCE
  private createMaintenanceModule(): THREE.Group {
    const g = new THREE.Group();
    g.name = 'Module_Maintenance';

    const coreGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    g.add(core);

    const ringGeo = new THREE.TorusGeometry(0.9, 0.04, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
    const r1 = new THREE.Mesh(ringGeo, ringMat);
    const r2 = new THREE.Mesh(ringGeo, ringMat);
    r2.rotation.x = Math.PI / 2;
    g.add(r1, r2);

    return g;
  }

  public setActiveService(service: ServiceType) {
    this.activeServiceIndex = this.serviceIndexMap[service] ?? 0;
  }

  public update(
    time: number,
    progress: number, // active between ~0.30 -> 0.58
    mouse: THREE.Vector2,
    currentService: ServiceType
  ) {
    const isNear = progress > 0.26 && progress < 0.62;
    this.group.visible = isNear;
    if (!isNear) return;

    this.setActiveService(currentService);

    // Spin spindle & turbine collars
    this.coreSpindle.rotation.y = time * 0.3;
    this.turbineRings[0].rotation.z = time * 0.5;
    this.turbineRings[1].rotation.z = -time * 0.4;
    this.turbineRings[2].rotation.z = time * 0.6;

    // Transition 3: Disassembly as user scrolls past Services (~0.48 -> 0.58)
    const disassembleT = THREE.MathUtils.clamp((progress - 0.47) / 0.10, 0, 1);

    // Target rotation to align active module facing the camera
    const activeAngle = (this.activeServiceIndex / 6) * Math.PI * 2;
    const targetMachineRotY = -activeAngle;
    this.group.rotation.y = THREE.MathUtils.lerp(this.group.rotation.y, targetMachineRotY, 0.05);
    this.group.rotation.x = mouse.y * 0.1;

    // Update modules: Active module pops forward, surrounding modules retract
    this.modules.forEach((mod, idx) => {
      const base = this.baseModuleTransforms[idx];
      const isActive = idx === this.activeServiceIndex;

      if (disassembleT > 0) {
        // Disassemble & fly apart!
        const explodeDir = base.pos.clone().normalize();
        const dist = 1.0 + disassembleT * 18.0;
        mod.position.copy(explodeDir.multiplyScalar(dist));
        mod.rotation.x += disassembleT * 0.1;
        mod.rotation.y += disassembleT * 0.1;
        mod.scale.setScalar(Math.max(0.01, 1 - disassembleT * 0.8));
      } else {
        // Normal state: Active module extends outward (+1.4 units) and scales up slightly
        const targetDist = isActive ? 4.4 : 3.0;
        const targetScale = isActive ? 1.3 : 0.85;

        const currentPos = mod.position;
        const dir = base.pos.clone().normalize();
        currentPos.lerp(dir.multiplyScalar(targetDist), 0.08);

        mod.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
        mod.rotation.y += 0.01;

        if (isActive) {
          // Position the dynamic light fixture directly onto the active module
          this.lightFixture.position.copy(mod.position);
          this.lightFixture.intensity = 5.0;
        }
      }
    });
  }
}
