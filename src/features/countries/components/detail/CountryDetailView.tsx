import { Skeleton } from '@/components/marketing'
import type { CountryDetail } from '../../types'
import { CountryFaqSection } from './CountryFaqSection'
import { CountryOverview } from './CountryOverview'
import { CountrySidebar } from './CountrySidebar'
import { TopCitiesSection } from './TopCitiesSection'
import { WhyChooseSection } from './WhyChooseSection'

const layout =
  'container-site grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[433px_minmax(0,1fr)] xl:gap-20'

/**
 * Country detail body: sidebar on the left, content sections on the right.
 * On small screens the content comes first and the sidebar follows it.
 */
export function CountryDetailView({ country }: { country: CountryDetail }) {
  return (
    <div className="bg-surface section-y xl:py-20">
      <div className={layout}>
        <div className="order-last lg:order-none">
          <CountrySidebar currentSlug={country.slug} />
        </div>

        <div className="space-y-12 xl:space-y-[50px]">
          <CountryOverview country={country} />
          <WhyChooseSection country={country} />
          <TopCitiesSection country={country} />
          <CountryFaqSection country={country} />
        </div>
      </div>
    </div>
  )
}

export function CountryDetailSkeleton() {
  return (
    <div className="bg-surface section-y xl:py-20" aria-busy="true" aria-label="Loading country">
      <div className={layout}>
        <div className="order-last space-y-[15px] lg:order-none">
          <Skeleton className="h-[420px] bg-white" />
          <Skeleton className="h-[550px] bg-white" />
        </div>
        <div className="space-y-6">
          <Skeleton className="aspect-[990/520] bg-white" />
          <Skeleton className="h-5 w-full bg-white" />
          <Skeleton className="h-5 w-11/12 bg-white" />
          <Skeleton className="h-5 w-4/5 bg-white" />
        </div>
      </div>
    </div>
  )
}
