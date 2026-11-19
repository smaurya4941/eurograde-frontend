import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, CircleAlert } from 'lucide-react'
import { useId, useState, type ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatedHeading, Reveal, type HeadingPart } from '@/components/marketing'
import { Spinner } from '@/components/ui/Spinner'
import { applyServerErrors } from '@/lib/forms'
import { cn } from '@/lib/cn'
import { useSubmitContactMessage } from '../hooks'
import { contactMessageSchema, type ContactMessageInput } from '../schemas'

const fieldClass = (invalid: boolean) =>
  cn(
    'w-full rounded-md border bg-white px-6 text-[15px] text-ink placeholder:text-body',
    'transition-colors duration-300 focus:border-brand-600 focus:outline-none',
    invalid ? 'border-red-500' : 'border-slate-200',
  )

interface FieldProps extends ComponentProps<'input'> {
  label: string
  error?: string
}

function TextField({ label, error, id, className, ...props }: FieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId
  const errorId = `${inputId}-error`

  return (
    <div className={className}>
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        placeholder={label}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(fieldClass(!!error), 'h-14 xl:h-16')}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

interface ContactFormProps {
  /** Identifies which page the enquiry came from (stored with the message). */
  sourcePage: string
  /** Heading parts; highlighted parts render in the accent colour. */
  title?: HeadingPart[]
  description?: string
  /** Anchor id for in-page links (e.g. `/contact#eligibility`). */
  id?: string
  className?: string
}

const defaultTitle: HeadingPart[] = [{ text: 'Contact Us' }]

/** Website enquiry form posting to `POST /api/v1/contact-messages`. */
export function ContactForm({
  sourcePage,
  title = defaultTitle,
  description,
  id,
  className,
}: ContactFormProps) {
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
  } = useForm<ContactMessageInput>({
    resolver: zodResolver(contactMessageSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      message: '',
      website: '',
    },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    setSuccessMessage(null)
    try {
      const message = await submit.mutateAsync({ ...values, source_page: sourcePage })
      setSuccessMessage(message)
      reset()
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <div
      id={id}
      className={cn('rounded-2xl bg-white p-6 shadow-card sm:p-10 xl:p-[45px]', className)}
    >
      <AnimatedHeading
        parts={title}
        className="text-[32px] leading-tight font-bold text-ink xl:text-[46px]"
      />
      {description && (
        <Reveal delay={150}>
          <p className="mt-4 text-body">{description}</p>
        </Reveal>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5" aria-label="Contact form">
        {/* Honeypot: off-screen, not focusable, ignored by people. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-[30px]">
          <TextField
            label="First Name"
            autoComplete="given-name"
            error={errors.first_name?.message}
            {...register('first_name')}
          />
          <TextField
            label="Last Name"
            autoComplete="family-name"
            error={errors.last_name?.message}
            {...register('last_name')}
          />
        </div>
        <TextField
          label="Phone number"
          type="tel"
          autoComplete="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <TextField
          label="Email address"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <div>
          <label htmlFor={messageId} className="sr-only">
            Your Message
          </label>
          <textarea
            id={messageId}
            rows={5}
            placeholder="Your Message"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? `${messageId}-error` : undefined}
            className={cn(fieldClass(!!errors.message), 'min-h-[150px] resize-y py-5')}
            {...register('message')}
          />
          {errors.message && (
            <p id={`${messageId}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.message.message}
            </p>
          )}
        </div>

        <div role="status" aria-live="polite">
          {successMessage && (
            <p className="flex items-start gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-[15px] text-emerald-800">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              {successMessage}
            </p>
          )}
          {formError && (
            <p className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-[15px] text-red-700">
              <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              {formError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submit.isPending}
          aria-busy={submit.isPending || undefined}
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-[15px] text-[15px] leading-none font-bold text-white shadow-glow transition-colors duration-300 hover:bg-ink disabled:opacity-70 xl:text-base"
        >
          {submit.isPending && <Spinner className="size-4" />}
          {submit.isPending ? 'Sending…' : 'Submit Message'}
        </button>
      </form>
    </div>
  )
}
