import { Link } from 'react-router'
import { paths } from '@/app/router/paths'

interface LegacyBannerProps {
  title: string
  image: string
  /** Trail after "Home"; the last entry is the current page. */
  crumbs?: { label: string; href?: string }[]
}

/** Old-design page banner: 400px photo, dark overlay, bold white title + breadcrumb. */
export function LegacyBanner({ title, image, crumbs = [{ label: title }] }: LegacyBannerProps) {
  return (
    <section
      className="relative flex h-[300px] items-center justify-center bg-legacy-navy bg-cover bg-center text-center md:h-[400px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
      <div className="relative px-4 text-white">
        <h1 className="font-work text-[32px] font-bold text-white md:text-5xl">{title}</h1>
        <nav aria-label="Breadcrumb" className="mt-3">
          <ol className="flex flex-wrap items-center justify-center gap-2 text-[15px]">
            <li>
              <Link to={paths.home} className="hover:underline">
                Home
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.href && i < crumbs.length - 1 ? (
                  <Link to={c.href} className="hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={i === crumbs.length - 1 ? 'page' : undefined}>{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}
