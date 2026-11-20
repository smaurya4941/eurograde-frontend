import type { ComponentType } from 'react'
import { createBrowserRouter } from 'react-router'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { RouteErrorPage } from '@/pages/RouteErrorPage'
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
      { path: paths.testimonials, lazy: page(() => import('@/pages/TestimonialsPage')) },
      { path: paths.faqs, lazy: page(() => import('@/pages/FaqsPage')) },
      { path: paths.services, lazy: page(() => import('@/pages/ServicesPage')) },
      { path: paths.service, lazy: page(() => import('@/pages/ServicePage')) },
      { path: paths.countries, lazy: page(() => import('@/pages/CountriesPage')) },
      { path: paths.country, lazy: page(() => import('@/pages/CountryPage')) },
      { path: paths.contact, lazy: page(() => import('@/pages/ContactPage')) },
      // Unknown URLs get the 404 page inside the normal site header/footer.
      { path: '*', lazy: page(() => import('@/pages/NotFoundPage')) },
    ],
  },
  {
    // Application (auth + dashboard). Its layout and guards are lazy too, so the auth forms
    // (react-hook-form + zod) never load on the public marketing pages.
    lazy: async () => ({ Component: (await import('@/components/layout/RootLayout')).RootLayout }),
    errorElement: <RouteErrorPage />,
    children: [
      {
        lazy: async () => ({ Component: (await import('./guards')).GuestRoute }),
        children: [
          { path: paths.login, lazy: page(() => import('@/pages/auth/LoginPage')) },
          { path: paths.register, lazy: page(() => import('@/pages/auth/RegisterPage')) },
        ],
      },
      {
        lazy: async () => ({ Component: (await import('./guards')).ProtectedRoute }),
        children: [{ path: paths.dashboard, lazy: page(() => import('@/pages/DashboardPage')) }],
      },
    ],
  },
])
