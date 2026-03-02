/**
 * this file is for permission name and url
 */

const urls = {
  // Dashboard
  dashboard: { url: '/', permissionName: 'dashboard' },

  // User Management
  user: { url: '/user', permissionName: 'user' },
  permissions: { url: '/permissions', permissionName: 'permission' },
  permissionsForm: { url: '/permissions/add', permissionName: 'permission' },
} as const

export const urlPermissionObject = Object.entries(urls).reduce(
  (acc, [, value]) => {
    acc[value.url] = value.permissionName
    return acc
  },
  {} as Record<string, string>,
)

export default urls
