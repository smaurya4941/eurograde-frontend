/** Mirrors App\Http\Responses\ApiResponse on the backend. */
export interface ApiSuccess<T> {
  success: true
  message?: string
  data: T
  meta?: Record<string, unknown>
}

export interface ApiErrorBody {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}
