export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string[];
  location: string;
  university: string;
  degree: string;
  cgpa: string;
  graduationYear: string;
  resumeUrl: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level: number;
}

export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'cloud';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: string;
}

export interface Achievement {
  title: string;
  description: string;
  icon: string;
}

export interface CodingProfile {
  platform: string;
  username: string;
  rating?: string;
  problemsSolved: string;
  url: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface LearningItem {
  title: string;
  description: string;
  icon: string;
  progress: number;
  resources: string[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}
