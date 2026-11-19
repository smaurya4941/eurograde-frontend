import { cn } from '@/lib/cn'

/** Solid “ quotation mark (the theme's icon-font glyph, as inline SVG). */
export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 30"
      aria-hidden="true"
      focusable="false"
      className={cn('fill-current', className)}
    >
      <path d="M0 30V18.6C0 13.3 1.3 9 3.8 5.7 6.4 2.4 10 .5 14.6 0l1.2 4.3c-2.6.8-4.5 2.2-5.7 4.1-1.1 1.8-1.6 3.9-1.5 6.2H16V30H0Zm20 0V18.6c0-5.3 1.3-9.6 3.8-12.9C26.4 2.4 30 .5 34.6 0l1.2 4.3c-2.6.8-4.5 2.2-5.7 4.1-1.1 1.8-1.6 3.9-1.5 6.2H36V30H20Z" />
    </svg>
  )
}
