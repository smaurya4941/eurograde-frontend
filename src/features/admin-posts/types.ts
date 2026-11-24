import type { PostCategory, PostTag } from '@/features/blog'
import type { TeamMember } from '@/features/team'

/** Mirrors App\Http\Resources\V1\Admin\AdminPostResource. */
export interface AdminPost {
  id: number
  title: string
  slug: string
  post_category_id: number
  category: PostCategory | null
  author_id: number | null
  author: TeamMember | null
  excerpt: string
  body: string | null
  tags: PostTag[]
  image_url: string | null
  meta_title: string | null
  meta_description: string | null
  /** ISO-8601 timestamp, or null for a draft. */
  published_at: string | null
  created_at: string | null
  updated_at: string | null
}

export interface AdminPostListParams {
  page?: number
  perPage?: number
}
