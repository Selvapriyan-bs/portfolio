import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useParallax<T extends HTMLElement>(speed: number = 0.3) {
  const ref = useRef<T>(null!)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: () => window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    }, el)

    return () => ctx.revert()
  }, [speed])

  return ref
}
