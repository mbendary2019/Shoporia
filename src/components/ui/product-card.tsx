'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Heart, Star, ShoppingCart, Eye, Check } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/format'
import { Badge } from './badge'
import { Button } from './button'

interface Product {
  id: string
  name: string
  price: number
  compareAtPrice?: number
  image?: string
  rating: number
  reviewCount: number
  store: {
    name: string
    slug: string
  }
  category?: string
  isPrime?: boolean
  inStock?: boolean
  stockCount?: number
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'compact' | 'horizontal'
  showQuickView?: boolean
  onAddToCart?: (product: Product) => void
  onAddToWishlist?: (product: Product) => void
}

export function ProductCard({
  product,
  variant = 'default',
  showQuickView = true,
  onAddToCart,
  onAddToWishlist,
}: ProductCardProps) {
  const t = useTranslations('product')
  const tCommon = useTranslations('common')
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddedToCart(true)
    onAddToCart?.(product)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    onAddToWishlist?.(product)
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group flex gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        {/* Image */}
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-lg bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-gray-300" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-amazon-link dark:text-white">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-4 w-4',
                    i < Math.floor(product.rating)
                      ? 'fill-amazon-star text-amazon-star'
                      : 'text-gray-300'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-amazon-link">{product.reviewCount.toLocaleString()}</span>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Prime Badge */}
          {product.isPrime && (
            <div className="mt-2 flex items-center gap-1">
              <span className="text-xs font-bold text-amazon-link">prime</span>
              <span className="text-xs text-gray-600">{t('freeDelivery')}</span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <div
      className="group relative flex flex-col rounded-lg border border-gray-200 bg-white transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingCart className="h-20 w-20 text-gray-200" />
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute start-2 top-2 bg-amazon-deal text-white">
            {t('discountPercent', { percent: discount })}
          </Badge>
        )}

        {/* Quick Actions - Appear on Hover */}
        <div
          className={cn(
            'absolute end-2 top-2 flex flex-col gap-2 transition-all duration-200',
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
          )}
        >
          <button
            onClick={handleAddToWishlist}
            aria-label={isWishlisted ? t('removeFromWishlist') : t('addToWishlist')}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all',
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white hover:bg-red-50 text-gray-600 hover:text-red-500'
            )}
          >
            <Heart className={cn('h-5 w-5', isWishlisted && 'fill-current')} />
          </button>
          {showQuickView && (
            <button aria-label={t('quickView')} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100">
              <Eye className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </div>

        {/* Stock Badge */}
        {product.stockCount !== undefined && product.stockCount < 10 && product.stockCount > 0 && (
          <div className="absolute bottom-2 start-2 rounded bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
            {t('stockLow', { count: product.stockCount })}
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Store Name */}
        <Link
          href={`/store/${product.store.slug}`}
          className="text-xs text-amazon-link hover:text-amazon-linkHover hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          {product.store.name}
        </Link>

        {/* Product Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-medium text-gray-900 hover:text-amazon-link dark:text-white">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1" role="img" aria-label={t('ratingOf', { rating: product.rating })}>
          <div className="flex" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < Math.floor(product.rating)
                    ? 'fill-amazon-star text-amazon-star'
                    : 'text-gray-300'
                )}
              />
            ))}
          </div>
          <Link
            href={`/product/${product.id}#reviews`}
            className="text-xs text-amazon-link hover:text-amazon-linkHover"
          >
            ({product.reviewCount.toLocaleString()})
          </Link>
        </div>

        {/* Price */}
        <div className="mt-2 overflow-hidden">
          {discount > 0 && (
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
              <span className="rounded bg-amazon-deal px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-bold text-white shrink-0">
                -{discount}%
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500 truncate">
                {t('was')} <span className="line-through">{formatCurrency(product.compareAtPrice!)}</span>
              </span>
            </div>
          )}
          <div className="mt-1 flex items-baseline gap-0.5 sm:gap-1 flex-wrap">
            <span className="text-[10px] sm:text-xs text-gray-600">{tCommon('currency')}</span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
              {Math.floor(product.price)}
            </span>
            <span className="text-xs sm:text-sm text-gray-900 dark:text-white">
              {((product.price % 1) * 100).toFixed(0).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Prime & Delivery */}
        {product.isPrime && (
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded bg-amazon-navy px-1.5 py-0.5 text-[10px] font-bold text-white">
              PRIME
            </span>
            <span className="text-xs text-gray-600">{t('freeDeliveryTomorrow')}</span>
          </div>
        )}

        {/* Stock Status */}
        {product.inStock === false ? (
          <p className="mt-2 text-sm font-medium text-red-600">{t('outOfStockNow')}</p>
        ) : (
          <p className="mt-2 text-sm text-green-600">{t('inStock')}</p>
        )}

        {/* Add to Cart Button */}
        <div className="mt-auto pt-3">
          <Button
            onClick={handleAddToCart}
            disabled={product.inStock === false}
            className={cn(
              'w-full transition-all',
              isAddedToCart
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-amazon-yellow hover:bg-amazon-yellowHover text-amazon-navy'
            )}
          >
            {isAddedToCart ? (
              <>
                <Check className="h-4 w-4" />
                {t('addedToCart')}
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                {t('addToCart')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Deal Card for special offers
export function DealCard({ product }: { product: Product }) {
  const t = useTranslations('product')
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Deal Badge */}
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="danger" className="bg-amazon-deal">
          {t('dealOfDay')}
        </Badge>
        <span className="text-sm font-bold text-amazon-deal">-{discount}%</span>
      </div>

      {/* Image */}
      <div className="relative mx-auto h-40 w-40">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg bg-gray-100">
            <ShoppingCart className="h-16 w-16 text-gray-300" />
          </div>
        )}
      </div>

      {/* Progress Bar - Claimed */}
      <div className="mt-4">
        <div className="h-6 rounded-full bg-red-100 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-amazon-deal to-red-400 rounded-full"
            style={{ width: '65%' }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {t('claimed', { percent: 65 })}
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="mt-3 text-center overflow-hidden">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-amazon-deal">
          {formatCurrency(product.price)}
        </span>
        <span className="ms-1 sm:ms-2 text-xs sm:text-sm text-gray-500 line-through">
          {formatCurrency(product.compareAtPrice!)}
        </span>
      </div>
    </Link>
  )
}
