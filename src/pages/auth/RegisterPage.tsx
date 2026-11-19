import { Link, useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { RegisterForm } from '@/features/auth'

export default function RegisterPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already registered?{' '}
          <Link to={paths.login} className="font-semibold text-brand-600 hover:text-brand-700">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm onSuccess={() => navigate(paths.dashboard, { replace: true })} />
    </AuthLayout>
  )
}
