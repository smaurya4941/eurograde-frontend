import { Link, useLocation, useNavigate, type Location } from 'react-router'
import { paths } from '@/app/router/paths'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { LoginForm } from '@/features/auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: Location } | null)?.from?.pathname ?? paths.dashboard

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          New here?{' '}
          <Link to={paths.register} className="font-semibold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm onSuccess={() => navigate(from, { replace: true })} />
    </AuthLayout>
  )
}
