import { Routes } from '@/types/commonModule'

export const appRoutes: Routes = {
  home: '/',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  user: '/user',
  permissions: '/permissions',
  // Vendor Kitchen Platform
  recipe: '/recipe',
  recipeForm: '/recipe/add',
  weeklyMenu: '/weekly-menu',
  weeklyMenuForm: '/weekly-menu/add',
  category: '/category',
  ingredient: '/ingredient',
  dishtype: '/dishtype',
  cuisine: '/cuisine',
  packagingMaterial: '/packaging-material',
  variant: '/variant',
  variantForm: '/variant/add',
  allergens: '/allergens',
  barcodePlace: '/barcode-place',
  vendorDashboard: '/vendor-dashboard',
  productionReportSummary: '/reports/production-summary',
  productionReportList: '/reports/production-list',
  recipeRatings: '/recipe-ratings',
}
