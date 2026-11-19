import { ContentError, Skeleton } from '@/components/marketing'
import { faqTopics } from '../data/topics'
import { useFaqs } from '../hooks'
import { FaqGroup } from './FaqGroup'
import { FaqContactCard, FaqTopicNav } from './FaqSidebar'

const categories = faqTopics.map((t) => t.category)

function GroupsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading questions" className="space-y-12">
      {[0, 1].map((g) => (
        <div key={g}>
          <Skeleton className="h-12 w-72 max-w-full" />
          <div className="mt-6 space-y-px overflow-hidden rounded-2xl">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-[88px] rounded-none bg-white" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * FAQs page body: topic sidebar on the left, one accordion group per topic on the right.
 * All topics load in a single request and are grouped client-side.
 */
export function FaqTopicsSection() {
  const { data, isPending, isError, refetch } = useFaqs(categories)

  // Hide topics that have no published questions (and their sidebar links).
  const groups = faqTopics
    .map((topic) => ({ topic, faqs: data?.filter((f) => f.category === topic.category) ?? [] }))
    .filter((g) => isPending || g.faqs.length > 0)

  return (
    <section aria-label="Frequently asked questions" className="bg-surface section-y xl:py-[100px]">
      {/* Mobile order: topics → questions → contact card. Desktop: both cards in the left column. */}
      <div className="container-site grid grid-cols-1 items-start gap-y-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-[15px] xl:grid-cols-[424px_minmax(0,1fr)] xl:gap-x-[90px]">
        <FaqTopicNav topics={groups.map((g) => g.topic)} />
        <FaqContactCard className="order-last lg:order-none lg:col-start-1 lg:row-start-2" />

        <div className="space-y-12 lg:col-start-2 lg:row-span-2 lg:row-start-1 xl:space-y-[50px]">
          {isPending ? (
            <GroupsSkeleton />
          ) : isError ? (
            <ContentError what="questions" onRetry={() => void refetch()} />
          ) : (
            groups.map(({ topic, faqs }) => <FaqGroup key={topic.id} topic={topic} faqs={faqs} />)
          )}
        </div>
      </div>
    </section>
  )
}
