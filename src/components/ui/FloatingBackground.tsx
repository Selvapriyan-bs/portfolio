import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface FloatingBackgroundProps {
  count?: number
}

export function FloatingBackground({ count = 5 }: FloatingBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    const elements = ref.current.querySelectorAll<HTMLElement>('.float-element')
    if (!elements.length) return

    elements.forEach((el, i) => {
      const xRange = 30 + Math.random() * 40
      const yRange = 20 + Math.random() * 30
      const duration = 4 + Math.random() * 4

      gsap.to(el, {
        x: () => gsap.utils.random(-xRange, xRange),
        y: () => gsap.utils.random(-yRange, yRange),
        scale: () => gsap.utils.random(0.8, 1.2),
        rotation: () => gsap.utils.random(-15, 15),
        duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5,
      })
    })

    return () => {
      gsap.killTweensOf('.float-element')
    }
  }, [reduced, count])

  const shapes = [
    { size: 60, blur: 'blur-3xl', bg: 'bg-primary/10' },
    { size: 80, blur: 'blur-3xl', bg: 'bg-secondary/10' },
    { size: 40, blur: 'blur-2xl', bg: 'bg-accent/10' },
    { size: 100, blur: 'blur-3xl', bg: 'bg-primary/5' },
    { size: 50, blur: 'blur-2xl', bg: 'bg-secondary/5' },
  ]

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {shapes.slice(0, count).map((shape, i) => (
        <div
          key={i}
          className={`float-element absolute rounded-full ${shape.blur} ${shape.bg}`}
          style={{
            width: shape.size * 1.5,
            height: shape.size * 1.5,
            left: `${15 + i * 18}%`,
            top: `${10 + (i * 20) % 80}%`,
          }}
        />
      ))}
    </div>
  )
}
