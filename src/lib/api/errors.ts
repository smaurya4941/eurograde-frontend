import axios from 'axios'
import type { ApiErrorBody } from '@/types/api'

export type FieldErrors = Record<string, string[]>

/** Normalized error type every API call rejects with. */
export class ApiError extends Error {
  readonly status: number
  readonly errors: FieldErrors

  constructor(message: string, status: number, errors: FieldErrors = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  get isValidation(): boolean {
    return this.status === 422
  }

  get isUnauthorized(): boolean {
    return this.status === 401
  }

  get isNetwork(): boolean {
    return this.status === 0
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error

  if (axios.isAxiosError<ApiErrorBody>(error)) {
    if (!error.response) {
      return new ApiError('Unable to reach the server. Please check your connection.', 0)
    }

    const { status, data } = error.response
    return new ApiError(data?.message || error.message, status, data?.errors ?? {})
  }

  return new ApiError(error instanceof Error ? error.message : 'An unexpected error occurred.', 0)
}
