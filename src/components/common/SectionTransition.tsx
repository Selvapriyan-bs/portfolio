import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
  variant?: 'gradient' | 'wave' | 'fade'
}

export function SectionTransition({ variant = 'gradient' }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        },
      )
    }, ref)

    return () => ctx.revert()
  }, [])

  if (variant === 'wave') {
    return (
      <div ref={ref} className="relative h-24 md:h-32 overflow-hidden -mb-1">
        <svg
          viewBox="0 0 1440 120"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C360,120 720,0 1440,60 L1440,120 L0,120 Z"
            fill="url(#wave-gradient)"
            opacity={0.3}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent origin-left mx-auto max-w-4xl"
      style={{ transform: 'scaleX(0)' }}
    />
  )
}
