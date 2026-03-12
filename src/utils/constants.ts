// Store Categories
export const STORE_CATEGORIES = [
  { id: 'fashion', name: 'Fashion', nameAr: 'أزياء وملابس', icon: 'Shirt' },
  { id: 'electronics', name: 'Electronics', nameAr: 'إلكترونيات', icon: 'Smartphone' },
  { id: 'home', name: 'Home & Garden', nameAr: 'المنزل والحديقة', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', nameAr: 'الجمال والعناية', icon: 'Sparkles' },
  { id: 'food', name: 'Food & Beverages', nameAr: 'طعام ومشروبات', icon: 'UtensilsCrossed' },
  { id: 'services', name: 'Services', nameAr: 'خدمات', icon: 'Wrench' },
  { id: 'health', name: 'Health', nameAr: 'صحة وأدوية', icon: 'Heart' },
  { id: 'sports', name: 'Sports', nameAr: 'رياضة', icon: 'Dumbbell' },
  { id: 'kids', name: 'Kids', nameAr: 'أطفال', icon: 'Baby' },
  { id: 'other', name: 'Other', nameAr: 'أخرى', icon: 'Package' },
] as const

// Kuwait Governorates
export const GOVERNORATES = [
  { id: 'capital', name: 'Al Asimah', nameAr: 'العاصمة' },
  { id: 'hawalli', name: 'Hawalli', nameAr: 'حولي' },
  { id: 'farwaniya', name: 'Al Farwaniyah', nameAr: 'الفروانية' },
  { id: 'ahmadi', name: 'Al Ahmadi', nameAr: 'الأحمدي' },
  { id: 'jahra', name: 'Al Jahra', nameAr: 'الجهراء' },
  { id: 'mubarak_al_kabeer', name: 'Mubarak Al-Kabeer', nameAr: 'مبارك الكبير' },
] as const

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'knet', name: 'KNET', nameAr: 'كي نت', icon: 'CreditCard' },
  { id: 'card', name: 'Credit/Debit Card', nameAr: 'بطاقة ائتمان', icon: 'CreditCard' },
  { id: 'cash', name: 'Cash on Delivery', nameAr: 'الدفع عند الاستلام', icon: 'Banknote' },
  { id: 'bank_transfer', name: 'Bank Transfer', nameAr: 'تحويل بنكي', icon: 'Building' },
] as const

// Order Statuses
export const ORDER_STATUSES = [
  { id: 'pending', name: 'Pending', nameAr: 'قيد الانتظار', color: 'yellow' },
  { id: 'confirmed', name: 'Confirmed', nameAr: 'تم التأكيد', color: 'blue' },
  { id: 'processing', name: 'Processing', nameAr: 'جاري التجهيز', color: 'blue' },
  { id: 'shipped', name: 'Shipped', nameAr: 'تم الشحن', color: 'purple' },
  { id: 'out_for_delivery', name: 'Out for Delivery', nameAr: 'جاري التوصيل', color: 'orange' },
  { id: 'delivered', name: 'Delivered', nameAr: 'تم التوصيل', color: 'green' },
  { id: 'cancelled', name: 'Cancelled', nameAr: 'ملغي', color: 'red' },
  { id: 'refunded', name: 'Refunded', nameAr: 'مسترجع', color: 'gray' },
] as const

// Booking Statuses
export const BOOKING_STATUSES = [
  { id: 'pending', name: 'Pending', nameAr: 'قيد الانتظار', color: 'yellow' },
  { id: 'confirmed', name: 'Confirmed', nameAr: 'مؤكد', color: 'blue' },
  { id: 'in_progress', name: 'In Progress', nameAr: 'جاري التنفيذ', color: 'purple' },
  { id: 'completed', name: 'Completed', nameAr: 'مكتمل', color: 'green' },
  { id: 'cancelled', name: 'Cancelled', nameAr: 'ملغي', color: 'red' },
  { id: 'no_show', name: 'No Show', nameAr: 'لم يحضر', color: 'gray' },
] as const

// Days of Week
export const DAYS_OF_WEEK = [
  { id: 'saturday', name: 'Saturday', nameAr: 'السبت' },
  { id: 'sunday', name: 'Sunday', nameAr: 'الأحد' },
  { id: 'monday', name: 'Monday', nameAr: 'الإثنين' },
  { id: 'tuesday', name: 'Tuesday', nameAr: 'الثلاثاء' },
  { id: 'wednesday', name: 'Wednesday', nameAr: 'الأربعاء' },
  { id: 'thursday', name: 'Thursday', nameAr: 'الخميس' },
  { id: 'friday', name: 'Friday', nameAr: 'الجمعة' },
] as const

// Delivery Providers
export const DELIVERY_PROVIDERS = [
  { id: 'aramex', name: 'Aramex', nameAr: 'أرامكس' },
  { id: 'fetchr', name: 'Fetchr', nameAr: 'فيتشر' },
  { id: 'local', name: 'Local Delivery', nameAr: 'توصيل محلي' },
  { id: 'self', name: 'Self Delivery', nameAr: 'توصيل ذاتي' },
] as const

// App Configuration
export const APP_CONFIG = {
  name: 'Shoporia',
  nameAr: 'شوبوريا',
  description: 'AI-powered e-commerce platform',
  descriptionAr: 'منصة تجارة إلكترونية ذكية',
  currency: 'KWD',
  currencySymbol: 'د.ك',
  locale: 'ar-KW',
  timezone: 'Asia/Kuwait',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://shoporia.com',
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@shoporia.com',
  supportPhone: process.env.NEXT_PUBLIC_SUPPORT_PHONE || '+96550000000',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96550000000',
} as const

// Pagination
export const PAGINATION = {
  defaultPageSize: 20,
  maxPageSize: 100,
} as const

// File Upload Limits
export const UPLOAD_LIMITS = {
  maxImageSize: 5 * 1024 * 1024, // 5MB
  maxDocumentSize: 10 * 1024 * 1024, // 10MB
  maxProductImages: 10,
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf', 'image/jpeg', 'image/png'],
} as const
