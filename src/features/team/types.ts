import type { SocialNetwork } from '@/config/site'

/** Mirrors App\Http\Resources\V1\TeamMemberResource. */
export interface SocialLink {
  network: SocialNetwork
  url: string
}

export interface TeamMember {
  id: number
  slug: string
  name: string
  role: string
  bio: string | null
  photo_url: string | null
  socials: SocialLink[]
}
