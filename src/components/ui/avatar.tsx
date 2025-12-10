'use client'

import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/utils/cn'
import { User } from 'lucide-react'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  fallback?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-base',
  lg: 'h-12 w-12 text-lg',
  xl: 'h-16 w-16 text-xl',
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = '', fallback, size = 'md', ...props }, ref) => {
    const [error, setError] = React.useState(false)

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !error ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={() => setError(true)}
          />
        ) : fallback ? (
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {getInitials(fallback)}
          </span>
        ) : (
          <User className="h-1/2 w-1/2 text-gray-500 dark:text-gray-400" />
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }
