// Public API of the admin-posts feature. Import from '@/features/admin-posts', not deep paths.
export { PostForm } from './components/PostForm'
export {
  adminPostKeys,
  useAdminPost,
  useAdminPosts,
  useCreateAdminPost,
  useDeleteAdminPost,
  useUpdateAdminPost,
} from './hooks'
export type { PostFormInput, PostFormValues, PostSubmission } from './schemas'
export type { AdminPost, AdminPostListParams } from './types'
