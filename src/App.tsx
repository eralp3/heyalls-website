import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react' // Bunu eklemeyi unutma
import Home from './pages/Home'
import Services from './pages/Services'
import Process from './pages/Process'
import Portfolio from './pages/Portfolio'

function App() {
  // Yükleme ekranını kaldırma mantığı
  useEffect(() => {
    const loader = document.getElementById('initial-loader')
    if (loader) {
      // Fontların ve kritik bileşenlerin oturması için ufak bir gecikme
      setTimeout(() => {
        loader.style.opacity = '0'
        loader.style.visibility = 'hidden'
        // Animasyon bittikten sonra DOM'dan tamamen temizle
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
      </Routes>
    </Router>
  )
}

export default App