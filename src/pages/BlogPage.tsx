import bannerImg from '@/assets/images/legacy/blgos.webp'
import { LegacyBanner } from '@/components/legacy'
import { LegacyBlogGrid } from '@/features/blog'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function BlogPage() {
  usePageTitle('Blogs')

  return (
    <div className="legacy-page">
      <LegacyBanner title="Blogs" image={bannerImg} crumbs={[{ label: 'Blogs' }]} />
      <LegacyBlogGrid />
    </div>
  )
}
