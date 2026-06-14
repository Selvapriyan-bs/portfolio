import { useEffect, useRef } from 'react'
import { skills } from '@/data/portfolio'
import { animateChapterTitle, animateCardsStagger } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const categories = [
  { key: 'frontend', label: 'Frontend', color: 'from-violet-500 to-purple-500' },
  { key: 'backend', label: 'Backend', color: 'from-blue-500 to-indigo-500' },
  { key: 'database', label: 'Database', color: 'from-emerald-500 to-teal-500' },
  { key: 'tools', label: 'Tools & More', color: 'from-amber-500 to-orange-500' },
] as const

export function Chapter5() {
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
    <section id="chapter-5" ref={sectionRef} className="relative min-h-screen py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />

      <div className="section-inner">
        <div ref={titleRef} className="mb-16">
          <p className="ch-label chapter-label">Chapter 05</p>
          <h2 className="ch-title text-2xl md:text-4xl font-bold mt-1">Technology Stack</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {categories.map((cat) => {
            const catSkills = skills.filter((s) => s.category === cat.key)
            return (
              <div key={cat.key} className="stagger-card card-subtle p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-sm font-bold text-white`}>
                    {catSkills.length}
                  </div>
                  <h3 className="font-semibold">{cat.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className="group relative px-3 py-1.5 text-sm rounded-lg bg-white/[0.03] border border-white/[0.06] text-muted-light hover:text-white hover:border-primary/30 hover:bg-primary/[0.05] transition-all duration-300"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>{skill.icon}</span>
                        {skill.name}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
