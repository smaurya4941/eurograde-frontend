import { Phone } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { AvatarStack } from './AvatarStack'

interface InlineCtaProps {
  /** One avatar renders with a phone badge; several render as an avatar stack. */
  avatars: string[]
  text: string
  linkLabel: string
  to: string
  tone?: 'light' | 'dark'
  className?: string
}

/** "Ready to …? – Link" line with advisor avatar(s), used at the end of sections. */
export function InlineCta({
  avatars,
  text,
  linkLabel,
  to,
  tone = 'light',
  className,
}: InlineCtaProps) {
  return (
    <div className={cn('flex flex-wrap items-center justify-center gap-x-4 gap-y-2', className)}>
      {avatars.length > 1 ? (
        <AvatarStack
          avatars={avatars}
          size="sm"
          ringClassName={tone === 'dark' ? 'ring-ink' : 'ring-white'}
        />
      ) : (
        <span aria-hidden="true" className="flex items-center -space-x-2">
          {avatars[0] && (
            <img
              src={avatars[0]}
              alt=""
              loading="lazy"
              className="size-[42px] rounded-full object-cover"
            />
          )}
          <span className="flex size-[42px] items-center justify-center rounded-full bg-brand-600 text-white">
            <Phone className="size-4 fill-current" strokeWidth={0} />
          </span>
        </span>
      )}
      <p className={cn('text-center font-semibold', tone === 'dark' ? 'text-white' : 'text-ink')}>
        {text} –{' '}
        <Link
          to={to}
          className={cn(
            'underline underline-offset-4 transition-colors hover:text-brand-500',
            tone === 'dark' ? 'text-brand-on-dark' : 'text-brand-600',
          )}
        >
          {linkLabel}
        </Link>
      </p>
    </div>
  )
}
