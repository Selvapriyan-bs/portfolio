import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function SpotlightEffect() {
  const ref = useRef<HTMLDivElement>(null!)
  const smoothRef = useRef({ x: 50, y: 50 })
  const mouse = useMousePosition()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return

    const targetX = mouse.normalizedX * 50 + 50
    const targetY = mouse.normalizedY * 50 + 50

    gsap.to(smoothRef.current, {
      x: targetX,
      y: targetY,
      duration: 0.8,
      ease: 'power3.out',
      overwrite: 'auto',
      onUpdate: () => {
        if (ref.current) {
          ref.current.style.background = `
            radial-gradient(800px circle at ${smoothRef.current.x}% ${smoothRef.current.y}%, rgba(6, 182, 212, 0.08), transparent 40%),
            radial-gradient(600px circle at ${100 - smoothRef.current.x}% ${100 - smoothRef.current.y}%, rgba(139, 92, 246, 0.06), transparent 40%)
          `
        }
      },
    })
  }, [mouse, reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'soft-light' }}
    />
  )
}
