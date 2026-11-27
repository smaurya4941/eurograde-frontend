/*
 * Validated build-time environment. Deliberately dependency-free: this module runs on every
 * page load, and pulling in a schema library here would put it on the critical path.
 */

function readAppName(value: unknown): string {
  if (value === undefined || value === '') return 'EuroRank'
  if (typeof value !== 'string') throw new Error('VITE_APP_NAME must be a string')
  return value
}

function readApiUrl(value: unknown): string {
  if (value === undefined || value === '') return ''
  if (typeof value !== 'string' || !URL.canParse(value)) {
    // Fail fast at boot instead of failing mysteriously at runtime.
    throw new Error(`Invalid environment variables:\nVITE_API_URL must be empty or a URL`)
  }
  return value
}

export const env = {
  appName: readAppName(import.meta.env.VITE_APP_NAME),
  /** API origin without trailing slash; empty string means same-origin. */
  apiUrl: readApiUrl(import.meta.env.VITE_API_URL).replace(/\/+$/, ''),
  isDev: import.meta.env.DEV,
} as const
