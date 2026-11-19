import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/** Animates a number from 0 to `end` once `start` becomes true. */
export function useCountUp(
  end: number,
  { start, duration = 2000 }: { start: boolean; duration?: number },
) {
  const reducedMotion = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  const animate = start && !reducedMotion

  useEffect(() => {
    if (!animate) return

    let frame = 0
    const startedAt = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      setValue(Math.round(easeOutCubic(progress) * end))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [animate, end, duration])

  // Reduced motion: jump straight to the final number.
  return start && reducedMotion ? end : value
}
