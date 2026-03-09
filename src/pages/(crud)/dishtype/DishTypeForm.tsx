import { SideDrawer } from '@/components/core/PopupModal/SideDrawer'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { DishTypePayload } from '@/types/payload/dishtype.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const DishTypeForm = ({ isUpdateRecord, isViewRecord, fetchRecord, toggle }: CrudFormProps<DishTypePayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<DishTypePayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<DishTypePayload>()

  const submitHandler = (data: DishTypePayload) => {
    mutate({ data, control: formApi.control })
  }

  return (
    <SideDrawer open={true} onClose={toggle} title={`${isViewRecord ? 'View' : isUpdateRecord ? 'Update' : 'Add'} ${API.pageTitle}`}>
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <FormField name="name" label="Name" validateRule={{ required: true, name: 'Name' }} placeholder="e.g. Bulgur" />

          {!isViewRecord && (
            <div className="mt-6 flex justify-end gap-2 pt-4">
              <button type="submit" disabled={isPending} className="btn btn-primary">
                {isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </SideDrawer>
  )
}
