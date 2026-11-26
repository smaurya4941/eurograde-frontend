import { SlugRedirect } from '@/app/router/ServiceRedirect'
import ServicePage from './ServicePage'

/** `/services/:slug`: dedicated old-design page when one exists, else the Vistara detail page. */
export default function ServiceRoute() {
  return <SlugRedirect fallback={<ServicePage />} />
}
