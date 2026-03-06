import { Modal } from '@/components/core/PopupModal/Modal'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { PermissionsPayload } from '@/types/payload/permissions.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const PermissionsForm = ({ isUpdateRecord, fetchRecord, isViewRecord, toggle }: CrudFormProps<PermissionsPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<PermissionsPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit, watch } = formApi

  const { isPending, mutate } = useSubmitHandler<PermissionsPayload>()

  const submitHandler = (data: PermissionsPayload) => {
    mutate({ data, control: formApi.control })
  }

  // Generate permission name suggestion based on type and action
  const generatePermissionName = (typeCode: string, action = 'view') => {
    if (typeCode) {
      return `${typeCode}.${action}`
    }
    return ''
  }

  // Watch for type changes to suggest permission names
  const selectedType = watch('type')

  const title = `${API.pageTitle} ${isViewRecord ? 'View' : isUpdateRecord ? 'Update' : 'Add'}`

  return (
    <Modal open={true} onClose={toggle} className="modal-md" title={title}>
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="type" label="Permission Type" validateRule={{ required: true, name: 'Permission Type' }} placeholder="Select permission type" />

            <FormField
              name="name"
              label="Permission Name"
              validateRule={{ required: true, name: 'Permission Name' }}
              placeholder={selectedType ? `e.g., ${generatePermissionName(selectedType)}` : 'e.g., events.view'}
              helperText="Use lowercase with dots (e.g., events.view, users.create)"
            />
          </div>

          <div>
            <FormField
              name="description"
              label="Description"
              type="textarea"
              validateRule={{ required: true, name: 'Description' }}
              placeholder="Describe what this permission allows users to do"
              rows={3}
            />
          </div>

          {/* Common permission patterns suggestion */}
          {!!selectedType && !isUpdateRecord && !isViewRecord && (
            <div className="rounded-lg bg-gray-50 p-3">
              <h4 className="mb-2 text-sm font-medium text-gray-800">Common Permission Patterns for &quot;{selectedType}&quot;:</h4>
              <div className="flex flex-wrap gap-2">
                {['view', 'add', 'edit', 'delete'].map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="cursor-pointer rounded border border-gray-200 bg-white px-2 py-1 text-xs transition-colors hover:bg-primary-clarity hover:text-primary hover:border-primary/20"
                    onClick={() => formApi.setValue('name', generatePermissionName(selectedType, action))}
                  >
                    {generatePermissionName(selectedType, action)}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-gray-500 italic">Click on a pattern to use it as your permission name</p>
            </div>
          )}

          {!isViewRecord && (
            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={isPending} className="btn btn-primary">
                {isPending ? 'Saving...' : isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </Modal>
  )
}
