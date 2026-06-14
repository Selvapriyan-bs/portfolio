import { type ReactNode, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  tiltIntensity?: number
  as?: 'div' | 'section' | 'article'
  id?: string
}

export function GlassCard({
  children,
  className,
  glow = false,
  hover = true,
  tiltIntensity = 6,
  as: Component = 'div',
  id,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!)
  const shineRef = useRef<HTMLDivElement>(null!)
  const tilt = useRef({ x: 0, y: 0 })
  const device = useDeviceDetection()
  const isDisabled = !hover || device.isTouch || device.isReducedMotion

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDisabled || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    tilt.current = { x: x * tiltIntensity, y: -y * tiltIntensity }

    gsap.to(cardRef.current, {
      rotateY: x * tiltIntensity,
      rotateX: -y * tiltIntensity,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })

    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 1,
        background: `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(255,255,255,0.06), transparent 60%)`,
        duration: 0.3,
        overwrite: 'auto',
      })
    }
  }, [isDisabled, tiltIntensity])

  const handleMouseLeave = useCallback(() => {
    if (isDisabled || !cardRef.current) return
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0,
        duration: 0.4,
        overwrite: 'auto',
      })
    }
  }, [isDisabled])

  return (
    <Component
      id={id}
      ref={cardRef}
      className={cn(
        'glass rounded-2xl p-6 md:p-8',
        glow && 'glow-effect',
        !isDisabled && 'cursor-default',
        className,
      )}
      onMouseMove={isDisabled ? undefined : handleMouseMove}
      onMouseLeave={isDisabled ? undefined : handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
    >
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity"
        style={{ mixBlendMode: 'overlay' }}
      />
      {children}
    </Component>
  )
}
