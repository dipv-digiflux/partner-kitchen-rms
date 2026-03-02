import IconEye from '@/assets/Icon/IconEye'
import { InputProps } from '@/types/textInputField'
import { forwardRef, useId, useState } from 'react'

const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ')

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', size = 'md', label, errors, touched, description, className, wrapperClassName, labelClassName = 'fs-14 font-medium', id, startIcon, endIcon, onIconClick, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const isPassword = type === 'password'
    const currentType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type

    const hasError = touched && errors
    const errorMessage = typeof errors === 'string' ? errors : Array.isArray(errors) ? errors.join(', ') : null

    const sizeClasses = {
      sm: 'form-input-sm',
      md: 'form-input',
      lg: 'form-input-lg',
    }

    return (
      <div className={cn(wrapperClassName, hasError ? 'has-error' : hasError === false ? 'has-success' : '')}>
        {label ? (
          <label htmlFor={inputId} className={cn(labelClassName)}>
            {label}
          </label>
        ) : null}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={currentType}
            className={cn(
              'form-input',
              size !== 'md' && sizeClasses[size],
              !!startIcon && 'ltr:pl-9 rtl:pr-9', // Add padding for start icon
              (!!endIcon || isPassword) && 'ltr:pr-9 rtl:pl-9', // Add padding for end icon
              // If standalone without .has-error parent, we can force styles, but .has-error works on parent now
              className,
            )}
            {...props}
          />

          {/* Start Icon */}
          {startIcon ? <div className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3">{startIcon}</div> : null}

          {/* Password Toggle Icon */}
          {isPassword ? (
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-primary hover:text-primary-dark focus:outline-none"
            >
              {isPasswordVisible ? (
                <IconEye />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                  <path
                    d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M3 21L21 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ) : null}

          {/* End Icon */}
          {!isPassword && endIcon ? (
            <div className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2" onClick={onIconClick}>
              {endIcon}
            </div>
          ) : null}
        </div>

        {/* Error / Description */}
        {hasError && errorMessage ? <div className="mt-1 text-danger text-xs">{errorMessage}</div> : description ? <div className="mt-1 text-white-dark text-xs">{description}</div> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'
