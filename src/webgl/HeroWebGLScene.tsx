import { useEffect, useRef } from 'react'

/**
 * HeroWebGLScene — Subtle Sea Surface / Interactive Refraction
 * ────────────────────────────────────────────────────────────────────────────
 * Glass-like distortion of the existing HTML background video.
 *   • Cursor move → faint ripple trail
 *   • Click → bigger, more impactful "splash" ripple
 *   • Both types share one ripple buffer with per-slot amplitude
 *
 * Architecture:
 *   • Single fullscreen quad on an OrthographicCamera
 *   • VideoTexture from <video id="bg-video">
 *   • Custom fragment shader: noise + ripple ring field → UV refraction
 *   • One draw call per frame; no render targets, no post-processing
 */

// ─── TUNING ─────────────────────────────────────────────────────────────────
const TINT_COLOR        = { r: 0.00, g: 0.10, b: 0.17 }  // #001a2c
const TINT_STRENGTH     = 0.45

const NOISE_AMPLITUDE   = 0.007    // very subtle ambient surface vibration
const NOISE_SCALE       = 6.5      // high frequency → fine "glass" texture
const NOISE_SPEED       = 0.18

const RIPPLE_MOVE_AMP   = 0.010    // light cursor-trail ripples
const RIPPLE_CLICK_AMP  = 0.025    // bigger, more impactful click ripples
const RIPPLE_RING_WIDTH = 0.08
const RIPPLE_SPEED      = 1.6
const RIPPLE_LIFE       = 1.8
const RIPPLE_SPAWN_DIST = 0.03     // min UV travel between trail ripples

const SPECULAR_INTENSITY = 0.06
const SCROLL_FADE_END    = 800

const MAX_RIPPLES = 5

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

      // ── DOM contract ────────────────────────────────────────────────────
      const videoEl = document.getElementById('bg-video') as HTMLVideoElement | null
      if (!videoEl) {
        console.warn('[HeroWebGLScene] No <video id="bg-video"> in DOM — refraction disabled')
        return
      }
      videoEl.muted = true
      videoEl.playsInline = true
      videoEl.play().catch(() => { /* autoplay policy — silent */ })

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ── Scene + Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)

      // ── Video texture (SRGB color space) ────────────────────────────────
      const videoTexture = new THREE.VideoTexture(videoEl)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      ;(videoTexture as unknown as { colorSpace?: string }).colorSpace = THREE.SRGBColorSpace

      // ── Ripple ring buffer (move + click ripples share this) ────────────
      // Each ripple has: position (x,y in UV), age (s), active (0/1), amp.
      // Per-slot amplitude lets click ripples coexist with move ripples
      // without one overwriting the other's strength.
      const ripplePositions  = new Float32Array(MAX_RIPPLES * 2)
      const rippleAges       = new Float32Array(MAX_RIPPLES)
      const rippleActive     = new Int32Array(MAX_RIPPLES)
      const rippleAmplitudes = new Float32Array(MAX_RIPPLES)

      // ── Shader material ─────────────────────────────────────────────────
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uVideo:            { value: videoTexture },
          uTime:             { value: 0 },
          uResolution:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTintColor:        { value: new THREE.Vector3(TINT_COLOR.r, TINT_COLOR.g, TINT_COLOR.b) },
          uTintStrength:     { value: TINT_STRENGTH },
          uNoiseAmp:         { value: NOISE_AMPLITUDE },
          uNoiseScale:       { value: NOISE_SCALE },
          uNoiseSpeed:       { value: NOISE_SPEED },
          uRipplePositions:  { value: ripplePositions },
          uRippleAges:       { value: rippleAges },
          uRippleActive:     { value: rippleActive },
          uRippleAmplitudes: { value: rippleAmplitudes },
          uRippleSpeed:      { value: RIPPLE_SPEED },
          uRippleLife:       { value: RIPPLE_LIFE },
          uRippleRingWidth:  { value: RIPPLE_RING_WIDTH },
          uSpecular:         { value: SPECULAR_INTENSITY },
          uOpacity:          { value: 1.0 },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
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
          uniform float     uRippleAmplitudes[${MAX_RIPPLES}];
          uniform float     uRippleSpeed;
          uniform float     uRippleLife;
          uniform float     uRippleRingWidth;
          uniform float     uSpecular;
          uniform float     uOpacity;

          varying vec2 vUv;

          // ── 2D Simplex noise (Ashima Arts / Stefan Gustavson, BSD) ──────
          vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
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

          // Multi-octave: dominant low + faint high-frequency shimmer
          float fbm(vec2 p) {
            return snoise(p) * 0.85 + snoise(p * 2.1) * 0.15;
          }

          void main() {
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;

            // ── 1. Ambient noise displacement ───────────────────────────────
            vec2 noiseUV = uv * uNoiseScale;
            noiseUV.x *= aspect;
            float t = uTime * uNoiseSpeed;
            float n1 = fbm(noiseUV + vec2(t, 0.0));
            float n2 = fbm(noiseUV + vec2(0.0, t * 0.7) + 100.0);
            vec2 noiseDisp = vec2(n1, n2) * uNoiseAmp;

            // ── 2. Sum of active ripples (per-slot amplitude) ───────────────
            vec2 rippleDisp = vec2(0.0);
            for (int i = 0; i < ${MAX_RIPPLES}; i++) {
              if (uRippleActive[i] == 1) {
                vec2 rp = vec2(uRipplePositions[i * 2], uRipplePositions[i * 2 + 1]);
                vec2 toCenter = uv - rp;
                toCenter.x *= aspect;
                float dist = length(toCenter);

                float age  = uRippleAges[i];
                float t01  = age / uRippleLife;
                float ringPos = age * uRippleSpeed;
                float ringStrength = exp(-pow((dist - ringPos) / uRippleRingWidth, 2.0));
                float fade = pow(1.0 - t01, 2.0);

                vec2 dir = (dist > 0.0001) ? toCenter / dist : vec2(0.0);
                rippleDisp += dir * ringStrength * fade * uRippleAmplitudes[i];
              }
            }

            // ── 3. Refraction: sample video at displaced UVs ────────────────
            vec2 sampleUV = clamp(uv + noiseDisp + rippleDisp, 0.001, 0.999);
            vec3 videoColor = texture2D(uVideo, sampleUV).rgb;

            // ── 4. Navy tint ────────────────────────────────────────────────
            vec3 col = mix(videoColor, uTintColor, uTintStrength);

            // ── 5. Glassy specular highlight on noise crests ────────────────
            float crest = smoothstep(0.4, 0.9, n1);
            col += vec3(crest * uSpecular);

            gl_FragColor = vec4(col, uOpacity);
          }
        `,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      })

      const geometry = new THREE.PlaneGeometry(2, 2)
      const quad = new THREE.Mesh(geometry, material)
      scene.add(quad)

      // ── Ripple spawning (shared by move + click) ────────────────────────
      const spawnRipple = (uvX: number, uvY: number, amplitude: number) => {
        // Find an inactive slot, otherwise recycle the oldest
        let slot = -1
        let oldestAge = -1
        let oldestIdx = 0
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (rippleActive[i] === 0) { slot = i; break }
          if (rippleAges[i] > oldestAge) { oldestAge = rippleAges[i]; oldestIdx = i }
        }
        if (slot === -1) slot = oldestIdx

        ripplePositions[slot * 2]     = uvX
        ripplePositions[slot * 2 + 1] = uvY
        rippleAges[slot]       = 0
        rippleActive[slot]     = 1
        rippleAmplitudes[slot] = amplitude
      }

      // ── Pointer MOVE — trail of subtle ripples ──────────────────────────
      let lastSpawnX = -10
      let lastSpawnY = -10
      const handlePointerMove = (e: PointerEvent) => {
        const uvX = e.clientX / window.innerWidth
        const uvY = 1 - e.clientY / window.innerHeight
        const dx = uvX - lastSpawnX
        const dy = uvY - lastSpawnY
        if (dx * dx + dy * dy > RIPPLE_SPAWN_DIST * RIPPLE_SPAWN_DIST) {
          spawnRipple(uvX, uvY, RIPPLE_MOVE_AMP)
          lastSpawnX = uvX
          lastSpawnY = uvY
        }
      }
      document.addEventListener('pointermove', handlePointerMove, { passive: true })

      // ── Pointer DOWN — single, larger "splash" ──────────────────────────
      const handlePointerDown = (e: PointerEvent) => {
        const uvX = e.clientX / window.innerWidth
        const uvY = 1 - e.clientY / window.innerHeight
        spawnRipple(uvX, uvY, RIPPLE_CLICK_AMP)
      }
      document.addEventListener('pointerdown', handlePointerDown, { passive: true })

      // ── Viewport observer (pause RAF when offscreen) ────────────────────
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

        // Age out ripples
        for (let i = 0; i < MAX_RIPPLES; i++) {
          if (rippleActive[i] === 1) {
            rippleAges[i] += dt
            if (rippleAges[i] > RIPPLE_LIFE) rippleActive[i] = 0
          }
        }

        material.uniforms.uTime.value = now / 1000
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

      // ── Cleanup (strict, no leaks) ──────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerdown', handlePointerDown)
        window.removeEventListener('resize', handleResize)
        observer.disconnect()
        scrollTrigger.kill()

        geometry.dispose()
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