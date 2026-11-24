import { api } from '@/lib/api/client'
import type { PostCategoryFormInput } from './schemas'
import type { AdminPostCategory } from './types'

export const adminPostCategoriesApi = {
  list: async () => (await api.get<AdminPostCategory[]>('/admin/post-categories')).data,

  create: async (input: PostCategoryFormInput) =>
    (await api.post<AdminPostCategory>('/admin/post-categories', input)).data,

  update: async (id: number, input: PostCategoryFormInput) =>
    (await api.put<AdminPostCategory>(`/admin/post-categories/${id}`, input)).data,

  remove: async (id: number) => {
    await api.delete<null>(`/admin/post-categories/${id}`)
  },
}
