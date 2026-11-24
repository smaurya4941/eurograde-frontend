import { z } from 'zod'

/** Mirrors App\Http\Requests\Api\V1\Admin\{Store,Update}PostCategoryRequest. */
export const postCategoryFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(100),
  /** Left blank, the server derives it from the name. */
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and dashes only.')
    .max(120)
    .optional()
    .or(z.literal('')),
})

export type PostCategoryFormInput = z.infer<typeof postCategoryFormSchema>
