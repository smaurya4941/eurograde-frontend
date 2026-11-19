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
  email: 'contact@eurogrades.com',
  emailHref: 'mailto:contact@eurogrades.com',
  address: '128A, Sewak Park, Uttam Nagar, New Delhi 110059, India',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM',
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
  { label: 'About us', href: paths.about },
  { label: 'Our Services', href: paths.services },
  {
    label: 'Countries',
    href: paths.countries,
    children: [
      { label: 'All Countries', href: paths.countries },
      { label: 'Study in Germany', href: `${paths.countries}/germany` },
      { label: 'Study in Italy', href: `${paths.countries}/italy` },
    ],
  },
  {
    label: 'Blog',
    href: paths.blog,
    children: [
      { label: 'Latest Articles', href: paths.blog },
      { label: 'Student Visa', href: `${paths.blog}?category=student-visa` },
      { label: 'Immigration Tips', href: `${paths.blog}?category=immigration-tips` },
    ],
  },
  {
    label: 'Pages',
    href: paths.team,
    children: [
      { label: 'Our Team', href: paths.team },
      { label: 'Testimonials', href: paths.testimonials },
      { label: 'FAQs', href: paths.faqs },
      { label: 'Image Gallery', href: paths.gallery },
    ],
  },
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
    title: 'Our Services',
    links: [
      { label: 'Study in Germany', href: paths.services },
      { label: 'Study in Italy', href: paths.services },
      { label: 'IELTS Preparation', href: paths.services },
      { label: 'German Language Course', href: paths.services },
      { label: 'Italian Language Course', href: paths.services },
      { label: 'Attestation Services', href: paths.services },
    ],
  },
  {
    title: 'Popular Study Cities',
    links: [
      { label: 'Munich, Germany', href: paths.countries },
      { label: 'Berlin, Germany', href: paths.countries },
      { label: 'Frankfurt, Germany', href: paths.countries },
      { label: 'Rome, Italy', href: paths.countries },
      { label: 'Milan, Italy', href: paths.countries },
      { label: 'Bologna, Italy', href: paths.countries },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy Policy', href: paths.privacy },
  { label: 'Terms & Conditions', href: paths.terms },
  { label: 'Cookie Policy', href: paths.cookies },
]
