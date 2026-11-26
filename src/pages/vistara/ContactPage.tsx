import bannerImg from '@/assets/images/banners/about.webp'
import { PageBanner } from '@/components/marketing'
import { ContactDetailsSection, LocationMap } from '@/features/contact'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('Contact Us')

  return (
    <>
      <PageBanner title="Contact Us" image={bannerImg} breadcrumbs={[{ label: 'Contact Us' }]} />
      <ContactDetailsSection />
      <LocationMap />
    </>
  )
}
