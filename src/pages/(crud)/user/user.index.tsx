import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudTable, CommonCrudTablePagination } from '@/components/crud/commonCrud/CommonElement/CommonCrudTable'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { getSearchParams, setSearchPrams } from '@/components/crud/commonHelper/SearchParams'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { JsonObject } from '@/types/commonAjax.types'
import { createColumnHelper, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table'
import { useMemo } from 'react'
import { UserForm } from './UserForm'

const columnHelper = createColumnHelper<JsonObject>()

const UserContent = () => {
  // Define all available columns
  const allColumns = useMemo(
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
      columnHelper.accessor('full_name', {
        header: 'Name',
        cell: (info) => <span>{info.getValue() as string}</span>,
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        size: 300,
      }),
      columnHelper.display({
        id: 'mobile',
        header: 'Number',
        cell: ({ row }) => (
          <span>
            {row.original.country_code as string} {row.original.mobile as string}
          </span>
        ),
        size: 200,
      }),
      columnHelper.accessor('role', {
        header: 'Role',
        cell: (info) => {
          const roles = info.getValue() as { name: string }[] | undefined
          return <span>{roles?.map((r) => r.name).join(', ')}</span>
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: (info) => <span>{info.getValue() ? 'Active' : 'In-Active'}</span>,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <EditRecord id={row.original._id as string} />
            <DeleteRecord id={row.original._id as string} />
          </div>
        ),
        size: 150,
      }),
    ],
    [],
  )

  const API = useModuleApi<JsonObject>()
  const {
    crudApi: {
      crudHandler: { useDataHandler },
    },
  } = API

  const { data } = useDataHandler()
  const moduleData = (data?.data || { result: [], totalRecords: 0 }) as { result: JsonObject[]; totalRecords: number }

  const { page = 1, limit = 10 } = getSearchParams<{ page?: number; limit?: number }>()

  // tanstack table
  API.moduleRef.tableRef = useReactTable({
    data: (moduleData && moduleData.result) ?? [],
    pageCount: Math.ceil(((moduleData.totalRecords as number) || 0) / limit),
    columns: allColumns,
    state: {
      pagination: {
        pageIndex: Number(page) - 1,
        pageSize: limit,
      },
    },
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: (updater) => {
      const { pageIndex, pageSize } = typeof updater === 'function' ? (updater as (props: PaginationState) => PaginationState)({ pageIndex: Number(page) - 1, pageSize: limit }) : updater
      setSearchPrams({ page: Number(pageIndex) + 1, limit: pageSize })
    },
  })

  return (
    <div>
      <ModuleBreadCrumb pageTitle={'User'}>
        <AddRecord />
      </ModuleBreadCrumb>

      <div className="card">
        <div className="p-4">
          <CommonFilterSearch />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudTable />
            <CommonCrudTablePagination />
          </div>
        </div>
      </div>

      <CommonFormElement form={UserForm} />
    </div>
  )
}

const User = withModuleProvider(UserContent, 'user')
export default User
