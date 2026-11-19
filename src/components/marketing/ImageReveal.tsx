import type { ComponentProps } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

interface ImageRevealProps extends ComponentProps<'img'> {
  /** Classes for the wrapper that clips the image during the wipe. */
  wrapperClassName?: string
  /** Add the white diagonal "shine" sweep on hover. */
  shine?: boolean
}

/** Image that wipes in from left to right when it first scrolls into view. */
export function ImageReveal({
  wrapperClassName,
  shine = false,
  className,
  alt,
  loading = 'lazy',
  ...props
}: ImageRevealProps) {
  const { ref, inView } = useInView({ rootMargin: '0px 0px -10% 0px' })

  return (
    <div
      ref={ref}
      data-image-reveal
      data-inview={inView}
      className={cn(shine && 'img-shine', wrapperClassName)}
    >
      <img alt={alt} loading={loading} decoding="async" className={className} {...props} />
    </div>
  )
}
