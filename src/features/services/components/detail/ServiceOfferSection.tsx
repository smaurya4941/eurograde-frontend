import { useState } from 'react'
import {
  highlightParts,
  Lightbox,
  Reveal,
  SectionHeading,
  type LightboxImage,
} from '@/components/marketing'
import type { ServiceDetail } from '../../types'
import { detailBadgeClass } from './detailBadgeClass'

/** Solid blue circle with a white tick (the theme's "check-circle" list icon). */
function CheckCircle() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-[22px] shrink-0">
      <circle cx="12" cy="12" r="12" className="fill-brand-600" />
      <path
        d="m7 12.5 3.2 3.2L17 9"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Two photos side by side; each opens the lightbox. */
function OfferGallery({ images }: { images: LightboxImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Reveal>
      <ul className="grid gap-5 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={image.url}>
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${image.alt}`}
              className="img-shine block w-full overflow-hidden rounded-2xl bg-slate-200"
            >
              <img
                src={image.url}
                alt={image.alt}
                width={423}
                height={265}
                loading="lazy"
                decoding="async"
                className="aspect-[423/265] w-full object-cover"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Reveal>
  )
}

/** "What We Offer": heading, intro, checklist and the photo gallery. */
export function ServiceOfferSection({ service }: { service: ServiceDetail }) {
  const { offer } = service
  const images = offer.images.flatMap((i) => (i.url ? [{ url: i.url, alt: i.alt }] : []))
  if (!offer.title && offer.features.length === 0 && images.length === 0) return null

  return (
    <>
      <section aria-label="What we offer">
        {offer.title && (
          <SectionHeading
            badgeClassName={detailBadgeClass}
            badge="What We Offer"
            title={highlightParts(offer.title, offer.highlight)}
            description={offer.intro ?? undefined}
          />
        )}
        {offer.features.length > 0 && (
          <Reveal className="mt-[30px]">
            <ul className="space-y-5">
              {offer.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <CheckCircle />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>
      {images.length > 0 && <OfferGallery images={images} />}
    </>
  )
}
