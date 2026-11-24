import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useCurrentUser, useLogout } from '@/features/auth'
import { paths } from './paths'

/** Only signed-in users; others are sent to login and returned afterwards. */
export function ProtectedRoute() {
  const { data: user, isPending } = useCurrentUser()
  const location = useLocation()

  if (isPending) return <FullPageSpinner />
  if (!user) return <Navigate to={paths.login} replace state={{ from: location }} />

  return <Outlet />
}

/** Only guests (login/register); signed-in users go to the dashboard. */
export function GuestRoute() {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) return <FullPageSpinner />
  if (user) return <Navigate to={paths.dashboard} replace />

  return <Outlet />
}

/**
 * Only admins. A signed-in user without `is_admin` is signed out immediately,
 * so a non-admin session never silently grants access to the CMS panel.
 */
export function AdminRoute() {
  const { data: user, isPending } = useCurrentUser()
  const logout = useLogout()
  const location = useLocation()

  useEffect(() => {
    if (user && !user.is_admin) logout.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (isPending) return <FullPageSpinner />
  if (!user || !user.is_admin) {
    return (
      <Navigate
        to={paths.adminLogin}
        replace
        state={user ? { notAuthorized: true } : { from: location }}
      />
    )
  }

  return <Outlet />
}

/** Only non-admins/guests; signed-in admins go straight to the dashboard. */
export function AdminGuestRoute() {
  const { data: user, isPending } = useCurrentUser()

  if (isPending) return <FullPageSpinner />
  if (user?.is_admin) return <Navigate to={paths.adminDashboard} replace />

  return <Outlet />
}
