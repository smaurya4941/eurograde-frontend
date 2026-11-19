import { Link } from 'react-router'
import { paths } from '@/app/router/paths'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-4 text-slate-600">The page you are looking for does not exist.</p>
      <Link
        to={paths.home}
        className="mt-8 inline-block font-semibold text-brand-600 hover:text-brand-700"
      >
        ← Back home
      </Link>
    </div>
  )
}
