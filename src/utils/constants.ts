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

// Egyptian Governorates
export const GOVERNORATES = [
  { id: 'cairo', name: 'Cairo', nameAr: 'القاهرة' },
  { id: 'giza', name: 'Giza', nameAr: 'الجيزة' },
  { id: 'alexandria', name: 'Alexandria', nameAr: 'الإسكندرية' },
  { id: 'dakahlia', name: 'Dakahlia', nameAr: 'الدقهلية' },
  { id: 'sharqia', name: 'Sharqia', nameAr: 'الشرقية' },
  { id: 'qalyubia', name: 'Qalyubia', nameAr: 'القليوبية' },
  { id: 'beheira', name: 'Beheira', nameAr: 'البحيرة' },
  { id: 'gharbia', name: 'Gharbia', nameAr: 'الغربية' },
  { id: 'monufia', name: 'Monufia', nameAr: 'المنوفية' },
  { id: 'kafr_el_sheikh', name: 'Kafr El Sheikh', nameAr: 'كفر الشيخ' },
  { id: 'damietta', name: 'Damietta', nameAr: 'دمياط' },
  { id: 'port_said', name: 'Port Said', nameAr: 'بورسعيد' },
  { id: 'ismailia', name: 'Ismailia', nameAr: 'الإسماعيلية' },
  { id: 'suez', name: 'Suez', nameAr: 'السويس' },
  { id: 'north_sinai', name: 'North Sinai', nameAr: 'شمال سيناء' },
  { id: 'south_sinai', name: 'South Sinai', nameAr: 'جنوب سيناء' },
  { id: 'red_sea', name: 'Red Sea', nameAr: 'البحر الأحمر' },
  { id: 'matrouh', name: 'Matrouh', nameAr: 'مطروح' },
  { id: 'fayoum', name: 'Fayoum', nameAr: 'الفيوم' },
  { id: 'beni_suef', name: 'Beni Suef', nameAr: 'بني سويف' },
  { id: 'minya', name: 'Minya', nameAr: 'المنيا' },
  { id: 'asyut', name: 'Asyut', nameAr: 'أسيوط' },
  { id: 'sohag', name: 'Sohag', nameAr: 'سوهاج' },
  { id: 'qena', name: 'Qena', nameAr: 'قنا' },
  { id: 'luxor', name: 'Luxor', nameAr: 'الأقصر' },
  { id: 'aswan', name: 'Aswan', nameAr: 'أسوان' },
  { id: 'new_valley', name: 'New Valley', nameAr: 'الوادي الجديد' },
] as const

// Payment Methods
export const PAYMENT_METHODS = [
  { id: 'cash', name: 'Cash on Delivery', nameAr: 'الدفع عند الاستلام', icon: 'Banknote' },
  { id: 'vodafone_cash', name: 'Vodafone Cash', nameAr: 'فودافون كاش', icon: 'Smartphone' },
  { id: 'instapay', name: 'InstaPay', nameAr: 'انستاباي', icon: 'CreditCard' },
  { id: 'fawry', name: 'Fawry', nameAr: 'فوري', icon: 'Building' },
  { id: 'card', name: 'Credit/Debit Card', nameAr: 'بطاقة ائتمان', icon: 'CreditCard' },
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
  { id: 'bosta', name: 'Bosta', nameAr: 'بوسطة' },
  { id: 'aramex', name: 'Aramex', nameAr: 'أرامكس' },
  { id: 'local', name: 'Local Delivery', nameAr: 'توصيل محلي' },
  { id: 'self', name: 'Self Delivery', nameAr: 'توصيل ذاتي' },
] as const

// App Configuration
export const APP_CONFIG = {
  name: 'Shoporia',
  nameAr: 'شوبوريا',
  description: 'AI-powered e-commerce platform',
  descriptionAr: 'منصة تجارة إلكترونية ذكية',
  currency: 'EGP',
  currencySymbol: 'ج.م',
  locale: 'ar-EG',
  timezone: 'Africa/Cairo',
  supportEmail: 'support@shoporia.com',
  supportPhone: '+201000000000',
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
