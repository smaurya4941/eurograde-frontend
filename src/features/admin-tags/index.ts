// Public API of the admin-tags feature. Import from '@/features/admin-tags'.
export {
  adminTagKeys,
  useAdminTags,
  useCreateAdminTag,
  useDeleteAdminTag,
  useUpdateAdminTag,
} from './hooks'
export { tagFormSchema, type TagFormInput } from './schemas'
export type { AdminTag } from './types'
