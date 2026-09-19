import React from 'react';
import { ArrowDown, ArrowUpRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionId } from '../types';

interface HeroSectionProps {
  onNavigate: (section: SectionId) => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onStartProject,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 pointer-events-none z-10"
    >
      {/* Top Telemetry Header Badges */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-widest uppercase text-[10px]">TECHDEVS ENGINE // V2.6 ONLINE</span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-widest uppercase text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>INTERACTIVE 3D RUNTIME</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-indigo-400" />
            <span>ZERO TEMPLATES</span>
          </span>
        </div>
      </div>

      {/* Center Cinematic Typography Frame */}
      <div className="max-w-7xl mx-auto w-full my-auto py-6 sm:py-10 flex flex-col items-start justify-center">
        {/* Brand Badge with exact official logo */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-[11px] font-mono tracking-widest text-neutral-300 uppercase mb-5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.4)]">
          <img
            src="/techdevs-logo.png"
            alt="TechDevs Logo"
            className="w-5 h-5 rounded-full object-cover shrink-0"
          />
          <span className="text-white font-semibold">TECHDEVS</span>
          <span className="text-neutral-500">//</span>
          <span className="text-neutral-300">BESPOKE 3D WEB DEVELOPMENT</span>
        </div>

        {/* Hero Headline with calibrated layout, line-height, and typography constraints */}
        <div className="max-w-2xl lg:max-w-3xl">
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.04] uppercase select-none">
            <span className="block text-white">WE BUILD</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-indigo-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.2)]">
              DIGITAL EXPERIENCES.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="mt-5 max-w-lg text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed">
            Modern websites designed to make businesses{' '}
            <span className="text-white font-medium underline decoration-white/20 underline-offset-8">
              impossible to ignore.
            </span>
          </p>

          {/* CTA Button Group (pointer-events-auto so they are clickable) */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5 pointer-events-auto">
            <button
              onClick={onStartProject}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-neutral-950 font-mono text-xs font-bold tracking-widest uppercase shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:bg-neutral-100 hover:shadow-[0_0_45px_rgba(255,255,255,0.6)] active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-white font-mono text-xs font-semibold tracking-widest uppercase backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span>Explore TechDevs</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Technical Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-6 border-t border-white/[0.06] text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span className="tracking-widest uppercase text-[10px]">
            SCROLL TO TRAVEL // 6 DISTINCT 3D WORLDS
          </span>
        </div>

        <div className="flex items-center gap-6 text-[10px] tracking-widest text-neutral-400">
          <span>LAT: 22.5726° N</span>
          <span>LONG: 88.3639° E</span>
          <span className="text-neutral-400 hidden md:inline">THREE.JS SHADER ENGINE</span>
        </div>
      </div>
    </section>
  );
};
