import { useEffect, useRef } from 'react'
import { journey } from '@/data/portfolio'
import { animateChapterTitle, animateHorizontalScroll } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Chapter2() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const trackRef = useRef<HTMLDivElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    cleanups.push(animateChapterTitle(titleRef))
    if (!reduced) {
      cleanups.push(animateHorizontalScroll(sectionRef, trackRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  return (
    <section id="chapter-2" ref={sectionRef} className="relative h-screen overflow-hidden bg-dark-light/30">
      <div ref={titleRef} className="absolute top-12 left-0 right-0 z-20 section-inner">
        <p className="ch-label chapter-label">Chapter 02</p>
        <h2 className="ch-title text-2xl md:text-4xl font-bold mt-1">My Journey</h2>
      </div>

      <div
        ref={trackRef}
        className="flex items-center h-full pt-24 pb-16"
        style={{ gap: '2rem', paddingLeft: 'clamp(2rem, 8vw, 6rem)', willChange: 'transform' }}
      >
        {journey.map((entry, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[580px] card-subtle p-8 md:p-10 hover-lift"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl">{entry.icon}</span>
              <div>
                <span className="text-sm font-mono text-primary-light">{entry.year}</span>
                <h3 className="text-xl md:text-2xl font-bold mt-0.5">{entry.title}</h3>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed text-sm md:text-base">
              {entry.description}
            </p>
            {i < journey.length - 1 && (
              <div className="mt-6 flex items-center gap-2 text-xs text-muted font-mono">
                <span className="w-8 h-px bg-primary/40" />
                <span>Next</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[10px] text-muted font-mono tracking-[0.2em]">
          DRAG TO EXPLORE &mdash; {journey.length} MILESTONES
        </p>
      </div>
    </section>
  )
}
