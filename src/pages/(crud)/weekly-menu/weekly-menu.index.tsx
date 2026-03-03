import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { commonAjax } from '@/components/crud/commonCrud/commonAjax'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { hasUserPermission } from '@/components/crud/commonHelper/PermissionsCheck'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { showToast } from '@/lib/utils/toast'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { JsonObject } from '@/types/commonAjax.types'
import { createColumnHelper } from '@tanstack/react-table'
import { Copy } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { WeeklyMenuForm } from './WeeklyMenuForm'

const columnHelper = createColumnHelper<JsonObject>()

const DuplicateRecord = ({ id }: { id: string }) => {
  const API = useModuleApi()
  const queryClient = useQueryClient()
  const hasPermission = hasUserPermission({ apiName: API.apiName, type: 'add' })

  const duplicateMutation = useMutation({
    mutationFn: async () => {
      return commonAjax<JsonObject, JsonObject>({
        url: API.apiUrl,
        type: 'POST',
        data: { action: 'duplicate', id },
      })
    },
    onSuccess: () => {
      showToast.success('Weekly menu duplicated successfully')
      queryClient.invalidateQueries({ queryKey: [API.apiName] })
    },
    onError: () => {
      showToast.error('Failed to duplicate weekly menu')
    },
  })

  if (!hasPermission) return null

  return (
    <button type="button" className="btn btn-sm btn-outline btn-secondary p-2 cursor-pointer" title="Duplicate" onClick={() => duplicateMutation.mutate()} disabled={duplicateMutation.isPending}>
      <Copy size={13} />
    </button>
  )
}

const WeeklyMenuContent = () => {
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'srNo',
        header: 'Sr. No',
        cell: ({ row, table }) => {
          const pageIndex = table.getState().pagination.pageIndex
          const pageSize = table.getState().pagination.pageSize
          return (
            <div className="text-center">
              <span>{pageIndex * pageSize + row.index + 1}</span>
            </div>
          )
        },
        size: 80,
      }),
      columnHelper.accessor('week_label', {
        header: 'Week',
        cell: (info) => <span className="font-medium">{(info.getValue() as string) || '-'}</span>,
        size: 180,
      }),
      columnHelper.accessor('start_date', {
        header: 'Start Date',
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 120,
      }),
      columnHelper.accessor('end_date', {
        header: 'End Date',
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 120,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => {
          const val = info.getValue() as string
          return <span className={val === 'finalized' ? 'text-success' : 'text-warning'}>{val === 'finalized' ? 'Finalized' : 'Draft'}</span>
        },
        size: 100,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
          const id = (row.original._id ?? row.original.id) as string
          return (
            <div className="flex items-center gap-2">
              <EditRecord id={id} />
              <DuplicateRecord id={id} />
              <DeleteRecord id={id} />
            </div>
          )
        },
        size: 180,
      }),
    ],
    [],
  )

  return (
    <div>
      <ModuleBreadCrumb pageTitle="Weekly Menu Master">
        <AddRecord />
      </ModuleBreadCrumb>

      <div className="card">
        <div className="p-4">
          <CommonFilterSearch />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudView columns={columns} />
          </div>
        </div>
      </div>

      <CommonFormElement form={WeeklyMenuForm} />
    </div>
  )
}

const WeeklyMenu = withModuleProvider(WeeklyMenuContent, 'weekly-menu')
export default WeeklyMenu
