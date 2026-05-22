import { useState, useEffect } from 'react'

/**
 * FIX: Previous version appeared as soon as the hero CTA scrolled 1px out
 * of view — too eager, felt intrusive on mobile.
 *
 * Now it only shows after:
 *   1. The user has scrolled past the entire hero section (not just the button)
 *   2. A 600ms debounce delay so it doesn't flash during quick scrolls
 *   3. Still hides automatically when the #intake form comes into view
 */
export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const intakeSection = document.getElementById('intake')
    const heroSection = document.querySelector('main')

    if (!heroSection) return

    let debounceTimer: ReturnType<typeof setTimeout>

    // Watch the hero section — only show after it's fully scrolled past
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        clearTimeout(debounceTimer)
        if (!entry.isIntersecting) {
          // Hero is gone — wait 600ms before showing to avoid flashing
          debounceTimer = setTimeout(() => setVisible(true), 600)
        } else {
          // Hero came back into view — hide immediately
          setVisible(false)
        }
      },
      { threshold: 0 }
    )

    // Hide when the contact form is visible — user reached the destination
    const intakeObserver = intakeSection
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              clearTimeout(debounceTimer)
              setVisible(false)
            }
          },
          { threshold: 0.15 }
        )
      : null

    heroObserver.observe(heroSection)
    if (intakeSection && intakeObserver) intakeObserver.observe(intakeSection)

    return () => {
      clearTimeout(debounceTimer)
      heroObserver.disconnect()
      intakeObserver?.disconnect()
    }
  }, [])

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-6 pt-3
        bg-gradient-to-t from-[#001a2c] to-transparent
        transition-all duration-700 ease-out
        ${visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
        }`}
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