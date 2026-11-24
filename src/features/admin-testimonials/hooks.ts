import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { testimonialKeys } from '@/features/testimonials'
import { adminTestimonialsApi } from './api'
import type { TestimonialSubmission } from './schemas'
import type { AdminTestimonialListParams } from './types'

export const adminTestimonialKeys = {
  all: ['admin-testimonials'] as const,
  list: (params: AdminTestimonialListParams) =>
    [...adminTestimonialKeys.all, 'list', params] as const,
  detail: (id: number) => [...adminTestimonialKeys.all, 'detail', id] as const,
}

export function useAdminTestimonials(params: AdminTestimonialListParams) {
  return useQuery({
    queryKey: adminTestimonialKeys.list(params),
    queryFn: () => adminTestimonialsApi.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useAdminTestimonial(id: number) {
  return useQuery({
    queryKey: adminTestimonialKeys.detail(id),
    queryFn: () => adminTestimonialsApi.show(id),
    enabled: id > 0,
  })
}

function invalidateTestimonials(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: adminTestimonialKeys.all }),
    // Keeps the public testimonials/success-stories pages in sync if they are
    // already cached in this session (they are not reachable from adminTestimonialKeys).
    queryClient.invalidateQueries({ queryKey: testimonialKeys.all }),
  ])
}

export function useCreateAdminTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: TestimonialSubmission) => adminTestimonialsApi.create(input),
    onSuccess: () => invalidateTestimonials(queryClient),
  })
}

export function useUpdateAdminTestimonial(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: TestimonialSubmission) => adminTestimonialsApi.update(id, input),
    onSuccess: () => invalidateTestimonials(queryClient),
  })
}

export function useDeleteAdminTestimonial() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminTestimonialsApi.remove(id),
    onSuccess: () => invalidateTestimonials(queryClient),
  })
}
