import type { ReactNode } from 'react'
import { Navigate, useParams } from 'react-router'
import { paths } from './paths'

/** Service/country slugs that have a dedicated page in the EuroRank (old) design. */
const dedicatedPages: Record<string, string> = {
  'study-in-germany': paths.germany,
  germany: paths.germany,
  'study-in-italy': paths.italy,
  italy: paths.italy,
  'ielts-preparation': paths.ielts,
  'german-language-course': paths.germanLanguage,
  'italian-language-course': paths.italianLanguage,
  'attestation-services': paths.attestation,
}

/**
 * `/services/:slug` and `/countries/:slug` links (home page, footer, API data) keep working:
 * slugs with a dedicated page redirect to it, everything else renders the Vistara detail page.
 */
export function SlugRedirect({ fallback }: { fallback: ReactNode }) {
  const { slug = '' } = useParams()
  const target = dedicatedPages[slug]
  return target ? <Navigate to={target} replace /> : <>{fallback}</>
}
