import { PageFormWrapper } from '@/components/crud/commonCrud/CommonElement/PageFormWrapper'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { WeeklyMenuPayload } from '@/types/payload/weekly-menu.payload'
import type { OptionType } from '@/types/components.types'
import { FormProvider, useForm } from 'react-hook-form'
import { useMemo } from 'react'
import { WeeklyMenuRecipesDndField } from './WeeklyMenuRecipesDndField'

type WeeklyMenuFormValues = Omit<WeeklyMenuPayload, 'start_date' | 'end_date' | 'menu_items'> & {
  date_range: { from?: string; to?: string }
  menu_items: string[]
}

export const WeeklyMenuForm = ({ fetchRecord, moduleMode }: CrudFormProps<WeeklyMenuPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler
  const pagtitle = moduleMode === 'EDIT' ? 'Edit' : 'Add'

  const formApi = useForm<WeeklyMenuFormValues>({
    mode: 'all',
    defaultValues: fetchRecord
      ? {
          ...fetchRecord,
          date_range: { from: fetchRecord.start_date || '', to: fetchRecord.end_date || '' },
          menu_items: Array.isArray(fetchRecord.menu_items)
            ? fetchRecord.menu_items.map((s) => String(s)).filter(Boolean)
            : String(fetchRecord.menu_items || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean),
        }
      : {
          categoryId: '',
          week_label: '',
          date_range: { from: '', to: '' },
          menu_items: [],
          finalize: false,
          _id: '',
        },
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<WeeklyMenuPayload>()

  const recipeOptionsForUi = useMemo(() => {
    return Array.from({ length: 20 }).map((_, idx) => ({ value: `mock-recipe-${idx + 1}`, label: `Mock Recipe ${idx + 1}` })) as OptionType[]
  }, [])

  const submitHandler = (data: WeeklyMenuFormValues, finalize = false) => {
    const payload: WeeklyMenuPayload = {
      ...(data as unknown as WeeklyMenuPayload),
      start_date: data.date_range?.from || '',
      end_date: data.date_range?.to || '',
      menu_items: Array.isArray(data.menu_items) ? data.menu_items : [],
      finalize,
    }
    console.log({payload})
    // @ts-expect-error control type differs from payload; runtime is fine for RHF
    mutate({ data: payload, control: formApi.control })
  }

  return (
    <PageFormWrapper title={`${pagtitle} ${API.pageTitle}`} className="max-w-[1300px] mx-auto">
      <FormProvider {...formApi}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit((data) => submitHandler(data, false))(e)
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="categoryId" label="Category" type="select" options={([{label: 'Select category', value: '1'}] as OptionType[]) } validateRule={{ required: true, name: 'Category' }} placeholder={'Select category'} />
            <FormField name="week_label" label="Week Label" validateRule={{ required: true, name: 'Week Label' }} placeholder="e.g. Week 12, Mar 2025" />
          </div>

          <FormField name="date_range" type="daterange" label="Date Range" validateRule={{ required: true }} />

          <WeeklyMenuRecipesDndField name="menu_items" label="Recipes" options={(recipeOptionsForUi as OptionType[])} canSelect={true} placeholder={'Search recipes...'} />

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={() => handleSubmit((data) => submitHandler(data, false))()} disabled={isPending} className="btn btn-sm px-3 btn-outline">
              Save as Draft
            </button>
            <button type="button" onClick={() => handleSubmit((data) => submitHandler(data, true))()} disabled={isPending} className="btn btn-sm px-3 btn-primary">
              Save & Finalize
            </button>
          </div>
        </form>
      </FormProvider>
    </PageFormWrapper>
  )
}
