import { z } from 'zod'

/** Mirrors App\Http\Requests\Api\V1\Admin\{Store,Update}TestimonialRequest. */
export const testimonialFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(255),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and dashes only.')
    .max(255)
    .optional()
    .or(z.literal('')),
  category: z.enum(['admissions', 'ielts', 'german', 'italian'], {
    message: 'Choose a category.',
  }),
  program: z.string().trim().min(1, 'Program is required.').max(255),
  origin: z.string().trim().max(255).optional().or(z.literal('')),
  destination: z.string().trim().max(255).optional().or(z.literal('')),
  achievement: z.string().trim().max(255).optional().or(z.literal('')),
  quote: z.string().trim().min(1, 'Quote is required.'),
  rating: z.coerce.number().int().min(1).max(5),
  /** Comma-separated in the form, split into an array before it is sent. */
  highlights: z.string().optional(),
  is_featured: z.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

/** What react-hook-form holds before validation (coerced number fields may still be strings). */
export type TestimonialFormValues = z.input<typeof testimonialFormSchema>

/** What zodResolver produces after validation. */
export type TestimonialFormInput = z.output<typeof testimonialFormSchema>

export type TestimonialSubmission = TestimonialFormInput & { avatar?: File }
