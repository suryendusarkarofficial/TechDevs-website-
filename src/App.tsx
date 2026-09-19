import React, { useState, useEffect, useRef } from 'react';
import { ThreeScene } from './components/3d/ThreeScene';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyTechDevsSection } from './components/WhyTechDevsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { LoadingScreen } from './components/LoadingScreen';
import { SectionId, ServiceType } from './types';
import { BRAND } from './data/content';
import { MessageSquare, Phone, Volume2, VolumeX, Eye, EyeOff } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [activeService, setActiveService] = useState<ServiceType>('design');
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check system prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Track global scroll progress and active section
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      setScrollProgress(scrolled);

      // Detect active section based on scroll position
      const sections: SectionId[] = [
        'hero',
        'about',
        'services',
        'work',
        'process',
        'why',
        'contact',
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleStartProject = () => {
    scrollToSection('contact');
  };

  const handleStartProjectForService = (_serviceName: string) => {
    scrollToSection('contact');
  };

  return (
    <div className="relative min-h-screen bg-[#030306] text-white selection:bg-white selection:text-black">
      {/* Cinematic Initial Loading Experience */}
      {isLoading && <LoadingScreen onLoaded={() => setIsLoading(false)} />}

      {/* Custom Minimal Glowing Cursor (Desktop Only) */}
      <CustomCursor />

      {/* High-Performance 6-Scene 3D Universe Canvas Background */}
      <ThreeScene
        activeSection={activeSection}
        activeService={activeService}
        activeProcessStep={activeProcessStep}
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
      />

      {/* Floating Navigation Header */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onStartProject={handleStartProject}
      />

      {/* Main Continuous Single-World Storyline */}
      <main className="relative z-10">
        {/* 01: Hero Section (Theme: Digital Origin) */}
        <HeroSection
          onNavigate={scrollToSection}
          onStartProject={handleStartProject}
        />

        {/* 02: About / Philosophy (Theme: Digital Architecture) */}
        <AboutSection onNavigate={scrollToSection} />

        {/* 03: Interactive 3D Machine Services (Theme: Digital Machine) */}
        <ServicesSection
          activeService={activeService}
          onSelectService={setActiveService}
          onStartProjectForService={handleStartProjectForService}
        />

        {/* 04: Selected Work / 3D Projects (Theme: Digital Gallery) */}
        <ProjectsSection onStartProject={handleStartProject} />

        {/* 05: Cinematic 4-Stage Process Journey (Theme: Digital Journey) */}
        <ProcessSection
          activeStageIndex={activeProcessStep}
          onSelectStage={setActiveProcessStep}
        />

        {/* Why TechDevs & Studio Positioning */}
        <WhyTechDevsSection onStartProject={handleStartProject} />

        {/* 06: Direct Engagement & Contact Section (Theme: TechDevs Core) */}
        <ContactSection />
      </main>

      {/* Futuristic Minimal Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Bottom Floating Accessibility & Quick Action Dock */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 pointer-events-auto">
        {/* Reduced Motion Toggle Button */}
        <button
          onClick={() => setReducedMotion(!reducedMotion)}
          className="p-2.5 rounded-full bg-[#090912]/80 border border-white/10 text-neutral-400 hover:text-white backdrop-blur-md transition-colors cursor-pointer"
          title={reducedMotion ? 'Enable Full 3D Motion' : 'Enable Reduced Motion'}
          aria-label="Toggle motion mode"
        >
          {reducedMotion ? <EyeOff className="w-4 h-4 text-cyan-400" /> : <Eye className="w-4 h-4" />}
        </button>

        {/* Floating Quick WhatsApp Launcher */}
        <a
          href={BRAND.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95"
          aria-label="Quick WhatsApp Chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
