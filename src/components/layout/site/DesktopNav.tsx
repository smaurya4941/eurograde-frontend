import { ChevronDown } from 'lucide-react'
import { NavLink } from 'react-router'
import type { NavItem } from '@/config/site'
import { cn } from '@/lib/cn'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'inline-flex items-center gap-1 py-[33px] text-[15px] font-medium whitespace-nowrap transition-colors duration-300 xl:text-base',
    isActive ? 'text-brand-600' : 'text-ink hover:text-brand-600',
  )

/** Horizontal primary navigation with hover/focus dropdowns (lg and up). */
export function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <nav aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-4 xl:gap-[26px]">
        {items.map((item) => (
          <li key={item.label} className="group/item relative">
            <NavLink to={item.href} end={item.href === '/'} className={linkClass}>
              {item.label}
              {item.children && (
                <ChevronDown
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover/item:rotate-180"
                />
              )}
            </NavLink>

            {item.children && (
              <ul
                className={cn(
                  'invisible absolute top-full left-0 z-20 min-w-[230px] translate-y-4 rounded-2xl bg-white p-3 opacity-0 shadow-card',
                  'border-t-2 border-brand-600 transition-all duration-300',
                  'group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100',
                  'group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100',
                )}
              >
                {item.children.map((child) => (
                  <li key={child.label}>
                    <NavLink
                      to={child.href}
                      className={cn(
                        'block rounded-lg px-4 py-2.5 text-[15px] font-medium text-ink transition-all duration-300',
                        'hover:bg-surface hover:pl-5 hover:text-brand-600',
                      )}
                    >
                      {child.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
