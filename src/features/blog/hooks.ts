import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { blogApi, type NewComment } from './api'
import type { PostListParams } from './types'

export const blogKeys = {
  all: ['posts'] as const,
  list: (params: PostListParams) => [...blogKeys.all, 'list', params] as const,
  categories: () => [...blogKeys.all, 'categories'] as const,
  detail: (slug: string) => [...blogKeys.all, 'detail', slug] as const,
  comments: (slug: string) => [...blogKeys.all, 'detail', slug, 'comments'] as const,
}

/**
 * A page of published posts. While the next page/filter loads, the previous
 * results stay on screen (`isPlaceholderData`) instead of flashing a skeleton.
 */
export function usePosts(params: PostListParams) {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => blogApi.list(params),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60_000,
  })
}

/** The newest `limit` posts (used by teasers on the home/about pages and the blog sidebar). */
export function useLatestPosts(limit = 3) {
  const params: PostListParams = { perPage: limit }
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => blogApi.list(params),
    select: (page) => page.posts,
    staleTime: 5 * 60_000,
  })
}

export function usePostCategories() {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: blogApi.categories,
    staleTime: 10 * 60_000,
  })
}

/** A single published article (404s surface as an `ApiError` with status 404). */
export function usePost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => blogApi.show(slug),
    staleTime: 5 * 60_000,
  })
}

/** Approved comments on an article, threaded. */
export function usePostComments(slug: string) {
  return useQuery({
    queryKey: blogKeys.comments(slug),
    queryFn: () => blogApi.comments(slug),
  })
}

export function useSubmitComment(slug: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: NewComment) => blogApi.submitComment(slug, input),
    onSuccess: async (result) => {
      // Held comments are not public yet, so there is nothing new to show.
      if (result.comment) {
        await queryClient.invalidateQueries({ queryKey: blogKeys.comments(slug) })
      }
    },
  })
}
