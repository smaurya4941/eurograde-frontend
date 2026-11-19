import { contact, socials } from '@/config/site'
import type { SiteSettings } from './types'

/**
 * Shown until `GET /site-settings` answers (and for any field it leaves empty),
 * so the header/footer never render blank or shift once the request completes.
 */
export const fallbackSiteSettings: SiteSettings = {
  contact: {
    phone: contact.phone,
    phone_href: contact.phoneHref,
    email: contact.email,
    address: contact.address,
    hours: contact.hours,
    map_embed_url: null,
  },
  socials: socials.map((s) => ({ network: s.network, url: s.href })),
  stats: [
    { key: 'counselors', label: 'Expert Counselors', value: 80, suffix: '+' },
    { key: 'students', label: 'Students Studying Abroad', value: 300, suffix: '+' },
    { key: 'universities', label: 'Global Partner Universities', value: 50, suffix: '+' },
  ],
}
