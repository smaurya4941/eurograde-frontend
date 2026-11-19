import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api/client'

interface SubscribeInput {
  email: string
  source_page?: string
}

/** Resolves with the server's confirmation message (new or already-subscribed). */
export function useSubscribeToNewsletter() {
  return useMutation({
    mutationFn: async (input: SubscribeInput) =>
      (await api.post<null>('/newsletter-subscriptions', input)).message ??
      'Thanks for subscribing!',
  })
}
