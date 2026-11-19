import { paths } from '@/app/router/paths'

/** Link to a country's detail page (optionally to a section, e.g. "requirements"). */
export function countryHref(slug: string, section?: string): string {
  return `${paths.countries}/${slug}${section ? `#${section}` : ''}`
}
