import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(3, 'اسم المنتج يجب أن يكون 3 أحرف على الأقل').max(100, 'اسم المنتج طويل جداً'),
  nameAr: z.string().min(3).max(100).optional(),
  description: z.string().min(20, 'الوصف يجب أن يكون 20 حرف على الأقل').max(2000, 'الوصف طويل جداً'),
  descriptionAr: z.string().min(20).max(2000).optional(),
  shortDescription: z.string().max(200).optional(),
  category: z.string().min(1, 'يرجى اختيار الفئة'),
  subcategory: z.string().optional(),
  tags: z.array(z.string()).max(10, 'الحد الأقصى 10 وسوم').optional(),
  // Pricing
  price: z.number().min(1, 'السعر يجب أن يكون أكبر من صفر'),
  compareAtPrice: z.number().min(0).optional(),
  costPrice: z.number().min(0).optional(),
  // Inventory
  sku: z.string().max(50).optional(),
  barcode: z.string().max(50).optional(),
  quantity: z.number().min(0, 'الكمية يجب أن تكون صفر أو أكثر').default(0),
  trackInventory: z.boolean().default(true),
  lowStockThreshold: z.number().min(0).optional(),
  // Status
  status: z.enum(['draft', 'active', 'out_of_stock', 'archived']).default('draft'),
  isFeatured: z.boolean().default(false),
  isDigital: z.boolean().default(false),
  // SEO
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
})

export const productImageSchema = z.object({
  id: z.string(),
  url: z.string().url('رابط الصورة غير صالح'),
  alt: z.string().max(100).optional(),
  order: z.number().min(0),
})

export const productOptionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'اسم الخيار مطلوب'),
  nameAr: z.string().optional(),
  values: z.array(z.string()).min(1, 'يجب إضافة قيمة واحدة على الأقل'),
})

export const productVariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  sku: z.string().optional(),
  price: z.number().min(0),
  compareAtPrice: z.number().min(0).optional(),
  quantity: z.number().min(0),
  image: z.string().optional(),
  options: z.record(z.string()),
})

export const productWithVariantsSchema = productSchema.extend({
  hasVariants: z.boolean().default(false),
  options: z.array(productOptionSchema).optional(),
  variants: z.array(productVariantSchema).optional(),
  images: z.array(productImageSchema).min(1, 'يجب إضافة صورة واحدة على الأقل'),
})

export type ProductInput = z.infer<typeof productSchema>
export type ProductImageInput = z.infer<typeof productImageSchema>
export type ProductOptionInput = z.infer<typeof productOptionSchema>
export type ProductVariantInput = z.infer<typeof productVariantSchema>
export type ProductWithVariantsInput = z.infer<typeof productWithVariantsSchema>
