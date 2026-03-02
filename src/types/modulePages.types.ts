import { JsonObject } from './commonAjax.types'

export interface CrudFormProps {
  isUpdateRecord?: boolean
  isViewRecord?: boolean
  fetchRecord?: JsonObject
  toggle: () => void
}
