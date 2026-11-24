import {
  Folder,
  LogOut,
  Mail,
  MessageCircle,
  MessageSquareQuote,
  Newspaper,
  Rss,
  Tag,
  Users,
} from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { env } from '@/config/env'
import { useCurrentUser, useLogout } from '@/features/auth'
import { cn } from '@/lib/cn'

const navItems = [
  { to: paths.adminPosts, label: 'Posts', icon: Newspaper },
  { to: paths.adminCategories, label: 'Categories', icon: Folder },
  { to: paths.adminTags, label: 'Tags', icon: Tag },
  { to: paths.adminTeam, label: 'Team', icon: Users },
  { to: paths.adminTestimonials, label: 'Testimonials', icon: MessageSquareQuote },
  { to: paths.adminComments, label: 'Comments', icon: MessageCircle },
  { to: paths.adminMessages, label: 'Messages', icon: Mail },
  { to: paths.adminSubscribers, label: 'Subscribers', icon: Rss },
]

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  )

export function AdminLayout() {
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout.mutate(undefined, { onSettled: () => navigate(paths.adminLogin, { replace: true }) })
  }

  return (
    <div className="flex min-h-dvh">
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white sm:flex sm:flex-col">
        <Link to={paths.adminDashboard} className="px-4 py-5 text-lg font-bold text-slate-900">
          {env.appName} <span className="text-brand-600">Admin</span>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={navLinkClass}>
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <Link to={paths.adminDashboard} className="text-lg font-bold text-slate-900 sm:hidden">
            {env.appName} Admin
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} loading={logout.isPending}>
              <LogOut className="size-4" aria-hidden="true" />
              Log out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
