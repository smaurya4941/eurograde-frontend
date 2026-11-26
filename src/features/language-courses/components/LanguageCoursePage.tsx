import { useState } from 'react'
import patternImage from '@/assets/images/legacy/pattern.webp'
import { LegacyBanner, LegacyFaq, LegacyReviews, LegacySectionTitle } from '@/components/legacy'
import { Reveal } from '@/components/marketing'
import { cn } from '@/lib/cn'
import type { LanguageCourseContent, LanguageLevel } from '../types'
import { EnquiryDialog } from './EnquiryDialog'

const toneClass: Record<LanguageLevel['tone'], string> = {
  pink: 'bg-legacy',
  navy: 'bg-legacy-navy',
  gold: 'bg-amber-600',
}

const bullets = 'list-inside list-disc space-y-2 marker:text-legacy-text [&>li]:pb-0'

/** Shared layout of the German and Italian language course pages (old design). */
export function LanguageCoursePage({ content }: { content: LanguageCourseContent }) {
  const [topic, setTopic] = useState<string | null>(null)
  const { intro, why, levels, pros } = content
  const sourcePage = `${content.name.toLowerCase()}-language`

  return (
    <div className="legacy-page">
      <LegacyBanner
        title={content.bannerTitle}
        image={content.bannerImage}
        crumbs={content.crumbs}
      />

      <section className="py-12 md:py-20">
        <div className="legacy-container grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <Reveal>
            <h2 className="py-4 legacy-h2 lg:pr-12">{intro.heading}</h2>
            <div className="space-y-4">
              {intro.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <img
            src={intro.image}
            alt={`${content.name} language course`}
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
      </section>

      <section className="bg-legacy-tint py-12 md:py-20">
        <div className="legacy-container">
          <LegacySectionTitle title="Why EuroGrades?" subtitle={why.subtitle} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {why.features.map((f) => (
              <li key={f.label} className="rounded-lg bg-white p-4 text-center">
                <img
                  src={f.icon}
                  alt=""
                  width={70}
                  height={70}
                  loading="lazy"
                  className="mx-auto size-[70px] object-contain"
                />
                <h3 className="mt-3 text-base font-medium">{f.label}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="py-12 md:py-20"
        style={{ backgroundImage: `url(${patternImage})`, backgroundRepeat: 'repeat' }}
      >
        <div className="legacy-container">
          <LegacySectionTitle title={levels.heading} subtitle={levels.subtitle} />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.items.map((level) => (
              <article
                key={level.code}
                className="flex flex-col rounded-[10px] bg-white p-4 shadow-[0_10px_15px_-3px_rgb(0_0_0/0.1)]"
              >
                <h3
                  className={cn(
                    'rounded-lg p-2 text-[1.75rem] leading-tight font-medium text-white',
                    toneClass[level.tone],
                  )}
                >
                  {level.title}
                </h3>
                <p className="my-4 text-legacy">{level.summary}</p>
                <ul className={cn(bullets, 'mb-6')}>
                  {level.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => setTopic(`${content.name} ${level.title}`)}
                    className="rounded-full border border-legacy px-6 py-2 text-base text-legacy uppercase transition-colors hover:bg-legacy hover:text-white"
                  >
                    Apply Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="legacy-container grid items-center gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
          <img
            src={pros.image}
            alt={`Benefits of learning ${content.name}`}
            loading="lazy"
            className="h-auto w-full"
          />
          <Reveal>
            <h2 className="py-4 legacy-h2 lg:pr-12">{pros.heading}</h2>
            <ul className={bullets}>
              {pros.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <LegacyReviews category={content.reviewsCategory} subtitle={content.reviewsSubtitle} />
      <LegacyFaq category={content.faqCategory} subtitle={content.faqSubtitle} />

      <EnquiryDialog
        open={topic !== null}
        onClose={() => setTopic(null)}
        topic={topic ?? ''}
        sourcePage={sourcePage}
      />
    </div>
  )
}
