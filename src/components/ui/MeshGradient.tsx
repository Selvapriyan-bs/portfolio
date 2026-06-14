import { useRef, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Blob {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  hue: number
}

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null!)
  const rafRef = useRef(0)
  const blobsRef = useRef<Blob[]>([])
  const timeRef = useRef(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    blobsRef.current = [
      { x: 0.2, y: 0.3, radius: 0.35, color: 'hsla(190, 100%, 50%, 0.12)', speedX: 0.0003, speedY: 0.0002, hue: 190 },
      { x: 0.6, y: 0.5, radius: 0.3, color: 'hsla(260, 100%, 70%, 0.1)', speedX: -0.0002, speedY: 0.0003, hue: 260 },
      { x: 0.8, y: 0.7, radius: 0.25, color: 'hsla(160, 80%, 50%, 0.08)', speedX: 0.00025, speedY: -0.00015, hue: 160 },
      { x: 0.4, y: 0.8, radius: 0.2, color: 'hsla(300, 80%, 60%, 0.07)', speedX: -0.00015, speedY: -0.00025, hue: 300 },
      { x: 0.5, y: 0.2, radius: 0.28, color: 'hsla(220, 90%, 60%, 0.09)', speedX: 0.0002, speedY: 0.00015, hue: 220 },
    ]

    if (reduced) return

    const animate = () => {
      timeRef.current += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const blob of blobsRef.current) {
        blob.x += blob.speedX * canvas.width * 0.02
        blob.y += blob.speedY * canvas.height * 0.02
        blob.x = ((blob.x % 1) + 1) % 1
        blob.y = ((blob.y % 1) + 1) % 1

        const pulse = Math.sin(timeRef.current + blob.hue * 0.01) * 0.15 + 0.85
        const r = Math.min(canvas.width, canvas.height) * blob.radius * pulse
        const cx = blob.x * canvas.width
        const cy = blob.y * canvas.height

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        gradient.addColorStop(0, blob.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    if (!reduced) {
      rafRef.current = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: reduced ? 0.3 : 1 }}
    />
  )
}
