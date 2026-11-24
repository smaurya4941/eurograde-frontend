import { Plus, SquarePen, Trash2 } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { adminTestimonialEditHref, paths } from '@/app/router/paths'
import { DataTable } from '@/components/admin/DataTable'
import { Pagination } from '@/components/marketing'
import {
  testimonialCategoryLabels,
  useAdminTestimonials,
  useDeleteAdminTestimonial,
  type AdminTestimonial,
} from '@/features/admin-testimonials'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function TestimonialsListPage() {
  usePageTitle('Testimonials')
  const [params] = useSearchParams()
  const page = Number.parseInt(params.get('page') ?? '1', 10) || 1
  const testimonials = useAdminTestimonials({ page })
  const remove = useDeleteAdminTestimonial()

  const handleDelete = (testimonial: AdminTestimonial) => {
    if (confirm(`Delete the testimonial from "${testimonial.name}"?`)) remove.mutate(testimonial.id)
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Testimonials</h1>
        <Link
          to={paths.adminTestimonialNew}
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        >
          <Plus className="size-4" aria-hidden="true" />
          New testimonial
        </Link>
      </div>

      <DataTable
        isLoading={testimonials.isPending}
        rows={testimonials.data?.testimonials ?? []}
        rowKey={(testimonial) => testimonial.id}
        emptyMessage="No testimonials yet."
        columns={[
          { header: 'Name', render: (testimonial) => testimonial.name },
          {
            header: 'Category',
            render: (testimonial) => testimonialCategoryLabels[testimonial.category],
          },
          {
            header: 'Featured',
            render: (testimonial) => (testimonial.is_featured ? 'Yes' : 'No'),
          },
          {
            header: 'Status',
            render: (testimonial) =>
              testimonial.is_active ? (
                <span className="text-emerald-700">Visible</span>
              ) : (
                <span className="text-slate-500">Hidden</span>
              ),
          },
          {
            header: '',
            className: 'px-4 py-3 text-right',
            render: (testimonial) => (
              <div className="flex justify-end gap-2">
                <Link
                  to={adminTestimonialEditHref(testimonial.id)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50"
                >
                  <SquarePen className="size-4" aria-hidden="true" />
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(testimonial)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      {testimonials.data && (
        <Pagination
          className="mt-6"
          currentPage={testimonials.data.meta.current_page}
          lastPage={testimonials.data.meta.last_page}
          hrefForPage={(target) =>
            target > 1 ? `${paths.adminTestimonials}?page=${target}` : paths.adminTestimonials
          }
        />
      )}
    </div>
  )
}
