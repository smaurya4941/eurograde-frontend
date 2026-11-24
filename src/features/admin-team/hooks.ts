import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { teamKeys } from '@/features/team'
import { adminTeamApi } from './api'
import type { TeamMemberSubmission } from './schemas'
import type { AdminTeamMemberListParams } from './types'

export const adminTeamKeys = {
  all: ['admin-team-members'] as const,
  list: (params: AdminTeamMemberListParams) => [...adminTeamKeys.all, 'list', params] as const,
  detail: (id: number) => [...adminTeamKeys.all, 'detail', id] as const,
}

export function useAdminTeamMembers(params: AdminTeamMemberListParams) {
  return useQuery({
    queryKey: adminTeamKeys.list(params),
    queryFn: () => adminTeamApi.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useAdminTeamMember(id: number) {
  return useQuery({
    queryKey: adminTeamKeys.detail(id),
    queryFn: () => adminTeamApi.show(id),
    enabled: id > 0,
  })
}

function invalidateTeam(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: adminTeamKeys.all }),
    // Keeps the public team page in sync if it is already cached in this session.
    queryClient.invalidateQueries({ queryKey: teamKeys.all }),
  ])
}

export function useCreateAdminTeamMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: TeamMemberSubmission) => adminTeamApi.create(input),
    onSuccess: () => invalidateTeam(queryClient),
  })
}

export function useUpdateAdminTeamMember(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: TeamMemberSubmission) => adminTeamApi.update(id, input),
    onSuccess: () => invalidateTeam(queryClient),
  })
}

export function useDeleteAdminTeamMember() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminTeamApi.remove(id),
    onSuccess: () => invalidateTeam(queryClient),
  })
}
