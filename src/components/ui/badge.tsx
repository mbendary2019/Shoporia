import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-amazon-orange/10 text-amazon-orange dark:bg-amazon-orange/20',
        primary:
          'bg-amazon-orange text-white',
        secondary:
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        success:
          'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
        warning:
          'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
        danger:
          'bg-amazon-deal text-white',
        info:
          'bg-amazon-link/10 text-amazon-link dark:bg-amazon-link/20',
        outline:
          'border border-current bg-transparent',
        amazon:
          'bg-amazon-navy text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
