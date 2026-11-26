import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { LegacyBanner } from '@/components/legacy'
import {
  AttestationBlogSection,
  AttestationOfferSection,
  EnquirySection,
} from '@/features/attestation'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AttestationPage() {
  usePageTitle('Attestation Services')

  return (
    <div className="legacy-page">
      <LegacyBanner title="Attestation Services" image={bannerImg} />
      <AttestationOfferSection />
      <AttestationBlogSection />
      <EnquirySection sourcePage="attestation" />
    </div>
  )
}
