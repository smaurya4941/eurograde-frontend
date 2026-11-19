import { Check, Earth, FilePenLine, PlaneTakeoff, type LucideIcon } from 'lucide-react'
import { paths } from '@/app/router/paths'
import buildingGraphic from '@/assets/images/backgrounds/how-it-graphic.webp'
import passports from '@/assets/images/home/visa-book-img.png'
import { InlineCta, Reveal, SectionHeading, StarRating } from '@/components/marketing'
import { ctaAvatars } from '../data/people'

const steps: { icon: LucideIcon; title: string; body: string; outcome: string }[] = [
  {
    icon: Earth,
    title: 'Choose Country, University & Course',
    body: 'Find top public universities and programs in Germany and Italy that align with your interests, budget and career goals.',
    outcome: 'A personalized shortlist of universities and courses',
  },
  {
    icon: FilePenLine,
    title: 'Apply & Secure Your Visa',
    body: 'Submit your application with the required documents, receive your acceptance letter and apply for your student visa with our support.',
    outcome: 'From application to acceptance letter and student visa.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Settle Into Your New Home',
    body: 'From pre-departure prep to arrival, we ensure a hassle-free transition and help you find safe, budget-friendly housing.',
    outcome: 'Confidently begin your new life abroad',
  },
]

export function HowItWorksSection() {
  return (
    <section
      aria-label="How it works"
      className="relative overflow-hidden bg-white pt-16 pb-12 md:pt-20 xl:pt-[110px]"
    >
      <img
        src={buildingGraphic}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-0 bottom-0 w-[700px] max-w-none opacity-70 xl:w-[1153px]"
      />
      <img
        src={passports}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="animate-swing pointer-events-none absolute top-24 left-[30px] hidden w-[150px] xl:block"
      />

      <div className="relative container-site">
        <SectionHeading
          align="center"
          badge="How It Works"
          title={[
            { text: 'We Make Your Study Abroad Journey ' },
            { text: 'Simple & Stress-Free', highlight: true },
          ]}
          titleClassName="max-w-[820px]"
          description="From choosing the right destination to starting your new life abroad, we guide you through every important step."
        />

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-6">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 150} className="group text-center">
                <div className="relative mx-auto w-fit">
                  <span className="flex size-[124px] items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition-transform duration-500 group-hover:scale-105">
                    <Icon aria-hidden="true" className="size-[50px]" strokeWidth={1.5} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 -right-6 flex size-[50px] -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-ink text-lg font-bold text-white"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-8 text-title">
                  <span className="sr-only">Step {i + 1}: </span>
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-[440px]">{body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <ul className="mt-10 grid gap-4 border-t border-line pt-8 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <li key={step.outcome} className="flex items-start justify-center gap-4 text-center">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-ink"
                strokeWidth={3}
              />
              <span className="max-w-[300px]">{step.outcome}</span>
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <InlineCta
            avatars={[ctaAvatars.student]}
            text="Ready To Take The Next Step?"
            linkLabel="Start Your Journey"
            to={paths.contact}
          />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 font-semibold text-ink">
            <span>4.9/5</span>
            <StarRating rating={5} starClassName="size-5" />
            <span>Trusted By 300+ Students Abroad</span>
          </div>
        </Reveal>
      </div>

      <div className="relative container-site">
        <div className="mt-14 border-b border-line xl:mt-[60px]" />
      </div>
    </section>
  )
}
