import { privateHookStore } from '@/lib/utils/hookStore'
import { JsonObject } from '@/types/json.types'
import { flattenObject, unFlattenObject } from './ObjectModified'

export const getSearchParams = <T = JsonObject>() => {
  const pageURl = new URL(window.location.href)
  const searchParamsObject = Object.fromEntries(pageURl.searchParams.entries())
  return unFlattenObject(searchParamsObject) as T
}

export const setSearchPrams = <T extends JsonObject = JsonObject>(searchParamsObject: T = {} as T) => {
  const pageURl = new URL(window.location.href)
  const searchParamsFlatObject = flattenObject(searchParamsObject)

  Object.entries(searchParamsFlatObject).map(([key, value]) => {
    const newValue = value !== undefined && value !== null ? String(value).trim() : undefined
    if (newValue) pageURl.searchParams.set(key, newValue)
    else pageURl.searchParams.delete(key)
  })

  privateHookStore.navigate?.(`${pageURl.pathname}${pageURl.search}`, { replace: true })
}
