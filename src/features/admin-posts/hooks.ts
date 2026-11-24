import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogKeys } from '@/features/blog'
import { adminPostsApi } from './api'
import type { PostSubmission } from './schemas'
import type { AdminPostListParams } from './types'

export const adminPostKeys = {
  all: ['admin-posts'] as const,
  list: (params: AdminPostListParams) => [...adminPostKeys.all, 'list', params] as const,
  detail: (id: number) => [...adminPostKeys.all, 'detail', id] as const,
}

export function useAdminPosts(params: AdminPostListParams) {
  return useQuery({
    queryKey: adminPostKeys.list(params),
    queryFn: () => adminPostsApi.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useAdminPost(id: number) {
  return useQuery({
    queryKey: adminPostKeys.detail(id),
    queryFn: () => adminPostsApi.show(id),
    enabled: id > 0,
  })
}

function invalidatePosts(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: adminPostKeys.all }),
    // Keeps the public blog list/detail pages in sync if already cached in this session.
    queryClient.invalidateQueries({ queryKey: blogKeys.all }),
  ])
}

export function useCreateAdminPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: PostSubmission) => adminPostsApi.create(input),
    onSuccess: () => invalidatePosts(queryClient),
  })
}

export function useUpdateAdminPost(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: PostSubmission) => adminPostsApi.update(id, input),
    onSuccess: () => invalidatePosts(queryClient),
  })
}

export function useDeleteAdminPost() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminPostsApi.remove(id),
    onSuccess: () => invalidatePosts(queryClient),
  })
}
