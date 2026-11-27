import { ChevronDown } from 'lucide-react'
import serviceBg from '@/assets/images/backgrounds/service-bg.webp'
import graduate from '@/assets/images/home/graduates-selfie.webp'
import { AccordionItem, Reveal, SectionHeading, useAccordion } from '@/components/marketing'
import { cn } from '@/lib/cn'
import { whyChoose } from '../data/content'
import { featuredCountries } from '../data/destinations'

export function WhyChooseSection() {
  const { openIndex, toggle } = useAccordion(0)

  return (
    <section
      aria-label="Why choose us"
      className="relative overflow-hidden bg-ink pt-16 pb-28 md:pt-20 xl:pt-[110px] xl:pb-[120px]"
    >
      {/* Dotted globe + blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-size-[1100px_auto] bg-position-[-280px_center] bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${serviceBg})` }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_55%_50%,color-mix(in_srgb,var(--color-brand-600)_45%,transparent),transparent_70%)]"
      />

      <div className="relative container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-[60px]">
        <div className="relative mx-auto w-full max-w-[720px]">
          <Reveal variant="fade-up">
            <img
              src={graduate}
              alt="EuroRank graduates taking a selfie in their caps and gowns"
              width={659}
              height={613}
              loading="lazy"
              className="mx-auto w-[90%] max-w-[560px]"
            />
          </Reveal>
          <ul className="relative -mt-28 flex flex-wrap justify-center gap-3 sm:-mt-36 sm:gap-x-4 sm:gap-y-3">
            {featuredCountries.map((country, i) => (
              <li key={country.name}>
                <Reveal variant="zoom-in" delay={i * 100}>
                  <span className="flex items-center gap-2 rounded-full bg-white py-2 pr-5 pl-2 text-base leading-tight font-bold text-ink shadow-card transition-transform duration-300 hover:-translate-y-1 sm:pr-7 sm:text-lg">
                    <img
                      src={country.flag}
                      alt=""
                      aria-hidden="true"
                      className="size-10 rounded-full object-cover sm:size-[52px]"
                    />
                    {country.name}
                  </span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <SectionHeading
            tone="dark"
            badge="Why Choose Us"
            title={[{ text: 'Guidance From ' }, { text: 'Experienced Mentors', highlight: true }]}
            titleClassName="max-w-[600px]"
          />

          <div className="mt-8">
            {whyChoose.map((item, i) => {
              const open = openIndex === i
              return (
                <AccordionItem
                  key={item.title}
                  open={open}
                  onToggle={() => toggle(i)}
                  className="border-b border-line-light"
                  buttonClassName="py-5 xl:py-6"
                  panelClassName="pb-6 text-slate-400"
                  header={(isOpen) => (
                    <>
                      <span
                        className={cn(
                          'text-lg font-bold transition-colors xl:text-[21px]',
                          isOpen ? 'text-brand-on-dark' : 'text-white',
                        )}
                      >
                        {i + 1}. {item.title}
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          'size-5 shrink-0 text-brand-on-dark transition-transform duration-300',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </>
                  )}
                >
                  <p className="max-w-[500px]">{item.body}</p>
                </AccordionItem>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
