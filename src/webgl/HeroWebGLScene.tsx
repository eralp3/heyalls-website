import { useEffect, useRef } from 'react'

/**
 * HeroWebGLScene — Ecosystem Network (v2)
 * ────────────────────────────────────────────────────────────────────────────
 * Visualizes HeyAlls as a structured ecosystem, not a generic particle field.
 *
 * Improvements over v1:
 *   • Clustered topology: 4 service clusters around 1 central hub node
 *   • Node hierarchy: hub > primary > peripheral (different sizes)
 *   • Color-graded connections (warm core → cool edge)
 *   • Stronger, more responsive cursor attraction
 *   • Document-level cursor tracking (reliable across elements)
 */

const HUB_COUNT = 1            // central HeyAlls node
const CLUSTER_COUNT = 4        // service clusters (web, e-commerce, marketing, content)
const NODES_PER_CLUSTER = 7    // nodes in each cluster
const TOTAL_NODES = HUB_COUNT + CLUSTER_COUNT * NODES_PER_CLUSTER  // 29

const CONNECTION_DISTANCE = 3.2

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

      // ── Renderer ────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      // ── Scene + Camera ──────────────────────────────────────────────────
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        50,
        container.clientWidth / container.clientHeight,
        0.1,
        100
      )
      camera.position.set(0, 0, 14)
      camera.lookAt(0, 0, 0)

      // ── Generate structured node positions ─────────────────────────────
      // Hub at center, clusters arranged around it on a ring
      const initialPositions: { x: number; y: number; z: number; radius: number }[] = []
      const nodeSizes: number[] = []
      const nodeTypes: ('hub' | 'primary' | 'peripheral')[] = []

      // 1. Central hub
      initialPositions.push({ x: 0, y: 0, z: 0, radius: 0.4 })
      nodeSizes.push(0.55)
      nodeTypes.push('hub')

      // 2. Clusters arranged in a ring around the hub
      const clusterRadius = 5.5
      for (let c = 0; c < CLUSTER_COUNT; c++) {
        const angle = (c / CLUSTER_COUNT) * Math.PI * 2
        const clusterCenterX = Math.cos(angle) * clusterRadius
        const clusterCenterY = Math.sin(angle) * clusterRadius
        const clusterCenterZ = (Math.random() - 0.5) * 1.5

        // First node of cluster = primary (larger, sits at cluster center)
        initialPositions.push({
          x: clusterCenterX,
          y: clusterCenterY,
          z: clusterCenterZ,
          radius: 0.35,
        })
        nodeSizes.push(0.32)
        nodeTypes.push('primary')

        // Remaining nodes = peripheral, scattered around the primary
        for (let n = 1; n < NODES_PER_CLUSTER; n++) {
          const localR = 1.2 + Math.random() * 1.4
          const localAngle = Math.random() * Math.PI * 2
          const localPhi = Math.acos(2 * Math.random() - 1)
          initialPositions.push({
            x: clusterCenterX + localR * Math.sin(localPhi) * Math.cos(localAngle),
            y: clusterCenterY + localR * Math.sin(localPhi) * Math.sin(localAngle),
            z: clusterCenterZ + localR * Math.cos(localPhi) * 0.4,
            radius: 0.25,
          })
          nodeSizes.push(0.16 + Math.random() * 0.04)
          nodeTypes.push('peripheral')
        }
      }

      // ── Nodes — per-vertex size attribute for hierarchy ─────────────────
      const nodePositions = new Float32Array(TOTAL_NODES * 3)
      const nodeSizesArr = new Float32Array(TOTAL_NODES)
      initialPositions.forEach((p, i) => {
        nodePositions[i * 3]     = p.x
        nodePositions[i * 3 + 1] = p.y
        nodePositions[i * 3 + 2] = p.z
        nodeSizesArr[i] = nodeSizes[i]
      })

      const nodeGeometry = new THREE.BufferGeometry()
      const nodePositionAttr = new THREE.BufferAttribute(nodePositions, 3)
      const nodeSizeAttr = new THREE.BufferAttribute(nodeSizesArr, 1)
      nodeGeometry.setAttribute('position', nodePositionAttr)
      nodeGeometry.setAttribute('aSize', nodeSizeAttr)

      // Custom shader for per-vertex sized points with soft circular falloff
      const nodeMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uOpacity: { value: 1.0 },
          uColor:   { value: new THREE.Color(0xffffff) },
        },
        vertexShader: /* glsl */ `
          attribute float aSize;
          varying float vSize;
          void main() {
            vSize = aSize;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            // Size attenuated by depth — far nodes smaller
            gl_PointSize = aSize * 300.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform float uOpacity;
          uniform vec3  uColor;
          varying float vSize;
          void main() {
            // Soft round disc — center bright, edges fade out
            vec2 c = gl_PointCoord - vec2(0.5);
            float d = length(c);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.0, d) * uOpacity;
            // Larger nodes get an extra-bright core
            float coreBoost = smoothstep(0.5, 0.0, d) * (vSize * 0.5);
            gl_FragColor = vec4(uColor + vec3(coreBoost), alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial)
      scene.add(nodePoints)

      // ── Connection lines ───────────────────────────────────────────────
      const maxLines = (TOTAL_NODES * (TOTAL_NODES - 1)) / 2
      const linePositions = new Float32Array(maxLines * 2 * 3)
      const lineColors = new Float32Array(maxLines * 2 * 3)
      const lineGeometry = new THREE.BufferGeometry()
      const linePositionAttr = new THREE.BufferAttribute(linePositions, 3)
      const lineColorAttr = new THREE.BufferAttribute(lineColors, 3)
      lineGeometry.setAttribute('position', linePositionAttr)
      lineGeometry.setAttribute('color', lineColorAttr)

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial)
      scene.add(lineSegments)

      // ── Physics worker ──────────────────────────────────────────────────
      const worker = new Worker('/physics-worker.js')
      worker.postMessage({ type: 'init', nodes: initialPositions })

      worker.onmessage = (e) => {
        const msg = e.data
        if (msg.type === 'transforms') {
          nodePositions.set(msg.data as Float32Array)
          nodePositionAttr.needsUpdate = true
        }
      }

      // ── Cursor tracking ─────────────────────────────────────────────────
      // Listen on document (not window) and never deactivate while user
      // is on the page. Removes the unreliable pointerleave behavior.
      const raycaster = new THREE.Raycaster()
      const ndc = new THREE.Vector2()
      const cursorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
      const cursorWorld = new THREE.Vector3()

      const handlePointerMove = (e: PointerEvent) => {
        ndc.x = (e.clientX / window.innerWidth) * 2 - 1
        ndc.y = -(e.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(ndc, camera)
        raycaster.ray.intersectPlane(cursorPlane, cursorWorld)
        worker.postMessage({
          type: 'cursor',
          x: cursorWorld.x,
          y: cursorWorld.y,
          z: cursorWorld.z,
          active: true,
        })
      }
      // Listen on document so the cursor is tracked over ANY element
      document.addEventListener('pointermove', handlePointerMove, { passive: true })

      // ── ScrollTrigger — fade scene as user scrolls past hero ────────────
      const scrollTrigger = ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: '+=800',
        scrub: 0.5,
        onUpdate: (self) => {
          const opacity = 1 - self.progress * 0.95
          nodeMaterial.uniforms.uOpacity.value = opacity
          lineMaterial.opacity = opacity * 0.75
          camera.position.z = 14 + self.progress * 6
        },
      })

      // ── Render loop ─────────────────────────────────────────────────────
      let lastTime = performance.now()
      let rafId = 0
      let isVisible = true
      const visibilityHandler = () => { isVisible = !document.hidden }
      document.addEventListener('visibilitychange', visibilityHandler)

      const animate = () => {
        rafId = requestAnimationFrame(animate)
        if (!isVisible) return

        const now = performance.now()
        const dt = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now

        worker.postMessage({ type: 'tick', dt })

        // Recompute connection lines with color grading
        let lineIndex = 0
        const connectDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE

        for (let i = 0; i < TOTAL_NODES; i++) {
          const ax = nodePositions[i * 3]
          const ay = nodePositions[i * 3 + 1]
          const az = nodePositions[i * 3 + 2]
          const aIsHub = nodeTypes[i] === 'hub'
          const aIsPrimary = nodeTypes[i] === 'primary'

          for (let j = i + 1; j < TOTAL_NODES; j++) {
            const bx = nodePositions[j * 3]
            const by = nodePositions[j * 3 + 1]
            const bz = nodePositions[j * 3 + 2]
            const dx = ax - bx
            const dy = ay - by
            const dz = az - bz
            const distSq = dx * dx + dy * dy + dz * dz
            if (distSq < connectDistSq) {
              const alpha = 1 - Math.sqrt(distSq) / CONNECTION_DISTANCE

              // Hub-to-anything and primary-to-anything lines are brighter
              const bIsHub = nodeTypes[j] === 'hub'
              const bIsPrimary = nodeTypes[j] === 'primary'
              const importance =
                (aIsHub || bIsHub) ? 1.5 :
                (aIsPrimary || bIsPrimary) ? 1.15 :
                0.85

              const o = lineIndex * 6
              linePositions[o]     = ax
              linePositions[o + 1] = ay
              linePositions[o + 2] = az
              linePositions[o + 3] = bx
              linePositions[o + 4] = by
              linePositions[o + 5] = bz

              // Color grading: warm white near hub, cool blue at periphery
              const distFromCenter = Math.sqrt(ax * ax + ay * ay + az * az)
              const cooling = Math.min(distFromCenter / 8, 1)
              const r = (0.95 - cooling * 0.55) * alpha * importance
              const g = (0.97 - cooling * 0.30) * alpha * importance
              const b = (1.00 - cooling * 0.05) * alpha * importance

              lineColors[o]     = r
              lineColors[o + 1] = g
              lineColors[o + 2] = b
              lineColors[o + 3] = r
              lineColors[o + 4] = g
              lineColors[o + 5] = b
              lineIndex++
            }
          }
        }

        linePositionAttr.needsUpdate = true
        lineColorAttr.needsUpdate = true
        lineGeometry.setDrawRange(0, lineIndex * 2)

        renderer.render(scene, camera)
      }
      animate()

      // ── Resize ──────────────────────────────────────────────────────────
      const handleResize = () => {
        if (!container) return
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }
      window.addEventListener('resize', handleResize)

      // ── Cleanup ─────────────────────────────────────────────────────────
      cleanupRef.current = () => {
        cancelAnimationFrame(rafId)
        document.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('visibilitychange', visibilityHandler)
        scrollTrigger.kill()
        worker.postMessage({ type: 'dispose' })
        worker.terminate()
        nodeGeometry.dispose()
        nodeMaterial.dispose()
        lineGeometry.dispose()
        lineMaterial.dispose()
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