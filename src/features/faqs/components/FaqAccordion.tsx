import { ChevronDown } from 'lucide-react'
import { AccordionItem, useAccordion } from '@/components/marketing'
import { cn } from '@/lib/cn'
import type { Faq } from '../types'

/** Numbered single-open FAQ accordion (first question open) in the Vistara FAQs-page style. */
export function FaqAccordion({ faqs, className }: { faqs: Faq[]; className?: string }) {
  const { openIndex, toggle } = useAccordion(0)

  return (
    <div className={cn('overflow-hidden rounded-2xl', className)}>
      {faqs.map((faq, i) => {
        const open = openIndex === i
        return (
          <AccordionItem
            key={faq.id}
            open={open}
            onToggle={() => toggle(i)}
            className={cn(
              'border-b border-line transition-colors duration-300 last:border-b-0',
              open ? 'bg-white' : 'bg-slate-50',
            )}
            buttonClassName="group/faq bg-slate-50 px-5 py-6 sm:px-8 xl:py-[30px]"
            panelClassName="px-5 pt-5 pb-8 sm:px-8"
            header={(isOpen) => (
              <>
                <span
                  className={cn(
                    'text-lg leading-snug font-semibold transition-colors duration-300 xl:text-[22px]',
                    isOpen
                      ? 'text-brand-600 group-hover/faq:text-ink'
                      : 'text-ink group-hover/faq:text-brand-600',
                  )}
                >
                  {i + 1}. {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 transition-[transform,color] duration-300',
                    isOpen
                      ? 'rotate-180 text-brand-600'
                      : 'text-ink group-hover/faq:text-brand-600',
                  )}
                />
              </>
            )}
          >
            <p>{faq.answer}</p>
          </AccordionItem>
        )
      })}
    </div>
  )
}
