import { QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense, type ReactNode } from 'react'
import { queryClient } from './query-client'

// Loaded only in development, so it never ends up in the production bundle.
const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({ default: m.ReactQueryDevtools })),
    )
  : () => null

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Suspense fallback={null}>
        <ReactQueryDevtools buttonPosition="bottom-left" />
      </Suspense>
    </QueryClientProvider>
  )
}
