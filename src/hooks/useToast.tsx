import { useState, useCallback, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let toastId = 0

/**
 * useToast — lightweight toast notification system.
 * No external library. Self-dismissing after 4s.
 *
 * Usage:
 *   const { toasts, showToast, removeToast } = useToast()
 *   showToast('Talebiniz alındı!', 'success')
 *   // Render <ToastContainer toasts={toasts} onRemove={removeToast} /> anywhere
 */
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    // Auto-dismiss after 4s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, showToast, removeToast }
}

// ── ToastContainer ────────────────────────────────────────────────────────────

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: number) => void
}

const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
}

const colors: Record<ToastType, string> = {
  success: 'border-green-500/30 bg-green-500/10 text-green-400',
  error: 'border-red-500/30 bg-red-500/10 text-red-400',
  info: 'border-white/20 bg-white/10 text-white/80',
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Tiny delay so the enter animation fires after mount
    const t = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className={`flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl
        shadow-2xl cursor-pointer max-w-sm w-full
        transition-all duration-400 ease-out
        ${colors[toast.type]}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
      onClick={onRemove}
      role="alert"
    >
      <span className="text-sm font-medium shrink-0 w-5 text-center">
        {icons[toast.type]}
      </span>
      <span className="text-sm leading-snug flex-1">{toast.message}</span>
      <span className="text-white/30 text-xs ml-2 shrink-0">✕</span>
    </div>
  )
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    // Fixed top-center on mobile, top-right on desktop
    <div className="fixed top-24 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[99999] flex flex-col gap-3 items-center md:items-end px-4 md:px-0">
      {toasts.map(toast => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => onRemove(toast.id)}
        />
      ))}
    </div>
  )
}