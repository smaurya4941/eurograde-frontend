import { Link } from 'react-router'
import globe from '@/assets/images/about/top-right-globe2.png'
import { PillLink } from '@/components/marketing'
import type { Country } from '../types'
import { countryHref } from '../utils'

/**
 * Destination card: round flag, name, key facts and "Learn More".
 * On hover the whole card turns navy and its text white.
 */
export function CountryCard({ country }: { country: Country }) {
  const href = countryHref(country.slug)

  return (
    <article
      className="group flex h-full flex-col rounded-2xl border border-line bg-white bg-[length:auto] bg-top-right bg-no-repeat p-6 transition-colors duration-300 hover:border-ink hover:bg-ink sm:p-7 xl:p-10"
      style={{ backgroundImage: `url(${globe})` }}
    >
      <img
        src={country.flag_url ?? undefined}
        alt={`Flag of ${country.name}`}
        width={120}
        height={120}
        loading="lazy"
        decoding="async"
        className="mb-5 size-[100px] rounded-full border-8 border-white object-cover sm:size-[120px]"
      />

      <h3 className="border-b border-line pb-[15px] text-title font-semibold text-ink transition-colors duration-300 group-hover:border-line-light group-hover:text-white">
        <Link to={href} className="focus-visible:underline">
          {country.name}
        </Link>
      </h3>

      <dl className="mt-[15px] font-semibold">
        {country.highlights.map((fact) => (
          <div key={fact.label} className="mb-2.5 flex items-baseline justify-between gap-4 pb-2.5">
            <dt className="text-ink transition-colors duration-300 group-hover:text-white">
              {fact.label}:
            </dt>
            <dd className="text-right transition-colors duration-300 group-hover:text-white">
              {fact.value}
            </dd>
          </div>
        ))}
        <div className="mb-2.5 flex items-baseline justify-between gap-4 pb-2.5">
          <dt className="text-ink transition-colors duration-300 group-hover:text-white">
            Requirements:
          </dt>
          <dd>
            <Link
              to={href}
              aria-label={`View ${country.name} requirements`}
              className="transition-colors duration-300 group-hover:text-white hover:text-brand-600 group-hover:hover:text-brand-500"
            >
              View Details
            </Link>
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-2">
        <PillLink to={href}>
          Learn More
          <span className="sr-only"> about studying in {country.name}</span>
        </PillLink>
      </div>
    </article>
  )
}
