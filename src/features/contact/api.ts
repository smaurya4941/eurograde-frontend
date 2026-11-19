import { api } from '@/lib/api/client'
import type { ContactMessageInput } from './schemas'

export const contactApi = {
  /** Resolves with the server's confirmation message. */
  submit: async (input: ContactMessageInput & { source_page?: string }) =>
    (await api.post<null>('/contact-messages', input)).message ??
    'Thank you! Your message has been sent.',
}
