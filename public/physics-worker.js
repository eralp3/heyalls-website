// public/physics-worker.js — v3 (ecosystem network with stronger attraction)

importScripts('https://cdn.jsdelivr.net/npm/cannon-es@0.20.0/dist/cannon-es.js')

let world = null
let nodeBodies = []
let cursorBody = null
let cursorActive = false
let transformBuffer = null

// Attraction tuned to be obviously visible
const ATTRACT_RADIUS = 5.5     // larger reach
const ATTRACT_FORCE  = 9.0     // much stronger pull (was 3.5)
const HOME_FORCE     = 0.18    // gentle pull back to origin

self.onmessage = (e) => {
  const msg = e.data

  if (msg.type === 'init') {
    setupWorld(msg.nodes)
  } else if (msg.type === 'cursor') {
    if (cursorBody) {
      cursorBody.position.set(msg.x, msg.y, msg.z)
      cursorActive = !!msg.active
    }
  } else if (msg.type === 'tick') {
    if (!world) return
    applyForces()
    world.step(1 / 60, msg.dt, 3)
    postTransforms()
  } else if (msg.type === 'dispose') {
    world = null
    nodeBodies = []
    cursorBody = null
  }
}

function setupWorld(nodes) {
  world = new CANNON.World({ gravity: new CANNON.Vec3(0, 0, 0) })
  world.broadphase = new CANNON.NaiveBroadphase()
  world.solver.iterations = 4
  world.allowSleep = false

  nodeBodies = nodes.map((n) => {
    const body = new CANNON.Body({
      mass: 1,
      linearDamping: 0.78,
      angularDamping: 0.9,
    })
    body.addShape(new CANNON.Sphere(n.radius))
    body.position.set(n.x, n.y, n.z)
    body.velocity.set(
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3,
      (Math.random() - 0.5) * 0.3
    )
    body.homePos = new CANNON.Vec3(n.x, n.y, n.z)
    world.addBody(body)
    return body
  })

  cursorBody = new CANNON.Body({
    mass: 0,
    type: CANNON.Body.KINEMATIC,
  })
  cursorBody.addShape(new CANNON.Sphere(0.3))
  cursorBody.position.set(0, 0, 100)
  world.addBody(cursorBody)

  transformBuffer = new Float32Array(nodeBodies.length * 3)
}

function applyForces() {
  if (!cursorBody) return

  const cp = cursorBody.position

  for (let i = 0; i < nodeBodies.length; i++) {
    const body = nodeBodies[i]
    const bp = body.position

    // 1. Home force
    body.applyForce(
      new CANNON.Vec3(
        (body.homePos.x - bp.x) * HOME_FORCE,
        (body.homePos.y - bp.y) * HOME_FORCE,
        (body.homePos.z - bp.z) * HOME_FORCE
      ),
      bp
    )

    // 2. Cursor attraction (much more visible)
    if (cursorActive) {
      const dx = cp.x - bp.x
      const dy = cp.y - bp.y
      const dz = cp.z - bp.z
      const distSq = dx * dx + dy * dy + dz * dz
      if (distSq < ATTRACT_RADIUS * ATTRACT_RADIUS && distSq > 0.04) {
        const dist = Math.sqrt(distSq)
        const falloff = 1 - dist / ATTRACT_RADIUS
        const strength = ATTRACT_FORCE * falloff * falloff
        body.applyForce(
          new CANNON.Vec3(
            (dx / dist) * strength,
            (dy / dist) * strength,
            (dz / dist) * strength
          ),
          bp
        )
      }
    }
  }
}

function postTransforms() {
  for (let i = 0; i < nodeBodies.length; i++) {
    const p = nodeBodies[i].position
    const o = i * 3
    transformBuffer[o]     = p.x
    transformBuffer[o + 1] = p.y
    transformBuffer[o + 2] = p.z
  }
  self.postMessage({ type: 'transforms', data: transformBuffer })
}