import { FieldValues, RegisterOptions, UseFormReturn } from 'react-hook-form'

export interface ValidationError {
  errors?: {
    key: string
    message: string
  }[]
  [key: string]: unknown
}

export type RegularExpressionType = 'email' | 'int' | 'number' | 'alphabetical' | 'alphanumeric' | 'panCard' | 'percentage' | 'url'

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'file'
  | 'month'
  | 'otp'
  | 'daterange'
  | 'duallistdnd'

export interface OptionalRequiredConditionType {
  name: string
  value?: string | string[]
  valueNot?: string | string[]
}

export interface CommonValidationProps {
  formContextApi?: UseFormReturn<FieldValues>
  required?: boolean
  optionalRequired?: OptionalRequiredConditionType | OptionalRequiredConditionType[]
  htmlCheck?: boolean
  name: string
  type?: InputType
  validType?: RegularExpressionType
  stopMode?: boolean
  minLength?: number
  maxLength?: number
  fixedDate?: boolean
  fixedPastDate?: boolean
  fileSize?: number
  fileType?: string[]
}

export interface FileValidationProps {
  value: FileList | File | null | undefined
  fileSize?: number
  fileType?: string[]
}

export interface OptionalRequiredConditionProps<TFieldValues extends FieldValues> {
  formContextApi?: UseFormReturn<TFieldValues>
  optionalRequired?: OptionalRequiredConditionType | OptionalRequiredConditionType[]
}

export interface CombineRulesProps {
  rules?: RegisterOptions
  validateRule?: CommonValidationProps
}

export interface FormFieldProps extends React.HTMLAttributes<HTMLElement> {
  name: string
  type?: InputType | 'textarea'
  label?: string | React.ComponentType<{ inputId: string }>
  errorName?: string
  rules?: RegisterOptions
  validateRule?: Omit<CommonValidationProps, 'name'> & { name?: string }
  options?: unknown[]
  placeholder?: string
  disabled?: boolean
  helperText?: string
  rows?: number
  isMulti?: boolean
  menuPlacement?: 'auto' | 'bottom' | 'top'
  menuPosition?: 'absolute' | 'fixed'
  menuPortalTarget?: HTMLElement | null
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  step?: number | string
  multiple?: boolean
  accept?: string
}

export interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
}

export interface FormElementProps {
  type?: InputType | 'textarea'
  name: string
  newRules: RegisterOptions
  register: UseFormReturn<FieldValues>['register']
  control: UseFormReturn<FieldValues>['control']
  inputId: string
  required?: boolean
  placeholder?: string
  atr?: React.HTMLAttributes<HTMLElement> & Record<string, unknown>
  options?: unknown[]
  validateRule?: Omit<CommonValidationProps, 'name'> & { name?: string }
}
