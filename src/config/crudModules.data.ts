import type { CustomCrudUrls, GetRequestUrlProps } from '@/types/commonCrud.types'

/**
 * CRUD modules – minimal data only. No URLs duplication.
 * Rule: formMode MODAL = form in modal (< 5 fields), PAGE = full page (5+ fields).
 *
 * To add a module:
 * 1. Add one entry here (apiUrl is the only URL; list = apiUrl, form = apiUrl + '/add').
 * 2. In crudModules.config.ts add menuIcon key to MENU_ICONS if new (e.g. 'users' | 'contacts' | 'pages' | 'calendar').
 * URLs and menu are derived – no need to edit router/urls.ts for CRUD.
 *
 * Custom API URLs: use customUrls (simple object) or getRequestUrl (function) for non-default endpoints.
 */

export type FormMode = 'MODAL' | 'PAGE'

/** Minimal input per module. apiUrl is the only URL – list = apiUrl, form = apiUrl + '/add'. */
export interface CrudModuleInput {
  apiUrl: string
  pageTitle: string
  permissionName: string
  formMode: FormMode
  menuLabel: string
  menuIcon: string
  /** Optional: override URL per action. Use :id in string for getOne/update/delete. */
  customUrls?: CustomCrudUrls
  /** Optional (advanced): function to return URL when customUrls is not enough. */
  getRequestUrl?: (props: GetRequestUrlProps) => string
}

/** All CRUD modules. Key = apiName (use kebab-case e.g. 'weekly-menu'). */
export const CRUD_MODULES_DATA: Record<string, CrudModuleInput> = {
  user: {
    apiUrl: '/user',
    pageTitle: 'User',
    permissionName: 'user',
    formMode: 'MODAL',
    menuLabel: 'Users',
    menuIcon: 'users',
  },
  permissions: {
    apiUrl: '/permissions',
    pageTitle: 'Permission',
    permissionName: 'permission',
    formMode: 'MODAL',
    menuLabel: 'Permissions',
    menuIcon: 'contacts',
  },
  recipe: {
    apiUrl: '/recipe',
    pageTitle: 'Recipe',
    permissionName: 'recipe',
    formMode: 'PAGE',
    menuLabel: 'Recipe Master',
    menuIcon: 'pages',
  },
  'weekly-menu': {
    apiUrl: '/weekly-menu',
    pageTitle: 'Weekly Menu',
    permissionName: 'weekly_menu',
    formMode: 'MODAL',
    menuLabel: 'Weekly Menu',
    menuIcon: 'calendar',
  },
}
