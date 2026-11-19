import { ImageReveal, Reveal } from '@/components/marketing'
import type { CountryDetail } from '../../types'
import { DetailSectionHeading } from './DetailSectionHeading'

/** "Why Choose {Country}?": intro, then a photo beside a card of reasons. */
export function WhyChooseSection({ country }: { country: CountryDetail }) {
  const { intro, image_url: image, reasons } = country.why_choose
  if (reasons.length === 0) return null

  return (
    <section aria-label={`Why choose ${country.name}`}>
      <DetailSectionHeading
        badge="Why Us"
        title={[{ text: 'Why Choose ' }, { text: country.name, highlight: true }, { text: ' ?' }]}
        intro={intro}
      />

      <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] xl:gap-[25px]">
        {image && (
          <ImageReveal
            src={image}
            alt={`Street scene in ${country.name}`}
            width={380}
            height={407}
            wrapperClassName="overflow-hidden rounded-2xl"
            className="aspect-[380/407] size-full object-cover md:aspect-auto"
          />
        )}
        <Reveal variant="fade-left" className={image ? undefined : 'md:col-span-2'}>
          <ul className="h-full rounded-2xl bg-white p-6 xl:px-8 xl:py-10">
            {reasons.map((reason) => (
              <li key={reason.title} className="border-b border-line py-5 first:pt-0">
                <h3 className="text-title font-semibold text-ink">{reason.title}</h3>
                <p className="mt-2.5">{reason.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
