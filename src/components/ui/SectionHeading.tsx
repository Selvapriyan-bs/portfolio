import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { animateSectionHeading } from '@/animations'

interface SectionHeadingProps {
  label: string
  title: string
  className?: string
}

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const cleanup = animateSectionHeading(ref)
    return cleanup
  }, [])

  return (
    <div ref={ref} className={cn('mb-12 md:mb-16', className)}>
      <span className="section-label inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary-light mb-3">
        {label}
      </span>
      <h2 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
        {title}
      </h2>
      <div className="section-line mt-4 h-0.5 w-16 bg-gradient-to-r from-primary to-secondary rounded-full" />
    </div>
  )
}
