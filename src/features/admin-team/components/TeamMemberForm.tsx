import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { paths } from '@/app/router/paths'
import { socialLabels } from '@/config/site'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { applyServerErrors } from '@/lib/forms'
import { useCreateAdminTeamMember, useUpdateAdminTeamMember } from '../hooks'
import {
  formValuesToSocials,
  socialNetworks,
  socialsToFormValues,
  teamMemberFormSchema,
  type TeamMemberFormInput,
  type TeamMemberFormValues,
} from '../schemas'
import type { AdminTeamMember } from '../types'

interface TeamMemberFormProps {
  teamMember?: AdminTeamMember
}

export function TeamMemberForm({ teamMember }: TeamMemberFormProps) {
  const navigate = useNavigate()
  const create = useCreateAdminTeamMember()
  const update = useUpdateAdminTeamMember(teamMember?.id ?? 0)
  const [formError, setFormError] = useState<string | null>(null)
  const [photo, setPhoto] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TeamMemberFormValues, unknown, TeamMemberFormInput>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: {
      name: teamMember?.name ?? '',
      slug: teamMember?.slug ?? '',
      role: teamMember?.role ?? '',
      bio: teamMember?.bio ?? '',
      socials: socialsToFormValues(teamMember?.socials ?? []),
      sort_order: teamMember?.sort_order ?? 0,
      is_active: teamMember?.is_active ?? true,
    },
  })

  const mutation = teamMember ? update : create

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      await mutation.mutateAsync({
        ...values,
        socials: formValuesToSocials(values.socials),
        photo: photo ?? undefined,
      })
      navigate(paths.adminTeam)
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

      <FormField label="Role" htmlFor="role" error={errors.role?.message}>
        <Input id="role" invalid={!!errors.role} {...register('role')} />
      </FormField>

      <FormField label="Bio" htmlFor="bio" hint="Optional.">
        <textarea
          id="bio"
          rows={4}
          className="block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-2 focus:outline-brand-500"
          {...register('bio')}
        />
      </FormField>

      <FormField
        label="Photo"
        htmlFor="photo"
        hint={teamMember ? 'Leave blank to keep the current photo.' : undefined}
      >
        <input
          id="photo"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-slate-600"
          onChange={(event) => setPhoto(event.target.files?.[0] ?? null)}
        />
      </FormField>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-slate-700">Social links</legend>
        <p className="text-xs text-slate-500">Optional. Leave a field blank to hide that icon.</p>
        {socialNetworks.map((network) => (
          <FormField
            key={network}
            label={socialLabels[network]}
            htmlFor={`socials.${network}`}
            error={errors.socials?.[network]?.message}
          >
            <Input
              id={`socials.${network}`}
              type="url"
              placeholder={`https://${network}.com/...`}
              invalid={!!errors.socials?.[network]}
              {...register(`socials.${network}`)}
            />
          </FormField>
        ))}
      </fieldset>

      <FormField label="Sort order" htmlFor="sort_order" hint="Lower numbers appear first.">
        <Input id="sort_order" type="number" min={0} {...register('sort_order')} />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          className="size-4 rounded border-slate-300"
          {...register('is_active')}
        />
        Visible on the public site
      </label>

      <Button type="submit" loading={mutation.isPending}>
        {teamMember ? 'Save changes' : 'Create team member'}
      </Button>
    </form>
  )
}
