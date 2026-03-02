import { ModuleProvider } from '@/lib/providers/ModuleProvider'
import React from 'react'

export const withModuleProvider = <P extends object>(Component: React.ComponentType<P>, apiName: string) => {
  const WrappedComponent = (props: P) => (
    <ModuleProvider apiName={apiName}>
      <Component {...props} />
    </ModuleProvider>
  )

  return WrappedComponent
}
