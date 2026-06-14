import { useEffect, useRef, useState } from 'react'
import { Send, Mail, MapPin, CheckCircle, Phone } from 'lucide-react'
import { personalInfo, socialLinks } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlassCard } from '@/components/ui/GlassCard'
import { GlassButton } from '@/components/ui/GlassButton'
import { SocialIcon } from '@/components/common/SocialIcon'
import { animateCards, animateSectionEnter } from '@/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const sectionRef = useRef<HTMLDivElement>(null!)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cleanups: (() => void)[] = []
    if (!reduced) {
      cleanups.push(animateCards(containerRef), animateSectionEnter(sectionRef))
    }
    return () => cleanups.forEach((fn) => fn())
  }, [reduced])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl bg-white/5 border transition-all duration-300 text-white placeholder:text-muted/40 outline-none ${
      focused === field
        ? 'border-primary/50 ring-1 ring-primary/30 shadow-lg shadow-primary/5'
        : 'border-glass-border'
    }`

  const contactLinks = [
    {
      icon: <Mail size={16} />,
      label: 'Email',
      value: 'selvapriyanbs@gmail.com',
      href: 'mailto:selvapriyanbs@gmail.com',
    },
    {
      icon: <MapPin size={16} />,
      label: 'Location',
      value: personalInfo.location,
    },
    {
      icon: <Phone size={16} />,
      label: 'Availability',
      value: 'Open to opportunities',
    },
  ]

  return (
    <section id="contact" className="section-padding relative" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
          label="Get In Touch"
        <SectionHeading
          title="Let's build something amazing together"
        />

        <div ref={containerRef} className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 reveal-card">
            <GlassCard>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <CheckCircle size={40} className="text-primary-light" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-light max-w-sm">
                    Thank you for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-muted-light font-medium flex items-center gap-1.5">
                        Name <span className="text-primary-light">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="John Doe"
                        className={inputClass('name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-muted-light font-medium flex items-center gap-1.5">
                        Email <span className="text-primary-light">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="john@example.com"
                        className={inputClass('email')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-muted-light font-medium flex items-center gap-1.5">
                      Message <span className="text-primary-light">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project or just say hello..."
                      className={`${inputClass('message')} resize-none`}
                    />
                  </div>

                  <GlassButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    icon={<Send size={18} />}
                  >
                    Send Message
                  </GlassButton>
                </form>
              )}
            </GlassCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="reveal-card">
              <h3 className="font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-secondary" />
                Contact Info
              </h3>
              <div className="space-y-4">
                {contactLinks.map((link) => (
                  <div key={link.label} className="flex items-center gap-3 group">
                    <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary-light flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      {link.icon}
                    </span>
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider">{link.label}</p>
                      {link.href ? (
                        <a
                          href={link.href}
                          className="text-sm font-medium hover:text-primary-light transition-colors"
                        >
                          {link.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium">{link.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="reveal-card">
              <h3 className="font-semibold mb-5 flex items-center gap-2">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-primary to-secondary" />
                Connect
              </h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass text-sm text-muted-light hover:text-white hover:bg-glass-hover hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                  >
                    <SocialIcon name={link.icon} size={18} />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}
