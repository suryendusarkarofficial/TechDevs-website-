import React, { useState } from 'react';
import { ArrowUpRight, Check, CheckCircle2, Copy, Mail, MessageSquare, Phone, Send, Sparkles } from 'lucide-react';
import { BRAND } from '../data/content';
import { ContactFormData } from '../types';

interface ContactSectionProps {
  initialServiceInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialServiceInterest = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    business: '',
    email: '',
    message: '',
    serviceInterest: initialServiceInterest || 'Website Design & Development',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide your full name.';
    }
    if (!formData.business.trim()) {
      errs.business = 'Please specify your company or brand name.';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  const getWhatsAppEncodedUrl = () => {
    const text = `Hi TechDevs! I would like to start a project.\n\n*Name:* ${formData.name}\n*Business:* ${formData.business}\n*Email:* ${formData.email}\n*Service:* ${formData.serviceInterest}\n*Brief:* ${formData.message}`;
    return `https://wa.me/919433731324?text=${encodeURIComponent(text)}`;
  };

  const handleCopyBrief = () => {
    const text = `TECHDEVS PROJECT BRIEF\nName: ${formData.name}\nBusiness: ${formData.business}\nEmail: ${formData.email}\nService: ${formData.serviceInterest}\nMessage: ${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center py-28 px-6 sm:px-12 z-10 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-cyan-400 uppercase mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT ENGAGEMENT // 07</span>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl tracking-tight text-white uppercase leading-[0.95]">
            <span className="block">LET'S BUILD</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-400">
              SOMETHING.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-neutral-300 font-light leading-relaxed">
            Have an idea, a business or a website that needs a serious upgrade? Connect directly with our engineering studio.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Communication Channels & Phone/WhatsApp */}
          <div className="lg:col-span-5 flex flex-col gap-6 pointer-events-auto">
            <div className="card-metallic p-7 rounded-3xl border border-white/10 space-y-6">
              <div className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                DIRECT CHANNELS
              </div>

              {/* WhatsApp Button */}
              <a
                href={BRAND.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-emerald-400 font-semibold tracking-wider uppercase">
                      CHAT ON WHATSAPP
                    </span>
                    <span className="font-mono text-sm sm:text-base text-white font-medium">
                      {BRAND.whatsapp}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-emerald-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Phone Button */}
              <a
                href={BRAND.phoneHref}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-cyan-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-neutral-400 tracking-wider uppercase">
                      DIRECT CALL
                    </span>
                    <span className="font-mono text-sm sm:text-base text-white font-medium">
                      {BRAND.phone}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
              </a>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-neutral-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>STUDIO TIMEZONE:</span>
                  <span className="text-white">IST (UTC +5:30)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>TYPICAL TURNAROUND:</span>
                  <span className="text-emerald-400">&lt; 2 HOURS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>LOCATION:</span>
                  <span className="text-white">GLOBAL CLIENTELE</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Guarantee */}
            <div className="card-metallic p-6 rounded-3xl border border-white/[0.06] text-xs text-neutral-400 font-light leading-relaxed">
              <span className="text-white font-mono uppercase tracking-wider block mb-1">
                Zero Sales Pressure
              </span>
              We discuss technical feasibility, design scope, and realistic delivery timetables directly with lead engineers.
            </div>
          </div>

          {/* Right Column: High-End Contact Form */}
          <div className="lg:col-span-7 pointer-events-auto">
            <div className="card-metallic p-8 sm:p-10 rounded-3xl border border-white/15 backdrop-blur-xl">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-2">
                    <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
                      TRANSMIT PROJECT SPECIFICATIONS
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 uppercase">
                      ALL FIELDS VERIFIED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Alex Sterling"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-400 transition-colors ${
                          errors.name ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.name && (
                        <span className="font-mono text-[11px] text-rose-400">{errors.name}</span>
                      )}
                    </div>

                    {/* Business */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider">
                        Company / Business *
                      </label>
                      <input
                        type="text"
                        value={formData.business}
                        onChange={(e) => {
                          setFormData({ ...formData, business: e.target.value });
                          if (errors.business) setErrors({ ...errors, business: undefined });
                        }}
                        placeholder="e.g. Acme Innovations"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-400 transition-colors ${
                          errors.business ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.business && (
                        <span className="font-mono text-[11px] text-rose-400">{errors.business}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-400 transition-colors ${
                          errors.email ? 'border-rose-500' : 'border-white/10'
                        }`}
                      />
                      {errors.email && (
                        <span className="font-mono text-[11px] text-rose-400">{errors.email}</span>
                      )}
                    </div>

                    {/* Service Interest */}
                    <div className="space-y-2">
                      <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider">
                        Primary Service
                      </label>
                      <select
                        value={formData.serviceInterest}
                        onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#090912] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                      >
                        <option value="Website Design & Development">Website Design & Development</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Mobile-First Development">Mobile-First Development</option>
                        <option value="High-Converting Landing Page">High-Converting Landing Page</option>
                        <option value="Website Maintenance & Retainer">Website Maintenance & Retainer</option>
                        <option value="3D WebGL / Spatial Website">3D WebGL / Spatial Website</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="block font-mono text-xs text-neutral-300 uppercase tracking-wider">
                      Project Goals & Requirements *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      placeholder="Outline your existing website, timeline expectations, aesthetic preferences, or specific pain points..."
                      className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-sm text-white placeholder-neutral-400 focus:outline-none focus:border-cyan-400 transition-colors resize-none ${
                        errors.message ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.message && (
                      <span className="font-mono text-[11px] text-rose-400">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-neutral-950 font-mono text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 active:scale-95 transition-all duration-200 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    >
                      <span>Start a Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="text-[11px] font-mono text-neutral-400">
                      OR CHAT INSTANTLY: <a href={BRAND.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">WHATSAPP</a>
                    </div>
                  </div>
                </form>
              ) : (
                /* Honest Submission Screen with Direct WhatsApp Forwarding */
                <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
                      Project Brief Prepared!
                    </h3>
                    <p className="text-sm text-neutral-300 font-light max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-medium">{formData.name}</span> ({formData.business}). Your inquiry specifications are formatted and ready.
                    </p>
                  </div>

                  {/* WhatsApp Forwarding Card */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 max-w-md mx-auto text-left space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-neutral-400">INSTANT HANDOFF:</span>
                      <span className="text-emerald-400">RECOMMENDED</span>
                    </div>

                    <a
                      href={getWhatsAppEncodedUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Directly to WhatsApp ({BRAND.whatsapp})</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyBrief}
                      className="w-full py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Brief Copied to Clipboard!' : 'Copy Brief to Clipboard'}</span>
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                    >
                      ← Submit another inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
