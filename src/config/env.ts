import { z } from 'zod'

const schema = z.object({
  VITE_APP_NAME: z.string().min(1).default('EuroGrades'),
  VITE_API_URL: z.union([z.literal(''), z.url()]).default(''),
})

const parsed = schema.safeParse(import.meta.env)

if (!parsed.success) {
  // Fail fast at boot instead of failing mysteriously at runtime.
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`)
}

export const env = {
  appName: parsed.data.VITE_APP_NAME,
  /** API origin without trailing slash; empty string means same-origin. */
  apiUrl: parsed.data.VITE_API_URL.replace(/\/+$/, ''),
  isDev: import.meta.env.DEV,
} as const
