import { Navigate, Outlet, useLocation } from 'react-router'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useCurrentUser } from '@/features/auth'
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
