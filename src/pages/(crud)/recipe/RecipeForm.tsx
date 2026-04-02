import { PageFormWrapper } from '@/components/crud/commonCrud/CommonElement/PageFormWrapper'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { JsonObject } from '@/types/commonAjax.types'
import type { OptionType } from '@/types/components.types'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { RecipePayload } from '@/types/payload/recipe.payload'
import { useQuery } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

// Static Mocks for Select Options
const CATEGORY_OPTIONS: OptionType[] = [
  { label: 'BF', value: 'BF' },
  { label: 'Main', value: 'Main' },
  { label: 'Snack', value: 'Snack' },
]

const SIZE_OPTIONS: OptionType[] = [
  { label: 'Small', value: 'Small' },
  { label: 'Large', value: 'Large' },
]

export const RecipeForm = ({ fetchRecord, moduleMode }: CrudFormProps<RecipePayload>) => {
  const pagtitle = moduleMode === 'EDIT' ? 'Edit' : 'Add'
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<RecipePayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {
      packagingMaterials: [{ materialId: '' }],
      variants: [{}],
      menuForDays: [],
      ingredientsFixed: [],
      ingredientsRemovable: [],
      allergensContains: [],
      allergensFreeFrom: [],
      finalize: false,
    },
  })

  const { handleSubmit, control } = formApi

  // --- Field Arrays ---

  const variantsArray = useFieldArray({ control, name: 'variants' })

  // --- Queries ---
  const { data: cuisines } = useQuery({
    queryKey: ['cuisineOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/cuisine?action=get_options', type: 'GET' })) as JsonObject & { data: { name: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.name, value: i._id })) || []
    },
  })

  const { data: ingredients } = useQuery({
    queryKey: ['ingredientOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/ingredient?action=get_options', type: 'GET' })) as JsonObject & { data: { ingredientName: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.ingredientName, value: i._id })) || []
    },
  })

  const { data: allergens } = useQuery({
    queryKey: ['allergensOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/allergens?action=get_options', type: 'GET' })) as JsonObject & { data: { name: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.name, value: i._id })) || []
    },
  })

  // --- Submission ---
  const { isPending, mutate } = useSubmitHandler<RecipePayload>()
  const submitHandler = (data: RecipePayload, finalize = false) => mutate({ data: { ...data, finalize }, control: formApi.control })

  return (
    <PageFormWrapper title={`${pagtitle} Recipe`} className="max-w-[1300px] mx-auto">
      <FormProvider {...formApi}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit((data) => submitHandler(data, false))(e)
          }}
          className="space-y-6"
        >
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <FormField name="dishName" label="Recipe Name" />
              <FormField name="categoryId" label="Category" type="select" options={CATEGORY_OPTIONS} />
              <FormField name="cuisineId" label="Cuisine" type="select" options={cuisines || []} />
            </div>

            <div className="grid grid-cols-1 gap-6 items-start">
              <FormField name="description" label="Description" type="textarea" rows={4} className="h-[96px]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField name="ingredientsFixed" label="Ingredients" type="select" isMulti={true} options={ingredients || []} />
              <FormField name="allergensContains" label="Allergens" type="select" isMulti={true} options={allergens || []} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div>
                <FormField name="internalPhotos" label="Photo Raw" type="file" validateRule={{ fileType: ['.png', '.jpg', '.jpeg', '.webp'] }} />
              </div>
              <div>
                <FormField
                  name="websitePhotos"
                  label="Presentation Photo"
                  type="file"
                  multiple={true}
                  placeholder="Drag and drop your presentation variations here"
                  validateRule={{ fileType: ['.png', '.jpg', '.jpeg', '.webp'] }}
                />
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="bg-white rounded-md border border-gray-200 p-6 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Variants & Portioning</h3>
              <button type="button" onClick={() => variantsArray.append({})} className="text-sm font-semibold text-success hover:underline">
                + Add New Row
              </button>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="font-bold py-3 px-2 whitespace-nowrap w-12 text-center">#</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Kcal</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Pro g</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Carb g</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Fat g</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Calculated Price</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Calculated Diet Type</th>
                    <th className="font-bold py-3 px-2 whitespace-nowrap">Calculated Size</th>
                  </tr>
                </thead>
                <tbody>
                  {variantsArray.fields.map((field, idx) => (
                    <tr key={field.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                      <td className="py-2 px-2 text-center">
                        <button type="button" onClick={() => variantsArray.remove(idx)} className="text-danger hover:text-red-700" disabled={variantsArray.fields.length === 1}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                      <td className="py-2 px-2 min-w-[100px]">
                        <FormField
                          name={`variants.${idx}.kcal`}
                          type="number"
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[100px]">
                        <FormField
                          name={`variants.${idx}.protein`}
                          type="number"
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[100px]">
                        <FormField
                          name={`variants.${idx}.carb`}
                          type="number"
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[100px]">
                        <FormField
                          name={`variants.${idx}.fat`}
                          type="number"
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[100px]">
                        <FormField
                          name={`variants.${idx}.price`}
                          type="number"
                          step="0.01"
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.dietType`}
                          placeholder=""
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField name={`variants.${idx}.sizeAvailable`} type="select" options={SIZE_OPTIONS} placeholder="Size" className="rounded-none bg-transparent shadow-none!" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" disabled={isPending} className="btn btn-sm px-3 btn-outline" onClick={() => handleSubmit((data) => submitHandler(data, false))()}>
              Save as Draft
            </button>
            <button type="button" disabled={isPending} className="btn btn-sm px-3 btn-primary" onClick={() => handleSubmit((data) => submitHandler(data, true))()}>
              Save & Finalize
            </button>
          </div>
        </form>
      </FormProvider>
    </PageFormWrapper>
  )
}
