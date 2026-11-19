import { Link } from 'react-router'
import logoOnDark from '@/assets/images/brand/logo-white.svg'
import logoOnLight from '@/assets/images/brand/logo.svg'
import { paths } from '@/app/router/paths'
import { env } from '@/config/env'
import { cn } from '@/lib/cn'

/** Intrinsic size of the brand artwork (258 × 62). */
const LOGO_WIDTH = 258
const LOGO_HEIGHT = 62

interface LogoProps {
  /** `dark` = navy wordmark for light backgrounds; `light` = white wordmark for dark backgrounds. */
  tone?: 'dark' | 'light'
  className?: string
  /** Height classes for the image (width follows the artwork's aspect ratio). */
  imageClassName?: string
}

/** EuroGrades wordmark (graduation-cap globe), linking home. */
export function Logo({ tone = 'dark', className, imageClassName }: LogoProps) {
  return (
    <Link
      to={paths.home}
      aria-label={`${env.appName} — home`}
      className={cn('inline-flex shrink-0 items-center', className)}
    >
      <img
        src={tone === 'light' ? logoOnDark : logoOnLight}
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={cn('h-10 w-auto xl:h-[50px]', imageClassName)}
      />
    </Link>
  )
}
