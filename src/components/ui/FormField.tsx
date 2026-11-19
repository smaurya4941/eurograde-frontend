import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : (
        hint && <p className="text-sm text-slate-500">{hint}</p>
      )}
    </div>
  )
}
