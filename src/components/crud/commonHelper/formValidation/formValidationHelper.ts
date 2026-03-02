import { CommonValidationFunction } from './CommonValidationFunction'
import { CombineRulesProps, CommonValidationProps } from '@/types/form.types'
import type { FieldValues, Validate } from 'react-hook-form'

export const combineRules = ({ rules = {}, validateRule }: CombineRulesProps) => {
  const newRules = structuredClone(rules)
  const safeValidateRule = validateRule || ({ name: '' } as CommonValidationProps)

  // create common  validation rules
  const validate = { ...CommonValidationFunction(safeValidateRule), ...((newRules.validate as Record<string, Validate<FieldValues, FieldValues>>) ?? {}) }
  newRules.validate = validate

  return newRules
}
