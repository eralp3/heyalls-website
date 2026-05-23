import { useEffect } from 'react'
import { useDropletAudio } from '@/hooks/useDropletAudio'

/**
 * AudioToggle — small floating speaker icon, bottom-left.
 *   • Off by default
 *   • Click to enable: AudioContext starts, future clicks play droplets
 *   • Click again to disable
 *   • State persists in localStorage
 *   • Listens to global pointerdown to play the droplet (matches the ripple)
 *
 * Place once in App.tsx (or wherever a single global mount makes sense).
 * Hidden on touch devices (mobile) — sound on mobile is even more intrusive.
 */
export default function AudioToggle() {
  const { enabled, toggle, playDroplet } = useDropletAudio()

  // Play a droplet on every pointerdown across the document (matches the
  // visual ripple on the same gesture). The toggle itself triggers
  // pointerdown too — we filter those out so toggling doesn't play a sound.
  useEffect(() => {
    if (!enabled) return

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('[data-audio-toggle]')) return // ignore clicks on the toggle itself
      playDroplet()
    }
    document.addEventListener('pointerdown', handlePointerDown, { passive: true })
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [enabled, playDroplet])

  return (
    <button
      data-audio-toggle
      onClick={toggle}
      aria-label={enabled ? 'Sesi kapat' : 'Sesi aç'}
      aria-pressed={enabled}
      className="
        hidden md:flex
        fixed bottom-6 left-6 z-[60]
        w-11 h-11 rounded-full
        bg-white/10 backdrop-blur-md
        border border-white/15
        items-center justify-center
        text-white/80
        transition-all duration-300
        hover:bg-white/15 hover:border-white/30 hover:scale-105
        active:scale-95
      "
      title={enabled ? 'Sesi kapat' : 'Tıklama efekti seslerini aç'}
    >
      {enabled ? (
        // Speaker on icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        // Speaker muted icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  )
}