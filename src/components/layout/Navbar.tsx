import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { navLinks } from '@/data/portfolio'
import { scrollToSection } from '@/lib/utils'
import { useScrollProgress } from '@/hooks/useScrollProgress'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const navRef = useRef<HTMLElement>(null!)
  const indicatorRef = useRef<HTMLDivElement>(null!)
  const { progress } = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navLinks.map((l) => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        scaleX: progress,
        duration: 0.2,
        ease: 'none',
        overwrite: 'auto',
      })
    }
  }, [progress])

  const handleNavClick = (href: string) => {
    const id = href.slice(1)
    scrollToSection(id)
    setIsOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        isScrolled
          ? 'bg-dark/80 backdrop-blur-2xl shadow-lg shadow-black/20 border-b border-glass-border'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('hero')
            }}
            className="text-xl font-bold gradient-text relative group"
          >
            Selvapriyan
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                    isActive
                      ? 'text-primary-light'
                      : 'text-muted hover:text-white',
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20" />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg glass text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div
        ref={indicatorRef}
        className="h-0.5 bg-gradient-to-r from-primary to-secondary origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-400',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="px-4 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'text-primary-light bg-primary/10'
                    : 'text-muted hover:text-white hover:bg-glass-hover',
                )}
              >
                {link.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
