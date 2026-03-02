import urls from '@/router/urls'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudApi, CrudConfigItem } from '@/types/commonCrud.types'
import { createCommonCrud } from './createCommonCrud'

/**
 * only create config object for dynamic crud create
 */
const crudConfig: Record<string, CrudConfigItem> = {
  user: { apiUrl: '/user', pageTitle: 'User', permissionsName: urls.user.permissionName },
  permissions: {
    apiUrl: '/permissions',
    pageTitle: 'Permission',
    permissionsName: urls.permissions.permissionName,
    formMode: 'PAGE',
    routes: { Form: urls.permissionsForm.url, pageRoute: urls.permissions.url },
  },
}

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
