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
      // Old EuroGrade design pages.
      { path: paths.about, lazy: page(() => import('@/pages/AboutPage')) },
      { path: paths.contact, lazy: page(() => import('@/pages/ContactPage')) },
      { path: paths.blog, lazy: page(() => import('@/pages/BlogPage')) },
      { path: paths.germany, lazy: page(() => import('@/pages/GermanyPage')) },
      { path: paths.italy, lazy: page(() => import('@/pages/ItalyPage')) },
      { path: paths.ielts, lazy: page(() => import('@/pages/IeltsPage')) },
      { path: paths.germanLanguage, lazy: page(() => import('@/pages/GermanLanguagePage')) },
      { path: paths.italianLanguage, lazy: page(() => import('@/pages/ItalianLanguagePage')) },
      { path: paths.attestation, lazy: page(() => import('@/pages/AttestationPage')) },
      { path: paths.meaAttestation, lazy: page(() => import('@/pages/MeaAttestationPage')) },
      // Pages with no old-site counterpart keep the Vistara design.
      { path: paths.blogPost, lazy: page(() => import('@/pages/vistara/BlogPostPage')) },
      { path: paths.testimonials, lazy: page(() => import('@/pages/vistara/TestimonialsPage')) },
      { path: paths.faqs, lazy: page(() => import('@/pages/vistara/FaqsPage')) },
      { path: paths.services, lazy: page(() => import('@/pages/vistara/ServicesPage')) },
      { path: paths.service, lazy: page(() => import('@/pages/vistara/ServiceRoute')) },
      { path: paths.countries, lazy: page(() => import('@/pages/vistara/CountriesPage')) },
      { path: paths.country, lazy: page(() => import('@/pages/vistara/CountryRoute')) },
      // Previous Vistara-design pages, kept intact under /vistara/*.
      { path: '/vistara', lazy: page(() => import('@/pages/vistara/HomeRedirect')) },
      { path: '/vistara/about', lazy: page(() => import('@/pages/vistara/AboutPage')) },
      { path: '/vistara/contact', lazy: page(() => import('@/pages/vistara/ContactPage')) },
      { path: '/vistara/blog', lazy: page(() => import('@/pages/vistara/BlogPage')) },
      { path: '/vistara/blog/:slug', lazy: page(() => import('@/pages/vistara/BlogPostPage')) },
      {
        path: '/vistara/testimonials',
        lazy: page(() => import('@/pages/vistara/TestimonialsPage')),
      },
      { path: '/vistara/faqs', lazy: page(() => import('@/pages/vistara/FaqsPage')) },
      { path: '/vistara/services', lazy: page(() => import('@/pages/vistara/ServicesPage')) },
      { path: '/vistara/services/:slug', lazy: page(() => import('@/pages/vistara/ServicePage')) },
      { path: '/vistara/countries', lazy: page(() => import('@/pages/vistara/CountriesPage')) },
      { path: '/vistara/countries/:slug', lazy: page(() => import('@/pages/vistara/CountryPage')) },
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
  {
    // Admin sign-in. Bare (no sidebar chrome) — AdminGuestRoute keeps a signed-in
    // admin out, but a non-admin session can still see this page to switch accounts.
    errorElement: <RouteErrorPage />,
    children: [
      {
        lazy: async () => ({ Component: (await import('./guards')).AdminGuestRoute }),
        children: [
          { path: paths.adminLogin, lazy: page(() => import('@/pages/admin/AdminLoginPage')) },
        ],
      },
    ],
  },
  {
    // Admin CMS panel. Its layout, guards and forms are all lazy, so none of it
    // (react-hook-form, zod) ever loads on the public marketing pages.
    lazy: async () => ({
      Component: (await import('@/components/layout/AdminLayout')).AdminLayout,
    }),
    errorElement: <RouteErrorPage />,
    children: [
      {
        lazy: async () => ({ Component: (await import('./guards')).AdminRoute }),
        children: [
          {
            path: paths.adminDashboard,
            lazy: page(() => import('@/pages/admin/AdminDashboardPage')),
          },
          { path: paths.adminPosts, lazy: page(() => import('@/pages/admin/PostsListPage')) },
          { path: paths.adminPostNew, lazy: page(() => import('@/pages/admin/PostFormPage')) },
          { path: paths.adminPostEdit, lazy: page(() => import('@/pages/admin/PostFormPage')) },
          { path: paths.adminTeam, lazy: page(() => import('@/pages/admin/TeamListPage')) },
          { path: paths.adminTeamNew, lazy: page(() => import('@/pages/admin/TeamFormPage')) },
          { path: paths.adminTeamEdit, lazy: page(() => import('@/pages/admin/TeamFormPage')) },
          {
            path: paths.adminTestimonials,
            lazy: page(() => import('@/pages/admin/TestimonialsListPage')),
          },
          {
            path: paths.adminTestimonialNew,
            lazy: page(() => import('@/pages/admin/TestimonialFormPage')),
          },
          {
            path: paths.adminTestimonialEdit,
            lazy: page(() => import('@/pages/admin/TestimonialFormPage')),
          },
          {
            path: paths.adminCategories,
            lazy: page(() => import('@/pages/admin/CategoriesPage')),
          },
          { path: paths.adminTags, lazy: page(() => import('@/pages/admin/TagsPage')) },
          {
            path: paths.adminComments,
            lazy: page(() => import('@/pages/admin/CommentsPage')),
          },
          { path: paths.adminMessages, lazy: page(() => import('@/pages/admin/MessagesPage')) },
          {
            path: paths.adminSubscribers,
            lazy: page(() => import('@/pages/admin/SubscribersPage')),
          },
        ],
      },
    ],
  },
])
