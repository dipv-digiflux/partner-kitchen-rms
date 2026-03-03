import { CommonValidationFunction } from './CommonValidationFunction'
import { CombineRulesProps, CommonValidationProps } from '@/types/form.types'
import type { FieldValues, Validate } from 'react-hook-form'

export const combineRules = ({ rules = {}, validateRule }: CombineRulesProps) => {
  const newRules = { ...rules }
  const safeValidateRule = validateRule || ({ name: '' } as CommonValidationProps)

  // extract existing validate prop, supporting both function and record of functions
  let existingValidate = newRules.validate
  if (typeof existingValidate === 'function') {
    existingValidate = { customValidate: existingValidate }
  } else if (!existingValidate) {
    existingValidate = {}
  }

  // create common  validation rules
  const validate = { ...CommonValidationFunction(safeValidateRule), ...(existingValidate as Record<string, Validate<FieldValues, FieldValues>>) }
  newRules.validate = validate

  return newRules
}
