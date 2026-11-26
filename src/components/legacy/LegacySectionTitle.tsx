import { cn } from '@/lib/cn'

/** Centered section title with a muted subtitle (old-design pages). */
export function LegacySectionTitle({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={cn('mx-auto mb-10 max-w-3xl text-center md:mb-14', className)}>
      <h2 className="legacy-h2 md:text-[44px]">{title}</h2>
      {subtitle && <p className="mt-3 text-[15px] text-legacy-muted">{subtitle}</p>}
    </div>
  )
}
