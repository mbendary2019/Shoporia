import { describe, it, expect } from 'vitest'
import {
  loginSchema,
  registerSchema,
  phoneLoginSchema,
  otpSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from '@/lib/validations/auth'

describe('loginSchema', () => {
  it('should pass with valid email and password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: 'anypassword',
    })
    expect(result.success).toBe(true)
  })

  it('should fail with invalid email', () => {
    const result = loginSchema.safeParse({
      email: 'invalid-email',
      password: 'Test123x',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with empty password', () => {
    const result = loginSchema.safeParse({
      email: 'test@example.com',
      password: '',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with empty fields', () => {
    const result = loginSchema.safeParse({ email: '', password: '' })
    expect(result.success).toBe(false)
  })
})

describe('registerSchema', () => {
  const validData = {
    email: 'test@example.com',
    password: 'Test1234',
    confirmPassword: 'Test1234',
    displayName: 'أحمد',
    acceptTerms: true,
  }

  it('should pass with valid data', () => {
    const result = registerSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should fail when passwords do not match', () => {
    const result = registerSchema.safeParse({
      ...validData,
      confirmPassword: 'Different1',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with short display name', () => {
    const result = registerSchema.safeParse({
      ...validData,
      displayName: 'أ',
    })
    expect(result.success).toBe(false)
  })

  it('should fail when terms not accepted', () => {
    const result = registerSchema.safeParse({
      ...validData,
      acceptTerms: false,
    })
    expect(result.success).toBe(false)
  })

  it('should fail with weak password (no uppercase)', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'test1234',
      confirmPassword: 'test1234',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with weak password (no number)', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Testtest',
      confirmPassword: 'Testtest',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with short password', () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: 'Te1',
      confirmPassword: 'Te1',
    })
    expect(result.success).toBe(false)
  })

  it('should pass with valid Kuwait phone', () => {
    const result = registerSchema.safeParse({
      ...validData,
      phone: '50012345',
    })
    expect(result.success).toBe(true)
  })

  it('should fail with invalid phone', () => {
    const result = registerSchema.safeParse({
      ...validData,
      phone: '0201234567',
    })
    expect(result.success).toBe(false)
  })
})

describe('phoneLoginSchema', () => {
  it('should pass with valid Kuwait numbers', () => {
    const validNumbers = ['50012345', '60012345', '90012345', '55512345']
    for (const phone of validNumbers) {
      expect(phoneLoginSchema.safeParse({ phone }).success).toBe(true)
    }
  })

  it('should fail with invalid numbers', () => {
    const invalidNumbers = ['10012345', '12345678901', '123456', '']
    for (const phone of invalidNumbers) {
      expect(phoneLoginSchema.safeParse({ phone }).success).toBe(false)
    }
  })
})

describe('otpSchema', () => {
  it('should pass with 6-digit code', () => {
    expect(otpSchema.safeParse({ otp: '123456' }).success).toBe(true)
  })

  it('should fail with wrong length', () => {
    expect(otpSchema.safeParse({ otp: '12345' }).success).toBe(false)
    expect(otpSchema.safeParse({ otp: '1234567' }).success).toBe(false)
  })
})

describe('resetPasswordSchema', () => {
  it('should pass with valid email', () => {
    expect(resetPasswordSchema.safeParse({ email: 'test@example.com' }).success).toBe(true)
  })

  it('should fail with invalid email', () => {
    expect(resetPasswordSchema.safeParse({ email: 'not-email' }).success).toBe(false)
  })
})

describe('newPasswordSchema', () => {
  it('should pass when passwords match and are strong', () => {
    const result = newPasswordSchema.safeParse({
      password: 'NewPass1',
      confirmPassword: 'NewPass1',
    })
    expect(result.success).toBe(true)
  })

  it('should fail when passwords do not match', () => {
    const result = newPasswordSchema.safeParse({
      password: 'NewPass1',
      confirmPassword: 'Different1',
    })
    expect(result.success).toBe(false)
  })

  it('should fail with weak password', () => {
    const result = newPasswordSchema.safeParse({
      password: '123456',
      confirmPassword: '123456',
    })
    expect(result.success).toBe(false)
  })
})
