import type { PersonalInfo, Skill, Project, SocialLink, LearningItem, NavLink, Achievement, CodingProfile } from '@/types'

export const personalInfo: PersonalInfo = {
  name: 'Selvapriyan B',
  title: 'Computer Science Engineering Student & Full Stack Developer',
  tagline: 'Turning complex problems into elegant, scalable solutions',
  bio: [
    'A passionate Computer Science Engineering student with a deep love for building software that makes a difference. I thrive at the intersection of creative problem-solving and engineering excellence, crafting full-stack applications that are both performant and delightful to use.',
    'With a strong foundation in C, C++, Java, and Python, I specialize in modern web technologies like React, Node.js, and MongoDB. I believe in writing clean, maintainable code and am constantly pushing myself to learn and grow in the ever-evolving tech landscape.',
  ],

  location: 'Coimbatore, India',
  university: 'Sri Eshwar College of Engineering',
  degree: 'B.Tech Computer Science and Engineering',
  cgpa: '8.03',
  graduationYear: '2028',
  resumeUrl: '#',
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Learning', href: '#learning' },
  { label: 'Contact', href: '#contact' },
]

export const skills: Skill[] = [
  { name: 'JavaScript', icon: '📜', category: 'frontend', level: 85 },
  { name: 'ReactJS', icon: '⚛️', category: 'frontend', level: 82 },
  { name: 'Node.js', icon: '🟢', category: 'backend', level: 80 },
  { name: 'Express.js', icon: '⚡', category: 'backend', level: 78 },
  { name: 'Python', icon: '🐍', category: 'backend', level: 85 },
  { name: 'Java', icon: '☕', category: 'backend', level: 75 },
  { name: 'Django', icon: '🎯', category: 'backend', level: 72 },
  { name: 'MongoDB', icon: '🍃', category: 'database', level: 78 },
  { name: 'C', icon: '⚙️', category: 'tools', level: 80 },
  { name: 'C++', icon: '🔧', category: 'tools', level: 78 },
  { name: 'GitHub', icon: '🔀', category: 'tools', level: 88 },
  { name: 'Postman', icon: '📮', category: 'tools', level: 75 },
  { name: 'Power BI', icon: '📊', category: 'tools', level: 70 },
]

export const projects: Project[] = [
  {
    id: 'business-control-system',
    title: 'Business Control System',
    description: 'A comprehensive business management platform with inventory, sales, and analytics modules',
    longDescription: 'Built an end-to-end business control system featuring real-time inventory tracking, sales management, purchase order processing, and interactive analytics dashboards. The system streamlines business operations with role-based access control and automated report generation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Django', 'SQLite'],
    githubUrl: 'https://github.com/selva/business-control-system',
    liveUrl: '',
    featured: true,
    category: 'Full-Stack',
  },
  {
    id: 'codequest',
    title: 'CodeQuest',
    description: 'An interactive coding challenge platform with real-time evaluation and leaderboards',
    longDescription: 'Developed a competitive programming platform where users can solve coding challenges, receive real-time evaluation, track their progress on leaderboards, and participate in timed contests. Features include multiple difficulty levels, custom test cases, and performance analytics.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/selva/codequest',
    liveUrl: '',
    featured: true,
    category: 'Full-Stack',
  },
  {
    id: 'offline-library-management',
    title: 'Offline-First Library Management System',
    description: 'A Progressive Web App for library management with offline capabilities and sync',
    longDescription: 'Designed and built a PWA-based library management system that works seamlessly offline. Features include book cataloging, member management, issue/return tracking, fine calculation, and automatic sync when connectivity is restored. Uses IndexedDB for local storage and background sync APIs.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop',
    techStack: ['JavaScript', 'Service Workers', 'IndexedDB', 'CSS', 'HTML'],
    githubUrl: 'https://github.com/selva/library-management',
    liveUrl: '',
    featured: false,
    category: 'PWA',
  },
]

export const achievements: Achievement[] = [
  {
    title: 'Best Idea Award',
    description: 'Gameathon 2K25',
    icon: '🏆',
  },
  {
    title: 'Second Place',
    description: 'Freshathon 2025',
    icon: '🥈',
  },
]

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'selva',
    rating: '1721',
    problemsSolved: '280+',
    url: 'https://leetcode.com/u/Selvapriyan_bs02',
    icon: 'leetcode',
  },
  {
    platform: 'SkillRack',
    username: 'selva',
    problemsSolved: '1295+',
    url: 'https://www.skillrack.com/faces/resume.xhtml?id=515070&key=d714098d1591e4de0024f79961e8a9b17faca79d',
    icon: 'skillrack',
  },
  {
    platform: 'CodeChef',
    username: 'selva',
    problemsSolved: '100+',
    url: 'https://www.codechef.com/users/selvapriyanbs',
    icon: 'codechef',
  },
]

export const learningItems: LearningItem[] = [
  {
    title: 'Artificial Intelligence & ML',
    description: 'Exploring machine learning algorithms, neural networks, and practical AI applications',
    icon: '🤖',
    progress: 55,
    resources: ['Machine Learning Specialization', 'TensorFlow Basics', 'Kaggle Competitions'],
  },
  {
    title: 'Cloud Computing',
    description: 'Learning cloud services, deployment strategies, and scalable infrastructure',
    icon: '☁️',
    progress: 40,
    resources: ['AWS Cloud Practitioner', 'Docker & Kubernetes', 'DevOps Basics'],
  },
  {
    title: 'System Design',
    description: 'Understanding distributed systems, design patterns, and architecture principles',
    icon: '🏗️',
    progress: 35,
    resources: ['DDIA Book', 'System Design Interview Prep', 'Microservices Patterns'],
  },
  {
    title: 'Competitive Programming',
    description: 'Sharpening problem-solving skills through algorithmic challenges',
    icon: '⚔️',
    progress: 75,
    resources: ['LeetCode Daily Challenge', 'CodeChef Contests', 'CP Algorithms'],
  },
]

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/Selvapriyan-bs/',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/selva',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:selvapriyanbs@gmail.com',
    icon: 'mail',
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/u/Selvapriyan_bs02',
    icon: 'leetcode', 
  },
  {
    name: 'CodeChef',
    url: 'https://www.codechef.com/users/selvapriyanbs',
    icon: 'codechef',
  },
]
