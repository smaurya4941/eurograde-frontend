import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { TestimonialSubmission } from './schemas'
import type { AdminTestimonial, AdminTestimonialListParams } from './types'

export interface AdminTestimonialPage {
  testimonials: AdminTestimonial[]
  meta: PaginationMeta
}

function toFormData(input: TestimonialSubmission): FormData {
  const form = new FormData()
  form.append('name', input.name)
  if (input.slug) form.append('slug', input.slug)
  form.append('category', input.category)
  form.append('program', input.program)
  if (input.origin) form.append('origin', input.origin)
  if (input.destination) form.append('destination', input.destination)
  if (input.achievement) form.append('achievement', input.achievement)
  form.append('quote', input.quote)
  form.append('rating', String(input.rating))
  for (const highlight of (input.highlights ?? '')
    .split(',')
    .map((h) => h.trim())
    .filter(Boolean)) {
    form.append('highlights[]', highlight)
  }
  form.append('is_featured', input.is_featured ? '1' : '0')
  form.append('sort_order', String(input.sort_order))
  form.append('is_active', input.is_active ? '1' : '0')
  if (input.avatar) form.append('avatar', input.avatar)

  return form
}

export const adminTestimonialsApi = {
  list: async ({
    page = 1,
    perPage = 15,
  }: AdminTestimonialListParams = {}): Promise<AdminTestimonialPage> => {
    const response = await api.get<AdminTestimonial[]>('/admin/testimonials', {
      params: { page, per_page: perPage },
    })
    return { testimonials: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  show: async (id: number) => (await api.get<AdminTestimonial>(`/admin/testimonials/${id}`)).data,

  create: async (input: TestimonialSubmission) =>
    (await api.post<AdminTestimonial>('/admin/testimonials', toFormData(input))).data,

  update: async (id: number, input: TestimonialSubmission) => {
    const form = toFormData(input)
    form.append('_method', 'PUT')
    return (await api.post<AdminTestimonial>(`/admin/testimonials/${id}`, form)).data
  },

  remove: async (id: number) => {
    await api.delete<null>(`/admin/testimonials/${id}`)
  },
}
