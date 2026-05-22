import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * FIX: Removed translateY transform from the wrapper.
 * Any CSS transform on a parent creates a new stacking context,
 * which breaks position:fixed children (VideoBackground) — they
 * start positioning relative to the transformed div instead of
 * the viewport, making the video appear zoomed/shifted.
 *
 * Solution: animate opacity only. The fade still feels smooth
 * and the video background is unaffected.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [displayKey, setDisplayKey] = useState(location.key)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    if (location.key === displayKey) return

    setPhase('out')
    const t1 = setTimeout(() => {
      setDisplayKey(location.key)
      setPhase('in')
    }, 180)

    return () => clearTimeout(t1)
  }, [location.key, displayKey])

  return (
    <div
      style={{
        opacity: phase === 'in' ? 1 : 0,
        // NO transform here — transform breaks fixed positioning of VideoBackground
        transition: 'opacity 0.22s ease-out',
      }}
    >
      {children}
    </div>
  )
}