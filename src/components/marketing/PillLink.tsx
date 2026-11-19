import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

const variants = {
  /** Accent blue, turns navy on hover. */
  primary: 'bg-brand-600 text-white shadow-glow hover:bg-ink',
  /** White, turns navy on hover. */
  light: 'bg-white text-ink shadow-glow hover:bg-ink hover:text-white',
} as const

interface PillLinkProps {
  to: string
  children: ReactNode
  variant?: keyof typeof variants
  className?: string
}

/**
 * Rounded call-to-action link with the signature rotating arrow.
 * `to` may be a route path, an in-page anchor such as "#student-reviews", or a tel:/mailto: link.
 */
export function PillLink({ to, children, variant = 'primary', className }: PillLinkProps) {
  const classes = cn(
    'group inline-flex items-center gap-2.5 rounded-full px-6 py-[15px] text-[15px] leading-none font-bold',
    'transition-colors duration-300 xl:text-base',
    variants[variant],
    className,
  )
  const content = (
    <>
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[18px] -rotate-45 transition-transform duration-400 group-hover:rotate-0"
        strokeWidth={2}
      />
    </>
  )

  // In-page anchors and tel:/mailto:/external links are plain anchors, not router links.
  if (/^(#|tel:|mailto:|https?:)/.test(to)) {
    return (
      <a href={to} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link to={to} className={classes}>
      {content}
    </Link>
  )
}

const arrowLinkTones = {
  ink: 'text-ink hover:text-brand-600',
  brand: 'text-brand-600 hover:text-ink',
} as const

/** Plain text link with arrow, e.g. "Read More ↗". */
export function ArrowLink({
  to,
  children,
  tone = 'ink',
  className,
}: {
  to: string
  children: ReactNode
  tone?: keyof typeof arrowLinkTones
  className?: string
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2 font-bold transition-colors',
        arrowLinkTones[tone],
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 -rotate-45 transition-transform duration-400 group-hover:rotate-0"
      />
    </Link>
  )
}
