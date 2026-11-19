/** Mirrors App\Http\Resources\V1\ServiceResource. */
export interface Service {
  id: number
  slug: string
  title: string
  excerpt: string
  icon_url: string | null
  image_url: string | null
  country: { slug: string; name: string } | null
}
