import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Services from './pages/Services'
import Process from './pages/Process'
import Portfolio from './pages/Portfolio'
import Bimeeting from './pages/Bimeeting' // YENİ EKLENDİ

function App() {
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0'
        loader.style.visibility = 'hidden'
        setTimeout(() => {
          loader.remove()
        }, 800)
      }, 500)
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hizmetlerimiz" element={<Services />} />
        <Route path="/surecimiz" element={<Process />} />
        <Route path="/calismalarimiz" element={<Portfolio />} />
        <Route path="/calismalarimiz/bimeeting" element={<Bimeeting />} /> {/* YENİ EKLENDİ */}
      </Routes>
    </Router>
  )
}

export default App