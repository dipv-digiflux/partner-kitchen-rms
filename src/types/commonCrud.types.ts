import { Store } from '@tanstack/store'
import { CommonAjaxProps, JsonObject, JsonValue } from './commonAjax.types'
import { Table } from '@tanstack/react-table'
import { Control, FieldValues, UseFormReturn } from 'react-hook-form'

export type ModuleMode = 'ADD' | 'EDIT' | 'DELETE'

/** CRUD action for which the request is being made. */
export type CrudRequestAction = 'list' | 'create' | 'update' | 'fetch' | 'delete'

/**
 * Simple custom URLs per action. Use :id in the string for getOne/update/delete – it gets replaced with the record id.
 * Only set the ones that differ from default (list/create = apiUrl, getOne/update/delete = apiUrl/:id).
 */
export interface CustomCrudUrls {
  list?: string
  create?: string
  getOne?: string
  update?: string
  delete?: string
}

/** Props passed to getRequestUrl (advanced). moduleMode + selectedRecord so you have full context. */
export interface GetRequestUrlProps {
  action: CrudRequestAction
  apiName: string
  apiUrl: string
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  id?: string | number
  data?: JsonObject
  moduleMode?: ModuleMode
  selectedRecord?: JsonObject
}

export interface CrudConfigItem {
  apiUrl: string
  pageTitle: string
  permissionsName?: string
  formMode?: 'MODAL' | 'PAGE'
  routes?: {
    Form?: string
    pageRoute?: string
  }
  /** Simple: override URLs per action. Use :id for getOne/update/delete. */
  customUrls?: CustomCrudUrls
  /** Advanced: function that returns URL (use when customUrls is not enough). */
  getRequestUrl?: (props: GetRequestUrlProps) => string
}

export type CommonCrudBaseState<TRecord> = {
  apiName?: string
  commonCrud?: {
    formVisibility?: boolean
    moduleMode?: ModuleMode
    selectedRecord?: TRecord
  }
  filterShow?: boolean
}

// removing index signature to avoid conflicts and verify strict types.
// Users can extend via TExtra if needed.
export type CommonCrudStateGeneric<TRecord = JsonObject, TExtra = JsonObject> = CommonCrudBaseState<TRecord> & TExtra

export type CrudActionHandler<TRecord = JsonObject> = (state: CommonCrudStateGeneric<TRecord>, payload?: JsonValue) => void

export interface CommonCrudConfig<TRecord = JsonObject> {
  apiName: string
  apiUrl: string
  pageTitle: string
  permissionsName?: string
  formMode?: 'MODAL' | 'PAGE'
  routes?: {
    Form?: string
    pageRoute?: string
  }
  /** Simple: override URLs per action. Use :id for getOne/update/delete. */
  customUrls?: CustomCrudUrls
  /** Advanced: function that returns URL (use when customUrls is not enough). */
  getRequestUrl?: (props: GetRequestUrlProps) => string
  initialState?: Partial<CommonCrudStateGeneric<TRecord>>
  reducers?: Record<string, CrudActionHandler<TRecord>>
  crudApi?: Partial<CrudApiConfig>
}

// Define specific function type for actions to improve safety
export type ActionFunction = (...args: unknown[]) => unknown
// Note: Typescript's strict mode makes it hard to type spread args safely without any.
// But we must avoid `any`.
// Let's use `(...args: unknown[]) => unknown`.

export interface CrudApiConfig {
  formCrud: {
    action_alias?: string
    actions?: Record<string, ActionFunction>
  } & Record<string, unknown> // Use intersection for extras instead of index signature
  tableCrud: {
    action_alias?: string
    actions?: Record<string, ActionFunction>
  } & Record<string, unknown>
  crudHandler: Record<string, ActionFunction> // ensure crudHandler values are functions
}

import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'

export interface CrudHandler<TRecord = JsonObject> {
  useSubmitHandler: <TFieldValues extends FieldValues = FieldValues>(arg?: JsonObject) => UseMutationResult<unknown, unknown, { data: JsonObject; control: Control<TFieldValues> }, unknown>
  useFilterSubmitHandler: (arg?: JsonObject) => UseMutationResult<void, unknown, JsonObject, unknown>
  useDataHandler: (arg?: JsonObject) => UseQueryResult<{ data: { result: TRecord[]; totalRecords: number } }, unknown>
  addRecordHandler: (arg?: JsonObject) => void
  editRecordHandler: (arg?: { data?: TRecord }) => void
  useSelectedRecordHandler: (arg?: JsonObject) => UseQueryResult<{ data: TRecord }, unknown>
  deleteRecordHandler: (arg?: { data?: TRecord }) => void
  useDeleteRecordHandler: (arg?: JsonObject) => UseMutationResult<unknown, unknown, JsonObject, unknown>
}

export interface CommonCrudApi<TRecord = JsonObject> {
  apiName: string
  pageTitle: string
  apiUrl: string
  permissionsName?: string
  formMode?: 'MODAL' | 'PAGE'
  routes?: {
    Form?: string
    pageRoute?: string
  }
  AjaxApi: <TResponse = void>(arg: CommonAjaxProps<JsonObject, TResponse>) => Promise<TResponse>
  crudApi: {
    formCrud: {
      action_alias?: string
      actions?: Record<string, ActionFunction>
    } & Record<string, unknown>
    tableCrud: {
      action_alias?: string
      actions?: Record<string, ActionFunction>
    } & Record<string, unknown>
    crudHandler: CrudHandler<TRecord>
    queryKeys: {
      submitHandlerKey: (string | JsonObject)[]
      dataHandlerKey: (string | JsonObject)[]
      selectedRecordHandlerKey: (string | JsonObject)[]
      deleteRecordHandlerKey: (string | JsonObject)[]
    }
  }
  moduleRef: {
    tableRef: (Table<TRecord> & { commonCrudState?: { data: { result: TRecord[]; totalRecords: number } } }) | null
    filterFormRef: UseFormReturn<FieldValues> | null
  }
  moduleState: Store<CommonCrudStateGeneric<TRecord>>
  reducers: Record<string, CrudActionHandler<TRecord>>
  actions: Record<string, (payload?: JsonValue) => void>
}
