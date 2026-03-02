import { ModuleContext } from '@/lib/context/ModuleContext'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudApi } from '@/types/commonCrud.types'
import { useContext } from 'react'

export const useModuleApi = <TRecord extends JsonObject = JsonObject>() => {
  const context = useContext(ModuleContext)
  if (!context) {
    throw new Error('useModuleApi must be used within a ModuleProvider')
  }
  return context as unknown as CommonCrudApi<TRecord>
}
