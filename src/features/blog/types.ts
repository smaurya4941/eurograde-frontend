import type { TeamMember } from '@/features/team'

/** Mirrors App\Http\Resources\V1\PostCategoryResource. */
export interface PostCategory {
  id: number
  name: string
  slug: string
  /** Number of published posts (present on the categories endpoint). */
  posts_count?: number
}

/** Mirrors App\Http\Resources\V1\TagResource. */
export interface PostTag {
  id: number
  name: string
  slug: string
}

/** Mirrors App\Http\Resources\V1\PostResource (card data, no body). */
export interface PostSummary {
  id: number
  slug: string
  title: string
  category: PostCategory | null
  excerpt: string
  image_url: string | null
  /** ISO-8601 timestamp. */
  published_at: string | null
}

/** Mirrors App\Http\Resources\V1\PostDetailResource. */
export interface PostDetail extends PostSummary {
  /** Article HTML, sanitised by the API before it is stored. */
  body: string | null
  tags: PostTag[]
  /** The team member who wrote the article. */
  author: TeamMember | null
}

/** Mirrors App\Http\Resources\V1\PostCommentResource. */
export interface PostComment {
  id: number
  parent_id: number | null
  author_name: string
  author_website: string | null
  body: string
  status: 'approved' | 'pending'
  /** ISO-8601 timestamp. */
  created_at: string | null
  replies: PostComment[]
}

/** Query parameters accepted by `GET /api/v1/posts`. */
export interface PostListParams {
  page?: number
  perPage?: number
  /** Category slug. */
  category?: string
  /** Tag slug. */
  tag?: string
  search?: string
}
