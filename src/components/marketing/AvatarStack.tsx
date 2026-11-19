import { Plus } from 'lucide-react'
import { cn } from '@/lib/cn'

interface AvatarStackProps {
  avatars: string[]
  /** Append a round "+" chip after the avatars. */
  withPlus?: boolean
  size?: 'sm' | 'md'
  /** Colour of the ring separating overlapping avatars. */
  ringClassName?: string
  plusClassName?: string
  className?: string
}

const sizes = { sm: 'size-9', md: 'size-[42px]' } as const

/** Overlapping circular avatars (decorative — the adjacent text carries the meaning). */
export function AvatarStack({
  avatars,
  withPlus = false,
  size = 'md',
  ringClassName = 'ring-white',
  plusClassName = 'bg-brand-600 text-white',
  className,
}: AvatarStackProps) {
  return (
    <div aria-hidden="true" className={cn('flex items-center -space-x-3', className)}>
      {avatars.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={cn('rounded-full object-cover ring-2', sizes[size], ringClassName)}
        />
      ))}
      {withPlus && (
        <span
          className={cn(
            'flex items-center justify-center rounded-full ring-2',
            sizes[size],
            ringClassName,
            plusClassName,
          )}
        >
          <Plus className="size-5" strokeWidth={2.5} />
        </span>
      )}
    </div>
  )
}
