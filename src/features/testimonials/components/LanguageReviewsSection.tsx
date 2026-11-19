import cloudLight from '@/assets/images/testimonials/cloud-light.webp'
import { PillLink, Reveal, SectionHeading } from '@/components/marketing'
import { anchors, languageReviewsCopy as copy } from '../data/content'
import { ReviewSlider } from './ReviewSlider'

/** Light band: split heading / intro + CTA, then a paged review slider. */
export function LanguageReviewsSection() {
  return (
    <section
      id={anchors.reviews}
      aria-label="Language student reviews"
      className="scroll-mt-28 bg-surface bg-right-bottom bg-no-repeat section-y xl:py-[100px]"
      style={{ backgroundImage: `url(${cloudLight})` }}
    >
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-[30px]">
          <SectionHeading badge={copy.badge} title={copy.title} titleClassName="max-w-[620px]" />
          <Reveal delay={150} className="lg:pt-1">
            <p className="max-w-[660px]">{copy.description}</p>
            <PillLink to={copy.cta.to} className="mt-8">
              {copy.cta.label}
            </PillLink>
          </Reveal>
        </div>

        <ReviewSlider
          categories={copy.categories}
          quote="watermark"
          pagination
          label="language student reviews"
          className="mt-10 xl:mt-[90px]"
        />
      </div>
    </section>
  )
}
