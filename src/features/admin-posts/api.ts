import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { PostSubmission } from './schemas'
import type { AdminPost, AdminPostListParams } from './types'

export interface AdminPostPage {
  posts: AdminPost[]
  meta: PaginationMeta
}

function toFormData(input: PostSubmission): FormData {
  const form = new FormData()
  form.append('title', input.title)
  if (input.slug) form.append('slug', input.slug)
  form.append('post_category_id', String(input.post_category_id))
  if (input.author_id) form.append('author_id', String(input.author_id))
  form.append('excerpt', input.excerpt)
  if (input.body) form.append('body', input.body)
  if (input.meta_title) form.append('meta_title', input.meta_title)
  if (input.meta_description) form.append('meta_description', input.meta_description)
  if (input.published_at) form.append('published_at', input.published_at)
  if (input.image) form.append('image', input.image)
  // Always sent, even when empty: a multipart request has no way to represent an empty
  // array, so the server uses this marker to tell "cleared" apart from "left unchanged".
  form.append('tags_provided', '1')
  input.tagIds.forEach((id, index) => form.append(`tags[${index}]`, String(id)))

  return form
}

export const adminPostsApi = {
  list: async ({ page = 1, perPage = 15 }: AdminPostListParams = {}): Promise<AdminPostPage> => {
    const response = await api.get<AdminPost[]>('/admin/posts', {
      params: { page, per_page: perPage },
    })
    return { posts: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  show: async (id: number) => (await api.get<AdminPost>(`/admin/posts/${id}`)).data,

  create: async (input: PostSubmission) =>
    (await api.post<AdminPost>('/admin/posts', toFormData(input))).data,

  update: async (id: number, input: PostSubmission) => {
    const form = toFormData(input)
    form.append('_method', 'PUT')
    return (await api.post<AdminPost>(`/admin/posts/${id}`, form)).data
  },

  remove: async (id: number) => {
    await api.delete<null>(`/admin/posts/${id}`)
  },
}
