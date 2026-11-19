import { ArrowRight } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useSubscribeToNewsletter } from '@/features/newsletter'
import { ApiError } from '@/lib/api/errors'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Footer newsletter sign-up posting to `POST /api/v1/newsletter-subscriptions`. */
export function NewsletterForm() {
  const inputId = useId()
  const subscribe = useSubscribeToNewsletter()
  const [feedback, setFeedback] = useState<{ tone: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const email = String(new FormData(form).get('email') ?? '').trim()

    if (!EMAIL_PATTERN.test(email)) {
      setFeedback({ tone: 'error', text: 'Please enter a valid email address.' })
      return
    }

    setFeedback(null)
    try {
      const message = await subscribe.mutateAsync({ email, source_page: 'footer' })
      setFeedback({ tone: 'success', text: message })
      form.reset()
    } catch (error) {
      const text =
        error instanceof ApiError
          ? (error.errors.email?.[0] ?? error.message)
          : 'Something went wrong. Please try again.'
      setFeedback({ tone: 'error', text })
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-[370px]">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex items-center rounded-full bg-white p-1.5 pl-6 shadow-glow">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter email address"
          aria-invalid={feedback?.tone === 'error' || undefined}
          className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-ink placeholder:text-body focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={subscribe.isPending}
          className="group flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition-colors hover:bg-ink disabled:opacity-60"
        >
          <ArrowRight
            aria-hidden="true"
            className="size-[18px] -rotate-45 transition-transform duration-400 group-hover:rotate-0"
          />
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={
          feedback?.tone === 'error'
            ? 'mt-3 min-h-5 text-sm text-red-300'
            : 'mt-3 min-h-5 text-sm text-slate-300'
        }
      >
        {feedback?.text}
      </p>
    </form>
  )
}
