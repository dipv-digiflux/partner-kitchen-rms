import { ComponentProps, ReactNode } from 'react'

type InputSize = 'sm' | 'md' | 'lg'
type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'checkbox' | 'radio' | 'date' | 'time' | 'datetime-local' | 'file' | 'month'

export type InputProps = Omit<ComponentProps<'input'>, 'size' | 'type' | 'ref' | 'className'> & {
  type?: InputType
  size?: InputSize
  label?: string
  errors?: string | string[] | boolean
  touched?: boolean
  description?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  wrapperClassName?: string
  labelClassName?: string
  className?: string
  onIconClick?: () => void
}
