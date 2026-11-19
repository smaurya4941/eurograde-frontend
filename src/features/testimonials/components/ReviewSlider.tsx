import { A11y, Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { useTestimonials } from '../hooks'
import type { TestimonialCategory } from '../types'
import { ReviewCard } from './ReviewCard'

const MAX_PER_VIEW = 3

interface ReviewSliderProps {
  categories: TestimonialCategory[]
  /** Quote-mark placement on the cards. */
  quote: 'top' | 'watermark'
  /** Show the bar-style pagination under the slides. */
  pagination?: boolean
  tone?: 'light' | 'dark'
  label: string
  className?: string
}

/** Auto-playing review carousel: 1 / 2 / 3 cards per view, pauses on hover. */
export function ReviewSlider({
  categories,
  quote,
  pagination = false,
  tone = 'light',
  label,
  className,
}: ReviewSliderProps) {
  const { data, isPending, isError, refetch } = useTestimonials({ category: categories })
  const reducedMotion = usePrefersReducedMotion()

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label={`Loading ${label}`}
        className={cn('grid gap-[15px] md:grid-cols-2 lg:grid-cols-3', className)}
      >
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            className={cn('h-[460px] rounded-[20px]', tone === 'dark' ? 'bg-white/10' : 'bg-white')}
          />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <ContentError what={label} tone={tone} className={className} onRetry={() => void refetch()} />
    )
  }

  return (
    <Reveal variant="fade" className={className}>
      <Swiper
        modules={[A11y, Autoplay, Pagination]}
        className={cn('reviews-swiper', pagination && 'reviews-swiper--paged')}
        a11y={{ containerMessage: label }}
        loop={data.length > MAX_PER_VIEW}
        speed={1000}
        spaceBetween={10}
        slidesPerView={1}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: MAX_PER_VIEW, spaceBetween: 15 },
        }}
        autoplay={
          reducedMotion
            ? false
            : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
        }
        pagination={pagination ? { clickable: true } : false}
      >
        {data.map((t) => (
          <SwiperSlide key={t.id} className="!h-auto">
            <ReviewCard testimonial={t} quote={quote} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Reveal>
  )
}
