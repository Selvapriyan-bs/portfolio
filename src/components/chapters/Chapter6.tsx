import { useEffect, useRef } from 'react'
import { learningItems } from '@/data/portfolio'
import { animateChapterTitle, animateCardsStagger } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Chapter6() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    cleanups.push(animateChapterTitle(titleRef))
    if (!reduced) {
      cleanups.push(animateCardsStagger(sectionRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  return (
    <section id="chapter-6" ref={sectionRef} className="relative min-h-screen py-32 flex items-center">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="section-inner w-full">
        <div ref={titleRef} className="mb-16">
          <p className="ch-label chapter-label">Chapter 06</p>
          <h2 className="ch-title text-2xl md:text-4xl font-bold mt-1">Current Focus</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {learningItems.map((item, i) => (
            <div key={item.title} className="stagger-card card-subtle p-6 md:p-8 hover-lift flex items-start gap-5">
              <span className="text-2xl flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                {item.icon}
              </span>
              <div>
                <h3 className="text-lg font-semibold mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-light leading-relaxed">{item.description}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted font-mono">
                  <span className="w-6 h-px bg-primary/30" />
                  <span>Currently exploring</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
