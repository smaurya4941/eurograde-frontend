import { api } from '@/lib/api/client'
import type { TeamMember } from './types'

export const teamApi = {
  list: async (params: { limit?: number } = {}) =>
    (await api.get<TeamMember[]>('/team-members', { params })).data,
}
