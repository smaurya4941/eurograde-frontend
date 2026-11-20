import { api } from '@/lib/api/client'
import type { LoginInput, RegisterInput } from './schemas'
import type { User } from './types'

export const authApi = {
  /** The signed-in user, or null for guests. */
  me: async () => (await api.get<User | null>('/auth/me')).data ?? null,
  login: async (input: LoginInput) => (await api.post<User>('/auth/login', input)).data,
  register: async (input: RegisterInput) => (await api.post<User>('/auth/register', input)).data,
  logout: async () => {
    await api.post<null>('/auth/logout')
  },
}
