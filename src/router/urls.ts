/**
 * URL + permission for each route. CRUD URLs come from config (one source); rest listed here.
 */
import { getCrudUrls } from '@/config/crudModules.config'

const NON_CRUD_URLS = {
  dashboard: { url: '/', permissionName: 'dashboard' },
  vendorDashboard: { url: '/vendor-dashboard', permissionName: 'vendor_dashboard' },
  userManagement: { url: '/user-management', permissionName: 'user_management' },
  productionReportSummary: { url: '/reports/production-summary', permissionName: 'reports' },
  productionReportList: { url: '/reports/production-list', permissionName: 'reports' },
  recipeRatings: { url: '/recipe-ratings', permissionName: 'recipe_ratings' },
} as const

const urls = { ...NON_CRUD_URLS, ...getCrudUrls() } as const

export const urlPermissionObject = Object.entries(urls).reduce(
  (acc, [, value]) => {
    acc[value.url] = value.permissionName
    return acc
  },
  {} as Record<string, string>,
)

export default urls
