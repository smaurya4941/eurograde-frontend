import { useQuery } from '@tanstack/react-query'
import { teamApi } from './api'

export const teamKeys = {
  all: ['team-members'] as const,
  list: (limit?: number) => [...teamKeys.all, { limit: limit ?? null }] as const,
}

/** Active team members in display order. Website content changes rarely, so cache for 10 min. */
export function useTeamMembers({ limit }: { limit?: number } = {}) {
  return useQuery({
    queryKey: teamKeys.list(limit),
    queryFn: () => teamApi.list(limit ? { limit } : {}),
    staleTime: 10 * 60_000,
  })
}
