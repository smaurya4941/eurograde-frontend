import { useSyncExternalStore } from 'react'

function subscribe(onChange: () => void) {
  let frame = 0
  const handler = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(onChange)
  }
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('resize', handler, { passive: true })
  return () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', handler)
    window.removeEventListener('resize', handler)
  }
}

/**
 * Current vertical scroll offset, throttled to one update per animation frame.
 * Pass a `select` function to derive a coarse value (e.g. a boolean) so the
 * component only re-renders when that value changes.
 */
export function useScrollY<T = number>(select: (scrollY: number) => T = (y) => y as T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(window.scrollY),
    () => select(0),
  )
}
