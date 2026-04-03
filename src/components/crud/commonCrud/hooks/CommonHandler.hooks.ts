import { formCurdActions, tableCrudActions } from '@/components/crud/commonCrud/commonCrudActions'
import { getCommonCrudApi } from '@/components/crud/commonCrud/commonCrudStore'
import { setValidationError } from '@/components/crud/commonHelper/ReactHookForm'
import { getSearchParams, setSearchPrams } from '@/components/crud/commonHelper/SearchParams'
import { queryClient } from '@/lib/providers/QueryProvider'
import { showToast } from '@/lib/utils/toast'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudStateGeneric } from '@/types/commonCrud.types'
import { UseMutationResult, keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { Control, FieldValues } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

// <* ===========  Submit form  ========= *>
const useSubmitHandler = <TFieldValues extends FieldValues = FieldValues>({
  apiName,
  mutationKey = [],
}: {
  apiName: string
  mutationKey?: string[]
}): UseMutationResult<unknown, unknown, { data: JsonObject; control: Control<TFieldValues> }, unknown> => {
  const Api = getCommonCrudApi(apiName)
  const state = Api.moduleState.state.commonCrud
  const moduleMode = state?.moduleMode
  const selectedRecord = state?.selectedRecord ?? {}
  const action = formCurdActions({ apiName })(moduleMode === 'EDIT' ? 'update' : 'create')

  const queryKey = [apiName, action, selectedRecord, ...mutationKey]
  Api.crudApi.queryKeys['submitHandlerKey'] = queryKey

  // Submit form data
  const submitHandle = ({ data: formData, control }: { data: JsonObject; control: Control<TFieldValues> }) => {
    const data = { action, ...selectedRecord, ...formData }

    // form error handler
    const rejectCallback = (error: unknown) => {
      setValidationError(error as JsonObject, control)
    }

    const callback = () => {
      Api.actions.hideForm()
      queryClient.invalidateQueries({ queryKey: Api.crudApi.queryKeys['dataHandlerKey'] })
    }

    return Api.AjaxApi({ data, callback, rejectCallback })
  }

  return useMutation({
    mutationKey: queryKey,
    mutationFn: submitHandle,
    onSuccess: () => {
      const successMessages: Record<string, string> = {
        ADD: `${Api.pageTitle} created successfully`,
        EDIT: `${Api.pageTitle} updated successfully`,
      }
      showToast.success(successMessages[moduleMode as string] || 'Operation completed successfully')
    },
  })
}

// <* ===========  Submit filter form  ========= *>
const useFilterSubmitHandler = ({ apiName, mutationKey = [] }: { apiName: string; mutationKey?: string[] }) => {
  const Api = getCommonCrudApi(apiName)

  const queryKey = [apiName, 'filter', ...mutationKey]
  return useMutation({
    mutationKey: queryKey,
    mutationFn: async (filterData: unknown) => {
      const SearchParamsObject = getSearchParams() as JsonObject

      // overwrite filter and page = 1
      SearchParamsObject.page = 1
      SearchParamsObject.filters = filterData as JsonObject

      // invalid query for new data fetch
      queryClient.cancelQueries({ queryKey: Api.crudApi.queryKeys['dataHandlerKey'] })

      setSearchPrams(SearchParamsObject)
    },
  })
}

// <* ===========  Get Data  ========= *>
const useDataHandler = ({ apiName, queryKey: userQueryKey = [], data = {} }: { apiName: string; queryKey?: string[]; data?: JsonObject }) => {
  const Api = getCommonCrudApi(apiName)
  const action = tableCrudActions({ apiName })('get')
  // this for force refetch on page change
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const location = useLocation()

  const searchParams = getSearchParams() as JsonObject
  const page = (searchParams.page as number) || 1
  const limit = (searchParams.limit as number) || 10
  const filters = (searchParams.filters as JsonObject) || {}
  const sortBy = searchParams.sortBy as string | undefined
  const sortOrder = searchParams.sortOrder as string | undefined
  const queryKey = [apiName, action, page, limit, filters, sortBy, sortOrder, ...userQueryKey, data] as (string | JsonObject)[]
  Api.crudApi.queryKeys['dataHandlerKey'] = queryKey

  return useQuery({
    queryKey,
    queryFn: ({ signal }) => {
      const finalData = { action, page, limit, ...filters, ...data }
      if (sortBy) Object.assign(finalData, { sortBy, sortOrder: sortOrder || 'asc' })
      return Api.AjaxApi({ data: finalData, signal })
    },
    placeholderData: keepPreviousData,
  })
}

// <* ===========  Add Record  ========= *>
const addRecordHandler = ({ apiName }: { apiName: string }) => {
  getCommonCrudApi(apiName).actions.showForm()
}

// <* ===========  Update Record  ========= *>
const editRecordHandler = ({ apiName, data = {} }: { apiName: string; data?: JsonObject }) => {
  getCommonCrudApi(apiName).actions.editRecord(data)
}

// <* ===========  Fetch selected Record  ========= *>
const useSelectedRecordHandler = ({ apiName, queryKey: userQueryKey = [], ...arg }: { apiName: string; queryKey?: string[] } & JsonObject) => {
  const Api = getCommonCrudApi(apiName)
  const moduleMode = useStore(Api.moduleState, (state: CommonCrudStateGeneric) => state.commonCrud?.moduleMode)
  const selectedRecord = Api.moduleState.state.commonCrud?.selectedRecord ?? {}
  const action = formCurdActions({ apiName })('fetch')

  // Fetch record data
  const getRecordDataHandle = () => {
    const data = { action, ...selectedRecord }
    return Api.AjaxApi({ data, type: 'GET', rejectCallback: Api.actions.hideForm as (error: unknown) => void })
  }

  const queryKey = [apiName, action, selectedRecord, ...userQueryKey]
  Api.crudApi.queryKeys['selectedRecordHandlerKey'] = queryKey

  return useQuery({
    queryKey,
    queryFn: getRecordDataHandle,
    enabled: moduleMode == 'EDIT',
    ...arg,
  })
}

// <* ===========  Delete Record  ========= *>
const deleteRecordHandler = ({ apiName, data = {} }: { apiName: string; data?: JsonObject }) => {
  getCommonCrudApi(apiName).actions.deleteRecord(data)
}

const useDeleteRecordHandler = ({ apiName, mutationKey = [] }: { apiName: string; mutationKey?: string[] }) => {
  const Api = getCommonCrudApi(apiName)
  const action = formCurdActions({ apiName })('delete')
  const selectedRecord = Api.moduleState.state.commonCrud?.selectedRecord ?? {}

  const deleteRecordFunc = async (deleteData = {}) => {
    const data = { action, ...selectedRecord, ...deleteData }
    const callback = () => {
      Api.actions.resetCrud()
      queryClient.invalidateQueries({ queryKey: [apiName] })
    }
    return Api.AjaxApi({ data, callback })
  }

  const queryKey = [apiName, action, selectedRecord, ...mutationKey]
  Api.crudApi.queryKeys['deleteRecordHandlerKey'] = queryKey

  return useMutation({
    mutationKey: queryKey,
    mutationFn: deleteRecordFunc,
    onSuccess: () => {
      showToast.success(`${Api.pageTitle} deleted successfully`)
    },
  })
}

// <* ============================= *>
// <* ===========  CRUD  ========= *>
// <* ============================= *>

export const createCommonCrudHandler = ({ apiName }: { apiName: string }) => {
  return {
    useSubmitHandler: <TFieldValues extends FieldValues = FieldValues>(arg = {}) => useSubmitHandler<TFieldValues>({ apiName, ...arg }),
    useFilterSubmitHandler: (arg = {}) => useFilterSubmitHandler({ apiName, ...arg }),
    useDataHandler: (arg = {}) => useDataHandler({ apiName, ...arg }),
    addRecordHandler: (arg = {}) => addRecordHandler({ apiName, ...arg }),
    editRecordHandler: (arg = {}) => editRecordHandler({ apiName, ...arg }),
    useSelectedRecordHandler: (arg = {}) => useSelectedRecordHandler({ apiName, ...arg }),
    deleteRecordHandler: (arg = {}) => deleteRecordHandler({ apiName, ...arg }),
    useDeleteRecordHandler: (arg = {}) => useDeleteRecordHandler({ apiName, ...arg }),
  }
}
