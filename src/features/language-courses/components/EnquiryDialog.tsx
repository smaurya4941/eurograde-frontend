import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSubmitContactMessage } from '@/features/contact'
import { Spinner } from '@/components/ui/Spinner'
import { applyServerErrors } from '@/lib/forms'
import { cn } from '@/lib/cn'

/** "Talk to an expert for FREE" modal of the old site: full name, email, phone. */
const enquirySchema = z.object({
  full_name: z.string().trim().min(1, 'Full name is required.').max(200),
  email: z.email('Enter a valid email address.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone number is required.')
    .max(30)
    .regex(/^\+?[0-9\s().-]{6,}$/, 'Please enter a valid phone number.'),
  /** Honeypot. */
  website: z.string().optional(),
})
type EnquiryValues = z.infer<typeof enquirySchema>

const inputClass = (invalid: boolean) =>
  cn(
    'w-full rounded-md border bg-white px-3 py-2 text-base text-legacy-text',
    'placeholder:text-legacy-muted focus:border-legacy focus:outline-none',
    invalid ? 'border-red-500' : 'border-slate-300',
  )

interface EnquiryDialogProps {
  open: boolean
  onClose: () => void
  /** Topic of the enquiry, e.g. "German A1 Level". Goes into the message text. */
  topic: string
  sourcePage: string
}

export function EnquiryDialog({ open, onClose, topic, sourcePage }: EnquiryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const submit = useSubmitContactMessage()
  const [formError, setFormError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { full_name: '', email: '', phone: '', website: '' },
  })

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    setSuccess(null)
    const [first = values.full_name, ...rest] = values.full_name.split(/\s+/)
    try {
      const message = await submit.mutateAsync({
        first_name: first,
        last_name: rest.join(' ') || first,
        email: values.email,
        phone: values.phone,
        message: `Callback request: ${topic}.`,
        website: values.website,
        source_page: sourcePage,
      })
      setSuccess(message)
      reset()
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={() => {
        setSuccess(null)
        setFormError(null)
        onClose()
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
      className="m-auto w-[min(92vw,520px)] rounded-lg border-0 bg-white p-0 font-work text-legacy-text shadow-2xl backdrop:bg-black/50"
    >
      <div className="relative px-6 py-8 sm:px-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 rounded p-1 text-legacy-muted hover:text-legacy-text"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        <h2 id={titleId} className="mb-1 text-2xl font-semibold">
          Talk to an expert for FREE
        </h2>
        <p className="mb-5 text-legacy-muted">{topic}</p>

        <form onSubmit={onSubmit} noValidate className="space-y-3">
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
            </label>
          </div>
          {(
            [
              ['full_name', 'Full Name', 'text', 'name'],
              ['email', 'Email ID', 'email', 'email'],
              ['phone', 'Phone No.', 'tel', 'tel'],
            ] as const
          ).map(([name, label, type, autoComplete]) => (
            <div key={name}>
              <label htmlFor={`${titleId}-${name}`} className="sr-only">
                {label}
              </label>
              <input
                id={`${titleId}-${name}`}
                type={type}
                placeholder={label}
                autoComplete={autoComplete}
                aria-invalid={errors[name] ? true : undefined}
                className={inputClass(!!errors[name])}
                {...register(name)}
              />
              {errors[name] && (
                <p role="alert" className="mt-1 text-sm text-red-600">
                  {errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          <div role="status" aria-live="polite">
            {success && (
              <p className="flex items-start gap-2 rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
                <CircleCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {success}
              </p>
            )}
            {formError && (
              <p className="flex items-start gap-2 rounded-md bg-red-50 px-3 py-2 text-red-700">
                <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {formError}
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-legacy-text px-8 py-2 text-base hover:bg-legacy-text hover:text-white"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={submit.isPending}
              aria-busy={submit.isPending || undefined}
              className="inline-flex items-center gap-2 rounded-full bg-legacy px-8 py-2 text-base text-white hover:bg-legacy-dark disabled:opacity-70"
            >
              {submit.isPending && <Spinner className="size-4" />}
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  )
}
