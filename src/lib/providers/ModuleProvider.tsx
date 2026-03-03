import { getCommonCrudApi } from '@/components/crud/commonCrud/commonCrudStore'
import { ModuleContext } from '@/lib/context/ModuleContext'
import { useModuleApi } from '@/lib/hooks/useModuleApi'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Syncs PAGE-mode crud form state with route. Store last location; only clear when we actually left the form route (e.g. browser back). */
function ModuleProviderRouteSync() {
  const API = useModuleApi()
  const location = useLocation()
  useEffect(() => {
    const isPageMode = API.formMode === 'PAGE'
    const formRoute = API.routes?.Form
    const currentPath = location.pathname

    if (isPageMode && formRoute && currentPath !== formRoute) {
      const currentState = API.moduleState.state.commonCrud
      if (currentState?.moduleMode === 'ADD' || currentState?.moduleMode === 'EDIT') {
        API.moduleState.setState((old) => ({ ...old, commonCrud: {} }))
      }
    }
  }, [API.formMode, API.moduleState, API.routes?.Form, location.pathname])

  return null
}

export const ModuleProvider = ({ apiName, children }: { apiName: string; children: React.ReactNode }) => {
  const Api = getCommonCrudApi(apiName)

  return (
    <ModuleContext.Provider value={Api}>
      <ModuleProviderRouteSync />
      {children}
    </ModuleContext.Provider>
  )
}
