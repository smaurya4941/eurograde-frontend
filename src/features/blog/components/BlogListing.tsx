import { SearchX, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router'
import { paths } from '@/app/router/paths'
import { ContentError, Pagination, Reveal, Skeleton } from '@/components/marketing'
import { cn } from '@/lib/cn'
import { usePostCategories, usePosts } from '../hooks'
import { BlogListCard } from './BlogListCard'
import { humanizeSlug } from '../utils'
import { BlogSidebar } from './BlogSidebar'

const PER_PAGE = 8

/** Reads `?page=&category=&tag=&search=` from the URL so every view is shareable and back-button friendly. */
function useBlogFilters() {
  const [params, setParams] = useSearchParams()
  const pageParam = Number.parseInt(params.get('page') ?? '1', 10)

  return {
    page: Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1,
    category: params.get('category') ?? undefined,
    tag: params.get('tag') ?? undefined,
    search: params.get('search') ?? '',
    setSearch: (term: string) => {
      const next = new URLSearchParams(params)
      next.delete('page')
      if (term) next.set('search', term)
      else next.delete('search')
      setParams(next, { preventScrollReset: true })
    },
    hrefForPage: (page: number) => {
      const next = new URLSearchParams(params)
      if (page > 1) next.set('page', String(page))
      else next.delete('page')
      const query = next.toString()
      return query ? `${paths.blog}?${query}` : paths.blog
    },
  }
}

function ActiveFilters({
  category,
  tag,
  search,
}: {
  category?: string
  tag?: string
  search: string
}) {
  const { data: categories } = usePostCategories()
  if (!category && !tag && !search) return null

  const categoryName = categories?.find((c) => c.slug === category)?.name ?? category

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3 text-[15px]">
      <span>Showing</span>
      {categoryName && (
        <span className="rounded-full bg-brand-600/10 px-3 py-1 font-semibold text-brand-600">
          {categoryName}
        </span>
      )}
      {tag && (
        <span className="rounded-full bg-brand-600/10 px-3 py-1 font-semibold text-brand-600">
          <span className="sr-only">Tag: </span>#{humanizeSlug(tag)}
        </span>
      )}
      {search && (
        <span className="rounded-full bg-brand-600/10 px-3 py-1 font-semibold text-brand-600">
          “{search}”
        </span>
      )}
      <Link
        to={paths.blog}
        preventScrollReset
        className="inline-flex items-center gap-1 font-semibold text-ink underline-offset-4 hover:text-brand-600 hover:underline"
      >
        <X aria-hidden="true" className="size-4" />
        Clear filters
      </Link>
    </div>
  )
}

export function BlogListing() {
  const filters = useBlogFilters()
  const { page, category, tag, search } = filters
  const { data, isPending, isError, isPlaceholderData, refetch } = usePosts({
    page,
    perPage: PER_PAGE,
    category,
    tag,
    search,
  })

  // After paging or filtering, bring the top of the list back into view.
  const listTopRef = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    listTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page, category, tag, search])

  return (
    <section aria-label="Blog articles" className="bg-surface section-y xl:pt-[90px]">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_430px] xl:gap-[70px]">
        <div ref={listTopRef} className="scroll-mt-28">
          <ActiveFilters category={category} tag={tag} search={search} />

          {isPending && (
            <div className="space-y-[30px]" aria-busy="true" aria-label="Loading articles">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-[245px]" />
              ))}
            </div>
          )}

          {isError && <ContentError what="articles" onRetry={() => void refetch()} />}

          {data && data.posts.length === 0 && (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line px-6 py-16 text-center">
              <SearchX aria-hidden="true" className="size-10 text-brand-600" />
              <p className="text-lg font-semibold text-ink">No articles found</p>
              <p>Try a different search term or browse all categories.</p>
              <Link
                to={paths.blog}
                className="rounded-full bg-brand-600 px-6 py-3 text-[15px] font-bold text-white transition-colors hover:bg-ink"
              >
                View all articles
              </Link>
            </div>
          )}

          {data && data.posts.length > 0 && (
            <>
              <ul
                aria-busy={isPlaceholderData || undefined}
                className={cn(
                  'space-y-[30px] transition-opacity duration-300',
                  isPlaceholderData && 'opacity-60',
                )}
              >
                {data.posts.map((post, i) => (
                  <li key={post.id}>
                    <Reveal delay={Math.min(i, 3) * 80}>
                      <BlogListCard post={post} />
                    </Reveal>
                  </li>
                ))}
              </ul>

              <Pagination
                className="mt-12"
                currentPage={data.meta.current_page}
                lastPage={data.meta.last_page}
                hrefForPage={filters.hrefForPage}
              />
            </>
          )}
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <BlogSidebar search={search} activeCategory={category} onSearch={filters.setSearch} />
        </div>
      </div>
    </section>
  )
}
