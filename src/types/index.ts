// User Types
export type UserRole = 'customer' | 'seller' | 'admin'

export interface User {
  id: string
  email: string
  phone?: string
  displayName: string
  photoURL?: string
  role: UserRole
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
  // Seller specific
  storeId?: string
  // Customer specific
  addresses?: Address[]
  wishlist?: string[]
}

export interface Address {
  id: string
  label: string
  fullName: string
  phone: string
  street: string
  city: string
  governorate: string
  postalCode?: string
  isDefault: boolean
  coordinates?: {
    lat: number
    lng: number
  }
}

// Store Types
export type StoreStatus = 'pending' | 'active' | 'suspended' | 'rejected'
export type StoreCategory =
  | 'fashion'
  | 'electronics'
  | 'home'
  | 'beauty'
  | 'food'
  | 'services'
  | 'health'
  | 'sports'
  | 'kids'
  | 'other'

export interface Store {
  id: string
  ownerId: string
  name: string
  nameAr?: string
  slug: string
  description: string
  descriptionAr?: string
  logo?: string
  banner?: string
  category: StoreCategory
  subcategories?: string[]
  status: StoreStatus
  rating: number
  reviewCount: number
  productCount: number
  serviceCount: number
  orderCount: number
  // Contact
  email?: string
  phone: string
  whatsapp?: string
  // Location
  address?: string
  city?: string
  governorate?: string
  coordinates?: {
    lat: number
    lng: number
  }
  deliveryAreas?: string[]
  // Documents
  documents?: {
    nationalId?: string
    commercialRegister?: string
    taxCard?: string
  }
  // Settings
  settings: StoreSettings
  // AI Generated
  aiGenerated?: {
    suggestedName?: string
    suggestedDescription?: string
    suggestedColors?: string[]
    suggestedLogo?: string
  }
  // Timestamps
  createdAt: Date
  updatedAt: Date
  approvedAt?: Date
}

export interface StoreSettings {
  currency: string
  language: string
  acceptsCash: boolean
  acceptsCard: boolean
  acceptsWallet: boolean
  minOrderAmount?: number
  deliveryFee?: number
  freeDeliveryThreshold?: number
  workingHours?: {
    [key: string]: {
      open: string
      close: string
      isOpen: boolean
    }
  }
  vacationMode?: boolean
  vacationMessage?: string
}

// Product Types
export type ProductStatus = 'draft' | 'active' | 'out_of_stock' | 'archived'

export interface Product {
  id: string
  storeId: string
  name: string
  nameAr?: string
  slug: string
  description: string
  descriptionAr?: string
  shortDescription?: string
  category: string
  subcategory?: string
  tags?: string[]
  // Pricing
  price: number
  compareAtPrice?: number
  costPrice?: number
  currency: string
  // Inventory
  sku?: string
  barcode?: string
  quantity: number
  trackInventory: boolean
  lowStockThreshold?: number
  // Media
  images: ProductImage[]
  video?: string
  // Variants
  hasVariants: boolean
  variants?: ProductVariant[]
  options?: ProductOption[]
  // Status
  status: ProductStatus
  isFeatured: boolean
  isDigital: boolean
  // SEO
  metaTitle?: string
  metaDescription?: string
  // Stats
  viewCount: number
  soldCount: number
  rating: number
  reviewCount: number
  // AI Generated
  aiGenerated?: {
    suggestedTitle?: string
    suggestedDescription?: string
    suggestedPrice?: number
    competitorAnalysis?: string
  }
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt?: string
  order: number
}

export interface ProductOption {
  id: string
  name: string
  nameAr?: string
  values: string[]
}

export interface ProductVariant {
  id: string
  name: string
  sku?: string
  price: number
  compareAtPrice?: number
  quantity: number
  image?: string
  options: { [key: string]: string }
}

// Service Types
export type ServiceStatus = 'active' | 'inactive' | 'archived'

export interface Service {
  id: string
  storeId: string
  name: string
  nameAr?: string
  slug: string
  description: string
  descriptionAr?: string
  category: string
  subcategory?: string
  // Pricing
  price: number
  priceType: 'fixed' | 'hourly' | 'starting_from'
  currency: string
  // Duration
  duration: number // in minutes
  bufferTime?: number // time between bookings
  // Media
  images: ProductImage[]
  // Availability
  availability: ServiceAvailability
  maxBookingsPerSlot?: number
  // Packages
  packages?: ServicePackage[]
  // Status
  status: ServiceStatus
  isFeatured: boolean
  // Stats
  viewCount: number
  bookingCount: number
  rating: number
  reviewCount: number
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export interface ServiceAvailability {
  [day: string]: {
    isAvailable: boolean
    slots: { start: string; end: string }[]
  }
}

export interface ServicePackage {
  id: string
  name: string
  nameAr?: string
  description?: string
  price: number
  duration: number
  features: string[]
}

// Order Types
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'
export type PaymentMethod = 'cash' | 'card' | 'vodafone_cash' | 'instapay' | 'fawry'

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  storeId: string
  // Items
  items: OrderItem[]
  // Pricing
  subtotal: number
  discount: number
  deliveryFee: number
  tax: number
  total: number
  currency: string
  // Coupon
  couponCode?: string
  couponDiscount?: number
  // Payment
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentDetails?: {
    transactionId?: string
    paidAt?: Date
  }
  // Delivery
  deliveryAddress: Address
  deliveryMethod: 'standard' | 'express' | 'pickup'
  estimatedDelivery?: Date
  actualDelivery?: Date
  trackingNumber?: string
  deliveryNotes?: string
  // Status
  status: OrderStatus
  statusHistory: OrderStatusHistory[]
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  productId: string
  variantId?: string
  name: string
  image: string
  quantity: number
  price: number
  total: number
  options?: { [key: string]: string }
}

export interface OrderStatusHistory {
  status: OrderStatus
  timestamp: Date
  note?: string
  updatedBy?: string
}

// Booking Types
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export interface Booking {
  id: string
  bookingNumber: string
  customerId: string
  storeId: string
  serviceId: string
  packageId?: string
  // Timing
  date: Date
  startTime: string
  endTime: string
  duration: number
  // Pricing
  price: number
  discount?: number
  total: number
  currency: string
  // Payment
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  // Status
  status: BookingStatus
  // Customer Info
  customerName: string
  customerPhone: string
  customerEmail?: string
  notes?: string
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// Review Types
export interface Review {
  id: string
  type: 'product' | 'service' | 'store'
  targetId: string
  storeId: string
  customerId: string
  customerName: string
  customerPhoto?: string
  rating: number
  title?: string
  comment: string
  images?: string[]
  // Response
  sellerResponse?: {
    comment: string
    respondedAt: Date
  }
  // Status
  isVerified: boolean
  isVisible: boolean
  // Timestamps
  createdAt: Date
  updatedAt: Date
}

// Analytics Types
export interface StoreAnalytics {
  storeId: string
  period: 'daily' | 'weekly' | 'monthly'
  date: Date
  // Sales
  totalSales: number
  orderCount: number
  averageOrderValue: number
  // Products
  productViews: number
  topProducts: { productId: string; sales: number }[]
  // Customers
  newCustomers: number
  returningCustomers: number
  // Traffic
  pageViews: number
  uniqueVisitors: number
}

// Notification Types
export type NotificationType =
  | 'order_new'
  | 'order_status'
  | 'payment_received'
  | 'review_new'
  | 'stock_low'
  | 'booking_new'
  | 'booking_reminder'
  | 'promotion'
  | 'system'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  titleAr?: string
  message: string
  messageAr?: string
  data?: Record<string, unknown>
  isRead: boolean
  createdAt: Date
}

// Coupon Types
export type CouponType = 'percentage' | 'fixed'

export interface Coupon {
  id: string
  storeId: string
  code: string
  type: CouponType
  value: number
  minOrderAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  startDate: Date
  endDate: Date
  isActive: boolean
  applicableProducts?: string[]
  applicableCategories?: string[]
  createdAt: Date
}

// Delivery Types
export interface DeliveryRequest {
  id: string
  orderId: string
  storeId: string
  provider: 'bosta' | 'aramex' | 'local' | 'self'
  trackingNumber?: string
  status: 'pending' | 'picked_up' | 'in_transit' | 'delivered' | 'failed'
  pickupAddress: Address
  deliveryAddress: Address
  estimatedDelivery?: Date
  actualDelivery?: Date
  fee: number
  createdAt: Date
  updatedAt: Date
}

// Payment Types
export interface Payment {
  id: string
  orderId?: string
  bookingId?: string
  storeId: string
  customerId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  provider?: string
  transactionId?: string
  metadata?: Record<string, unknown>
  createdAt: Date
  updatedAt: Date
}

// AI Types
export interface AILog {
  id: string
  storeId?: string
  userId: string
  type: 'description' | 'pricing' | 'analysis' | 'chat' | 'image'
  prompt: string
  response: string
  model: string
  tokens: number
  cost: number
  createdAt: Date
}

// Category Types
export interface Category {
  id: string
  name: string
  nameAr: string
  slug: string
  icon?: string
  image?: string
  parentId?: string
  order: number
  isActive: boolean
  productCount?: number
}

// Banner/Promotion Types
export interface Banner {
  id: string
  title: string
  titleAr?: string
  subtitle?: string
  subtitleAr?: string
  image: string
  imageMobile?: string
  link?: string
  linkType?: 'product' | 'category' | 'store' | 'external'
  targetId?: string
  order: number
  isActive: boolean
  startDate?: Date
  endDate?: Date
  createdAt: Date
}
