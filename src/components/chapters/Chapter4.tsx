import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { codingProfiles } from '@/data/portfolio'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateChapterTitle, animateCounter } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 280, suffix: '+', label: 'LeetCode Problems', platform: 'LeetCode' },
  { value: 1295, suffix: '+', label: 'SkillRack Problems', platform: 'SkillRack' },
  { value: 1721, suffix: '', label: 'LeetCode Rating', platform: 'Rating' },
  { value: 100, suffix: '+', label: 'CodeChef Problems', platform: 'CodeChef' },
]

export function Chapter4() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const titleRef = useRef<HTMLDivElement>(null!)
  const countRefs = useRef<(HTMLDivElement | null)[]>([])
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    cleanups.push(animateChapterTitle(titleRef))

    if (!reduced) {
      const ctx = gsap.context(() => {
        countRefs.current.forEach((el, i) => {
          if (!el) return
          const target = stats[i]
          const num = el.querySelector('.stat-number') as HTMLElement
          if (!num) return

          animateCounter(num, 0, target.value, target.suffix, 2.5)
        })

        gsap.fromTo('.stat-card', { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', toggleActions: 'play none none reverse' },
        })
      }, sectionRef)

      cleanups.push(() => ctx.revert())
    }

    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const setCountRef = (i: number) => (el: HTMLDivElement | null) => { countRefs.current[i] = el }

  return (
    <section id="chapter-4" ref={sectionRef} className="relative min-h-screen py-32 flex items-center">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="section-inner w-full">
        <div ref={titleRef} className="mb-16">
          <p className="ch-label chapter-label">Chapter 04</p>
          <h2 className="ch-title text-2xl md:text-4xl font-bold mt-1">Problem Solver</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={setCountRef(i)}
              className="stat-card card-subtle p-8 text-center"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                <span className="stat-number">0</span>
              </div>
              <p className="text-sm text-muted-light">{stat.label}</p>
              <div className="mt-3 flex justify-center">
                <span className="w-8 h-px bg-primary/30" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {codingProfiles.map((profile) => (
            <a
              key={profile.platform}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="stat-card inline-flex items-center gap-3 px-5 py-3 card-subtle hover-lift text-sm"
            >
              <SocialIcon name={profile.icon} size={18} />
              <span className="text-muted-light">{profile.platform}</span>
              <span className="w-1 h-1 rounded-full bg-primary/50" />
              <span className="text-primary-light font-medium">{profile.problemsSolved}+</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
