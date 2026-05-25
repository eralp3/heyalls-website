import { useEffect, useRef } from 'react'

/**
 * HeroWebGLScene — Microscopic Refraction (Whisper Edition)
 * ────────────────────────────────────────────────────────────────────────────
 * The surface is now an absolute whisper. The video reads almost untouched.
 * Effect only becomes visible under interaction: cursor ripples, click splash,
 * scroll velocity.
 */

interface SeasonState {
  color:      { r: number; g: number; b: number }
  noiseSpeed: number
  noiseAmp:   number
  noiseScale: number
  specular:   number
}

const SEASONS: SeasonState[] = [
  // 0. Summer — ultra-calm, near-invisible
  { color: { r: 0.02, g: 0.14, b: 0.20 }, noiseSpeed: 0.08, noiseAmp: 0.0005, noiseScale: 3.5, specular: 0.01 },
  // 1. Autumn — slightly more presence (mid-page accent)
  { color: { r: 0.18, g: 0.11, b: 0.08 }, noiseSpeed: 0.25, noiseAmp: 0.0015, noiseScale: 2.8, specular: 0.02 },
  // 2. Winter — frozen still, but retained gloss for ice highlights
  { color: { r: 0.08, g: 0.18, b: 0.26 }, noiseSpeed: 0.01, noiseAmp: 0.0002, noiseScale: 5.0, specular: 0.05 },
  // 3. Spring — gentle micro motion
  { color: { r: 0.05, g: 0.20, b: 0.18 }, noiseSpeed: 0.15, noiseAmp: 0.0008, noiseScale: 3.0, specular: 0.01 },
]

const TINT_STRENGTH      = 0.05   // ↓ from 0.20 — video shines through almost untouched
const RIPPLE_MOVE_AMP    = 0.010
const RIPPLE_CLICK_AMP   = 0.025
const RIPPLE_RING_WIDTH  = 0.08
const RIPPLE_SPEED       = 1.6
const RIPPLE_LIFE        = 1.8
const RIPPLE_SPAWN_DIST  = 0.03

const VELOCITY_NORMALIZE = 3000
const VELOCITY_MAX       = 1.5
const VELOCITY_DAMP      = 6.0
const VELOCITY_MULT      = 1.2

const RGB_SHIFT_BASE     = 0.0005 // ↓ from 0.001 — even quieter baseline aberration
const RGB_SHIFT_VELOCITY = 20.0

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

      const videoEl = document.getElementById('bg-video') as HTMLVideoElement | null
      if (!videoEl) {
        console.warn('[HeroWebGLScene] No <video id="bg-video"> in DOM — refraction disabled')
        return
      }
      videoEl.muted = true
      videoEl.playsInline = true
      videoEl.play().catch(() => { /* autoplay policy — silent */ })

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1)

      const videoTexture = new THREE.VideoTexture(videoEl)
      videoTexture.minFilter = THREE.LinearFilter
      videoTexture.magFilter = THREE.LinearFilter
      ;(videoTexture as unknown as { colorSpace?: string }).colorSpace = THREE.SRGBColorSpace

      const ripplePositions  = new Float32Array(MAX_RIPPLES * 2)
      const rippleAges       = new Float32Array(MAX_RIPPLES)
      const rippleActive     = new Int32Array(MAX_RIPPLES)
      const rippleAmplitudes = new Float32Array(MAX_RIPPLES)

      const initial = SEASONS[0]

      const material = new THREE.ShaderMaterial({
        uniforms: {
          uVideo:            { value: videoTexture },
          uTime:             { value: 0 },
          uResolution:       { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          uTintColor:        { value: new THREE.Vector3(initial.color.r, initial.color.g, initial.color.b) },
          uTintStrength:     { value: TINT_STRENGTH },
          uNoiseAmp:         { value: initial.noiseAmp },
          uNoiseScale:       { value: initial.noiseScale },
          uNoiseSpeed:       { value: initial.noiseSpeed },
          uRipplePositions:  { value: ripplePositions },
          uRippleAges:       { value: rippleAges },
          uRippleActive:     { value: rippleActive },
          uRippleAmplitudes: { value: rippleAmplitudes },
          uRippleSpeed:      { value: RIPPLE_SPEED },
          uRippleLife:       { value: RIPPLE_LIFE },
          uRippleRingWidth:  { value: RIPPLE_RING_WIDTH },
          uSpecular:         { value: initial.specular },
          uOpacity:          { value: 1.0 },
          uScrollVelocity:   { value: 0.0 },
          uRGBShift:         { value: RGB_SHIFT_BASE },
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
          uniform float     uScrollVelocity;
          uniform float     uRGBShift;

          varying vec2 vUv;

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

          float fbm(vec2 p) {
            return snoise(p) * 0.85 + snoise(p * 2.1) * 0.15;
          }

          void main() {
            vec2 uv = vUv;
            float aspect = uResolution.x / uResolution.y;

            vec2 noiseUV = uv * uNoiseScale;
            noiseUV.x *= aspect;
            float t = uTime * uNoiseSpeed;
            float n1 = fbm(noiseUV + vec2(t, 0.0));
            float n2 = fbm(noiseUV + vec2(0.0, t * 0.7) + 100.0);
            vec2 noiseDisp = vec2(n1, n2) * uNoiseAmp;

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
                float fade = pow(1.0 - t01, 3.0);

                vec2 dir = (dist > 0.0001) ? toCenter / dist : vec2(0.0);
                rippleDisp += dir * ringStrength * fade * uRippleAmplitudes[i];
              }
            }

            float velMag = abs(uScrollVelocity);
            vec2 totalDisp = (noiseDisp + rippleDisp) * (1.0 + velMag * ${VELOCITY_MULT.toFixed(2)});

            vec2 sampleUV = clamp(uv + totalDisp, 0.001, 0.999);

            float shift = uRGBShift * (1.0 + velMag * ${RGB_SHIFT_VELOCITY.toFixed(1)});
            vec2 uvR = clamp(sampleUV + totalDisp * shift, 0.001, 0.999);
            vec2 uvG = sampleUV;
            vec2 uvB = clamp(sampleUV - totalDisp * shift, 0.001, 0.999);

            vec3 videoColor = vec3(
              texture2D(uVideo, uvR).r,
              texture2D(uVideo, uvG).g,
              texture2D(uVideo, uvB).b
            );

            vec3 col = mix(videoColor, uTintColor, uTintStrength);

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

      const spawnRipple = (uvX: number, uvY: number, amplitude: number) => {
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

      const handlePointerDown = (e: PointerEvent) => {
        const uvX = e.clientX / window.innerWidth
        const uvY = 1 - e.clientY / window.innerHeight
        spawnRipple(uvX, uvY, RIPPLE_CLICK_AMP)
      }
      document.addEventListener('pointerdown', handlePointerDown, { passive: true })

      let inViewport = true
      const observer = new IntersectionObserver(
        ([entry]) => { inViewport = entry.isIntersecting },
        { threshold: 0 }
      )
      observer.observe(container)

      const tmpColorA = new THREE.Color()
      const tmpColorB = new THREE.Color()
      const tmpColorOut = new THREE.Color()

      const applySeasonAt = (progress: number) => {
        const N = SEASONS.length
        const segCount = N - 1
        const p = Math.min(Math.max(progress, 0), 1) * segCount
        const segIdx = Math.min(Math.floor(p), segCount - 1)
        const segT   = p - segIdx
        const A = SEASONS[segIdx]
        const B = SEASONS[segIdx + 1]

        tmpColorA.setRGB(A.color.r, A.color.g, A.color.b)
        tmpColorB.setRGB(B.color.r, B.color.g, B.color.b)
        tmpColorOut.lerpColors(tmpColorA, tmpColorB, segT)

        const tint = material.uniforms.uTintColor.value
        tint.set(tmpColorOut.r, tmpColorOut.g, tmpColorOut.b)

        material.uniforms.uNoiseSpeed.value = THREE.MathUtils.lerp(A.noiseSpeed, B.noiseSpeed, segT)
        material.uniforms.uNoiseAmp.value   = THREE.MathUtils.lerp(A.noiseAmp,   B.noiseAmp,   segT)
        material.uniforms.uNoiseScale.value = THREE.MathUtils.lerp(A.noiseScale, B.noiseScale, segT)
        material.uniforms.uSpecular.value   = THREE.MathUtils.lerp(A.specular,   B.specular,   segT)

        const dip = 1 - Math.sin(progress * Math.PI) * 0.15
        material.uniforms.uOpacity.value = dip
      }

      applySeasonAt(0)

      let velocityTarget = 0

      const seasonScrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          applySeasonAt(self.progress)
          const raw = self.getVelocity() / VELOCITY_NORMALIZE
          velocityTarget = Math.max(-VELOCITY_MAX, Math.min(VELOCITY_MAX, raw))
        },
      })

      let currentVelocity = 0
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

        velocityTarget *= Math.exp(-VELOCITY_DAMP * dt * 0.5)
        const k = 1 - Math.exp(-VELOCITY_DAMP * dt)
        currentVelocity += (velocityTarget - currentVelocity) * k
        material.uniforms.uScrollVelocity.value = currentVelocity

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

      const handleResize = () => {
        const w = window.innerWidth
        const h = window.innerHeight
        renderer.setSize(w, h)
        material.uniforms.uResolution.value.set(w, h)
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)

      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerdown', handlePointerDown)
        window.removeEventListener('resize', handleResize)
        observer.disconnect()
        seasonScrollTrigger.kill()

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