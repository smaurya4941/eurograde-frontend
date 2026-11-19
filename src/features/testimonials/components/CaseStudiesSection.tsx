import { ContentError, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import { anchors, caseStudiesCopy as copy } from '../data/content'
import { useTestimonials } from '../hooks'
import { CaseStudyCard } from './CaseStudyCard'

/** "Student Voices": featured testimonials as case-study cards in a 3-column grid. */
export function CaseStudiesSection() {
  const { data, isPending, isError, refetch } = useTestimonials({ featured: true, limit: 6 })

  return (
    <section
      id={anchors.caseStudies}
      aria-label="Student voices"
      className="scroll-mt-28 bg-surface pt-6 pb-16 md:pb-20 xl:pt-10 xl:pb-[100px]"
    >
      <div className="container-site">
        <SectionHeading align="center" badge={copy.badge} title={copy.title} />

        {isPending ? (
          <div
            aria-busy="true"
            aria-label="Loading testimonials"
            className="mt-12 grid gap-[15px] md:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-[520px] bg-white" />
            ))}
          </div>
        ) : isError ? (
          <ContentError what="testimonials" className="mt-12" onRetry={() => void refetch()} />
        ) : (
          <ul className="mt-12 grid gap-[15px] md:grid-cols-2 lg:grid-cols-3">
            {data.map((t, i) => (
              <li key={t.id}>
                <Reveal delay={(i % 6) * 100} className="h-full">
                  <CaseStudyCard testimonial={t} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
