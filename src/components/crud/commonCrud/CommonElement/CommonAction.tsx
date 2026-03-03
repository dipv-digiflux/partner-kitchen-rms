import { hasUserPermission } from '@/components/crud/commonHelper/PermissionsCheck'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { Pencil, Trash } from 'lucide-react'

export const AddRecord = () => {
  const API = useModuleApi()
  const { addRecordHandler } = API.crudApi.crudHandler
  const hasPermission = hasUserPermission({ apiName: API.apiName, type: 'add' })

  if (!hasPermission) return null

  return (
    <button className="btn btn-primary cursor-pointer" onClick={() => addRecordHandler()}>
      Add {API.pageTitle}
    </button>
  )
}

export const EditRecord = ({ id }: { id: string | number }) => {
  const API = useModuleApi()
  const { editRecordHandler } = API.crudApi.crudHandler
  const hasPermission = hasUserPermission({ apiName: API.apiName, type: 'edit' })

  if (!hasPermission) return null

  return (
    <button className="btn btn-sm btn-outline btn-primary p-2 cursor-pointer" title={`Edit ${API.pageTitle}`} onClick={() => editRecordHandler({ data: { id } })}>
      <Pencil size={13} />
    </button>
  )
}

export const DeleteRecord = ({ id }: { id: string | number }) => {
  const API = useModuleApi()
  const { deleteRecordHandler } = API.crudApi.crudHandler
  const hasPermission = hasUserPermission({ apiName: API.apiName, type: 'delete' })

  if (!hasPermission) return null

  return (
    <button className="btn btn-sm btn-outline btn-danger p-2 cursor-pointer" title={`Delete ${API.pageTitle}`} onClick={() => deleteRecordHandler({ data: { id } })}>
      <Trash size={13} />
    </button>
  )
}
