import { useState, useCallback } from 'react'

// Detects touch/coarse pointer devices (phones, tablets)
const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

export function useTilt() {
  const [tiltStyles, setTiltStyles] = useState<{ [key: string]: string }>({})

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>, id: string) => {
      // Skip tilt entirely on touch devices — mousemove misfires on mobile
      // and leaves cards stuck mid-tilt
      if (isTouchDevice()) return

      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const tiltAmount = 10
      const rotateX = ((y - centerY) / centerY) * -tiltAmount
      const rotateY = ((x - centerX) / centerX) * tiltAmount

      setTiltStyles(prev => ({
        ...prev,
        [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      }))
    },
    []
  )

  const handleMouseLeave = useCallback((id: string) => {
    if (isTouchDevice()) return
    setTiltStyles(prev => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    }))
  }, [])

  const getTiltStyle = useCallback(
    (id: string): React.CSSProperties => ({
      transform: isTouchDevice()
        ? 'none'
        : tiltStyles[id] || 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }),
    [tiltStyles]
  )

  return { handleMouseMove, handleMouseLeave, getTiltStyle }
}