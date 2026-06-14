import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { socialLinks } from '@/data/portfolio'
import { SocialIcon } from '@/components/common/SocialIcon'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Chapter7() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const headlineRef = useRef<HTMLHeadingElement>(null!)
  const formRef = useRef<HTMLFormElement>(null!)
  const socialRef = useRef<HTMLDivElement>(null!)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.reveal-char')
        if (chars.length) {
          gsap.fromTo(chars, { y: 80, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.02, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none reverse' },
          })
        }
      }

      if (formRef.current) {
        gsap.fromTo(formRef.current, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        })
      }

      if (socialRef.current) {
        gsap.fromTo(socialRef.current.children, { y: 20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: socialRef.current, start: 'top 90%', toggleActions: 'play none none reverse' },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  const headline = "Let's Build Something Amazing."

  return (
    <section id="chapter-7" ref={sectionRef} className="relative min-h-screen py-32 flex items-center">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] via-transparent to-transparent" />

      <div className="section-inner w-full">
        <h1
          ref={headlineRef}
          className="text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.05] tracking-tight mb-12 max-w-4xl"
        >
          {headline.split('').map((char, i) => (
            <span key={i} className="reveal-char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block' }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          <div className="md:col-span-3">
            {sent ? (
              <div className="card-subtle p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-check text-[32px] text-primary-light leading-none" />
                </div>
                <h3 className="text-xl font-bold mb-1">Message Sent!</h3>
                <p className="text-sm text-muted-light">I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-muted/40 outline-none focus:border-primary/40 focus:bg-primary/[0.03] transition-all duration-300 text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState((p) => ({ ...p, email: e.target.value }))}
                      placeholder="Your email"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-muted/40 outline-none focus:border-primary/40 focus:bg-primary/[0.03] transition-all duration-300 text-sm"
                    />
                  </div>
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-muted/40 outline-none focus:border-primary/40 focus:bg-primary/[0.03] transition-all duration-300 text-sm resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <i className="fas fa-paper-plane text-sm" />
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div ref={socialRef} className="md:col-span-2 space-y-4">
            <p className="text-xs text-muted font-mono tracking-wider uppercase">Connect</p>
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-muted-light hover:text-white hover:border-primary/30 hover:bg-primary/[0.05] transition-all duration-300"
              >
                <SocialIcon name={link.icon} size={18} />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
