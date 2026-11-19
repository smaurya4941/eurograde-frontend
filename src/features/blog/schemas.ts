import { z } from 'zod'

/** Mirrors App\Http\Requests\Api\V1\Content\StorePostCommentRequest. */
export const commentSchema = z.object({
  author_name: z.string().trim().min(1, 'Please enter your name.').max(100),
  author_email: z.email('Enter a valid email address.'),
  author_website: z
    .string()
    .trim()
    .max(255)
    .refine((value) => value === '' || /^https?:\/\/\S+\.\S+/i.test(value), {
      message: 'Enter a full web address, e.g. https://example.com.',
    }),
  body: z
    .string()
    .trim()
    .min(2, 'Please write a comment.')
    .max(3000, 'Comments can be up to 3,000 characters.'),
  /** Remember name, email and website in this browser for next time. */
  remember: z.boolean(),
  /** Honeypot: hidden from people, left empty by them. */
  subject: z.string().optional(),
})

export type CommentInput = z.infer<typeof commentSchema>
