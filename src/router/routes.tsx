/* eslint-disable react-refresh/only-export-components */
import { appRoutes } from '@/lib/utils/routes'
import Signup from '@/pages/onBoarding/register/Signup'
import { Login } from '@/pages/onBoarding/signin/Login'
import { lazy } from 'react'
import User from '../pages/(crud)/user/user.index'
const Index = lazy(() => import('../pages/Index'))
const Event = lazy(() => import('../pages/(crud)/event/event.index'))
const Permissions = lazy(() => import('../pages/(crud)/permissions/permissions.index'))
const PermissionsPage = lazy(() => import('../pages/(crud)/permissions/PermissionsForm'))
const Error404 = lazy(() =>
  import('../pages/error/Error404').then((module) => ({
    default: module.Error404,
  })),
)

const routes = [
  // dashboard
  {
    path: appRoutes.home,
    element: <Index />,
    layout: 'default',
  },
  // auth
  {
    path: appRoutes.login,
    element: <Login />,
    layout: 'blank',
  },
  // crud
  {
    path: appRoutes.event,
    element: <Event />,
    layout: 'default',
  },
  {
    path: appRoutes.user,
    element: <User />,
    layout: 'default',
  },
  {
    path: appRoutes.permissions,
    element: <Permissions />,
    layout: 'default',
  },
  {
    path: appRoutes.addPermission,
    element: <PermissionsPage />,
    layout: 'default',
  },
  {
    path: appRoutes.signup,
    element: <Signup />,
    layout: 'blank',
  },
  // error
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
]

export { routes }
