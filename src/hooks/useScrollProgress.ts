import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollProgress {
  progress: number
  direction: number
  velocity: number
}

export function useScrollProgress(): ScrollProgress {
  const [state, setState] = useState<ScrollProgress>({
    progress: 0,
    direction: 0,
    velocity: 0,
  })
  const lastY = useRef(0)
  const lastTime = useRef(Date.now())

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      const progress = max > 0 ? current / max : 0
      const direction = current > lastY.current ? 1 : -1
      const dt = Date.now() - lastTime.current
      const velocity = dt > 0 ? Math.abs(current - lastY.current) / dt * 100 : 0

      lastY.current = current
      lastTime.current = Date.now()

      setState({ progress, direction, velocity })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return state
}
