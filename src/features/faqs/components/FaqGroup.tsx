import { AnimatedHeading, Reveal } from '@/components/marketing'
import type { FaqTopic } from '../data/topics'
import type { Faq } from '../types'
import { FaqAccordion } from './FaqAccordion'

/** One topic on the FAQs page: heading + numbered accordion. */
export function FaqGroup({ topic, faqs }: { topic: FaqTopic; faqs: Faq[] }) {
  return (
    <section id={topic.id} aria-label={topic.label} className="scroll-mt-28">
      <AnimatedHeading parts={topic.title} className="text-display text-ink" />
      <Reveal className="mt-6 xl:mt-[30px]">
        <FaqAccordion faqs={faqs} />
      </Reveal>
    </section>
  )
}
