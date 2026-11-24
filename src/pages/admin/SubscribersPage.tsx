import { DataTable } from '@/components/admin/DataTable'
import {
  useAdminNewsletterSubscribers,
  useDeleteNewsletterSubscriber,
  type AdminNewsletterSubscriber,
} from '@/features/admin-inbox'
import { usePageTitle } from '@/hooks/usePageTitle'

function formatDate(value: string | null): string {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

export default function SubscribersPage() {
  usePageTitle('Newsletter Subscribers')
  const subscribers = useAdminNewsletterSubscribers({})
  const remove = useDeleteNewsletterSubscriber()

  const handleDelete = (subscriber: AdminNewsletterSubscriber) => {
    if (confirm(`Remove ${subscriber.email}?`)) remove.mutate(subscriber.id)
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Newsletter Subscribers</h1>

      <DataTable
        isLoading={subscribers.isPending}
        rows={subscribers.data?.subscribers ?? []}
        rowKey={(subscriber) => subscriber.id}
        emptyMessage="No subscribers yet."
        columns={[
          { header: 'Email', render: (subscriber) => subscriber.email },
          {
            header: 'Status',
            render: (subscriber) =>
              subscriber.unsubscribed_at ? (
                <span className="text-slate-500">Unsubscribed</span>
              ) : (
                <span className="text-emerald-700">Subscribed</span>
              ),
          },
          { header: 'Since', render: (subscriber) => formatDate(subscriber.created_at) },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (subscriber) => (
              <button
                type="button"
                onClick={() => handleDelete(subscriber)}
                className="rounded-md px-2 py-1 text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            ),
          },
        ]}
      />
    </div>
  )
}
