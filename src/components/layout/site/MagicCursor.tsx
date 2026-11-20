import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label'

/**
 * Small accent dot that trails the pointer and grows over interactive elements.
 * Only on devices with a fine pointer; the native cursor stays visible.
 * Position is written straight to the DOM (no React state) to stay at 60fps.
 */
export function MagicCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const dot = dotRef.current
    if (!dot || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return

    let targetX = -100
    let targetY = -100
    let x = targetX
    let y = targetY
    let scale = 1
    let targetScale = 1
    let frame = 0

    // The easing loop only runs while the dot is catching up with the pointer; it stops once
    // settled and restarts on the next move, so an idle page does no per-frame work.
    const render = () => {
      x += (targetX - x) * 0.18
      y += (targetY - y) * 0.18
      scale += (targetScale - scale) * 0.18
      dot.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0) scale(${scale})`
      const settled =
        Math.abs(targetX - x) < 0.1 &&
        Math.abs(targetY - y) < 0.1 &&
        Math.abs(targetScale - scale) < 0.01
      frame = settled ? 0 : requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      targetScale = (e.target as Element | null)?.closest?.(INTERACTIVE) ? 3 : 1
      dot.style.opacity = '1'
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onLeave = () => {
      dot.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reducedMotion])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden size-2.5 rounded-full bg-brand-600/60 opacity-0 mix-blend-multiply transition-opacity duration-300 lg:block"
    />
  )
}
