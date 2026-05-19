import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { displayFont } from '@/utils/styles'
// (Eğer varsa) import { BG_VIDEO_URL } from '@/utils/styles'

interface NavbarProps {
  activePage?: 'home' | 'services' | 'process' | 'portfolio'
}

export default function Navbar({ activePage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const activeClass =
    'text-sm text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-white/40'
  const inactiveClass = 'text-sm text-white/60 hover:text-white transition-colors'
  const mobileActiveClass = 'text-xl text-white font-medium transition-colors'
  const mobileInactiveClass = 'text-xl text-white/60 hover:text-white transition-colors'

  const closeMobile = () => setIsMobileMenuOpen(false)

  return (
    <nav className="relative z-50 w-full px-6 md:px-8 py-6 max-w-7xl mx-auto flex flex-row justify-between items-center">
      <Link
        to="/"
        className="text-3xl tracking-tight text-white select-none relative z-50"
        style={displayFont}
        onClick={closeMobile}
      >
        HeyAlls<sup className="text-xs font-sans ml-0.5">®</sup>
      </Link>

      {/* Masaüstü Menü */}
      <div className="hidden md:flex flex-row items-center gap-8">
        <Link to="/" className={activePage === 'home' ? activeClass : inactiveClass}>
          Ana Sayfa
        </Link>
        <Link to="/hizmetlerimiz" className={activePage === 'services' ? activeClass : inactiveClass}>
          Onaylı Ortaklar
        </Link>
        <Link to="/surecimiz" className={activePage === 'process' ? activeClass : inactiveClass}>
          Nasıl Çalışır?
        </Link>
        <Link to="/calismalarimiz" className={activePage === 'portfolio' ? activeClass : inactiveClass}>
          Çalışmalarımız
        </Link>
        <a
          href="/#intake"
          className="bg-white/10 backdrop-blur-md rounded-full px-6 py-2.5 text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border border-white/10 hover:border-white/30"
        >
          Ağa Katıl
        </a>
      </div>

      {/* Mobil Hamburger */}
      <button
        className="md:hidden relative z-50 text-white p-2 focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobil Açılır Menü */}
      <div
        className={`md:hidden fixed inset-0 bg-[#001a2c]/98 backdrop-blur-2xl z-40 transition-all duration-300 flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <Link to="/" onClick={closeMobile} className={activePage === 'home' ? mobileActiveClass : mobileInactiveClass}>
          Ana Sayfa
        </Link>
        <Link to="/hizmetlerimiz" onClick={closeMobile} className={activePage === 'services' ? mobileActiveClass : mobileInactiveClass}>
          Onaylı Ortaklar
        </Link>
        <Link to="/surecimiz" onClick={closeMobile} className={activePage === 'process' ? mobileActiveClass : mobileInactiveClass}>
          Nasıl Çalışır?
        </Link>
        <Link to="/calismalarimiz" onClick={closeMobile} className={activePage === 'portfolio' ? mobileActiveClass : mobileInactiveClass}>
          Çalışmalarımız
        </Link>
        <a
          href="/#intake"
          onClick={closeMobile}
          className="bg-white/10 backdrop-blur-md rounded-full px-8 py-3 text-lg text-white mt-4 border border-white/10"
        >
          Ağa Katıl
        </a>
      </div>
    </nav>
  )
}