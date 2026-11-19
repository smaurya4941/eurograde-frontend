import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError } from '@/lib/api/errors'
import { authApi } from './api'

export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

/** Current user, or `null` when not signed in. */
export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      try {
        return await authApi.me()
      } catch (error) {
        if (error instanceof ApiError && error.isUnauthorized) return null
        throw error
      }
    },
    staleTime: 5 * 60_000,
    retry: false,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => queryClient.setQueryData(authKeys.me(), user),
  })
}

export function useRegister() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (user) => queryClient.setQueryData(authKeys.me(), user),
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApi.logout,
    onSettled: () => {
      // Drop every cached query so no data from the previous user survives.
      queryClient.removeQueries()
      queryClient.setQueryData(authKeys.me(), null)
    },
  })
}
