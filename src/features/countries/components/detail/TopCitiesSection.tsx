import { Reveal } from '@/components/marketing'
import type { CountryDetail } from '../../types'
import { DetailSectionHeading } from './DetailSectionHeading'

/** "Top Cities in {Country}": 2-column grid of outlined city cards. */
export function TopCitiesSection({ country }: { country: CountryDetail }) {
  if (country.cities.length === 0) return null

  return (
    <section aria-label={`Top cities in ${country.name}`}>
      <DetailSectionHeading
        badge="Top Cities"
        title={[{ text: 'Top Cities', highlight: true }, { text: ` in ${country.name}` }]}
        intro={country.cities_intro}
      />

      <ul className="mt-6 grid gap-[15px] sm:grid-cols-2">
        {country.cities.map((city, i) => (
          <li key={city.name}>
            <Reveal delay={(i % 2) * 120} className="h-full">
              <article className="h-full rounded-2xl border border-line p-6 transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand-600/40 hover:bg-white hover:shadow-card">
                <h3 className="text-title font-semibold text-ink">{city.name}</h3>
                {city.description && <p className="mt-2.5">{city.description}</p>}
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
