import { SlugRedirect } from '@/app/router/ServiceRedirect'
import CountryPage from './CountryPage'

/** `/countries/:slug`: Germany/Italy go to the old-design pages, else the Vistara detail page. */
export default function CountryRoute() {
  return <SlugRedirect fallback={<CountryPage />} />
}
