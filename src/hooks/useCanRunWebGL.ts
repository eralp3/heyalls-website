import { useState, useEffect } from 'react'

/**
 * Detects whether the device can comfortably run the WebGL physics scene.
 * Returns false for:
 *   - prefers-reduced-motion users
 *   - missing WebGL2 support
 *   - low-memory mobile devices (deviceMemory < 4GB on mobile)
 *   - very narrow screens (< 768px)
 *
 * Used to gate the WebGL canvas so weaker devices fall back to the
 * existing static design without animations.
 */
export function useCanRunWebGL(): boolean {
  const [canRun, setCanRun] = useState(false)

  useEffect(() => {
    // Reduced motion = full opt-out
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCanRun(false)
      return
    }

    // No WebGL2 = no scene
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2')
      if (!gl) {
        setCanRun(false)
        return
      }
    } catch {
      setCanRun(false)
      return
    }

    // Mobile + low memory = skip
    const isMobile = window.matchMedia('(pointer: coarse)').matches
    // navigator.deviceMemory exists in Chromium browsers
    const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
    if (isMobile && deviceMemory !== undefined && deviceMemory < 4) {
      setCanRun(false)
      return
    }

    // Very narrow viewport = skip (would look cramped anyway)
    if (window.innerWidth < 768) {
      setCanRun(false)
      return
    }

    setCanRun(true)
  }, [])

  return canRun
}