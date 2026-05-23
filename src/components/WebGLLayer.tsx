import { lazy, Suspense } from 'react'
import { useCanRunWebGL } from '@/hooks/useCanRunWebGL'

// Lazy load so Three.js/GSAP only download on devices that pass the check
const HeroWebGLScene = lazy(() => import('@/webgl/HeroWebGLScene'))

/**
 * WebGLLayer
 * ─────────────────────────────────────────────────────────────────────────────
 * Mounts the WebGL hero scene only when the device can handle it.
 * Sits transparently on top of <VideoBackground/>, below HTML content.
 *
 * Layer order in Home.tsx:
 *   z-0  VideoBackground   (existing)
 *   z-1  WebGLLayer        (this — transparent canvas with shapes)
 *   z-10 HTML content      (existing — navbar, hero text, etc.)
 *
 * Renders nothing on:
 *   - prefers-reduced-motion users
 *   - mobile / touch devices
 *   - devices without WebGL2
 *   - low-memory devices
 */
export default function WebGLLayer() {
  const canRun = useCanRunWebGL()
  if (!canRun) return null

  return (
    <Suspense fallback={null}>
      <HeroWebGLScene />
    </Suspense>
  )
}