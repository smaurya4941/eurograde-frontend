import type { SocialLink } from '@/features/team'

/** Mirrors App\Http\Resources\V1\Admin\AdminTeamMemberResource. */
export interface AdminTeamMember {
  id: number
  name: string
  slug: string
  role: string
  bio: string | null
  photo_url: string | null
  socials: SocialLink[]
  sort_order: number
  is_active: boolean
  created_at: string | null
  updated_at: string | null
}

export interface AdminTeamMemberListParams {
  page?: number
  perPage?: number
}
