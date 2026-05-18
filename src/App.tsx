import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Process from './pages/Process'
import Portfolio from './pages/Portfolio'

export default function App() {
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