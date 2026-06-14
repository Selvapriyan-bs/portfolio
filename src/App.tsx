import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { SpotlightScript } from '@/components/common/SpotlightScript'
import { Home } from '@/pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
        <SpotlightScript />
        <div className="noise-overlay" />
        <div className="spotlight" id="spotlight" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
