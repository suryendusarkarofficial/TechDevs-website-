import React from 'react';
import { ArrowRight, CheckCircle2, GitCommit, Play, Sparkles } from 'lucide-react';
import { PROCESS_STAGES } from '../data/content';

interface ProcessSectionProps {
  activeStageIndex: number;
  onSelectStage: (index: number) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  activeStageIndex,
  onSelectStage,
}) => {
  return (
    <section
      id="process"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-4 backdrop-blur-sm">
            <GitCommit className="w-3.5 h-3.5" />
            <span>THE ROADMAP // 05</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
            CINEMATIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-400">JOURNEY.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3 font-light">
            A 4-phase architectural trajectory. As you navigate each stage, the 3D camera glides along the spatial path.
          </p>
        </div>

        {/* Interactive Progress Highway & Stage Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pointer-events-auto">
          {PROCESS_STAGES.map((stage, idx) => {
            const isActive = activeStageIndex === idx;
            const isCompleted = activeStageIndex > idx;

            return (
              <div
                key={stage.number}
                onClick={() => onSelectStage(idx)}
                className={`card-metallic p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? 'border-white/40 shadow-[0_0_35px_rgba(56,189,248,0.15)] bg-white/[0.08] -translate-y-1.5'
                    : 'border-white/[0.07] hover:border-white/20'
                }`}
              >
                {/* Top Number & Node Indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center transition-all ${
                        isActive
                          ? 'bg-cyan-400 text-neutral-950 shadow-[0_0_15px_#38bdf8]'
                          : isCompleted
                          ? 'bg-white/20 text-white'
                          : 'bg-white/[0.05] text-neutral-400'
                      }`}
                    >
                      {stage.number}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                      {stage.duration}
                    </span>
                  </div>

                  {isActive ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8] animate-ping" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  )}
                </div>

                {/* Stage Title & Name */}
                <div className="space-y-2">
                  <div className="font-mono text-[11px] text-cyan-400 tracking-widest uppercase">
                    {stage.step}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase group-hover:text-cyan-200 transition-colors">
                    {stage.name}
                  </h3>
                  <div className="text-xs font-mono text-neutral-300">
                    {stage.title}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed pt-2">
                    {stage.description}
                  </p>
                </div>

                {/* Deliverables Pills */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-1.5">
                  <div className="font-mono text-[10px] text-neutral-400 tracking-widest uppercase mb-1">
                    OUTPUTS:
                  </div>
                  {stage.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-1.5 text-[11px] text-neutral-300 font-mono"
                    >
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom Active Glow Accent */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-400 to-white shadow-[0_0_12px_#38bdf8]" />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Navigation Pill Controls */}
        <div className="mt-8 flex items-center justify-between text-xs font-mono text-neutral-400 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-white">ACTIVE CAMERA NODE:</span>
            <span className="text-cyan-400 uppercase font-semibold">
              STAGE {PROCESS_STAGES[activeStageIndex].number} — {PROCESS_STAGES[activeStageIndex].name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectStage(Math.max(0, activeStageIndex - 1))}
              disabled={activeStageIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              PREV
            </button>
            <button
              onClick={() => onSelectStage(Math.min(3, activeStageIndex + 1))}
              disabled={activeStageIndex === 3}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/[0.05] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            >
              <span>NEXT</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
