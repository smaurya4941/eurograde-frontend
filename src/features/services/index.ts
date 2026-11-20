// Public API of the services feature. Import from '@/features/services', not deep paths.
export { ServiceCard } from './components/ServiceCard'
export { ServicesGridSection } from './components/ServicesGridSection'
export { ServiceDetailSkeleton, ServiceDetailView } from './components/detail/ServiceDetailView'
export { serviceKeys, useService, useServices } from './hooks'
export { serviceHref } from './utils'
export type { Service, ServiceDetail } from './types'
