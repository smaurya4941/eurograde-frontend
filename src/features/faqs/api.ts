import { api } from '@/lib/api/client'
import type { Faq, FaqCategory } from './types'

export const faqApi = {
  list: async (category: FaqCategory) =>
    (await api.get<Faq[]>('/faqs', { params: { category } })).data,
}
