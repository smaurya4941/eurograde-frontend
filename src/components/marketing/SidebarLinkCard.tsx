import { ArrowUpRight } from 'lucide-react'
import { useId } from 'react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'

export interface SidebarLink {
  label: string
  /** Route path, or an in-page anchor such as "#ielts-preparation". */
  href: string
  /** Marks the current page's entry (e.g. the country being viewed). */
  current?: boolean
}

const linkClass =
  'group flex items-center justify-between gap-4 px-1 py-3 transition-colors duration-300 hover:text-brand-500 xl:py-[13px]'

/** Sidebar card with a blue title bar and a navy list of arrow links ("Other Topics", "Other Countries"). */
export function SidebarLinkCard({
  title,
  links,
  className,
}: {
  title: string
  links: SidebarLink[]
  className?: string
}) {
  const titleId = useId()

  return (
    <nav aria-labelledby={titleId} className={cn('overflow-hidden rounded-2xl', className)}>
      <h2
        id={titleId}
        className="bg-brand-600 px-5 py-5 text-xl leading-tight font-bold text-white xl:text-[22px]"
      >
        {title}
      </h2>
      <ul className="space-y-1 bg-ink p-5 pb-6">
        {links.map((link) => {
          const content = (
            <>
              {link.label}
              <ArrowUpRight
                aria-hidden="true"
                strokeWidth={1.75}
                className="size-[22px] shrink-0 transition-transform duration-300 group-hover:rotate-45"
              />
            </>
          )
          const className = cn(linkClass, link.current ? 'text-brand-500' : 'text-white')

          return (
            <li key={link.href}>
              {link.href.startsWith('#') ? (
                <a href={link.href} className={className}>
                  {content}
                </a>
              ) : (
                <Link
                  to={link.href}
                  aria-current={link.current ? 'page' : undefined}
                  className={className}
                >
                  {content}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
