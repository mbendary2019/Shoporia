import { z } from 'zod'

export const storeSchema = z.object({
  name: z.string().min(2, 'اسم المتجر يجب أن يكون حرفين على الأقل').max(50, 'اسم المتجر طويل جداً'),
  nameAr: z.string().min(2, 'اسم المتجر بالعربية يجب أن يكون حرفين على الأقل').max(50).optional(),
  description: z.string().min(20, 'الوصف يجب أن يكون 20 حرف على الأقل').max(500, 'الوصف طويل جداً'),
  descriptionAr: z.string().min(20).max(500).optional(),
  category: z.enum([
    'fashion',
    'electronics',
    'home',
    'beauty',
    'food',
    'services',
    'health',
    'sports',
    'kids',
    'other',
  ], {
    errorMap: () => ({ message: 'يرجى اختيار فئة المتجر' }),
  }),
  subcategories: z.array(z.string()).optional(),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'رقم الهاتف غير صالح'),
  whatsapp: z.string().regex(/^01[0125][0-9]{8}$/, 'رقم الواتساب غير صالح').optional(),
  email: z.string().email('البريد الإلكتروني غير صالح').optional(),
  address: z.string().min(10, 'العنوان يجب أن يكون 10 أحرف على الأقل').optional(),
  city: z.string().min(2, 'يرجى إدخال المدينة').optional(),
  governorate: z.string().min(2, 'يرجى اختيار المحافظة').optional(),
})

export const storeSettingsSchema = z.object({
  currency: z.string().default('EGP'),
  language: z.string().default('ar'),
  acceptsCash: z.boolean().default(true),
  acceptsCard: z.boolean().default(false),
  acceptsWallet: z.boolean().default(false),
  minOrderAmount: z.number().min(0).optional(),
  deliveryFee: z.number().min(0).optional(),
  freeDeliveryThreshold: z.number().min(0).optional(),
  vacationMode: z.boolean().default(false),
  vacationMessage: z.string().max(200).optional(),
})

export const storeDocumentsSchema = z.object({
  nationalId: z.string().optional(),
  commercialRegister: z.string().optional(),
  taxCard: z.string().optional(),
})

export const workingHoursSchema = z.object({
  saturday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  sunday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  monday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  tuesday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  wednesday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  thursday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
  friday: z.object({
    open: z.string(),
    close: z.string(),
    isOpen: z.boolean(),
  }),
})

export type StoreInput = z.infer<typeof storeSchema>
export type StoreSettingsInput = z.infer<typeof storeSettingsSchema>
export type StoreDocumentsInput = z.infer<typeof storeDocumentsSchema>
export type WorkingHoursInput = z.infer<typeof workingHoursSchema>
