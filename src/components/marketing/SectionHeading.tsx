import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { AnimatedHeading, type HeadingPart } from './AnimatedHeading'
import { Reveal } from './Reveal'
import { SectionBadge } from './SectionBadge'

interface SectionHeadingProps {
  badge: string
  title: HeadingPart[]
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
  titleClassName?: string
  /** Extra classes for the badge pill (e.g. the larger badge on service pages). */
  badgeClassName?: string
}

/** Badge + animated title + optional intro paragraph, used at the top of most sections. */
export function SectionHeading({
  badge,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
  titleClassName,
  badgeClassName,
}: SectionHeadingProps) {
  const centered = align === 'center'

  return (
    <div className={cn(centered && 'mx-auto text-center', className)}>
      <Reveal>
        <SectionBadge className={badgeClassName}>{badge}</SectionBadge>
      </Reveal>
      <AnimatedHeading
        parts={title}
        highlightClassName={tone === 'dark' ? 'text-brand-on-dark' : undefined}
        className={cn(
          'mt-4 text-display',
          tone === 'dark' ? 'text-white' : 'text-ink',
          centered && 'mx-auto',
          titleClassName,
        )}
      />
      {description && (
        <Reveal delay={150}>
          <p
            className={cn(
              'mt-4',
              tone === 'dark' ? 'text-slate-400' : 'text-body',
              centered && 'mx-auto max-w-[850px]',
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
