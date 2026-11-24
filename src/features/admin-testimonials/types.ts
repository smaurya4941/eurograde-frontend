/** Mirrors App\Enums\TestimonialCategory. */
export type TestimonialCategory = 'admissions' | 'ielts' | 'german' | 'italian'

export const testimonialCategoryLabels: Record<TestimonialCategory, string> = {
  admissions: 'Admissions',
  ielts: 'IELTS',
  german: 'German Language',
  italian: 'Italian Language',
}

/** Mirrors App\Http\Resources\V1\Admin\AdminTestimonialResource. */
export interface AdminTestimonial {
  id: number
  name: string
  slug: string
  avatar_url: string | null
  category: TestimonialCategory
  program: string
  origin: string | null
  destination: string | null
  achievement: string | null
  quote: string
  rating: number
  highlights: string[]
  is_featured: boolean
  sort_order: number
  is_active: boolean
  created_at: string | null
  updated_at: string | null
}

export interface AdminTestimonialListParams {
  page?: number
  perPage?: number
}
