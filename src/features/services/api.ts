import { api } from '@/lib/api/client'
import type { Service, ServiceDetail } from './types'

export const servicesApi = {
  list: async () => (await api.get<Service[]>('/services')).data,
  show: async (slug: string) =>
    (await api.get<ServiceDetail>(`/services/${encodeURIComponent(slug)}`)).data,
}
