import type { FaqCategory } from '@/features/faqs'

/** Mirrors App\Http\Resources\V1\ServiceResource. */
export interface Service {
  id: number
  slug: string
  title: string
  excerpt: string
  icon_url: string | null
  image_url: string | null
  country: { slug: string; name: string } | null
}

/** Mirrors App\Http\Resources\V1\ServiceDetailResource. */
export interface ServiceDetail {
  id: number
  slug: string
  title: string
  excerpt: string
  image_url: string | null
  /** Photo behind the page banner; null uses the default banner. */
  banner_image_url: string | null
  /** Paragraphs separated by a blank line. */
  overview: string | null
  offer: {
    title: string | null
    /** Part of `title` shown in brand blue. */
    highlight: string | null
    intro: string | null
    features: string[]
    images: { url: string | null; alt: string }[]
  }
  why: {
    title: string | null
    highlight: string | null
    intro: string | null
    outro: string | null
    /** Progress bars; `value` is a percentage (0–100). */
    metrics: { label: string; value: number }[]
  }
  faq_category: FaqCategory | null
  faq_intro: string | null
  country: { slug: string; name: string } | null
  meta: { title: string; description: string }
}
