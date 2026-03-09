import { SideDrawer } from '@/components/core/PopupModal/SideDrawer'
import { Trash2 } from 'lucide-react'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { JsonObject } from '@/types/commonAjax.types'
import type { OptionType } from '@/types/components.types'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { IngredientPayload } from '@/types/payload/ingredient.payload'
import { useQuery } from '@tanstack/react-query'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'

export const IngredientForm = ({ isUpdateRecord, isViewRecord, fetchRecord, toggle }: CrudFormProps<IngredientPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<IngredientPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {
      categories: [{ categoryId: '' }],
    },
  })

  const { handleSubmit, control } = formApi
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'categories',
  })

  const { data: categoryOptions, isFetching } = useQuery({
    queryKey: ['categoryOptions'],
    queryFn: async () => {
      const response = (await commonAjax({
        url: '/category?action=get_options',
        type: 'GET',
      })) as JsonObject & { data: { CategoryName: string; _id: string }[] }

      return response?.data?.map(({ CategoryName: label, _id: value }) => ({ label, value })) || []
    },
  })

  const { isPending, mutate } = useSubmitHandler<IngredientPayload>()

  const submitHandler = (data: IngredientPayload) => {
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
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 pb-2">
          <FormField name="ingredientName" label="Ingredient" validateRule={{ required: true, name: 'Ingredient Name' }} placeholder="e.g. Tomato" />

          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-medium mb-3 text-gray-700">Category Name</h4>
            <div className="space-y-4 border border-dashed border-indigo-200 rounded-lg p-6 bg-[#f8fbff]">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 items-start">
                  <div className="pt-2 text-sm font-medium text-gray-600 w-6">[{index + 1}]</div>
                  <div className="flex-1">
                    <FormField
                      name={`categories.${index}.categoryId`}
                      type="select"
                      options={(categoryOptions as OptionType[]) || []}
                      validateRule={{ required: true, name: 'Category' }}
                      placeholder={isFetching ? 'Loading Categories...' : 'Select category'}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="btn btn-danger rounded-full p-2 h-10 w-10 flex items-center justify-center mt-1 shadow-sm hover:shadow"
                    disabled={fields.length === 1}
                  >
                    <Trash2 size={18} strokeWidth={2} />
                  </button>
                </div>
              ))}

              <div className="pt-2">
                <button type="button" onClick={() => append({ categoryId: '' })} className="btn btn-outline-primary whitespace-nowrap px-6 py-2 rounded-full flex items-center gap-2 font-medium">
                  <span>+ Add New Item</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </SideDrawer>
  )
}
