import { Link } from 'react-router'
import type { PostSummary } from '../types'
import { blogCategoryHref, blogPostHref } from '../utils'

/** Horizontal article card: image (35%) on the left, category/title/excerpt on the right. */
export function BlogListCard({ post }: { post: PostSummary }) {
  const href = blogPostHref(post.slug)

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-surface transition-all duration-500 hover:border-brand-600/30 hover:bg-white hover:shadow-card sm:grid-cols-[35%_1fr] sm:items-center">
      <Link
        to={href}
        tabIndex={-1}
        aria-hidden="true"
        className="img-shine block h-[220px] overflow-hidden bg-slate-200 sm:h-[245px]"
      >
        {post.image_url && (
          <img
            src={post.image_url}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </Link>

      <div className="p-6 xl:px-[30px]">
        {post.category && (
          <Link
            to={blogCategoryHref(post.category.slug)}
            className="text-[15px] font-medium text-brand-600 transition-colors hover:text-ink"
          >
            {post.category.name}
          </Link>
        )}
        <h2 className="mt-3 text-lg leading-snug font-semibold xl:text-[22px]">
          <Link to={href} className="transition-colors duration-300 hover:text-brand-600">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-2 text-[15px]">{post.excerpt}</p>
      </div>
    </article>
  )
}
