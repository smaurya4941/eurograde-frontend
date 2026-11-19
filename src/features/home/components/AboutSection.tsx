import { Check, IdCard, University, type LucideIcon } from 'lucide-react'
import { paths } from '@/app/router/paths'
import aboutSmall from '@/assets/images/home/about-img1-hm2.webp'
import aboutMain from '@/assets/images/home/about-img-hm2.webp'
import passports from '@/assets/images/home/visa-book-img.png'
import { Counter, ImageReveal, PillLink, Reveal, SectionHeading } from '@/components/marketing'
import { useStat } from '@/features/site-settings'

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: University,
    title: 'Top Public Universities',
    body: 'Admission to leading public universities in Germany and Italy.',
  },
  {
    icon: IdCard,
    title: 'Affordable Pathways',
    body: 'Tuition-free programs in Germany and low-cost degrees in Italy.',
  },
]

const promises = [
  'Quality Education Abroad Without High Tuition Fees',
  'Expert Support From Application Guidance To Enrollment',
]

export function AboutSection() {
  const counselors = useStat('counselors')
  const universities = useStat('universities')

  return (
    <section aria-label="About us" className="relative overflow-hidden bg-white section-y">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[0.55fr_0.45fr] lg:gap-[60px]">
        {/* Image collage */}
        <div className="relative pb-24 sm:pb-0 lg:pr-0">
          <ImageReveal
            src={aboutMain}
            alt="Consultant handing a passport to a student"
            width={636}
            height={711}
            wrapperClassName="ml-0 overflow-hidden rounded-2xl sm:ml-[47px] sm:max-w-[636px]"
            className="aspect-[636/711] w-full object-cover"
          />

          <Reveal
            variant="fade-right"
            className="absolute top-6 -left-4 w-[260px] sm:top-10 sm:-left-[30px] sm:w-[372px]"
          >
            <div className="rounded-2xl bg-ink p-5 text-white shadow-card sm:p-6">
              <Counter
                value={counselors?.value ?? 0}
                suffix={counselors?.suffix ?? ''}
                className="text-[34px] leading-none font-bold sm:text-[40px]"
              />
              <h3 className="mt-3 text-lg font-bold text-white sm:text-[22px]">
                Expert Study Abroad Counselors
              </h3>
              {universities && (
                <p className="mt-4 border-t border-line-light pt-4 text-[15px]">
                  {universities.value}
                  {universities.suffix} {universities.label}
                </p>
              )}
            </div>
          </Reveal>

          <Reveal
            variant="fade-up"
            delay={200}
            className="absolute right-0 -bottom-2 w-[48%] sm:top-[286px] sm:right-auto sm:bottom-auto sm:left-[405px] sm:w-[326px]"
          >
            <img
              src={aboutSmall}
              alt="Graduate holding a passport and acceptance letter"
              width={335}
              height={430}
              loading="lazy"
              className="w-full rounded-2xl border-[6px] border-white object-cover"
            />
          </Reveal>
        </div>

        {/* Copy */}
        <div className="relative">
          <SectionHeading
            badge="About EuroGrades"
            title={[
              { text: 'EuroGrades Makes Study Abroad ' },
              { text: 'Simple, Affordable & Accessible', highlight: true },
            ]}
            description="We believe studying abroad should be accessible to everyone. That’s why we help students secure admission to the best public universities in top countries like Germany and Italy, without the burden of high tuition fees."
          />

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 150} className="group">
                <Icon
                  aria-hidden="true"
                  className="size-[50px] text-brand-600 transition-transform duration-500 group-hover:-translate-y-1"
                  strokeWidth={1.3}
                />
                <h3 className="mt-4 text-title">{title}</h3>
                <p className="mt-3">{body}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 border-t border-line pt-8">
            <ul className="space-y-3">
              {promises.map((item) => (
                <li key={item} className="flex items-center gap-4 font-medium text-ink">
                  <Check aria-hidden="true" className="size-5 shrink-0" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="mt-10">
            <PillLink to={paths.about}>Discover Our Story</PillLink>
          </Reveal>

          <img
            src={passports}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="animate-swing pointer-events-none absolute -right-2 -bottom-16 hidden w-[150px] xl:block"
          />
        </div>
      </div>
    </section>
  )
}
