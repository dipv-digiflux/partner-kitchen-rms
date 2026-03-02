import { JsonObject, JsonValue } from '@/types/json.types'

export const flattenObject = (obj: JsonObject, delimiter: string = '.', prefix: string = ''): JsonObject => {
  const pre = prefix.length ? `${prefix}${delimiter}` : ''
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value as JsonObject, delimiter, pre + key))
    } else {
      acc[pre + key] = value
    }
    return acc
  }, {} as JsonObject)
}

export const unFlattenObject = (flatObj: JsonObject, delimiter: string = '.'): JsonObject => {
  const result: JsonObject = {}

  // all keys add in result object
  Object.entries(flatObj).forEach(([flatKey, value]) => {
    const KeyParts = flatKey.split(delimiter)
    let current = result as Record<string | number, JsonValue>

    KeyParts.forEach((part, index) => {
      // If it's the last part, set the value.
      if (index === KeyParts.length - 1) {
        current[part] = value
      } else {
        // If the next key is a number, use an array; else, use an object.
        const nextPart = KeyParts[index + 1]
        // Check property existence safely
        if (current[part] === undefined) {
          current[part] = isNaN(Number(nextPart)) ? {} : []
        }

        // Traverse
        current = current[part] as Record<string | number, JsonValue>
      }
    })
  })

  return result
}
