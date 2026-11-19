import { CalendarDays, Tag } from 'lucide-react'
import { Link } from 'react-router'
import passports from '@/assets/images/home/visa-book-img.png'
import { ArrowLink, ContentError, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import {
  blogCategoryHref,
  blogPostHref,
  formatPostDate,
  useLatestPosts,
  type PostSummary,
} from '@/features/blog'
import { cn } from '@/lib/cn'

function PostMeta({ post }: { post: PostSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[15px]">
      {post.published_at && (
        <span className="inline-flex items-center gap-2">
          <CalendarDays aria-hidden="true" className="size-4" />
          <time dateTime={post.published_at}>{formatPostDate(post.published_at)}</time>
        </span>
      )}
      {post.category && (
        <Link
          to={blogCategoryHref(post.category.slug)}
          className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
        >
          <Tag aria-hidden="true" className="size-4 fill-current" />
          {post.category.name}
        </Link>
      )}
    </div>
  )
}

function PostCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  const href = blogPostHref(post.slug)

  return (
    <article
      className={cn(
        'group h-full rounded-2xl border border-line bg-white p-5 transition-shadow duration-500 hover:shadow-card',
        featured ? 'flex flex-col' : 'grid gap-5 sm:grid-cols-[200px_1fr]',
      )}
    >
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className="img-shine block overflow-hidden rounded-xl bg-slate-200"
      >
        {post.image_url && (
          <img
            src={post.image_url}
            alt=""
            loading="lazy"
            className={cn(
              'w-full object-cover transition-transform duration-700 group-hover:scale-105',
              featured ? 'aspect-[650/360]' : 'aspect-[4/3] h-full sm:aspect-auto sm:min-h-[245px]',
            )}
          />
        )}
      </Link>

      <div className={cn('flex flex-col', featured ? 'mt-6 flex-1' : 'justify-center')}>
        <PostMeta post={post} />
        <h3 className="mt-3 text-lg leading-snug font-semibold xl:text-[21px]">
          <Link to={href} className="transition-colors hover:text-brand-600">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2">{post.excerpt}</p>
        {featured && (
          <div className="mt-auto border-t border-line pt-5">
            <ArrowLink to={href} tone="brand">
              Read More<span className="sr-only">: {post.title}</span>
            </ArrowLink>
          </div>
        )}
      </div>
    </article>
  )
}

function PostsGrid() {
  const { data: posts, isPending, isError, refetch } = useLatestPosts(3)

  if (isPending) {
    return (
      <div
        className="mt-12 grid gap-5 lg:grid-cols-2"
        aria-busy="true"
        aria-label="Loading articles"
      >
        <Skeleton className="h-[560px] bg-white" />
        <div className="grid gap-5">
          <Skeleton className="h-[270px] bg-white" />
          <Skeleton className="h-[270px] bg-white" />
        </div>
      </div>
    )
  }

  if (isError) {
    return <ContentError what="articles" className="mt-12" onRetry={() => void refetch()} />
  }

  const [featured, ...rest] = posts

  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {featured && (
        <Reveal className="h-full">
          <PostCard post={featured} featured />
        </Reveal>
      )}
      <div className="grid gap-5">
        {rest.map((post, i) => (
          <Reveal key={post.id} delay={(i + 1) * 150} className="h-full">
            <PostCard post={post} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function BlogSection() {
  return (
    <section
      aria-label="Insights and guides"
      className="relative overflow-hidden bg-surface section-y"
    >
      <img
        src={passports}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="animate-swing pointer-events-none absolute top-28 left-[30px] hidden w-[150px] xl:block"
      />

      <div className="relative container-site">
        <SectionHeading
          align="center"
          badge="Insights & Guides"
          title={[
            { text: 'Helpful Insights For ' },
            { text: 'Your Study Abroad Journey', highlight: true },
          ]}
          titleClassName="max-w-[700px]"
          description="Explore expert tips, destination guides, visa updates, scholarship advice, and useful resources to help you make informed decisions about studying abroad."
        />
        <PostsGrid />
      </div>
    </section>
  )
}
