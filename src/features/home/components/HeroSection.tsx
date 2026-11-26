import { Award, Earth, GraduationCap, Languages, Luggage, type LucideIcon } from 'lucide-react'
import { paths } from '@/app/router/paths'
import heroBg from '@/assets/images/backgrounds/home-hero-bg-crimson.webp'
import heroGraphics from '@/assets/images/backgrounds/hero-graphics.webp'
import heroStudent from '@/assets/images/home/hero-img-hm2.webp'
import heroMap from '@/assets/images/home/hero-map-img.webp'
import { AnimatedHeading, AvatarStack, PillLink, Reveal } from '@/components/marketing'
import { studentAvatars } from '../data/people'

const highlights: { icon: LucideIcon; label: string }[] = [
  { icon: GraduationCap, label: 'University Admissions' },
  { icon: Languages, label: 'IELTS & Language Prep' },
  { icon: Award, label: 'Scholarship Guidance' },
  { icon: Luggage, label: 'Pre-Departure Support' },
]

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-brand-600/20 bg-cover bg-right-bottom bg-no-repeat"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Decorative layers */}
      <img
        src={heroGraphics}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[520px] max-w-none opacity-90 xl:w-[706px]"
      />
      <img
        src={heroMap}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="animate-float pointer-events-none absolute top-0 left-[37%] hidden w-[68%] max-w-none lg:block"
      />

      <div className="relative container-site lg:min-h-[820px] xl:min-h-[900px]">
        <div className="relative z-10 pt-14 sm:pt-20 lg:max-w-[62%] lg:pt-[150px] lg:pb-[88px] xl:max-w-[970px] xl:pt-[225px]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[15px] leading-none font-bold text-brand-600 uppercase xl:text-[17px]">
              <Earth aria-hidden="true" className="size-[18px]" />
              Study in Germany • Italy
            </span>
          </Reveal>

          <AnimatedHeading
            as="h1"
            id="hero-title"
            variant="back"
            parts={[
              { text: 'Turn Your Study Abroad Dreams ', highlight: true },
              { text: 'into Reality' },
            ]}
            className="mt-6 text-[36px] leading-[1.2] font-bold tracking-[-1px] text-ink sm:text-[46px] lg:text-[52px] xl:text-[62px]"
          />

          <Reveal delay={200}>
            <p className="mt-4 max-w-[800px] text-body">
              EuroGrades connects students with top public universities in countries like Germany
              and Italy, making quality education abroad affordable and stress-free. From choosing
              the right course to your student visa and arrival, we guide you at every step.
            </p>
          </Reveal>

          <Reveal delay={300} className="mt-10 flex flex-wrap gap-4">
            <PillLink to={paths.contact}>Free Consultation</PillLink>
            <PillLink to={paths.countries} variant="light">
              Explore Destinations
            </PillLink>
          </Reveal>

          <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:mt-[110px]">
            {highlights.map(({ icon: Icon, label }, i) => (
              <li key={label}>
                <Reveal variant="zoom-in" delay={i * 120} className="group">
                  <span className="flex size-[62px] items-center justify-center rounded-full bg-brand-600 text-white shadow-glow transition-transform duration-500 group-hover:-translate-y-1.5">
                    <Icon aria-hidden="true" className="size-7" strokeWidth={1.8} />
                  </span>
                  <h2 className="mt-3 text-base leading-snug font-bold text-ink xl:text-lg">
                    {label}
                  </h2>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Student cut-out + review card */}
        <div className="relative mx-auto mt-10 w-full max-w-[420px] lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:w-[420px] xl:w-[525px] xl:max-w-none">
          <Reveal variant="fade-left">
            <img
              src={heroStudent}
              alt="Smiling student holding a passport and boarding pass"
              width={599}
              height={840}
              fetchPriority="high"
              className="w-full"
            />
          </Reveal>
          <Reveal
            delay={400}
            className="absolute bottom-6 left-1/2 w-[300px] -translate-x-1/2 sm:w-[347px] lg:right-[83px] lg:bottom-20 lg:left-auto lg:translate-x-0"
          >
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <p className="text-lg leading-none font-bold text-ink">4.9/5</p>
              <p className="mt-3 text-lg leading-tight font-bold text-ink">
                Excellent Student Reviews
              </p>
              <div className="mt-4 flex items-center gap-4">
                <AvatarStack avatars={studentAvatars.three} size="sm" />
                <p className="font-semibold text-ink">300+ Students Abroad</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
