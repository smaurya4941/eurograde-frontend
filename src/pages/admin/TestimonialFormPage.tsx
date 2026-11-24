import { useParams } from 'react-router'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { TestimonialForm, useAdminTestimonial } from '@/features/admin-testimonials'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TestimonialFormPage() {
  const { id } = useParams<{ id?: string }>()
  const testimonialId = id ? Number.parseInt(id, 10) : undefined
  const testimonial = useAdminTestimonial(testimonialId ?? 0)
  usePageTitle(testimonialId ? 'Edit Testimonial' : 'New Testimonial')

  if (testimonialId && testimonial.isPending) return <FullPageSpinner />

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        {testimonialId ? 'Edit Testimonial' : 'New Testimonial'}
      </h1>
      <TestimonialForm testimonial={testimonialId ? testimonial.data : undefined} />
    </div>
  )
}
