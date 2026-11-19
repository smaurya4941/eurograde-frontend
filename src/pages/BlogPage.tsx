import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import { BlogListing } from '@/features/blog'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function BlogPage() {
  usePageTitle('Blog')

  return (
    <>
      <PageBanner title="Blog List" image={bannerImg} breadcrumbs={[{ label: 'Blog List' }]} />
      <BlogListing />
    </>
  )
}
