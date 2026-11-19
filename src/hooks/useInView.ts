import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  /** Stop observing after the first time the element becomes visible. */
  once?: boolean
  /** IntersectionObserver rootMargin; negative bottom triggers slightly before fully in view. */
  rootMargin?: string
  threshold?: number
}

/**
 * Tracks whether an element is in the viewport.
 * Used by every scroll-triggered animation on the marketing pages.
 */
export function useInView<T extends Element = HTMLDivElement>({
  once = true,
  rootMargin = '0px 0px -12% 0px',
  threshold = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null)
  // Without IntersectionObserver support, show everything immediately.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once, rootMargin, threshold])

  return { ref, inView }
}
