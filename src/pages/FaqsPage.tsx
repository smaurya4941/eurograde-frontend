import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import { FaqTopicsSection } from '@/features/faqs'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function FaqsPage() {
  usePageTitle('FAQs')

  return (
    <>
      <PageBanner
        title="Frequently Asked Questions"
        image={bannerImg}
        breadcrumbs={[{ label: 'FAQs' }]}
      />
      <FaqTopicsSection />
    </>
  )
}
