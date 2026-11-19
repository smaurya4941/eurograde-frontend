import { Clock, Mail, Phone } from 'lucide-react'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { contact, socials } from '@/config/site'

/** Slim navy contact strip above the main navigation (hidden on small screens). */
export function TopBar() {
  return (
    <div className="hidden bg-ink text-white md:block">
      <div className="container-site flex h-[45px] items-center justify-between text-[15px]">
        <ul className="flex items-center divide-x divide-line-light">
          <li className="pr-4">
            <a
              href={contact.phoneHref}
              className="flex items-center gap-2.5 transition-colors hover:text-brand-500"
            >
              <Phone aria-hidden="true" className="size-4 fill-current" strokeWidth={0} />
              {contact.phone}
            </a>
          </li>
          <li className="px-4">
            <a
              href={contact.emailHref}
              className="flex items-center gap-2.5 transition-colors hover:text-brand-500"
            >
              <Mail aria-hidden="true" className="size-4" />
              {contact.email}
            </a>
          </li>
          <li className="hidden items-center gap-2.5 pl-4 lg:flex">
            <Clock aria-hidden="true" className="size-4" />
            {contact.hours.replace('–', '-')}
          </li>
        </ul>

        <ul className="flex items-center gap-4" aria-label="Social media">
          {socials.map((s) => (
            <li key={s.network}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="block transition-colors hover:text-brand-500"
              >
                <SocialIcon network={s.network} className="size-[17px]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
