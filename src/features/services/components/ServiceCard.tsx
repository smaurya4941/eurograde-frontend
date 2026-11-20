import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import type { Service } from '../types'
import { serviceHref } from '../utils'

/**
 * Services archive card: rounded photo (white shine sweep on hover), "Learn More" pill whose navy
 * fill slides in on hover while its arrow turns upright, then the title and excerpt.
 */
export function ServiceCard({ service }: { service: Service }) {
  const href = serviceHref(service.slug)

  return (
    <article className="group h-full">
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className="img-shine block overflow-hidden rounded-2xl bg-slate-200"
      >
        <img
          src={service.image_url ?? undefined}
          alt=""
          width={440}
          height={352}
          loading="lazy"
          decoding="async"
          className="aspect-[5/4] w-full object-cover"
        />
      </Link>

      <Link
        to={href}
        className="group/btn btn-slide-fill mt-5 inline-flex items-center rounded-full bg-brand-600 px-6 py-[15px] text-base leading-none font-bold text-white shadow-glow"
      >
        Learn More
        <span className="sr-only"> about {service.title}</span>
        {/* Same colour as the pill until the navy fill slides in behind it. */}
        <ArrowRight
          aria-hidden="true"
          strokeWidth={2.5}
          className="ml-2.5 size-4 -rotate-45 text-brand-600 transition-transform duration-400 ease-in-out group-hover/btn:rotate-0 group-focus-visible/btn:rotate-0"
        />
      </Link>

      <div className="pt-[35px] pr-6 pb-[30px] pl-[30px] sm:pr-[75px]">
        <h2 className="mb-2.5 text-xl leading-[1.3] font-bold text-ink xl:text-[22px]">
          <Link to={href} className="transition-colors hover:text-brand-600">
            {service.title}
          </Link>
        </h2>
        <p className="leading-[1.7]">{service.excerpt}</p>
      </div>
    </article>
  )
}
