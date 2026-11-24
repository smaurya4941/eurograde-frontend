import { api } from '@/lib/api/client'
import type { PaginationMeta } from '@/types/api'
import type { AdminContactMessage, AdminListParams, AdminNewsletterSubscriber } from './types'

export interface AdminContactMessagePage {
  messages: AdminContactMessage[]
  meta: PaginationMeta
}

export interface AdminNewsletterSubscriberPage {
  subscribers: AdminNewsletterSubscriber[]
  meta: PaginationMeta
}

export const adminInboxApi = {
  listMessages: async ({
    page = 1,
    perPage = 15,
    handled,
  }: AdminListParams & { handled?: boolean } = {}): Promise<AdminContactMessagePage> => {
    const response = await api.get<AdminContactMessage[]>('/admin/contact-messages', {
      params: { page, per_page: perPage, handled },
    })
    return { messages: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  markMessageHandled: async (id: number, handled: boolean) =>
    (await api.patch<AdminContactMessage>(`/admin/contact-messages/${id}`, { handled })).data,

  deleteMessage: async (id: number) => {
    await api.delete<null>(`/admin/contact-messages/${id}`)
  },

  listSubscribers: async ({
    page = 1,
    perPage = 15,
    subscribed,
  }: AdminListParams & { subscribed?: boolean } = {}): Promise<AdminNewsletterSubscriberPage> => {
    const response = await api.get<AdminNewsletterSubscriber[]>('/admin/newsletter-subscribers', {
      params: { page, per_page: perPage, subscribed },
    })
    return { subscribers: response.data, meta: response.meta as unknown as PaginationMeta }
  },

  deleteSubscriber: async (id: number) => {
    await api.delete<null>(`/admin/newsletter-subscribers/${id}`)
  },
}
