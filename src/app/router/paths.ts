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
  // Old EuroGrade design pages.
  germany: '/germany',
  italy: '/italy',
  ielts: '/ielts',
  germanLanguage: '/german-language',
  italianLanguage: '/italian-language',
  attestation: '/attestation-services',
  meaAttestation: '/mea-attestation',
  /** Prefix under which the previous (Vistara-design) pages stay reachable. */
  vistara: '/vistara',
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

  // Admin CMS panel.
  adminLogin: '/admin/login',
  adminDashboard: '/admin',
  adminPosts: '/admin/posts',
  adminPostNew: '/admin/posts/new',
  /** Route pattern; build links with `adminPostEditHref(id)`. */
  adminPostEdit: '/admin/posts/:id/edit',
  adminTeam: '/admin/team',
  adminTeamNew: '/admin/team/new',
  /** Route pattern; build links with `adminTeamEditHref(id)`. */
  adminTeamEdit: '/admin/team/:id/edit',
  adminTestimonials: '/admin/testimonials',
  adminTestimonialNew: '/admin/testimonials/new',
  /** Route pattern; build links with `adminTestimonialEditHref(id)`. */
  adminTestimonialEdit: '/admin/testimonials/:id/edit',
  adminCategories: '/admin/categories',
  adminTags: '/admin/tags',
  adminComments: '/admin/comments',
  adminMessages: '/admin/messages',
  adminSubscribers: '/admin/subscribers',
} as const

export const adminPostEditHref = (id: number) => `/admin/posts/${id}/edit`
export const adminTeamEditHref = (id: number) => `/admin/team/${id}/edit`
export const adminTestimonialEditHref = (id: number) => `/admin/testimonials/${id}/edit`
