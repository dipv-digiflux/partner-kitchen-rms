/* eslint-disable react-refresh/only-export-components */
import { appRoutes } from '@/lib/utils/routes'
import { Login } from '@/pages/onBoarding/signin/Login'
import { lazy } from 'react'
import User from '../pages/(crud)/user/user.index'

const Permissions = lazy(() => import('../pages/(crud)/permissions/permissions.index'))
const Recipe = lazy(() => import('../pages/(crud)/recipe/recipe.index'))
const RecipeFormPage = lazy(() => import('../pages/(crud)/recipe/RecipeFormPage'))
const WeeklyMenu = lazy(() => import('../pages/(crud)/weekly-menu/weekly-menu.index'))
const WeeklyMenuFormPage = lazy(() => import('../pages/(crud)/weekly-menu/WeeklyMenuFormPage'))
const Category = lazy(() => import('../pages/(crud)/category/category.index'))
const Ingredient = lazy(() => import('../pages/(crud)/ingredient/ingredient.index'))
const DishType = lazy(() => import('../pages/(crud)/dishtype/dishtype.index'))
const Cuisine = lazy(() => import('../pages/(crud)/cuisine/cuisine.index'))
const PackagingMaterial = lazy(() => import('../pages/(crud)/packaging-material/packagingMaterial.index'))
const Variant = lazy(() => import('../pages/(crud)/variant/variant.index'))
const VariantFormPage = lazy(() => import('../pages/(crud)/variant/VariantFormPage'))
const Allergens = lazy(() => import('../pages/(crud)/allergens/allergens.index'))
const BarcodePlace = lazy(() => import('../pages/(crud)/barcode-place/barcodePlace.index'))
const VendorDashboard = lazy(() => import('../pages/vendor-dashboard/VendorDashboard'))
const UserManagement = lazy(() => import('../pages/user-management/UserManagement'))
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
    path: appRoutes.userManagement,
    element: <UserManagement />,
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
    path: appRoutes.weeklyMenuForm,
    element: <WeeklyMenuFormPage />,
    layout: 'default',
  },
  {
    path: appRoutes.category,
    element: <Category />,
    layout: 'default',
  },
  {
    path: appRoutes.ingredient,
    element: <Ingredient />,
    layout: 'default',
  },
  {
    path: appRoutes.dishtype,
    element: <DishType />,
    layout: 'default',
  },
  {
    path: appRoutes.cuisine,
    element: <Cuisine />,
    layout: 'default',
  },
  {
    path: appRoutes.packagingMaterial,
    element: <PackagingMaterial />,
    layout: 'default',
  },
  {
    path: appRoutes.variant,
    element: <Variant />,
    layout: 'default',
  },
  {
    path: appRoutes.variantForm,
    element: <VariantFormPage />,
    layout: 'default',
  },
  {
    path: appRoutes.allergens,
    element: <Allergens />,
    layout: 'default',
  },
  {
    path: appRoutes.barcodePlace,
    element: <BarcodePlace />,
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
    path: '*',
    element: <Error404 />,
    layout: 'blank',
  },
]

export { routes }
