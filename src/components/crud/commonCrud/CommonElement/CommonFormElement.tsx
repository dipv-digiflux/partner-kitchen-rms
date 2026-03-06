import { Loader } from '@/components/Loader'
import { Modal } from '@/components/core/PopupModal/Modal'
import { useStore } from '@tanstack/react-store'
import { useLocation } from 'react-router-dom'

import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudStateGeneric } from '@/types/commonCrud.types'
import { CrudFormProps } from '@/types/modulePages.types'
import { useLayoutEffect } from 'react'
import { getSearchParams } from '../../commonHelper/SearchParams'

export const CommonFormElement = <TRecord extends JsonObject = JsonObject>({ form: FormElement }: { form: React.ComponentType<CrudFormProps<TRecord>> }) => {
  const API = useModuleApi()
  const moduleMode = useStore(API.moduleState, (state: CommonCrudStateGeneric) => state.commonCrud?.moduleMode)
  const { useSelectedRecordHandler } = API.crudApi.crudHandler
  const { hideForm } = API.actions
  const location = useLocation()

  const { data, isFetching } = useSelectedRecordHandler()
  // for helper variable
  const isUpdateRecord = moduleMode == 'EDIT'

  // Check if we are on the form page (for PAGE mode)
  const isOnFormPage = API.formMode === 'PAGE' && API.routes?.Form && location.pathname === API.routes.Form

  useLayoutEffect(() => {
    if (isOnFormPage) {
      const id = getSearchParams().id
      API.moduleState.setState((oldState) => {
        return { ...oldState, commonCrud: { ...oldState.commonCrud, moduleMode: id ? 'EDIT' : 'ADD', selectedRecord: { id }, formVisibility: true } }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnFormPage])

  return (
    <>
      <CommonLoader loading={isFetching} />
      {moduleMode == 'ADD' || (moduleMode == 'EDIT' && !isFetching && data) ? (
        <FormElement toggle={hideForm} moduleMode={moduleMode} fetchRecord={isUpdateRecord ? (data as unknown as { data: TRecord })?.data : undefined} isUpdateRecord={isUpdateRecord} />
      ) : null}
    </>
  )
}

export const CommonLoader = ({ loading }: { loading: boolean }) => {
  return <>{loading ? <Loader className="fixed" /> : null}</>
}

export const DeleteRecordModal = () => {
  const API = useModuleApi()
  const moduleMode = useStore(API.moduleState, (state: CommonCrudStateGeneric) => state.commonCrud?.moduleMode)
  const { useDeleteRecordHandler } = API.crudApi.crudHandler
  const { resetCrud } = API.actions

  const { isPending, mutate } = useDeleteRecordHandler()
  return (
    <>
      {moduleMode == 'DELETE' && (
        <Modal open={true} onClose={resetCrud} title={`Delete ${API.pageTitle}`}>
          <p className="font-medium text-secondary">Are You Sure You Want Delete This {API.pageTitle}.</p>
          <div className="flex gap-2 justify-center mt-5">
            <button disabled={isPending} onClick={() => resetCrud()} className="btn btn-light btn-sm btn-outline">
              Cancel
            </button>
            <button disabled={isPending} onClick={() => mutate({})} className="btn btn-danger btn-outline btn-sm">
              Yes, Delete
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
