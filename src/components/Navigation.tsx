import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import { SectionId } from '../types';
import { BRAND } from '../data/content';

interface NavigationProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  onStartProject: () => void;
}

const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
  onStartProject,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 px-4 sm:px-8 ${
          isScrolled ? 'backdrop-blur-md bg-[#030306]/70 border-b border-white/[0.06]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            aria-label="TechDevs Home"
          >
            <img
              src="/techdevs-logo.png"
              alt="TechDevs Logo"
              className="w-8 h-8 rounded-full object-cover border border-white/20 group-hover:border-cyan-400/60 transition-colors shadow-md shrink-0"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-[0.2em] text-white group-hover:text-indigo-200 transition-colors">
                {BRAND.name}
              </span>
              <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase">
                {BRAND.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Floating Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full backdrop-blur-xl shadow-2xl"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-1.5 text-xs tracking-wider uppercase font-mono transition-all duration-200 rounded-full cursor-pointer focus:outline-none ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-[0_0_12px_rgba(255,255,255,0.12)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_6px_#38bdf8]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            {/* Direct Quick WhatsApp Link */}
            <a
              href={BRAND.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-mono hover:bg-emerald-500/20 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Futuristic CTA Button */}
            <button
              onClick={onStartProject}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-neutral-950 text-xs font-semibold tracking-wider uppercase font-mono hover:bg-neutral-200 hover:shadow-[0_0_24px_rgba(255,255,255,0.4)] transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#030306]/95 backdrop-blur-2xl flex flex-col justify-between p-6 pt-24 animate-in fade-in duration-200">
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase mb-2">
              NAVIGATION SYSTEM
            </div>
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="flex items-center justify-between text-left py-3 border-b border-white/[0.06] text-xl font-display font-semibold tracking-wide text-white hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-neutral-400">0{idx + 1}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-3.5 rounded-xl bg-white text-neutral-950 font-mono text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BRAND.phoneHref}
                className="py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
