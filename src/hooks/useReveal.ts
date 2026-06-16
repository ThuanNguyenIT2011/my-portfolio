import { useCallback, useRef } from 'react'

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ref = useCallback(
    (el: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }
      if (!el) return

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible')
            observerRef.current?.disconnect()
          }
        },
        { threshold }
      )
      observerRef.current.observe(el)
    },
    [threshold]
  )

  return ref
}
