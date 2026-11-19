import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionBadgeProps {
  children: ReactNode
  /** Optional leading icon; defaults to a small accent dot. */
  icon?: ReactNode
  className?: string
}

/** Small pill label shown above section headings (e.g. "• ABOUT US"). */
export function SectionBadge({ children, icon, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5',
        'text-sm leading-none font-semibold tracking-[0.2px] text-brand-600 uppercase',
        className,
      )}
    >
      {icon ?? <span aria-hidden="true" className="size-[5px] rounded-full bg-brand-600" />}
      {children}
    </span>
  )
}
