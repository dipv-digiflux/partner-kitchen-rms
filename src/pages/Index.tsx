import { CommonCrudTable, CommonCrudTablePagination } from '@/components/crud/commonCrud/CommonElement/CommonCrudTable'
import { ModuleContext } from '@/lib/context/ModuleContext'
import { CommonAjaxProps, JsonObject } from '@/types/commonAjax.types'
import { CommonCrudApi, CommonCrudStateGeneric, CrudHandler } from '@/types/commonCrud.types'
import { Table, createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { Store } from '@tanstack/store'
import { useMemo } from 'react'

// Dummy Data
const data = [
  { id: 1, firstName: 'Caroline', lastName: 'Jensen', email: 'carolinejensen@zidant.com', phone: '+1 (821) 447-3782' },
  { id: 2, firstName: 'Celeste', lastName: 'Grant', email: 'celestegrant@polarax.com', phone: '+1 (838) 515-3408' },
  { id: 3, firstName: 'Tillman', lastName: 'Forbes', email: 'tillmanforbes@manglo.com', phone: '+1 (969) 496-2892' },
  { id: 4, firstName: 'Daisy', lastName: 'Whitley', email: 'daisywhitley@applideck.com', phone: '+1 (861) 564-2877' },
  { id: 5, firstName: 'Weber', lastName: 'Bowman', email: 'weberbowman@volax.com', phone: '+1 (962) 466-3483' },
  { id: 6, firstName: 'Buckley', lastName: 'Townsend', email: 'buckleytownsend@orbaxter.com', phone: '+1 (884) 595-2643' },
  { id: 7, firstName: 'Latoya', lastName: 'Bradshaw', email: 'latoyabradshaw@opportech.com', phone: '+1 (906) 474-3155' },
  { id: 8, firstName: 'Kate', lastName: 'Lindsay', email: 'katelindsay@gorganic.com', phone: '+1 (930) 546-2952' },
  { id: 9, firstName: 'Marva', lastName: 'Sandoval', email: 'marvasandoval@avit.com', phone: '+1 (927) 566-3600' },
  { id: 10, firstName: 'Decker', lastName: 'Russell', email: 'deckerrussell@quilch.com', phone: '+1 (846) 535-3283' },
]

const columnHelper = createColumnHelper<(typeof data)[0]>()

const columns = [
  columnHelper.accessor('id', { header: 'ID' }),
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor('lastName', { header: 'Last Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
  columnHelper.accessor('phone', { header: 'Phone' }),
]

const Index = () => {
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
        pageIndex: 0,
      },
    },
  })

  // Mock API context
  const api: CommonCrudApi<JsonObject> = useMemo(() => {
    return {
      apiName: 'demo-api',
      apiUrl: '/demo',
      pageTitle: 'Demo Table',
      AjaxApi: async <TResponse,>(arg: CommonAjaxProps<JsonObject, TResponse>): Promise<TResponse> => {
        console.log('Mock Ajax Call:', arg)
        return { success: true, data: [] } as unknown as TResponse
      },
      crudApi: {
        formCrud: { action_alias: 'record' },
        tableCrud: { action_alias: 'record' },
        crudHandler: {} as unknown as CrudHandler<JsonObject>,
        queryKeys: {
          submitHandlerKey: ['demo-submit'],
          dataHandlerKey: ['demo-data'],
          selectedRecordHandlerKey: ['demo-selected'],
          deleteRecordHandlerKey: ['demo-delete'],
        },
      },
      moduleRef: {
        tableRef: table as unknown as Table<JsonObject>,
        filterFormRef: null,
      },
      moduleState: new Store<CommonCrudStateGeneric<JsonObject>>({
        apiName: 'demo-api',
        commonCrud: {},
        filterShow: false,
        data: { totalRecords: data.length },
      }),
      reducers: {},
      actions: {},
    }
  }, [table])

  return (
    <ModuleContext.Provider value={api}>
      <div className="panel mt-6">
        <h5 className="font-semibold text-lg dark:text-white-light mb-5">Basic</h5>
        <CommonCrudTable />
        <CommonCrudTablePagination />
      </div>
    </ModuleContext.Provider>
  )
}

export default Index
