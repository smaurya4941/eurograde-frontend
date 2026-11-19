import { api } from '@/lib/api/client'
import type { SiteSettings } from './types'

export const siteSettingsApi = {
  get: async () => (await api.get<SiteSettings>('/site-settings')).data,
}
