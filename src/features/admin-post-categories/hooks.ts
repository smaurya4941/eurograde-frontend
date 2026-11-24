import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogKeys } from '@/features/blog'
import { adminPostCategoriesApi } from './api'
import type { PostCategoryFormInput } from './schemas'

export const adminPostCategoryKeys = {
  all: ['admin-post-categories'] as const,
}

/** Also used by the post form's category dropdown. */
export function useAdminPostCategories() {
  return useQuery({
    queryKey: adminPostCategoryKeys.all,
    queryFn: adminPostCategoriesApi.list,
  })
}

function invalidateCategories(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: adminPostCategoryKeys.all }),
    // Keeps the public blog's category filter in sync if already cached in this session.
    queryClient.invalidateQueries({ queryKey: blogKeys.categories() }),
  ])
}

export function useCreateAdminPostCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: PostCategoryFormInput) => adminPostCategoriesApi.create(input),
    onSuccess: () => invalidateCategories(queryClient),
  })
}

export function useUpdateAdminPostCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: PostCategoryFormInput }) =>
      adminPostCategoriesApi.update(id, input),
    onSuccess: () => invalidateCategories(queryClient),
  })
}

export function useDeleteAdminPostCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminPostCategoriesApi.remove(id),
    onSuccess: () => invalidateCategories(queryClient),
  })
}
