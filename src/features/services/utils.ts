import { paths } from '@/app/router/paths'

/** Link to a service's detail page. */
export function serviceHref(slug: string): string {
  return `${paths.services}/${slug}`
}

/** Splits CMS text with blank-line-separated paragraphs into a list. */
export function paragraphs(text: string | null): string[] {
  return (text ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}
