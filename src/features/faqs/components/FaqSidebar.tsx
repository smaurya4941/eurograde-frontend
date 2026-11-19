import { ContactPromoCard, Reveal, SidebarLinkCard } from '@/components/marketing'
import { faqSidebarCopy as copy, type FaqTopic } from '../data/topics'

/** "Other Topics" card: jump links to each question group on the page. */
export function FaqTopicNav({ topics, className }: { topics: FaqTopic[]; className?: string }) {
  return (
    <Reveal variant="fade-right" className={className}>
      <SidebarLinkCard
        title={copy.topicsTitle}
        links={topics.map((t) => ({ label: t.label, href: `#${t.id}` }))}
      />
    </Reveal>
  )
}

/** "Contact Us Today!" photo card with a call button. */
export function FaqContactCard({ className }: { className?: string }) {
  return (
    <Reveal variant="fade-right" delay={150} className={className}>
      <ContactPromoCard title={copy.contactTitle} text={copy.contactText} />
    </Reveal>
  )
}
