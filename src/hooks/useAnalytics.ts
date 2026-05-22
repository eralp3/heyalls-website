import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * useAnalytics — Google Analytics 4 integration.
 *
 * SETUP:
 * 1. Add your GA4 measurement ID to .env:
 *    VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *
 * 2. Add the GA script to index.html <head>:
 *    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
 *    <script>
 *      window.dataLayer = window.dataLayer || [];
 *      function gtag(){dataLayer.push(arguments);}
 *      gtag('js', new Date());
 *      gtag('config', 'G-XXXXXXXXXX', { send_page_view: false });
 *    </script>
 *    (Replace G-XXXXXXXXXX with your actual ID in both places)
 *
 * 3. Call useAnalytics() once in App.tsx — it auto-tracks all page views.
 *
 * 4. Use trackEvent() anywhere for custom events:
 *    const { trackEvent } = useAnalytics()
 *    trackEvent('form_submit', { service: 'danismanlik' })
 *    trackEvent('cta_click', { location: 'hero' })
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args)
  }
}

export function useAnalytics() {
  const location = useLocation()

  // Auto-track page views on every route change
  useEffect(() => {
    if (!GA_ID) return
    gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    })
  }, [location])

  // Manual event tracking helper
  const trackEvent = useCallback(
    (eventName: string, params?: Record<string, string | number | boolean>) => {
      if (!GA_ID) {
        if (import.meta.env.DEV) {
          console.log(`[Analytics] ${eventName}`, params)
        }
        return
      }
      gtag('event', eventName, params)
    },
    []
  )

  return { trackEvent }
}