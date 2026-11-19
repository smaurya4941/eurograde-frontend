// Public API of the testimonials feature. Import from '@/features/testimonials', not deep paths.
export { SuccessStoriesSection } from './components/SuccessStoriesSection'
export { CaseStudiesSection } from './components/CaseStudiesSection'
export { VideoReviewsSection } from './components/VideoReviewsSection'
export { LanguageReviewsSection } from './components/LanguageReviewsSection'
export { testimonialKeys, useSuccessStories, useTestimonials } from './hooks'
export { testimonialSubtitle } from './lib/format'
export type { SuccessStory, Testimonial, TestimonialCategory, TestimonialFilters } from './types'
