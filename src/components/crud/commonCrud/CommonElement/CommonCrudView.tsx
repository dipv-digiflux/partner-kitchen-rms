import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { JsonObject, JsonValue } from '@/types/commonAjax.types'
import { ColumnDef, getCoreRowModel, PaginationState, useReactTable } from '@tanstack/react-table'
import { useEffect } from 'react'
import { getSearchParams, setSearchPrams } from '../../commonHelper/SearchParams'
import { CommonCrudTable, CommonCrudTablePagination } from './CommonCrudTable'
import { DeleteRecordModal } from './CommonFormElement'

export const CommonCrudView = <TRecord extends JsonObject>({ columns }: { columns: ColumnDef<TRecord, JsonValue>[] }) => {
  const API = useModuleApi<TRecord>()
  const {
    crudHandler: { useDataHandler },
  } = API.crudApi
  const { data } = useDataHandler()
  const moduleData = (data?.data || { result: [], totalRecords: 0 }) as { result: TRecord[]; totalRecords: number }

  const { page = 1, limit = 10 } = getSearchParams<{ page?: number; limit?: number }>()

  // tanstack table
  API.moduleRef.tableRef = useReactTable({
    data: (moduleData && moduleData.result) ?? [],
    pageCount: Math.ceil(((moduleData.totalRecords as number) || 0) / limit),
    columns,
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

  if (API.moduleRef.tableRef) {
    API.moduleRef.tableRef['commonCrudState'] = {
      data: moduleData,
    }
  }

  useEffect(() => {
    return () => {
      // API.moduleRef.tableRef = undefined
    }
  }, [])

  return (
    <>
      <div className="rounded-md">
        <div className="table-wrapper border-0 w-full overflow-auto">
          <CommonCrudTable />
        </div>
        <CommonCrudTablePagination />
      </div>
      <DeleteRecordModal />
    </>
  )
}
