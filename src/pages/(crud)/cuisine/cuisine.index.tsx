import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'

import { createColumnHelper } from '@/types/crudTable.types'
import type { CuisinePayload } from '@/types/payload/cuisine.payload'
import { useMemo } from 'react'
import { CuisineForm } from './CuisineForm'

const columnHelper = createColumnHelper<CuisinePayload>()

const CuisineContent = () => {
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
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => <span className="font-medium">{(info.getValue() as string) || '-'}</span>,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Action',
        cell: ({ row }) => {
          const id = row.original._id
          return (
            <div className="flex items-center gap-2">
              <EditRecord id={id} />
              <DeleteRecord id={id} />
            </div>
          )
        },
        size: 120,
      }),
    ],
    [],
  )

  return (
    <div>
      <ModuleBreadCrumb>
        <AddRecord />
      </ModuleBreadCrumb>

      <div className="card">
        <div className="p-4">
          <CommonFilterSearch name="name" placeholder="Search Cuisine..." />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudView columns={columns} />
          </div>
        </div>
      </div>

      <CommonFormElement form={CuisineForm} />
    </div>
  )
}

const Cuisine = withModuleProvider(CuisineContent, 'cuisine')
export default Cuisine
