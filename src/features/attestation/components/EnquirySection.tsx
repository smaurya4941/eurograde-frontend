import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck, Mail } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/Spinner'
import { useSubmitContactMessage } from '@/features/contact'
import { applyServerErrors } from '@/lib/forms'
import { cn } from '@/lib/cn'
import { enquirySchema, splitFullName, type EnquiryInput } from '../schemas'

const controlClass = (invalid: boolean) =>
  cn(
    'peer w-full rounded-md border bg-white px-3 pt-6 pb-2 text-base text-legacy-text',
    'placeholder-transparent focus:border-legacy focus:outline-none',
    invalid ? 'border-red-500' : 'border-slate-300',
  )

const labelClass =
  'pointer-events-none absolute top-0 left-3 origin-left translate-y-1 scale-[0.8] text-legacy-muted ' +
  'transition-transform peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 ' +
  'peer-focus:translate-y-1 peer-focus:scale-[0.8]'

type FloatingFieldProps = { label: string; error?: string } & (
  | ({ multiline?: false } & Omit<ComponentProps<'input'>, 'placeholder'>)
  | ({ multiline: true } & Omit<ComponentProps<'textarea'>, 'placeholder'>)
)

/** Bootstrap-style floating-label control (label shrinks above the value). */
function FloatingField({ label, error, multiline, ...props }: FloatingFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const common = {
    id,
    placeholder: label,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
  } as const

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea
            {...common}
            {...(props as ComponentProps<'textarea'>)}
            className={cn(controlClass(!!error), 'h-40 resize-y')}
          />
        ) : (
          <input
            {...common}
            {...(props as ComponentProps<'input'>)}
            className={cn(controlClass(!!error), 'h-14')}
          />
        )}
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

/** "Let's connect and work together" panel with the enquiry form (`POST /contact-messages`). */
export function EnquirySection({ sourcePage }: { sourcePage: string }) {
  const submit = useSubmitContactMessage()
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { full_name: '', email: '', phone: '', message: '', website: '' },
  })

  const onSubmit = handleSubmit(async ({ full_name, email, phone, message, website }) => {
    setFormError(null)
    setSuccess(null)
    try {
      const result = await submit.mutateAsync({
        ...splitFullName(full_name),
        email,
        phone,
        message,
        website,
        source_page: sourcePage,
      })
      setSuccess(result)
      reset()
    } catch (error) {
      // The API validates first_name/last_name; show those errors on the single name field.
      setFormError(
        applyServerErrors(error, (field, err) =>
          setError(
            field === 'first_name' || field === 'last_name'
              ? 'full_name'
              : (field as keyof EnquiryInput),
            err,
          ),
        ),
      )
    }
  })

  return (
    <section className="py-8 md:py-14">
      <div className="legacy-container">
        <div className="grid gap-8 rounded-3xl bg-legacy-soft p-5 md:p-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="mb-4 inline-flex size-14 items-center justify-center rounded-lg bg-legacy text-white">
              <Mail aria-hidden="true" className="size-7" />
            </span>
            <h2 className="font-work text-[32px] leading-tight font-semibold text-legacy-text md:text-[40px]">
              Let’s connect
              <br />
              and work together.
            </h2>
          </div>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-label="Enquiry form"
            className="relative space-y-4 lg:col-span-8"
          >
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Website
                <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
              </label>
            </div>
            <FloatingField
              label="Full name"
              autoComplete="name"
              error={errors.full_name?.message}
              {...register('full_name')}
            />
            <FloatingField
              label="Email address"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <FloatingField
              label="Phone number"
              type="tel"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <FloatingField
              label="Message"
              multiline
              error={errors.message?.message}
              {...register('message')}
            />
            <div role="status" aria-live="polite">
              {success && (
                <p className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-emerald-800">
                  <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  {success}
                </p>
              )}
              {formError && (
                <p className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-red-700">
                  <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  {formError}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submit.isPending}
              aria-busy={submit.isPending || undefined}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-legacy py-3 text-lg font-medium text-white transition-colors hover:bg-legacy-navy disabled:opacity-70"
            >
              {submit.isPending && <Spinner className="size-4" />}
              {submit.isPending ? 'Sending…' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
