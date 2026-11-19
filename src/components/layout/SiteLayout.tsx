import { Outlet, ScrollRestoration } from 'react-router'
import { BackToTop } from './site/BackToTop'
import { MagicCursor } from './site/MagicCursor'
import { SiteFooter } from './site/SiteFooter'
import { SiteHeader } from './site/SiteHeader'

/** Public marketing layout: top bar, sticky header, page content, footer. */
export function SiteLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-brand-600 px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />
      <MagicCursor />
      <ScrollRestoration />
    </div>
  )
}
