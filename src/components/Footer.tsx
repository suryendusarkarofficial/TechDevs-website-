import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/content';
import { SectionId } from '../types';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full border-t border-white/[0.08] bg-[#030306]/90 backdrop-blur-xl z-20 px-6 sm:px-12 py-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <img
                src="/techdevs-logo.png"
                alt="TechDevs Logo"
                className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
              />
              <span className="font-display text-2xl font-bold tracking-[0.2em] text-white">
                {BRAND.name}
              </span>
            </div>
            <p className="font-mono text-sm text-neutral-400 tracking-wider">
              “{BRAND.tagline}”
            </p>
          </div>

          {/* Social and Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-mono text-xs text-neutral-400 uppercase tracking-widest">
            {BRAND.socials.map((soc) => (
              <a
                key={soc.name}
                href={soc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>{soc.name}</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-400" />
              </a>
            ))}
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div>
            © {BRAND.year} {BRAND.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>DIRECT: {BRAND.phone}</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
              aria-label="Back to Top"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
