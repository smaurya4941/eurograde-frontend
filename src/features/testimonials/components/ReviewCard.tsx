import { StarRating } from '@/components/marketing'
import { cn } from '@/lib/cn'
import { testimonialSubtitle } from '../lib/format'
import type { Testimonial } from '../types'
import { QuoteIcon } from './QuoteIcon'

interface ReviewCardProps {
  testimonial: Testimonial
  /** `top`: quote mark above the stars. `watermark`: large faded quote mark bottom-right. */
  quote?: 'top' | 'watermark'
}

/**
 * White review card used in the sliders. On hover an accent fill rises from the bottom
 * and every element switches to white.
 */
export function ReviewCard({ testimonial: t, quote = 'top' }: ReviewCardProps) {
  return (
    <figure className="group relative isolate flex h-full flex-col overflow-hidden rounded-[20px] bg-white p-5 sm:p-6">
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-brand-600 transition-transform duration-500 ease-out group-hover:scale-y-100 motion-reduce:transition-none"
      />

      {quote === 'top' && (
        <QuoteIcon className="h-[30px] w-9 text-ink transition-colors duration-500 group-hover:text-white" />
      )}

      <StarRating
        rating={t.rating}
        className={cn('gap-[5px]', quote === 'top' ? 'mt-10 xl:mt-[50px]' : 'mt-2.5')}
        starClassName="size-[17px] xl:size-5 transition-colors duration-500 group-hover:fill-white group-hover:text-white"
      />

      <blockquote className="mt-6 flex-1 pb-8 xl:mt-[30px] xl:min-h-[250px]">
        <p className="leading-[1.65] text-ink transition-colors duration-500 group-hover:text-white">
          {t.quote}
        </p>
      </blockquote>

      {quote === 'watermark' && (
        <QuoteIcon className="absolute right-6 bottom-[92px] h-10 w-12 text-slate-300/80 transition-colors duration-500 group-hover:text-white/70 xl:right-[30px] xl:h-[50px] xl:w-[60px]" />
      )}

      <figcaption className="flex items-center gap-3">
        <img
          src={t.avatar_url ?? undefined}
          alt=""
          width={55}
          height={55}
          loading="lazy"
          decoding="async"
          className="size-10 shrink-0 rounded-full bg-slate-200 object-cover xl:size-[55px]"
        />
        <span>
          <span className="block text-lg leading-[1.3] font-semibold text-ink transition-colors duration-500 group-hover:text-white xl:text-[22px]">
            {t.name}
          </span>
          <span className="block text-[15px] transition-colors duration-500 group-hover:text-white/85 xl:text-base">
            {testimonialSubtitle(t)}
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
