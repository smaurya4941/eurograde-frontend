/** Mirrors App\Http\Resources\V1\UniversityResource. */
export interface University {
  id: number
  slug: string
  name: string
  city: string | null
  type: 'public' | 'private'
  logo_url: string | null
  website_url: string | null
  is_partner: boolean
  country: { slug: string; name: string }
}

export interface UniversityFilters {
  /** Country slug, e.g. "germany". */
  country?: string
  partners?: boolean
  limit?: number
}
