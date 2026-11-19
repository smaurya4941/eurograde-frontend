/**
 * "Save my name, email, and website in this browser for the next time I comment."
 * Stored only in this browser. Storage can be unavailable (private mode, blocked
 * site data), so every access is guarded and failures are ignored.
 */
const STORAGE_KEY = 'eurograde:comment-author'

export interface SavedCommentAuthor {
  author_name: string
  author_email: string
  author_website: string
}

export function loadCommentAuthor(): SavedCommentAuthor | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const value: unknown = JSON.parse(raw)
    if (typeof value !== 'object' || value === null) return null
    const { author_name, author_email, author_website } = value as Record<string, unknown>
    return {
      author_name: typeof author_name === 'string' ? author_name : '',
      author_email: typeof author_email === 'string' ? author_email : '',
      author_website: typeof author_website === 'string' ? author_website : '',
    }
  } catch {
    return null
  }
}

export function saveCommentAuthor(author: SavedCommentAuthor | null): void {
  try {
    if (author) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(author))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable: the form still works, it just won't be pre-filled next time.
  }
}
