import { highlightParts, ProgressBar, Reveal, SectionHeading } from '@/components/marketing'
import type { ServiceDetail } from '../../types'
import { detailBadgeClass } from './detailBadgeClass'

/** "Why Us": heading, intro, animated progress bars and a closing paragraph. */
export function ServiceWhySection({ service }: { service: ServiceDetail }) {
  const { why } = service
  if (!why.title) return null

  return (
    <section aria-label={`Why choose EuroGrades for ${service.title}`}>
      <SectionHeading
        badgeClassName={detailBadgeClass}
        badge="Why Us"
        title={highlightParts(why.title, why.highlight)}
        description={why.intro ?? undefined}
      />
      {why.metrics.length > 0 && (
        <div className="mt-[30px] space-y-[30px]">
          {why.metrics.map((metric) => (
            <Reveal key={metric.label}>
              <ProgressBar label={metric.label} value={metric.value} />
            </Reveal>
          ))}
        </div>
      )}
      {why.outro && (
        <Reveal>
          <p className="mt-[30px]">{why.outro}</p>
        </Reveal>
      )}
    </section>
  )
}
