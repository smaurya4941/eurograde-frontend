import { ArrowUp } from 'lucide-react'
import { useScrollY } from '@/hooks/useScrollY'
import { cn } from '@/lib/cn'

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Round "back to top" button whose ring fills as the page is scrolled. */
export function BackToTop() {
  // Rounded to whole percents so we re-render at most ~100 times per page.
  const progress = useScrollY((y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    return max > 0 ? Math.round((y / max) * 100) : 0
  })
  const visible = progress > 6

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0 })}
      className={cn(
        'fixed right-5 bottom-5 z-30 flex size-[50px] items-center justify-center rounded-full bg-white text-brand-600 shadow-card',
        'transition-all duration-400 hover:bg-brand-600 hover:text-white',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <svg viewBox="0 0 50 50" aria-hidden="true" className="absolute inset-0 -rotate-90">
        <circle
          cx="25"
          cy="25"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="2.5"
        />
        <circle
          cx="25"
          cy="25"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress / 100)}
        />
      </svg>
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  )
}
