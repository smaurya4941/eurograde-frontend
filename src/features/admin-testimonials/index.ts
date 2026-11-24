// Public API of the admin-testimonials feature. Import from '@/features/admin-testimonials'.
export { TestimonialForm } from './components/TestimonialForm'
export {
  adminTestimonialKeys,
  useAdminTestimonial,
  useAdminTestimonials,
  useCreateAdminTestimonial,
  useDeleteAdminTestimonial,
  useUpdateAdminTestimonial,
} from './hooks'
export type { TestimonialFormInput, TestimonialFormValues, TestimonialSubmission } from './schemas'
export type { AdminTestimonial, AdminTestimonialListParams, TestimonialCategory } from './types'
export { testimonialCategoryLabels } from './types'
