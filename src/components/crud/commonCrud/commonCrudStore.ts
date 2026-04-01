import { getCrudConfigFromModules } from '@/config/crudModules.config'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudApi } from '@/types/commonCrud.types'
import { createCommonCrud } from './createCommonCrud'

/** CRUD config from central config – see src/config/crudModules.config.ts */
export const crudConfig = getCrudConfigFromModules()

/**
 * website load time no api create
 * only create that time getCommonCrudApi call
 */
export const commonCrudApiStore: Record<string, CommonCrudApi<JsonObject>> = {}

export const getCommonCrudApi = (apiName: string) => {
  if (commonCrudApiStore[apiName]) return commonCrudApiStore[apiName]

  // if not found in commonCrudApi
  if (!crudConfig[apiName]) return {} as CommonCrudApi<JsonObject>

  const crudApi = createCommonCrud({ apiName, ...crudConfig[apiName] }) as CommonCrudApi<JsonObject>

  // add in commonCrudApiStore for second time not create
  commonCrudApiStore[apiName] = crudApi

  return commonCrudApiStore[apiName]
}
