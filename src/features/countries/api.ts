import { api } from '@/lib/api/client'
import type { Country, CountryDetail } from './types'

export const countriesApi = {
  list: async () => (await api.get<Country[]>('/countries')).data,
  show: async (slug: string) =>
    (await api.get<CountryDetail>(`/countries/${encodeURIComponent(slug)}`)).data,
}
