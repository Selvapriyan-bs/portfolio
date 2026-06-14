import { useEffect, useRef } from 'react'
import { skills } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { animateCards, animateProgressBars } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getSkillCategoryColor, getSkillCategoryLabel } from '@/lib/utils'

const categories = ['frontend', 'backend', 'database', 'tools', 'cloud'] as const

export function Skills() {
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
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Skills & Expertise"
          title="Technologies I work with"
        />

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categorySkills = skills.filter((s) => s.category === category)
            return (
              <GlassCard
                key={category}
                className="reveal-card"
                glow
              >
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getSkillCategoryColor(category)} flex items-center justify-center text-lg`}>
                      {categorySkills[0]?.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {getSkillCategoryLabel(category)}
                      </h3>
                      <p className="text-xs text-muted">
                        {categorySkills.length} technologies
                      </p>
                    </div>
                  </div>

                  <div ref={progressRef} className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="progress-group space-y-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5 text-muted-light">
                            <span>{skill.icon}</span>
                            {skill.name}
                          </span>
                          <span className="text-xs font-mono text-muted flex items-center gap-1">
                            <span className="progress-count" data-target={skill.level}>0</span>
                            <span>%</span>
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="progress-fill h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            data-width={`${skill.level}%`}
                            style={{ width: reduced ? `${skill.level}%` : '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
