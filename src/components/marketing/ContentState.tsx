import { RotateCw } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Inline message shown when a content section fails to load from the API. */
export function ContentError({
  what,
  onRetry,
  tone = 'light',
  className,
}: {
  /** e.g. "team members" → "We couldn’t load the team members right now." */
  what: string
  onRetry?: () => void
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-10 text-center',
        tone === 'dark' ? 'border-line-light text-slate-300' : 'border-line text-body',
        className,
      )}
    >
      <p>We couldn’t load the {what} right now.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-ink"
        >
          <RotateCw aria-hidden="true" className="size-4" />
          Try again
        </button>
      )}
    </div>
  )
}

/** Pulsing placeholder block used while content loads. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-2xl bg-slate-200/70', className)}
    />
  )
}
