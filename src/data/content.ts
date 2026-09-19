import { ServiceItem, ProjectItem, ProcessStage } from '../types';

export const BRAND = {
  name: 'TECHDEVS',
  tagline: 'Build. Design. Grow.',
  phone: '+91 9433731324',
  phoneHref: 'tel:+919433731324',
  whatsapp: '+91 9433731324',
  whatsappHref: 'https://wa.me/919433731324',
  year: '2026',
  socials: [
    { name: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'GitHub', href: 'https://github.com' },
    { name: 'Instagram', href: 'https://instagram.com' },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'design',
    number: '01',
    title: 'Website Design',
    subtitle: 'High-aesthetic spatial interfaces & art direction',
    description:
      'We engineer bespoke digital identities crafted for brand authority. Dimensional layouts, balanced negative space, refined typography, and intentional motion that elevate your business beyond templates.',
    features: [
      'Custom art direction & UI/UX wireframing',
      'High-contrast typography & palette design',
      'Micro-interactions & motion choreography',
      'Responsive multi-viewport design systems',
    ],
    techStack: ['Figma', 'Spatial Prototyping', 'Design Systems', 'Micro-Animations'],
    objectDescription: 'Polyhedral wireframe geometry with glowing vertex nodes',
  },
  {
    id: 'development',
    number: '02',
    title: 'Website Development',
    subtitle: 'Performant, scalable, modern web architecture',
    description:
      'Engineered with modern frameworks, WebGL visual computing, and sub-second loading speeds. We construct clean, modular codebases designed to handle high traffic and high conversion.',
    features: [
      'React & Next.js production architecture',
      'WebGL / Three.js 3D dimensional integration',
      'Sub-second first contentful paint (FCP)',
      'Clean modular TypeScript codebases',
    ],
    techStack: ['React', 'TypeScript', 'Three.js', 'Vite / Next', 'Tailwind'],
    objectDescription: 'Structured digital voxel architecture with pulsating data bus lines',
  },
  {
    id: 'redesign',
    number: '03',
    title: 'Website Redesign',
    subtitle: 'Radical modernization of outdated digital presence',
    description:
      'Transform clunky, slow, or generic legacy sites into razor-sharp, modern conversion powerhouses. We audit existing drop-offs and reconstruct the complete user journey.',
    features: [
      'UX audit & conversion friction elimination',
      'Complete aesthetic modernization',
      'Performance overhaul & asset optimization',
      'Zero-downtime transition & SEO preservation',
    ],
    techStack: ['UX Analysis', 'Core Web Vitals', 'Modern Stack Migration'],
    objectDescription: 'Kinetic fractured crystalline structure that continuously assembles',
  },
  {
    id: 'mobile',
    number: '04',
    title: 'Mobile-First Development',
    subtitle: 'Fluid ergonomics engineered for touch devices',
    description:
      'Over 65% of your customers visit from mobile devices. We architect touch-first experiences with 44px+ hit targets, fluid gestures, adaptive graphics, and zero horizontal drift.',
    features: [
      'Fluid gesture & touch ergonomics',
      'Adaptive GPU rendering for mobile chips',
      'App-like responsive transitions',
      'Zero horizontal overflow guarantees',
    ],
    techStack: ['Touch Ergonomics', 'Dynamic Viewport', 'PWA / Mobile Web'],
    objectDescription: 'Floating glass smartphone chassis displaying layered holographic UI',
  },
  {
    id: 'landing',
    number: '05',
    title: 'Business Landing Pages',
    subtitle: 'High-conversion single-objective destinations',
    description:
      'Laser-focused landing pages built to turn traffic into qualified client inquiries. Clear value propositions, compelling visual hooks, and zero cognitive friction.',
    features: [
      'Conversion-targeted visual hierarchy',
      'Frictionless lead capture architecture',
      'Fast global CDN deployment',
      'A/B test ready modular layout',
    ],
    techStack: ['Conversion CRO', 'Edge Hosting', 'Form Validation', 'Analytics'],
    objectDescription: 'Geometric convergent portal cone focusing light through focal rings',
  },
  {
    id: 'maintenance',
    number: '06',
    title: 'Website Maintenance',
    subtitle: 'Continuous optimization, security, and uptime',
    description:
      'A website is a living operational asset. We provide continuous performance monitoring, dependency patches, security auditing, and continuous iterative enhancements.',
    features: [
      'Continuous uptime & performance monitoring',
      'Security patch deployments & framework upgrades',
      'Ongoing speed audits & CDN optimization',
      'Priority technical support & feature expansion',
    ],
    techStack: ['Uptime Monitoring', 'Security Hardening', 'Continuous Delivery'],
    objectDescription: 'Shielded digital core orbited by synchronized telemetry satellites',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'proj-01',
    tag: 'PROJECT 01',
    title: 'Vanguard Motion Experience',
    status: 'Coming Soon',
    category: 'Kinetic WebGL Platform',
    year: '2026',
    description:
      'An immersive 3D digital environment featuring real-time physics, dynamic shader materials, and volumetric light simulation.',
    metrics: 'Active Build Stage',
    accent: '#818cf8',
  },
  {
    id: 'proj-02',
    tag: 'PROJECT 02',
    title: 'Aetheria Digital Commerce',
    status: 'Coming Soon',
    category: 'Spatial Brand Storefront',
    year: '2026',
    description:
      'A high-end architectural portfolio and digital retail showcase combining tactile typography with interactive 3D product previews.',
    metrics: 'Prototype Verification',
    accent: '#38bdf8',
  },
  {
    id: 'proj-03',
    tag: 'PROJECT 03',
    title: 'Nexus System Architecture',
    status: 'Coming Soon',
    category: 'Enterprise Technical Portal',
    year: '2026',
    description:
      'Ultra-dense interactive telemetry dashboard and corporate presence built with WebGL data visualizers and microsecond responsiveness.',
    metrics: 'Architectural Synthesis',
    accent: '#34d399',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: 'STAGE 01',
    number: '01',
    name: 'DISCOVER',
    title: 'Deep Discovery & Alignment',
    description:
      'We dissect your business model, customer psychology, brand positioning, and conversion objectives before writing a line of code or design.',
    deliverables: ['Strategic Blueprint', 'Audience & Competitor Audit', 'Technical Architecture Plan'],
    duration: 'Week 1',
  },
  {
    step: 'STAGE 02',
    number: '02',
    name: 'DESIGN',
    title: 'Visual Direction & UX Choreography',
    description:
      'We craft high-fidelity prototypes, 3D digital elements, typographic hierarchies, and interactive micro-motions tailored to your company.',
    deliverables: ['Interactive Prototypes', 'Spatial 3D Asset Direction', 'Design System Library'],
    duration: 'Week 2',
  },
  {
    step: 'STAGE 03',
    number: '03',
    name: 'DEVELOP',
    title: 'Clean Engineering & Performance',
    description:
      'We build the application using modern React, Three.js, and TypeScript. Zero bloated plugins, pristine responsiveness, and sub-second load times.',
    deliverables: ['Production WebGL/React Codebase', 'Fluid Touch Optimization', 'Core Web Vitals Pass'],
    duration: 'Week 3-4',
  },
  {
    step: 'STAGE 04',
    number: '04',
    name: 'LAUNCH',
    title: 'Precision Deployment & Calibration',
    description:
      'We deploy to high-speed global edge networks, calibrate analytics, configure SEO meta layers, and verify rock-solid stability across all viewports.',
    deliverables: ['Global Edge Deployment', 'SEO Verification', 'Full Handover & Documentation'],
    duration: 'Final Review',
  },
];

export const WHY_ITEMS = [
  {
    title: 'CUSTOM',
    tagline: 'No cookie-cutter templates.',
    description: 'Every interface is conceived from scratch to reflect your exact brand positioning and technical requirements.',
  },
  {
    title: 'MODERN',
    tagline: "Designed for today's web.",
    description: 'We harness current WebGL, high-contrast typography, and fluid motion design that sets you leagues apart from competitors.',
  },
  {
    title: 'RESPONSIVE',
    tagline: 'Built for phones, tablets and desktops.',
    description: 'Meticulously tested across small mobile screens, high-DPI tablets, laptops, and ultra-wide desktop monitors.',
  },
  {
    title: 'PERFORMANCE',
    tagline: 'Fast, optimized experiences.',
    description: 'Aggressive asset compression, GPU capability scaling, and clean semantic code for rapid first-paint benchmarks.',
  },
  {
    title: 'COLLABORATIVE',
    tagline: "Built around the client's actual needs.",
    description: 'Direct communication, transparent milestones, and genuine technical partnership without agency bureaucracy.',
  },
];
