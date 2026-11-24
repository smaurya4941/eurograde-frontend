import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { applyServerErrors } from '@/lib/forms'
import { useCreateAdminTestimonial, useUpdateAdminTestimonial } from '../hooks'
import {
  testimonialFormSchema,
  type TestimonialFormInput,
  type TestimonialFormValues,
} from '../schemas'
import { testimonialCategoryLabels, type AdminTestimonial } from '../types'

interface TestimonialFormProps {
  testimonial?: AdminTestimonial
}

export function TestimonialForm({ testimonial }: TestimonialFormProps) {
  const navigate = useNavigate()
  const create = useCreateAdminTestimonial()
  const update = useUpdateAdminTestimonial(testimonial?.id ?? 0)
  const [formError, setFormError] = useState<string | null>(null)
  const [avatar, setAvatar] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TestimonialFormValues, unknown, TestimonialFormInput>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: testimonial?.name ?? '',
      slug: testimonial?.slug ?? '',
      category: testimonial?.category ?? 'admissions',
      program: testimonial?.program ?? '',
      origin: testimonial?.origin ?? '',
      destination: testimonial?.destination ?? '',
      achievement: testimonial?.achievement ?? '',
      quote: testimonial?.quote ?? '',
      rating: testimonial?.rating ?? 5,
      highlights: testimonial?.highlights?.join(', ') ?? '',
      is_featured: testimonial?.is_featured ?? false,
      sort_order: testimonial?.sort_order ?? 0,
      is_active: testimonial?.is_active ?? true,
    },
  })

  const mutation = testimonial ? update : create

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      await mutation.mutateAsync({ ...values, avatar: avatar ?? undefined })
      navigate(paths.adminTestimonials)
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-5">
      {formError && <Alert variant="error">{formError}</Alert>}

      <FormField label="Name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" invalid={!!errors.name} {...register('name')} />
      </FormField>

      <FormField
        label="Slug"
        htmlFor="slug"
        hint="Leave blank to generate it from the name."
        error={errors.slug?.message}
      >
        <Input id="slug" invalid={!!errors.slug} {...register('slug')} />
      </FormField>

      <FormField label="Category" htmlFor="category" error={errors.category?.message}>
        <select
          id="category"
          className="block h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('category')}
        >
          {Object.entries(testimonialCategoryLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Program" htmlFor="program" error={errors.program?.message}>
        <Input id="program" invalid={!!errors.program} {...register('program')} />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Origin" htmlFor="origin" hint="Optional.">
          <Input id="origin" {...register('origin')} />
        </FormField>
        <FormField label="Destination" htmlFor="destination" hint="Optional.">
          <Input id="destination" {...register('destination')} />
        </FormField>
      </div>

      <FormField label="Achievement" htmlFor="achievement" hint="Optional, e.g. a scholarship.">
        <Input id="achievement" {...register('achievement')} />
      </FormField>

      <FormField label="Quote" htmlFor="quote" error={errors.quote?.message}>
        <textarea
          id="quote"
          rows={4}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('quote')}
        />
      </FormField>

      <FormField
        label="Highlights"
        htmlFor="highlights"
        hint="Comma-separated, e.g. University Admission, Student Visa"
      >
        <Input id="highlights" {...register('highlights')} />
      </FormField>

      <FormField label="Rating" htmlFor="rating" error={errors.rating?.message}>
        <select
          id="rating"
          className="block h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('rating')}
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={value}>
              {value} star{value === 1 ? '' : 's'}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Avatar"
        htmlFor="avatar"
        hint={testimonial ? 'Leave blank to keep the current avatar.' : undefined}
      >
        <input
          id="avatar"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600"
          onChange={(event) => setAvatar(event.target.files?.[0] ?? null)}
        />
      </FormField>

      <FormField label="Sort order" htmlFor="sort_order" hint="Lower numbers appear first.">
        <Input id="sort_order" type="number" min={0} {...register('sort_order')} />
      </FormField>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-300"
            {...register('is_featured')}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input
            type="checkbox"
            className="size-4 rounded border-slate-300"
            {...register('is_active')}
          />
          Visible on the public site
        </label>
      </div>

      <Button type="submit" loading={mutation.isPending}>
        {testimonial ? 'Save changes' : 'Create testimonial'}
      </Button>
    </form>
  )
}
