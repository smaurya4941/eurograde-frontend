import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminTagsApi } from './api'
import type { TagFormInput } from './schemas'

export const adminTagKeys = {
  all: ['admin-tags'] as const,
}

/** Also used by the post form's tag checklist. */
export function useAdminTags() {
  return useQuery({
    queryKey: adminTagKeys.all,
    queryFn: adminTagsApi.list,
  })
}

export function useCreateAdminTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: TagFormInput) => adminTagsApi.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminTagKeys.all }),
  })
}

export function useUpdateAdminTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: TagFormInput }) =>
      adminTagsApi.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminTagKeys.all }),
  })
}

export function useDeleteAdminTag() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminTagsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminTagKeys.all }),
  })
}
