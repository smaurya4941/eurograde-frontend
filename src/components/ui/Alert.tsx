import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  info: 'bg-brand-50 text-brand-800 ring-brand-200',
  success: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  error: 'bg-red-50 text-red-800 ring-red-200',
} as const

interface AlertProps {
  variant?: keyof typeof variants
  children: ReactNode
}

export function Alert({ variant = 'info', children }: AlertProps) {
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('rounded-lg px-4 py-3 text-sm ring-1 ring-inset', variants[variant])}
    >
      {children}
    </div>
  )
}
