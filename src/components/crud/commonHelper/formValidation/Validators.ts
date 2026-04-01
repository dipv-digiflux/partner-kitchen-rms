import { FieldValues, Path } from 'react-hook-form'
import { FileValidationProps, OptionalRequiredConditionProps } from '@/types/form.types'

export const FileValidation = ({ value, fileSize, fileType }: FileValidationProps) => {
  if (!value) return true

  // Convert to array for unified processing
  let files: (File | Blob)[] = []
  if (typeof FileList !== 'undefined' && value instanceof FileList) {
    files = Array.from(value)
  } else if (Array.isArray(value)) {
    files = value.filter((item) => item instanceof File || item instanceof Blob)
  } else if (value instanceof File || value instanceof Blob) {
    files = [value]
  }

  if (files.length === 0) return true

  const allowed = fileType && Array.isArray(fileType) ? fileType.map((t) => String(t).toLowerCase().replace('.', '')) : []

  for (const file of files) {
    // Size check (fileSize is in MB)
    if (fileSize && file.size > fileSize * 1024 * 1024) {
      return `maximum ${fileSize}MB is allowed`
    }

    // Type check (extension check)
    if (allowed.length && file instanceof File) {
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      if (!allowed.includes(extension)) {
        return `only ${allowed.join(', ')} is allowed`
      }
    }
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
