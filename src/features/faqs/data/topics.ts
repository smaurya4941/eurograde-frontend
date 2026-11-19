import type { HeadingPart } from '@/components/marketing'
import type { FaqCategory } from '../types'

export interface FaqTopic {
  category: FaqCategory
  /** In-page anchor of the topic's question group. */
  id: string
  /** Sidebar link label. */
  label: string
  /** Group heading; the highlighted part is shown in the accent colour. */
  title: HeadingPart[]
}

/** FAQs page topics, in page order. Questions come from `GET /faqs?category[]=…`. */
export const faqTopics: FaqTopic[] = [
  {
    category: 'students',
    id: 'general-questions',
    label: 'General Questions',
    title: [{ text: 'General ' }, { text: 'Questions', highlight: true }],
  },
  {
    category: 'germany',
    id: 'study-in-germany',
    label: 'Study in Germany',
    title: [{ text: 'Study in ' }, { text: 'Germany', highlight: true }],
  },
  {
    category: 'italy',
    id: 'study-in-italy',
    label: 'Study in Italy',
    title: [{ text: 'Study in ' }, { text: 'Italy', highlight: true }],
  },
  {
    category: 'ielts',
    id: 'ielts-preparation',
    label: 'IELTS Preparation',
    title: [{ text: 'IELTS ' }, { text: 'Preparation', highlight: true }],
  },
  {
    category: 'german-language',
    id: 'german-language',
    label: 'German Language Course',
    title: [{ text: 'German ' }, { text: 'Language Course', highlight: true }],
  },
  {
    category: 'italian-language',
    id: 'italian-language',
    label: 'Italian Language Course',
    title: [{ text: 'Italian ' }, { text: 'Language Course', highlight: true }],
  },
]

export const faqSidebarCopy = {
  topicsTitle: 'Other Topics',
  contactTitle: 'Contact Us Today!',
  contactText:
    'Get in touch with our expert counselors today for personalized guidance, quick support, and complete assistance with your study abroad plans.',
}
