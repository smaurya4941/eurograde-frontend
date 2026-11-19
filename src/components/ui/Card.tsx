import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8', className)}
      {...props}
    />
  )
}
