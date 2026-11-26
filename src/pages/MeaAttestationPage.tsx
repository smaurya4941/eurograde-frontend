import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { paths } from '@/app/router/paths'
import { LegacyBanner, LegacyFaq } from '@/components/legacy'
import { EnquirySection, MeaTabs } from '@/features/attestation'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function MeaAttestationPage() {
  usePageTitle('MEA Attestation')

  return (
    <div className="legacy-page">
      <LegacyBanner
        title="MEA Attestation"
        image={bannerImg}
        crumbs={[
          { label: 'Attestation Services', href: paths.attestation },
          { label: 'MEA Attestation' },
        ]}
      />
      <div className="legacy-container pt-12">
        <h2 className="text-center font-work text-[28px] font-bold tracking-[0.1px] text-legacy-text uppercase md:text-[38px]">
          Ministry of External Affairs
        </h2>
      </div>
      <MeaTabs />
      <LegacyFaq category="attestation" />
      <EnquirySection sourcePage="mea-attestation" />
    </div>
  )
}
