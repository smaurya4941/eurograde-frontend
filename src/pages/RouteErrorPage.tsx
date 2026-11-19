import { isRouteErrorResponse, useRouteError } from 'react-router'

/** Catches render/loader errors anywhere in the route tree. */
export function RouteErrorPage() {
  const error = useRouteError()

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'Unknown error'

  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
      {import.meta.env.DEV && <p className="mt-4 font-mono text-sm text-red-600">{message}</p>}
      <a href="/" className="mt-8 inline-block font-semibold text-brand-600 hover:text-brand-700">
        Reload the app
      </a>
    </div>
  )
}
