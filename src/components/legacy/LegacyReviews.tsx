import { Star } from 'lucide-react'
import { ContentError } from '@/components/marketing'
import { useTestimonials, type TestimonialCategory } from '@/features/testimonials'
import { LegacySectionTitle } from './LegacySectionTitle'

/** "Student Reviews" cards on the pink band (old design); reviews come from the API. */
export function LegacyReviews({
  category,
  subtitle,
}: {
  category: TestimonialCategory
  subtitle: string
}) {
  const { data, isError, refetch } = useTestimonials({ category: [category] })

  return (
    <section className="bg-legacy-tint py-12 md:py-20">
      <div className="legacy-container">
        <LegacySectionTitle title="Student Reviews" subtitle={subtitle} />
        {isError && <ContentError what="reviews" onRetry={() => void refetch()} />}
        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((t) => (
            <article key={t.id} className="rounded-2xl bg-white p-6">
              <h3 className="text-xl font-medium text-legacy-text">{t.name}</h3>
              {t.achievement && <p className="text-xs text-legacy-text">{t.achievement}</p>}
              <div
                role="img"
                aria-label={`Rated ${t.rating} out of 5`}
                className="mt-1 flex gap-0.5"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={
                      i < Math.round(t.rating)
                        ? 'size-3.5 fill-legacy text-legacy'
                        : 'size-3.5 text-legacy'
                    }
                  />
                ))}
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-legacy-text">{t.quote}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
