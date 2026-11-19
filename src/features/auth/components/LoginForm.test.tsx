import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/utils'
import { LoginForm } from './LoginForm'

describe('LoginForm', () => {
  it('shows client-side validation errors without calling the API', async () => {
    renderWithProviders(<LoginForm />)

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })
})
