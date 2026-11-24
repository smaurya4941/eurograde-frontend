/** Mirrors App\Http\Resources\V1\TagResource (admin index counts posts). */
export interface AdminTag {
  id: number
  name: string
  slug: string
  posts_count?: number
}
