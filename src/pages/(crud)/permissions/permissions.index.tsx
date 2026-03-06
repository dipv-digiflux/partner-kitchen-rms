import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import type { PermissionsPayload } from '@/types/payload/permissions.payload'
import { createColumnHelper } from '@tanstack/react-table'
import { useMemo } from 'react'
import { PermissionsForm } from './PermissionsFormContent'

const columnHelper = createColumnHelper<PermissionsPayload>()

const PermissionsContent = () => {
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
        cell: (info) => <code className="rounded bg-gray-100 px-2 py-1 text-xs text-primary">{info.getValue() as string}</code>,
        size: 250,
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        size: 120,
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: (info) => <span className="text-sm text-gray-500">{(info.getValue() as string) || 'No description'}</span>,
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
        size: 120,
      }),
    ],
    [],
  )

  return (
    <div>
      <ModuleBreadCrumb pageTitle={'Permissions'}>
        <AddRecord />
      </ModuleBreadCrumb>

      <div className="card">
        <div className="card-header">
          <CommonFilterSearch />
        </div>
        <div className="card-body">
          <CommonCrudView columns={columns} />
        </div>
      </div>

      <CommonFormElement form={PermissionsForm} />
    </div>
  )
}

const Permissions = withModuleProvider(PermissionsContent, 'permissions')
export default Permissions
