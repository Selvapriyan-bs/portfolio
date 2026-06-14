import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingBackground } from '@/components/ui/FloatingBackground'
import { MeshGradient } from '@/components/ui/MeshGradient'
import { SpotlightEffect } from '@/components/ui/SpotlightEffect'
import { Particles } from '@/components/ui/Particles'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { Home } from '@/pages/Home'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <LoadingScreen />
      <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
        <div className="noise-overlay" />
        {ready && (
          <>
            <MeshGradient />
            <FloatingBackground count={5} />
            <Particles />
            <SpotlightEffect />
          </>
        )}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
