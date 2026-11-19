/** Mirrors App\Enums\TestimonialCategory. */
export type TestimonialCategory = 'admissions' | 'ielts' | 'german' | 'italian'

/** Mirrors App\Http\Resources\V1\TestimonialResource. */
export interface Testimonial {
  id: number
  slug: string
  name: string
  avatar_url: string | null
  category: TestimonialCategory
  /** e.g. "Master’s Student", "IELTS Preparation". */
  program: string
  origin: string | null
  destination: string | null
  /** e.g. "Band 8", "B1 Level"; used when there is no origin → destination. */
  achievement: string | null
  quote: string
  rating: number
  /** "Case overview" tags (featured case studies only). */
  highlights: string[]
  is_featured: boolean
}

/** Mirrors App\Http\Resources\V1\SuccessStoryResource. */
export interface SuccessStory {
  id: number
  slug: string
  name: string
  /** e.g. "Munich, Germany". */
  destination: string
  photo_url: string | null
}

export interface TestimonialFilters {
  category?: TestimonialCategory[]
  featured?: boolean
  limit?: number
}
