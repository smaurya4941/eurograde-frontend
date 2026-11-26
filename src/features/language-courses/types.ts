export interface LanguageLevel {
  code: string
  title: string
  summary: string
  points: string[]
  /** Badge colour band: pink for A, navy for B, gold for C. */
  tone: 'pink' | 'navy' | 'gold'
}

export interface LanguageFeature {
  icon: string
  label: string
}

export interface LanguageCourseContent {
  /** Short name used in the enquiry message, e.g. "German". */
  name: string
  pageTitle: string
  bannerTitle: string
  bannerImage: string
  crumbs: { label: string }[]
  intro: { heading: string; paragraphs: string[]; image: string }
  why: { subtitle: string; features: LanguageFeature[] }
  levels: { heading: string; subtitle: string; items: LanguageLevel[] }
  pros: { heading: string; image: string; points: string[] }
  reviewsSubtitle: string
  reviewsCategory: 'german' | 'italian'
  faqCategory: 'german-language' | 'italian-language'
  faqSubtitle?: string
}
