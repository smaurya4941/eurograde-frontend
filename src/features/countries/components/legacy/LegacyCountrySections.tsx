import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { LegacySectionTitle } from '@/components/legacy'
import patternBg from '@/assets/images/legacy/pattern.webp'
import ieltsIcon from '@/assets/images/legacy/ger_icons/ielts.webp'
import eduIcon from '@/assets/images/legacy/ger_icons/edu.webp'
import meter from '@/assets/images/legacy/ger_icons/meter.webp'
import { useUniversities } from '@/features/universities'
import type { CountryDetail } from '../../types'
import { costIcons, type LegacyCountryConfig } from './countryPageData'

/** Anchor sections sit below the fixed header + sticky tab strip. */
const anchor = 'scroll-mt-40 lg:scroll-mt-48'

const applyPill =
  'inline-block rounded-full border border-legacy px-6 py-2 text-base font-normal uppercase text-legacy-text transition-colors hover:bg-legacy hover:text-white'

/** "Why Study in X?" copy + 2-column grid of outlined fact cards. */
export function FastFactsSection({
  country,
  config,
}: {
  country: CountryDetail
  config: LegacyCountryConfig
}) {
  const stats = new Map(country.stats.map((s) => [s.label, s.value]))

  return (
    <section id="fast-facts" className={`${anchor} py-10 md:py-16`}>
      <div className="legacy-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <h2 className="py-4 text-[28px] leading-tight font-medium text-legacy-text md:pe-12 md:text-[32px]">
              Why Study in {config.name}?
            </h2>
            <div className="space-y-4">
              {config.whyParagraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <ul className="grid content-start gap-3 sm:grid-cols-2">
            {config.facts.map((fact) => (
              <li key={fact.label} className="flex gap-2.5 rounded-lg border border-[#b7b7b7] p-4">
                <img src={fact.icon} alt="" width={36} height={36} className="size-9 shrink-0" />
                <span className="text-sm">
                  {fact.label}
                  <b className="block text-base font-semibold text-legacy sm:text-xl">
                    {(fact.statLabel && stats.get(fact.statLabel)) || fact.value}
                  </b>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div
        role="img"
        aria-label={`Students in ${config.name}`}
        className="mt-12 h-[200px] w-full bg-cover bg-top bg-no-repeat md:mt-[60px] md:h-[260px]"
        style={{ backgroundImage: `url(${config.strip})` }}
      />
    </section>
  )
}

/** Popular cities: photo card, optional QS rank badge, name, universities count. */
export function CitiesSection({
  country,
  config,
}: {
  country: CountryDetail
  config: LegacyCountryConfig
}) {
  const cities = country.cities
    .map((c) => ({ ...c, image: c.image_url ?? config.cityFallbackImages[c.name] ?? null }))
    .filter((c) => c.image !== null)

  if (cities.length === 0) return null

  return (
    <section className="bg-repeat py-12 md:py-20" style={{ backgroundImage: `url(${patternBg})` }}>
      <div className="legacy-container">
        <LegacySectionTitle
          title={`Popular Cities to Study in ${config.name}`}
          subtitle={config.citiesSubtitle}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((city, i) => {
            const rank = config.cityRanks[city.name]
            return (
              <Reveal key={city.name} delay={i * 0.08}>
                <article className="h-full overflow-hidden rounded-[10px] bg-white shadow-[0_10px_15px_-3px_rgb(0_0_0/0.1)]">
                  <div className="relative">
                    <img
                      src={city.image ?? ''}
                      alt={`${city.name} skyline`}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    {rank !== undefined && (
                      <small className="absolute inset-x-2.5 bottom-2.5 rounded-[10px] bg-white/90 p-2.5 text-sm">
                        <b className="text-xl text-legacy">#{rank}</b> QS Best City for Students
                      </small>
                    )}
                  </div>
                  <h3 className="px-4 pt-4 text-2xl font-medium text-legacy-text">{city.name}</h3>
                  {city.universities_count !== null && (
                    <p className="px-4 pb-4 text-legacy">{city.universities_count} Universities</p>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/** Top universities: horizontally scrolling cards with prev/next buttons. */
export function UniversitiesSection({
  slug,
  config,
}: {
  slug: string
  config: LegacyCountryConfig
}) {
  const { data, isPending, isError, refetch } = useUniversities({ country: slug })
  const track = useRef<HTMLUListElement>(null)

  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 300, behavior: 'smooth' })

  return (
    <section id="universities" className={`${anchor} bg-legacy-soft py-12 md:py-20`}>
      <div className="legacy-container">
        <LegacySectionTitle
          title={`Top Universities in ${config.name}`}
          subtitle={config.universitiesSubtitle}
        />
        {isError && <ContentError what="universities" onRetry={() => void refetch()} />}
        {isPending && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-[380px] bg-white" />
            ))}
          </div>
        )}
        {data && data.length > 0 && (
          <div className="relative">
            <ul
              ref={track}
              className="flex snap-x snap-mandatory [scrollbar-width:none] gap-6 overflow-x-auto scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
            >
              {data.map((u) => (
                <li
                  key={u.id}
                  className="w-[270px] shrink-0 snap-start rounded-[10px] bg-white p-3 text-center"
                >
                  <div className="flex h-[150px] items-center justify-center">
                    {u.logo_url ? (
                      <img
                        src={u.logo_url}
                        alt={`${u.name} logo`}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <span className="px-4 text-lg font-medium">{u.name}</span>
                    )}
                  </div>
                  <ul className="mb-3 rounded-[10px] bg-legacy-soft p-4 text-left">
                    <li className="flex items-center gap-3 border-b border-black/10 py-3">
                      <img src={ieltsIcon} alt="" width={36} height={36} className="size-9" />
                      <span>
                        Min. IELTS Required <b className="block">5.5</b>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 py-3">
                      <img src={eduIcon} alt="" width={36} height={36} className="size-9" />
                      <span>
                        Type
                        <b className="block capitalize">{u.type}</b>
                      </span>
                    </li>
                  </ul>
                  <Link to={paths.contact} className={applyPill}>
                    Apply Now
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-center gap-3">
              {(
                [
                  [-1, 'Previous universities', ChevronLeft],
                  [1, 'Next universities', ChevronRight],
                ] as const
              ).map(([dir, label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={() => scroll(dir)}
                  className="grid size-10 place-items-center rounded-full border border-legacy text-legacy transition-colors hover:bg-legacy hover:text-white"
                >
                  <Icon aria-hidden="true" className="size-5" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

/** Visa cards on light blue. */
export function VisaSection({
  country,
  config,
}: {
  country: CountryDetail
  config: LegacyCountryConfig
}) {
  if (country.visas.length === 0) return null
  return (
    <section id="visa" className={`${anchor} py-12 md:py-20`}>
      <div className="legacy-container">
        <LegacySectionTitle title={`Visa for ${config.name}`} subtitle={config.visaSubtitle} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {country.visas.map((visa) => (
            <article key={visa.name} className="rounded-3xl bg-legacy-ice p-6">
              <h3 className="mb-3 text-xl font-semibold text-legacy-text">{visa.name}</h3>
              {visa.description && <p className="mb-4">{visa.description}</p>}
              {config.showVisaType && visa.visa_type && (
                <p className="mb-2 text-legacy">Type - {visa.visa_type}</p>
              )}
              {visa.fee && <p className="text-legacy">Cost - {visa.fee}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Cost-of-living card over the flag photo, with the gauge and expense tiles. */
export function CostOfLivingSection({
  country,
  config,
}: {
  country: CountryDetail
  config: LegacyCountryConfig
}) {
  return (
    <section
      id="cost-of-living"
      className={`${anchor} bg-cover bg-top bg-no-repeat py-6 md:py-0`}
      style={{ backgroundImage: `url(${config.costBg})` }}
    >
      <div className="legacy-container">
        <div className="flex justify-end">
          <div className="w-full rounded-3xl bg-white p-6 md:my-12 lg:w-7/12">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-[26px] leading-tight font-medium text-legacy-text md:text-[32px]">
                Cost of Living in <br />
                {config.name}
              </h2>
              <img src={meter} alt="" width={180} className="w-[110px] shrink-0 md:w-[180px]" />
            </div>
            <hr className="my-4 border-black/15" />
            <h3 className="mb-3 text-base font-medium">Monthly Living Expenses in {config.name}</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {country.living_costs.map((cost) => (
                <li
                  key={cost.label}
                  className="flex items-center gap-3 rounded-[10px] bg-legacy-soft px-3 py-3"
                >
                  {costIcons[cost.label] && (
                    <img
                      src={costIcons[cost.label]}
                      alt=""
                      width={36}
                      height={36}
                      className="size-9 shrink-0"
                    />
                  )}
                  <span>
                    {cost.label}
                    <b className="block">{cost.amount}</b>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Part-time and post-study work on the pink band. */
export function WorkSection({
  country,
  config,
}: {
  country: CountryDetail
  config: LegacyCountryConfig
}) {
  const blocks = [
    { title: 'Part-Time Work Opportunities', body: country.part_time_work },
    { title: 'Post-Study Work Opportunities', body: country.post_study_work },
  ].filter((b) => b.body)

  if (blocks.length === 0) return null
  return (
    <section id="work" className={`${anchor} bg-legacy-tint py-12 md:py-20`}>
      <div className="legacy-container">
        <h2 className="mb-6 text-xl font-medium text-legacy">
          Part-Time Career and Work Opportunities in {config.name}
        </h2>
        <div className="grid gap-10 lg:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title}>
              <h3 className="mb-4 text-[28px] leading-tight font-semibold text-legacy-text md:text-[32px]">
                {b.title}
              </h3>
              <p className="md:pe-12">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
