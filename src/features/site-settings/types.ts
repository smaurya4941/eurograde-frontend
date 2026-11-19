import type { SocialNetwork } from '@/config/site'

/** Mirrors App\Http\Resources\V1\SiteSettingsResource. */
export interface SiteSettings {
  contact: {
    phone: string | null
    phone_href: string | null
    email: string | null
    address: string | null
    hours: string | null
    map_embed_url: string | null
  }
  socials: { network: SocialNetwork; url: string }[]
  stats: SiteStat[]
}

export interface SiteStat {
  /** Stable identifier, e.g. "counselors", "students", "universities". */
  key: string
  label: string
  value: number
  suffix: string | null
}

/** Contact details in the shape components use (all fields always present). */
export interface ContactInfo {
  phone: string
  phoneHref: string
  email: string
  emailHref: string
  address: string
  hours: string
  /** Google Maps embed URL; derived from the address unless set explicitly. */
  mapEmbedUrl: string
}
