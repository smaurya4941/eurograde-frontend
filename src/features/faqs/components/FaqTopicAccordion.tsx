import { ContentError, Reveal, Skeleton } from '@/components/marketing'
import { useFaqs } from '../hooks'
import type { FaqCategory } from '../types'
import { FaqAccordion } from './FaqAccordion'

/** One FAQ topic (`GET /faqs?category=…`) as a numbered accordion, with loading and error states. */
export function FaqTopicAccordion({ category }: { category: FaqCategory }) {
  const { data, isPending, isError, refetch } = useFaqs(category)

  if (isPending) {
    return (
      <div
        aria-busy="true"
        aria-label="Loading questions"
        className="space-y-px overflow-hidden rounded-2xl"
      >
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-[88px] rounded-none bg-white" />
        ))}
      </div>
    )
  }
  if (isError) return <ContentError what="questions" onRetry={() => void refetch()} />
  if (data.length === 0) return null

  return (
    <Reveal>
      <FaqAccordion faqs={data} />
    </Reveal>
  )
}
