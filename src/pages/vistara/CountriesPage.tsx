import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import { CountriesGridSection } from '@/features/countries'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function CountriesPage() {
  usePageTitle('Countries')

  return (
    <>
      <PageBanner title="Countries" image={bannerImg} />
      <CountriesGridSection />
    </>
  )
}
