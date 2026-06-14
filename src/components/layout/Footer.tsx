import { Heart, ArrowUp } from 'lucide-react'
import { personalInfo } from '@/data/portfolio'
import { scrollToSection } from '@/lib/utils'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-1.5">
            Built with <Heart size={14} className="text-red-400 fill-red-400" /> by
            <span className="text-white font-medium">{personalInfo.name}</span>
          </p>

          <p className="text-sm text-muted">
            &copy; {year} All rights reserved.
          </p>

          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors duration-300"
          >
            Back to top
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
