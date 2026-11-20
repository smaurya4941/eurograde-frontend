import { ContactPromoCard, Reveal, SidebarLinkCard } from '@/components/marketing'
import { useServices } from '../../hooks'
import { serviceHref } from '../../utils'

/** "Explore Our Services" links (every active service) + contact card. */
export function ServiceSidebar({ currentSlug }: { currentSlug: string }) {
  const { data: services } = useServices()

  return (
    <div className="space-y-[30px]">
      {services && services.length > 0 && (
        <Reveal variant="fade-right">
          <SidebarLinkCard
            title="Explore Our Services"
            highlightCurrent={false}
            links={services.map((s) => ({
              label: s.title,
              href: serviceHref(s.slug),
              current: s.slug === currentSlug,
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
