import { useQuery } from '@tanstack/react-query'
import { testimonialsApi } from './api'
import type { TestimonialFilters } from './types'

export const testimonialKeys = {
  all: ['testimonials'] as const,
  list: ({ category, featured, limit }: TestimonialFilters = {}) =>
    [
      ...testimonialKeys.all,
      {
        category: category?.length ? [...category].sort() : null,
        featured: featured ?? false,
        limit: limit ?? null,
      },
    ] as const,
  successStories: (limit?: number) => ['success-stories', { limit: limit ?? null }] as const,
}

/** Website content changes rarely, so cache for 10 minutes. */
const STALE_TIME = 10 * 60_000

/** Active testimonials in display order, optionally filtered by category / featured. */
export function useTestimonials(filters: TestimonialFilters = {}) {
  return useQuery({
    queryKey: testimonialKeys.list(filters),
    queryFn: () => testimonialsApi.list(filters),
    staleTime: STALE_TIME,
  })
}

/** Student portraits for the success-stories wall. */
export function useSuccessStories({ limit }: { limit?: number } = {}) {
  return useQuery({
    queryKey: testimonialKeys.successStories(limit),
    queryFn: () => testimonialsApi.successStories(limit ? { limit } : {}),
    staleTime: STALE_TIME,
  })
}
