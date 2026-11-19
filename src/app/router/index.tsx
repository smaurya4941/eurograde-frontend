import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/components/layout/RootLayout'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
import { GuestRoute, ProtectedRoute } from './guards'
import { paths } from './paths'

// Pages are lazy-loaded so each route ships as its own chunk.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
})

export const router = createBrowserRouter([
  {
    // Public marketing site.
    Component: SiteLayout,
    errorElement: <RouteErrorPage />,
    children: [
      { path: paths.home, lazy: page(() => import('@/pages/HomePage')) },
      { path: paths.about, lazy: page(() => import('@/pages/AboutPage')) },
      { path: paths.blog, lazy: page(() => import('@/pages/BlogPage')) },
      { path: paths.blogPost, lazy: page(() => import('@/pages/BlogPostPage')) },
      { path: paths.contact, lazy: page(() => import('@/pages/ContactPage')) },
    ],
  },
  {
    // Application (auth + dashboard).
    Component: RootLayout,
    errorElement: <RouteErrorPage />,
    children: [
      {
        Component: GuestRoute,
        children: [
          { path: paths.login, lazy: page(() => import('@/pages/auth/LoginPage')) },
          { path: paths.register, lazy: page(() => import('@/pages/auth/RegisterPage')) },
        ],
      },
      {
        Component: ProtectedRoute,
        children: [{ path: paths.dashboard, lazy: page(() => import('@/pages/DashboardPage')) }],
      },
      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
])
