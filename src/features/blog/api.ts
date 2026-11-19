import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { CommentInput } from './schemas'
import type { PostCategory, PostComment, PostDetail, PostListParams, PostSummary } from './types'

export interface PostPage {
  posts: PostSummary[]
  meta: PaginationMeta
}

export interface CommentThread {
  comments: PostComment[]
  /** All visible comments, replies included. */
  total: number
}

export interface CommentSubmission {
  message: string
  /** Present only when the comment went live immediately (moderation off). */
  comment: PostComment | null
}

export type NewComment = Omit<CommentInput, 'remember'> & { parent_id: number | null }

export const blogApi = {
  list: async ({
    page = 1,
    perPage,
    category,
    tag,
    search,
  }: PostListParams = {}): Promise<PostPage> => {
    const response = await api.get<PostSummary[]>('/posts', {
      params: {
        page,
        per_page: perPage,
        category: category || undefined,
        tag: tag || undefined,
        search: search?.trim() || undefined,
      },
    })
    return { posts: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  show: async (slug: string) =>
    (await api.get<PostDetail>(`/posts/${encodeURIComponent(slug)}`)).data,

  comments: async (slug: string): Promise<CommentThread> => {
    const response = await api.get<PostComment[]>(`/posts/${encodeURIComponent(slug)}/comments`)
    return { comments: response.data, total: Number(response.meta?.total ?? 0) }
  },

  submitComment: async (slug: string, input: NewComment): Promise<CommentSubmission> => {
    const response = await api.post<PostComment | undefined>(
      `/posts/${encodeURIComponent(slug)}/comments`,
      { ...input, author_website: input.author_website || null },
    )
    return {
      message: response.message ?? 'Thanks for your comment!',
      comment: response.data ?? null,
    }
  },

  categories: async () => (await api.get<PostCategory[]>('/post-categories')).data,
}
