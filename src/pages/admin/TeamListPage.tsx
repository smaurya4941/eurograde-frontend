import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { adminTeamEditHref, paths } from '@/app/router/paths'
import { DataTable } from '@/components/admin/DataTable'
import { Pagination } from '@/components/marketing'
import {
  useAdminTeamMembers,
  useDeleteAdminTeamMember,
  type AdminTeamMember,
} from '@/features/admin-team'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TeamListPage() {
  usePageTitle('Team')
  const [params] = useSearchParams()
  const page = Number.parseInt(params.get('page') ?? '1', 10) || 1
  const teamMembers = useAdminTeamMembers({ page })
  const remove = useDeleteAdminTeamMember()

  const handleDelete = (member: AdminTeamMember) => {
    if (confirm(`Delete "${member.name}"?`)) remove.mutate(member.id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <Link
          to={paths.adminTeamNew}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          New team member
        </Link>
      </div>

      <DataTable
        isLoading={teamMembers.isPending}
        rows={teamMembers.data?.teamMembers ?? []}
        rowKey={(member) => member.id}
        emptyMessage="No team members yet."
        columns={[
          { header: 'Name', render: (member) => member.name },
          { header: 'Role', render: (member) => member.role },
          {
            header: 'Status',
            render: (member) =>
              member.is_active ? (
                <span className="text-emerald-700">Visible</span>
              ) : (
                <span className="text-slate-500">Hidden</span>
              ),
          },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (member) => (
              <div className="flex justify-end gap-2">
                <Link
                  to={adminTeamEditHref(member.id)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50"
                >
                  <SquarePen className="size-4" aria-hidden="true" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(member)}
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

      {teamMembers.data && (
        <Pagination
          className="mt-6"
          currentPage={teamMembers.data.meta.current_page}
          lastPage={teamMembers.data.meta.last_page}
          hrefForPage={(target) =>
            target > 1 ? `${paths.adminTeam}?page=${target}` : paths.adminTeam
          }
        />
      )}
    </div>
  )
}
