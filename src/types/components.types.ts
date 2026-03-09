import { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'warning' | 'orange' | 'light' | 'dark' | 'text'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonClassOptions = {
  variant: ButtonVariant
  size: ButtonSize
  outline: boolean
  rounded: boolean
  iconOnly: boolean
}

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  outline?: boolean
  rounded?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  iconOnly?: boolean
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  className?: string
  footer?: React.ReactNode
}

export interface OptionType {
  value: string | number
  label: string
}

export interface SelectProps {
  value: string | number | (string | number)[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void
  options: OptionType[]
  onBlur?: () => void
  placeholder?: string
  [key: string]: unknown
}

export interface DropdownProps {
  placement?: string
  offset?: [number, number]
  btnClassName?: string
  button: React.ReactNode
  children: React.ReactNode
}

export interface DropdownHandle {
  close: () => void
}
export interface BreadCrumbItem {
  name: string
  link?: string
}

export interface ModuleBreadCrumbProps {
  /** If not passed, uses API.pageTitle from ModuleContext (when inside a CRUD module). */
  pageTitle?: string
  breadCrumbs?: BreadCrumbItem[]
  children?: React.ReactNode
}
