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
  vendorDashboard: '/vendor-dashboard',
  productionReportSummary: '/reports/production-summary',
  productionReportList: '/reports/production-list',
  recipeRatings: '/recipe-ratings',
}
