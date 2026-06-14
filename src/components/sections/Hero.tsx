import { useEffect, useRef, useState } from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { personalInfo, socialLinks } from '@/data/portfolio'
import { GlassButton } from '@/components/ui/GlassButton'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateHero } from '@/animations'
import { useTypingEffect } from '@/hooks/useTypingEffect'
import { useParallax } from '@/hooks/useParallax'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { scrollToSection } from '@/lib/utils'

const tags = [
  'Full-Stack Developer',
  'UI/UX Enthusiast',
  'Open Source Contributor',
  'Problem Solver',
]

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null!)
  const subtitleRef = useRef<HTMLParagraphElement>(null!)
  const ctaRef = useRef<HTMLDivElement>(null!)
  const socialRef = useRef<HTMLDivElement>(null!)
  const indicatorRef = useRef<HTMLDivElement>(null!)
  const tagRef = useRef<HTMLDivElement>(null!)
  const badgeRef = useRef<HTMLDivElement>(null!)
  const parallaxRef = useParallax<HTMLDivElement>(0.15)
  const [mounted, setMounted] = useState(false)
  const reduced = useReducedMotion()

  const { text: typingText } = useTypingEffect({
    texts: tags,
    typingSpeed: 60,
    deletingSpeed: 30,
    pauseDuration: 2000,
  })

  useEffect(() => {
    setMounted(true)
    if (reduced) return
    const cleanup = animateHero(headlineRef, subtitleRef, ctaRef, socialRef, indicatorRef)

    if (badgeRef.current) {
      gsap.fromTo(
        badgeRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', delay: 0.3 },
      )
    }

    return cleanup
  }, [reduced])

  const nameChars = personalInfo.name.split('')

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div ref={parallaxRef} className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent rounded-full blur-[128px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted-light mb-8 border border-primary/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <Sparkles size={14} className="text-primary" />
          <span>Computer Science Student &amp; Developer</span>
        </div>

        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6"
        >
          {mounted && nameChars.map((char, i) => (
            <span
              key={i}
              className="hero-char inline-block gradient-text"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div ref={tagRef}>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl lg:text-2xl text-muted-light mb-4 h-8"
          >
            <span className="inline-block min-w-[2px]">{typingText}</span>
            <span className="animate-pulse">|</span>
          </p>

          <p className="text-base text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            {personalInfo.tagline}
          </p>
        </div>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <span className="hero-cta-item">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </GlassButton>
          </span>
          <span className="hero-cta-item">
            <GlassButton
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </GlassButton>
          </span>
          <span className="hero-cta-item">
            <GlassButton
              variant="ghost"
              size="lg"
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </GlassButton>
          </span>
        </div>

        <div ref={socialRef} className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-item flex items-center justify-center w-12 h-12 rounded-xl glass text-muted-light hover:text-white hover:bg-glass-hover hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              aria-label={link.name}
            >
              <SocialIcon name={link.icon} size={20} />
            </a>
          ))}
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center gap-2 text-muted hover:text-white transition-colors duration-300 group"
          aria-label="Scroll to about section"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-glass-border flex items-start justify-center p-1.5 group-hover:border-primary/50 transition-colors duration-300">
            <div className="w-1 h-2 rounded-full bg-muted animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  )
}
