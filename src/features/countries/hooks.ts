import { useQuery } from '@tanstack/react-query'
import { countriesApi } from './api'

export const countryKeys = {
  all: ['countries'] as const,
  list: () => [...countryKeys.all, 'list'] as const,
  detail: (slug: string) => [...countryKeys.all, 'detail', slug] as const,
}

/** Website content changes rarely, so cache for 10 minutes. */
const STALE_TIME = 10 * 60_000

/** Active study destinations for the listing cards. */
export function useCountries() {
  return useQuery({
    queryKey: countryKeys.list(),
    queryFn: countriesApi.list,
    staleTime: STALE_TIME,
  })
}

/** One destination with its full detail content. */
export function useCountry(slug: string) {
  return useQuery({
    queryKey: countryKeys.detail(slug),
    queryFn: () => countriesApi.show(slug),
    staleTime: STALE_TIME,
    enabled: slug !== '',
  })
}
