import { useQuery } from '@tanstack/react-query'
import { faqApi } from './api'
import type { FaqCategory } from './types'

export const faqKeys = {
  all: ['faqs'] as const,
  list: (category: FaqCategory | readonly FaqCategory[]) =>
    [...faqKeys.all, typeof category === 'string' ? category : category.join(',')] as const,
}

/** Active FAQs for one topic, or several topics in the given order. */
export function useFaqs(category: FaqCategory | readonly FaqCategory[]) {
  return useQuery({
    queryKey: faqKeys.list(category),
    queryFn: () => faqApi.list(category),
    staleTime: 10 * 60_000,
  })
}
