import { axiosApi } from '@/lib/services/api'
import { CommonAjaxProps, CreateCommonAjaxConfig } from '@/types/commonAjax.types'
import { AxiosRequestConfig, isAxiosError } from 'axios'

export const createCommonAjax = ({ url, config }: CreateCommonAjaxConfig = { url: '' }) => {
  return <TResponse = unknown, TData = unknown>({ config: userConfig = {}, ...arg }: CommonAjaxProps<TData, TResponse>): Promise<TResponse> => {
    // over write user config for axios option
    const mergedConfig = { ...config, ...userConfig }

    // Use user provided url if available, otherwise use default url
    const requestUrl = arg.url || url

    return commonAjax<TData, TResponse>({ ...arg, url: requestUrl, config: mergedConfig })
  }
}

export const commonAjax = async <TData = unknown, TResponse = unknown>({
  url,
  type = 'GET',
  data = {} as TData,
  signal,
  config = {},
  callback,
  rejectCallback,
}: CommonAjaxProps<TData, TResponse>): Promise<TResponse> => {
  try {
    if (signal?.aborted) {
      throw new DOMException('Aborted', 'AbortError')
    }
    const method = type.toLowerCase() as 'get' | 'delete' | 'post' | 'put' | 'patch'
    // request method type
    // const requestContentType = data instanceof FormData ? "multipart/form-data" : "application/json";

    // request headers
    // const requestHeaders = { ...(config.headers ?? {}), 'Content-Type': requestContentType }
    const requestHeaders = { ...(config.headers ?? {}) }
    const finalConfig: AxiosRequestConfig = { ...config, headers: requestHeaders, ...(signal ? { signal } : {}) }

    let axiosResponse: TResponse

    // call ajax request
    if (typeof url !== 'string') {
      throw new Error('URL must be a string')
    }

    if (method === 'get' || method === 'delete') {
      finalConfig.params = data
      const response = await axiosApi[method]<TResponse>(url, finalConfig)
      // The interceptor returns res.data, so response is TResponse directly
      axiosResponse = response as unknown as TResponse
    } else {
      const response = await axiosApi[method]<TResponse>(url, data, finalConfig)
      // The interceptor returns res.data, so response is TResponse directly
      axiosResponse = response as unknown as TResponse
    }

    if (callback) callback(axiosResponse)

    // success toast show is pending

    return axiosResponse
  } catch (error: unknown) {
    const errorData = isAxiosError(error) ? error.response?.data : error

    // error toast show is pending

    if (rejectCallback) rejectCallback(errorData)
    throw error
  }
}
