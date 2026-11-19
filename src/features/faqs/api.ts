import { api } from '@/lib/api/client'
import type { Faq, FaqCategory } from './types'

export const faqApi = {
  /** One topic (`?category=x`) or several (`?category[]=x&category[]=y`, returned in that order). */
  list: async (category: FaqCategory | readonly FaqCategory[]) =>
    (await api.get<Faq[]>('/faqs', { params: { category } })).data,
}
