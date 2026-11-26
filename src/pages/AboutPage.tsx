import bannerImg from '@/assets/images/legacy/about-bg.webp'
import { LegacyBanner } from '@/components/legacy'
import {
  LegacyAboutIntro,
  LegacyAboutStats,
  LegacyMission,
  LegacyPopularUniversities,
  LegacySuccessStories,
} from '@/features/about'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AboutPage() {
  usePageTitle('About Us')

  return (
    <div className="legacy-page">
      <LegacyBanner title="About Us" image={bannerImg} crumbs={[{ label: 'About' }]} />
      <LegacyAboutIntro />
      <LegacyAboutStats />
      <LegacyPopularUniversities />
      <LegacyMission />
      <LegacySuccessStories />
    </div>
  )
}
