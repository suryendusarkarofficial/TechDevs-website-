import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ServiceType } from '../../types';
import { UniverseController } from './UniverseController';

interface ThreeSceneProps {
  activeSection: string;
  activeService: ServiceType;
  activeProcessStep: number;
  scrollProgress: number;
  isCoreExpanded?: boolean;
  onCoreClick?: () => void;
  reducedMotion?: boolean;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  activeSection,
  activeService,
  activeProcessStep,
  scrollProgress,
  onCoreClick,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const universeRef = useRef<UniverseController | null>(null);

  // References to keep animation loop decoupled from React render triggers
  const stateRef = useRef({
    activeSection,
    activeService,
    activeProcessStep,
    scrollProgress,
    reducedMotion,
    mouse: new THREE.Vector2(0, 0),
    targetMouse: new THREE.Vector2(0, 0),
  });

  useEffect(() => {
    stateRef.current.activeSection = activeSection;
    stateRef.current.activeService = activeService;
    stateRef.current.activeProcessStep = activeProcessStep;
    stateRef.current.scrollProgress = scrollProgress;
    stateRef.current.reducedMotion = reducedMotion;
  }, [activeSection, activeService, activeProcessStep, scrollProgress, reducedMotion]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = window.innerWidth < 768;

    // Initialize UniverseController (manages all 6 distinct 3D scenes)
    const universe = new UniverseController(width, height);
    universeRef.current = universe;

    // WebGL Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !isMobile,
      alpha: true,
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Mouse & Touch Tracking
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      stateRef.current.targetMouse.set(nx, ny);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const nx = (touch.clientX / window.innerWidth) * 2 - 1;
        const ny = -(touch.clientY / window.innerHeight) * 2 + 1;
        stateRef.current.targetMouse.set(nx * 0.7, ny * 0.7);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      universe.resize(w, h);
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.0 : 1.75));
    };
    window.addEventListener('resize', handleResize);

    // Click handler on canvas: trigger pulse on ContactCore without unwanted modal popup
    const handleCanvasClick = () => {
      universe.contactScene.triggerClickPulse();
      if (onCoreClick) {
        onCoreClick();
      }
    };
    container.addEventListener('click', handleCanvasClick);

    // Animation Render Loop
    let animationFrameId: number;
    let lastTime = performance.now();

    const renderLoop = (now: number) => {
      const delta = (now - lastTime) * 0.001;
      lastTime = now;
      const time = now * 0.001;

      // Smooth mouse interpolation
      stateRef.current.mouse.lerp(stateRef.current.targetMouse, 0.06);

      // Update the 6-world universe & camera spline
      universe.update(
        time,
        stateRef.current.scrollProgress,
        stateRef.current.mouse,
        stateRef.current.activeService,
        stateRef.current.activeProcessStep,
        stateRef.current.reducedMotion
      );

      renderer.render(universe.scene, universe.camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('click', handleCanvasClick);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      universeRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
      aria-hidden="true"
    />
  );
};
