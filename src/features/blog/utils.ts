import { paths } from '@/app/router/paths'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

/** "June 18, 2026" from an ISO timestamp; empty string for unpublished posts. */
export function formatPostDate(iso: string | null): string {
  return iso ? dateFormatter.format(new Date(iso)) : ''
}

/** Link to a single article. */
export function blogPostHref(slug: string): string {
  return `${paths.blog}/${slug}`
}

/** Link to the blog listing filtered by a category slug. */
export function blogCategoryHref(slug: string): string {
  return `${paths.blog}?category=${encodeURIComponent(slug)}`
}

/** Link to the blog listing filtered by a tag slug. */
export function blogTagHref(slug: string): string {
  return `${paths.blog}?tag=${encodeURIComponent(slug)}`
}

/** "visa-approval" → "Visa Approval" (labels for filters that only know the slug). */
export function humanizeSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

/** "June 18, 2026 at 1:18 PM" (in the reader's time zone). */
export function formatCommentDate(iso: string): string {
  const date = new Date(iso)
  return `${dateFormatter.format(date)} at ${timeFormatter.format(date)}`
}
