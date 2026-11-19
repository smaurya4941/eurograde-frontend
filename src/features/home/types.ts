// Static home-page content types. Team members, FAQs and posts come from the API
// (see '@/features/team', '@/features/faqs', '@/features/blog').

export interface Service {
  slug: string
  title: string
  excerpt: string
  icon: string
  image: string
}

export interface Testimonial {
  name: string
  avatar: string
  country: string
  university: string
  quote: string
  rating: number
  caseOverview: string[]
}

export interface University {
  name: string
  country: string
  logo: string
}

export interface Destination {
  name: string
  flag: string
}

/** A country or city in the study destinations carousel (round photo + name). */
export interface StudyDestination {
  name: string
  image: string
}
