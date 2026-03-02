import { getCommonCrudApi } from '@/components/crud/commonCrud/commonCrudStore'

// Form CRUD actions Create
export const formCurdActions = ({ apiName }: { apiName: string }) => {
  const Api = getCommonCrudApi(apiName)
  const { formCrud } = Api.crudApi
  const { action_alias, actions: userActions = {} } = formCrud

  const actions: Record<string, ((...args: unknown[]) => unknown) | string> = {
    create: userActions.create ? userActions.create : () => `create_${action_alias}`,
    update: userActions.update ? userActions.update : () => `update_${action_alias}`,
    fetch: userActions.fetch ? userActions.fetch : () => `fetch_${action_alias}`,
    delete: userActions.delete ? userActions.delete : () => `delete_${action_alias}`,
  }

  const getAction = (actionName: string): string => {
    const action = actions[actionName]
    if (typeof action === 'function') {
      return (action as () => string)()
    } else if (typeof action === 'string') {
      return action
    } else {
      return `${actionName} not found`
    }
  }

  return getAction
}

// Table CRUD actions Create
export const tableCrudActions = ({ apiName }: { apiName: string }) => {
  const Api = getCommonCrudApi(apiName)
  const { tableCrud } = Api.crudApi
  const { action_alias, actions: userActions = {} } = tableCrud

  const actions: Record<string, ((...args: unknown[]) => unknown) | string> = {
    get: userActions.get ? userActions.get : () => `get_${action_alias}`,
  }

  const getAction = (actionName: string): string => {
    const action = actions[actionName]
    if (typeof action === 'function') {
      return (action as () => string)()
    } else if (typeof action === 'string') {
      return action
    } else {
      return `${actionName} not found`
    }
  }

  return getAction
}
