/** Single source of truth for route paths. Never hard-code URLs in components. */
export const paths = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',

  // Marketing site (pages are being built one at a time; until then they fall through to 404).
  about: '/about',
  services: '/services',
  /** Route pattern; build links with `serviceHref(slug)`. */
  service: '/services/:slug',
  countries: '/countries',
  /** Route pattern; build links with `countryHref(slug)`. */
  country: '/countries/:slug',
  blog: '/blog',
  /** Route pattern; build links with `blogPostHref(slug)`. */
  blogPost: '/blog/:slug',
  team: '/team',
  testimonials: '/testimonials',
  faqs: '/faqs',
  gallery: '/gallery',
  contact: '/contact',
  eligibility: '/contact#eligibility',
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  cookies: '/cookie-policy',
} as const
