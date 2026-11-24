import { z } from 'zod'

/** Mirrors App\Http\Requests\Api\V1\Admin\{Store,Update}PostRequest. */
export const postFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.').max(255),
  /** Left blank, the server derives it from the title. */
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and dashes only.')
    .max(255)
    .optional()
    .or(z.literal('')),
  post_category_id: z.coerce.number().int().positive('Choose a category.'),
  author_id: z.coerce.number().int().positive().optional().or(z.literal('')),
  excerpt: z.string().trim().min(1, 'Excerpt is required.').max(500),
  body: z.string().optional(),
  meta_title: z.string().trim().max(255).optional().or(z.literal('')),
  meta_description: z.string().trim().max(500).optional().or(z.literal('')),
  /** Left blank, the post stays a draft. */
  published_at: z.string().optional().or(z.literal('')),
})

/** What react-hook-form holds before validation (coerced number fields may still be strings). */
export type PostFormValues = z.input<typeof postFormSchema>

/** What zodResolver produces after validation. */
export type PostFormInput = z.output<typeof postFormSchema>

/**
 * What's actually submitted: the validated fields plus the tag checklist and an optional
 * file, both held outside RHF/zod (a FileList/checkbox array doesn't fit zodResolver cleanly).
 */
export type PostSubmission = PostFormInput & { tagIds: number[]; image?: File }
