import { Modal } from '@/components/core/PopupModal/Modal'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { JsonObject } from '@/types/commonAjax.types'
import { OptionType } from '@/types/components.types'
import { CrudFormProps } from '@/types/modulePages.types'
import { useQuery } from '@tanstack/react-query'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

export const UserForm = ({ isUpdateRecord, isViewRecord, fetchRecord, toggle }: CrudFormProps) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm({
    mode: 'all',
    defaultValues: (fetchRecord as FieldValues) || {},
  })

  const { handleSubmit, watch } = formApi

  const { data: rolesOptions, isFetching } = useQuery({
    queryKey: ['rolesOptions'],
    queryFn: async () => {
      const response = (await commonAjax({
        url: '/role?action=get_options',
        type: 'GET',
      })) as JsonObject & { data: { name: string; _id: string }[] }
      return response?.data?.map(({ name: label, _id: value }) => ({ label, value })) || []
    },
  })

  const { isPending, mutate } = useSubmitHandler()

  const submitHandler = (data: FieldValues) => {
    mutate({ data: data as JsonObject, control: formApi.control })
  }

  return (
    <Modal open={true} onClose={toggle} className="modal-md" title={`${isViewRecord ? 'View' : isUpdateRecord ? 'Update' : 'Add'} ${API.pageTitle}`}>
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="first_name" label={'First Name'} validateRule={{ required: true, name: 'First Name' }} />
            <FormField name="last_name" label={'Last Name'} validateRule={{ required: true, name: 'Last Name' }} />
          </div>

          <FormField name={'email'} label={'Email'} validateRule={{ required: true, validType: 'email', name: 'Email' }} />

          {/* Password fields only shown when creating new user */}
          {!isUpdateRecord && !isViewRecord && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name={'password'}
                label={'Password'}
                type="password"
                rules={{
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                }}
                placeholder="Enter password"
              />
              <FormField
                name={'confirmPassword'}
                label={'Confirm Password'}
                type="password"
                rules={{
                  required: 'Confirm Password is required',
                  validate: (value: string) => {
                    const password = watch('password')
                    if (value !== password) {
                      return 'Passwords do not match'
                    }
                    return true
                  },
                }}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <FormField name={'status'} label={'Status'} type="checkbox" />

          <FormField
            name={'role'}
            label={'Role'}
            type="select"
            options={rolesOptions as OptionType[]}
            isMulti={true}
            validateRule={{ required: true, name: 'Role' }}
            menuPlacement="top"
            placeholder={isFetching ? 'Loading Roles...' : 'Select role for this user'}
          />

          {!isViewRecord && (
            <div className="mt-6 flex justify-end">
              <button type="submit" disabled={isPending} className="btn btn-primary">
                {isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </Modal>
  )
}
