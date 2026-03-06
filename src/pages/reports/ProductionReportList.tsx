import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { FormField } from '@/components/crud/commonHelper/formValidation/FormField'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { JsonObject } from '@/types/commonAjax.types'
import { useQuery } from '@tanstack/react-query'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'

/**
 * Production Report – List (for "powered by molt" labels) by customer, delivery date or date range.
 * PRD: Indicate final / draft.
 */
const ProductionReportList = () => {
  const [params, setParams] = useState<{ startDate?: string; endDate?: string }>({})
  const formApi = useForm<FieldValues>({
    defaultValues: { startDate: '', endDate: '' },
  })

  const { data, isFetching } = useQuery({
    queryKey: ['production-report-list', params],
    queryFn: async () => {
      const res = await commonAjax<JsonObject, { data?: JsonObject }>({
        url: '/reports/production-list',
        type: 'GET',
        data: params as JsonObject,
      })
      return res
    },
    enabled: !!params.startDate || !!params.endDate,
  })

  const onSubmit = (values: FieldValues) => {
    setParams({ startDate: values.startDate, endDate: values.endDate })
  }

  return (
    <div>
      <ModuleBreadCrumb pageTitle="Production Report – List" />

      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold">Filters</h3>
        </div>
        <div className="card-body">
          <FormProvider {...formApi}>
            <form onSubmit={formApi.handleSubmit(onSubmit)} className="flex flex-wrap items-end gap-4">
              <div className="min-w-[140px]">
                <FormField name="startDate" label="Start Date" type="date" />
              </div>
              <div className="min-w-[140px]">
                <FormField name="endDate" label="End Date" type="date" />
              </div>
              <button type="submit" className="btn btn-primary" disabled={isFetching}>
                {isFetching ? 'Loading…' : 'Generate Report'}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header flex items-center justify-between">
          <h3 className="text-lg font-semibold">List (for printing &quot;powered by molt&quot; labels)</h3>
          <span className="text-xs text-gray-500">(Final / draft indicated by API)</span>
        </div>
        <div className="card-body">
          {isFetching ? <p className="text-gray-500">Loading report…</p> : null}
          {!isFetching && data ? <pre className="overflow-auto rounded bg-gray-50 dark:bg-gray-800 p-4 text-sm">{JSON.stringify(data, null, 2)}</pre> : null}
          {!isFetching && !data && !params.startDate && !params.endDate && <p className="text-gray-500">Select date range and click Generate Report.</p>}
        </div>
      </div>
    </div>
  )
}

export default ProductionReportList
