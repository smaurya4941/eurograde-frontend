import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import globe from '@/assets/images/about/feture-bg.webp'
import { AnimatedHeading, Reveal } from '@/components/marketing'
import { cn } from '@/lib/cn'
import { ctaCountries } from '../data/content'

function OutlineArrowLink({
  to,
  children,
  variant,
}: {
  to: string
  children: string
  variant: 'solid' | 'outline'
}) {
  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full px-6 py-[15px] text-[15px] leading-none font-bold transition-colors duration-300 xl:text-base',
        variant === 'solid'
          ? 'bg-white text-ink hover:bg-ink hover:text-white'
          : 'border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink',
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[18px] -rotate-45 transition-transform duration-400 group-hover:rotate-0"
      />
    </Link>
  )
}

/** Blue rounded banner: headline, two CTAs and a cluster of destination chips. */
export function GlobalCtaSection() {
  return (
    <section aria-label="Start your application" className="bg-surface">
      <div className="container-site">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl bg-brand-600 bg-no-repeat px-6 py-12 sm:px-10 xl:px-[90px] xl:py-[60px]"
            style={{ backgroundImage: `url(${globe})`, backgroundPosition: 'right top' }}
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-[680px]">
                <AnimatedHeading
                  parts={[
                    { text: 'Your Global Future Starts With The Right Study Abroad Partner' },
                  ]}
                  className="text-display text-white"
                />
                <p className="mt-4 text-white">
                  Whether you’re aiming for tuition-free programs in Germany or affordable degrees
                  in Italy, our experienced counselors are ready to help you take the next step with
                  confidence.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <OutlineArrowLink to={paths.eligibility} variant="solid">
                    Free Eligibility Assessment
                  </OutlineArrowLink>
                  <OutlineArrowLink to={paths.contact} variant="outline">
                    Book Consultation
                  </OutlineArrowLink>
                </div>
              </div>

              <ul aria-label="Destinations we cover" className="flex flex-col gap-4 lg:w-[470px]">
                {ctaCountries.map((row, r) => (
                  <li key={r}>
                    <ul className="flex flex-wrap justify-center gap-4">
                      {row.map((country, i) => (
                        <li key={country.name}>
                          <Reveal variant="zoom-in" delay={(r * 3 + i) * 90}>
                            <span className="flex w-[144px] items-center gap-2.5 rounded-full bg-white py-1.5 pr-3 pl-1.5 text-[15px] leading-tight font-semibold text-ink shadow-card transition-transform duration-300 hover:-translate-y-1">
                              <img
                                src={country.flag}
                                alt=""
                                aria-hidden="true"
                                className="size-10 shrink-0 rounded-full object-cover"
                              />
                              {country.name}
                            </span>
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
