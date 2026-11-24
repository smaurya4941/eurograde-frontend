import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { AdminComment, AdminCommentListParams, CommentStatus } from './types'

export interface AdminCommentPage {
  comments: AdminComment[]
  meta: PaginationMeta
}

export const adminCommentsApi = {
  list: async ({
    page = 1,
    perPage = 20,
    status,
  }: AdminCommentListParams = {}): Promise<AdminCommentPage> => {
    const response = await api.get<AdminComment[]>('/admin/comments', {
      params: { page, per_page: perPage, status },
    })
    return { comments: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  updateStatus: async (id: number, status: CommentStatus) =>
    (await api.patch<AdminComment>(`/admin/comments/${id}`, { status })).data,

  remove: async (id: number) => {
    await api.delete<null>(`/admin/comments/${id}`)
  },
}
