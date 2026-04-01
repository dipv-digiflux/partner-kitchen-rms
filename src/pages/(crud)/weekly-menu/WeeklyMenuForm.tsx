import { Modal } from '@/components/core/PopupModal/Modal'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { CrudFormProps } from '@/types/modulePages.types'
import type { WeeklyMenuPayload } from '@/types/payload/weekly-menu.payload'
import { FormProvider, useForm } from 'react-hook-form'
import type { OptionType } from '@/types/components.types'
import { useMemo } from 'react'

const categoryOptions: OptionType[] = []
const recipeOptionsRaw: Record<string, unknown>[] = []

export const WeeklyMenuForm = ({ isUpdateRecord, fetchRecord, toggle }: CrudFormProps<WeeklyMenuPayload>) => {
  const API = useModuleApi()
  const { useSubmitHandler } = API.crudApi.crudHandler

  const formApi = useForm<WeeklyMenuPayload>({
    mode: 'all',
    defaultValues: fetchRecord ?? {
      categoryId: '',
      week_label: '',
      start_date: '',
      end_date: '',
      menu_items: '',
      finalize: false,
    },
  })

  const { handleSubmit } = formApi
  const { isPending, mutate } = useSubmitHandler<WeeklyMenuPayload>()

  const selectedCategoryId = formApi.watch('categoryId')



  const recipeOptions = useMemo(() => {
    const raw = Array.isArray(recipeOptionsRaw) ? recipeOptionsRaw : []
    const normalized = raw
      .map((r) => {
        const value = (r.value ?? r._id ?? r.id) as string | undefined
        const label = (r.label ?? r.dishName ?? r.name) as string | undefined
        const categoryId = (r.categoryId ?? r.category_id) as string | undefined
        if (!value || !label) return null
        return { value, label, categoryId }
      })
      .filter(Boolean) as Array<{ value: string; label: string; categoryId?: string }>

    const stripCategory = (r: { value: string; label: string; categoryId?: string }) => ({ value: r.value, label: r.label })
    if (!selectedCategoryId) return normalized.map(stripCategory)
    return normalized.filter((r) => r.categoryId === selectedCategoryId).map(stripCategory)
  }, [selectedCategoryId])

  const selectedRecipesValue = useMemo(() => {
    const v = formApi.getValues('menu_items') || ''
    const parts = v
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    return parts
  }, [formApi])

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
            <FormField
              name="categoryId"
              label="Category"
              type="select"
              options={(categoryOptions as OptionType[]) || []}
              validateRule={{ required: true, name: 'Category' }}
              placeholder="Select category"
            />
            <FormField name="week_label" label="Week Label" validateRule={{ required: true, name: 'Week Label' }} placeholder="e.g. Week 12, Mar 2025" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField name="start_date" label="Start Date" type="date" validateRule={{ required: true, name: 'Start Date' }} />
            <FormField name="end_date" label="End Date" type="date" validateRule={{ required: true, name: 'End Date' }} />
          </div>

          <FormField
            name="menu_items"
            label="Menu Items"
            type="select"
            // Our Select component supports single value; to keep this compatible we store comma-separated values.
            // For now, we reuse select for search UX by allowing the user to pick one at a time; subsequent picks append.
            options={(recipeOptions as OptionType[]) || []}
            placeholder={selectedCategoryId ? 'Search recipes (filtered by category)…' : 'Select category first'}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(val: any) => {
              const picked = String(val ?? '').trim()
              if (!picked) return
              const current = (formApi.getValues('menu_items') || '')
                .split(',')
                .map((s) => s.trim())
                .filter(Boolean)
              if (!current.includes(picked)) current.push(picked)
              formApi.setValue('menu_items', current.join(', '))
            }}
          />

          {selectedRecipesValue.length ? (
            <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">Selected recipes</p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => {
                    formApi.setValue('menu_items', '')
                  }}
                >
                  Clear
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedRecipesValue.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs"
                    onClick={() => {
                      const next = selectedRecipesValue.filter((x) => x !== id)
                      formApi.setValue('menu_items', next.join(', '))
                    }}
                    title="Click to remove"
                  >
                    {id}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Click an item to remove it.</p>
            </div>
          ) : null}

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
