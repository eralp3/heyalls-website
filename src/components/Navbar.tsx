import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { displayFont } from '@/utils/styles'

interface NavbarProps {
  activePage?: 'home' | 'process' | 'services' | 'portfolio'
}

export default function Navbar({ activePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navLinks = [
    { name: 'Ana Sayfa', to: '/', id: 'home' },
    { name: 'Sürecimiz', to: '/surecimiz', id: 'process' },
    { name: 'Hizmetlerimiz', to: '/hizmetlerimiz', id: 'services' },
    { name: 'Çalışmalarımız', to: '/calismalarimiz', id: 'portfolio' },
  ]

  return (
    <header className="fixed top-0 left-0 z-[9999] w-full bg-[#001a2c]/90 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="px-6 md:px-8 py-4 max-w-7xl mx-auto flex flex-row justify-between items-center relative z-[110]">
<Link to="/" className="text-2xl font-medium text-white flex items-center gap-1" style={displayFont}>
          HeyAlls
        </Link>
        {/* Masaüstü Menü */}
        <nav className="hidden md:flex flex-row gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={`text-sm tracking-wide transition-colors duration-300 ${
                activePage === link.id ? 'text-white font-medium' : 'text-white/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="/#intake"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:bg-white hover:text-black"
          >
            Projeyi Başlat
          </a>
        </nav>
        {/* Mobil Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menüyü Aç/Kapat"
        >
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
        </button>
      </div>
      {/* Mobil Tam Ekran Menü */}
      <div
        className={`fixed inset-0 min-h-screen bg-[#001a2c]/95 backdrop-blur-xl z-[105] flex flex-col items-center justify-center gap-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`text-4xl font-normal transition-colors duration-300 ${
                activePage === link.id ? 'text-white' : 'text-white/50'
              }`}
              style={displayFont}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <a
          href="/#intake"
          onClick={() => setIsOpen(false)}
          className="mt-8 bg-white text-[#001a2c] px-10 py-4 rounded-full text-lg font-medium transition-transform active:scale-95"
        >
          Projeyi Başlat
        </a>
      </div>
    </header>
  )
}