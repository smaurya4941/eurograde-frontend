import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { Reveal } from '@/components/marketing'
import { LegacySectionTitle } from '@/components/legacy'
import { attestationOfferings, offeringsIntro } from '../data/offerings'

/** "What we offer" grid: white cards that turn crimson on hover (old service_item). */
export function AttestationOfferSection() {
  return (
    <section className="bg-white py-14 md:py-[100px]">
      <div className="legacy-container">
        <LegacySectionTitle title="What we offer" subtitle={offeringsIntro} />
        <ul className="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {attestationOfferings.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={(i % 3) * 80} className="h-full">
                <article className="group flex h-full gap-5 bg-white py-[34px] pr-4 pl-6 transition-all duration-150 hover:bg-legacy hover:shadow-[0_0_25px_rgba(0,0,0,0.38)]">
                  <img
                    src={item.icon}
                    alt=""
                    width={54}
                    height={54}
                    loading="lazy"
                    className="size-[54px] shrink-0 transition-[filter] group-hover:brightness-0 group-hover:invert"
                  />
                  <div>
                    <h3 className="pb-[15px] font-work text-base font-bold tracking-[0.32px] text-legacy-text uppercase transition-colors group-hover:text-white">
                      <Link to={paths.meaAttestation}>{item.title}</Link>
                    </h3>
                    <p className="pb-[15px] text-base leading-6 tracking-[0.32px] text-legacy-muted transition-colors group-hover:text-white/75">
                      {item.description}
                    </p>
                    <Link
                      to={paths.meaAttestation}
                      className="inline-block rounded-full border border-legacy px-6 py-2 text-sm font-semibold text-legacy uppercase transition-colors group-hover:border-white group-hover:text-white"
                    >
                      Read More
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
