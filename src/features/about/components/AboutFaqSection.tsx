import { ChevronDown, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { paths } from '@/app/router/paths'
import faqImg from '@/assets/images/about/faq-img.webp'
import profile1 from '@/assets/images/avatars/profile-img1.png'
import {
  AccordionItem,
  ContentError,
  ImageReveal,
  InlineCta,
  Reveal,
  SectionHeading,
  Skeleton,
  useAccordion,
} from '@/components/marketing'
import { contact } from '@/config/site'
import { useFaqs } from '@/features/faqs'
import { cn } from '@/lib/cn'

const contactItems: { icon: LucideIcon; value: string; label: string; href?: string }[] = [
  { icon: Phone, value: contact.phone, label: 'Call Us on', href: contact.phoneHref },
  { icon: Mail, value: contact.email, label: 'Send a mail', href: contact.emailHref },
  { icon: MapPin, value: contact.address, label: 'Reach out at' },
]

function FaqList() {
  const { openIndex, toggle } = useAccordion(0)
  const { data: faqs, isPending, isError, refetch } = useFaqs('immigration')

  if (isPending) {
    return (
      <div className="space-y-px bg-white p-2" aria-busy="true" aria-label="Loading questions">
        {Array.from({ length: 8 }, (_, i) => (
          <Skeleton key={i} className="h-[72px] rounded-none" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ContentError what="questions" className="bg-white" onRetry={() => void refetch()} />
  }

  return (
    <div className="bg-white">
      {faqs.map((faq, i) => {
        const open = openIndex === i
        return (
          <AccordionItem
            key={faq.id}
            open={open}
            onToggle={() => toggle(i)}
            className="border-b border-line last:border-b-0"
            buttonClassName="px-6 py-6 xl:px-8"
            panelClassName="px-6 pb-6 xl:px-8"
            header={(isOpen) => (
              <>
                <span
                  className={cn(
                    'text-lg leading-snug font-semibold transition-colors xl:text-[21px]',
                    isOpen ? 'text-brand-600' : 'text-ink',
                  )}
                >
                  {i + 1}. {faq.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 transition-transform duration-300',
                    isOpen ? 'rotate-180 text-brand-600' : 'text-ink',
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

export function AboutFaqSection() {
  return (
    <section aria-label="Frequently asked questions" className="bg-surface section-y">
      <div className="container-site">
        <SectionHeading
          align="center"
          badge="Frequently Asked Questions"
          title={[
            { text: 'Your Questions About Studying In ' },
            { text: 'Germany & Italy', highlight: true },
          ]}
          titleClassName="max-w-[760px]"
          description="Our FAQs answer the most common questions about studying in Germany and Italy, from tuition fees and living costs to scholarships and part-time work."
        />

        <div className="mt-12 grid lg:grid-cols-[0.4fr_0.6fr]">
          {/* Photo with contact card */}
          <div className="relative min-h-[520px]">
            <ImageReveal
              src={faqImg}
              alt="Consultant smiling during a client meeting"
              width={621}
              height={832}
              wrapperClassName="absolute inset-0 overflow-hidden rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              className="size-full object-cover"
            />
            <Reveal
              variant="fade-right"
              delay={200}
              className="absolute bottom-6 -left-4 w-[92%] max-w-[504px] sm:-left-[30px] lg:bottom-[50px]"
            >
              <ul className="space-y-5 rounded-xl bg-ink p-5 text-white shadow-card sm:pl-[30px]">
                {contactItems.map(({ icon: Icon, value, label, href }) => (
                  <li key={label} className="flex items-center gap-4">
                    <span className="flex size-[58px] shrink-0 items-center justify-center rounded-full bg-brand-600">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span>
                      {href ? (
                        <a
                          href={href}
                          className="block text-lg leading-snug font-bold transition-colors hover:text-brand-500 xl:text-[21px]"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="block text-lg leading-snug font-bold xl:text-[21px]">
                          {value}
                        </span>
                      )}
                      <span className="text-[15px] text-white">{label}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <FaqList />
        </div>

        <InlineCta
          avatars={[profile1]}
          text="Still Have Questions About Studying Abroad?"
          linkLabel="Book Free Consultation"
          to={paths.contact}
          className="mt-10"
        />
      </div>
    </section>
  )
}
