import { Link } from 'react-router'
import { ContentError, Skeleton } from '@/components/marketing'
import { LegacySectionTitle } from '@/components/legacy'
import { blogPostHref, useLatestPosts } from '@/features/blog'

/** "From our blog": four teasers (image left, text right) from `GET /posts`. */
export function AttestationBlogSection() {
  const { data: posts, isPending, isError, refetch } = useLatestPosts(4)

  return (
    <section className="bg-legacy-soft py-12 md:py-20">
      <div className="legacy-container">
        <LegacySectionTitle
          title="From our blog"
          subtitle="Guides and updates on documents, attestation and studying abroad."
        />
        {isError && <ContentError what="blog posts" onRetry={() => void refetch()} />}
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-2">
          {isPending &&
            !isError &&
            Array.from({ length: 4 }, (_, i) => <Skeleton key={i} className="h-44 w-full" />)}
          {posts?.map((post) => (
            <article key={post.id} className="flex gap-6 py-3">
              {post.image_url && (
                <Link to={blogPostHref(post.slug)} className="w-5/12 shrink-0" tabIndex={-1}>
                  <img
                    src={post.image_url}
                    alt=""
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </Link>
              )}
              <div className="flex flex-col items-start">
                <h3 className="mb-3 font-work text-xl font-medium text-legacy-text">
                  <Link to={blogPostHref(post.slug)} className="hover:text-legacy">
                    {post.title}
                  </Link>
                </h3>
                <p className="mb-5 line-clamp-3 text-legacy-muted">{post.excerpt}</p>
                <Link
                  to={blogPostHref(post.slug)}
                  className="mt-auto rounded-full border border-legacy-text px-6 py-1.5 text-base text-legacy-text uppercase transition-colors hover:bg-legacy-text hover:text-white"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
