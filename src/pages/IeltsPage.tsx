import { CircleCheck } from 'lucide-react'
import bannerImage from '@/assets/images/legacy/ielts-bg.webp'
import ieltsImage from '@/assets/images/legacy/ielts-side.webp'
import patternImage from '@/assets/images/legacy/pattern.webp'
import whyImage from '@/assets/images/legacy/why-eurograde.webp'
import { LegacyBanner, LegacyFaq, LegacyReviews } from '@/components/legacy'
import { Reveal } from '@/components/marketing'
import { ieltsCopy } from '@/features/ielts/data'
import { usePageTitle } from '@/hooks/usePageTitle'

const bullets = 'list-inside list-disc space-y-2 marker:text-legacy-text'
const patternStyle = { backgroundImage: `url(${patternImage})`, backgroundRepeat: 'repeat' }

export default function IeltsPage() {
  usePageTitle('IELTS Preparation')
  const { whatIs, why, structure, whyTake } = ieltsCopy

  return (
    <div className="legacy-page">
      <LegacyBanner
        title="Achieve Your Target IELTS Score with Expert Guidance"
        image={bannerImage}
        crumbs={[{ label: 'Test Prep' }, { label: 'IELTS' }]}
      />

      <section className="py-12 md:py-20" style={patternStyle}>
        <div className="legacy-container">
          <Reveal className="mx-auto max-w-5xl space-y-4 text-center">
            <h2 className="py-4 legacy-h2 font-bold">{whatIs.heading}</h2>
            {whatIs.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="py-12 md:py-16" style={patternStyle}>
        <div className="legacy-container">
          <div className="grid items-center gap-10 rounded-3xl bg-legacy-soft px-6 py-12 lg:grid-cols-[1fr_0.8fr] lg:px-16">
            <Reveal>
              <p className="inline-block rounded-full bg-legacy px-3 py-0.5 text-white">
                {why.badge}
              </p>
              <h2 className="mt-3 mb-4 text-[28px] leading-tight font-semibold md:text-[40px]">
                {why.heading}
              </h2>
              <p className="text-xl">{why.intro}</p>
              <ul className="my-10 space-y-3 text-xl">
                {why.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-legacy" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={whyImage}
                alt="EuroRank IELTS students"
                loading="lazy"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-legacy-tint py-12 md:py-20">
        <div className="legacy-container">
          <h2 className="mb-6 legacy-h2 text-legacy">{structure.heading}</h2>
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
            {structure.modules.map((m) => (
              <div key={m.title}>
                <h3 className="mb-4 text-2xl font-semibold">{m.title}</h3>
                <ul className={bullets}>
                  {m.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="legacy-container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="py-4 legacy-h2 lg:pr-12">{whyTake.heading}</h2>
            <div className="space-y-4">
              {whyTake.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <img
            src={ieltsImage}
            alt="IELTS test preparation"
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
      </section>

      <LegacyReviews category="ielts" subtitle={ieltsCopy.reviewsSubtitle} />
      <LegacyFaq category="ielts" subtitle={ieltsCopy.faqSubtitle} />
    </div>
  )
}
