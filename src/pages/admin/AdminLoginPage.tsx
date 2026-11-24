import { useLocation, useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Alert } from '@/components/ui/Alert'
import { LoginForm } from '@/features/auth'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function AdminLoginPage() {
  usePageTitle('Admin Sign In')
  const navigate = useNavigate()
  const location = useLocation()
  const notAuthorized = (location.state as { notAuthorized?: boolean } | null)?.notAuthorized

  return (
    <AuthLayout title="Admin sign in">
      {notAuthorized && (
        <Alert variant="error">That account does not have access to the admin panel.</Alert>
      )}
      <div className={notAuthorized ? 'mt-5' : undefined}>
        <LoginForm onSuccess={() => navigate(paths.adminDashboard, { replace: true })} />
      </div>
    </AuthLayout>
  )
}
