import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router'
import footerBg from '@/assets/images/backgrounds/footer-bg.webp'
import { Logo } from '@/components/brand/Logo'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { env } from '@/config/env'
import { footerColumns, legalLinks } from '@/config/site'
import { useContact, useSocials } from '@/features/site-settings'
import { NewsletterForm } from './NewsletterForm'

const CURRENT_YEAR = new Date().getFullYear()

export function SiteFooter() {
  const contact = useContact()
  const socials = useSocials()
  // Each item can show several lines (both office numbers, weekday + Saturday hours).
  const contactItems: {
    icon: LucideIcon
    label: string
    lines: { text: string; href?: string }[]
  }[] = [
    {
      icon: Phone,
      label: 'Call Us on',
      lines: [
        { text: contact.phone, href: contact.phoneHref },
        ...(contact.phoneAlt ? [{ text: contact.phoneAlt, href: contact.phoneAltHref }] : []),
      ],
    },
    { icon: Mail, label: 'Reach out', lines: [{ text: contact.email, href: contact.emailHref }] },
    { icon: MapPin, label: 'Location', lines: [{ text: contact.address }] },
    {
      icon: Clock,
      label: 'Working Hours',
      lines: [
        { text: contact.hours },
        ...(contact.hoursWeekend ? [{ text: contact.hoursWeekend }] : []),
      ],
    },
  ]

  return (
    <footer
      className="relative overflow-hidden bg-ink bg-size-[100%_auto] bg-bottom bg-no-repeat text-white"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="container-site">
        {/* Brand + newsletter */}
        <div className="grid gap-10 border-b border-line-light py-14 lg:grid-cols-[1fr_auto] lg:py-16 xl:grid-cols-2">
          <div className="max-w-[560px]">
            <Logo tone="light" textClassName="text-[32px] xl:text-[38px]" />
            <p className="mt-6 text-white">
              Connecting students with top public universities in Germany and Italy, making quality
              education abroad affordable and stress-free.
            </p>
          </div>
          <div>
            <h2 className="text-title text-white">Ready To Start Your Global Journey?</h2>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-lg font-bold text-white uppercase">{column.title}</h2>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-3 transition-colors hover:text-brand-500"
                    >
                      <span
                        aria-hidden="true"
                        className="size-[5px] rounded-full bg-brand-600 transition-transform group-hover:scale-150"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-lg font-bold text-white uppercase">Contact Informations</h2>
            <ul className="mt-6 space-y-5">
              {contactItems.map(({ icon: Icon, label, lines }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-brand-600">
                    <Icon aria-hidden="true" className="size-[18px]" />
                  </span>
                  <span className="text-[15px] leading-snug">
                    <span className="block text-white/90">{label}</span>
                    {lines.map(({ text, href }) =>
                      href ? (
                        <a
                          key={text}
                          href={href}
                          className="block leading-6 font-bold transition-colors hover:text-brand-500"
                        >
                          {text}
                        </a>
                      ) : (
                        <span key={text} className="block font-bold">
                          {text}
                        </span>
                      ),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-6 border-t border-line-light py-8 text-[15px] lg:flex-row lg:justify-between">
          <p>
            © {CURRENT_YEAR} {env.appName}. All Rights Reserved.
          </p>
          <ul className="flex items-center gap-3" aria-label="Social media">
            {socials.map((s) => (
              <li key={s.network}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-10 items-center justify-center rounded-full bg-brand-600 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-brand-600"
                >
                  <SocialIcon network={s.network} className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap items-center justify-center divide-x divide-line-light">
            {legalLinks.map((link) => (
              <li key={link.label} className="px-3 last:pr-0">
                <Link to={link.href} className="transition-colors hover:text-brand-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
