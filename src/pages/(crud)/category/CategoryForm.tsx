import { Modal } from '@/components/core/PopupModal/Modal'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { CategoryPayload } from '@/types/payload/category.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const CategoryForm = ({ isUpdateRecord, fetchRecord, toggle }: CrudFormProps<CategoryPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<CategoryPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<CategoryPayload>()

  const submitHandler = (data: CategoryPayload) => {
    mutate({ data, control: formApi.control })
  }

  const title = `${API.pageTitle} ${isUpdateRecord ? 'Edit' : 'Add'}`

  return (
    <Modal open={true} onClose={toggle} className="modal-md" title={title}>
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <FormField name="CategoryName" label="Category Name" validateRule={{ required: true, name: 'Category Name' }} placeholder="e.g. Modern Plastic Shoes" />
            <FormField name="OrderNumber" label="Order Number" type="number" validateRule={{ required: true, name: 'Order Number' }} />
          </div>

          <div className="flex gap-4 mt-4">
            <FormField name="IsVegetarian" label="Is Vegetarian?" type="checkbox" />
            <FormField name="IsLive" label="Is Live?" type="checkbox" />
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="submit" disabled={isPending} className="btn btn-primary">
              Save Category
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}
