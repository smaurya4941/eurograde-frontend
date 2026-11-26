import { Minus, Plus } from 'lucide-react'
import { AccordionItem, ContentError, useAccordion } from '@/components/marketing'
import { useFaqs, type FaqCategory } from '@/features/faqs'
import { LegacySectionTitle } from './LegacySectionTitle'

/** "Frequently asked questions." block: rounded bordered rows with a +/− toggle, FAQs from the API. */
export function LegacyFaq({
  category,
  subtitle,
  title = 'Frequently asked questions.',
}: {
  category: FaqCategory | readonly FaqCategory[]
  subtitle?: string
  title?: string
}) {
  const { data: faqs, isError, refetch } = useFaqs(category)
  const { openIndex, toggle } = useAccordion(-1)

  return (
    <section className="py-12 md:py-20">
      <div className="legacy-container">
        <LegacySectionTitle title={title} subtitle={subtitle} />
        <div className="mx-auto max-w-3xl space-y-4">
          {isError && <ContentError what="FAQs" onRetry={() => void refetch()} />}
          {faqs?.map((faq, i) => (
            <AccordionItem
              key={faq.id}
              open={openIndex === i}
              onToggle={() => toggle(i)}
              className="rounded-2xl border border-slate-200 bg-white"
              buttonClassName="px-5 py-6 font-bold text-legacy-text"
              panelClassName="px-5 pb-6 text-legacy-text/80"
              header={(open) => (
                <>
                  <span>{faq.question}</span>
                  {open ? (
                    <Minus aria-hidden="true" className="size-4 shrink-0" />
                  ) : (
                    <Plus aria-hidden="true" className="size-4 shrink-0" />
                  )}
                </>
              )}
            >
              <p>{faq.answer}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  )
}
