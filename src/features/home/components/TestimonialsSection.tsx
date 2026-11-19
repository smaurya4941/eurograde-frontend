import { paths } from '@/app/router/paths'
import { PillLink, Reveal, SectionHeading, StarRating } from '@/components/marketing'
import { testimonials } from '../data/people'
import type { Testimonial } from '../types'

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="grid h-full gap-6 rounded-2xl border border-line bg-white p-6 transition-all duration-500 hover:border-brand-600/40 hover:shadow-card sm:grid-cols-[1fr_auto] sm:gap-0 xl:p-8">
      <div className="flex flex-col sm:pr-6">
        <StarRating rating={t.rating} />
        <blockquote className="mt-4 text-[17px] leading-relaxed font-medium text-ink">
          <p>“{t.quote}”</p>
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-3 sm:mt-auto sm:pt-8">
          <img
            src={t.avatar}
            alt=""
            loading="lazy"
            className="size-14 rounded-full border border-line object-cover"
          />
          <span>
            <span className="block text-xl font-semibold text-ink">{t.name}</span>
            <span className="text-[15px]">
              {t.country} • {t.university}
            </span>
          </span>
        </figcaption>
      </div>

      <div className="border-t border-line pt-6 sm:w-[240px] sm:border-t-0 sm:border-l sm:pt-0 sm:pl-3">
        <h3 className="text-title">Case Overview</h3>
        <ul className="mt-5 flex flex-wrap gap-2 sm:mt-10 sm:flex-col sm:items-start">
          {t.caseOverview.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[15px] leading-snug"
            >
              <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-body" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

export function TestimonialsSection() {
  return (
    <section aria-label="Student testimonials" className="bg-surface section-y">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-[30px]">
          <SectionHeading
            badge="Our Testimonials"
            title={[
              { text: 'Stories Of ' },
              { text: 'Delightful Transformations', highlight: true },
            ]}
            titleClassName="max-w-[600px]"
          />
          <Reveal delay={150} className="lg:self-start lg:pt-2">
            <p className="max-w-[600px]">
              Hear from students who turned their study abroad dreams into reality with EuroGrades,
              thriving at top universities and building bright futures.
            </p>
            <PillLink to={paths.testimonials} className="mt-6">
              Discover Our Story
            </PillLink>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={(i % 2) * 150} className="h-full">
                <TestimonialCard t={t} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
