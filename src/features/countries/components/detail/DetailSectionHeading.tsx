import { SectionHeading, type HeadingPart } from '@/components/marketing'

/** Badge + heading + intro used by each section of the country detail page. */
export function DetailSectionHeading({
  badge,
  title,
  intro,
}: {
  badge: string
  title: HeadingPart[]
  intro?: string | null
}) {
  return <SectionHeading badge={badge} title={title} description={intro ?? undefined} />
}
