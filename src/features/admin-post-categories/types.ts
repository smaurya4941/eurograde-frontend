/** Mirrors App\Http\Resources\V1\PostCategoryResource (admin index counts posts). */
export interface AdminPostCategory {
  id: number
  name: string
  slug: string
  posts_count?: number
}
