import { useQuery } from '@tanstack/react-query'
import { servicesApi } from './api'

const STALE_TIME = 10 * 60_000

export const serviceKeys = {
  all: ['services'] as const,
  list: () => [...serviceKeys.all, 'list'] as const,
  detail: (slug: string) => [...serviceKeys.all, 'detail', slug] as const,
}

/** Active services in display order. */
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: servicesApi.list,
    staleTime: STALE_TIME,
  })
}

/** One service with its full detail content. */
export function useService(slug: string) {
  return useQuery({
    queryKey: serviceKeys.detail(slug),
    queryFn: () => servicesApi.show(slug),
    staleTime: STALE_TIME,
    enabled: slug !== '',
  })
}
