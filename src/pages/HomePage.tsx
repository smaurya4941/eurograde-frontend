import { useEffect } from 'react'
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

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <OfferSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <CtaBannerSection />
      <DestinationsSection />
      <TestimonialsSection />
      <TeamSection />
      <FaqSection />
      <UniversitiesSection />
      <BlogSection />
    </>
  )
}
