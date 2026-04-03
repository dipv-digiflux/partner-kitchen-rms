import { AxiosRequestConfig } from 'axios'
import { JsonObject } from '@/types/json.types'

export type { JsonArray, JsonObject, JsonValue } from '@/types/json.types'

export interface CommonAjaxProps<TData = JsonObject, TResponse = void> {
  url?: string
  type?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string
  data?: TData | FormData
  /** Passed to axios so React Query `cancelQueries` can abort in-flight HTTP requests. */
  signal?: AbortSignal
  config?: AxiosRequestConfig
  callback?: (res: TResponse) => void
  rejectCallback?: (error: JsonObject | Error) => void
  successKey?: string
  errorKey?: string
}

export type CreateCommonAjaxConfig = {
  url: string
  config?: AxiosRequestConfig
}
