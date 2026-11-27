import { paths } from '@/app/router/paths'
import { Logo } from '@/components/brand/Logo'
import { PillLink } from '@/components/marketing'
import { mainNav } from '@/config/site'
import { useScrollY } from '@/hooks/useScrollY'
import { cn } from '@/lib/cn'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
import { TopBar } from './TopBar'

const STICKY_AFTER = 260

/**
 * Top bar + main navigation. Once the user scrolls past the header, the nav bar
 * becomes fixed and slides down from the top. A spacer keeps layout from jumping.
 */
export function SiteHeader() {
  const isSticky = useScrollY((y) => y > STICKY_AFTER)

  return (
    <header>
      <TopBar />
      <div className="h-[76px] lg:h-[90px]">
        <div
          className={cn(
            'z-30 w-full bg-white',
            isSticky
              ? 'animate-header-in fixed inset-x-0 top-0 shadow-[0_10px_30px_-12px_color-mix(in_srgb,var(--color-ink)_18%,transparent)]'
              : 'relative',
          )}
        >
          <div className="container-site flex h-[76px] items-center justify-between gap-6 lg:h-[90px]">
            <Logo />
            <DesktopNav items={mainNav} />
            <div className="flex items-center gap-3">
              <div className="hidden xl:block">
                <PillLink to={paths.eligibility} className="whitespace-nowrap">
                  Request a call
                </PillLink>
              </div>
              <MobileNav items={mainNav} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
