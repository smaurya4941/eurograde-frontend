import { ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { Logo } from '@/components/brand/Logo'
import { SocialIcon } from '@/components/icons/SocialIcon'
import { PillLink } from '@/components/marketing'
import { paths } from '@/app/router/paths'
import type { NavItem } from '@/config/site'
import { useContact, useSocials } from '@/features/site-settings'
import { cn } from '@/lib/cn'

/** Hamburger button + slide-in drawer navigation (below lg). */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const drawerId = useId()
  const contact = useContact()
  const socials = useSocials()
  const close = () => setOpen(false)

  // Lock page scroll and allow Escape to close while the drawer is open.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-ink"
      >
        <Menu aria-hidden="true" className="size-5" />
      </button>

      {/* Backdrop (the blur only applies while open: a full-screen backdrop filter is costly) */}
      <div
        aria-hidden="true"
        onClick={close}
        className={cn(
          'fixed inset-0 z-40 bg-ink/60 transition-opacity duration-300',
          open ? 'opacity-100 backdrop-blur-sm' : 'pointer-events-none opacity-0',
        )}
      />

      <aside
        id={drawerId}
        aria-label="Mobile navigation"
        inert={!open}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col overflow-y-auto bg-white shadow-2xl',
          // Skips layout/paint of the drawer while it sits off-screen (closed).
          '[content-visibility:auto]',
          'transition-transform duration-400 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <Logo imageClassName="h-9" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="flex size-10 items-center justify-center rounded-full bg-surface text-ink transition-colors hover:bg-brand-600 hover:text-white"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Main" className="flex-1 px-5 py-4">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const isExpanded = expanded === item.label
              return (
                <li key={item.label}>
                  <div className="flex items-center justify-between">
                    <NavLink
                      to={item.href}
                      end={item.href === '/'}
                      onClick={close}
                      className={({ isActive }) =>
                        cn('flex-1 py-3.5 font-semibold', isActive ? 'text-brand-600' : 'text-ink')
                      }
                    >
                      {item.label}
                    </NavLink>
                    {item.children && (
                      <button
                        type="button"
                        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.label}`}
                        aria-expanded={isExpanded}
                        onClick={() => setExpanded(isExpanded ? null : item.label)}
                        className="flex size-9 items-center justify-center rounded-full bg-surface text-ink"
                      >
                        <ChevronDown
                          aria-hidden="true"
                          className={cn('size-4 transition-transform', isExpanded && 'rotate-180')}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <div
                      className={cn(
                        'grid transition-[grid-template-rows] duration-300',
                        isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                      )}
                    >
                      <ul className="overflow-hidden" inert={!isExpanded}>
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              to={child.href}
                              onClick={close}
                              className="block py-2 pl-4 text-[15px] text-body hover:text-brand-600"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="space-y-4 border-t border-line px-5 py-6">
          <PillLink to={paths.eligibility} className="w-full justify-center">
            Free Eligibility Check
          </PillLink>
          <p className="text-sm">
            <a href={contact.phoneHref} className="font-semibold text-ink">
              {contact.phone}
            </a>
            <br />
            <a href={contact.emailHref}>{contact.email}</a>
          </p>
          <ul className="flex gap-3">
            {socials.map((s) => (
              <li key={s.network}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full bg-brand-600 text-white"
                >
                  <SocialIcon network={s.network} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}
