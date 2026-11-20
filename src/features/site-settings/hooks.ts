import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { socialLabels, type SocialLink } from '@/config/site'
import { siteSettingsApi } from './api'
import { fallbackSiteSettings } from './fallback'
import type { ContactInfo, SiteStat } from './types'

export const siteSettingsKeys = {
  all: ['site-settings'] as const,
}

/**
 * Site-wide settings (contact, socials, stats). Always returns data: the bundled
 * fallback is used as placeholder until the API responds.
 */
export function useSiteSettings() {
  const { data } = useQuery({
    queryKey: siteSettingsKeys.all,
    queryFn: siteSettingsApi.get,
    staleTime: 30 * 60_000,
    placeholderData: fallbackSiteSettings,
  })
  return data ?? fallbackSiteSettings
}

function mapsEmbedUrl(address: string): string {
  return `https://maps.google.com/maps?${new URLSearchParams({
    q: address,
    t: 'm',
    z: '14',
    output: 'embed',
    iwloc: 'near',
  })}`
}

/** Office contact details (empty API fields fall back to the bundled values). */
export function useContact(): ContactInfo {
  const { contact } = useSiteSettings()

  return useMemo(() => {
    const fb = fallbackSiteSettings.contact
    const phone = contact.phone || fb.phone || ''
    const email = contact.email || fb.email || ''
    const address = contact.address || fb.address || ''
    const phoneAlt = contact.phone_alt || fb.phone_alt || ''

    return {
      phone,
      phoneHref: contact.phone_href || `tel:${phone.replace(/[^\d+]/g, '')}`,
      phoneAlt,
      phoneAltHref: phoneAlt
        ? contact.phone_alt_href || `tel:${phoneAlt.replace(/[^\d+]/g, '')}`
        : '',
      email,
      emailHref: `mailto:${email}`,
      address,
      hours: contact.hours || fb.hours || '',
      hoursWeekend: contact.hours_weekend || fb.hours_weekend || '',
      mapEmbedUrl: contact.map_embed_url || mapsEmbedUrl(address),
    }
  }, [contact])
}

/** Our social media profiles, in display order. */
export function useSocials(): SocialLink[] {
  const { socials } = useSiteSettings()

  return useMemo(
    () =>
      socials
        .filter((s) => s.network in socialLabels)
        .map((s) => ({ network: s.network, label: socialLabels[s.network], href: s.url })),
    [socials],
  )
}

/** All active headline stats, in display order. */
export function useStats(): SiteStat[] {
  return useSiteSettings().stats
}

/** One headline stat by key, falling back to the bundled value. */
export function useStat(key: string): SiteStat | undefined {
  const { stats } = useSiteSettings()
  return stats.find((s) => s.key === key) ?? fallbackSiteSettings.stats.find((s) => s.key === key)
}
