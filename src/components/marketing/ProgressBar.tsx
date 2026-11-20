import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

/**
 * Labelled skill bar ("Visa Success Rate 95%"): the fill and the percentage count up together
 * the first time the bar scrolls into view.
 */
export function ProgressBar({
  label,
  value,
  className,
}: {
  label: string
  /** Percentage, 0–100. */
  value: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const percent = Math.min(Math.max(value, 0), 100)
  const current = useCountUp(percent, { start: inView, duration: 3500 })

  return (
    <div ref={ref} className={className}>
      <div className="flex items-baseline justify-between gap-4 font-bold text-ink">
        <span>{label}</span>
        <span aria-hidden="true" className="tabular-nums">
          {current}%
        </span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-[15px] h-2.5 overflow-hidden rounded-full bg-brand-600/20"
      >
        <div className={cn('h-full rounded-full bg-brand-600')} style={{ width: `${current}%` }} />
      </div>
    </div>
  )
}
