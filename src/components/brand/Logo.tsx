import { Link } from 'react-router'
import { paths } from '@/app/router/paths'
import { env } from '@/config/env'
import { cn } from '@/lib/cn'

interface LogoProps {
  /** `dark` = navy wordmark for light backgrounds; `light` = white wordmark for dark backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
  /** Font-size classes for the wordmark (default scales with the header). */
  textClassName?: string
}

/** EuroRank text wordmark, linking home. Replace with artwork once a logo file exists. */
export function Logo({ tone = 'dark', className, textClassName }: LogoProps) {
  return (
    <Link
      to={paths.home}
      aria-label={`${env.appName} — home`}
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          'text-[28px] leading-none font-extrabold tracking-tight xl:text-[34px]',
          tone === 'light' ? 'text-white' : 'text-ink',
          textClassName,
        )}
      >
        Euro
        <span className={tone === 'light' ? 'text-brand-on-dark' : 'text-brand-600'}>Rank</span>
      </span>
    </Link>
  )
}
