import React from 'react';
import { ArrowUpRight, Compass, Cpu, Layers, ShieldCheck, Smartphone, Users } from 'lucide-react';
import { WHY_ITEMS } from '../data/content';

interface WhyTechDevsSectionProps {
  onStartProject: () => void;
}

const WHY_ICONS = [
  <Layers className="w-5 h-5 text-indigo-400" />,
  <Compass className="w-5 h-5 text-cyan-400" />,
  <Smartphone className="w-5 h-5 text-emerald-400" />,
  <Cpu className="w-5 h-5 text-yellow-400" />,
  <Users className="w-5 h-5 text-pink-400" />,
];

export const WhyTechDevsSection: React.FC<WhyTechDevsSectionProps> = ({ onStartProject }) => {
  return (
    <section
      id="why"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full space-y-24">
        {/* Top Part: WHY TECHDEVS */}
        <div>
          <div className="flex flex-col items-start mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HONEST POSITIONING // 06</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
              BUILT FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">REAL BUSINESSES.</span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3 font-light">
              No bloated vanity numbers, no fake statistics. Pure engineering craft, rigorous performance, and transparent collaboration.
            </p>
          </div>

          {/* 5 Honest Pillars Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pointer-events-auto">
            {WHY_ITEMS.map((item, idx) => (
              <div
                key={item.title}
                className="card-metallic p-7 rounded-3xl border border-white/[0.08] flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {WHY_ICONS[idx]}
                  </div>

                  <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-1">
                    PILLAR 0{idx + 1}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="font-mono text-xs text-cyan-400 mt-1 mb-3">
                    {item.tagline}
                  </div>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[11px] text-neutral-400">
                  <span>VERIFIED ARCHITECTURE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            ))}

            {/* Sixth Bento Card: Direct Project Trigger */}
            <div className="card-metallic p-7 rounded-3xl border border-indigo-500/30 bg-indigo-950/10 flex flex-col justify-between group">
              <div>
                <div className="font-mono text-xs text-indigo-400 tracking-widest uppercase mb-2">
                  YOUR TURN
                </div>
                <h3 className="font-display text-2xl font-bold text-white tracking-tight uppercase">
                  READY TO UPGRADE?
                </h3>
                <p className="text-sm text-neutral-300 font-light leading-relaxed mt-3">
                  Let's engineer a digital presence that positions your business at the pinnacle of your market.
                </p>
              </div>

              <button
                onClick={onStartProject}
                className="mt-6 w-full py-3.5 rounded-2xl bg-white text-neutral-950 font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors cursor-pointer shadow-lg"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Part: ABOUT TECHDEVS */}
        <div className="pt-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-4">
                ABOUT TECHDEVS
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-white uppercase leading-none">
                <span className="block">WE BUILD.</span>
                <span className="block text-cyan-400">WE DESIGN.</span>
                <span className="block">WE GROW.</span>
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <p className="text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
                TechDevs is a web-development studio focused on creating modern digital experiences for businesses.
              </p>
              <p className="text-sm text-neutral-400 font-mono leading-relaxed">
                Founded with a strict mandate: eradicate cookie-cutter generic templates and replace them with high-end, high-performance dimensional web applications that convert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
