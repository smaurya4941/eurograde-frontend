import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Input } from '@/components/ui/Input'
import { applyServerErrors } from '@/lib/forms'
import { useRegister } from '../hooks'
import { registerSchema, type RegisterInput } from '../schemas'

interface RegisterFormProps {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const registerUser = useRegister()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', password_confirmation: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setFormError(null)
    try {
      await registerUser.mutateAsync(values)
      onSuccess?.()
    } catch (error) {
      setFormError(applyServerErrors(error, setError))
    }
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && <Alert variant="error">{formError}</Alert>}

      <FormField label="Full name" htmlFor="name" error={errors.name?.message}>
        <Input id="name" autoComplete="name" invalid={!!errors.name} {...register('name')} />
      </FormField>

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
          autoComplete="new-password"
          invalid={!!errors.password}
          {...register('password')}
        />
      </FormField>

      <FormField
        label="Confirm password"
        htmlFor="password_confirmation"
        error={errors.password_confirmation?.message}
      >
        <Input
          id="password_confirmation"
          type="password"
          autoComplete="new-password"
          invalid={!!errors.password_confirmation}
          {...register('password_confirmation')}
        />
      </FormField>

      <Button type="submit" className="w-full" loading={registerUser.isPending}>
        Create account
      </Button>
    </form>
  )
}
