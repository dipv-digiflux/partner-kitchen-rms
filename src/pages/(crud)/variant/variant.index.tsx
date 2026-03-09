import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'

import { createColumnHelper } from '@/types/crudTable.types'
import type { VariantPayload } from '@/types/payload/variant.payload'
import { useMemo } from 'react'
import { VariantForm } from './VariantForm'

const columnHelper = createColumnHelper<VariantPayload>()

const VariantContent = () => {
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
      columnHelper.accessor('displayName', {
        header: 'Display Name',
        cell: (info) => <span className="font-medium">{(info.getValue() as string) || '-'}</span>,
        size: 250,
      }),
      columnHelper.accessor('internalName', {
        header: 'Internal Name',
        cell: (info) => <span>{(info.getValue() as string) || '-'}</span>,
        size: 250,
      }),
      columnHelper.display({
        id: 'ingredientsCount',
        header: 'Ingredients',
        cell: ({ row }) => {
          const count = row.original.ingredients?.length || 0
          return (
            <span>
              {count} item{count !== 1 ? 's' : ''}
            </span>
          )
        },
        size: 100,
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
        size: 150,
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
          <CommonFilterSearch name="displayName" placeholder="Search Variant..." />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudView columns={columns} />
          </div>
        </div>
      </div>

      <CommonFormElement form={VariantForm} />
    </div>
  )
}

const Variant = withModuleProvider(VariantContent, 'variant')
export default Variant
