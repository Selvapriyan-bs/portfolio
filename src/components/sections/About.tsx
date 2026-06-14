import { useEffect, useRef } from 'react'
import { MapPin, GraduationCap, Calendar, Download, Code2, Award, Target, Trophy } from 'lucide-react'
import { personalInfo, achievements, codingProfiles } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateCards, animateSectionEnter } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function About() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLDivElement>(null!)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    if (!reduced) {
      cleanups.push(animateCards(containerRef), animateSectionEnter(sectionRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const infoCards = [
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: personalInfo.location,
    },
    {
      icon: <GraduationCap size={18} />,
      label: 'University',
      value: personalInfo.university,
    },
    {
      icon: <Calendar size={18} />,
      label: 'Graduation',
      value: `${personalInfo.degree} \u2022 ${personalInfo.graduationYear}`,
    },
  ]

  return (
    <section id="about" className="section-padding relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="About Me"
          title="Passionate about crafting digital experiences"
        />

        <div ref={containerRef} className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 reveal-card">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-xl opacity-50" />
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 flex flex-col items-center justify-center text-center min-h-[280px]">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-primary/30">
                  SB
                </div>
                <h3 className="text-xl font-bold">{personalInfo.name}</h3>
                <p className="text-sm text-muted-light mt-1">{personalInfo.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              <GlassCard className="reveal-card text-center py-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary-light mb-2">
                  <Award size={20} />
                </span>
                <p className="text-xl font-bold gradient-text">8.03</p>
                <p className="text-xs text-muted">CGPA</p>
              </GlassCard>
              <GlassCard className="reveal-card text-center py-4">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/10 text-secondary-light mb-2">
                  <Code2 size={20} />
                </span>
                <p className="text-xl font-bold gradient-text">{codingProfiles.reduce((a, b) => a + parseInt(b.problemsSolved), 0)}+</p>
                <p className="text-xs text-muted">Problems Solved</p>
              </GlassCard>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <GlassCard className="reveal-card" glow>
              <div className="space-y-4">
                {personalInfo.bio.map((paragraph, i) => (
                  <p key={i} className="text-muted-light leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </GlassCard>

            <div className="grid sm:grid-cols-3 gap-4">
              {infoCards.map((card, i) => (
                <GlassCard
                  key={card.label}
                  className="reveal-card text-center sm:text-left"
                  glow={i === 0}
                >
                  <div className="flex sm:block items-center gap-3 sm:space-y-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary-light flex-shrink-0">
                      {card.icon}
                    </span>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">{card.label}</p>
                      <p className="text-sm font-medium mt-0.5">{card.value}</p>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            <GlassCard className="reveal-card">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} className="text-primary-light" />
                <h3 className="font-semibold">Achievements</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-glass-border"
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="text-sm font-medium">{achievement.title}</p>
                      <p className="text-xs text-muted">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="reveal-card">
              <div className="flex items-center gap-2 mb-4">
                <Target size={18} className="text-primary-light" />
                <h3 className="font-semibold">Coding Profiles</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-3">
                {codingProfiles.map((profile) => (
                  <a
                    key={profile.platform}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-glass-border hover:bg-glass-hover hover:border-primary/30 transition-all duration-300 group"
                  >
                    <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 text-primary-light flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <SocialIcon name={profile.icon} size={18} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{profile.platform}</p>
                      <p className="text-xs text-muted truncate">
                        {profile.rating ? `${profile.rating} \u2022 ` : ''}{profile.problemsSolved}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>

            <div className="reveal-card flex justify-start">
              <GlassButton
                variant="primary"
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download size={18} />}
              >
                Download Resume
              </GlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
