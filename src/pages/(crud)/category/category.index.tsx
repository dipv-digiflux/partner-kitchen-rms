import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'

import { createColumnHelper } from '@/types/crudTable.types'
import type { CategoryPayload } from '@/types/payload/category.payload'
import { useMemo } from 'react'
import { CategoryForm } from './CategoryForm'

const columnHelper = createColumnHelper<CategoryPayload>()

const VEGETARIAN_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'true', label: 'Only Vegetarian' },
  { value: 'false', label: 'Only Non Vegetarian' },
]

const CategoryContent = () => {
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
      columnHelper.accessor('CategoryName', {
        header: 'Category Name',
        cell: (info) => <span className="font-medium">{(info.getValue() as string) || '-'}</span>,
      }),
      columnHelper.accessor('OrderNumber', {
        header: 'Order',
        cell: (info) => <span>{info.getValue() as number}</span>,
        size: 100,
      }),
      columnHelper.accessor('IsVegetarian', {
        header: 'Vegetarian',
        meta: { headerFilter: { type: 'select', options: VEGETARIAN_OPTIONS } },
        cell: (info) => <span>{info.getValue() ? 'Yes' : 'No'}</span>,
        size: 100,
      }),
      columnHelper.accessor('IsLive', {
        header: 'Live',
        cell: (info) => <span className={info.getValue() ? 'text-success' : 'text-danger'}>{info.getValue() ? 'Active' : 'Inactive'}</span>,
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
          <CommonFilterSearch name="CategoryName" placeholder="Search Category..." />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudView columns={columns} />
          </div>
        </div>
      </div>

      <CommonFormElement form={CategoryForm} />
    </div>
  )
}

const Category = withModuleProvider(CategoryContent, 'category')
export default Category
