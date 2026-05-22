    import { useEffect, useRef } from 'react'

interface ScrollRevealOptions {
  threshold?: number   // 0–1, how much of the element must be visible
  delay?: number       // ms delay before animation triggers
  once?: boolean       // animate only the first time (default true)
}

/**
 * Attach this ref to any element and it will fade+rise into view
 * when it enters the viewport. Uses IntersectionObserver — no library needed.
 *
 * Usage:
 *   const ref = useScrollReveal()
 *   <div ref={ref}>...</div>
 *
 * The element needs the class "reveal-hidden" initially (added automatically).
 * CSS for .reveal-hidden and .reveal-visible is in index.css.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const { threshold = 0.15, delay = 0, once = true } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion — skip animation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('reveal-visible')
      return
    }

    el.classList.add('reveal-hidden')
    if (delay) el.style.transitionDelay = `${delay}ms`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove('reveal-hidden')
          el.classList.add('reveal-visible')
          if (once) observer.disconnect()
        } else if (!once) {
          el.classList.add('reveal-hidden')
          el.classList.remove('reveal-visible')
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, delay, once])

  return ref
}