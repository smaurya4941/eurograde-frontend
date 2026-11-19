import travellers from '@/assets/images/about/whychoose-img.webp'
import { ImageReveal, Reveal, SectionHeading } from '@/components/marketing'
import { reasons } from '../data/content'

export function AboutWhyChooseSection() {
  return (
    <section
      aria-label="Why choose us"
      className="relative bg-surface lg:grid lg:grid-cols-[38%_1fr]"
    >
      {/* Full-bleed photo on the left edge */}
      <ImageReveal
        src={travellers}
        alt="Two students checking their phones in an airport lounge"
        width={750}
        height={890}
        wrapperClassName="relative h-72 sm:h-96 lg:h-auto"
        className="absolute inset-0 size-full object-cover"
      />

      <div className="px-4 py-16 sm:px-6 md:py-20 lg:pr-[30px] lg:pl-[60px] xl:py-[100px]">
        <div className="max-w-[805px]">
          <SectionHeading
            badge="Why Choose Us"
            title={[
              { text: 'Helping You Achieve Your ' },
              { text: 'Global Goals', highlight: true },
              { text: ' With Confidence' },
            ]}
            description="Your dreams are our priority. Our mission and values guide everything we do, from your first question to the day you arrive at your new university."
          />

          <ol className="mt-12 grid sm:grid-cols-2">
            {reasons.map((reason, i) => (
              <li
                key={reason.title}
                className="border-line py-6 max-sm:border-b max-sm:last:border-b-0 sm:even:pl-8 sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(-n+2)]:pt-0"
              >
                <Reveal delay={(i % 2) * 150} className="group flex gap-5">
                  <span
                    aria-hidden="true"
                    className="shrink-0 rotate-180 self-start text-[54px] leading-none font-extrabold text-transparent transition-colors duration-500 [-webkit-text-stroke:1.5px_#cbd5e1] [writing-mode:vertical-rl] group-hover:[-webkit-text-stroke:1.5px_var(--color-brand-600)]"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-title">{reason.title}</h3>
                    <p className="mt-2">{reason.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
