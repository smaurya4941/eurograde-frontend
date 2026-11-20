import { Skeleton } from '@/components/marketing'
import type { ServiceDetail } from '../../types'
import { ServiceFaqSection } from './ServiceFaqSection'
import { ServiceOfferSection } from './ServiceOfferSection'
import { ServiceOverview } from './ServiceOverview'
import { ServiceSidebar } from './ServiceSidebar'
import { ServiceWhySection } from './ServiceWhySection'

const layout =
  'container-site grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[433px_minmax(0,1fr)] xl:gap-20'

/**
 * Service detail body: "Explore Our Services" sidebar on the left, content sections on the right.
 * On small screens the sidebar comes first, as in the reference theme.
 */
export function ServiceDetailView({ service }: { service: ServiceDetail }) {
  return (
    <div className="bg-surface section-y xl:py-20">
      <div className={layout}>
        <ServiceSidebar currentSlug={service.slug} />

        <div className="space-y-12 xl:space-y-[50px]">
          <ServiceOverview service={service} />
          <ServiceOfferSection service={service} />
          <ServiceWhySection service={service} />
          <ServiceFaqSection service={service} />
        </div>
      </div>
    </div>
  )
}

export function ServiceDetailSkeleton() {
  return (
    <div className="bg-surface section-y xl:py-20" aria-busy="true" aria-label="Loading service">
      <div className={layout}>
        <div className="space-y-[30px]">
          <Skeleton className="h-[540px] bg-white" />
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
