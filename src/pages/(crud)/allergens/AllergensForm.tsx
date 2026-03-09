import { SideDrawer } from '@/components/core/PopupModal/SideDrawer'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { AllergensPayload } from '@/types/payload/allergens.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const AllergensForm = ({ isUpdateRecord, isViewRecord, fetchRecord, toggle }: CrudFormProps<AllergensPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<AllergensPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<AllergensPayload>()

  const submitHandler = (data: AllergensPayload) => {
    mutate({ data, control: formApi.control })
  }

  return (
    <SideDrawer
      open={true}
      onClose={toggle}
      title={`${isViewRecord ? 'View' : isUpdateRecord ? 'Update' : 'Add'} ${API.pageTitle}`}
      footer={
        !isViewRecord && (
          <div className="flex justify-end gap-2">
            <button type="submit" disabled={isPending} onClick={handleSubmit(submitHandler)} className="btn btn-primary w-full md:w-auto">
              {isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}
            </button>
          </div>
        )
      }
    >
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <FormField name="name" label="Name" validateRule={{ required: true, name: 'Name' }} placeholder="e.g. Dairy, Nuts" />
        </form>
      </FormProvider>
    </SideDrawer>
  )
}
