import { paths } from '@/app/router/paths'
import type { HeadingPart } from '@/components/marketing'
import type { TestimonialCategory } from '../types'

/** In-page anchors used by the section CTAs. */
export const anchors = {
  caseStudies: 'student-voices',
  reviews: 'student-reviews',
} as const

export const successStoriesCopy = {
  badge: 'Success Stories',
  title: [
    { text: 'Real Student Journeys', highlight: true },
    { text: ', Real Success Stories' },
  ] satisfies HeadingPart[],
  description:
    'Explore inspiring study abroad journeys and see how our counselors helped students choose the right university, secure admission and student visas, and confidently start new chapters in Germany and Italy.',
  cta: { label: 'View All Success Stories', to: `#${anchors.caseStudies}` },
}

export const caseStudiesCopy = {
  badge: 'Testimonials',
  title: [{ text: 'Student Voices' }] satisfies HeadingPart[],
  caseOverviewLabel: 'Case Overview',
}

export const videoReviewsCopy = {
  badge: 'Testimonials',
  title: [{ text: 'What Our Students Say' }] satisfies HeadingPart[],
  description:
    'Hear from students who trusted us with their university admissions, student visas and IELTS preparation. Their real experiences reflect our commitment to reliable guidance and successful outcomes.',
  cta: { label: 'View All Reviews', to: `#${anchors.reviews}` },
  categories: ['admissions', 'ielts'] satisfies TestimonialCategory[],
}

export const languageReviewsCopy = {
  badge: 'Testimonials',
  title: [
    { text: 'Real Experiences', highlight: true },
    { text: ' from Our German & Italian Language Students' },
  ] satisfies HeadingPart[],
  description:
    'Hear from learners who built their German and Italian skills with EuroGrades, from complete beginners to confident speakers ready for study, work and life in Europe.',
  cta: { label: 'Book Free Consultation', to: paths.contact },
  categories: ['german', 'italian'] satisfies TestimonialCategory[],
}

/** Placeholder story video (same as the About page) until EuroGrades provides its own. */
export const STORY_VIDEO = { youtubeId: '9jo51nJrO0k', title: 'Watch our story' } as const
