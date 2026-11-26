import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck, Mail } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { z } from 'zod'
import { Spinner } from '@/components/ui/Spinner'
import { cn } from '@/lib/cn'
import { applyServerErrors } from '@/lib/forms'
import { useSubmitContactMessage } from '../../hooks'
import { contactMessageSchema } from '../../schemas'

/** The old form has one "Full name" box; it is split into first/last name for the API. */
const legacySchema = contactMessageSchema
  .omit({ first_name: true, last_name: true })
  .extend({ full_name: z.string().trim().min(1, 'A name is required.').max(200) })

type LegacyContactInput = z.infer<typeof legacySchema>

function splitName(fullName: string) {
  const [first = '', ...rest] = fullName.trim().split(/\s+/)
  return { first_name: first, last_name: rest.join(' ') || first }
}

interface FloatingProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

/** Bootstrap-style floating-label input. */
function Floating({ label, error, className, ...props }: FloatingProps) {
  const id = useId()
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          placeholder=" "
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'peer h-[58px] w-full rounded-md border bg-white px-3 pt-5 pb-1 text-base text-legacy-text focus:border-legacy focus:outline-none',
            error ? 'border-red-500' : 'border-slate-300',
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-0 left-3 origin-left translate-y-4 scale-100 text-legacy-muted transition-transform peer-focus:-translate-y-0.5 peer-focus:scale-[0.82] peer-[:not(:placeholder-shown)]:-translate-y-0.5 peer-[:not(:placeholder-shown)]:scale-[0.82]"
        >
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/** "Let’s connect and work together." panel with the enquiry form (old design). */
export function LegacyContactForm({ id }: { id?: string }) {
  const submit = useSubmitContactMessage()
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const messageId = useId()

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LegacyContactInput>({
    resolver: zodResolver(legacySchema),
    defaultValues: { full_name: '', email: '', phone: '', message: '', website: '' },
  })

  const onSubmit = handleSubmit(async ({ full_name, ...values }) => {
    setFormError(null)
    setSuccessMessage(null)
    try {
      const message = await submit.mutateAsync({
        ...values,
        ...splitName(full_name),
        source_page: 'contact',
      })
      setSuccessMessage(message)
      reset()
    } catch (error) {
      // Server-side name errors belong on the single "Full name" box.
      const mapped: UseFormSetError<LegacyContactInput> = (name, err, opts) =>
        (name as string) === 'first_name' || (name as string) === 'last_name'
          ? setError('full_name', err, opts)
          : setError(name, err, opts)
      setFormError(applyServerErrors(error, mapped))
    }
  })

  return (
    <div id={id} className="scroll-mt-32 rounded-2xl bg-legacy-soft p-4 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div className="pt-4 lg:pt-0">
          <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-legacy text-white">
            <Mail aria-hidden="true" className="size-6" />
          </div>
          <h2 className="text-[32px] leading-tight font-semibold text-legacy-text md:text-[40px]">
            Let’s connect <br className="hidden lg:block" />
            and work together.
          </h2>
        </div>

        <form onSubmit={onSubmit} noValidate aria-label="Contact form">
          {/* Honeypot: off-screen, not focusable, ignored by people. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </label>
          </div>

          <Floating
            label="Full name"
            autoComplete="name"
            className="mb-4"
            error={errors.full_name?.message}
            {...register('full_name')}
          />
          <Floating
            label="Email address"
            type="email"
            autoComplete="email"
            className="mb-4"
            error={errors.email?.message}
            {...register('email')}
          />
          <Floating
            label="Phone number"
            type="tel"
            autoComplete="tel"
            className="mb-4"
            error={errors.phone?.message}
            {...register('phone')}
          />
          <div className="mb-4">
            <div className="relative">
              <textarea
                id={messageId}
                placeholder=" "
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? `${messageId}-error` : undefined}
                className={cn(
                  'peer h-40 w-full resize-y rounded-md border bg-white px-3 pt-6 pb-2 text-base text-legacy-text focus:border-legacy focus:outline-none',
                  errors.message ? 'border-red-500' : 'border-slate-300',
                )}
                {...register('message')}
              />
              <label
                htmlFor={messageId}
                className="pointer-events-none absolute top-0 left-3 origin-left translate-y-4 text-legacy-muted transition-transform peer-focus:-translate-y-0.5 peer-focus:scale-[0.82] peer-[:not(:placeholder-shown)]:-translate-y-0.5 peer-[:not(:placeholder-shown)]:scale-[0.82]"
              >
                Message
              </label>
            </div>
            {errors.message && (
              <p id={`${messageId}-error`} role="alert" className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>

          <div role="status" aria-live="polite" className="empty:hidden">
            {successMessage && (
              <p className="mb-4 flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-[15px] text-emerald-800">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                {successMessage}
              </p>
            )}
            {formError && (
              <p className="mb-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-[15px] text-red-700">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                {formError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submit.isPending}
            aria-busy={submit.isPending || undefined}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-legacy px-6 py-3 text-xl font-medium text-white transition-colors hover:bg-legacy-dark disabled:opacity-70"
          >
            {submit.isPending && <Spinner className="size-5" />}
            {submit.isPending ? 'Sending…' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
