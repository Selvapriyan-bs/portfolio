import { useEffect, useRef } from 'react'
import { BookOpen, ExternalLink, Target } from 'lucide-react'
import { learningItems } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { animateCards, animateProgressBars } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Learning() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const progressRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    if (!reduced) {
      cleanups.push(animateCards(containerRef), animateProgressBars(progressRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  return (
    <section id="learning" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-secondary/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Currently Learning"
          title="Expanding my knowledge frontier"
        />

        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningItems.map((item) => (
            <GlassCard key={item.title} className="reveal-card" glow tiltIntensity={5}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-2xl">
                    {item.icon}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-mono text-muted bg-white/5 px-2 py-1 rounded-full">
                    <Target size={12} />
                    {item.progress}%
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-muted-light mt-1.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div ref={progressRef} className="progress-group">
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="progress-fill h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      data-width={`${item.progress}%`}
                      style={{ width: reduced ? `${item.progress}%` : '0%' }}
                    />
                  </div>
                </div>

                <div className="pt-1 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <BookOpen size={12} />
                    <span className="tracking-wider uppercase font-medium">Resources</span>
                  </div>
                  <ul className="space-y-1.5">
                    {item.resources.map((resource) => (
                      <li
                        key={resource}
                        className="flex items-center gap-2 text-xs text-muted-light group cursor-default"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        {resource}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
