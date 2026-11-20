/**
 * TanStack Query keys for the auth feature. Kept in their own module so app-level code (the
 * query client) can import them without pulling the auth forms (react-hook-form + zod) into
 * every page's bundle.
 */
export const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}
