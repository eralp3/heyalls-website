import { useEffect, useRef, useState, useCallback } from 'react'

/**
 * useDropletAudio — synthesized "water droplet" sounds for click feedback.
 *
 * Architecture:
 *   • Web Audio API — no audio files, no network requests
 *   • One AudioContext created lazily on first enable() (browser autoplay
 *     policy requires audio to start from a user gesture)
 *   • Each droplet = quick sine + cosine ping with exponential pitch decay,
 *     band-pass filter, and a small reverb-like delay tail
 *   • Subtle pitch + pan randomization per click so repeated drops don't
 *     sound mechanical
 *
 * Public API:
 *   const { enabled, toggle, playDroplet } = useDropletAudio()
 *
 * State persists in localStorage under 'heyalls.audio.enabled'.
 */

const STORAGE_KEY = 'heyalls.audio.enabled'

interface AudioState {
  ctx: AudioContext | null
  masterGain: GainNode | null
}

export function useDropletAudio() {
  // Read persisted preference. Default = false (audio off).
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  })

  const stateRef = useRef<AudioState>({ ctx: null, masterGain: null })

  // ── Lazy AudioContext init ────────────────────────────────────────────────
  // We can only create an AudioContext after a user gesture. We create it
  // the first time the user toggles audio ON, then reuse it forever.
  const ensureContext = useCallback(() => {
    if (stateRef.current.ctx) return stateRef.current.ctx

    type AudioContextConstructor = new () => AudioContext
    const Ctor: AudioContextConstructor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: AudioContextConstructor }).webkitAudioContext

    if (!Ctor) {
      if (import.meta.env.DEV) console.warn('[useDropletAudio] AudioContext not supported')
      return null
    }

    const ctx = new Ctor()
    const masterGain = ctx.createGain()
    masterGain.gain.value = 0.35 // overall volume — droplets are subtle
    masterGain.connect(ctx.destination)

    stateRef.current = { ctx, masterGain }
    return ctx
  }, [])

  // ── Toggle handler ────────────────────────────────────────────────────────
  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      window.localStorage.setItem(STORAGE_KEY, String(next))
      if (next) {
        const ctx = ensureContext()
        if (ctx && ctx.state === 'suspended') ctx.resume()
      } else {
        const ctx = stateRef.current.ctx
        if (ctx && ctx.state === 'running') ctx.suspend()
      }
      return next
    })
  }, [ensureContext])

  // ── Auto-pause when tab hidden (battery friendly) ─────────────────────────
  useEffect(() => {
    const handleVisibility = () => {
      const ctx = stateRef.current.ctx
      if (!ctx) return
      if (document.hidden && ctx.state === 'running') {
        ctx.suspend()
      } else if (!document.hidden && enabled && ctx.state === 'suspended') {
        ctx.resume()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [enabled])

  // ── Droplet synthesizer ───────────────────────────────────────────────────
  // Each droplet is a short pitched ping (~150ms total) with:
  //   • Two sine partials at slightly different frequencies for richness
  //   • Exponential frequency decay (pitch slides down — that "water" feel)
  //   • Band-pass filter to round off harsh edges
  //   • Quick attack, gentle exponential decay envelope
  //   • Small delay tap for a sense of space
  //   • Random pan ±0.4 + random base pitch ±10% per call
  const playDroplet = useCallback(() => {
    if (!enabled) return
    const ctx = stateRef.current.ctx
    const master = stateRef.current.masterGain
    if (!ctx || !master) return
    if (ctx.state === 'suspended') ctx.resume()

    const now = ctx.currentTime

    // Randomization
    const basePitch = 720 + (Math.random() - 0.5) * 140   // 650–790 Hz
    const pan = (Math.random() - 0.5) * 0.8                // -0.4 .. +0.4
    const peakGain = 0.5 + Math.random() * 0.2              // 0.5–0.7

    // ── Per-droplet graph ─────────────────────────────────────────────────
    // [osc1] ─┐
    //         ├─> bandpass ─> envGain ─> panner ─> master ─> destination
    // [osc2] ─┘                       └─> delay ─> delayGain ─> master

    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.setValueAtTime(basePitch, now)
    osc1.frequency.exponentialRampToValueAtTime(basePitch * 0.6, now + 0.12)

    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(basePitch * 1.5, now) // a fifth above
    osc2.frequency.exponentialRampToValueAtTime(basePitch * 0.9, now + 0.12)

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.value = basePitch
    bandpass.Q.value = 4

    const envGain = ctx.createGain()
    envGain.gain.setValueAtTime(0.0001, now)
    envGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.008) // 8ms attack
    envGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)    // 180ms decay

    const panner = ctx.createStereoPanner()
    panner.pan.value = pan

    const osc2Gain = ctx.createGain()
    osc2Gain.gain.value = 0.35

    osc1.connect(bandpass)
    osc2.connect(osc2Gain)
    osc2Gain.connect(bandpass)
    bandpass.connect(envGain)
    envGain.connect(panner)
    panner.connect(master)

    // Small delay tap for spatial depth
    const delay = ctx.createDelay(0.5)
    delay.delayTime.value = 0.12
    const delayGain = ctx.createGain()
    delayGain.gain.value = 0.18
    envGain.connect(delay)
    delay.connect(delayGain)
    delayGain.connect(master)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + 0.25)
    osc2.stop(now + 0.25)

    // Disconnect everything after the sound dies — prevents node leaks
    setTimeout(() => {
      try {
        osc1.disconnect(); osc2.disconnect()
        osc2Gain.disconnect(); bandpass.disconnect()
        envGain.disconnect(); panner.disconnect()
        delay.disconnect(); delayGain.disconnect()
      } catch { /* already disconnected */ }
    }, 400)
  }, [enabled])

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      const ctx = stateRef.current.ctx
      if (ctx) {
        ctx.close().catch(() => { /* ignore */ })
        stateRef.current.ctx = null
        stateRef.current.masterGain = null
      }
    }
  }, [])

  return { enabled, toggle, playDroplet }
}