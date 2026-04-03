import { privateHookStore } from '@/lib/utils/hookStore'
import { CommonAjaxProps, JsonObject, JsonValue } from '@/types/commonAjax.types'
import type { CrudRequestAction, CustomCrudUrls, ModuleMode } from '@/types/commonCrud.types'
import { CommonCrudApi, CommonCrudConfig, CommonCrudStateGeneric, CrudHandler } from '@/types/commonCrud.types'
import { Store } from '@tanstack/store'
import { commonAjax } from './commonAjax'
import { createCommonCrudHandler } from './hooks/CommonHandler.hooks'

const METHOD_TYPES: Record<string, 'GET' | 'POST' | 'PATCH' | 'DELETE'> = {
  ADD: 'POST',
  EDIT: 'PATCH',
  DELETE: 'DELETE',
}

function getActionFromRequest(method: string, moduleMode: string | undefined, id: string | number | undefined, isListRequest: boolean): CrudRequestAction {
  if (method === 'POST') return 'create'
  if (method === 'PATCH') return 'update'
  if (method === 'DELETE') return 'delete'
  if (method === 'GET') {
    if (isListRequest) return 'list'
    if (id != null && moduleMode === 'EDIT') return 'fetch'
  }
  return 'list'
}

const ACTION_TO_CUSTOM_KEY: Record<CrudRequestAction, keyof CustomCrudUrls> = {
  list: 'list',
  create: 'create',
  fetch: 'getOne',
  update: 'update',
  delete: 'delete',
}

function applyCustomUrl(urlTemplate: string, id: string | number | undefined): string {
  if (id == null) return urlTemplate
  return urlTemplate.replace(/:id/g, String(id))
}

export const createCommonCrud = <TRecord = JsonObject>({ apiName, apiUrl, pageTitle, customUrls, getRequestUrl, ...otherArg }: CommonCrudConfig<TRecord>): CommonCrudApi<TRecord> => {
  const { initialState = {}, reducers = {}, crudApi = {} } = otherArg ?? {}

  const moduleAjaxApi: CommonCrudApi<TRecord>['AjaxApi'] = <TResponse = unknown>(arg: CommonAjaxProps<JsonObject, TResponse>) => {
    const { moduleMode, selectedRecord } = API.moduleState.state.commonCrud || {}
    const id = (selectedRecord as JsonObject)?.id as string | number | undefined
    const method = ((arg.type || METHOD_TYPES[moduleMode ?? '']) ?? 'GET') as 'GET' | 'POST' | 'PATCH' | 'DELETE'
    const isListRequest = Boolean(arg.data && ('page' in arg.data || 'limit' in arg.data))
    const action = getActionFromRequest(method, moduleMode, id, isListRequest)

    const defaultUrl = !isListRequest && moduleMode && ['EDIT', 'DELETE'].includes(moduleMode) && id != null ? `${API.apiUrl}/${id}` : API.apiUrl
    const customTemplate = customUrls?.[ACTION_TO_CUSTOM_KEY[action]]
    const url =
      arg.url ??
      (customTemplate ? applyCustomUrl(customTemplate, id) : undefined) ??
      getRequestUrl?.({
        action,
        apiName: API.apiName,
        apiUrl: API.apiUrl,
        method,
        id,
        data: arg.data as JsonObject | undefined,
        moduleMode: moduleMode as ModuleMode | undefined,
        selectedRecord: selectedRecord as JsonObject | undefined,
      }) ??
      defaultUrl

    return commonAjax<JsonObject, TResponse>({ ...arg, url, type: method })
  }

  // main api reference store all handler and crud data and state
  const API: CommonCrudApi<TRecord> = {
    apiName,
    pageTitle,
    apiUrl,
    formMode: otherArg.formMode || 'MODAL',
    routes: otherArg.routes || { Form: '', pageRoute: '' },
    AjaxApi: moduleAjaxApi,
    crudApi: {
      formCrud: {
        action_alias: 'record',
        ...(crudApi.formCrud ?? {}),
      },
      tableCrud: {
        action_alias: 'data',
        ...(crudApi.tableCrud ?? {}),
      },
      crudHandler: {
        ...(createCommonCrudHandler({ apiName }) as unknown as CrudHandler<TRecord>),
        ...(crudApi.crudHandler ?? {}),
      },
      queryKeys: {
        // get active keys for invalid query using key
        submitHandlerKey: [apiName, '{action}', '{selectedRecord}', '{mutationKey}'],
        dataHandlerKey: [apiName, '{action}', '{queryKey}', '{data}'],
        selectedRecordHandlerKey: [apiName, '{action}', '{queryKey}'],
        deleteRecordHandlerKey: [apiName, '{action}', '{mutationKey}'],
      },
    },
    moduleRef: {
      tableRef: null,
      filterFormRef: null,
    },
    moduleState: new Store<CommonCrudStateGeneric<TRecord>>({
      apiName,
      commonCrud: {
        formVisibility: false /* for modal form show hide */,
        moduleMode: undefined /* ADD | EDIT | DELETE */,
        selectedRecord: undefined /* moduleMode edit and delete time get selected record  */,
      },
      filterShow: true,
      ...initialState,
    } as CommonCrudStateGeneric<TRecord>), // Cast needed because initialState might be partial
    reducers: {
      showForm: (state: CommonCrudStateGeneric<TRecord>) => {
        state.commonCrud = { ...state.commonCrud, formVisibility: true, moduleMode: 'ADD' }
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(API.routes?.Form || '', { viewTransition: true })
        }
      },
      hideForm: (state: CommonCrudStateGeneric<TRecord>) => {
        state.commonCrud = { ...state.commonCrud, formVisibility: false, moduleMode: undefined }
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(API.routes?.pageRoute || '', { viewTransition: true })
        }
      },
      editRecord: (state: CommonCrudStateGeneric<TRecord>, payload: unknown) => {
        state.commonCrud = { ...state.commonCrud, moduleMode: 'EDIT', selectedRecord: payload as TRecord, formVisibility: true }
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(`${API.routes?.Form || ''}?id=${(payload as JsonObject)?.id}`, { viewTransition: true })
        }
      },
      deleteRecord: (state: CommonCrudStateGeneric<TRecord>, payload: unknown) => {
        state.commonCrud = { ...state.commonCrud, moduleMode: 'DELETE', selectedRecord: payload as TRecord }
      },
      resetCrud: (state: CommonCrudStateGeneric<TRecord>) => {
        state.commonCrud = {}
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(API.routes?.pageRoute || '', { viewTransition: true })
        }
      },
      toggleFilter: (state: CommonCrudStateGeneric<TRecord>) => {
        state.filterShow = !state.filterShow
      },
      ...reducers,
    },
    actions: {},
  }

  // make action for all reducers
  Object.entries(API.reducers).map(([key, fn]) => {
    // add
    API.actions[key] = (payload: unknown) => {
      // set state module state
      API.moduleState.setState((oldSate: CommonCrudStateGeneric<TRecord>) => {
        const newState = { ...oldSate }

        // modified state for new render
        fn(newState, payload as JsonValue)

        return newState
      })
    }
  })

  return API
}
