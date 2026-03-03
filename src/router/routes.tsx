/* eslint-disable react-refresh/only-export-components */
import { appRoutes } from '@/lib/utils/routes'
import Signup from '@/pages/onBoarding/register/Signup'
import { Login } from '@/pages/onBoarding/signin/Login'
import { lazy } from 'react'
import User from '../pages/(crud)/user/user.index'

const Permissions = lazy(() => import('../pages/(crud)/permissions/permissions.index'))
const Recipe = lazy(() => import('../pages/(crud)/recipe/recipe.index'))
const RecipeFormPage = lazy(() => import('../pages/(crud)/recipe/RecipeFormPage'))
const WeeklyMenu = lazy(() => import('../pages/(crud)/weekly-menu/weekly-menu.index'))
const VendorDashboard = lazy(() => import('../pages/vendor-dashboard/VendorDashboard'))
const ProductionReportSummary = lazy(() => import('../pages/reports/ProductionReportSummary'))
const ProductionReportList = lazy(() => import('../pages/reports/ProductionReportList'))
const RecipeRatings = lazy(() => import('../pages/recipe-ratings/RecipeRatings'))
const Error404 = lazy(() =>
  import('../pages/error/Error404').then((module) => ({
    default: module.Error404,
  })),
)

const routes = [
  {
    path: appRoutes.home,
    element: <VendorDashboard />,
    layout: 'default',
  },
  {
    path: appRoutes.login,
    element: <Login />,
    layout: 'blank',
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
    path: appRoutes.recipe,
    element: <Recipe />,
    layout: 'default',
  },
  {
    path: appRoutes.recipeForm,
    element: <RecipeFormPage />,
    layout: 'default',
  },
  {
    path: appRoutes.weeklyMenu,
    element: <WeeklyMenu />,
    layout: 'default',
  },
  {
    path: appRoutes.vendorDashboard,
    element: <VendorDashboard />,
    layout: 'default',
  },
  {
    path: appRoutes.productionReportSummary,
    element: <ProductionReportSummary />,
    layout: 'default',
  },
  {
    path: appRoutes.productionReportList,
    element: <ProductionReportList />,
    layout: 'default',
  },
  {
    path: appRoutes.recipeRatings,
    element: <RecipeRatings />,
    layout: 'default',
  },
  {
    path: appRoutes.signup,
    element: <Signup />,
    layout: 'blank',
  },
  {
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
]

export { routes }
