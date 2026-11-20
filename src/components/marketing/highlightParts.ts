import type { HeadingPart } from './AnimatedHeading'

/**
 * Splits a heading into parts with `highlight` (a substring of `title`, as stored in the CMS)
 * marked for the brand-blue accent, e.g. ("Why Choose Our Services", "Our Services").
 */
export function highlightParts(title: string, highlight?: string | null): HeadingPart[] {
  const at = highlight ? title.indexOf(highlight) : -1
  if (!highlight || at === -1) return [{ text: title }]

  const parts: HeadingPart[] = []
  if (at > 0) parts.push({ text: title.slice(0, at) })
  parts.push({ text: highlight, highlight: true })
  const rest = title.slice(at + highlight.length)
  if (rest) parts.push({ text: rest })
  return parts
}
