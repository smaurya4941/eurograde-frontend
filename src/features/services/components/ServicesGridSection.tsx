import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { useServices } from '../hooks'
import { ServiceCard } from './ServiceCard'

const gridClass = 'grid gap-x-[30px] gap-y-[30px] md:grid-cols-2 lg:grid-cols-3'

/** Grid of every active service, loaded from `GET /services`. */
export function ServicesGridSection() {
  const { data, isPending, isError, refetch } = useServices()

  return (
    <section aria-label="Our services" className="bg-surface py-[60px]">
      <div className="container-site">
        {isPending ? (
          <div aria-busy="true" aria-label="Loading services" className={gridClass}>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="aspect-[5/4]" />
                <Skeleton className="mt-5 h-[46px] w-40 rounded-full" />
                <Skeleton className="mt-5 ml-[30px] h-24 w-3/4" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <ContentError what="services" onRetry={() => void refetch()} />
        ) : (
          <ul className={gridClass}>
            {data.map((service, i) => (
              <li key={service.id}>
                <Reveal delay={(i % 3) * 120} className="h-full">
                  <ServiceCard service={service} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
