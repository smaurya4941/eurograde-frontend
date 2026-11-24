import { z } from 'zod'
import type { SocialLink } from '@/features/team'

/** The 4 networks the public site can render an icon for (components/icons/SocialIcon.tsx). */
export const socialNetworks = ['facebook', 'instagram', 'x', 'youtube'] as const

const socialUrl = z
  .string()
  .trim()
  .max(255)
  .optional()
  .or(z.literal(''))
  .refine(
    (value) => !value || /^https?:\/\//i.test(value),
    'Enter a full URL starting with http(s)://',
  )

/** Mirrors App\Http\Requests\Api\V1\Admin\{Store,Update}TeamMemberRequest. */
export const teamMemberFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.').max(255),
  /** Left blank, the server derives it from the name. */
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]*$/, 'Use lowercase letters, numbers and dashes only.')
    .max(255)
    .optional()
    .or(z.literal('')),
  role: z.string().trim().min(1, 'Role is required.').max(255),
  bio: z.string().optional(),
  socials: z.object({
    facebook: socialUrl,
    instagram: socialUrl,
    x: socialUrl,
    youtube: socialUrl,
  }),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
})

/** What react-hook-form holds before validation (coerced number fields may still be strings). */
export type TeamMemberFormValues = z.input<typeof teamMemberFormSchema>

/** What zodResolver produces after validation. */
export type TeamMemberFormInput = z.output<typeof teamMemberFormSchema>

export type TeamMemberSubmission = Omit<TeamMemberFormInput, 'socials'> & {
  socials: SocialLink[]
  photo?: File
}

/** Builds the fixed facebook/instagram/x/youtube fields from a saved socials list. */
export function socialsToFormValues(socials: SocialLink[]): TeamMemberFormValues['socials'] {
  const byNetwork = new Map(socials.map((s) => [s.network, s.url]))
  return {
    facebook: byNetwork.get('facebook') ?? '',
    instagram: byNetwork.get('instagram') ?? '',
    x: byNetwork.get('x') ?? '',
    youtube: byNetwork.get('youtube') ?? '',
  }
}

/** Drops the blank fields, keeping only the networks the admin filled in. */
export function formValuesToSocials(values: TeamMemberFormInput['socials']): SocialLink[] {
  return socialNetworks
    .filter((network) => values[network])
    .map((network) => ({ network, url: values[network] as string }))
}
