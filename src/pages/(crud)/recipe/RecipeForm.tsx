import { PageFormWrapper } from '@/components/crud/commonCrud/CommonElement/PageFormWrapper'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { RecipePayload } from '@/types/payload/recipe.payload'
import { FormProvider, useForm } from 'react-hook-form'

export const RecipeForm = ({ isUpdateRecord, fetchRecord }: CrudFormProps<RecipePayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<RecipePayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {},
  })

  const { handleSubmit, watch } = formApi
  const { isPending, mutate } = useSubmitHandler<RecipePayload>()

  const submitHandler = (data: RecipePayload, finalize = false) => {
    mutate({ data: { ...data, finalize }, control: formApi.control })
  }

  const mealPrice = watch('meal_price')
  const discountPercent = watch('allowed_discount_percent')
  const calculatedPrice = mealPrice != null && discountPercent != null ? Number(mealPrice) * (1 - Number(discountPercent) / 100) : null

  const title = `${API.pageTitle} ${isUpdateRecord ? 'Edit' : 'Add'}`

  return (
    <PageFormWrapper title={title}>
      <FormProvider {...formApi}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit((data) => submitHandler(data, false))(e)
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="recipe_name" label="Recipe Name" validateRule={{ required: true, name: 'Recipe Name' }} placeholder="Enter recipe name" />
            <FormField name="cuisine_type" label="Cuisine Type" validateRule={{ required: true, name: 'Cuisine Type' }} placeholder="e.g. Italian, Indian" />
          </div>

          <FormField name="description" label="Description" type="textarea" placeholder="Recipe description" rows={3} />

          <FormField name="photo" label="Photo URL" type="text" placeholder="Image URL" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="calories_range" label="Calories (Kcal range)" placeholder="e.g. 300-450" />
            <FormField name="meal_price" label="Meal Price (for end customer)" type="number" placeholder="0.00" />
          </div>

          <FormField name="macros_gms" label="Macros (gms)" type="textarea" placeholder="e.g. Protein: 25g, Carbs: 40g, Fat: 15g" rows={2} />

          <FormField name="ingredients" label="Ingredients" type="textarea" validateRule={{ required: true, name: 'Ingredients' }} placeholder="List ingredients" rows={3} />

          <FormField name="allergens_contained" label="Allergens Contained" type="textarea" placeholder="e.g. Nuts, Dairy" rows={2} />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="allowed_discount_percent" label="Allowed discount %/meal" type="number" placeholder="0" />
            <FormField name="multiple_portion_sizes" label="Multiple portion sizes available" type="checkbox" />
          </div>

          {calculatedPrice != null && !Number.isNaN(calculatedPrice) && (
            <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-3">
              <span className="text-sm font-medium">Calculated price (after discount): </span>
              <span className="font-semibold text-primary">${calculatedPrice.toFixed(2)}</span>
            </div>
          )}

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
    </PageFormWrapper>
  )
}
