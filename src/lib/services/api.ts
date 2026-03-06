import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const BaseUrl = {
  PRODUCTION: import.meta.env.VITE_PRODUCTION_URL,
  STAGING: import.meta.env.VITE_STAGING_URL,
  DEVELOPMENT: import.meta.env.VITE_DEVELOPMENT_URL,
}

export const API_BASE = BaseUrl[(import.meta.env.VITE_ENV as keyof typeof BaseUrl) || 'DEVELOPMENT']

export const axiosApi = axios.create({ baseURL: API_BASE })

axiosApi.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
  const token = Cookies.get('token')
  if (token) {
    cfg.headers['Authorization'] = `Bearer ${token}`
  }
  return cfg
})

//  Response interceptor
axiosApi.interceptors.response.use(
  (res) => res.data,
  (err: AxiosError) => {
    const status = err.response?.status

    // not authorize
    if (status && [401, 403].includes(status)) {
      // privateHookStore.navigate?.('/login')
    }

    // page not found
    if (status && [404].includes(status)) {
      // privateHookStore.navigate?.('/NotFound')
    }

    // network error show
    if (err.code == 'ERR_NETWORK') {
      toast.error(err.message, { autoClose: 3000 })
    }

    return Promise.reject(err)
  },
)
