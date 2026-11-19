import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

export interface HeadingPart {
  text: string
  /** Render this part in the accent colour. */
  highlight?: boolean
}

interface AnimatedHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  parts: HeadingPart[]
  /**
   * `slide` — characters drift in from the right with a soft ease (section titles).
   * `back`  — characters overshoot slightly into place (hero / feature titles).
   */
  variant?: 'slide' | 'back'
  className?: string
  highlightClassName?: string
}

/**
 * Heading whose characters animate in one by one when scrolled into view
 * (a dependency-free replacement for GSAP SplitText).
 * Screen readers get the plain text; the per-character spans are aria-hidden.
 */
export function AnimatedHeading({
  as: Tag = 'h2',
  id,
  parts,
  variant = 'slide',
  className,
  highlightClassName = 'text-brand-600',
}: AnimatedHeadingProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>()
  let charIndex = 0

  return (
    <Tag ref={ref} id={id} data-split={variant} data-inview={inView} className={className}>
      <span className="sr-only">{parts.map((p) => p.text).join('')}</span>
      <span aria-hidden="true">
        {parts.map((part, partIndex) => (
          <span key={partIndex} className={cn(part.highlight && highlightClassName)}>
            {part.text.split(/(\s+)/).map((token, tokenIndex) => {
              if (token === '') return null
              if (/^\s+$/.test(token)) return ' '
              return (
                <span key={tokenIndex} className="split-word">
                  {Array.from(token).map((char, i) => (
                    <span
                      key={i}
                      className="split-char"
                      style={{ '--i': charIndex++ } as CSSProperties}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              )
            })}
          </span>
        ))}
      </span>
    </Tag>
  )
}
