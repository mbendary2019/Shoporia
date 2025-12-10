import { z } from 'zod'

export const serviceSchema = z.object({
  name: z.string().min(3, 'اسم الخدمة يجب أن يكون 3 أحرف على الأقل').max(100, 'اسم الخدمة طويل جداً'),
  nameAr: z.string().min(3).max(100).optional(),
  description: z.string().min(20, 'الوصف يجب أن يكون 20 حرف على الأقل').max(2000, 'الوصف طويل جداً'),
  descriptionAr: z.string().min(20).max(2000).optional(),
  category: z.string().min(1, 'يرجى اختيار الفئة'),
  subcategory: z.string().optional(),
  // Pricing
  price: z.number().min(1, 'السعر يجب أن يكون أكبر من صفر'),
  priceType: z.enum(['fixed', 'hourly', 'starting_from']).default('fixed'),
  // Duration
  duration: z.number().min(15, 'المدة يجب أن تكون 15 دقيقة على الأقل'),
  bufferTime: z.number().min(0).optional(),
  // Status
  status: z.enum(['active', 'inactive', 'archived']).default('active'),
  isFeatured: z.boolean().default(false),
  maxBookingsPerSlot: z.number().min(1).optional(),
})

export const servicePackageSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'اسم الباقة مطلوب'),
  nameAr: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0),
  duration: z.number().min(15),
  features: z.array(z.string()),
})

export const serviceAvailabilitySchema = z.object({
  saturday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  sunday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  monday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  tuesday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  wednesday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  thursday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
  friday: z.object({
    isAvailable: z.boolean(),
    slots: z.array(z.object({
      start: z.string(),
      end: z.string(),
    })),
  }),
})

export const bookingSchema = z.object({
  serviceId: z.string().min(1, 'يرجى اختيار الخدمة'),
  packageId: z.string().optional(),
  date: z.date({ required_error: 'يرجى اختيار التاريخ' }),
  startTime: z.string().min(1, 'يرجى اختيار الوقت'),
  customerName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  customerPhone: z.string().regex(/^01[0125][0-9]{8}$/, 'رقم الهاتف غير صالح'),
  customerEmail: z.string().email('البريد الإلكتروني غير صالح').optional(),
  notes: z.string().max(500).optional(),
  paymentMethod: z.enum(['cash', 'card', 'vodafone_cash', 'instapay', 'fawry']).default('cash'),
})

export type ServiceInput = z.infer<typeof serviceSchema>
export type ServicePackageInput = z.infer<typeof servicePackageSchema>
export type ServiceAvailabilityInput = z.infer<typeof serviceAvailabilitySchema>
export type BookingInput = z.infer<typeof bookingSchema>
