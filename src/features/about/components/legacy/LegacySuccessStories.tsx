import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import studentImg from '@/assets/images/legacy/student1.webp'
import quoteImg from '@/assets/images/legacy/testi.webp'
import { ContentError } from '@/components/marketing'
import { useTestimonials } from '@/features/testimonials'

const arrowClass =
  'flex size-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black'

/** Crimson "Our Students’ Journeys to Success" band with a scrolling row of review cards. */
export function LegacySuccessStories() {
  const { data, isError, refetch } = useTestimonials({ category: ['admissions'], limit: 6 })
  const trackRef = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * (el.clientWidth / 2), behavior: 'smooth' })
  }

  return (
    <section aria-label="Success stories" className="bg-legacy px-4 py-10 md:px-8 md:pb-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="text-white">
          <p className="text-base font-medium">Success Stories</p>
          <h2 className="mb-3 text-[28px] leading-tight font-bold text-white md:text-4xl">
            Our Students’ Journeys to Success
          </h2>
          <p className="mb-6">
            Our students have turned their dreams of studying abroad into reality— from securing
            admissions to thriving at top universities and building brighter futures.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={() => scroll(-1)}
              className={arrowClass}
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              onClick={() => scroll(1)}
              className={arrowClass}
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
        <div className="min-w-0">
          {isError && <ContentError what="reviews" onRetry={() => void refetch()} />}
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto pb-2"
          >
            {data?.map((t) => (
              <li key={t.id} className="w-full shrink-0 snap-start md:w-[calc(50%-8px)]">
                <article className="flex h-full flex-col rounded-lg bg-white p-6 shadow-[2px_6px_8px_0_rgba(22,22,26,0.18)]">
                  <div
                    role="img"
                    aria-label={`Rated ${t.rating} out of 5`}
                    className="mb-3 flex gap-0.5"
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden="true"
                        className={
                          i < Math.round(t.rating)
                            ? 'size-4 fill-legacy text-legacy'
                            : 'size-4 text-legacy'
                        }
                      />
                    ))}
                  </div>
                  <p className="mb-8 flex-1 text-sm leading-5">“{t.quote}”</p>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar_url ?? studentImg}
                        alt=""
                        width={70}
                        height={70}
                        loading="lazy"
                        className="size-[70px] rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-base font-medium text-legacy-text">{t.name}</h3>
                        <span className="text-xs text-legacy-muted">{t.program}</span>
                      </div>
                    </div>
                    <img src={quoteImg} alt="" loading="lazy" className="h-auto w-10" />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
