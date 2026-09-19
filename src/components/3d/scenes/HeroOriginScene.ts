import * as THREE from 'three';

export class HeroOriginScene {
  public group: THREE.Group;
  private planetMesh: THREE.Mesh;
  private atmosphereMesh: THREE.Mesh;
  private ringsGroup: THREE.Group;
  private particlesMesh: THREE.Points;
  private warpParticlesMesh: THREE.Points;
  private logoMesh: THREE.Mesh;
  private ringSpeeds: number[] = [0.4, -0.6, 0.3];
  private baseParticlePositions: Float32Array;

  constructor() {
    this.group = new THREE.Group();
    this.group.name = 'HeroOriginScene';

    // 1. Digital Origin Planet (detailed digital sphere)
    const planetGeo = new THREE.IcosahedronGeometry(2.0, 16);
    const planetMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0f1d,
      emissive: 0x1e1b4b,
      emissiveIntensity: 0.65,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: false,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });
    this.planetMesh = new THREE.Mesh(planetGeo, planetMat);
    this.group.add(this.planetMesh);

    // Planet wireframe overlay
    const wireframeGeo = new THREE.IcosahedronGeometry(2.03, 4);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const planetWire = new THREE.Mesh(wireframeGeo, wireframeMat);
    this.planetMesh.add(planetWire);

    // 2. Atmospheric Glow
    const atmosGeo = new THREE.SphereGeometry(2.35, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
    });
    this.atmosphereMesh = new THREE.Mesh(atmosGeo, atmosMat);
    this.group.add(this.atmosphereMesh);

    // 3. Orbiting Planetary Rings
    this.ringsGroup = new THREE.Group();
    this.group.add(this.ringsGroup);

    const ringRadii = [3.2, 4.1, 5.0];
    const ringColors = [0x38bdf8, 0x818cf8, 0xec4899];

    ringRadii.forEach((radius, i) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.04, radius + 0.04, 96);
      const ringMat = new THREE.MeshBasicMaterial({
        color: ringColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55 - i * 0.1,
        blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.3 + (i * 0.25);
      ring.rotation.y = (i * 0.35);
      this.ringsGroup.add(ring);
    });

    // 4. Ambient Space Particles
    const particleCount = 600;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const dist = 3.0 + Math.random() * 8.0;

      particlePos[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      particlePos[i * 3 + 2] = dist * Math.cos(phi);

      const colorChoice = Math.random();
      if (colorChoice > 0.6) {
        particleColors[i * 3] = 0.22;
        particleColors[i * 3 + 1] = 0.74;
        particleColors[i * 3 + 2] = 0.97;
      } else if (colorChoice > 0.3) {
        particleColors[i * 3] = 0.51;
        particleColors[i * 3 + 1] = 0.55;
        particleColors[i * 3 + 2] = 0.98;
      } else {
        particleColors[i * 3] = 0.95;
        particleColors[i * 3 + 1] = 0.28;
        particleColors[i * 3 + 2] = 0.60;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    this.particlesMesh = new THREE.Points(particleGeo, particleMat);
    this.group.add(this.particlesMesh);

    // 5. Warp Field Fragmentation Particles (Activated during Hero -> About scroll transition)
    const warpCount = 1400;
    const warpGeo = new THREE.BufferGeometry();
    const warpPos = new Float32Array(warpCount * 3);
    this.baseParticlePositions = new Float32Array(warpCount * 3);

    for (let i = 0; i < warpCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.0 + (Math.random() * 0.3);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      warpPos[i * 3] = x;
      warpPos[i * 3 + 1] = y;
      warpPos[i * 3 + 2] = z;

      this.baseParticlePositions[i * 3] = x;
      this.baseParticlePositions[i * 3 + 1] = y;
      this.baseParticlePositions[i * 3 + 2] = z;
    }

    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPos, 3));
    const warpMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.0, // hidden initially until transition begins
      blending: THREE.AdditiveBlending,
    });
    this.warpParticlesMesh = new THREE.Points(warpGeo, warpMat);
    this.group.add(this.warpParticlesMesh);

    // 6. Floating TechDevs Brand Emblem (Using official uploaded logo texture)
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load('/techdevs-logo.png');
    logoTexture.generateMipmaps = true;
    logoTexture.minFilter = THREE.LinearMipmapLinearFilter;

    const logoGeo = new THREE.PlaneGeometry(1.8, 1.8);
    const logoMat = new THREE.MeshBasicMaterial({
      map: logoTexture,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    this.logoMesh = new THREE.Mesh(logoGeo, logoMat);
    this.logoMesh.position.set(0, 0, 2.5);
    this.group.add(this.logoMesh);
  }

  public update(
    time: number,
    progress: number, // 0.0 (Hero start) -> 0.20 (About transition end)
    mouse: THREE.Vector2
  ) {
    // Normal Hero State (progress ~ 0.0 -> 0.08)
    // Transition State (progress 0.08 -> 0.22)
    const tProgress = THREE.MathUtils.clamp((progress - 0.06) / 0.14, 0, 1);

    // Planet rotation
    const baseSpin = time * 0.25;
    const accelSpin = baseSpin + (tProgress * tProgress * 12.0); // accelerates during transition
    this.planetMesh.rotation.y = accelSpin;
    this.planetMesh.rotation.x = time * 0.08 + mouse.y * 0.15;

    // Orbit rings
    this.ringsGroup.children.forEach((ring, idx) => {
      ring.rotation.z += (this.ringSpeeds[idx] * 0.015) * (1 + tProgress * 8);
    });

    // Logo subtle float
    this.logoMesh.position.y = Math.sin(time * 1.5) * 0.08;
    this.logoMesh.position.x = mouse.x * 0.25;
    this.logoMesh.rotation.y = mouse.x * 0.2;
    this.logoMesh.rotation.x = -mouse.y * 0.2;

    // Ambient space particles
    this.particlesMesh.rotation.y = time * 0.03;

    // TRANSITION 1 EXECUTION:
    // 1. Camera approaches (handled by UniverseController camera lerp)
    // 2. Planet fragments & dissolves
    // 3. Orbit rings expand & dissolve
    // 4. Surface particles burst forward toward camera
    if (tProgress > 0) {
      // Planet scales up and fragments/fades
      const fragScale = 1.0 + tProgress * 1.8;
      this.planetMesh.scale.set(fragScale, fragScale, fragScale);
      (this.planetMesh.material as THREE.MeshPhysicalMaterial).opacity = Math.max(0, 1 - tProgress * 1.5);
      (this.planetMesh.material as THREE.MeshPhysicalMaterial).transparent = true;

      // Atmosphere fades
      (this.atmosphereMesh.material as THREE.MeshBasicMaterial).opacity = (1 - tProgress) * 0.12;

      // Rings expand
      this.ringsGroup.scale.set(1 + tProgress * 2.5, 1 + tProgress * 2.5, 1 + tProgress * 2.5);
      this.ringsGroup.children.forEach((child) => {
        const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = Math.max(0, 0.55 * (1 - tProgress));
      });

      // Logo fades & zooms past camera
      this.logoMesh.position.z = 2.5 + tProgress * 6.0;
      (this.logoMesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.95 * (1 - tProgress * 1.8));

      // Warp particles ignite and stream TOWARDS THE CAMERA!
      const warpMat = this.warpParticlesMesh.material as THREE.PointsMaterial;
      warpMat.opacity = Math.min(1.0, tProgress * 1.8) * Math.max(0, 1.0 - (tProgress - 0.75) * 4.0);

      const positions = this.warpParticlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length / 3; i++) {
        const bx = this.baseParticlePositions[i * 3];
        const by = this.baseParticlePositions[i * 3 + 1];
        const bz = this.baseParticlePositions[i * 3 + 2];

        // Explode outward radially and stream along Z toward camera
        const burstFactor = tProgress * 14.0;
        positions[i * 3] = bx * (1 + tProgress * 3.5);
        positions[i * 3 + 1] = by * (1 + tProgress * 3.5);
        positions[i * 3 + 2] = bz + burstFactor * (1.5 + (i % 5) * 0.4);
      }
      this.warpParticlesMesh.geometry.attributes.position.needsUpdate = true;
    } else {
      // Restore clean initial state
      this.planetMesh.scale.set(1, 1, 1);
      (this.planetMesh.material as THREE.MeshPhysicalMaterial).opacity = 1.0;
      (this.planetMesh.material as THREE.MeshPhysicalMaterial).transparent = false;
      this.ringsGroup.scale.set(1, 1, 1);
      this.logoMesh.position.z = 2.5;
      (this.logoMesh.material as THREE.MeshBasicMaterial).opacity = 0.95;
      (this.warpParticlesMesh.material as THREE.PointsMaterial).opacity = 0.0;
    }

    // Overall group visibility check
    this.group.visible = progress < 0.25;
  }
}
