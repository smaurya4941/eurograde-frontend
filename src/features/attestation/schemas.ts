import { z } from 'zod'
import { contactMessageSchema } from '@/features/contact'

/** Old-site enquiry form: one "Full name" field, split into first/last for the API. */
export const enquirySchema = z.object({
  full_name: z.string().trim().min(1, 'A name is required.').max(200),
  email: contactMessageSchema.shape.email,
  phone: contactMessageSchema.shape.phone,
  message: contactMessageSchema.shape.message,
  website: z.string().optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>

/** "Asha Rao Kumar" gives first "Asha", last "Rao Kumar"; a single word uses "-" as last name. */
export function splitFullName(fullName: string): { first_name: string; last_name: string } {
  const [first = '', ...rest] = fullName.trim().split(/\s+/)
  return { first_name: first, last_name: rest.join(' ') || '-' }
}
