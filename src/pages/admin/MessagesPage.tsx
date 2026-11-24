import { useState } from 'react'
import { DataTable } from '@/components/admin/DataTable'
import {
  useAdminContactMessages,
  useDeleteContactMessage,
  useMarkMessageHandled,
  type AdminContactMessage,
} from '@/features/admin-inbox'
import { usePageTitle } from '@/hooks/usePageTitle'

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

export default function MessagesPage() {
  usePageTitle('Messages')
  const [filter, setFilter] = useState<'all' | 'unhandled' | 'handled'>('unhandled')
  const messages = useAdminContactMessages({
    handled: filter === 'all' ? undefined : filter === 'handled',
  })
  const markHandled = useMarkMessageHandled()
  const remove = useDeleteContactMessage()

  const handleDelete = (message: AdminContactMessage) => {
    if (confirm(`Delete the message from ${message.first_name} ${message.last_name}?`)) {
      remove.mutate(message.id)
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value as typeof filter)}
          className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900"
        >
          <option value="unhandled">Unhandled</option>
          <option value="handled">Handled</option>
          <option value="all">All</option>
        </select>
      </div>

      <DataTable
        isLoading={messages.isPending}
        rows={messages.data?.messages ?? []}
        rowKey={(message) => message.id}
        emptyMessage="No messages here."
        columns={[
          {
            header: 'From',
            render: (message) => (
              <div>
                <p className="font-medium text-slate-900">
                  {message.first_name} {message.last_name}
                </p>
                <p className="text-slate-500">{message.email}</p>
                <p className="text-slate-500">{message.phone}</p>
              </div>
            ),
          },
          {
            header: 'Message',
            className: 'px-4 py-3 text-slate-700 max-w-sm',
            render: (message) => <p className="line-clamp-3">{message.message}</p>,
          },
          { header: 'Received', render: (message) => formatDate(message.created_at) },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (message) => (
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() =>
                    markHandled.mutate({ id: message.id, handled: !message.handled_at })
                  }
                  className="rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50"
                >
                  {message.handled_at ? 'Mark unhandled' : 'Mark handled'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(message)}
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
