export type Profile = {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  currentStatus: string;
  focus: string;
  mindset: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl?: string;
  resumeUrl: string;
};

export type SocialLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
};

export type Education = {
  degree: string;
  institution: string;
  university: string;
  startYear: string;
  endYear: string;
  cgpa: string;
};

export type Certification = {
  title: string;
  issuer: string;
  year: string;
};

export type Achievement = {
  title: string;
  subtitle: string;
  description: string;
};

export type Leadership = {
  role: string;
  organization: string;
  description: string;
};

export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  status: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  frontend: string[];
  backend: string[];
  database?: string[];
  features: string[];
  isPublic: boolean;
  gallery: string[];
};
