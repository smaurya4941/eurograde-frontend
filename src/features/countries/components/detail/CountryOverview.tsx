import { ImageReveal, Reveal } from '@/components/marketing'
import type { CountryDetail } from '../../types'

/** Cover photo (wipes in) followed by the overview paragraphs. */
export function CountryOverview({ country }: { country: CountryDetail }) {
  const paragraphs = (country.overview ?? '').split(/\n\s*\n/).filter(Boolean)

  return (
    <section aria-label={`About studying in ${country.name}`}>
      {country.cover_image_url && (
        <ImageReveal
          src={country.cover_image_url}
          alt={`${country.name} skyline`}
          width={990}
          height={520}
          loading="eager"
          fetchPriority="high"
          wrapperClassName="overflow-hidden rounded-2xl"
          className="aspect-[990/520] w-full object-cover"
        />
      )}
      {paragraphs.length > 0 && (
        <Reveal className="mt-6 space-y-5 xl:mt-[30px]">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </Reveal>
      )}
    </section>
  )
}
