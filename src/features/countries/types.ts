import type { FaqCategory } from '@/features/faqs'

/** A label/value fact, e.g. "Tuition Fee (Yearly)" → "$1,500 (Public)". */
export interface CountryFact {
  label: string
  value: string
}

/** Mirrors App\Http\Resources\V1\CountryResource (listing card). */
export interface Country {
  id: number
  slug: string
  name: string
  iso_code: string
  flag_url: string | null
  excerpt: string | null
  highlights: CountryFact[]
  requirements_count: number
}

/** Mirrors App\Http\Resources\V1\CountryDetailResource. */
export interface CountryDetail {
  id: number
  slug: string
  name: string
  iso_code: string
  flag_url: string | null
  cover_image_url: string | null
  /** Photo behind the page banner; null uses the default banner. */
  banner_image_url: string | null
  excerpt: string | null
  /** Paragraphs separated by a blank line. */
  overview: string | null
  why_choose: {
    intro: string | null
    image_url: string | null
    reasons: { title: string; description: string }[]
  }
  cities_intro: string | null
  part_time_work: string | null
  post_study_work: string | null
  faq_category: FaqCategory | null
  faq_intro: string | null
  meta: { title: string; description: string | null }
  stats: (CountryFact & { is_highlighted: boolean })[]
  requirements: { title: string; description: string | null }[]
  visas: {
    name: string
    description: string | null
    visa_type: string | null
    fee: string | null
  }[]
  living_costs: { label: string; amount: string }[]
  cities: {
    name: string
    description: string | null
    image_url: string | null
    universities_count: number | null
  }[]
}
