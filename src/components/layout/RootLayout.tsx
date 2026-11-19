import { Link, NavLink, Outlet, useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { env } from '@/config/env'
import { useCurrentUser, useLogout } from '@/features/auth'
import { cn } from '@/lib/cn'

const CURRENT_YEAR = new Date().getFullYear()

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900',
  )

export function RootLayout() {
  const { data: user } = useCurrentUser()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout.mutate(undefined, { onSettled: () => navigate(paths.login, { replace: true }) })
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to={paths.home} className="text-lg font-bold tracking-tight text-slate-900">
            {env.appName}
          </Link>

          <nav className="flex items-center gap-1">
            {user ? (
              <>
                <NavLink to={paths.dashboard} className={navLinkClass}>
                  Dashboard
                </NavLink>
                <Button variant="ghost" size="sm" onClick={handleLogout} loading={logout.isPending}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <NavLink to={paths.login} className={navLinkClass}>
                  Log in
                </NavLink>
                <Link
                  to={paths.register}
                  className="ml-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
        © {CURRENT_YEAR} {env.appName}. All rights reserved.
      </footer>
    </div>
  )
}
