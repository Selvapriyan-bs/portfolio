import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const barRef = useRef<HTMLDivElement>(null!)
  const textRef = useRef<HTMLHeadingElement>(null!)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaded(true),
    })

    tl.to(barRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power4.inOut',
    })
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=1.2',
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.2,
        },
        '-=0.4',
      )

    return () => {
      tl.kill()
    }
  }, [])

  const handleSkip = () => {
    gsap.killTweensOf(barRef.current)
    gsap.killTweensOf(textRef.current)
    gsap.killTweensOf(containerRef.current)
    gsap.set(barRef.current, { width: '100%' })
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => setLoaded(true),
    })
  }

  if (loaded) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark"
      onClick={handleSkip}
    >
      <div className="flex flex-col items-center gap-8">
        <h1
          ref={textRef}
          className="text-4xl md:text-5xl font-bold gradient-text opacity-0 translate-y-4"
        >
          &lt;Selva /&gt;
        </h1>

        <div className="w-40 h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: '0%' }}
          />
        </div>

        <p className="text-xs text-muted font-mono tracking-widest animate-pulse">
          LOADING ...
        </p>
      </div>
    </div>
  )
}
