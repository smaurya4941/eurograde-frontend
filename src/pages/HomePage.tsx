import { useEffect } from 'react'
import { LazySection } from '@/components/marketing'
import { env } from '@/config/env'
import {
  AboutSection,
  BlogSection,
  CtaBannerSection,
  DestinationsSection,
  FaqSection,
  HeroSection,
  HowItWorksSection,
  OfferSection,
  ServicesSection,
  TeamSection,
  TestimonialsSection,
  UniversitiesSection,
  WhyChooseSection,
} from '@/features/home'

export default function HomePage() {
  useEffect(() => {
    document.title = `${env.appName} — Study Abroad & Student Visa Consultants`
  }, [])

  // The hero renders immediately; every other section mounts as the visitor nears it (on desktop
  // the About section is already within range on load).
  return (
    <>
      <HeroSection />
      <LazySection>
        <AboutSection />
      </LazySection>
      <LazySection>
        <ServicesSection />
      </LazySection>
      <LazySection>
        <OfferSection />
      </LazySection>
      <LazySection>
        <HowItWorksSection />
      </LazySection>
      <LazySection>
        <WhyChooseSection />
      </LazySection>
      <LazySection>
        <CtaBannerSection />
      </LazySection>
      <LazySection>
        <DestinationsSection />
      </LazySection>
      <LazySection>
        <TestimonialsSection />
      </LazySection>
      <LazySection>
        <TeamSection />
      </LazySection>
      <LazySection>
        <FaqSection />
      </LazySection>
      <LazySection>
        <UniversitiesSection />
      </LazySection>
      <LazySection>
        <BlogSection />
      </LazySection>
    </>
  )
}
