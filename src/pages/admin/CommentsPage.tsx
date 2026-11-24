import { useState } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import {
  useAdminComments,
  useDeleteComment,
  useUpdateCommentStatus,
  type AdminComment,
  type CommentStatus,
} from '@/features/admin-comments'
import { usePageTitle } from '@/hooks/usePageTitle'

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

const statusBadgeClass: Record<CommentStatus, string> = {
  pending: 'text-amber-700',
  approved: 'text-emerald-700',
  spam: 'text-red-700',
}

export default function CommentsPage() {
  usePageTitle('Comments')
  const [filter, setFilter] = useState<'all' | CommentStatus>('pending')
  const comments = useAdminComments({ status: filter === 'all' ? undefined : filter })
  const updateStatus = useUpdateCommentStatus()
  const remove = useDeleteComment()

  const handleDelete = (comment: AdminComment) => {
    if (confirm(`Delete the comment from ${comment.author_name}?`)) {
      remove.mutate({ id: comment.id, postSlug: comment.post.slug })
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Comments</h1>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as typeof filter)}
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="spam">Spam</option>
          <option value="all">All</option>
        </select>
      </div>

      <DataTable
        isLoading={comments.isPending}
        rows={comments.data?.comments ?? []}
        rowKey={(comment) => comment.id}
        emptyMessage="No comments here."
        columns={[
          {
            header: 'From',
            render: (comment) => (
              <div>
                <p className="font-medium text-slate-900">{comment.author_name}</p>
                <p className="text-slate-500">{comment.author_email}</p>
              </div>
            ),
          },
          {
            header: 'Comment',
            className: 'px-4 py-3 text-slate-700 max-w-sm',
            render: (comment) => (
              <div>
                <p className="line-clamp-3">{comment.body}</p>
                <p className="mt-1 text-xs text-slate-500">on “{comment.post.title}”</p>
              </div>
            ),
          },
          {
            header: 'Status',
            render: (comment) => (
              <span className={statusBadgeClass[comment.status]}>{comment.status}</span>
            ),
          },
          { header: 'Received', render: (comment) => formatDate(comment.created_at) },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (comment) => (
              <div className="flex justify-end gap-2">
                {comment.status !== 'approved' && (
                  <button
                    type="button"
                    onClick={() => updateStatus.mutate({ id: comment.id, status: 'approved' })}
                    className="rounded-md px-2 py-1 text-emerald-700 hover:bg-emerald-50"
                  >
                    Approve
                  </button>
                )}
                {comment.status !== 'spam' && (
                  <button
                    type="button"
                    onClick={() => updateStatus.mutate({ id: comment.id, status: 'spam' })}
                    className="rounded-md px-2 py-1 text-amber-700 hover:bg-amber-50"
                  >
                    Mark spam
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(comment)}
                  className="rounded-md px-2 py-1 text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
