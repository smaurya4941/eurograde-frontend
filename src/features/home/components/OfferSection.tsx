import { paths } from '@/app/router/paths'
import capGraphic from '@/assets/images/backgrounds/how-work-graphics.png'
import studentImg from '@/assets/images/home/how-work-img.webp'
import globeImg from '@/assets/images/home/how-work-img2.webp'
import {
  AnimatedHeading,
  AvatarStack,
  Counter,
  ImageReveal,
  PillLink,
  Reveal,
  SectionHeading,
} from '@/components/marketing'
import { useStat, useStats } from '@/features/site-settings'
import { studentAvatars } from '../data/people'

export function OfferSection() {
  const stats = useStats().slice(0, 3)
  const students = useStat('students')

  return (
    <section aria-label="What we offer" className="relative overflow-hidden bg-surface section-y">
      <img
        src={capGraphic}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-0 left-0 w-[520px] max-w-none opacity-80 xl:w-[700px]"
      />

      <div className="relative container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-[30px] xl:gap-[33px]">
        <div>
          <SectionHeading
            badge="What We Offer"
            title={[
              { text: 'Empowering Your Dreams With The Right ' },
              { text: 'Global Education Opportunities', highlight: true },
            ]}
            description="Whether you’re aiming for tuition-free programs in Germany or affordable degrees in Italy, we make the process seamless and stress-free, from application guidance to enrollment."
            titleClassName="max-w-[620px]"
          />

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-10">
            {stats.map((stat, i) => (
              <Reveal key={stat.key} delay={i * 120} className="flex flex-col-reverse justify-end">
                <dt className="mt-3 text-sm font-medium text-ink sm:text-base">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix ?? ''}
                    className="text-[32px] leading-none font-bold text-ink sm:text-[40px] xl:text-[46px]"
                  />
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10">
            <PillLink to={paths.contact}>Start Your Journey</PillLink>
          </Reveal>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-[1.21fr_1fr]">
          <ImageReveal
            src={studentImg}
            alt="Student holding books outside a university building"
            width={398}
            height={295}
            shine
            wrapperClassName="overflow-hidden rounded-2xl"
            className="h-full min-h-[260px] w-full object-cover xl:h-[311px]"
          />

          <Reveal variant="zoom-in" className="h-full">
            <div className="flex h-full flex-col justify-center rounded-2xl bg-brand-600 p-6 text-white xl:p-8">
              <Counter
                value={students?.value ?? 0}
                suffix={students?.suffix ?? ''}
                className="text-[40px] leading-none font-bold xl:text-[46px]"
                suffixClassName="text-white"
              />
              <h3 className="mt-3 text-base font-bold text-white xl:text-lg">{students?.label}</h3>
              <p className="mt-4 text-white">
                Now thriving at top public universities across Germany and Italy.
              </p>
              <AvatarStack
                avatars={studentAvatars.four}
                withPlus
                ringClassName="ring-brand-600"
                plusClassName="bg-ink text-white"
                className="mt-5"
              />
            </div>
          </Reveal>

          <Reveal className="sm:col-span-2">
            <div className="grid overflow-hidden rounded-2xl bg-ink sm:grid-cols-2">
              <div className="p-6 xl:p-8">
                <AnimatedHeading
                  as="h3"
                  variant="back"
                  parts={[{ text: 'Study Abroad With Confidence' }]}
                  className="text-title text-white"
                />
                <p className="mt-4 text-white">
                  Our students now study at leading universities like LMU Munich and the University
                  of Bologna, with our support from the first application to settling in.
                </p>
              </div>
              <div className="img-shine">
                <img
                  src={globeImg}
                  alt="Graduation cap resting on a globe at sunset"
                  width={341}
                  height={295}
                  loading="lazy"
                  className="h-full min-h-[240px] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
