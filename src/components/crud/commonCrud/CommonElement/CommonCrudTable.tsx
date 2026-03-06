import { Loader } from '@/components/Loader'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { TableHeaderFilter } from '@/components/crud/commonCrud/CommonElement/TableHeaderFilter'
import { JsonObject } from '@/types/commonAjax.types'
import { useIsFetching } from '@tanstack/react-query'
import { Cell, flexRender, Header, HeaderGroup, Row } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { getSearchParams, setSearchPrams } from '../../commonHelper/SearchParams'

export const CommonCrudTable = () => {
  const API = useModuleApi()
  const isFetching = useIsFetching({ queryKey: API.crudApi.queryKeys.dataHandlerKey })
  const params = getSearchParams() as { sortBy?: string; sortOrder?: string; filters?: JsonObject }
  const { mutate: submitFilter } = API.crudApi.crudHandler.useFilterSubmitHandler()

  const handleSort = (columnId: string) => {
    const currentSortBy = params.sortBy
    const currentOrder = params.sortOrder
    const nextOrder = currentSortBy === columnId && currentOrder === 'asc' ? 'desc' : 'asc'
    setSearchPrams({ sortBy: columnId, sortOrder: nextOrder, page: 1 })
  }

  const handleHeaderFilter = (name: string, value: string | number) => {
    submitFilter({ [name]: value })
  }

  const table = API.moduleRef.tableRef
  if (!table) return null

  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          {table.getHeaderGroups().map((headerGroup: HeaderGroup<JsonObject>) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header: Header<JsonObject, unknown>) => {
                const colId = header.column.id
                const isSortable = header.column.getCanSort?.() ?? false
                const isActiveSort = params.sortBy === colId
                const sortOrder = params.sortOrder
                const headerFilter = header.column.columnDef.meta?.headerFilter
                const filterName = colId
                const filterValue = (params.filters && (params.filters[filterName] as string | number)) ?? ''

                return (
                  <th key={header.id} colSpan={header.colSpan} style={{ width: `${header.getSize()}px` }}>
                    <div className="flex items-center gap-1">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {isSortable ? (
                        <button
                          type="button"
                          onClick={() => handleSort(colId)}
                          disabled={isFetching > 0}
                          className="p-0.5 rounded hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
                          title={isActiveSort ? `Sort ${sortOrder}` : 'Sort'}
                        >
                          {!isActiveSort ? (
                            <ArrowUpDown className="h-3.5 w-3.5 opacity-60" />
                          ) : sortOrder === 'asc' ? (
                            <ArrowUp className="h-3.5 w-3.5 text-primary" />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5 text-primary" />
                          )}
                        </button>
                      ) : null}
                      {headerFilter ? (
                        <TableHeaderFilter filterName={filterName} filterValue={filterValue} onFilterChange={handleHeaderFilter} config={headerFilter} disabled={isFetching > 0} />
                      ) : null}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>

        <tbody style={{ opacity: isFetching ? '0.5' : '1' }}>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row: Row<JsonObject>) => (
              <tr data-row-index={row.index} key={row.id}>
                {row.getVisibleCells().map((cell: Cell<JsonObject, unknown>) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={table.getAllColumns().length}>
                {!isFetching && <div className="text-center">No data available !</div>}
                {Boolean(isFetching) && (
                  <div className="relative min-h-10">
                    <Loader />
                  </div>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const CommonCrudTablePagination = () => {
  const API = useModuleApi()
  const isFetching = useIsFetching({ queryKey: API.crudApi.queryKeys.dataHandlerKey })
  const table = API.moduleRef.tableRef
  if (!table) return null

  const totalRecords = table?.commonCrudState?.data?.totalRecords ?? 0

  const pageIndex = table.getState().pagination.pageIndex
  const pageSize = Number(table.getState().pagination.pageSize)
  const pageCount = table.getPageCount()

  const totalRows = table.getFilteredRowModel().rows.length
  const startRecord = totalRows === 0 ? 0 : pageIndex * pageSize + 1
  const endRecord = startRecord && totalRows ? startRecord + totalRows - 1 : 0

  const paginationItems = getPaginationItems(pageIndex + 1, pageCount)

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-[#e0e6ed] px-4 py-4 dark:border-[#191e3a] md:flex-row">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[#0e1726] dark:text-white-dark">
          Showing {startRecord} to {endRecord} of {totalRecords} entries
        </span>
        <select disabled={isFetching > 0} value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))} className="form-select h-9 w-20 py-1 px-2 text-sm">
          {[5, 10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => table.previousPage()}
          disabled={pageIndex === 0 || isFetching > 0}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-black transition-all duration-300 hover:bg-primary hover:text-white dark:bg-[#1b2e4b] dark:text-white-dark dark:hover:bg-primary dark:hover:text-white ${
            pageIndex === 0 || isFetching > 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {paginationItems.map((item, i) => (
          <button
            disabled={item == '…' || isFetching > 0}
            key={i + 1}
            onClick={() => item !== '…' && table.setPageIndex(Number(item) - 1)}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold transition-all duration-300 ${
              item === pageIndex + 1
                ? 'bg-primary text-white shadow-md'
                : 'bg-[#f3f4f6] text-black hover:bg-primary hover:text-white dark:bg-[#1b2e4b] dark:text-white-dark dark:hover:bg-primary dark:hover:text-white'
            } ${item == '…' ? 'cursor-default' : ''}`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={() => table.nextPage()}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-black transition-all duration-300 hover:bg-primary hover:text-white dark:bg-[#1b2e4b] dark:text-white-dark dark:hover:bg-primary dark:hover:text-white ${
            pageIndex + 1 === pageCount || pageCount === 0 || isFetching > 0 ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={pageIndex + 1 === pageCount || pageCount === 0 || isFetching > 0}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/**
 * Returns an array for rendering pagination buttons: [1, '…', 4, 5, 6, '…', 10]
 * @param {number} current - The current page (1-based)
 * @param {number} total - Total number of pages (1-based)
 * @param {number} [radius=2] - How many pages before/after to show
 */
// eslint-disable-next-line react-refresh/only-export-components
export function getPaginationItems(current: number, total: number, radius = 2) {
  if (!current || !total) return []

  const items: (number | string)[] = [1]

  if (current === 1 && total === 1) return items

  if (current > 4) items.push('…')

  const r1 = current - radius
  const r2 = current + radius

  for (let i = Math.max(2, r1); i <= Math.min(total, r2); i++) {
    items.push(i)
  }

  if (r2 + 1 < total) items.push('…')
  if (r2 < total) items.push(total)

  return items
}
