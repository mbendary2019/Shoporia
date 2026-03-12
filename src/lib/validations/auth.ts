import { z } from 'zod'

const passwordSchema = z.string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير')
  .regex(/[a-z]/, 'كلمة المرور يجب أن تحتوي على حرف صغير')
  .regex(/[0-9]/, 'كلمة المرور يجب أن تحتوي على رقم')

export const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
})

export const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: passwordSchema,
  confirmPassword: z.string(),
  displayName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().regex(/^[569][0-9]{7}$/, 'رقم الهاتف غير صالح').optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
})

export const phoneLoginSchema = z.object({
  phone: z.string().regex(/^[569][0-9]{7}$/, 'رقم الهاتف غير صالح'),
})

export const otpSchema = z.object({
  otp: z.string().length(6, 'رمز التحقق يجب أن يكون 6 أرقام'),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
})

export const newPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'كلمة المرور غير متطابقة',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type PhoneLoginInput = z.infer<typeof phoneLoginSchema>
export type OtpInput = z.infer<typeof otpSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type NewPasswordInput = z.infer<typeof newPasswordSchema>
