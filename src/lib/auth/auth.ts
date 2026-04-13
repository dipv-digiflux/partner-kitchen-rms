import Cookies from 'js-cookie'

export const setData = (data: Record<string, string>) => {
  for (const [key, value] of Object.entries(data)) {
    if (!key) continue
    if (!value) continue

    Cookies.set(key, value)
  }
}

export const removeAuthData = () => {
  Cookies.remove('token')
  Cookies.remove('refreshToken')
  localStorage.removeItem('user-permissions')
}

