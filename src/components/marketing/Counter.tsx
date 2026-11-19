import { useCountUp } from '@/hooks/useCountUp'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface CounterProps {
  value: number
  suffix?: string
  className?: string
  suffixClassName?: string
}

const formatter = new Intl.NumberFormat('en-US')

/** Number that counts up from zero when scrolled into view (e.g. "5,000+"). */
export function Counter({ value, suffix, className, suffixClassName }: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>()
  const current = useCountUp(value, { start: inView })

  return (
    <span ref={ref} className={cn('inline-flex items-baseline', className)}>
      <span className="sr-only">
        {formatter.format(value)}
        {suffix}
      </span>
      <span aria-hidden="true" className="tabular-nums">
        {formatter.format(current)}
      </span>
      {suffix && (
        <span aria-hidden="true" className={cn('ml-1 text-brand-600', suffixClassName)}>
          {suffix}
        </span>
      )}
    </span>
  )
}
