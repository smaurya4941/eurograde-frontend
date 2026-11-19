import { ArrowRight, Search } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { Skeleton } from '@/components/marketing'
import { socials } from '@/config/site'
import { cn } from '@/lib/cn'
import { useLatestPosts, usePostCategories } from '../hooks'
import { blogCategoryHref, blogPostHref, formatPostDate } from '../utils'

function WidgetTitle({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold text-white xl:text-[22px]">
      {children}
    </h2>
  )
}

function SearchWidget({
  initialValue,
  onSearch,
}: {
  initialValue: string
  onSearch: (term: string) => void
}) {
  const inputId = useId()
  const [value, setValue] = useState(initialValue)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="pb-6">
      <label htmlFor={inputId} className="sr-only">
        Search articles
      </label>
      <div className="flex items-center rounded-full bg-white p-1 pl-5">
        <input
          id={inputId}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search Topics"
          maxLength={100}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-[15px] text-ink placeholder:text-body focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex size-[46px] shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-ink"
        >
          <Search aria-hidden="true" className="size-[18px]" />
        </button>
      </div>
    </form>
  )
}

function CategoriesWidget({ activeSlug }: { activeSlug?: string }) {
  const { data: categories, isPending, isError } = usePostCategories()

  return (
    <section aria-labelledby="blog-categories" className="border-t border-line-light py-6">
      <WidgetTitle id="blog-categories">Categories</WidgetTitle>
      {isPending && (
        <div className="mt-5 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-5 rounded bg-white/10" />
          ))}
        </div>
      )}
      {isError && (
        <p className="mt-4 text-sm text-slate-400">Categories are unavailable right now.</p>
      )}
      {categories && (
        <ul className="mt-4 space-y-1">
          {categories.map((category) => {
            const active = category.slug === activeSlug
            return (
              <li key={category.id}>
                <Link
                  to={blogCategoryHref(category.slug)}
                  preventScrollReset
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group flex items-center justify-between gap-3 py-[7px] transition-colors duration-300 hover:text-brand-500',
                    active ? 'text-brand-500' : 'text-white',
                  )}
                >
                  <span>
                    {category.name}
                    {category.posts_count !== undefined && (
                      <span className="sr-only">
                        {' '}
                        ({category.posts_count}{' '}
                        {category.posts_count === 1 ? 'article' : 'articles'})
                      </span>
                    )}
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 -rotate-45 transition-transform duration-400 group-hover:rotate-0"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

function RecentPostsWidget() {
  const { data: posts, isPending } = useLatestPosts(3)

  return (
    <section className="border-t border-line-light py-6">
      <WidgetTitle>Recent Blogs</WidgetTitle>
      <ul className="mt-5 space-y-5">
        {isPending &&
          Array.from({ length: 3 }, (_, i) => (
            <li key={i} className="flex gap-4">
              <Skeleton className="size-[75px] shrink-0 rounded-lg bg-white/10" />
              <Skeleton className="h-[75px] flex-1 rounded-lg bg-white/10" />
            </li>
          ))}
        {posts?.map((post) => (
          <li key={post.id}>
            <Link to={blogPostHref(post.slug)} className="group flex items-start gap-4">
              <span className="img-shine block size-[75px] shrink-0 overflow-hidden rounded-lg bg-white/10">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </span>
              <span>
                <span className="line-clamp-2 leading-snug font-semibold text-white transition-colors group-hover:text-brand-500">
                  {post.title}
                </span>
                {post.published_at && (
                  <time dateTime={post.published_at} className="mt-2 block text-sm text-brand-500">
                    {formatPostDate(post.published_at)}
                  </time>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FollowWidget() {
  return (
    <section className="border-y border-line-light py-6">
      <WidgetTitle>Follow Us On</WidgetTitle>
      <ul className="mt-5 flex gap-3">
        {socials.map((s) => (
          <li key={s.network}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-600"
            >
              <SocialIcon network={s.network} className="size-4" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

interface BlogSidebarProps {
  search: string
  activeCategory?: string
  onSearch: (term: string) => void
}

/** Dark sidebar card: search, categories, recent posts and social links. */
export function BlogSidebar({ search, activeCategory, onSearch }: BlogSidebarProps) {
  return (
    <aside aria-label="Blog sidebar" className="rounded-2xl bg-ink p-6 xl:p-6">
      {/* `key` resets the input when the URL search term changes (e.g. "clear filters"). */}
      <SearchWidget key={search} initialValue={search} onSearch={onSearch} />
      <CategoriesWidget activeSlug={activeCategory} />
      <RecentPostsWidget />
      <FollowWidget />
    </aside>
  )
}
