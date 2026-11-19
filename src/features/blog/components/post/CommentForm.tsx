import { zodResolver } from '@hookform/resolvers/zod'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { useId, useState, type ComponentProps, type RefObject } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/Spinner'
import { cn } from '@/lib/cn'
import { applyServerErrors } from '@/lib/forms'
import { loadCommentAuthor, saveCommentAuthor } from '../../commentAuthorStorage'
import { useSubmitComment } from '../../hooks'
import { commentSchema, type CommentInput } from '../../schemas'
import type { ReplyTarget } from './CommentList'

const fieldClass = (invalid: boolean) =>
  cn(
    'w-full rounded-[50px] border bg-white px-5 py-3 text-ink outline-none',
    'transition-colors duration-300 focus:border-brand-600',
    invalid ? 'border-red-500' : 'border-transparent',
  )

interface FieldProps extends ComponentProps<'input'> {
  label: string
  required?: boolean
  error?: string
}

function Field({ label, required, error, id, ...props }: FieldProps) {
  const fallbackId = useId()
  const inputId = id ?? fallbackId

  return (
    <div>
      <label htmlFor={inputId} className="mb-1 block text-body">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={fieldClass(!!error)}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function defaultValues(): CommentInput {
  const saved = loadCommentAuthor()
  return {
    author_name: saved?.author_name ?? '',
    author_email: saved?.author_email ?? '',
    author_website: saved?.author_website ?? '',
    body: '',
    remember: saved !== null,
    subject: '',
  }
}

interface CommentFormProps {
  slug: string
  replyTo: ReplyTarget | null
  onCancelReply: () => void
  /** Lets the comment list focus the textarea when "Reply" is clicked. */
  bodyRef: RefObject<HTMLTextAreaElement | null>
}

/** "Leave a Reply" form posting to `POST /api/v1/posts/{slug}/comments`. */
export function CommentForm({ slug, replyTo, onCancelReply, bodyRef }: CommentFormProps) {
  const submit = useSubmitComment(slug)
  const [formError, setFormError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const bodyId = useId()
  const rememberId = useId()
  // Read saved details once, not on every render.
  const [initialValues] = useState(defaultValues)

  const {
    register,
    handleSubmit,
    setError,
    resetField,
    formState: { errors },
  } = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: initialValues,
  })

  const onSubmit = handleSubmit(async ({ remember, ...values }) => {
    setFormError(null)
    setSuccessMessage(null)
    try {
      const result = await submit.mutateAsync({ ...values, parent_id: replyTo?.id ?? null })
      saveCommentAuthor(
        remember
          ? {
              author_name: values.author_name,
              author_email: values.author_email,
              author_website: values.author_website,
            }
          : null,
      )
      setSuccessMessage(result.message)
      resetField('body')
      onCancelReply()
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  const { ref: bodyFieldRef, ...bodyField } = register('body')

  return (
    <section
      id="respond"
      aria-labelledby="reply-title"
      className="mt-[30px] scroll-mt-32 md:mt-[60px]"
    >
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-3">
        <h2 id="reply-title" className="text-xl font-bold text-ink md:text-[30px]">
          {replyTo ? `Leave a Reply to ${replyTo.authorName}` : 'Leave a Reply'}
        </h2>
        {replyTo && (
          <button
            type="button"
            onClick={onCancelReply}
            className="rounded-[5px] bg-brand-600 px-2.5 py-1 text-sm text-white transition-colors hover:bg-ink"
          >
            Cancel reply
          </button>
        )}
      </div>

      <p className="text-body">
        Your email address will not be published. Required fields are marked{' '}
        <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span>
      </p>

      <form onSubmit={onSubmit} noValidate aria-label="Comment form" className="mt-4 space-y-4">
        {/* Honeypot: off-screen, not focusable, ignored by people. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Subject
            <input type="text" tabIndex={-1} autoComplete="off" {...register('subject')} />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3 md:gap-[30px]">
          <Field
            label="Name"
            required
            autoComplete="name"
            maxLength={100}
            error={errors.author_name?.message}
            {...register('author_name')}
          />
          <Field
            label="Email"
            required
            type="email"
            autoComplete="email"
            maxLength={255}
            error={errors.author_email?.message}
            {...register('author_email')}
          />
          <Field
            label="Website"
            type="url"
            inputMode="url"
            autoComplete="url"
            maxLength={255}
            error={errors.author_website?.message}
            {...register('author_website')}
          />
        </div>

        <div>
          <label htmlFor={bodyId} className="mb-1 block text-body">
            Comment <span aria-hidden="true">*</span>
          </label>
          <textarea
            id={bodyId}
            rows={3}
            maxLength={3000}
            aria-required
            aria-invalid={errors.body ? true : undefined}
            aria-describedby={errors.body ? `${bodyId}-error` : undefined}
            className={cn(fieldClass(!!errors.body), 'block h-20 min-h-20 resize-y')}
            ref={(element) => {
              bodyFieldRef(element)
              bodyRef.current = element
            }}
            {...bodyField}
          />
          {errors.body && (
            <p id={`${bodyId}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
              {errors.body.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input
            id={rememberId}
            type="checkbox"
            className="mt-[5px] size-[13px] shrink-0 accent-brand-600"
            {...register('remember')}
          />
          <label htmlFor={rememberId} className="text-body">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
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
          className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-[15px] text-base leading-none font-bold text-white shadow-glow transition-colors duration-300 hover:bg-ink disabled:opacity-70"
        >
          {submit.isPending && <Spinner className="size-4" />}
          {submit.isPending ? 'Posting…' : 'Post Comment'}
        </button>
      </form>
    </section>
  )
}
