import { useEffect, useRef } from 'react'
import { ExternalLink, ArrowUpRight, Star } from 'lucide-react'
import { projects } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateCards, animateSectionEnter } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    if (!reduced) {
      cleanups.push(
        animateCards(containerRef, 0.15),
        animateSectionEnter(sectionRef),
      )
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-padding relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Projects"
          title="Featured work & side projects"
        />

        <div ref={containerRef} className="space-y-8">
          {featuredProjects.map((project) => (
            <GlassCard
              key={project.id}
              className="reveal-card overflow-hidden group"
              glow
              tiltIntensity={4}
              as="article"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10" />
                  <div className="absolute inset-0 bg-dark/30 z-10" />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative w-full h-full object-cover rounded-xl transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 z-20">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass text-xs font-medium text-primary-light">
                      <Star size={12} className="fill-primary-light" />
                      Featured
                    </span>
                  </div>
                </div>

                <div className="space-y-4 md:pr-4">
                  <div>
                    <span className="inline-block text-xs font-semibold uppercase tracking-wider text-primary-light mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-light leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary-light border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <GlassButton
                      variant="primary"
                      size="sm"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<SocialIcon name="github" size={16} />}
                    >
                      Source
                    </GlassButton>
                    {project.liveUrl && (
                      <GlassButton
                        variant="ghost"
                        size="sm"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={<ExternalLink size={16} />}
                      >
                        Live Demo
                      </GlassButton>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}

          {otherProjects.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <GlassCard
                  key={project.id}
                  className="reveal-card group"
                  tiltIntensity={5}
                  as="article"
                >
                  <div className="relative rounded-xl overflow-hidden aspect-video mb-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-60" />
                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-8 h-8 rounded-lg glass text-muted-light hover:text-white hover:bg-glass-hover transition-all duration-300"
                        aria-label="View source"
                      >
                        <SocialIcon name="github" size={14} />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-8 h-8 rounded-lg glass text-muted-light hover:text-white hover:bg-glass-hover transition-all duration-300"
                          aria-label="View live"
                        >
                          <ArrowUpRight size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-light">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-light leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-muted-light border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
