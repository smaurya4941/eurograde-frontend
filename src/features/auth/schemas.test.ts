import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from './schemas'

describe('loginSchema', () => {
  it('accepts valid credentials', () => {
    expect(loginSchema.safeParse({ email: 'a@b.com', password: 'secret' }).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    expect(loginSchema.safeParse({ email: 'nope', password: 'secret' }).success).toBe(false)
  })
})

describe('registerSchema', () => {
  const valid = {
    name: 'Jane',
    email: 'jane@example.com',
    password: 'password123',
    password_confirmation: 'password123',
  }

  it('accepts matching passwords', () => {
    expect(registerSchema.safeParse(valid).success).toBe(true)
  })

  it('flags mismatched confirmation on the confirmation field', () => {
    const result = registerSchema.safeParse({ ...valid, password_confirmation: 'different' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.path).toEqual(['password_confirmation'])
  })
})
