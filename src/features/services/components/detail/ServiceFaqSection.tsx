import { SectionHeading } from '@/components/marketing'
import { FaqTopicAccordion } from '@/features/faqs'
import type { ServiceDetail } from '../../types'
import { detailBadgeClass } from './detailBadgeClass'

/** The service's FAQ topic (`GET /faqs?category=…`), when it has one. */
export function ServiceFaqSection({ service }: { service: ServiceDetail }) {
  if (!service.faq_category) return null

  return (
    <section aria-label={`Questions about ${service.title}`}>
      <SectionHeading
        badgeClassName={detailBadgeClass}
        badge="Frequently Asked Questions"
        title={[{ text: 'Frequently Asked ' }, { text: 'Questions', highlight: true }]}
        description={service.faq_intro ?? undefined}
      />
      <div className="mt-5">
        <FaqTopicAccordion category={service.faq_category} />
      </div>
    </section>
  )
}
