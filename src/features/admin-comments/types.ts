export type CommentStatus = 'pending' | 'approved' | 'spam'

/** Mirrors App\Http\Resources\V1\Admin\AdminPostCommentResource. */
export interface AdminComment {
  id: number
  post: { id: number; title: string; slug: string }
  parent_id: number | null
  author_name: string
  author_email: string
  author_website: string | null
  body: string
  status: CommentStatus
  created_at: string | null
}

export interface AdminCommentListParams {
  page?: number
  perPage?: number
  status?: CommentStatus
}
