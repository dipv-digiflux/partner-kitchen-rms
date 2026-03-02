import { getCommonCrudApi } from '@/components/crud/commonCrud/commonCrudStore'
import { ModuleContext } from '@/lib/context/ModuleContext'

export const ModuleProvider = ({ apiName, children }: { apiName: string; children: React.ReactNode }) => {
  const Api = getCommonCrudApi(apiName)

  return <ModuleContext.Provider value={Api}>{children}</ModuleContext.Provider>
}
