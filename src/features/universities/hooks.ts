import { useQuery } from '@tanstack/react-query'
import { universitiesApi } from './api'
import type { UniversityFilters } from './types'

export const universityKeys = {
  all: ['universities'] as const,
  list: ({ country, partners, limit }: UniversityFilters = {}) =>
    [
      ...universityKeys.all,
      { country: country ?? null, partners: partners ?? false, limit: limit ?? null },
    ] as const,
}

/** Active universities, optionally for one country / partners only. */
export function useUniversities(filters: UniversityFilters = {}) {
  return useQuery({
    queryKey: universityKeys.list(filters),
    queryFn: () => universitiesApi.list(filters),
    staleTime: 10 * 60_000,
  })
}
