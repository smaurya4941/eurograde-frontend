import bannerImg from '@/assets/images/about/banner-img.webp'
import { PageBanner } from '@/components/marketing'
import {
  CaseStudiesSection,
  LanguageReviewsSection,
  SuccessStoriesSection,
  VideoReviewsSection,
} from '@/features/testimonials'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TestimonialsPage() {
  usePageTitle('Testimonials')

  return (
    <>
      <PageBanner title="Testimonials" image={bannerImg} />
      <SuccessStoriesSection />
      <CaseStudiesSection />
      <VideoReviewsSection />
      <LanguageReviewsSection />
    </>
  )
}
