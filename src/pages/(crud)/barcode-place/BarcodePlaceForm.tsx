import { SideDrawer } from '@/components/core/PopupModal/SideDrawer'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { BarcodePlacePayload } from '@/types/payload/barcodePlace.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const BarcodePlaceForm = ({ isUpdateRecord, isViewRecord, fetchRecord, toggle }: CrudFormProps<BarcodePlacePayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<BarcodePlacePayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<BarcodePlacePayload>()

  const submitHandler = (data: BarcodePlacePayload) => {
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
          <FormField name="place" label="Place" validateRule={{ required: true, name: 'Place' }} placeholder="e.g. Chiller" />
          <FormField name="order" label="Order" type="number" validateRule={{ required: true, name: 'Order' }} placeholder="e.g. 2" />
        </form>
      </FormProvider>
    </SideDrawer>
  )
}
