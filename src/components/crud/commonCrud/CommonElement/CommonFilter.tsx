import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { cn } from '@/lib/utils/utills'
import { JsonObject } from '@/types/commonAjax.types'
import { CommonCrudStateGeneric } from '@/types/commonCrud.types'
import { useIsFetching } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-store'
import { Store } from '@tanstack/store'
import { AlignJustify, X } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getSearchParams } from '../../commonHelper/SearchParams'
import { FormField } from '../../commonHelper/formValidation/FormField'

export const CommonFilter = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const API = useModuleApi()
  const filterShow = useStore(API.moduleState as Store<CommonCrudStateGeneric>, (state) => state.filterShow)
  const {
    crudHandler: { useFilterSubmitHandler },
  } = API.crudApi

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formApi = useForm<any>({
    mode: 'all',
    defaultValues: (getSearchParams() as unknown as { filters?: JsonObject }).filters || {},
  })

  API.moduleRef.filterFormRef = formApi

  useEffect(() => {
    const currentForm = formRef.current
    const resetHandler = () => {
      const resetFormValues: JsonObject = {}
      Object.keys(formApi.getValues()).map((key) => (resetFormValues[key] = ''))
      formApi.reset(resetFormValues)
      formRef.current?.requestSubmit()
    }

    const resetButton = currentForm?.querySelector(`[type='reset']`)
    resetButton?.addEventListener('click', resetHandler)
    return () => resetButton?.removeEventListener('click', resetHandler)
  }, [formApi])

  const { mutate } = useFilterSubmitHandler()

  const onSubmit = (data: JsonObject) => {
    mutate(data)
  }

  return (
    <FormProvider {...formApi}>
      <form ref={formRef} onSubmit={formApi.handleSubmit(onSubmit)}>
        <div className={cn('card flex-0 w-[250px] mr-4 fixed top-0 left-0 bottom-0 z-[13] lg:z-[0] lg:relative', !filterShow && 'hidden')}>
          <div className="card-header">
            <span className="fs-14">Filter Options</span>
            <div className="close-btn" onClick={() => API.actions.toggleFilter()}>
              <X size={14} />
            </div>
          </div>
          <div className={`card-body overflow-y-auto space-y-3 ${className}`}>{children}</div>
        </div>
        <div className={cn(filterShow ? 'block' : 'hidden', 'modal-backdrop  lg:hidden z-[11]')} onClick={() => API.actions.toggleFilter()}></div>
      </form>
    </FormProvider>
  )
}

export const CommonFilterCloseIcon = () => {
  const API = useModuleApi()

  return (
    <div onClick={() => API.actions.toggleFilter()} className="cursor-pointer border border-primary-clarity rounded-md p-1 text-primary/90 font-bold bg-primary-clarity">
      <AlignJustify size={'16'} />
    </div>
  )
}

export const CommonFilterActionButton = () => {
  const API = useModuleApi()
  const isFetching = useIsFetching({ queryKey: API.crudApi.queryKeys.dataHandlerKey })
  return (
    <div className="flex justify-end gap-2">
      <button type="reset" className="btn btn-secondary btn-sm" disabled={isFetching > 0}>
        Reset
      </button>
      <button type="submit" className="btn btn-primary  btn-sm" disabled={isFetching > 0}>
        Filter
      </button>
    </div>
  )
}

export const CommonFilterSearch = ({ name = 'search', placeholder = 'Search..' }: { name?: string; placeholder?: string }) => {
  const API = useModuleApi()
  const {
    crudHandler: { useFilterSubmitHandler },
  } = API.crudApi

  const filterData = (getSearchParams() as unknown as { filters?: JsonObject }).filters

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formApi = useForm<any>({
    mode: 'all',
    defaultValues: {
      [name]: (filterData && (filterData as JsonObject)[name]) ?? '',
    },
  })

  const { mutate } = useFilterSubmitHandler()
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSubmittedRef = useRef<string>('')
  const skipFirstWatchEventRef = useRef(true)

  const onSubmit = (data: JsonObject) => {
    lastSubmittedRef.current = JSON.stringify(data)
    mutate(data)
  }

  useEffect(() => {
    const subscription = formApi.watch((values) => {
      if (skipFirstWatchEventRef.current) {
        skipFirstWatchEventRef.current = false
        return
      }

      const data = values as unknown as JsonObject
      const nextKey = JSON.stringify(data)
      if (nextKey === lastSubmittedRef.current) return

      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
      debounceTimeoutRef.current = setTimeout(() => {
        lastSubmittedRef.current = nextKey
        mutate(data)
      }, 400)
    })

    return () => {
      subscription.unsubscribe()
      if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current)
    }
  }, [formApi, mutate])

  return (
    <FormProvider {...formApi}>
      <form onSubmit={formApi.handleSubmit(onSubmit)}>
        <FormField name={name} placeholder={placeholder} className="max-w-[250px]" />
      </form>
    </FormProvider>
  )
}
