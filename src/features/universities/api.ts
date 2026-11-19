import { api } from '@/lib/api/client'
import type { University, UniversityFilters } from './types'

export const universitiesApi = {
  list: async ({ country, partners, limit }: UniversityFilters = {}) =>
    (
      await api.get<University[]>('/universities', {
        params: {
          ...(country ? { country } : {}),
          ...(partners ? { partners: 1 } : {}),
          ...(limit ? { limit } : {}),
        },
      })
    ).data,
}
