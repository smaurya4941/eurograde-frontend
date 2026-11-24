import { Mail, MessageSquareQuote, Newspaper, Users } from 'lucide-react'
import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { Card } from '@/components/ui/Card'
import { usePageTitle } from '@/hooks/usePageTitle'

const links = [
  {
    to: paths.adminPosts,
    label: 'Posts',
    description: 'Write and publish blog articles.',
    icon: Newspaper,
  },
  { to: paths.adminTeam, label: 'Team', description: 'Manage team member profiles.', icon: Users },
  {
    to: paths.adminTestimonials,
    label: 'Testimonials',
    description: 'Manage student testimonials.',
    icon: MessageSquareQuote,
  },
  {
    to: paths.adminMessages,
    label: 'Messages',
    description: 'Review contact enquiries.',
    icon: Mail,
  },
]

export default function AdminDashboardPage() {
  usePageTitle('Admin Dashboard')

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map(({ to, label, description, icon: Icon }) => (
          <Link key={to} to={to}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <Icon className="size-6 text-brand-600" aria-hidden="true" />
              <h2 className="mt-3 font-semibold text-slate-900">{label}</h2>
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
