import { CommonValidationProps, RegularExpressionType } from '@/types/form.types'
import { FileValidation, OptionalRequiredCondition } from './Validators'

export const CommonValidationFunction = (props: CommonValidationProps) => {
  const { formContextApi, required, optionalRequired, htmlCheck = true, name, type, validType, stopMode = false } = props

  // modified variables
  const { minLength, maxLength, fixedDate, fixedPastDate } = props

  // regex  validate
  const regex = validType ? regexGet(validType) : type == 'email' ? regexGet('email') : undefined

  return {
    CommonValidationFunction: async (inputValue: unknown) => {
      try {
        let val: string | unknown[] | FileList | File | null = ''
        if (Array.isArray(inputValue) || (typeof FileList !== 'undefined' && inputValue instanceof FileList)) {
          val = (inputValue as string[] | FileList).length ? inputValue : ''
        } else if (typeof File !== 'undefined' && inputValue instanceof File) {
          val = inputValue
        } else {
          val = inputValue != undefined ? String(inputValue)?.trim() : null
        }

        // stop validation
        if (stopMode === true) return true

        let isRequired = required

        // optional required
        if (OptionalRequiredCondition({ formContextApi, optionalRequired })) isRequired = true

        // only check validation that time if input have value
        if (isRequired !== true && val === '') return true

        // not empty value
        if (isRequired === true && (val === '' || val == undefined || val === null)) return `${name} is required`

        // html validation check
        if (htmlCheck === true && typeof val === 'string' && /<\/?[^>]+>/.test(val)) return `<value> is not allowed`

        // min Length
        // val must be string or array to have length (FileList has length too)
        // Original code: `value.trim().length`. implies string.
        // If val is FileList, `trim` fails.
        // Original code probably assumed string for minLength check.
        if (typeof val === 'string' && minLength != undefined && val.trim().length <= minLength - 1) return `minimum ${minLength} characters are required`

        // max Length
        if (typeof val === 'string' && maxLength != undefined && val.trim().length >= maxLength + 1) return `maximum ${maxLength} characters are allowed`

        // regex validation check (email, url , number , percentage)
        if (regex && typeof val === 'string' && !regex.test(val)) return `Please enter a valid ${name}`

        // date || time || month compare
        if (type && ['date', 'month', 'datetime-local'].includes(type) && val && typeof val === 'string') {
          const inputDate = new Date(val)

          // only 4 digits year allowed
          if (inputDate.getFullYear().toString().length > 4) return 'Enter a valid Year'

          const now = new Date()

          // future date not allowed
          if (fixedDate && inputDate > now) return 'Future Date is not allowed'

          // past date not allowed
          if (fixedPastDate) {
            const boundary = new Date(now)
            if (type === 'date') boundary.setDate(now.getDate() - 1)
            if (type === 'month') boundary.setMonth(now.getMonth() - 1)
            if (inputDate < boundary) return 'Past Date is not allowed'
          }
        }

        // File validation expects `value` to be `FileList | File | null | undefined`.
        // val can be `unknown[]`.
        // We cast safely.

        const fileAnswer = FileValidation({ value: val as FileList | File | null | undefined, fileSize: props.fileSize, fileType: props.fileType })
        if (fileAnswer !== true) return fileAnswer

        return true
      } catch (error: unknown) {
        console.log({ inputValue, name, error })
      }
    },
  }
}

/**
 * @param {regexValidType} value
 */
function regexGet(value: RegularExpressionType): RegExp | undefined {
  const urlRegex = `^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$`
  const storeRegex: Record<string, RegExp> = {
    email: /^([a-zA-Z0-9_+.@-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/, // email
    int: /^-?[0-9]*$/, // only 0 to 10
    number: /^-?[0-9]*\.?[0-9]*$/, // 1 to 10 with .
    alphabetical: /^[a-zA-Z\s]*$/, // only abcd
    alphanumeric: /^[a-zA-Z0-9 ]*$/, // abcd with number
    panCard: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // panCard validation
    percentage: /^(100(\.0{1,2})?|\d{1,2}(\.\d{1,2})?)$/, // percentage validation
    url: new RegExp(urlRegex, 'i'), // url
  }
  if (storeRegex[value]) return storeRegex[value]
  else return undefined
}
