import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { ApiError } from '@/lib/api/errors'

/**
 * Maps Laravel 422 validation errors onto react-hook-form fields.
 * Returns a general message for anything that is not a field error.
 */
export function applyServerErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
): string | null {
  if (!(error instanceof ApiError)) return 'An unexpected error occurred.'

  if (error.isValidation && Object.keys(error.errors).length > 0) {
    for (const [field, messages] of Object.entries(error.errors)) {
      setError(field as Path<T>, { type: 'server', message: messages[0] })
    }
    return null
  }

  return error.message
}
