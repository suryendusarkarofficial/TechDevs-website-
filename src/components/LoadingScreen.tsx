import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoaded: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('ALLOCATING WEBGL 2.0 CONTEXT...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const statuses = [
      { at: 15, text: 'ALLOCATING WEBGL 2.0 CONTEXT...' },
      { at: 40, text: 'SYNTHESIZING DIGITAL CORE SHADERS...' },
      { at: 70, text: 'CALIBRATING VOLUMETRIC DEPTH MAPS...' },
      { at: 90, text: 'INITIALIZING 3D SPATIAL ENVIRONMENT...' },
      { at: 100, text: 'EXPERIENCE READY' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(interval);
          setStatusText('EXPERIENCE READY');
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onLoaded();
            }, 650);
          }, 350);
          return 100;
        }

        const match = statuses.slice().reverse().find((s) => next >= s.at);
        if (match) setStatusText(match.text);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030306] text-white transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient subtle glow */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />

      {/* TechDevs Futuristic Monogram */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="relative w-20 h-20 flex items-center justify-center border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-md">
          {/* Rotating outer frame */}
          <div className="absolute inset-0 border border-indigo-400/30 rounded-2xl animate-spin [animation-duration:8s]" />
          
          {/* Geometric Diamond Nucleus */}
          <div className="w-7 h-7 rotate-45 border-2 border-white/90 shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
          
          {/* Glowing central node */}
          <div className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8]" />
        </div>
      </div>

      {/* Brand & Loading Indicator */}
      <div className="flex flex-col items-center gap-3 text-center px-4">
        <div className="tracking-[0.3em] font-display text-xs font-semibold text-neutral-400 uppercase">
          TECHDEVS
        </div>

        <h2 className="font-mono text-sm tracking-wider text-neutral-200">
          INITIALIZING EXPERIENCE…
        </h2>

        {/* Numeric Counter */}
        <div className="font-mono text-3xl font-light text-white tracking-tight mt-1">
          {String(progress).padStart(2, '0')}%
        </div>

        {/* Progress Track */}
        <div className="w-56 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden mt-2 relative">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-white transition-all duration-150 ease-out shadow-[0_0_10px_rgba(56,189,248,0.7)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Technical Subtext Status */}
        <p className="font-mono text-[10px] tracking-widest text-neutral-500 mt-2 uppercase">
          {statusText}
        </p>
      </div>
    </div>
  );
};
