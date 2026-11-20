import { useEffect, useState, type CSSProperties } from 'react'
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
 *
 * Performance: until the heading nears the viewport it renders as plain (hidden) text, so a long
 * page doesn't create thousands of character spans up front. The spans mount when the heading
 * comes into view, and the animation starts on the next frame (a CSS transition needs the
 * hidden starting state to be painted first).
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
  const [animate, setAnimate] = useState(false)
  let charIndex = 0

  useEffect(() => {
    if (!inView) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAnimate(true))
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [inView])

  return (
    <Tag ref={ref} id={id} data-split={variant} data-inview={animate} className={className}>
      <span className="sr-only">{parts.map((p) => p.text).join('')}</span>
      <span aria-hidden="true" data-split-text={inView ? 'chars' : 'plain'}>
        {parts.map((part, partIndex) => (
          <span key={partIndex} className={cn(part.highlight && highlightClassName)}>
            {!inView
              ? part.text
              : part.text.split(/(\s+)/).map((token, tokenIndex) => {
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
