import { type ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'

interface GlassButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  magnetic?: boolean
  target?: string
  rel?: string
}

export function GlassButton({
  children,
  onClick,
  href,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  magnetic = true,
  target,
  rel,
}: GlassButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null!)
  const linkRef = useRef<HTMLAnchorElement>(null!)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic) return
    const ref = href ? linkRef.current : btnRef.current
    if (!ref) return
    const rect = ref.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    ref.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    const ref = href ? linkRef.current : btnRef.current
    if (!ref) return
    ref.style.transform = 'translate(0, 0)'
  }

  const baseStyles = cn(
    'inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-300',
    'backdrop-blur-xl border',
    size === 'sm' && 'px-4 py-2 text-sm',
    size === 'md' && 'px-6 py-3 text-base',
    size === 'lg' && 'px-8 py-4 text-lg',
    variant === 'primary' &&
      'bg-primary/20 border-primary/30 text-primary-light hover:bg-primary/30 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20',
    variant === 'secondary' &&
      'bg-secondary/20 border-secondary/30 text-secondary-light hover:bg-secondary/30 hover:border-secondary/50 hover:shadow-lg hover:shadow-secondary/20',
    variant === 'ghost' &&
      'bg-glass border-glass-border text-muted-light hover:bg-glass-hover hover:border-glass-border hover:text-white',
    className,
  )

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        ref={linkRef}
        href={href}
        target={target}
        rel={rel}
        className={baseStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {content}
    </button>
  )
}
