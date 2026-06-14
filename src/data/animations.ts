export const animationConfig = {
  hero: {
    headlineStagger: 0.04,
    headlineDuration: 0.8,
    subtitleDuration: 0.6,
    ctaStagger: 0.15,
    socialStagger: 0.08,
    indicatorDelay: 0.3,
  },
  reveal: {
    cards: {
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    },
    heading: {
      labelDuration: 0.5,
      titleDuration: 0.6,
      lineDuration: 0.8,
    },
    progress: {
      duration: 1.4,
      ease: 'power4.out',
    },
  },
  transition: {
    sectionEnter: {
      duration: 1.2,
      ease: 'power2.inOut',
    },
    sectionExit: {
      duration: 0.8,
      ease: 'power2.inOut',
    },
  },
  parallax: {
    defaultSpeed: 0.3,
    slowSpeed: 0.15,
    fastSpeed: 0.5,
  },
  particles: {
    count: window.innerWidth < 768 ? 30 : 60,
    speed: 0.3,
    size: 2,
    opacity: 0.4,
    color: '#06b6d4',
    connectionDistance: 120,
    connectionOpacity: 0.15,
  },
} as const
