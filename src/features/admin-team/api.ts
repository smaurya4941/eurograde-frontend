import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { TeamMemberSubmission } from './schemas'
import type { AdminTeamMember, AdminTeamMemberListParams } from './types'

export interface AdminTeamMemberPage {
  teamMembers: AdminTeamMember[]
  meta: PaginationMeta
}

function toFormData(input: TeamMemberSubmission): FormData {
  const form = new FormData()
  form.append('name', input.name)
  if (input.slug) form.append('slug', input.slug)
  form.append('role', input.role)
  if (input.bio) form.append('bio', input.bio)
  // Always sent, even when empty: a multipart request has no way to represent an empty
  // array, so the server uses this marker to tell "cleared" apart from "left unchanged".
  form.append('socials_provided', '1')
  input.socials.forEach((social, index) => {
    form.append(`socials[${index}][network]`, social.network)
    form.append(`socials[${index}][url]`, social.url)
  })
  form.append('sort_order', String(input.sort_order))
  form.append('is_active', input.is_active ? '1' : '0')
  if (input.photo) form.append('photo', input.photo)

  return form
}

export const adminTeamApi = {
  list: async ({
    page = 1,
    perPage = 15,
  }: AdminTeamMemberListParams = {}): Promise<AdminTeamMemberPage> => {
    const response = await api.get<AdminTeamMember[]>('/admin/team-members', {
      params: { page, per_page: perPage },
    })
    return { teamMembers: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  show: async (id: number) => (await api.get<AdminTeamMember>(`/admin/team-members/${id}`)).data,

  create: async (input: TeamMemberSubmission) =>
    (await api.post<AdminTeamMember>('/admin/team-members', toFormData(input))).data,

  update: async (id: number, input: TeamMemberSubmission) => {
    const form = toFormData(input)
    form.append('_method', 'PUT')
    return (await api.post<AdminTeamMember>(`/admin/team-members/${id}`, form)).data
  },

  remove: async (id: number) => {
    await api.delete<null>(`/admin/team-members/${id}`)
  },
}
