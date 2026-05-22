// HeyAlls Service Worker
// Strategy: Cache First for static assets, Network First for pages
const CACHE_NAME = 'heyalls-v1'

const STATIC_ASSETS = [
  '/',
  '/bg-poster.webp',
  '/favicon.svg',
  '/manifest.json',
]

// Install — pre-cache critical static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate — delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch — Cache First for assets, Network First for navigation
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET and cross-origin requests
  if (request.method !== 'GET' || url.origin !== location.origin) return

  // Cache First: images, fonts, videos, JS/CSS bundles
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    request.destination === 'video' ||
    request.destination === 'script' ||
    request.destination === 'style'
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
      })
    )
    return
  }

  // Network First: HTML pages — always try network, fall back to cache
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          }
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/')))
    )
  }
})