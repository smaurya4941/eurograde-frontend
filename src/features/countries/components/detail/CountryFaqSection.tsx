import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { FaqAccordion, useFaqs, type FaqCategory } from '@/features/faqs'
import type { CountryDetail } from '../../types'
import { DetailSectionHeading } from './DetailSectionHeading'

function CountryFaqList({ category }: { category: FaqCategory }) {
  const { data, isPending, isError, refetch } = useFaqs(category)

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading questions"
        className="space-y-px overflow-hidden rounded-2xl"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-[88px] rounded-none bg-white" />
        ))}
      </div>
    )
  }
  if (isError) return <ContentError what="questions" onRetry={() => void refetch()} />
  if (data.length === 0) return null

  return (
    <Reveal>
      <FaqAccordion faqs={data} />
    </Reveal>
  )
}

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
        <CountryFaqList category={country.faq_category} />
      </div>
    </section>
  )
}
