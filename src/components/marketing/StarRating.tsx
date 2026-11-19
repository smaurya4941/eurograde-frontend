import { Star } from 'lucide-react'
import { cn } from '@/lib/cn'

interface StarRatingProps {
  rating?: number
  max?: number
  className?: string
  starClassName?: string
}

export function StarRating({ rating = 5, max = 5, className, starClassName }: StarRatingProps) {
  return (
    <div
      role="img"
      aria-label={`Rated ${rating} out of ${max}`}
      className={cn('flex items-center gap-1', className)}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-[18px]',
            i < Math.round(rating)
              ? 'fill-brand-600 text-brand-600'
              : 'fill-slate-200 text-slate-200',
            starClassName,
          )}
        />
      ))}
    </div>
  )
}
