// Public API of the admin-comments feature. Import from '@/features/admin-comments'.
export {
  adminCommentKeys,
  useAdminComments,
  useDeleteComment,
  useUpdateCommentStatus,
} from './hooks'
export type { AdminComment, AdminCommentListParams, CommentStatus } from './types'
