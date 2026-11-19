import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'

export type RevealVariant =
  'fade-up' | 'fade-down' | 'fade-right' | 'fade-left' | 'fade' | 'zoom-in'

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  /** Delay in milliseconds before the animation starts once in view. */
  delay?: number
  className?: string
}

/** Fades/slides its children in the first time they scroll into view. */
export function Reveal({ children, variant = 'fade-up', delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView()

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-inview={inView}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  )
}
