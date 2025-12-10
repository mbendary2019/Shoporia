import { z } from 'zod'

export const addressSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, 'يرجى إدخال تسمية العنوان'),
  fullName: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, 'رقم الهاتف غير صالح'),
  street: z.string().min(5, 'يرجى إدخال العنوان بالتفصيل'),
  city: z.string().min(2, 'يرجى إدخال المدينة'),
  governorate: z.string().min(2, 'يرجى اختيار المحافظة'),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
})

export const orderItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  name: z.string(),
  image: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(0),
  total: z.number().min(0),
  options: z.record(z.string()).optional(),
})

export const checkoutSchema = z.object({
  items: z.array(orderItemSchema).min(1, 'السلة فارغة'),
  deliveryAddress: addressSchema,
  deliveryMethod: z.enum(['standard', 'express', 'pickup']).default('standard'),
  paymentMethod: z.enum(['cash', 'card', 'vodafone_cash', 'instapay', 'fawry']),
  couponCode: z.string().optional(),
  deliveryNotes: z.string().max(500).optional(),
})

export const orderStatusUpdateSchema = z.object({
  status: z.enum([
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'out_for_delivery',
    'delivered',
    'cancelled',
    'refunded',
  ]),
  note: z.string().max(500).optional(),
})

export const refundRequestSchema = z.object({
  orderId: z.string(),
  reason: z.string().min(10, 'يرجى توضيح سبب الاسترجاع'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })).optional(),
})

export type AddressInput = z.infer<typeof addressSchema>
export type OrderItemInput = z.infer<typeof orderItemSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type OrderStatusUpdateInput = z.infer<typeof orderStatusUpdateSchema>
export type RefundRequestInput = z.infer<typeof refundRequestSchema>
