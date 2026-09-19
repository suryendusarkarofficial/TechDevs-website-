import React from 'react';
import { ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import { SectionId } from '../types';

interface AboutSectionProps {
  onNavigate: (section: SectionId) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Monolithic Typography */}
        <div className="lg:col-span-8 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-8 backdrop-blur-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>THE PHILOSOPHY // 01</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            <span className="block">YOUR WEBSITE</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              IS MORE THAN
            </span>
            <span className="block">A URL.</span>
          </h2>

          <div className="mt-10 max-w-2xl space-y-6">
            <p className="text-xl sm:text-2xl text-neutral-300 font-light leading-relaxed">
              It's the first impression, the digital storefront and the place where customers decide whether your business is worth their attention.
            </p>

            <div className="pt-4 border-l-2 border-indigo-400/80 pl-6">
              <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
                That's what TechDevs builds.
              </p>
              <p className="text-sm text-neutral-400 font-mono mt-2">
                Engineered for conversion, branded for permanence, rendered in high dimension.
              </p>
            </div>
          </div>

          {/* Interactive Navigation Pill */}
          <div className="mt-12 pointer-events-auto">
            <button
              onClick={() => onNavigate('services')}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/30 text-white font-mono text-xs tracking-wider uppercase backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              <span>Explore Interactive Services</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Right Column: Architectural Highlights */}
        <div className="lg:col-span-4 flex flex-col gap-4 pointer-events-auto">
          <div className="card-metallic p-6 rounded-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-3">
              <span>01 / AESTHETICS</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">Spatial & Fluid</h3>
            <p className="text-sm text-neutral-400 font-light mt-1">
              Custom WebGL shaders, volumetric particle systems, and calculated negative space.
            </p>
          </div>

          <div className="card-metallic p-6 rounded-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-3">
              <span>02 / SPEED</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">Engineered Velocity</h3>
            <p className="text-sm text-neutral-400 font-light mt-1">
              Sub-second paint times, progressive mesh streaming, and hardware-accelerated rendering.
            </p>
          </div>

          <div className="card-metallic p-6 rounded-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-neutral-400 mb-3">
              <span>03 / RESULTS</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white uppercase">Unmistakable Authority</h3>
            <p className="text-sm text-neutral-400 font-light mt-1">
              Designed specifically to make visitors stop scrolling and initiate contact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
