import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import { ServicesGridSection } from '@/features/services'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ServicesPage() {
  usePageTitle('Our Services')

  return (
    <>
      <PageBanner title="Our Services" image={bannerImg} />
      <ServicesGridSection />
    </>
  )
}
