import { personalInfo } from '@/data/portfolio'
import { scrollToSection } from '@/lib/utils'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-1.5">
            Built with <i className="fas fa-heart text-sm text-red-400" /> by
            <span className="text-white font-medium">{personalInfo.name}</span>
          </p>

          <p className="text-sm text-muted">
            &copy; {year} All rights reserved.
          </p>

          <button
            onClick={() => scrollToSection('chapter-1')}
            className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors duration-300"
          >
            Back to top
            <i className="fas fa-arrow-up text-sm" />
          </button>
        </div>
      </div>
    </footer>
  )
}
