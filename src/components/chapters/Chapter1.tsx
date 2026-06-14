import { useEffect, useRef } from 'react'
import { animateTextReveal } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const roles = ['Developer.', 'Builder.', 'Problem Solver.']

export function Chapter1() {
  const nameRef = useRef<HTMLHeadingElement>(null!)
  const rolesRef = useRef<HTMLDivElement>(null!)
  const taglineRef = useRef<HTMLParagraphElement>(null!)
  const indicatorRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const cleanups: (() => void)[] = []
    if (nameRef.current) cleanups.push(animateTextReveal(nameRef, 0.03))
    if (rolesRef.current) {
      const chars = rolesRef.current.querySelectorAll('.reveal-char')
      if (chars.length) {
        import('gsap').then(({ default: gsap }) => {
          gsap.fromTo(chars, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.03, delay: 0.8, ease: 'power3.out' })
        })
      }
    }
    if (taglineRef.current) {
      import('gsap').then(({ default: gsap }) => {
        gsap.fromTo(taglineRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 1.4, ease: 'power3.out' })
      })
    }
    if (indicatorRef.current) {
      import('gsap').then(({ default: gsap }) => {
        gsap.fromTo(indicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 2 })
      })
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const scrollToNext = () => {
    document.getElementById('chapter-2')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="chapter-1" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <p className="chapter-label mb-6">Chapter 01</p>

        <h1
          ref={nameRef}
          className="text-[clamp(2.5rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight mb-6"
        >
          {'SELVAPRIYAN B'.split('').map((char, i) => (
            <span
              key={i}
              className="reveal-char inline-block"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div ref={rolesRef} className="text-[clamp(1.2rem,3vw,2.5rem)] text-muted-light font-light mb-4 h-10">
          {roles.join(' ').split('').map((char, i) => (
            <span key={i} className="reveal-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>

        <p ref={taglineRef} className="text-sm md:text-base text-muted max-w-md mx-auto">
          CSE Student at Sri Eshwar College of Engineering
        </p>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center gap-3 text-muted hover:text-white transition-colors">
          <span className="text-[10px] tracking-[0.2em] font-mono">SCROLL</span>
          <i className="fas fa-arrow-down text-xs animate-bounce" />
        </div>
      </div>
    </section>
  )
}
