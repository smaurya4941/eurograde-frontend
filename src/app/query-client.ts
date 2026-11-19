import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { authKeys } from '@/features/auth'
import { ApiError } from '@/lib/api/errors'

function handleUnauthorized(error: unknown) {
  // Session expired mid-use: mark the user as signed out so guards redirect.
  if (error instanceof ApiError && error.isUnauthorized) {
    queryClient.setQueryData(authKeys.me(), null)
  }
}

export const queryClient = new QueryClient({
  queryCache: new QueryCache({ onError: handleUnauthorized }),
  mutationCache: new MutationCache({ onError: handleUnauthorized }),
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // Never retry client errors (4xx); retry transient failures twice.
      retry: (failureCount, error) =>
        !(error instanceof ApiError && error.status >= 400 && error.status < 500) &&
        failureCount < 2,
    },
  },
})
