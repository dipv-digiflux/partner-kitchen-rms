import { Modal } from '@/components/core/PopupModal/Modal'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { WeeklyMenuPayload } from '@/types/payload/weekly-menu.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const WeeklyMenuForm = ({ isUpdateRecord, fetchRecord, toggle }: CrudFormProps<WeeklyMenuPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<WeeklyMenuPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<WeeklyMenuPayload>()

  const submitHandler = (data: WeeklyMenuPayload, finalize = false) => {
    mutate({ data: { ...data, finalize }, control: formApi.control })
  }

  const title = `${API.pageTitle} ${isUpdateRecord ? 'Edit' : 'Add'}`

  return (
    <Modal open={true} onClose={toggle} className="modal-md" title={title}>
      <FormProvider {...formApi}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit((data) => submitHandler(data, false))(e)
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="week_label" label="Week Label" validateRule={{ required: true, name: 'Week Label' }} placeholder="e.g. Week 12, Mar 2025" />
            <FormField name="start_date" label="Start Date" type="date" validateRule={{ required: true, name: 'Start Date' }} />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="end_date" label="End Date" type="date" validateRule={{ required: true, name: 'End Date' }} />
          </div>

          <FormField name="menu_items" label="Menu Items (recipe IDs or names)" type="textarea" placeholder="Add menu from master list - one per line or comma-separated" rows={4} />

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={() => handleSubmit((data) => submitHandler(data, false))()} disabled={isPending} className="btn btn-outline">
              Save as Draft
            </button>
            <button type="button" onClick={() => handleSubmit((data) => submitHandler(data, true))()} disabled={isPending} className="btn btn-primary">
              Save & Finalize
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  )
}
