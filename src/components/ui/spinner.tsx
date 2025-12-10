import { cn } from '@/utils/cn'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary-500 border-t-transparent',
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export function Loading({ text = 'جاري التحميل...', fullScreen }: LoadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        fullScreen && 'fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50'
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  )
}
