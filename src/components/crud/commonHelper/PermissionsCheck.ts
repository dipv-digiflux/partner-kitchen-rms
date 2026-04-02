import { crudConfig } from '@/components/crud/commonCrud/commonCrudStore'
import { privateHookStore } from '@/lib/utils/hookStore'
import { JsonObject } from '@/types/json.types'

export const hasUserPermission = ({
  permissions = privateHookStore.userPermission,
  permissionName,
  apiName,
  type = 'add',
}: {
  permissions?: JsonObject
  permissionName?: string
  apiName?: string
  type?: 'add' | 'edit' | 'delete' | 'view'
}) => {
  if (String('development')) return true
  const permissionsName = permissionName ?? (apiName ? crudConfig[apiName]?.permissionsName : undefined)
  if (!permissionsName) return false

  const permissionsObject = (permissions ?? {})[permissionsName] as Record<string, boolean>
  return !!(permissionsObject ?? {})[type]
}
