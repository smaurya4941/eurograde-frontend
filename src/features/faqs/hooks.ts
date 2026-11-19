import { useQuery } from '@tanstack/react-query'
import { faqApi } from './api'
import type { FaqCategory } from './types'

export const faqKeys = {
  all: ['faqs'] as const,
  list: (category: FaqCategory) => [...faqKeys.all, category] as const,
}

export function useFaqs(category: FaqCategory) {
  return useQuery({
    queryKey: faqKeys.list(category),
    queryFn: () => faqApi.list(category),
    staleTime: 10 * 60_000,
  })
}
