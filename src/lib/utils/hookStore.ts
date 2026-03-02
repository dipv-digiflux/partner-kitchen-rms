import { NavigateFunction } from 'react-router-dom'
import { JsonObject } from '@/types/json.types'

export const privateHookStore: { navigate: NavigateFunction | null; userPermission: JsonObject } = {
  navigate: null,
  userPermission: {},
}
