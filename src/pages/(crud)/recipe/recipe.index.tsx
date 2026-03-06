import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import type { RecipePayload } from '@/types/payload/recipe.payload'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { RecipeForm } from './RecipeForm'

const columnHelper = createColumnHelper<RecipePayload>()

const RecipeContent = () => {
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
      columnHelper.accessor('recipe_name', {
        header: 'Recipe Name',
        cell: (info) => <span className="font-medium">{(info.getValue() as string) || '-'}</span>,
        size: 200,
      }),
      columnHelper.accessor('cuisine_type', {
        header: 'Cuisine',
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 120,
      }),
      columnHelper.accessor('calories_range', {
        header: 'Calories (Kcal)',
        cell: (info) => <span>{info.getValue() as string}</span>,
        size: 120,
      }),
      columnHelper.accessor('meal_price', {
        header: 'Meal Price',
        cell: (info) => {
          const val = info.getValue()
          return <span>{val != null ? `$${Number(val).toFixed(2)}` : '-'}</span>
        },
        size: 100,
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
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <EditRecord id={row.original._id} />
            <DeleteRecord id={row.original._id} />
          </div>
        ),
        size: 150,
      }),
    ],
    [],
  )

  return (
    <div>
      <ModuleBreadCrumb pageTitle="Recipe Master">
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

      <CommonFormElement form={RecipeForm} />
    </div>
  )
}

const Recipe = withModuleProvider(RecipeContent, 'recipe')
export default Recipe
