import { api } from '@/lib/api/client'
import type { TagFormInput } from './schemas'
import type { AdminTag } from './types'

export const adminTagsApi = {
  list: async () => (await api.get<AdminTag[]>('/admin/tags')).data,

  create: async (input: TagFormInput) => (await api.post<AdminTag>('/admin/tags', input)).data,

  update: async (id: number, input: TagFormInput) =>
    (await api.put<AdminTag>(`/admin/tags/${id}`, input)).data,

  remove: async (id: number) => {
    await api.delete<null>(`/admin/tags/${id}`)
  },
}
