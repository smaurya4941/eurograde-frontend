import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { adminPostEditHref, paths } from '@/app/router/paths'
import { DataTable } from '@/components/admin/DataTable'
import { Pagination } from '@/components/marketing'
import { useAdminPosts, useDeleteAdminPost, type AdminPost } from '@/features/admin-posts'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function PostsListPage() {
  usePageTitle('Posts')
  const [params] = useSearchParams()
  const page = Number.parseInt(params.get('page') ?? '1', 10) || 1
  const posts = useAdminPosts({ page })
  const remove = useDeleteAdminPost()

  const handleDelete = (post: AdminPost) => {
    if (confirm(`Delete "${post.title}"?`)) remove.mutate(post.id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Posts</h1>
        <Link
          to={paths.adminPostNew}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          New post
        </Link>
      </div>

      <DataTable
        isLoading={posts.isPending}
        rows={posts.data?.posts ?? []}
        rowKey={(post) => post.id}
        emptyMessage="No posts yet."
        columns={[
          { header: 'Title', render: (post) => post.title },
          { header: 'Category', render: (post) => post.category?.name ?? '—' },
          {
            header: 'Status',
            render: (post) =>
              post.published_at ? (
                <span className="text-emerald-700">Published</span>
              ) : (
                <span className="text-slate-500">Draft</span>
              ),
          },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (post) => (
              <div className="flex justify-end gap-2">
                <Link
                  to={adminPostEditHref(post.id)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50"
                >
                  <SquarePen className="size-4" aria-hidden="true" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      {posts.data && (
        <Pagination
          className="mt-6"
          currentPage={posts.data.meta.current_page}
          lastPage={posts.data.meta.last_page}
          hrefForPage={(target) =>
            target > 1 ? `${paths.adminPosts}?page=${target}` : paths.adminPosts
          }
        />
      )}
    </div>
  )
}
