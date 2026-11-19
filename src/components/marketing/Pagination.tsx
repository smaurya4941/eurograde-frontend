import { Link as RouterLink, type LinkProps } from 'react-router'
import { cn } from '@/lib/cn'

// Paging should keep the reader near the list; the listing scrolls itself into view.
const Link = (props: LinkProps) => <RouterLink preventScrollReset {...props} />

interface PaginationProps {
  currentPage: number
  lastPage: number
  /** Builds the URL for a page, so every control is a real, crawlable link. */
  hrefForPage: (page: number) => string
  className?: string
}

type Item = number | 'gap'

/** 1 … 4 5 [6] 7 8 … 20 — always shows first, last and two neighbours of the current page. */
function pageItems(current: number, last: number): Item[] {
  const pages = new Set([1, last, current - 2, current - 1, current, current + 1, current + 2])
  const sorted = [...pages].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b)

  return sorted.flatMap((page, i): Item[] => {
    const previous = sorted[i - 1]
    return previous !== undefined && page - previous > 1 ? ['gap', page] : [page]
  })
}

const boxClass =
  'flex h-[42px] min-w-[42px] items-center justify-center rounded-md border px-3 text-[15px] font-bold transition-colors duration-300'

export function Pagination({ currentPage, lastPage, hrefForPage, className }: PaginationProps) {
  if (lastPage <= 1) return null

  return (
    <nav aria-label="Pagination" className={cn('flex justify-center', className)}>
      <ul className="flex flex-wrap items-center gap-3">
        {currentPage > 1 && (
          <li>
            <Link
              to={hrefForPage(currentPage - 1)}
              rel="prev"
              className={cn(
                boxClass,
                'border-line bg-white text-ink hover:border-brand-600 hover:bg-brand-600 hover:text-white',
              )}
            >
              Previous
            </Link>
          </li>
        )}

        {pageItems(currentPage, lastPage).map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} aria-hidden="true" className="px-1 text-body">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                to={hrefForPage(item)}
                aria-label={`Page ${item}`}
                aria-current={item === currentPage ? 'page' : undefined}
                className={cn(
                  boxClass,
                  item === currentPage
                    ? 'pointer-events-none border-brand-600 bg-brand-600 text-white'
                    : 'border-line bg-white text-ink hover:border-brand-600 hover:bg-brand-600 hover:text-white',
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        {currentPage < lastPage && (
          <li>
            <Link
              to={hrefForPage(currentPage + 1)}
              rel="next"
              className={cn(
                boxClass,
                'border-line bg-white text-ink hover:border-brand-600 hover:bg-brand-600 hover:text-white',
              )}
            >
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
