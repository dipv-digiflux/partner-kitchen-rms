import { privateHookStore } from '@/lib/utils/hookStore'
import { CommonAjaxProps, JsonObject, JsonValue } from '@/types/commonAjax.types'
import { CommonCrudApi, CommonCrudConfig, CommonCrudStateGeneric, CrudHandler } from '@/types/commonCrud.types'
import { Store } from '@tanstack/store'
import { commonAjax } from './commonAjax'
import { createCommonCrudHandler } from './hooks/CommonHandler.hooks'

export const createCommonCrud = <TRecord = JsonObject>({ apiName, apiUrl, pageTitle, ...otherArg }: CommonCrudConfig<TRecord>): CommonCrudApi<TRecord> => {
  const { initialState = {}, reducers = {}, crudApi = {} } = otherArg ?? {}

  // for common call api axios
  const moduleAjaxApi: CommonCrudApi<TRecord>['AjaxApi'] = <TResponse = unknown>(arg: CommonAjaxProps<JsonObject, TResponse>) => {
    const { moduleMode, selectedRecord } = API.moduleState.state.commonCrud || {}
    const id = (selectedRecord as JsonObject)?.id
    const url = moduleMode && ['EDIT', 'DELETE'].includes(moduleMode) ? `${API.apiUrl}/${id}` : API.apiUrl
    const methodTypes: Record<string, string> = { ADD: 'POST', EDIT: 'PATCH', DELETE: 'DELETE' }

    // Use user provided url if available, otherwise use default url
    const requestUrl = arg.url || url

    return commonAjax<JsonObject, TResponse>({ ...arg, url: requestUrl, type: (arg.type || methodTypes[moduleMode!]) ?? 'GET' })
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
          privateHookStore?.navigate?.(API.routes?.Form || '')
        }
      },
      hideForm: (state: CommonCrudStateGeneric<TRecord>) => {
        state.commonCrud = { ...state.commonCrud, formVisibility: false, moduleMode: undefined }
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(API.routes?.pageRoute || '')
        }
      },
      editRecord: (state: CommonCrudStateGeneric<TRecord>, payload: unknown) => {
        state.commonCrud = { ...state.commonCrud, moduleMode: 'EDIT', selectedRecord: payload as TRecord, formVisibility: true }
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(`${API.routes?.Form || ''}?id=${(payload as JsonObject)?.id}`)
        }
      },
      deleteRecord: (state: CommonCrudStateGeneric<TRecord>, payload: unknown) => {
        state.commonCrud = { ...state.commonCrud, moduleMode: 'DELETE', selectedRecord: payload as TRecord }
      },
      resetCrud: (state: CommonCrudStateGeneric<TRecord>) => {
        state.commonCrud = {}
        if (API.formMode === 'PAGE') {
          privateHookStore?.navigate?.(API.routes?.pageRoute || '')
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
