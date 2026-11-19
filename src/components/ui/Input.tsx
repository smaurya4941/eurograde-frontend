import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export interface InputProps extends ComponentProps<'input'> {
  invalid?: boolean
}

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        'block h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 shadow-xs',
        'placeholder:text-slate-400 focus:outline-2 focus:outline-offset-0',
        invalid
          ? 'border-red-400 focus:outline-red-500'
          : 'border-slate-300 focus:border-brand-500 focus:outline-brand-500',
        className,
      )}
      {...props}
    />
  )
}
