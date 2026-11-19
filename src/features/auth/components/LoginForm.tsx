import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { applyServerErrors } from '@/lib/forms'
import { useLogin } from '../hooks'
import { loginSchema, type LoginInput } from '../schemas'

interface LoginFormProps {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const login = useLogin()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      await login.mutateAsync(values)
      onSuccess?.()
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && <Alert variant="error">{formError}</Alert>}

      <FormField label="Email" htmlFor="email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          invalid={!!errors.email}
          {...register('email')}
        />
      </FormField>

      <FormField label="Password" htmlFor="password" error={errors.password?.message}>
        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          className="size-4 rounded border-slate-300"
          {...register('remember')}
        />
        Remember me
      </label>

      <Button type="submit" className="w-full" loading={login.isPending}>
        Sign in
      </Button>
    </form>
  )
}
