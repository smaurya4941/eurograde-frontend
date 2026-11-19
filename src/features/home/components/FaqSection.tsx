import { ChevronDown, Mail, Phone, type LucideIcon } from 'lucide-react'
import faqImg from '@/assets/images/home/faq-hm2-img.webp'
import {
  AccordionItem,
  AvatarStack,
  ContentError,
  ImageReveal,
  Reveal,
  SectionHeading,
  Skeleton,
  useAccordion,
} from '@/components/marketing'
import { contact } from '@/config/site'
import { useFaqs } from '@/features/faqs'
import { cn } from '@/lib/cn'
import { studentAvatars } from '../data/people'

const quickContacts: { icon: LucideIcon; label: string; value: string; href: string }[] = [
  { icon: Phone, label: 'Call Us', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: 'Email Us', value: contact.email, href: contact.emailHref },
]

export function FaqSection() {
  const { openIndex, toggle } = useAccordion(0)
  const { data: faqs, isPending, isError, refetch } = useFaqs('students')

  return (
    <section
      aria-label="Frequently asked questions"
      className="overflow-x-clip bg-surface section-y"
    >
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <SectionHeading
            badge="Common Questions"
            title={[
              { text: 'Everything You Need ' },
              { text: 'To Know Before You Go', highlight: true },
            ]}
            description="From admission requirements to visa processes and tuition fees, our FAQs cover everything you need to know about studying abroad, clearly and concisely."
          />
          <Reveal variant="fade-left" className="shrink-0 lg:text-right">
            <p className="text-sm font-bold text-ink uppercase">
              We have helped 300+ students go global
            </p>
            <AvatarStack
              avatars={studentAvatars.faq}
              withPlus
              className="mt-4 lg:justify-end"
              ringClassName="ring-surface"
            />
          </Reveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-[30px]">
          {/* Image + quick contacts */}
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl lg:min-h-0">
            <ImageReveal
              src={faqImg}
              alt="Three graduates in gowns and caps in front of a university"
              width={691}
              height={704}
              wrapperClassName="absolute inset-0"
              className="size-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgb(0_0_0/0.9)_100%)]"
            />
            <ul className="absolute inset-x-0 bottom-0 flex flex-wrap gap-6 p-5 sm:gap-10">
              {quickContacts.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a href={href} className="group flex items-center gap-3 text-white">
                    <span className="flex size-[58px] items-center justify-center rounded-full bg-brand-600 transition-colors group-hover:bg-white group-hover:text-brand-600">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-[15px] leading-snug">
                      <span className="block">{label}</span>
                      <span className="font-bold">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {isPending &&
              Array.from({ length: 6 }, (_, i) => (
                <Skeleton key={i} className="h-[70px] bg-white" />
              ))}
            {isError && <ContentError what="questions" onRetry={() => void refetch()} />}
            {faqs?.map((faq, i) => {
              const open = openIndex === i
              return (
                <Reveal key={faq.id} delay={i * 80}>
                  <AccordionItem
                    open={open}
                    onToggle={() => toggle(i)}
                    className={cn(
                      'rounded-2xl border transition-colors duration-500',
                      open ? 'border-brand-600 bg-brand-600' : 'border-line bg-white',
                    )}
                    buttonClassName="px-5 py-5"
                    panelClassName="px-5 pb-6"
                    header={(isOpen) => (
                      <>
                        <span
                          className={cn(
                            'text-lg leading-snug font-bold transition-colors xl:text-[21px]',
                            isOpen ? 'text-white' : 'text-ink',
                          )}
                        >
                          {i + 1}. {faq.question}
                        </span>
                        <ChevronDown
                          aria-hidden="true"
                          className={cn(
                            'size-5 shrink-0 transition-transform duration-300',
                            isOpen ? 'rotate-180 text-white' : 'text-ink',
                          )}
                        />
                      </>
                    )}
                  >
                    <p className="text-white">{faq.answer}</p>
                    {faq.tags.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-2 border-t border-line-light pt-5">
                        {faq.tags.map((tag) => (
                          <li
                            key={tag}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-[15px] text-white"
                          >
                            <span aria-hidden="true" className="size-1 rounded-full bg-white" />
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </AccordionItem>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
