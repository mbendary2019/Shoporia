'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, Button, Badge } from '@/components/ui'
import { formatCurrency } from '@/utils/format'
import { useCartStore } from '@/store'
import {
  Heart,
  ShoppingCart,
  Trash2,
  Star,
  ExternalLink,
} from 'lucide-react'

// Mock wishlist data
const wishlistItems = [
  {
    id: '1',
    name: 'ساعة ذكية متطورة',
    price: 2500,
    originalPrice: 3000,
    image: '/products/watch.jpg',
    store: 'متجر التقنية',
    storeSlug: 'tech-store',
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    name: 'حقيبة يد جلد طبيعي',
    price: 1250,
    originalPrice: null,
    image: '/products/bag.jpg',
    store: 'بوتيك الجمال',
    storeSlug: 'beauty-boutique',
    rating: 4.6,
    inStock: true,
  },
  {
    id: '3',
    name: 'سماعات بلوتوث لاسلكية',
    price: 899,
    originalPrice: 1200,
    image: '/products/headphones.jpg',
    store: 'متجر التقنية',
    storeSlug: 'tech-store',
    rating: 4.5,
    inStock: false,
  },
  {
    id: '4',
    name: 'قميص قطن فاخر',
    price: 450,
    originalPrice: null,
    image: '/products/shirt.jpg',
    store: 'متجر الأناقة',
    storeSlug: 'elegance-store',
    rating: 4.7,
    inStock: true,
  },
]

export default function AccountWishlistPage() {
  const [items, setItems] = useState(wishlistItems)
  const { addItem } = useCartStore()

  const handleRemove = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    // Create a minimal Product object for the cart
    const product = {
      id: item.id,
      storeId: item.storeSlug,
      name: item.name,
      slug: item.id,
      description: '',
      category: '',
      price: item.price,
      compareAtPrice: item.originalPrice || undefined,
      currency: 'EGP',
      quantity: 100,
      trackInventory: false,
      images: [{ id: '1', url: item.image, order: 0 }],
      hasVariants: false,
      status: 'active' as const,
      isFeatured: false,
      isDigital: false,
      viewCount: 0,
      soldCount: 0,
      rating: item.rating,
      reviewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    addItem(product)
  }

  const handleAddAllToCart = () => {
    items
      .filter((item) => item.inStock)
      .forEach((item) => handleAddToCart(item))
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              المفضلة
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {items.length} منتج في المفضلة
            </p>
          </div>

          {items.length > 0 && (
            <Button onClick={handleAddAllToCart}>
              <ShoppingCart className="h-4 w-4" />
              إضافة الكل للسلة
            </Button>
          )}
        </div>
      </Card>

      {/* Wishlist Items */}
      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative h-24 w-24 shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {item.originalPrice && (
                    <Badge
                      variant="danger"
                      className="absolute -start-2 -top-2"
                    >
                      -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <Link
                    href={`/product/${item.id}`}
                    className="font-medium text-gray-900 hover:text-primary-500 dark:text-white"
                  >
                    {item.name}
                  </Link>

                  <Link
                    href={`/store/${item.storeSlug}`}
                    className="mt-1 text-sm text-gray-500 hover:text-primary-500"
                  >
                    {item.store}
                  </Link>

                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                    {!item.inStock && (
                      <Badge variant="danger">غير متوفر</Badge>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {formatCurrency(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatCurrency(item.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.inStock}
                  className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-primary-500 hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-primary-900/20"
                >
                  <ShoppingCart className="h-4 w-4" />
                  أضف للسلة
                </button>
                <div className="w-px bg-gray-200 dark:bg-gray-700" />
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                  إزالة
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            قائمة المفضلة فارغة
          </p>
          <Link href="/marketplace" className="mt-4 inline-block">
            <Button>تصفح المنتجات</Button>
          </Link>
        </Card>
      )}
    </div>
  )
}
