import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import type { ApiSuccess } from '@/types/api'
import { toApiError } from './errors'

const SAFE_METHODS = new Set(['get', 'head', 'options'])
const CSRF_COOKIE = 'XSRF-TOKEN'

export const http = axios.create({
  baseURL: `${env.apiUrl}/api/v1`,
  withCredentials: true, // send the Sanctum session cookie
  withXSRFToken: true, // copy XSRF-TOKEN cookie into the X-XSRF-TOKEN header
  timeout: 15_000,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
})

let csrfRequest: Promise<unknown> | null = null

/** Fetches the CSRF cookie once; concurrent callers share the same request. */
export function ensureCsrfCookie(force = false): Promise<unknown> {
  const hasCookie = document.cookie.split('; ').some((c) => c.startsWith(`${CSRF_COOKIE}=`))
  if (hasCookie && !force) return Promise.resolve()

  csrfRequest ??= axios
    .get(`${env.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true })
    .finally(() => {
      csrfRequest = null
    })

  return csrfRequest
}

http.interceptors.request.use(async (config) => {
  if (!SAFE_METHODS.has((config.method ?? 'get').toLowerCase())) {
    await ensureCsrfCookie()
  }
  return config
})

type RetriableConfig = InternalAxiosRequestConfig & { _csrfRetried?: boolean }

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = (axios.isAxiosError(error) ? error.config : undefined) as
      RetriableConfig | undefined

    // 419 = CSRF token mismatch (expired session). Refresh the cookie and retry once.
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 419 &&
      config &&
      !config._csrfRetried
    ) {
      config._csrfRetried = true
      await ensureCsrfCookie(true)
      return http.request(config)
    }

    return Promise.reject(toApiError(error))
  },
)

/** Thin typed wrapper returning the API envelope ({ success, data, message, meta }). */
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig) =>
    (await http.get<ApiSuccess<T>>(url, config)).data,
  post: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    (await http.post<ApiSuccess<T>>(url, body, config)).data,
  put: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    (await http.put<ApiSuccess<T>>(url, body, config)).data,
  patch: async <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
    (await http.patch<ApiSuccess<T>>(url, body, config)).data,
  delete: async <T>(url: string, config?: AxiosRequestConfig) =>
    (await http.delete<ApiSuccess<T>>(url, config)).data,
}
