import { useEffect, useRef, useState } from 'react'
import { projects } from '@/data/portfolio'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateChapterTitle, animateCardsStagger } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Chapter3() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    cleanups.push(animateChapterTitle(titleRef))
    if (!reduced) {
      cleanups.push(animateCardsStagger(sectionRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const active = projects.find((p) => p.id === activeProject)

  return (
    <section id="chapter-3" ref={sectionRef} className="relative min-h-screen py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="section-inner">
        <div ref={titleRef} className="mb-16">
          <p className="ch-label chapter-label">Chapter 03</p>
          <h2 className="ch-title text-2xl md:text-4xl font-bold mt-1">What I Build</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.sort((a, b) => a.order - b.order).map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className="stagger-card card-subtle p-6 md:p-8 text-left group cursor-pointer hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl md:text-6xl font-black text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                  {String(project.order).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-primary-light transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-light leading-relaxed">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="px-2 py-0.5 text-[10px] font-mono text-muted bg-white/5 rounded">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="px-2 py-0.5 text-[10px] font-mono text-muted bg-white/5 rounded">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={() => setActiveProject(null)} />
          <div className="relative z-10 w-[90vw] max-w-4xl max-h-[85vh] overflow-y-auto card-subtle p-8 md:p-12 m-4">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <i className="fas fa-times text-lg" />
            </button>

            <div className="flex items-start gap-4 mb-2">
              <span className="text-5xl font-black text-primary/20 leading-none">{String(active.order).padStart(2, '0')}</span>
              <span className="text-xs font-mono text-primary-light uppercase tracking-wider">{active.category}</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-bold mb-2">{active.title}</h2>
            <p className="text-muted-light leading-relaxed mb-6">{active.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {active.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary-light border border-primary/20">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={active.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
              >
                <SocialIcon name="github" size={16} />
                View Source
              </a>
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-card-border text-sm text-muted-light hover:text-white hover:border-primary/30 transition-colors"
                >
                  <i className="fas fa-external-link-alt text-sm" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
