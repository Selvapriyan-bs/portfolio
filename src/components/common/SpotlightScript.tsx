'use client'

import { useEffect } from 'react'

export function SpotlightScript() {
  useEffect(() => {
    const spot = document.getElementById('spotlight')
    if (!spot) return

    let mouseX = -1000
    let mouseY = -1000
    let currentX = -1000
    let currentY = -1000
    let raf: number

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      currentX += (mouseX - currentX) * 0.08
      currentY += (mouseY - currentY) * 0.08
      spot!.style.background = `
        radial-gradient(600px circle at ${currentX}px ${currentY}px, rgba(124, 58, 237, 0.06), transparent 40%),
        radial-gradient(400px circle at ${currentX * 0.7}px ${currentY * 0.7}px, rgba(167, 139, 250, 0.04), transparent 40%)
      `
      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf)
    }
  }, [])

  return null
}
