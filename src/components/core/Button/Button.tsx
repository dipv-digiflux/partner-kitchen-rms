import { cn } from '@/lib/utils/utills'
import type { ButtonProps } from '@/types/components.types'
import { forwardRef } from 'react'
import { getButtonClasses } from './buttonVariants'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', outline = false, rounded = false, iconOnly = false, startIcon, endIcon, isLoading, title, disabled, ...props }, ref): React.JSX.Element => {
    const variantClasses = getButtonClasses({ variant, size, outline, rounded, iconOnly })

    return (
      <button ref={ref} className={cn('btn', variantClasses, className)} disabled={isLoading || disabled} {...props}>
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-current inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {!isLoading && startIcon ? <span className="mr-2 inline-flex items-center">{startIcon}</span> : null}
        {title}
        {!isLoading && endIcon ? <span className="ml-2 inline-flex items-center">{endIcon}</span> : null}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
