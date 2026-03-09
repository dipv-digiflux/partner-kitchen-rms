import { PageFormWrapper } from '@/components/crud/commonCrud/CommonElement/PageFormWrapper'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { JsonObject } from '@/types/commonAjax.types'
import type { OptionType } from '@/types/components.types'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { VariantPayload } from '@/types/payload/variant.payload'
import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

export const VariantForm = ({ isUpdateRecord, isViewRecord, fetchRecord }: CrudFormProps<VariantPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<VariantPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {
      ingredients: [{ ingredientId: '' }],
    },
  })

  const { handleSubmit, control } = formApi
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  })

  const { data: ingredientOptions, isFetching } = useQuery({
    queryKey: ['ingredientOptions'],
    queryFn: async () => {
      const response = (await commonAjax({
        url: '/ingredient?action=get_options',
        type: 'GET',
      })) as JsonObject & { data: { name: string; _id: string }[] }

      return response?.data?.map(({ name: label, _id: value }) => ({ label, value })) || []
    },
  })

  const { isPending, mutate } = useSubmitHandler<VariantPayload>()

  const submitHandler = (data: VariantPayload) => {
    mutate({ data, control: formApi.control })
  }

  const title = `${API.pageTitle} ${isUpdateRecord ? 'Edit' : 'Add'}`

  return (
    <PageFormWrapper title={title}>
      <FormProvider {...formApi}>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <div className="space-y-4">
            <FormField name="displayName" label="Display Name" validateRule={{ required: true, name: 'Display Name' }} placeholder="e.g. Baby Mozzarella (Vegetarian)" />

            <FormField name="internalName" label="Internal Name" validateRule={{ required: true, name: 'Internal Name' }} placeholder="e.g. Baby Mozzarella (Vegetarian)" />
          </div>

          <div className="mt-8 border-t pt-6">
            <h4 className="text-fs-size-15 font-medium mb-3 text-gray-700">Ingredients</h4>
            <div className="space-y-4 border border-dashed border-[#e2e8f0] rounded-lg p-6 bg-[#f8fbff]">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="pt-[5px] text-sm font-medium text-gray-800 w-6">({index + 1})</div>
                  <div className="flex-1">
                    <FormField
                      name={`ingredients.${index}.ingredientId`}
                      type="select"
                      options={(ingredientOptions as OptionType[]) || []}
                      validateRule={{ required: true, name: 'Ingredient' }}
                      placeholder={isFetching ? 'Loading Ingredients...' : 'Select ingredient'}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-danger rounded-full p-2 h-10 w-10 flex items-center justify-center mt-1 shadow-sm hover:shadow-md transition-shadow bg-[#ff4d4f] hover:bg-[#ff7875]"
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
              ))}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => append({ ingredientId: '' })}
                  className="btn btn-outline-primary border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1] hover:text-white whitespace-nowrap px-6 py-[6px] rounded-[20px] flex items-center gap-2 text-sm font-medium"
                >
                  <span>+ Add New Item</span>
                </button>
              </div>
            </div>
          </div>

          {!isViewRecord && (
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t">
              <button type="submit" disabled={isPending} className="btn btn-primary px-8">
                {isUpdateRecord ? 'Update' : 'Create'} {API.pageTitle}
              </button>
            </div>
          )}
        </form>
      </FormProvider>
    </PageFormWrapper>
  )
}
