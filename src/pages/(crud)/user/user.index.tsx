import { AddRecord, DeleteRecord, EditRecord } from '@/components/crud/commonCrud/CommonElement/CommonAction'
import { CommonCrudView } from '@/components/crud/commonCrud/CommonElement/CommonCrudView'
import { CommonFilterSearch } from '@/components/crud/commonCrud/CommonElement/CommonFilter'
import { CommonFormElement } from '@/components/crud/commonCrud/CommonElement/CommonFormElement'
import { ModuleBreadCrumb } from '@/components/ModuleBreadCrumb'
import { withModuleProvider } from '@/lib/hoc/withModuleProvider'
import type { UserPayload } from '@/types/payload/user.payload'
import { createColumnHelper } from '@tanstack/react-table'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { UserForm } from './UserForm'

const columnHelper = createColumnHelper<UserPayload>()

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
      columnHelper.accessor((row) => row.name, {
        id: 'name',
        header: 'Name',
      }),
      columnHelper.accessor('email', {
        header: 'Email',
        size: 300,
      }),
      columnHelper.accessor((row) => row.createdAt ?? null, {
        id: 'createdAt',
        header: 'Created At',
        cell: (info) => {
          const value = info.getValue()
          if (typeof value !== 'string' || !value) return <span />
          return <span>{format(new Date(value), 'dd/MM/yyyy')}</span>
        },
        size: 200,
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
      <ModuleBreadCrumb pageTitle={'User'}>
        <AddRecord />
      </ModuleBreadCrumb>

      <div className="card">
        <div className="p-4">
          <CommonFilterSearch />
        </div>
        <div className="card-body p-4">
          <div className="p-0 overflow-hidden">
            <CommonCrudView columns={allColumns} />
          </div>
        </div>
      </div>

      <CommonFormElement form={UserForm} />
    </div>
  )
}

const User = withModuleProvider(UserContent, 'user')
export default User
