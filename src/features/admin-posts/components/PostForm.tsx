import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { useAdminPostCategories } from '@/features/admin-post-categories'
import { useAdminTags } from '@/features/admin-tags'
import { useTeamMembers } from '@/features/team'
import { applyServerErrors } from '@/lib/forms'
import { useCreateAdminPost, useUpdateAdminPost } from '../hooks'
import { postFormSchema, type PostFormInput, type PostFormValues } from '../schemas'
import type { AdminPost } from '../types'

interface PostFormProps {
  post?: AdminPost
}

/** Local ISO datetime (no seconds), for a `datetime-local` input. */
function toDatetimeLocal(value: string | null): string {
  if (!value) return ''
  return value.slice(0, 16)
}

export function PostForm({ post }: PostFormProps) {
  const navigate = useNavigate()
  const categories = useAdminPostCategories()
  const tags = useAdminTags()
  const teamMembers = useTeamMembers()
  const create = useCreateAdminPost()
  const update = useUpdateAdminPost(post?.id ?? 0)
  const [formError, setFormError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [tagIds, setTagIds] = useState<number[]>(() => post?.tags.map((tag) => tag.id) ?? [])

  const toggleTag = (id: number) => {
    setTagIds((current) =>
      current.includes(id) ? current.filter((tagId) => tagId !== id) : [...current, id],
    )
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<PostFormValues, unknown, PostFormInput>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title ?? '',
      slug: post?.slug ?? '',
      post_category_id: post?.post_category_id ?? ('' as unknown as number),
      author_id: post?.author_id ?? ('' as unknown as number),
      excerpt: post?.excerpt ?? '',
      body: post?.body ?? '',
      meta_title: post?.meta_title ?? '',
      meta_description: post?.meta_description ?? '',
      published_at: toDatetimeLocal(post?.published_at ?? null),
    },
  })

  const mutation = post ? update : create

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      await mutation.mutateAsync({ ...values, tagIds, image: image ?? undefined })
      navigate(paths.adminPosts)
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-2xl space-y-5">
      {formError && <Alert variant="error">{formError}</Alert>}

      <FormField label="Title" htmlFor="title" error={errors.title?.message}>
        <Input id="title" invalid={!!errors.title} {...register('title')} />
      </FormField>

      <FormField
        label="Slug"
        htmlFor="slug"
        hint="Leave blank to generate it from the title."
        error={errors.slug?.message}
      >
        <Input id="slug" invalid={!!errors.slug} {...register('slug')} />
      </FormField>

      <FormField
        label="Category"
        htmlFor="post_category_id"
        error={errors.post_category_id?.message}
      >
        <select
          id="post_category_id"
          className="block h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('post_category_id')}
        >
          <option value="">Select a category…</option>
          {categories.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Author" htmlFor="author_id" hint="Optional.">
        <select
          id="author_id"
          className="block h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('author_id')}
        >
          <option value="">No author</option>
          {teamMembers.data?.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Excerpt" htmlFor="excerpt" error={errors.excerpt?.message}>
        <textarea
          id="excerpt"
          rows={3}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('excerpt')}
        />
      </FormField>

      <FormField label="Body" htmlFor="body" hint="HTML is sanitised on save.">
        <textarea
          id="body"
          rows={10}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('body')}
        />
      </FormField>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">Tags</legend>
        {tags.data && tags.data.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {tags.data.map((tag) => (
              <label key={tag.id} className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="size-4 rounded border-slate-300"
                  checked={tagIds.includes(tag.id)}
                  onChange={() => toggleTag(tag.id)}
                />
                {tag.name}
              </label>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No tags yet — add some from the Tags page first.</p>
        )}
      </fieldset>

      <FormField
        label="Cover image"
        htmlFor="image"
        hint={post ? 'Leave blank to keep the current image.' : undefined}
      >
        <input
          id="image"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600"
          onChange={(event) => setImage(event.target.files?.[0] ?? null)}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Meta title" htmlFor="meta_title" hint="Optional.">
          <Input id="meta_title" {...register('meta_title')} />
        </FormField>
        <FormField label="Meta description" htmlFor="meta_description" hint="Optional.">
          <Input id="meta_description" {...register('meta_description')} />
        </FormField>
      </div>

      <FormField
        label="Publish at"
        htmlFor="published_at"
        hint="Leave blank to keep this post a draft."
      >
        <Input id="published_at" type="datetime-local" {...register('published_at')} />
      </FormField>

      <Button type="submit" loading={mutation.isPending}>
        {post ? 'Save changes' : 'Create post'}
      </Button>
    </form>
  )
}
