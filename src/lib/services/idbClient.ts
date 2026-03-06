// TODO: IDB data handling
import Dexie, { Table } from 'dexie'
import type { RecipePayload } from '@/types/payload/recipe.payload'
import type { WeeklyMenuPayload } from '@/types/payload/weekly-menu.payload'
import type { CategoryPayload } from '@/types/payload/category.payload'

export type RecipeRecord = RecipePayload
export type WeeklyMenuRecord = WeeklyMenuPayload
export type CategoryRecord = CategoryPayload

export class AppIdb extends Dexie {
  recipes!: Table<RecipeRecord, string>
  weeklyMenus!: Table<WeeklyMenuRecord, string>
  categories!: Table<CategoryRecord, string>

  constructor() {
    super('partner-kitchen-temp-idb')

    this.version(1).stores({
      // Primary key is `_id` (string) for all temp stores
      recipes: '&_id',
      weeklyMenus: '&_id',
      categories: '&_id',
    })
  }
}

export const appIdb = new AppIdb()
