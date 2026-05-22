import { useEffect, useRef } from 'react'

/**
 * CursorSpotlight — a soft radial glow that follows the mouse on desktop.
 * Automatically hidden on touch devices via CSS pointer media query.
 * Uses requestAnimationFrame for smooth 60fps tracking with no jank.
 * Zero dependencies, zero libraries.
 */
export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -300, y: -300 })
  const current = useRef({ x: -300, y: -300 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    // Skip entirely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      // Lerp toward target position for smooth trailing effect
      current.current.x += (pos.current.x - current.current.x) * 0.12
      current.current.y += (pos.current.y - current.current.y) * 0.12

      if (spotRef.current) {
        spotRef.current.style.transform =
          `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    // Hidden on touch devices via pointer:coarse media query in CSS
    <div
      ref={spotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[1] hidden md:block"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}