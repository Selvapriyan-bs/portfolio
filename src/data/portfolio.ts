import type { PersonalInfo, Skill, Project, SocialLink, LearningItem, ChapterLink, JourneyEntry, Achievement, CodingProfile } from '@/types'

export const personalInfo: PersonalInfo = {
  name: 'Selvapriyan B',
  title: 'CSE Student & Full-Stack Developer',
  tagline: 'Engineering experiences through code',
  bio: [
    'A Computer Science Engineering student at Sri Eshwar College of Engineering who believes in building software that matters. I thrive at the intersection of problem-solving and engineering, crafting full-stack applications that are both performant and delightful.',
    'With a foundation in C, C++, Java, and Python, I specialize in modern web technologies. Every project is an opportunity to learn, build, and ship something that makes a difference.',
  ],
  location: 'Coimbatore, India',
  university: 'Sri Eshwar College of Engineering',
  degree: 'B.Tech Computer Science and Engineering',
  cgpa: '8.03',
  graduationYear: '2028',
  resumeUrl: '#',
}

export const chapterLinks: ChapterLink[] = [
  { label: 'Intro', chapter: 1 },
  { label: 'Journey', chapter: 2 },
  { label: 'Projects', chapter: 3 },
  { label: 'Stats', chapter: 4 },
  { label: 'Stack', chapter: 5 },
  { label: 'Focus', chapter: 6 },
  { label: 'Contact', chapter: 7 },
]

export const journey: JourneyEntry[] = [
  {
    year: '2024',
    title: 'Started CSE',
    description: 'Began my Computer Science journey at Sri Eshwar College of Engineering. dove into programming with C and Python.',
    icon: '🎓',
  },
  {
    year: '2025',
    title: 'Won Gameathon 2K25',
    description: 'Won the Best Idea Award at Gameathon 2K25, a college-level hackathon focused on game development and creative problem-solving.',
    icon: '🏆',
  },
  {
    year: '2025',
    title: 'Built CodeQuest',
    description: 'Developed CodeQuest, an interactive coding challenge platform with real-time evaluation, leaderboards, and timed contests.',
    icon: '⚡',
  },
  {
    year: '2025',
    title: 'Freshathon 2025 Runner-Up',
    description: 'Secured Second Place at Freshathon 2025, a competitive hackathon that tested innovation, teamwork, and technical execution.',
    icon: '🥈',
  },
  {
    year: '2026',
    title: 'Building Offline-First Systems',
    description: 'Currently architecting an offline-first library management system with PWA capabilities, background sync, and IndexedDB storage.',
    icon: '🏗️',
  },
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
    description: 'Managing investments intelligently',
    longDescription: 'Built an end-to-end business control system featuring real-time inventory tracking, sales management, purchase order processing, and interactive analytics dashboards. The system streamlines business operations with role-based access control and automated report generation.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Django', 'SQLite'],
    githubUrl: 'https://github.com/selva/business-control-system',
    category: 'Full-Stack',
    order: 1,
  },
  {
    id: 'codequest',
    title: 'CodeQuest',
    description: 'Interactive coding challenge platform',
    longDescription: 'Developed a competitive programming platform where users solve coding challenges with real-time evaluation, track progress on leaderboards, and participate in timed contests. Features multiple difficulty levels, custom test cases, and performance analytics.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
    techStack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    githubUrl: 'https://github.com/selva/codequest',
    category: 'Full-Stack',
    order: 2,
  },
  {
    id: 'offline-library-management',
    title: 'Offline-First Library System',
    description: 'PWA with background sync capabilities',
    longDescription: 'Designed a PWA-based library management system working seamlessly offline. Features include book cataloging, member management, issue/return tracking, fine calculation, and automatic sync when connectivity is restored. Uses IndexedDB and background sync APIs.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop',
    techStack: ['JavaScript', 'Service Workers', 'IndexedDB', 'CSS', 'HTML'],
    githubUrl: 'https://github.com/selva/library-management',
    category: 'PWA',
    order: 3,
  },
]

export const achievements: Achievement[] = [
  { title: 'Best Idea Award', description: 'Gameathon 2K25', icon: '🏆' },
  { title: 'Second Place', description: 'Freshathon 2025', icon: '🥈' },
]

export const codingProfiles: CodingProfile[] = [
  {
    platform: 'LeetCode',
    username: 'Selvapriyan_bs02',
    rating: '1721',
    problemsSolved: '280',
    url: 'https://leetcode.com/u/Selvapriyan_bs02',
    icon: 'leetcode',
  },
  {
    platform: 'SkillRack',
    username: 'selva',
    problemsSolved: '1295',
    url: 'https://www.skillrack.com/faces/resume.xhtml?id=515070&key=d714098d1591e4de0024f79961e8a9b17faca79d',
    icon: 'skillrack',
  },
  {
    platform: 'CodeChef',
    username: 'selvapriyanbs',
    problemsSolved: '100',
    url: 'https://www.codechef.com/users/selvapriyanbs',
    icon: 'codechef',
  },
]

export const learningItems: LearningItem[] = [
  { title: 'System Design', description: 'Distributed systems, design patterns, and architecture principles', icon: '🏗️' },
  { title: 'AI Engineering', description: 'Machine learning, neural networks, and practical AI applications', icon: '🤖' },
  { title: 'Offline-First Architectures', description: 'PWA patterns, local-first sync, and resilient design', icon: '📡' },
  { title: 'Scalable Backend Systems', description: 'Microservices, caching, message queues, and horizontal scaling', icon: '⚡' },
]

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/Selvapriyan-bs/', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/selva', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:selvapriyanbs@gmail.com', icon: 'mail' },
  { name: 'LeetCode', url: 'https://leetcode.com/u/Selvapriyan_bs02', icon: 'leetcode' },
  { name: 'CodeChef', url: 'https://www.codechef.com/users/selvapriyanbs', icon: 'codechef' },
]
