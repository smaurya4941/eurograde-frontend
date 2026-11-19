import { useQuery } from '@tanstack/react-query'
import { servicesApi } from './api'

export const serviceKeys = {
  all: ['services'] as const,
  list: () => [...serviceKeys.all, 'list'] as const,
}

/** Active services in display order. */
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: servicesApi.list,
    staleTime: 10 * 60_000,
  })
}
