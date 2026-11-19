import { z } from 'zod'

/** Mirrors App\Http\Requests\Api\V1\Forms\StoreContactMessageRequest. */
export const contactMessageSchema = z.object({
  first_name: z.string().trim().min(1, 'First name is required.').max(100),
  last_name: z.string().trim().min(1, 'Last name is required.').max(100),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .max(30)
    .regex(/^\+?[0-9\s().-]{6,}$/, 'Please enter a valid phone number.'),
  email: z.email('Enter a valid email address.'),
  message: z
    .string()
    .trim()
    .min(10, 'Please tell us a little more (at least 10 characters).')
    .max(5000),
  /** Honeypot: hidden from people, left empty by them. */
  website: z.string().optional(),
})

export type ContactMessageInput = z.infer<typeof contactMessageSchema>
