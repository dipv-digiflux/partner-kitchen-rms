import { createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'

const finalRoutes = routes.map((route) => {
  return {
    ...route,
    element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
  }
})

import BlankLayout from '@/components/layouts/BlankLayout'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { HookExportProvider } from '@/lib/providers/HookExportProvider'
import { SeoRouteManager } from '@/components/layouts/SeoRouteManager'

const router = createBrowserRouter([
  {
    element: (
      <>
        <SeoRouteManager />
        <HookExportProvider />
      </>
    ),
    children: finalRoutes,
  },
])

export default router
