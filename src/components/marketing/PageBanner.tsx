import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { AnimatedHeading } from './AnimatedHeading'
import { Reveal } from './Reveal'

interface PageBannerProps {
  title: string
  image: string
  /** Trail after "Home"; the last entry is the current page. */
  breadcrumbs?: { label: string; href?: string }[]
}

/** Dark photo banner at the top of inner pages: breadcrumb + page title. */
export function PageBanner({ title, image, breadcrumbs = [{ label: title }] }: PageBannerProps) {
  return (
    <section
      aria-labelledby="page-title"
      className="relative flex min-h-[340px] items-center justify-center overflow-hidden bg-ink bg-cover bg-center md:min-h-[460px] xl:min-h-[600px]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/80" />
      <div className="relative container-site py-20 text-center text-white">
        <Reveal variant="fade-down">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center justify-center gap-2 font-medium">
              <li>
                <Link to={paths.home} className="transition-colors hover:text-brand-500">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1
                return (
                  <li key={crumb.label} className="flex items-center gap-2">
                    <span aria-hidden="true">/</span>
                    {crumb.href && !isLast ? (
                      <Link to={crumb.href} className="transition-colors hover:text-brand-500">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? 'page' : undefined}>{crumb.label}</span>
                    )}
                  </li>
                )
              })}
            </ol>
          </nav>
        </Reveal>
        <AnimatedHeading
          as="h1"
          id="page-title"
          variant="back"
          parts={[{ text: title }]}
          className="mx-auto mt-4 max-w-[1100px] text-2xl leading-[1.25] font-bold text-white min-[1650px]:text-[48px] md:text-[32px] lg:text-[40px] xl:text-[46px]"
        />
      </div>
    </section>
  )
}
