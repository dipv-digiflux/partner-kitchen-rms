import { JsonObject } from './commonAjax.types'

export interface CrudFormProps<TRecord = JsonObject> {
  isUpdateRecord?: boolean
  isViewRecord?: boolean
  fetchRecord?: TRecord
  toggle: () => void
  moduleMode: 'ADD' | 'EDIT' | 'VIEW'
}
