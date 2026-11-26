import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { LegacyBanner } from '@/components/legacy'
import { LegacyContactForm, LegacyContactInfo } from '@/features/contact'
import { paths } from '@/app/router/paths'
import { usePageTitle } from '@/hooks/usePageTitle'

/** Fragment of `paths.eligibility`, so "Free Eligibility Check" lands on the form. */
const formAnchor = paths.eligibility.split('#')[1]

export default function ContactPage() {
  usePageTitle('Contact Us')

  return (
    <div className="legacy-page">
      <LegacyBanner title="Contact Us" image={bannerImg} crumbs={[{ label: 'Contact Us' }]} />
      <section aria-label="Contact us" className="py-12 md:py-20">
        <div className="legacy-container">
          <LegacyContactForm id={formAnchor} />
          <LegacyContactInfo />
        </div>
      </section>
    </div>
  )
}
