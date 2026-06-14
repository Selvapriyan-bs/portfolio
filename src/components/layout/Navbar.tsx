import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { chapterLinks } from '@/data/portfolio'

export function Navbar() {
  const [active, setActive] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      const chapters = [1, 2, 3, 4, 5, 6, 7]
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(`chapter-${chapters[i]}`)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200) {
            setActive(chapters[i])
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (chapter: number) => {
    document.getElementById(`chapter-${chapter}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
      isScrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/[0.05]' : 'bg-transparent',
    )}>
      <div className="section-inner">
        <div className="flex items-center justify-between h-14 md:h-16">
          <button
            onClick={() => scrollTo(1)}
            className="text-sm font-semibold text-white hover:text-primary-light transition-colors"
          >
            <span className="hidden sm:inline">Selvapriyan</span>
            <span className="sm:hidden">SB</span>
            <span className="text-primary-light ml-1">.</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {chapterLinks.map((link) => (
              <button
                key={link.chapter}
                onClick={() => scrollTo(link.chapter)}
                className={cn(
                  'px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300',
                  active === link.chapter
                    ? 'text-primary-light bg-primary/10'
                    : 'text-muted hover:text-white',
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {chapterLinks.slice(0, 7).map((link) => (
              <button
                key={link.chapter}
                onClick={() => scrollTo(link.chapter)}
                className={cn(
                  'md:hidden w-1.5 h-1.5 rounded-full transition-all duration-300',
                  active === link.chapter ? 'bg-primary-light w-3' : 'bg-white/20',
                )}
                aria-label={`Chapter ${link.chapter}`}
              />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
