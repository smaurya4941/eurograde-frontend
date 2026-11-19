import { Card } from '@/components/ui/Card'
import { useCurrentUser } from '@/features/auth'

export default function DashboardPage() {
  const { data: user } = useCurrentUser()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-600">Welcome back, {user?.name}.</p>

      <Card className="mt-8">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-1 text-slate-900">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="mt-1 text-slate-900">{user?.email}</dd>
          </div>
        </dl>
      </Card>
    </div>
  )
}
