import { FieldValues, Path } from 'react-hook-form'
import { FileValidationProps, OptionalRequiredConditionProps } from '@/types/form.types'

export const FileValidation = ({ value, fileSize, fileType }: FileValidationProps) => {
  if (value && typeof FileList !== 'undefined' && value instanceof FileList) {
    const allowed = fileType && Array.isArray(fileType) ? fileType.map((t) => String(t).toLowerCase()) : []
    for (let i = 0; i < value.length; i++) {
      const file = value[i]
      if (fileSize && file.size > fileSize * 1e6) {
        return `maximum ${fileSize}MB is allowed`
      }
      if (allowed.length && !allowed.includes(file.name.split('.').pop()?.toLowerCase() || '')) {
        return `only ${allowed.join(', ')} is allowed`
      }
    }
    return true
  }
  return true
}

export const OptionalRequiredCondition = <TFieldValues extends FieldValues>({ formContextApi, optionalRequired }: OptionalRequiredConditionProps<TFieldValues>) => {
  if (formContextApi && optionalRequired) {
    // make to array for multiple condition  add
    const conditions = Array.isArray(optionalRequired) ? optionalRequired : [optionalRequired]

    return conditions.some((condition) => {
      const fieldValue = formContextApi.getValues(condition.name as Path<TFieldValues>)
      // checkValueMatch is defined below
      // But wait, checkValueMatch is NOT exported and is used here.
      // I need to make sure checkValueMatch is available.
      // It is defined at the bottom of the file in the previous version.
      // I am replacing strictly the top part.
      return (condition.value === undefined || checkValueMatch(fieldValue, condition.value)) && (condition.valueNot === undefined || !checkValueMatch(fieldValue, condition.valueNot))
    })
  }
  return false
}

const checkValueMatch = (value: unknown, condition: string | string[]) => {
  if (value == undefined) return false

  if (condition === '*') {
    if (Array.isArray(value)) return value.length > 0
    return String(value).trim() !== ''
  }

  const valueArray = new Set(Array.isArray(value) ? (value as unknown[]) : [value])
  const conditionArray = Array.isArray(condition) ? condition : [condition]

  return conditionArray.some((cond) => valueArray.has(cond))
}
