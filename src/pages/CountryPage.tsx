import { useParams } from 'react-router'
import bannerImg from '@/assets/images/about/banner-img.webp'
import { paths } from '@/app/router/paths'
import { ContentError, PageBanner } from '@/components/marketing'
import { CountryDetailSkeleton, CountryDetailView, useCountry } from '@/features/countries'
import { useMetaDescription } from '@/hooks/useMetaDescription'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api/errors'
import NotFoundPage from '@/pages/NotFoundPage'

const countriesCrumb = { label: 'Countries', href: paths.countries }

export default function CountryPage() {
  const { slug = '' } = useParams()
  const { data: country, isPending, isError, error, refetch } = useCountry(slug)
  usePageTitle(country?.meta.title ?? 'Countries')
  useMetaDescription(country?.meta.description ?? undefined)

  if (isError && error instanceof ApiError && error.status === 404) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageBanner
        title={country?.name ?? 'Countries'}
        image={country?.banner_image_url ?? bannerImg}
        breadcrumbs={country ? [countriesCrumb, { label: country.name }] : [{ label: 'Countries' }]}
      />
      {isPending ? (
        <CountryDetailSkeleton />
      ) : isError ? (
        <div className="bg-surface section-y">
          <ContentError what="country" onRetry={() => void refetch()} className="container-site" />
        </div>
      ) : (
        // Keyed by slug so switching countries resets accordion state.
        <CountryDetailView key={country.slug} country={country} />
      )}
    </>
  )
}
