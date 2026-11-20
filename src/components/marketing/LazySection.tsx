import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

/**
 * Renders its children only once they come within `margin` of the viewport.
 *
 * Long pages (the home page has 13 sections) otherwise render every section, start every API
 * request, decode every image and initialise every carousel before the visitor has scrolled at
 * all, which blocks the main thread on phones. The placeholder reserves roughly the section's
 * height so the scrollbar stays stable; sections mount well before they become visible, so
 * visitors never see the swap.
 */
export function LazySection({
  children,
  placeholderHeight = 800,
  margin = 600,
}: {
  children: ReactNode
  /** Approximate rendered height in px (keeps scroll length realistic before mounting). */
  placeholderHeight?: number
  /** How far below/above the viewport (px) to start rendering. */
  margin?: number
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: `${margin}px 0px` })

  if (inView) return <>{children}</>
  return <div ref={ref} aria-hidden="true" style={{ minHeight: placeholderHeight }} />
}
