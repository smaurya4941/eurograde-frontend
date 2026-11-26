import { useEffect, useState } from 'react'
import { LegacyBanner, LegacyFaq } from '@/components/legacy'
import { ContentError, Skeleton } from '@/components/marketing'
import { usePageTitle } from '@/hooks/usePageTitle'
import { cn } from '@/lib/cn'
import { paths } from '@/app/router/paths'
import { useCountry } from '../../hooks'
import { legacyCountryConfig, legacyTabs, type LegacyCountrySlug } from './countryPageData'
import {
  CitiesSection,
  CostOfLivingSection,
  FastFactsSection,
  UniversitiesSection,
  VisaSection,
  WorkSection,
} from './LegacyCountrySections'

/** Sticky pill tab strip; scrolls to the section anchors and highlights the one in view. */
function SectionTabs() {
  const [active, setActive] = useState<string>(legacyTabs[0].id)

  useEffect(() => {
    const onScroll = () => {
      // The last section whose top has passed the strip is the active one.
      let current: string = legacyTabs[0].id
      for (const tab of legacyTabs) {
        const el = document.getElementById(tab.id)
        if (el && el.getBoundingClientRect().top <= 220) current = tab.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Page sections"
      className="sticky top-[76px] z-30 overflow-x-auto bg-legacy-soft py-4 lg:top-[90px] lg:py-6"
    >
      <ul className="legacy-container flex min-w-[675px] justify-between text-center lg:max-w-[990px] lg:min-w-0">
        {legacyTabs.map((tab) => (
          <li key={tab.id}>
            <a
              href={`#${tab.id}`}
              aria-current={active === tab.id ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth' })
                setActive(tab.id)
              }}
              className={cn(
                'inline-block rounded-full px-4 py-3.5 text-sm text-[#1a1a1a] no-underline transition-colors hover:bg-legacy hover:text-white lg:px-4 lg:py-4 lg:text-base',
                active === tab.id && 'bg-legacy font-semibold text-white',
              )}
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function CountryBodySkeleton() {
  return (
    <div className="legacy-container space-y-6 py-16" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-10 w-1/2" />
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  )
}

/** Old-design "Study in {Country}" page, shared by Germany and Italy. */
export function LegacyCountryPage({ slug }: { slug: LegacyCountrySlug }) {
  const config = legacyCountryConfig[slug]
  const { data: country, isPending, isError, refetch } = useCountry(slug)
  usePageTitle(`Study in ${config.name}`)

  return (
    <div className="legacy-page">
      <LegacyBanner
        title={`Study in ${config.name}`}
        image={config.banner}
        crumbs={[{ label: 'Country', href: paths.countries }, { label: config.name }]}
      />
      <SectionTabs />

      {isPending && <CountryBodySkeleton />}
      {isError && (
        <div className="legacy-container py-16">
          <ContentError what={`${config.name} study guide`} onRetry={() => void refetch()} />
        </div>
      )}

      {country && (
        <>
          <FastFactsSection country={country} config={config} />
          <CitiesSection country={country} config={config} />
          <UniversitiesSection slug={slug} config={config} />
          <VisaSection country={country} config={config} />
          <CostOfLivingSection country={country} config={config} />
          <WorkSection country={country} config={config} />
          <div id="faqs" className="scroll-mt-40 lg:scroll-mt-48">
            <LegacyFaq category={slug} subtitle={config.faqSubtitle} />
          </div>
        </>
      )}
    </div>
  )
}
