import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogKeys } from '@/features/blog'
import { adminCommentsApi } from './api'
import type { AdminCommentListParams, CommentStatus } from './types'

export const adminCommentKeys = {
  all: ['admin-comments'] as const,
  list: (params: AdminCommentListParams) => [...adminCommentKeys.all, 'list', params] as const,
}

export function useAdminComments(params: AdminCommentListParams) {
  return useQuery({
    queryKey: adminCommentKeys.list(params),
    queryFn: () => adminCommentsApi.list(params),
    placeholderData: keepPreviousData,
  })
}

export function useUpdateCommentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: CommentStatus }) =>
      adminCommentsApi.updateStatus(id, status),
    onSuccess: (comment) => {
      queryClient.invalidateQueries({ queryKey: adminCommentKeys.all })
      // Keeps the public article's comment thread in sync if already cached in this session.
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(comment.post.slug) })
    },
  })
}

export function useDeleteComment() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }: { id: number; postSlug: string }) => adminCommentsApi.remove(id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminCommentKeys.all })
      queryClient.invalidateQueries({ queryKey: blogKeys.comments(variables.postSlug) })
    },
  })
}
