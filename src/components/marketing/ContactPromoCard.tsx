import sidebarBg from '@/assets/images/shared/sidebar-bg.webp'
import { useContact } from '@/features/site-settings'
import { cn } from '@/lib/cn'
import { PillLink } from './PillLink'

const defaults = {
  title: 'Contact Us Today!',
  text: 'Get in touch with our expert counselors today for personalized guidance, quick support, and complete assistance with your study abroad plans.',
}

/** Sidebar photo card ("Contact Us Today!") with a dark fade and a call button. */
export function ContactPromoCard({
  title = defaults.title,
  text = defaults.text,
  className,
}: {
  title?: string
  text?: string
  className?: string
}) {
  const contact = useContact()

  return (
    <aside
      aria-label="Contact us"
      className={cn(
        'relative isolate flex min-h-[480px] flex-col justify-end overflow-hidden rounded-2xl',
        'bg-[#e6eaf3] bg-cover bg-top p-6 text-white sm:min-h-[550px] sm:p-10',
        className,
      )}
      style={{ backgroundImage: `url(${sidebarBg})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-30% via-ink/70 via-60% to-ink"
      />
      <h2 className="text-xl font-bold text-white xl:text-[22px]">{title}</h2>
      <p className="mt-3 text-white/90">{text}</p>
      <hr className="my-8 border-line-light" />
      <PillLink to={contact.phoneHref} className="self-start">
        Call: {contact.phone}
      </PillLink>
    </aside>
  )
}
