import { paths } from '@/app/router/paths'

/**
 * Site-wide marketing configuration: contact details, navigation and footer links.
 * Keep copy here (not in components) so it can later be served by the CMS/API.
 */

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

/**
 * Office details, as published on eurogrades.com.
 * Fallback only: components read the live values from `GET /site-settings` via
 * `useContact()` (features/site-settings); these are shown until that loads.
 */
export const contact = {
  phone: '+44 20 4154 2541',
  phoneHref: 'tel:+442041542541',
  phoneAlt: '+44 20 4154 2542',
  email: 'contact@eurorank.com',
  emailHref: 'mailto:contact@eurorank.com',
  address: '128A, Sewak Park, Uttam Nagar, New Delhi 110059, India',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
  hoursWeekend: 'Saturday: 9:00 AM – 4:00 PM',
} as const

export type SocialNetwork = 'facebook' | 'instagram' | 'x' | 'youtube'

/** Accessible names for each network's icon link. */
export const socialLabels: Record<SocialNetwork, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  x: 'X (Twitter)',
  youtube: 'YouTube',
}

export interface SocialLink {
  network: SocialNetwork
  label: string
  href: string
}

/** Fallback social profiles (live values: `useSocials()` from features/site-settings). */
export const socials: SocialLink[] = [
  { network: 'facebook', label: 'Facebook', href: 'https://facebook.com' },
  { network: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { network: 'x', label: 'X (Twitter)', href: 'https://x.com' },
  { network: 'youtube', label: 'YouTube', href: 'https://youtube.com' },
]

/** Headlines scrolling in the top bar "Trending" ticker (from the old site). */
export const trendingNews: string[] = [
  'India Today – Why is Italy becoming the preferred study abroad destination',
]

export const mainNav: NavItem[] = [
  {
    label: 'Countries',
    href: paths.germany,
    children: [
      { label: 'Germany', href: paths.germany },
      { label: 'Italy', href: paths.italy },
    ],
  },
  {
    label: 'Test Prep',
    href: paths.ielts,
    children: [{ label: 'IELTS', href: paths.ielts }],
  },
  {
    label: 'Language School',
    href: paths.germanLanguage,
    children: [
      { label: 'German', href: paths.germanLanguage },
      { label: 'Italian', href: paths.italianLanguage },
    ],
  },
  { label: 'About Us', href: paths.about },
  {
    label: 'Attestation Services',
    href: paths.attestation,
    children: [
      { label: 'Attestation Services', href: paths.attestation },
      { label: 'MEA Attestation', href: paths.meaAttestation },
    ],
  },
  { label: 'Blogs', href: paths.blog },
  { label: 'Contact Us', href: paths.contact },
]

/** Children of the main-nav group with this label (keeps the footer in sync with the header). */
const navChildren = (label: string): NavItem[] =>
  mainNav.find((item) => item.label === label)?.children ?? []

/** Footer link columns, built from `mainNav` so both always list the same pages. */
export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: paths.home },
      ...mainNav.filter((item) => !item.children).map(({ label, href }) => ({ label, href })),
    ],
  },
  {
    title: 'Countries & Test Prep',
    links: [
      ...navChildren('Countries').map((l) => ({ ...l, label: `Study in ${l.label}` })),
      ...navChildren('Test Prep').map((l) => ({ ...l, label: `${l.label} Preparation` })),
    ],
  },
  {
    title: 'Language & Attestation',
    links: [
      ...navChildren('Language School').map((l) => ({ ...l, label: `${l.label} Language Course` })),
      ...navChildren('Attestation Services'),
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy Policy', href: paths.privacy },
  { label: 'Terms & Conditions', href: paths.terms },
  { label: 'Cookie Policy', href: paths.cookies },
]
