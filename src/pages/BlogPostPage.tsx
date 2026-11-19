import { useParams } from 'react-router'
import bannerImg from '@/assets/images/about/banner-img.webp'
import { paths } from '@/app/router/paths'
import { ContentError, PageBanner } from '@/components/marketing'
import { blogCategoryHref, PostArticle, PostArticleSkeleton, usePost } from '@/features/blog'
import { useMetaDescription } from '@/hooks/useMetaDescription'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api/errors'
import NotFoundPage from '@/pages/NotFoundPage'

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const { data: post, isPending, isError, error, refetch } = usePost(slug)
  usePageTitle(post?.title ?? 'Blog')
  useMetaDescription(post?.excerpt)

  if (isError && error instanceof ApiError && error.status === 404) {
    return <NotFoundPage />
  }

  if (isPending) {
    return <PostArticleSkeleton />
  }

  if (isError) {
    return (
      <>
        <PageBanner title="Blog" image={bannerImg} breadcrumbs={[{ label: 'Blog' }]} />
        <div className="bg-surface section-y">
          <ContentError what="article" onRetry={() => void refetch()} className="container-site" />
        </div>
      </>
    )
  }

  return (
    <>
      <PageBanner
        title={post.title}
        image={bannerImg}
        breadcrumbs={[
          post.category
            ? { label: post.category.name, href: blogCategoryHref(post.category.slug) }
            : { label: 'Blog', href: paths.blog },
          { label: post.title },
        ]}
      />
      {/* Keyed by slug so moving between articles resets comment/reply state. */}
      <PostArticle key={post.slug} post={post} />
    </>
  )
}
