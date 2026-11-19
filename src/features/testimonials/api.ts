import { api } from '@/lib/api/client'
import type { SuccessStory, Testimonial, TestimonialFilters } from './types'

export const testimonialsApi = {
  /** GET /testimonials?category[]=…&featured=1&limit=… */
  list: async ({ category, featured, limit }: TestimonialFilters = {}) =>
    (
      await api.get<Testimonial[]>('/testimonials', {
        params: {
          ...(category?.length ? { category } : {}),
          ...(featured ? { featured: 1 } : {}),
          ...(limit ? { limit } : {}),
        },
      })
    ).data,

  successStories: async (params: { limit?: number } = {}) =>
    (await api.get<SuccessStory[]>('/success-stories', { params })).data,
}
