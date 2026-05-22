import { useEffect } from 'react'

/**
 * On iOS, the virtual keyboard slides up and can cover focused form inputs.
 * This hook listens for focus events on inputs/textareas inside the given
 * form ref and scrolls the element into view with a small delay
 * (letting the keyboard finish animating first).
 *
 * Usage:
 *   const formRef = useRef<HTMLFormElement>(null)
 *   useScrollToInput(formRef)
 */
export function useScrollToInput(
  formRef: React.RefObject<HTMLFormElement | null>
) {
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT'
      ) {
        // Small delay so the keyboard finishes sliding up before we scroll
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 320)
      }
    }

    form.addEventListener('focusin', handleFocus)
    return () => form.removeEventListener('focusin', handleFocus)
  }, [formRef])
}