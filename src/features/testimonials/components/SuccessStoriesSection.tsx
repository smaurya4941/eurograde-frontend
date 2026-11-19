import { ContentError, PillLink, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import { cn } from '@/lib/cn'
import { successStoriesCopy as copy } from '../data/content'
import { useSuccessStories } from '../hooks'
import type { SuccessStory } from '../types'
import { StoryTile, SuccessStoryCard } from './SuccessStoryCard'

/** The mosaic has ten portrait slots around the centred heading. */
const SLOTS = 10

function Slot({
  story,
  loading,
  delay = 0,
}: {
  story?: SuccessStory
  loading: boolean
  delay?: number
}) {
  if (story) {
    return (
      <Reveal delay={delay}>
        <SuccessStoryCard story={story} />
      </Reveal>
    )
  }
  return loading ? <Skeleton className="aspect-[277/301] rounded-[10px]" /> : <StoryTile />
}

function Intro({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto max-w-[460px] text-center', className)}>
      <SectionHeading align="center" badge={copy.badge} title={copy.title} />
      <Reveal delay={150}>
        <p className="mt-4">{copy.description}</p>
      </Reveal>
      <Reveal delay={250}>
        <PillLink to={copy.cta.to} className="mt-6">
          {copy.cta.label}
        </PillLink>
      </Reveal>
    </div>
  )
}

/**
 * "Real journeys" wall: ten student portraits arranged in staggered columns around the
 * heading on desktop (outer columns sit lower, the middle pair lowest), a simple grid below.
 */
export function SuccessStoriesSection() {
  const { data, isPending, isError, refetch } = useSuccessStories({ limit: SLOTS })
  const slots = Array.from({ length: SLOTS }, (_, i) => data?.[i])
  const slot = (i: number, delay = 0) => <Slot story={slots[i]} loading={isPending} delay={delay} />

  return (
    <section
      aria-label="Student success stories"
      className="overflow-hidden bg-surface pt-16 pb-6 md:pt-20 xl:pt-[100px] xl:pb-10"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-5">
        {isError ? (
          <>
            <Intro />
            <ContentError what="success stories" className="mt-12" onRetry={() => void refetch()} />
          </>
        ) : (
          <>
            {/* Desktop: staggered mosaic */}
            <div className="hidden grid-cols-[1fr_1fr_2fr_1fr_1fr] items-start gap-x-[25px] lg:grid">
              <div className="mt-[25px] grid gap-5">
                <StoryTile />
                {slot(0)}
                {slot(1, 100)}
              </div>
              <div className="grid gap-5">
                {slot(2, 100)}
                {slot(3, 200)}
              </div>
              <div className="mt-[50px]">
                <div className="grid grid-cols-2 gap-[25px]">
                  {slot(4, 200)}
                  {slot(5, 300)}
                </div>
                <Intro className="mt-[60px] xl:mt-[75px]" />
              </div>
              <div className="grid gap-5">
                {slot(6, 100)}
                {slot(7, 200)}
              </div>
              <div className="mt-[25px] grid gap-5">
                <StoryTile />
                {slot(8)}
                {slot(9, 100)}
              </div>
            </div>

            {/* Mobile & tablet: heading first, then a simple grid */}
            <div className="lg:hidden">
              <Intro />
              <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-3">
                {slots.map((story, i) => (
                  // 10 slots in 3 columns: centre the lone last one.
                  <li key={story?.id ?? `slot-${i}`} className="md:last:col-start-2">
                    <Slot story={story} loading={isPending} delay={(i % 3) * 100} />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
