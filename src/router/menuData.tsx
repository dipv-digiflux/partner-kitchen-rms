import { getCrudMenuItems, DASHBOARD_MENU_ITEM, USER_MANAGEMENT_MENU_ITEM } from '@/config/crudModules.config'
import { Section } from '@/types/menu.types'

export const MENU_DATA: Section[] = [
  {
    items: [DASHBOARD_MENU_ITEM, USER_MANAGEMENT_MENU_ITEM, ...getCrudMenuItems()],
  },
]
