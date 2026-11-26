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
  email: 'contact@eurogrades.com',
  emailHref: 'mailto:contact@eurogrades.com',
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

export const mainNav: NavItem[] = [
  { label: 'Home', href: paths.home },
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

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: paths.home },
      { label: 'About us', href: paths.about },
      { label: 'Our Services', href: paths.services },
      { label: 'Latest Blogs', href: paths.blog },
      { label: 'Contact Us', href: paths.contact },
    ],
  },
  {
    // Replaced at runtime by the active services from the API (see SiteFooter).
    title: 'Our Services',
    links: [
      { label: 'Study in Germany', href: `${paths.services}/study-in-germany` },
      { label: 'Study in Italy', href: `${paths.services}/study-in-italy` },
      { label: 'IELTS Preparation', href: `${paths.services}/ielts-preparation` },
      { label: 'German Language Course', href: `${paths.services}/german-language-course` },
      { label: 'Italian Language Course', href: `${paths.services}/italian-language-course` },
      { label: 'Attestation Services', href: `${paths.services}/attestation-services` },
    ],
  },
  {
    title: 'Popular Study Cities',
    links: [
      { label: 'Munich, Germany', href: `${paths.countries}/germany` },
      { label: 'Berlin, Germany', href: `${paths.countries}/germany` },
      { label: 'Frankfurt, Germany', href: `${paths.countries}/germany` },
      { label: 'Rome, Italy', href: `${paths.countries}/italy` },
      { label: 'Milan, Italy', href: `${paths.countries}/italy` },
      { label: 'Bologna, Italy', href: `${paths.countries}/italy` },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy Policy', href: paths.privacy },
  { label: 'Terms & Conditions', href: paths.terms },
  { label: 'Cookie Policy', href: paths.cookies },
]
