import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Wraps page content in a fade transition that fires on every route change.
 * Uses CSS only — no Framer Motion dependency needed.
 *
 * Usage: wrap the content inside each page's root div, or wrap <Routes> in App.tsx.
 *
 * Place this INSIDE your page component's return, wrapping the content:
 *   <PageTransition>
 *     <div>...page content...</div>
 *   </PageTransition>
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [displayKey, setDisplayKey] = useState(location.key)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    if (location.key === displayKey) return

    // Fade out
    setPhase('out')
    const t1 = setTimeout(() => {
      setDisplayKey(location.key)
      // Fade in
      setPhase('in')
    }, 180)

    return () => clearTimeout(t1)
  }, [location.key, displayKey])

  return (
    <div
      style={{
        opacity: phase === 'in' ? 1 : 0,
        transform: phase === 'in' ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.22s ease-out, transform 0.22s ease-out',
      }}
    >
      {children}
    </div>
  )
}