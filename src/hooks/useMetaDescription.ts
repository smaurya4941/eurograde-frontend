import { useEffect } from 'react'

/**
 * Temporarily replaces the page's `<meta name="description">` (from index.html)
 * and restores the site default when the page unmounts.
 */
export function useMetaDescription(description?: string) {
  useEffect(() => {
    if (!description) return

    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!tag) return

    const previous = tag.content
    tag.content = description
    return () => {
      tag.content = previous
    }
  }, [description])
}
