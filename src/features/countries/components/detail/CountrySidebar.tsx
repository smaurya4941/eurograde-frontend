import { ContactPromoCard, Reveal, SidebarLinkCard } from '@/components/marketing'
import { useCountries } from '../../hooks'
import { countryHref } from '../../utils'

/** "Other Countries" links (current one highlighted) + contact card. */
export function CountrySidebar({ currentSlug }: { currentSlug: string }) {
  const { data: countries } = useCountries()

  return (
    <div className="space-y-[15px]">
      {countries && countries.length > 0 && (
        <Reveal variant="fade-right">
          <SidebarLinkCard
            title="Other Countries"
            links={countries.map((c) => ({
              label: c.name,
              href: countryHref(c.slug),
              current: c.slug === currentSlug,
            }))}
          />
        </Reveal>
      )}
      <Reveal variant="fade-right" delay={150}>
        <ContactPromoCard />
      </Reveal>
    </div>
  )
}
