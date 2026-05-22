import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { displayFont } from '@/utils/styles'

interface NavbarProps {
  activePage?: 'home' | 'process' | 'services' | 'portfolio'
}

const navLinks = [
  { name: 'Ana Sayfa', to: '/', id: 'home' },
  { name: 'Sürecimiz', to: '/surecimiz', id: 'process' },
  { name: 'Hizmetlerimiz', to: '/hizmetlerimiz', id: 'services' },
  { name: 'Çalışmalarımız', to: '/calismalarimiz', id: 'portfolio' },
]

export default function Navbar({ activePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // ── Animated indicator state ──────────────────────────────────────────────
  const navRef = useRef<HTMLElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const activeRef = useRef<HTMLAnchorElement | null>(null)

  // Determine active link from URL (works even on sub-pages like /calismalarimiz/bimeeting)
  const activeId = navLinks.find(link =>
    link.to === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(link.to)
  )?.id ?? activePage

  // Measure and position the indicator under the active link
  useEffect(() => {
    const updateIndicator = () => {
      if (!activeRef.current || !navRef.current) return
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = activeRef.current.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeId, location.pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header className="fixed top-0 left-0 z-[9999] w-full bg-[#001a2c]/90 backdrop-blur-lg border-b border-white/5 transition-all duration-300">
      <div className="px-6 md:px-8 py-4 max-w-7xl mx-auto flex flex-row justify-between items-center relative z-[110]">
        <Link to="/" className="text-2xl font-medium text-white flex items-center gap-1" style={displayFont}>
          HeyAlls
        </Link>

        {/* Desktop nav with sliding indicator */}
        <nav ref={navRef} className="hidden md:flex flex-row gap-8 items-center relative">
          {/* Sliding underline indicator */}
          <span
            className="absolute bottom-[-6px] h-[1.5px] bg-white rounded-full transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeId === link.id
            return (
              <Link
                key={link.id}
                to={link.to}
                ref={isActive ? (el) => { activeRef.current = el } : null}
                className={`text-sm tracking-wide transition-colors duration-300 pb-1 ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            )
          })}

          <a
            href="/#intake"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-medium transition-all hover:bg-white hover:text-black"
          >
            Projeyi Başlat
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menüyü Aç/Kapat"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : ''}`} />
          <div className={`w-6 h-[2px] bg-white transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigasyon Menüsü"
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
                activeId === link.id ? 'text-white' : 'text-white/50'
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