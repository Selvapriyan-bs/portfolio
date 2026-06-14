import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function animateHero(
  headlineRef: React.RefObject<HTMLHeadingElement | null>,
  subtitleRef: React.RefObject<HTMLParagraphElement | null>,
  ctaRef: React.RefObject<HTMLDivElement | null>,
  socialRef: React.RefObject<HTMLDivElement | null>,
  indicatorRef: React.RefObject<HTMLDivElement | null>,
): () => void {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (headlineRef.current) {
    const chars = headlineRef.current.querySelectorAll('.hero-char')
    tl.fromTo(
      chars,
      { y: 80, opacity: 0, rotateX: -90, filter: 'blur(8px)' },
      { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.04 },
    )
  }

  if (subtitleRef.current) {
    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7 },
      '-=0.3',
    )
  }

  if (ctaRef.current) {
    const items = ctaRef.current.querySelectorAll('.hero-cta-item')
    tl.fromTo(
      items,
      { y: 25, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.12 },
      '-=0.2',
    )
  }

  if (socialRef.current) {
    const items = socialRef.current.querySelectorAll('.hero-social-item')
    tl.fromTo(
      items,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, stagger: 0.06 },
      '-=0.3',
    )
  }

  if (indicatorRef.current) {
    tl.fromTo(
      indicatorRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2',
    )
  }

  return () => tl.kill()
}

export function animateSectionHeading(
  ref: React.RefObject<HTMLDivElement | null>,
  fromBottom: boolean = false,
): () => void {
  const ctx = gsap.context(() => {
    const label = ref.current?.querySelector('.section-label')
    const title = ref.current?.querySelector('.section-title')
    const line = ref.current?.querySelector('.section-line')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: fromBottom ? 'top 90%' : 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    if (label) {
      tl.fromTo(
        label,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      )
    }
    if (title) {
      tl.fromTo(
        title,
        { y: 30, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'power3.out' },
        '-=0.3',
      )
    }
    if (line) {
      tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power3.out', transformOrigin: 'left center' }, '-=0.4')
    }
  }, ref)

  return () => ctx.revert()
}

export function animateCards(
  containerRef: React.RefObject<HTMLDivElement | null>,
  staggerAmount: number = 0.1,
): () => void {
  const ctx = gsap.context(() => {
    const cards = containerRef.current?.querySelectorAll('.reveal-card')
    if (!cards?.length) return

    gsap.fromTo(
      cards,
      { y: 60, opacity: 0, scale: 0.92, filter: 'blur(4px)' },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        stagger: staggerAmount,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, containerRef)

  return () => ctx.revert()
}

export function animateFloatingElements(
  containerRef: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const elements = containerRef.current?.querySelectorAll('.float-element')
    if (!elements?.length) return

    elements.forEach((el, i) => {
      gsap.to(el, {
        y: -20 - Math.random() * 30,
        x: Math.random() * 20 - 10,
        scale: 1 + Math.random() * 0.3,
        duration: 3 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      })
    })
  }, containerRef)

  return () => ctx.revert()
}

export function animateProgressBars(
  containerRef: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const bars = containerRef.current?.querySelectorAll('.progress-fill')
    if (!bars?.length) return

    bars.forEach((bar) => {
      const width = bar.getAttribute('data-width')
      if (width) {
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: width,
            duration: 1.4,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: bar.closest('.progress-group'),
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          },
        )

        const counter = bar.querySelector('.progress-count')
        if (counter) {
          const num = parseInt(width)
          gsap.fromTo(
            counter,
            { textContent: '0' },
            {
              textContent: num,
              duration: 1.2,
              ease: 'power2.out',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: bar.closest('.progress-group'),
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            },
          )
        }
      }
    })
  }, containerRef)

  return () => ctx.revert()
}

export function animateParallax(
  ref: React.RefObject<HTMLDivElement | null>,
  speed: number = 0.3,
): () => void {
  const ctx = gsap.context(() => {
    gsap.to(ref.current, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current?.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, ref)

  return () => ctx.revert()
}

export function animateSectionEnter(
  ref: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      },
    )
  }, ref)

  return () => ctx.revert()
}

export function animateCounter(
  el: HTMLElement,
  start: number,
  end: number,
  duration: number = 1.5,
) {
  return gsap.fromTo(
    { value: start },
    { value: start },
    {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: function () {
        el.textContent = Math.round(this.targets()[0].value).toString()
      },
    },
  )
}

export function animateImageReveal(
  ref: React.RefObject<HTMLDivElement | null>,
): () => void {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.fromTo(
      ref.current?.querySelector('.img-reveal-overlay'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left center' },
    )
      .fromTo(
        ref.current?.querySelector('.img-reveal-img'),
        { scale: 1.4 },
        { scale: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4',
      )
      .to(
        ref.current?.querySelector('.img-reveal-overlay'),
        { scaleX: 0, transformOrigin: 'right center', duration: 0.6, ease: 'power3.inOut' },
        '-=0.2',
      )
  }, ref)

  return () => ctx.revert()
}
