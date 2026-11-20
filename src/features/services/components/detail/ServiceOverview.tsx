import { ImageReveal, Reveal } from '@/components/marketing'
import type { ServiceDetail } from '../../types'
import { paragraphs } from '../../utils'

/** Cover photo (wipes in) followed by the overview paragraphs. */
export function ServiceOverview({ service }: { service: ServiceDetail }) {
  const text = paragraphs(service.overview)

  return (
    <section aria-label={`About ${service.title}`}>
      {service.image_url && (
        <ImageReveal
          src={service.image_url}
          alt={service.title}
          width={990}
          height={520}
          loading="eager"
          fetchPriority="high"
          wrapperClassName="overflow-hidden rounded-2xl"
          className="aspect-[990/520] w-full object-cover"
        />
      )}
      {text.length > 0 && (
        <Reveal className="mt-5 space-y-5">
          {text.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </Reveal>
      )}
    </section>
  )
}
