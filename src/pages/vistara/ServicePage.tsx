import { useParams } from 'react-router'
import bannerImg from '@/assets/images/about/banner-img.webp'
import { paths } from '@/app/router/paths'
import { ContentError, PageBanner } from '@/components/marketing'
import { ServiceDetailSkeleton, ServiceDetailView, useService } from '@/features/services'
import { useMetaDescription } from '@/hooks/useMetaDescription'
import { usePageTitle } from '@/hooks/usePageTitle'
import { ApiError } from '@/lib/api/errors'
import NotFoundPage from '@/pages/NotFoundPage'

const servicesCrumb = { label: 'Our Services', href: paths.services }

export default function ServicePage() {
  const { slug = '' } = useParams()
  const { data: service, isPending, isError, error, refetch } = useService(slug)
  usePageTitle(service?.meta.title ?? 'Our Services')
  useMetaDescription(service?.meta.description ?? undefined)

  if (isError && error instanceof ApiError && error.status === 404) {
    return <NotFoundPage />
  }

  return (
    <>
      <PageBanner
        title={service?.title ?? 'Our Services'}
        image={service?.banner_image_url ?? bannerImg}
        breadcrumbs={
          service ? [servicesCrumb, { label: service.title }] : [{ label: 'Our Services' }]
        }
      />
      {isPending ? (
        <ServiceDetailSkeleton />
      ) : isError ? (
        <div className="bg-surface section-y">
          <ContentError what="service" onRetry={() => void refetch()} className="container-site" />
        </div>
      ) : (
        // Keyed by slug so switching services resets accordion and lightbox state.
        <ServiceDetailView key={service.slug} service={service} />
      )}
    </>
  )
}
