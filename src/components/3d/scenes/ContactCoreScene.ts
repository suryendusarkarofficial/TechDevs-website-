import * as THREE from 'three';

export class ContactCoreScene {
  public group: THREE.Group;
  public coreEmblemMesh: THREE.Mesh;
  private outerGlassShell: THREE.Mesh;
  private innerLattice: THREE.Mesh;
  private gyroRings: THREE.Mesh[] = [];
  private orbitNodes: THREE.Mesh[] = [];
  private internalParticles: THREE.Points;
  private coreLight: THREE.PointLight;
  private pulseEnergy: number = 0;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'ContactCoreScene';
    this.group.position.set(0, 0, -180); // Final sanctuary along the Z axis

    // 1. Central TechDevs Brand Emblem (Using official uploaded logo texture)
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/techdevs-logo.png');
    logoTexture.generateMipmaps = true;

    const emblemGeo = new THREE.PlaneGeometry(2.2, 2.2);
    const emblemMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.98,
      side: THREE.DoubleSide,
    });
    this.coreEmblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    this.group.add(this.coreEmblemMesh);

    // 2. High-Tech Outer Faceted Glass Shell (Polyhedral gemstone enclosure)
    const shellGeo = new THREE.DodecahedronGeometry(2.3, 0);
    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.08,
      metalness: 0.05,
      roughness: 0.02,
      transmission: 0.95,
      thickness: 0.2,
      ior: 1.48,
      transparent: true,
      opacity: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });
    this.outerGlassShell = new THREE.Mesh(shellGeo, shellMat);
    this.group.add(this.outerGlassShell);

    // Glowing wireframe cage around glass shell
    const cageGeo = new THREE.EdgesGeometry(shellGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
    });
    const cage = new THREE.LineSegments(cageGeo, cageMat);
    this.outerGlassShell.add(cage);

    // 3. Inner Kinetic Icosahedral Lattice
    const latticeGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const latticeMat = new THREE.MeshStandardMaterial({
      color: 0x312e81,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
    });
    this.innerLattice = new THREE.Mesh(latticeGeo, latticeMat);
    this.group.add(this.innerLattice);

    // 4. Gyroscopic Metallic Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1,
    });

    const r1 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.05, 16, 64), ringMat);
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(3.6, 0.04, 16, 64), ringMat);
    r1.rotation.x = Math.PI / 3;
    r2.rotation.y = Math.PI / 4;

    this.gyroRings = [r1, r2];
    this.group.add(r1, r2);

    // 5. Small Orbiting Telemetry Elements (Satellite nodes)
    const satMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      metalness: 0.5,
    });
    for (let i = 0; i < 4; i++) {
      const sat = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), satMat);
      this.orbitNodes.push(sat);
      this.group.add(sat);
    }

    // 6. Internal Particle Core Embers
    const pCount = 300;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.8;

      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    this.internalParticles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 0.06,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      })
    );
    this.group.add(this.internalParticles);

    // 7. Dynamic Core Light
    this.coreLight = new THREE.PointLight(0x38bdf8, 3.5, 14);
    this.group.add(this.coreLight);
  }

  public triggerClickPulse() {
    // Satisfies user intent: energetic visual ripple on click without opening an unwanted modal popup!
    this.pulseEnergy = 1.0;
  }

  public update(time: number, progress: number, mouse: THREE.Vector2) {
    const isNear = progress > 0.82;
    this.group.visible = isNear;
    if (!isNear) return;

    // Fade pulse energy
    if (this.pulseEnergy > 0) {
      this.pulseEnergy = Math.max(0, this.pulseEnergy - 0.03);
    }

    const pulseScale = 1.0 + this.pulseEnergy * 0.25;

    // React subtly to mouse movement
    this.group.rotation.y = THREE.MathUtils.lerp(
      this.group.rotation.y,
      mouse.x * 0.35 + time * 0.15,
      0.08
    );
    this.group.rotation.x = THREE.MathUtils.lerp(
      this.group.rotation.x,
      -mouse.y * 0.3,
      0.08
    );

    // Inner lattice and shell rotation
    this.outerGlassShell.rotation.y = time * 0.2;
    this.outerGlassShell.rotation.z = Math.sin(time * 0.3) * 0.1;
    this.outerGlassShell.scale.setScalar(pulseScale);

    this.innerLattice.rotation.x = -time * 0.25;
    this.innerLattice.rotation.y = time * 0.3;

    // Gyro ring counter-rotation
    this.gyroRings[0].rotation.z += 0.015 * (1 + this.pulseEnergy * 3);
    this.gyroRings[1].rotation.x -= 0.018 * (1 + this.pulseEnergy * 3);

    // Satellite orbits
    this.orbitNodes.forEach((node, i) => {
      const angle = time * 0.8 + (i * Math.PI) / 2;
      const dist = 3.2;
      node.position.set(
        Math.sin(angle) * dist,
        Math.cos(angle * 0.7) * 1.2,
        Math.cos(angle) * dist
      );
    });

    // Particle breathing
    this.internalParticles.rotation.y = time * 0.1;

    // Light breathing & pulse
    this.coreLight.intensity = 3.0 + Math.sin(time * 2.0) * 0.8 + this.pulseEnergy * 5.0;
  }
}
