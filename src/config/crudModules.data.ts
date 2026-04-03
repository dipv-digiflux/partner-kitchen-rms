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
    formMode: 'PAGE',
    menuLabel: 'Weekly Menu',
    menuIcon: 'calendar',
  },

  // new
  category: {
    apiUrl: '/category',
    pageTitle: 'Category',
    permissionName: 'category',
    formMode: 'MODAL',
    menuLabel: 'Category',
    menuIcon: 'pages',
  },
  ingredient: {
    apiUrl: '/ingredient',
    pageTitle: 'Ingredient',
    permissionName: 'ingredient',
    formMode: 'MODAL',
    menuLabel: 'Ingredient',
    menuIcon: 'pages',
  },
  dishtype: {
    apiUrl: '/dishtype',
    pageTitle: 'Dish Type',
    permissionName: 'dishtype',
    formMode: 'MODAL',
    menuLabel: 'Dish Type',
    menuIcon: 'pages',
  },
  cuisine: {
    apiUrl: '/cuisine',
    pageTitle: 'Cuisine',
    permissionName: 'cuisine',
    formMode: 'MODAL',
    menuLabel: 'Cuisine',
    menuIcon: 'pages',
  },
  'packaging-material': {
    apiUrl: '/packaging-material',
    pageTitle: 'Packaging Material',
    permissionName: 'packaging_material',
    formMode: 'MODAL',
    menuLabel: 'Packaging Material',
    menuIcon: 'pages',
  },
  variant: {
    apiUrl: '/variant',
    pageTitle: 'Variant',
    permissionName: 'variant',
    formMode: 'PAGE',
    menuLabel: 'Variant',
    menuIcon: 'pages',
  },
  allergens: {
    apiUrl: '/allergens',
    pageTitle: 'Allergens',
    permissionName: 'allergens',
    formMode: 'MODAL',
    menuLabel: 'Allergens',
    menuIcon: 'pages',
  },
  'barcode-place': {
    apiUrl: '/barcode-place',
    pageTitle: 'Barcode Place',
    permissionName: 'barcode_place',
    formMode: 'MODAL',
    menuLabel: 'Barcode Place',
    menuIcon: 'pages',
  },
}
