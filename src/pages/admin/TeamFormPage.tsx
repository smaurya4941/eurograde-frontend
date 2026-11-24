import { useParams } from 'react-router'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { TeamMemberForm, useAdminTeamMember } from '@/features/admin-team'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TeamFormPage() {
  const { id } = useParams<{ id?: string }>()
  const memberId = id ? Number.parseInt(id, 10) : undefined
  const member = useAdminTeamMember(memberId ?? 0)
  usePageTitle(memberId ? 'Edit Team Member' : 'New Team Member')

  if (memberId && member.isPending) return <FullPageSpinner />

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">
        {memberId ? 'Edit Team Member' : 'New Team Member'}
      </h1>
      <TeamMemberForm teamMember={memberId ? member.data : undefined} />
    </div>
  )
}
