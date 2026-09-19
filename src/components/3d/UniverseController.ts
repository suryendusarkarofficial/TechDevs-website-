import * as THREE from 'three';
import { ServiceType } from '../../types';
import { HeroOriginScene } from './scenes/HeroOriginScene';
import { AboutArchitectureScene } from './scenes/AboutArchitectureScene';
import { ServicesMachineScene } from './scenes/ServicesMachineScene';
import { WorkGalleryScene } from './scenes/WorkGalleryScene';
import { ProcessJourneyScene } from './scenes/ProcessJourneyScene';
import { ContactCoreScene } from './scenes/ContactCoreScene';

export class UniverseController {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;

  // 6 Distinct 3D World Scenes
  public heroScene: HeroOriginScene;
  public aboutScene: AboutArchitectureScene;
  public servicesScene: ServicesMachineScene;
  public workScene: WorkGalleryScene;
  public processScene: ProcessJourneyScene;
  public contactScene: ContactCoreScene;

  // Master Global Lighting & Environment
  private ambientLight: THREE.AmbientLight;
  private keyLight: THREE.DirectionalLight;
  private fillLight: THREE.DirectionalLight;

  // Camera tracking smoothing
  private currentCameraPos = new THREE.Vector3(0, 0, 8.5);
  private targetCameraPos = new THREE.Vector3(0, 0, 8.5);
  private currentCameraLookAt = new THREE.Vector3(0, 0, 0);
  private targetCameraLookAt = new THREE.Vector3(0, 0, 0);

  constructor(width: number, height: number) {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030306, 0.025);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 250);
    this.camera.position.set(0, 0, 8.5);

    // Global Ambient & Key Lights
    this.ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.keyLight.position.set(6, 10, 8);
    this.scene.add(this.keyLight);

    this.fillLight = new THREE.DirectionalLight(0x6366f1, 1.8);
    this.fillLight.position.set(-6, -4, 4);
    this.scene.add(this.fillLight);

    // Instantiate and add all 6 distinct worlds
    this.heroScene = new HeroOriginScene();
    this.aboutScene = new AboutArchitectureScene();
    this.servicesScene = new ServicesMachineScene();
    this.workScene = new WorkGalleryScene();
    this.processScene = new ProcessJourneyScene();
    this.contactScene = new ContactCoreScene();

    this.scene.add(this.heroScene.group);
    this.scene.add(this.aboutScene.group);
    this.scene.add(this.servicesScene.group);
    this.scene.add(this.workScene.group);
    this.scene.add(this.processScene.group);
    this.scene.add(this.contactScene.group);
  }

  public update(
    time: number,
    progress: number,
    mouse: THREE.Vector2,
    activeService: ServiceType,
    activeProcessStep: number,
    reducedMotion: boolean = false
  ) {
    // 1. Calculate Target Camera Coordinates along continuous cinematic spline
    this.computeCameraTrajectory(progress, mouse, reducedMotion);

    // 2. Smoothly Lerp Camera toward targets for heavy, cinematic feel
    const lerpFactor = reducedMotion ? 0.2 : 0.06;
    this.currentCameraPos.lerp(this.targetCameraPos, lerpFactor);
    this.currentCameraLookAt.lerp(this.targetCameraLookAt, lerpFactor);

    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(this.currentCameraLookAt);

    // Follow key lights with camera so shadows and specular highlights are pristine
    this.keyLight.position.set(
      this.currentCameraPos.x + 6,
      this.currentCameraPos.y + 10,
      this.currentCameraPos.z + 8
    );
    this.fillLight.position.set(
      this.currentCameraPos.x - 6,
      this.currentCameraPos.y - 4,
      this.currentCameraPos.z + 4
    );

    // 3. Update the 6 individual scenes
    this.heroScene.update(time, progress, mouse);
    this.aboutScene.update(time, progress, mouse);
    this.servicesScene.update(time, progress, mouse, activeService);
    this.workScene.update(time, progress, mouse);
    this.processScene.update(time, progress, activeProcessStep);
    this.contactScene.update(time, progress, mouse);
  }

  private computeCameraTrajectory(
    p: number,
    mouse: THREE.Vector2,
    reducedMotion: boolean
  ) {
    const mouseParallaxX = reducedMotion ? 0 : mouse.x * 0.45;
    const mouseParallaxY = reducedMotion ? 0 : -mouse.y * 0.35;

    // SCENE 01 — HERO (p: 0.0 -> ~0.16)
    if (p <= 0.16) {
      const t = p / 0.16; // 0 to 1
      // Camera approaches planet as user starts scrolling, then zooms in fast during fragmentation
      const z = THREE.MathUtils.lerp(8.5, 1.8, t * t);
      this.targetCameraPos.set(mouseParallaxX, mouseParallaxY, z);
      this.targetCameraLookAt.set(0, 0, 0);
    }
    // TRANSITION 1 -> SCENE 02 — ABOUT (p: 0.16 -> ~0.33)
    else if (p <= 0.33) {
      const t = (p - 0.16) / 0.17; // 0 to 1
      // Camera flies THROUGH the particle field into the architectural structure
      // About structure is at z = -28. Camera travels from z = -18 to z = -36 (flying THROUGH it!)
      const z = THREE.MathUtils.lerp(-18, -38, t);
      const x = Math.sin(t * Math.PI) * 1.5 + mouseParallaxX;
      const y = Math.cos(t * Math.PI * 0.5) * 0.8 + mouseParallaxY;
      this.targetCameraPos.set(x, y, z);
      this.targetCameraLookAt.set(0, 0, z - 8);
    }
    // TRANSITION 2 -> SCENE 03 — SERVICES (p: 0.33 -> ~0.52)
    else if (p <= 0.52) {
      const t = (p - 0.33) / 0.19; // 0 to 1
      // Services Machine is at z = -60. Camera orbits at z = -52 with dynamic radius
      const angle = t * Math.PI * 1.2;
      const x = Math.sin(angle) * 3.5 + mouseParallaxX;
      const y = (Math.sin(t * Math.PI * 2) * 0.8) + mouseParallaxY;
      const z = THREE.MathUtils.lerp(-51, -54, t);
      this.targetCameraPos.set(x, y, z);
      this.targetCameraLookAt.set(0, 0, -60);
    }
    // TRANSITION 3 -> SCENE 04 — WORK (p: 0.52 -> ~0.68)
    else if (p <= 0.68) {
      const t = (p - 0.52) / 0.16; // 0 to 1
      // Work Gallery is at z = -95. Camera swoops between screens
      const z = THREE.MathUtils.lerp(-88, -104, t);
      const x = Math.sin(t * Math.PI * 2) * 2.8 + mouseParallaxX;
      const y = Math.cos(t * Math.PI * 1.5) * 1.2 + mouseParallaxY;
      this.targetCameraPos.set(x, y, z);
      this.targetCameraLookAt.set(x * 0.4, y * 0.3, z - 7);
    }
    // TRANSITION 4 -> SCENE 05 — PROCESS (p: 0.68 -> ~0.85)
    else if (p <= 0.85) {
      const t = (p - 0.68) / 0.17; // 0 to 1
      // Follow the 3D spline runway inside ProcessJourneyScene (offset by group pos z = -135)
      const splineT = THREE.MathUtils.clamp(t * 1.05, 0, 1);
      const ptOnCurve = this.processScene.pathwayCurve.getPoint(splineT);
      const lookAhead = this.processScene.pathwayCurve.getPoint(Math.min(1, splineT + 0.1));

      this.targetCameraPos.set(
        ptOnCurve.x + mouseParallaxX * 0.6,
        ptOnCurve.y + 1.2 + mouseParallaxY * 0.6,
        ptOnCurve.z - 135 + 4.5
      );
      this.targetCameraLookAt.set(
        lookAhead.x,
        lookAhead.y,
        lookAhead.z - 135
      );
    }
    // TRANSITION 5 -> SCENE 06 — CONTACT (p: 0.85 -> 1.00)
    else {
      const t = (p - 0.85) / 0.15; // 0 to 1
      // Shoot through the portal and settle in front of TechDevs Core at z = -180
      const z = THREE.MathUtils.lerp(-168, -172, Math.min(1, t * 1.4));
      this.targetCameraPos.set(mouseParallaxX * 0.8, mouseParallaxY * 0.8, z);
      this.targetCameraLookAt.set(0, 0, -180);
    }
  }

  public resize(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
