import { useParams } from 'react-router'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { PostForm, useAdminPost } from '@/features/admin-posts'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function PostFormPage() {
  const { id } = useParams<{ id?: string }>()
  const postId = id ? Number.parseInt(id, 10) : undefined
  const post = useAdminPost(postId ?? 0)
  usePageTitle(postId ? 'Edit Post' : 'New Post')

  if (postId && post.isPending) return <FullPageSpinner />

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        {postId ? 'Edit Post' : 'New Post'}
      </h1>
      <PostForm post={postId ? post.data : undefined} />
    </div>
  )
}
