import { FaqTopicAccordion } from '@/features/faqs'
import type { CountryDetail } from '../../types'
import { DetailSectionHeading } from './DetailSectionHeading'

/** The country's FAQ topic (`GET /faqs?category=…`), when it has one. */
export function CountryFaqSection({ country }: { country: CountryDetail }) {
  if (!country.faq_category) return null

  return (
    <section aria-label={`Questions about studying in ${country.name}`}>
      <DetailSectionHeading
        badge="Frequently Asked Questions"
        title={[{ text: 'Frequently Asked ' }, { text: 'Questions', highlight: true }]}
        intro={country.faq_intro}
      />
      <div className="mt-6">
        <FaqTopicAccordion category={country.faq_category} />
      </div>
    </section>
  )
}
