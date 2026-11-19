import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { ContentError, PillLink, Reveal, SectionHeading, Skeleton } from '@/components/marketing'
import { blogPostHref, useLatestPosts, type PostSummary } from '@/features/blog'

function InsightCard({ post }: { post: PostSummary }) {
  const href = blogPostHref(post.slug)

  return (
    <article className="group flex h-full flex-col">
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
            className="aspect-[440/345] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </Link>
      <h3 className="mt-6 text-lg leading-snug font-semibold xl:text-[21px]">
        <Link to={href} className="transition-colors hover:text-brand-600">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 line-clamp-2">{post.excerpt}</p>
      <div className="mt-auto border-t border-line pt-5">
        <Link
          to={href}
          className="group/btn inline-flex items-center gap-2.5 rounded-full border border-brand-600/30 px-6 py-3 text-[15px] font-medium text-brand-600 transition-colors duration-300 hover:border-brand-600 hover:bg-brand-600 hover:text-white"
        >
          Read More<span className="sr-only">: {post.title}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 -rotate-45 transition-transform duration-400 group-hover/btn:rotate-0"
          />
        </Link>
      </div>
    </article>
  )
}

function InsightsGrid() {
  const { data: posts, isPending, isError, refetch } = useLatestPosts(3)

  if (isPending) {
    return (
      <div
        className="mt-12 grid gap-8 md:grid-cols-3"
        aria-busy="true"
        aria-label="Loading articles"
      >
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-[520px]" />
        ))}
      </div>
    )
  }

  if (isError) {
    return <ContentError what="articles" className="mt-12" onRetry={() => void refetch()} />
  }

  return (
    <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-[30px]">
      {posts.map((post, i) => (
        <li key={post.id}>
          <Reveal delay={i * 150} className="h-full">
            <InsightCard post={post} />
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

export function InsightsSection() {
  return (
    <section aria-label="Latest insights" className="bg-surface section-y">
      <div className="container-site">
        <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-[50px]">
          <SectionHeading
            badge="Latest Insights"
            title={[
              { text: 'Expert Study Abroad ' },
              { text: 'Tips, Guides & Success Strategies', highlight: true },
            ]}
            titleClassName="max-w-[640px]"
          />
          <Reveal delay={150} className="lg:self-start lg:pt-2">
            <p className="max-w-[660px]">
              From choosing a university and preparing your documents to scholarships and student
              visas, discover expert knowledge that simplifies your journey to studying abroad.
            </p>
            <PillLink to={paths.contact} className="mt-6">
              Start Your Study Abroad Journey
            </PillLink>
          </Reveal>
        </div>
        <InsightsGrid />
      </div>
    </section>
  )
}
