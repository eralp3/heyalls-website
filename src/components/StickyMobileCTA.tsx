import { useState, useEffect } from 'react'

/**
 * A sticky "Projeyi Başlat" bar that appears at the bottom of the screen
 * on mobile once the user scrolls past the hero CTA button.
 * Disappears automatically when the contact form (#intake) is in view.
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCTA = document.querySelector('a[href="#intake"]')
    const intakeSection = document.getElementById('intake')

    if (!heroCTA || !intakeSection) return

    const observer = new IntersectionObserver(
      ([heroEntry]) => {
        // Show sticky bar when the hero CTA scrolls out of view
        setVisible(!heroEntry.isIntersecting)
      },
      { threshold: 0 }
    )

    // Hide when the intake form itself is visible
    const intakeObserver = new IntersectionObserver(
      ([intakeEntry]) => {
        if (intakeEntry.isIntersecting) setVisible(false)
      },
      { threshold: 0.2 }
    )

    observer.observe(heroCTA)
    intakeObserver.observe(intakeSection)

    return () => {
      observer.disconnect()
      intakeObserver.disconnect()
    }
  }, [])

  return (
    // Only rendered on mobile (md:hidden) — zero cost on desktop
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-6 pt-3
        bg-gradient-to-t from-[#001a2c] to-transparent
        transition-all duration-500 ease-out
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <a
        href="#intake"
        className="block w-full text-center bg-white text-[#001a2c] font-medium
          rounded-full py-4 text-base shadow-2xl
          active:scale-[0.97] transition-transform duration-150"
      >
        Projeyi Başlat
      </a>
    </div>
  )
}