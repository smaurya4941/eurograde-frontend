// Public API of the admin-inbox feature. Import from '@/features/admin-inbox', not deep paths.
export {
  adminInboxKeys,
  useAdminContactMessages,
  useAdminNewsletterSubscribers,
  useDeleteContactMessage,
  useDeleteNewsletterSubscriber,
  useMarkMessageHandled,
} from './hooks'
export type { AdminContactMessage, AdminListParams, AdminNewsletterSubscriber } from './types'
