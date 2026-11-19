import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'

interface AuthLayoutProps {
  title: string
  subtitle?: ReactNode
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col justify-center px-4 py-12 sm:py-20">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-slate-600">{subtitle}</p>}
      </div>
      <Card>{children}</Card>
    </div>
  )
}
