import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function animateChapterTitle(
  ref: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const el = ref.current
    if (!el) return
    const label = el.querySelector('.ch-label')
    const title = el.querySelector('.ch-title')
    const number = el.querySelector('.ch-number')

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
    })

    if (number) tl.fromTo(number, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' })
    if (label) tl.fromTo(label, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    if (title) tl.fromTo(title, { y: 25, opacity: 0, clipPath: 'inset(0 0 100% 0)' }, { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out' }, '-=0.3')
  }, ref)
  return () => ctx.revert()
}

export function animateTextReveal(
  ref: React.RefObject<HTMLDivElement | null>,
  stagger: number = 0.04,
): () => void {
  const ctx = gsap.context(() => {
    const chars = ref.current?.querySelectorAll('.reveal-char')
    if (!chars?.length) return
    gsap.fromTo(chars, { y: 80, opacity: 0, rotateX: -60 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger, ease: 'power3.out' })
  }, ref)
  return () => ctx.revert()
}

export function animateFadeUp(
  ref: React.RefObject<HTMLDivElement | null>,
  delay: number = 0,
): () => void {
  const ctx = gsap.context(() => {
    const el = ref.current
    if (!el) return
    gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } })
  }, ref)
  return () => ctx.revert()
}

export function animateCounter(
  el: HTMLElement,
  start: number,
  end: number,
  suffix: string = '',
  duration: number = 2,
) {
  return gsap.fromTo(
    { value: start },
    { value: start },
    {
      value: end,
      duration,
      ease: 'power3.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].value).toString() + suffix
      },
    },
  )
}

export function animateHorizontalScroll(
  containerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return
    const scrollWidth = track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: () => -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  }, containerRef)
  return () => ctx.revert()
}

export function animateCardsStagger(
  ref: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const cards = ref.current?.querySelectorAll('.stagger-card')
    if (!cards?.length) return
    gsap.fromTo(cards, { y: 60, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%', toggleActions: 'play none none reverse' },
    })
  }, ref)
  return () => ctx.revert()
}

export function animateOrbit(
  containerRef: React.RefObject<HTMLDivElement | null>,
  mouseRef: React.MutableRefObject<{ x: number; y: number }>,
): () => void {
  const ctx = gsap.context(() => {
    const cards = containerRef.current?.querySelectorAll('.orbit-card')
    if (!cards?.length) return
    const centerX = containerRef.current!.offsetWidth / 2
    const centerY = containerRef.current!.offsetHeight / 2
    const radius = Math.min(centerX, centerY) * 0.6

    cards.forEach((card, i) => {
      const angle = (i / cards.length) * Math.PI * 2
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      gsap.set(card, { x, y })

      gsap.to(card, {
        x: x + 20,
        y: y + 20,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      })
    })

    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const mx = (e.clientX - rect.left - centerX) / centerX
      const my = (e.clientY - rect.top - centerY) / centerY

      cards.forEach((card, i) => {
        const angle = (i / cards.length) * Math.PI * 2 + Math.atan2(my, mx) * 0.3
        const r = radius + Math.sin(Date.now() * 0.001 + i) * 15
        const tx = Math.cos(angle) * r
        const ty = Math.sin(angle) * r

        gsap.to(card, {
          x: tx + mx * 30,
          y: ty + my * 30,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, containerRef)
  return () => ctx.revert()
}
