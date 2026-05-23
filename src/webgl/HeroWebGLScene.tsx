import { useEffect, useRef } from 'react'

/**
 * HeroWebGLScene — Sea Surface Distortion / Refraction
 * ────────────────────────────────────────────────────────────────────────────
 * A full-screen water surface shader that refracts the existing background
 * video through animated noise + cursor-driven ripples.
 *
 * Conceptual mapping for HeyAlls:
 *   The video (your brand atmosphere) is now a living medium. The user's
 *   cursor creates ripples on its surface — the system responds to attention.
 *
 * Architecture:
 *   • Single fullscreen quad (THREE.PlaneGeometry(2,2)) on an OrthographicCamera
 *   • THREE.VideoTexture sourced from <video id="bg-video"> (must exist in DOM)
 *   • Custom fragment shader: simplex noise + ripple field → UV distortion
 *   • No render targets, no post-processing — single draw call per frame
 *
 * Performance:
 *   • One draw call. Costs roughly the same as drawing the video itself.
 *   • Pauses entirely when offscreen (IntersectionObserver) or tab hidden.
 *   • Ripple buffer capped at MAX_RIPPLES (5) to keep shader uniform array tiny.
 *
 * Required DOM contract:
 *   The fixed background <video> element MUST have id="bg-video".
 *   See VideoBackground.tsx patch below.
 */

// ─── TUNING (top of file so you can taste-test in one place) ────────────────
const TINT_COLOR           = { r: 0.00, g: 0.10, b: 0.17 } // #001a2c — your brand navy
const TINT_STRENGTH        = 0.45    // 0 = no tint, 1 = solid navy
const NOISE_AMPLITUDE      = 0.018   // how strong the ambient ocean wobble is
const NOISE_SCALE          = 2.2     // higher = smaller, more chaotic waves
const NOISE_SPEED          = 0.18    // ambient flow speed
const RIPPLE_AMPLITUDE     = 0.045   // how strong cursor ripples push the UVs
const RIPPLE_SPEED         = 1.6     // how fast ripples expand outward
const RIPPLE_LIFE          = 1.8     // seconds before a ripple fades to nothing
const RIPPLE_SPAWN_DIST    = 0.04    // min cursor travel (NDC) before a new ripple
const SCROLL_FADE_END      = 800

const MAX_RIPPLES = 5  // matches GLSL array size below — keep in sync

export default function HeroWebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      const THREE = await import('three')
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (cancelled || !containerRef.current) return
      const container = containerRef.current

      // ── Locate the background video element ─────────────────────────────
      const videoEl = document.getElementById('bg-video') as HTMLVideoElement | null
      if (!videoEl) {
        console.warn('[HeroWebGLScene] No <video id="bg-video"> found — refraction disabled')
        return
      }

      // Ensure the video is playing inline + muted (required for autoplay on iOS)
      videoEl.muted = true
      videoEl.playsInline = true
      // Best-effort kick: if browser paused it, try again silently
      videoEl.play().catch(() => { /* ignore — autoplay policy */ })

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false, // shader does its own AA via smoothstep
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ── Scene + Camera (orthographic, fills viewport with one quad) ─────
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)

      // ── Video texture ───────────────────────────────────────────────────
      const videoTexture = new THREE.VideoTexture(videoEl)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      // colorSpace setting for correct gamma — use SRGB if available
      // (newer Three.js versions; safe to set as it just hints color management)
      ;(videoTexture as unknown as { colorSpace?: string }).colorSpace = THREE.SRGBColorSpace

      // ── Ripple state (5 active ripples, x/y/birthTime per ripple) ──────
      // Pre-flat-packed arrays we'll write to uniforms each frame.
      const ripplePositions = new Float32Array(MAX_RIPPLES * 2) // x, y in normalized [0,1]
      const rippleAges      = new Float32Array(MAX_RIPPLES)     // age in seconds
      const rippleActive    = new Uint8Array(MAX_RIPPLES)       // 1 = active

      // ── Shader material ─────────────────────────────────────────────────
      // The shader does:
      //   1. Generate animated 2D simplex noise → small UV offset
      //   2. For each active ripple: radial sine wave around its center → UV offset
      //   3. Sample the video at offset UVs
      //   4. Mix in a navy tint
      //   5. Apply overall opacity (for scroll fade)
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uVideo:          { value: videoTexture },
          uTime:           { value: 0 },
          uResolution:     { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTintColor:      { value: new THREE.Vector3(TINT_COLOR.r, TINT_COLOR.g, TINT_COLOR.b) },
          uTintStrength:   { value: TINT_STRENGTH },
          uNoiseAmp:       { value: NOISE_AMPLITUDE },
          uNoiseScale:     { value: NOISE_SCALE },
          uNoiseSpeed:     { value: NOISE_SPEED },
          uRipplePositions:{ value: ripplePositions },
          uRippleAges:     { value: rippleAges },
          uRippleActive:   { value: rippleActive },
          uRippleAmp:      { value: RIPPLE_AMPLITUDE },
          uRippleSpeed:    { value: RIPPLE_SPEED },
          uRippleLife:     { value: RIPPLE_LIFE },
          uOpacity:        { value: 1.0 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        // Fragment shader: simplex noise (Ashima Arts, BSD) + ripple field + refraction
        fragmentShader: /* glsl */ `
          precision highp float;

          uniform sampler2D uVideo;
          uniform float     uTime;
          uniform vec2      uResolution;
          uniform vec3      uTintColor;
          uniform float     uTintStrength;
          uniform float     uNoiseAmp;
          uniform float     uNoiseScale;
          uniform float     uNoiseSpeed;
          uniform float     uRipplePositions[${MAX_RIPPLES * 2}];
          uniform float     uRippleAges[${MAX_RIPPLES}];
          uniform int       uRippleActive[${MAX_RIPPLES}];
          uniform float     uRippleAmp;
          uniform float     uRippleSpeed;
          uniform float     uRippleLife;
          uniform float     uOpacity;

          varying vec2 vUv;

          // ── 2D Simplex noise (Ashima Arts / Stefan Gustavson, BSD license) ─
          vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
          vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
          vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v){
            const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                              -0.577350269189626, 0.024390243902439);
            vec2 i  = floor(v + dot(v, C.yy));
            vec2 x0 = v -   i + dot(i, C.xx);
            vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
            m = m*m; m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x  = a0.x  * x0.x  + h.x  * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          // Multi-octave noise — two layers of simplex at different frequencies
          float fbm(vec2 p) {
            float v = 0.0;
            v += snoise(p)        * 0.55;
            v += snoise(p * 2.1)  * 0.30;
            return v;
          }

          void main() {
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;

            // ── 1. Ambient ocean noise (two-axis displacement) ──────────────
            vec2 noiseUV = uv * uNoiseScale;
            noiseUV.x *= aspect; // keep noise circular not elliptical
            float t = uTime * uNoiseSpeed;
            float n1 = fbm(noiseUV + vec2(t, 0.0));
            float n2 = fbm(noiseUV + vec2(0.0, t * 0.7) + 100.0);
            vec2 noiseDisp = vec2(n1, n2) * uNoiseAmp;

            // ── 2. Cursor ripples (sum of all active ripples) ───────────────
            vec2 rippleDisp = vec2(0.0);
            for (int i = 0; i < ${MAX_RIPPLES}; i++) {
              if (uRippleActive[i] == 1) {
                vec2 rp = vec2(uRipplePositions[i * 2], uRipplePositions[i * 2 + 1]);
                vec2 toCenter = uv - rp;
                toCenter.x *= aspect;
                float dist = length(toCenter);
                float age = uRippleAges[i];
                float life = uRippleLife;
                float t01 = age / life;             // 0 -> 1 over the ripple's life

                // Expanding ring centered at (RIPPLE_SPEED * age)
                float ringPos = age * uRippleSpeed;
                float ringWidth = 0.15;
                float ringStrength = exp(-pow((dist - ringPos) / ringWidth, 2.0));
                float fade = pow(1.0 - t01, 2.0); // amplitude fades cubically

                // Radial outward direction
                vec2 dir = (dist > 0.0001) ? toCenter / dist : vec2(0.0);
                rippleDisp += dir * ringStrength * fade * uRippleAmp;
              }
            }

            // ── 3. Sample video at refracted UVs ────────────────────────────
            vec2 totalDisp = noiseDisp + rippleDisp;
            vec2 sampleUV = uv + totalDisp;
            // Clamp UVs so we don't pull from outside the texture (edge artifacts)
            sampleUV = clamp(sampleUV, 0.001, 0.999);
            vec3 videoColor = texture2D(uVideo, sampleUV).rgb;

            // ── 4. Mood tint ────────────────────────────────────────────────
            vec3 col = mix(videoColor, uTintColor, uTintStrength);

            // ── 5. Subtle specular highlight on wave crests ────────────────
            // Where noise is positive (crest), add a small white pop. Gives
            // the surface a sense of "wet" without overdoing it.
            float crest = smoothstep(0.4, 0.9, n1);
            col += vec3(crest * 0.06);

            gl_FragColor = vec4(col, uOpacity);
          }
        `,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })

      const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
      scene.add(quad)

      // ── Cursor tracking + ripple spawn ──────────────────────────────────
      // We spawn a new ripple whenever the cursor has traveled RIPPLE_SPAWN_DIST
      // (in normalized UV space) since the last spawn. That makes a continuous
      // trail of ripples follow the cursor.
      let lastSpawnX = -10
      let lastSpawnY = -10
      let nextRippleSlot = 0

      const spawnRipple = (uvX: number, uvY: number) => {
        // Find an inactive slot, or recycle the oldest
        let slot = -1
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (!rippleActive[i]) { slot = i; break }
        }
        if (slot === -1) {
          slot = nextRippleSlot
          nextRippleSlot = (nextRippleSlot + 1) % MAX_RIPPLES
        }
        ripplePositions[slot * 2]     = uvX
        ripplePositions[slot * 2 + 1] = uvY
        rippleAges[slot]   = 0
        rippleActive[slot] = 1
      }

      const handlePointerMove = (e: PointerEvent) => {
        // Convert to UV coords with origin top-left → bottom-left flip
        const uvX = e.clientX / window.innerWidth
        const uvY = 1 - e.clientY / window.innerHeight
        const dx = uvX - lastSpawnX
        const dy = uvY - lastSpawnY
        if (dx * dx + dy * dy > RIPPLE_SPAWN_DIST * RIPPLE_SPAWN_DIST) {
          spawnRipple(uvX, uvY)
          lastSpawnX = uvX
          lastSpawnY = uvY
        }
      }
      document.addEventListener('pointermove', handlePointerMove, { passive: true })

      // ── Viewport observer (pause when offscreen) ────────────────────────
      let inViewport = true
      const observer = new IntersectionObserver(
        ([entry]) => { inViewport = entry.isIntersecting },
        { threshold: 0 }
      )
      observer.observe(container)

      // ── Scroll fade ─────────────────────────────────────────────────────
      const scrollTrigger = ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: `+=${SCROLL_FADE_END}`,
        scrub: 0.5,
        onUpdate: (self) => {
          material.uniforms.uOpacity.value = 1 - self.progress * 0.92
        },
      })

      // ── Render loop ─────────────────────────────────────────────────────
      let lastTime = performance.now()
      let rafId = 0

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        if (!inViewport || document.hidden) {
          lastTime = performance.now()
          return
        }

        const now = performance.now()
        const dt = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now

        // Advance ripple ages, retire expired ones
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (rippleActive[i]) {
            rippleAges[i] += dt
            if (rippleAges[i] > RIPPLE_LIFE) rippleActive[i] = 0
          }
        }

        material.uniforms.uTime.value = now / 1000
        // Force uniform arrays to update (Three.js doesn't deep-compare them)
        material.uniformsNeedUpdate = true

        renderer.render(scene, camera)
      }
      animate()

      // ── Resize ──────────────────────────────────────────────────────────
      const handleResize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
        material.uniforms.uResolution.value.set(w, h)
      }
      window.addEventListener('resize', handleResize)

      // ── Cleanup ─────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('resize', handleResize)
        observer.disconnect()
        scrollTrigger.kill()

        quad.geometry.dispose()
        material.dispose()
        videoTexture.dispose()
        renderer.dispose()

        if (renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement)
        }
      }
    }

    init()

    return () => {
      cancelled = true
      cleanupRef.current?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  )
}