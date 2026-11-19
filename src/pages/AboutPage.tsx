import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import {
  AboutFaqSection,
  AboutIntroSection,
  AboutWhyChooseSection,
  ApproachSection,
  ContactSection,
  GlobalCtaSection,
  InsightsSection,
  StatsStripSection,
  TeamCarouselSection,
  VideoSection,
} from '@/features/about'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us')

  return (
    <>
      <PageBanner title="About Us" image={bannerImg} breadcrumbs={[{ label: 'About us' }]} />
      <AboutIntroSection />
      <ApproachSection />
      <AboutWhyChooseSection />
      <StatsStripSection />
      <VideoSection />
      <ContactSection />
      <TeamCarouselSection />
      <AboutFaqSection />
      <GlobalCtaSection />
      <InsightsSection />
    </>
  )
}
