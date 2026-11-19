// Static home-page content types. Services, universities, stats, team members, FAQs,
// testimonials and posts come from the API (see the matching '@/features/*' modules).

export interface Destination {
  name: string
  flag: string
}

/** A country or city in the study destinations carousel (round photo + name). */
export interface StudyDestination {
  name: string
  image: string
}
