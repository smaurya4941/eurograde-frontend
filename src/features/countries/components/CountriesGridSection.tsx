import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { useCountries } from '../hooks'
import { CountryCard } from './CountryCard'

/** Card width: 1 / 2 / 3 per row with a 30px gutter; rows are centred when not full. */
const itemClass = 'w-full md:w-[calc(50%-15px)] lg:w-[calc((100%-60px)/3)]'

/** Grid of destination cards, loaded from `GET /countries`. */
export function CountriesGridSection() {
  const { data, isPending, isError, refetch } = useCountries()

  return (
    <section aria-label="Study destinations" className="bg-surface section-y xl:py-[110px]">
      <div className="container-site">
        {isPending ? (
          <div
            aria-busy="true"
            aria-label="Loading countries"
            className="flex flex-wrap justify-center gap-[30px]"
          >
            {[0, 1].map((i) => (
              <Skeleton key={i} className={`h-[480px] bg-white ${itemClass}`} />
            ))}
          </div>
        ) : isError ? (
          <ContentError what="countries" onRetry={() => void refetch()} />
        ) : (
          <ul className="flex flex-wrap justify-center gap-[30px]">
            {data.map((country, i) => (
              <li key={country.id} className={itemClass}>
                <Reveal delay={(i % 3) * 120} className="h-full">
                  <CountryCard country={country} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
