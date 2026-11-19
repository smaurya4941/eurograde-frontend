import { caseStudiesCopy } from '../data/content'
import { testimonialSubtitle } from '../lib/format'
import type { Testimonial } from '../types'

/** Featured testimonial: reviewer, quote, then the "Case Overview" service tags. */
export function CaseStudyCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col gap-8 rounded-2xl border border-line bg-white p-5 transition-[border-color,box-shadow] duration-500 hover:border-brand-600/40 hover:shadow-card sm:p-8 xl:gap-10">
      <figure className="border-b border-line pb-5 lg:min-h-[220px]">
        <figcaption className="flex items-center gap-[15px]">
          <img
            src={t.avatar_url ?? undefined}
            alt=""
            width={62}
            height={62}
            loading="lazy"
            decoding="async"
            className="size-[62px] shrink-0 rounded-full bg-slate-200 object-cover"
          />
          <div>
            <h3 className="text-title font-semibold text-ink">{t.name}</h3>
            <p className="mt-1 text-[15px] xl:text-base">{testimonialSubtitle(t)}</p>
          </div>
        </figcaption>
        <blockquote className="mt-5 leading-[1.7] text-ink italic">
          <p>“{t.quote}”</p>
        </blockquote>
      </figure>

      {t.highlights.length > 0 && (
        <div>
          <h4 className="text-title font-semibold text-ink">{caseStudiesCopy.caseOverviewLabel}</h4>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {t.highlights.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-[15px] py-[5px] text-[15px] leading-snug xl:text-base"
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-body" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  )
}
