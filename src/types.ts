export type SectionId = 
  | 'hero' 
  | 'about' 
  | 'services' 
  | 'work' 
  | 'process' 
  | 'why' 
  | 'contact';

export type ServiceType = 
  | 'design' 
  | 'development' 
  | 'redesign' 
  | 'mobile' 
  | 'landing' 
  | 'maintenance';

export interface ServiceItem {
  id: ServiceType;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  techStack: string[];
  objectDescription: string;
}

export interface ProjectItem {
  id: string;
  tag: string;
  title: string;
  status: string;
  category: string;
  year: string;
  description: string;
  metrics: string;
  accent: string;
}

export interface ProcessStage {
  step: string;
  number: string;
  name: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
}

export interface ContactFormData {
  name: string;
  business: string;
  email: string;
  message: string;
  serviceInterest?: string;
}

export interface CoreEngineStats {
  rotationSpeed: number;
  particleDensity: number;
  resonanceFrequency: number;
  activeNodes: number;
  stabilityRate: number;
}
