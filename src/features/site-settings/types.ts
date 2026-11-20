import type { SocialNetwork } from '@/config/site'

/** Mirrors App\Http\Resources\V1\SiteSettingsResource. */
export interface SiteSettings {
  contact: {
    phone: string | null
    phone_href: string | null
    /** Second office line. */
    phone_alt: string | null
    phone_alt_href: string | null
    email: string | null
    address: string | null
    hours: string | null
    /** e.g. "Saturday: 9:00 AM – 4:00 PM". */
    hours_weekend: string | null
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
  /** Second office line (empty when not set). */
  phoneAlt: string
  phoneAltHref: string
  email: string
  emailHref: string
  address: string
  hours: string
  /** Weekend opening hours (empty when closed / not set). */
  hoursWeekend: string
  /** Google Maps embed URL; derived from the address unless set explicitly. */
  mapEmbedUrl: string
}
