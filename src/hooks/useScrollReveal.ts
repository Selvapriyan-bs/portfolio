import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal<T extends HTMLElement>(
  options?: gsap.TweenVars,
) {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, ...options },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          ...options,
        },
      )
    }, el)

    return () => ctx.revert()
  }, [options])

  return ref
}
