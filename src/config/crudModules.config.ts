/**
 * CRUD config – builds store config, menu items, and URLs from crudModules.data.
 * Single place for CRUD logic; add modules only in crudModules.data.ts.
 */

import type { CrudConfigItem } from '@/types/commonCrud.types'
import type { MenuItem } from '@/types/menu.types'
import IconMenuCalendar from '@/assets/Icon/Menu/IconMenuCalendar'
import IconMenuContacts from '@/assets/Icon/Menu/IconMenuContacts'
import IconMenuPages from '@/assets/Icon/Menu/IconMenuPages'
import IconMenuUsers from '@/assets/Icon/Menu/IconMenuUsers'
import { CRUD_MODULES_DATA, type FormMode } from './crudModules.data'

export type { FormMode }

const LIST = (apiUrl: string) => apiUrl
const FORM = (apiUrl: string) => `${apiUrl}/add`

const MENU_ICONS: Record<string, MenuItem['icon']> = {
  users: IconMenuUsers,
  contacts: IconMenuContacts,
  pages: IconMenuPages,
  calendar: IconMenuCalendar,
}

function normalize(key: string, m: (typeof CRUD_MODULES_DATA)[string]) {
  return {
    apiName: key,
    apiUrl: m.apiUrl,
    pageTitle: m.pageTitle,
    permissionName: m.permissionName,
    formMode: m.formMode,
    listPath: LIST(m.apiUrl),
    formPath: FORM(m.apiUrl),
    menu: { label: m.menuLabel, icon: MENU_ICONS[m.menuIcon] ?? IconMenuPages },
    customUrls: m.customUrls,
    getRequestUrl: m.getRequestUrl,
  }
}

// this is for crud setup

export function getCrudConfigFromModules(): Record<string, CrudConfigItem> {
  const config: Record<string, CrudConfigItem> = {}
  for (const key of Object.keys(CRUD_MODULES_DATA)) {
    const m = normalize(key, CRUD_MODULES_DATA[key])
    config[key] = {
      apiUrl: m.apiUrl,
      pageTitle: m.pageTitle,
      permissionsName: m.permissionName,
      formMode: m.formMode,
      ...(m.formMode === 'PAGE' && { routes: { Form: m.formPath, pageRoute: m.listPath } }),
      ...(m.customUrls && { customUrls: m.customUrls }),
      ...(m.getRequestUrl && { getRequestUrl: m.getRequestUrl }),
    }
  }
  return config
}

// =============== this is for role and permission

export type UrlPermission = { url: string; permissionName: string }

export function getCrudUrls(): Record<string, UrlPermission> {
  const out: Record<string, UrlPermission> = {}
  for (const [key, m] of Object.entries(CRUD_MODULES_DATA)) {
    const n = normalize(key, m)
    out[key] = { url: n.listPath, permissionName: n.permissionName }
    out[`${key}Form`] = { url: n.formPath, permissionName: n.permissionName }
  }
  return out
}
