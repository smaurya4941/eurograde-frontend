import { Link, useSearchParams } from 'react-router'
import { paths } from '@/app/router/paths'
import { ContentError, Pagination, Skeleton } from '@/components/marketing'
import { usePosts } from '../../hooks'
import { blogPostHref } from '../../utils'

const PER_PAGE = 8

/** Old blogs.php layout: two-column grid of media cards (photo left, title/excerpt/Read More right). */
export function LegacyBlogGrid() {
  const [params] = useSearchParams()
  const pageParam = Number.parseInt(params.get('page') ?? '1', 10)
  const page = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1
  const category = params.get('category') ?? undefined
  const tag = params.get('tag') ?? undefined
  const search = params.get('search') ?? undefined

  const { data, isPending, isError, isPlaceholderData, refetch } = usePosts({
    page,
    perPage: PER_PAGE,
    category,
    tag,
    search,
  })

  const hrefForPage = (target: number) => {
    const next = new URLSearchParams(params)
    if (target > 1) next.set('page', String(target))
    else next.delete('page')
    const query = next.toString()
    return query ? `${paths.blog}?${query}` : paths.blog
  }

  return (
    <section aria-label="Blog articles" className="bg-legacy-soft py-12 md:py-20">
      <div className="legacy-container">
        {isPending && (
          <div className="grid gap-8 lg:grid-cols-2" aria-busy="true" aria-label="Loading articles">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-56" />
            ))}
          </div>
        )}
        {isError && <ContentError what="articles" onRetry={() => void refetch()} />}
        {data && data.posts.length === 0 && (
          <p className="py-12 text-center text-lg text-legacy-muted">No articles found.</p>
        )}
        {data && data.posts.length > 0 && (
          <>
            <ul
              aria-busy={isPlaceholderData || undefined}
              className="grid gap-x-12 gap-y-6 lg:grid-cols-2"
            >
              {data.posts.map((post) => (
                <li key={post.id} className="flex flex-col gap-4 py-3 md:flex-row md:gap-6">
                  {post.image_url && (
                    <Link
                      to={blogPostHref(post.slug)}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="block shrink-0 md:w-5/12"
                    >
                      <img
                        src={post.image_url}
                        alt=""
                        loading="lazy"
                        className="aspect-[4/3] h-auto w-full object-cover"
                      />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <h2 className="mb-3 text-xl font-medium">
                      <Link
                        to={blogPostHref(post.slug)}
                        className="text-legacy-text hover:text-legacy"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mb-6 line-clamp-4 text-legacy-muted">{post.excerpt}</p>
                    <Link
                      to={blogPostHref(post.slug)}
                      className="inline-block rounded-full border border-legacy-text px-6 py-1 text-base text-legacy-text uppercase transition-colors hover:bg-legacy-text hover:text-white"
                    >
                      Read More
                      <span className="sr-only"> about {post.title}</span>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <Pagination
              className="mt-12"
              currentPage={data.meta.current_page}
              lastPage={data.meta.last_page}
              hrefForPage={hrefForPage}
            />
          </>
        )}
      </div>
    </section>
  )
}
