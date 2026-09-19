import React, { useState } from 'react';
import { ArrowUpRight, Clock, Code2, Sparkles, Terminal } from 'lucide-react';
import { PROJECTS } from '../data/content';

interface ProjectsSectionProps {
  onStartProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onStartProject }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  return (
    <section
      id="work"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO PIPELINE // 04</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">WORK.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3 font-light">
              High-dimension digital environments currently under active engineering and spatial prototyping.
            </p>
          </div>

          <div className="pointer-events-auto">
            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/25 text-white font-mono text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <span>Commission Your Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* 3D Perspective Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pointer-events-auto">
          {PROJECTS.map((proj, idx) => {
            const isHovered = activeHoverId === proj.id;
            return (
              <div
                key={proj.id}
                onMouseEnter={() => setActiveHoverId(proj.id)}
                onMouseLeave={() => setActiveHoverId(null)}
                className={`card-metallic p-6 sm:p-7 rounded-3xl border transition-all duration-500 flex flex-col justify-between relative overflow-hidden group cursor-pointer ${
                  isHovered
                    ? 'border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] -translate-y-2'
                    : 'border-white/10'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Visual Wireframe Simulated 3D Viewport in Card Header */}
                <div className="w-full h-48 rounded-2xl bg-black/50 border border-white/[0.06] mb-6 p-4 relative flex flex-col justify-between overflow-hidden tech-grid group-hover:border-white/20 transition-colors">
                  {/* Subtle glowing orb inside the card viewport */}
                  <div
                    className="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl opacity-30 transition-opacity group-hover:opacity-60"
                    style={{ backgroundColor: proj.accent }}
                  />

                  {/* Wireframe geometric graphic inside */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-20 h-20 border border-white/20 rounded-xl rotate-12 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110 flex items-center justify-center">
                      <div className="w-12 h-12 border border-dashed border-cyan-400/50 rounded-lg -rotate-6" />
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: proj.accent, boxShadow: `0 0 12px ${proj.accent}` }}
                      />
                    </div>
                  </div>

                  {/* Top bar inside card preview */}
                  <div className="relative flex items-center justify-between font-mono text-[10px] text-neutral-400">
                    <span className="tracking-widest">{proj.tag}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.08] text-white flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-cyan-400" />
                      {proj.status}
                    </span>
                  </div>

                  {/* Bottom bar inside card preview */}
                  <div className="relative flex items-center justify-between font-mono text-[10px] text-neutral-400">
                    <span>{proj.category}</span>
                    <span>{proj.year}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="space-y-3">
                  <div className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase">
                    ENVIRONMENT 0{idx + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase group-hover:text-cyan-200 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <Terminal className="w-3 h-3 text-indigo-400" />
                    <span>{proj.metrics}</span>
                  </span>
                  <span className="text-white group-hover:text-cyan-400 flex items-center gap-1 transition-colors">
                    <span>Preview</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Notice / "More projects are being built." */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl card-metallic border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-indigo-400 animate-pulse" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-white uppercase tracking-wide">
                More projects are being built.
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                We take on a limited number of high-craft development projects each quarter to ensure Apple-level fidelity.
              </p>
            </div>
          </div>

          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-neutral-950 font-mono text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 shadow-md"
          >
            Start Your Build →
          </button>
        </div>
      </div>
    </section>
  );
};
