import { PageFormWrapper } from '@/components/crud/commonCrud/CommonElement/PageFormWrapper'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import type { JsonObject } from '@/types/commonAjax.types'
import type { OptionType } from '@/types/components.types'
import type { CrudFormProps } from '@/types/modulePages.types'
import type { RecipePayload } from '@/types/payload/recipe.payload'
import { useQuery } from '@tanstack/react-query'
import { Copy, Trash2 } from 'lucide-react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

// Static Mocks for Select Options
const NDD_OPTIONS: OptionType[] = [
  { label: 'subscription', value: 'subscription' },
  { label: 'a la carte', value: 'a la carte' },
]

const DAY_OPTIONS: OptionType[] = [
  { label: 'Day 1', value: 'Day 1' },
  { label: 'Day 2', value: 'Day 2' },
  { label: 'Day 3', value: 'Day 3' },
  { label: 'Day 4', value: 'Day 4' },
  { label: 'Day 5', value: 'Day 5' },
  { label: 'Day 6', value: 'Day 6' },
]

const COMPLEXITY_OPTIONS: OptionType[] = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Moderate', value: 'Moderate' },
  { label: 'Complex', value: 'Complex' },
]

const VARIANT_TYPE_OPTIONS: OptionType[] = [
  { label: 'Standard', value: 'Standard' },
  { label: 'Premium', value: 'Premium' },
]

const SIZE_OPTIONS: OptionType[] = [
  { label: 'OneSize', value: 'OneSize' },
  { label: 'Small', value: 'Small' },
  { label: 'Large', value: 'Large' },
]

export const RecipeForm = ({ fetchRecord }: CrudFormProps<RecipePayload>) => {
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
  const packagingArray = useFieldArray({ control, name: 'packagingMaterials' })
  const variantsArray = useFieldArray({ control, name: 'variants' })

  // --- Queries ---
  const { data: categories } = useQuery({
    queryKey: ['categoryOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/category?action=get_options', type: 'GET' })) as JsonObject & { data: { CategoryName: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.CategoryName, value: i._id })) || []
    },
  })

  const { data: dishTypes } = useQuery({
    queryKey: ['dishtypeOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/dishtype?action=get_options', type: 'GET' })) as JsonObject & { data: { name: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.name, value: i._id })) || []
    },
  })

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

  const { data: packMaterials } = useQuery({
    queryKey: ['packagingOptions'],
    queryFn: async () => {
      const res = (await commonAjax({ url: '/packaging-material?action=get_options', type: 'GET' })) as JsonObject & { data: { name: string; _id: string }[] }
      return res?.data?.map((i) => ({ label: i.name, value: i._id })) || []
    },
  })

  // --- Submission ---
  const { isPending, mutate } = useSubmitHandler<RecipePayload>()
  const submitHandler = (data: RecipePayload, finalize = false) => mutate({ data: { ...data, finalize }, control: formApi.control })

  return (
    <PageFormWrapper title={`ADD / EDIT PRODUCT`}>
      <FormProvider {...formApi}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit((data) => submitHandler(data, false))(e)
          }}
          className="space-y-6"
        >
          {/* Stats Block at the top */}
          <div className="flex flex-wrap items-center justify-end gap-x-6 mb-2">
            <div className="flex items-center gap-1.5 text-success text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-success"></span> Active
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-gray-700">Average Customer Rating</span>
                <span className="text-gray-900 text-sm">0</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-gray-700">Customer Comments</span>
                <span className="text-gray-900 text-sm">5</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-6 gap-y-6">
            {/* LEFT COLUMN: Data Fields */}
            <div className="xl:col-span-2 space-y-6">
              {/* Card 1: General Information */}
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800">General Information</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1">
                    <FormField name="dishName" label="Dish Name" placeholder="ABC Juice" />
                  </div>
                  <div className="grid grid-cols-1">
                    <FormField name="photoUrl" label="Photo URL" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="categoryId" label="Category" type="select" options={categories || []} placeholder="Select..." />
                    <FormField name="dishTypeId" label="Dish Type" type="select" options={dishTypes || []} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-1">
                    <FormField name="description" label="Description" type="textarea" rows={4} className="h-[96px]" placeholder="A blend of rich antioxidants with Apple, Carrot & Beetroot." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="cuisineId" label="Cuisine" type="select" options={cuisines || []} placeholder="Select..." />
                    <FormField name="complexity" label="Complexity*" type="select" options={COMPLEXITY_OPTIONS} placeholder="Moderate" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <FormField name="caloriesKcalMin" label="Calories Min (Kcal)" type="number" placeholder="e.g. 250" />
                    <FormField name="caloriesKcalMax" label="Calories Max (Kcal)" type="number" placeholder="e.g. 550" />
                    <FormField name="allowedDiscountPercentage" label="Allowed Discount (%)" type="number" step="0.01" placeholder="e.g. 10" />
                  </div>
                </div>
              </div>

              {/* Card 2: Nutrition & Ingredients */}
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Nutrition & Ingredients</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="ingredientsFixed" label="* Ingredients (Fixed)" type="select" options={ingredients || []} isMulti={true} placeholder="Select..." />
                    <FormField name="ingredientsRemovable" label="Ingredients (Removable)" type="select" options={ingredients || []} isMulti={true} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="allergensContains" label="Allergens (contains)" type="select" options={allergens || []} isMulti={true} placeholder="Select..." />
                    <FormField name="allergensFreeFrom" label="Allergens (free from)" type="select" options={allergens || []} isMulti={true} placeholder="Select..." />
                  </div>
                </div>
              </div>

              {/* Card 3: Logistics & Packaging */}
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Logistics & Packaging</h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="nddMp" label="NDD/MP" type="select" options={NDD_OPTIONS} placeholder="Select..." />
                    <FormField name="menuForDays" label="Menu for (Day) / Not required for NDD" type="select" options={DAY_OPTIONS} isMulti={true} placeholder="Select..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <FormField name="expirationDays" label="Expiration" type="number" placeholder="-1" />
                    <FormField name="mealPreference" label="Meal Preference" type="number" placeholder="0" />
                  </div>

                  {/* Packaging */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-bold text-gray-800">Packaging Materials</div>
                      <button
                        type="button"
                        onClick={() => packagingArray.append({ materialId: '', labelTitle: '', labelInstruction: '' })}
                        className="text-xs font-semibold text-success hover:underline"
                      >
                        + Add New
                      </button>
                    </div>
                    <div className="grid grid-cols-12 gap-4 items-end mb-2">
                      <div className="col-span-4 text-xs font-bold text-gray-800">Material</div>
                      <div className="col-span-3 text-xs font-bold text-gray-800">Label Title</div>
                      <div className="col-span-4 text-xs font-bold text-gray-800">Instruction</div>
                      <div className="col-span-1"></div>
                    </div>

                    {packagingArray.fields.map((field, idx) => (
                      <div key={field.id} className="grid grid-cols-12 gap-4 items-start">
                        <div className="col-span-4 select-sm-wrap">
                          <FormField name={`packagingMaterials.${idx}.materialId`} type="select" options={packMaterials || []} placeholder="Select..." />
                        </div>
                        <div className="col-span-3">
                          <FormField name={`packagingMaterials.${idx}.labelTitle`} placeholder="Title" />
                        </div>
                        <div className="col-span-4">
                          <FormField name={`packagingMaterials.${idx}.labelInstruction`} placeholder="Instruction" />
                        </div>
                        <div className="col-span-1 pt-2 flex justify-end">
                          <button type="button" onClick={() => packagingArray.remove(idx)} className="text-danger hover:text-red-700" disabled={packagingArray.fields.length === 1}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Media & Stats */}
            <div className="xl:col-span-1 space-y-6">
              {/* Card: Product Media */}
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Product Media</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">Website Photos</h4>
                    <div className="border border-dashed border-gray-300 rounded-md h-[120px] bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-xs">Drop zone here</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 mb-2">Internal Photos</h4>
                    <div className="border border-dashed border-gray-300 rounded-md h-[120px] bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
                      <span className="text-xs">Drop zone here</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Labelling Details */}
              <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-gray-800">Labelling Details</h3>
                <div className="space-y-6">
                  <FormField name="instructionOnLabel" label="Instruction on Label" type="textarea" rows={4} placeholder="Enter instruction on label..." />
                  <FormField name="platingSummary" label="Plating Summary" type="textarea" rows={4} placeholder="Enter plating summary..." />
                </div>
              </div>
            </div>
          </div>

          {/* Variants Section */}
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-gray-800">Variants & Portioning</h3>
                <button type="button" onClick={() => variantsArray.append({})} className="text-sm font-semibold text-success hover:underline">
                  + Add New
                </button>
              </div>
              <div className="text-danger text-sm font-medium">* Please Enter Component Names Carefully With Proper Spacing in It!</div>
              <div className="flex items-center gap-4">
                <a href="#" className="text-blue-500 underline text-sm">
                  Sample CSV
                </a>
                <label className="flex items-center gap-2 text-sm font-medium">
                  Standard Variant <input type="checkbox" className="form-checkbox" />
                </label>
                <button type="button" className="bg-green-800 text-white text-xs px-3 py-1.5 rounded">
                  Insert CSV
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Options</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Type of Variant (Available) *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Chef&apos;s Choice</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Size Available *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Price *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Kcal *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Protein *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Carb *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Fat *</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 1</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 1 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 2</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 2 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 3</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 3 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 4</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 4 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 5</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 5 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 6</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 6 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 7</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 7 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 8</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 8 (g)</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Component 9</th>
                    <th className="font-bold py-2 px-2 whitespace-nowrap">Comp 9 (g)</th>
                  </tr>
                </thead>
                <tbody>
                  {variantsArray.fields.map((field, idx) => (
                    <tr key={field.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-2 text-primary">
                          <button type="button" onClick={() => variantsArray.append(formApi.getValues(`variants.${idx}`))} className="hover:text-blue-700">
                            <Copy size={16} />
                          </button>
                          <button type="button" onClick={() => variantsArray.remove(idx)} className="text-danger hover:text-red-700" disabled={variantsArray.fields.length === 1}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-2 min-w-[150px]">
                        <FormField
                          name={`variants.${idx}.typeOfVariant`}
                          type="select"
                          options={VARIANT_TYPE_OPTIONS}
                          placeholder="Standard"
                          menuPosition="absolute"
                          menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                        />
                      </td>
                      <td className="py-2 px-2 text-center">
                        <FormField name={`variants.${idx}.chefsChoice`} type="checkbox" className="mx-auto" />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.sizeAvailable`}
                          type="select"
                          options={SIZE_OPTIONS}
                          placeholder="OneSize"
                          menuPosition="absolute"
                          menuPortalTarget={typeof document !== 'undefined' ? document.body : null}
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.price`}
                          type="number"
                          step="0.01"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.kcal`}
                          type="number"
                          placeholder="317"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.protein`}
                          type="number"
                          placeholder="3"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.carb`}
                          type="number"
                          placeholder="73"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.fat`}
                          type="number"
                          placeholder="1"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component1`}
                          placeholder="ABC SMOOT..."
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram1`}
                          type="number"
                          placeholder="330"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component2`}
                          placeholder="Comp 2"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram2`}
                          type="number"
                          placeholder="4324"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component3`}
                          placeholder="Comp 3"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram3`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component4`}
                          placeholder="Comp 4"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram4`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component5`}
                          placeholder="Comp 5"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram5`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component6`}
                          placeholder="Comp 6"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram6`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component7`}
                          placeholder="Comp 7"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram7`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component8`}
                          placeholder="Comp 8"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram8`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[120px]">
                        <FormField
                          name={`variants.${idx}.component9`}
                          placeholder="Comp 9"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0"
                        />
                      </td>
                      <td className="py-2 px-2 min-w-[80px]">
                        <FormField
                          name={`variants.${idx}.gram9`}
                          type="number"
                          placeholder="g"
                          className="border-b-2 border-l-0 border-r-0 border-t-0 rounded-none bg-transparent px-1 shadow-none! focus:ring-0 text-center"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" disabled={isPending} className="btn btn-outline px-8" onClick={() => handleSubmit((data) => submitHandler(data, false))()}>
              Save as Draft
            </button>
            <button type="button" disabled={isPending} className="btn btn-primary px-8" onClick={() => handleSubmit((data) => submitHandler(data, true))()}>
              Save & Finalize
            </button>
          </div>
        </form>
      </FormProvider>
    </PageFormWrapper>
  )
}
