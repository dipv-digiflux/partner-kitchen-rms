// set error for react hook form validation
import { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { ValidationError } from '@/types/form.types'

export const setValidationError = <TFieldValues extends FieldValues>(error: ValidationError | unknown, control: UseFormReturn<TFieldValues>['control']) => {
  const err = error as ValidationError
  if (err && err.errors && Array.isArray(err.errors) && control) {
    for (const { key, message } of err.errors) {
      control.setError(key as Path<TFieldValues>, { type: 'custom', message })
    }
  }
}
