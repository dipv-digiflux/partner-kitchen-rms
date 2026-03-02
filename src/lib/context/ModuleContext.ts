import { createContext } from 'react'
import { CommonCrudApi } from '@/types/commonCrud.types'
import { JsonObject } from '@/types/commonAjax.types'

export const ModuleContext = createContext<CommonCrudApi<JsonObject> | null>(null)
