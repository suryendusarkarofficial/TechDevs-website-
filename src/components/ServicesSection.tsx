import React from 'react';
import { ArrowUpRight, CheckCircle2, Box, Cpu, RefreshCw, Smartphone, Target, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../types';
import { SERVICES } from '../data/content';

interface ServicesSectionProps {
  activeService: ServiceType;
  onSelectService: (service: ServiceType) => void;
  onStartProjectForService: (serviceName: string) => void;
}

const SERVICE_ICONS: Record<ServiceType, React.ReactNode> = {
  design: <Box className="w-4 h-4" />,
  development: <Cpu className="w-4 h-4" />,
  redesign: <RefreshCw className="w-4 h-4" />,
  mobile: <Smartphone className="w-4 h-4" />,
  landing: <Target className="w-4 h-4" />,
  maintenance: <ShieldCheck className="w-4 h-4" />,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  activeService,
  onSelectService,
  onStartProjectForService,
}) => {
  const currentService = SERVICES.find((s) => s.id === activeService) || SERVICES[0];

  return (
    <section
      id="services"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-indigo-400 uppercase mb-4 backdrop-blur-sm">
            <span>CAPABILITIES // 02</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase leading-tight">
            INTERACTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">SERVICES.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mt-3 font-light">
            Select a discipline below to morph the live 3D geometric engine in real time.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Service Selector Menu */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 pointer-events-auto">
            {SERVICES.map((item) => {
              const isActive = activeService === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectService(item.id)}
                  onMouseEnter={() => onSelectService(item.id)}
                  className={`group relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] border-white/30 shadow-[0_0_30px_rgba(255,255,255,0.08)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-mono text-xs tracking-widest transition-colors ${
                        isActive ? 'text-cyan-400 font-bold' : 'text-neutral-400 group-hover:text-neutral-300'
                      }`}
                    >
                      {item.number}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`font-display text-lg sm:text-xl font-bold tracking-tight uppercase transition-colors ${
                          isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono tracking-wide">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-neutral-950 border-white shadow-[0_0_12px_rgba(255,255,255,0.5)]'
                        : 'bg-white/[0.04] text-neutral-400 border-white/10 group-hover:border-white/20 group-hover:text-white'
                    }`}
                  >
                    {SERVICE_ICONS[item.id]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Service Deep Dive & Telemetry Pane */}
          <div className="lg:col-span-7 flex flex-col justify-between pointer-events-auto">
            <div className="card-metallic p-6 sm:p-8 rounded-3xl border border-white/15 backdrop-blur-xl relative overflow-hidden">
              {/* Top Bar with Live 3D Object Feedback */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-6 font-mono text-xs">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span className="tracking-widest uppercase">ACTIVE 3D OBJECT:</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-neutral-300">
                  {currentService.objectDescription}
                </div>
              </div>

              {/* Title & Detailed Breakdown */}
              <div className="space-y-4">
                <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                  DISCIPLINE {currentService.number} // 06
                </div>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                  {currentService.title}
                </h3>
                <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed">
                  {currentService.description}
                </p>
              </div>

              {/* Deliverable Checkpoints */}
              <div className="mt-8 space-y-2.5">
                <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase mb-3">
                  CORE DELIVERABLES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-300 font-light">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase mr-2">
                  TOOLCHAIN:
                </span>
                {currentService.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Inquire Action Button */}
              <div className="mt-10 pt-6 border-t border-white/[0.08] flex items-center justify-between">
                <div className="text-xs font-mono text-neutral-400 hidden sm:block">
                  READY TO ELEVATE YOUR STOREFRONT?
                </div>
                <button
                  onClick={() => onStartProjectForService(currentService.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-mono text-xs font-bold tracking-wider uppercase hover:bg-neutral-200 transition-all cursor-pointer shadow-lg"
                >
                  <span>Inquire for {currentService.title}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
