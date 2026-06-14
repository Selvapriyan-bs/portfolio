import { useState, useEffect } from 'react'

interface DeviceInfo {
  isMobile: boolean
  isTouch: boolean
  isReducedMotion: boolean
  isSafari: boolean
}

export function useDeviceDetection(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTouch: false,
    isReducedMotion: false,
    isSafari: false,
  })

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setInfo({
      isMobile: window.innerWidth < 768,
      isTouch: 'ontouchstart' in window,
      isReducedMotion: mqMotion.matches,
      isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    })

    const handleResize = () => {
      setInfo((prev) => ({ ...prev, isMobile: window.innerWidth < 768 }))
    }

    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return info
}
