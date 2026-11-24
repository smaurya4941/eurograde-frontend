import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminInboxApi } from './api'
import type { AdminListParams } from './types'

export const adminInboxKeys = {
  all: ['admin-inbox'] as const,
  messages: (params: AdminListParams & { handled?: boolean }) =>
    [...adminInboxKeys.all, 'messages', params] as const,
  subscribers: (params: AdminListParams & { subscribed?: boolean }) =>
    [...adminInboxKeys.all, 'subscribers', params] as const,
}

export function useAdminContactMessages(params: AdminListParams & { handled?: boolean }) {
  return useQuery({
    queryKey: adminInboxKeys.messages(params),
    queryFn: () => adminInboxApi.listMessages(params),
    placeholderData: keepPreviousData,
  })
}

export function useMarkMessageHandled() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, handled }: { id: number; handled: boolean }) =>
      adminInboxApi.markMessageHandled(id, handled),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminInboxKeys.all }),
  })
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminInboxApi.deleteMessage(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminInboxKeys.all }),
  })
}

export function useAdminNewsletterSubscribers(params: AdminListParams & { subscribed?: boolean }) {
  return useQuery({
    queryKey: adminInboxKeys.subscribers(params),
    queryFn: () => adminInboxApi.listSubscribers(params),
    placeholderData: keepPreviousData,
  })
}

export function useDeleteNewsletterSubscriber() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => adminInboxApi.deleteSubscriber(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: adminInboxKeys.all }),
  })
}
