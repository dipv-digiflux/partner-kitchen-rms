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
  allergens!: Table<Record<string, unknown>, string>
  barcodePlaces!: Table<Record<string, unknown>, string>
  cuisines!: Table<Record<string, unknown>, string>
  dishTypes!: Table<Record<string, unknown>, string>
  ingredients!: Table<Record<string, unknown>, string>
  packagingMaterials!: Table<Record<string, unknown>, string>
  permissions!: Table<Record<string, unknown>, string>
  users!: Table<Record<string, unknown>, string>
  variants!: Table<Record<string, unknown>, string>

  constructor() {
    super('partner-kitchen-temp-idb')

    this.version(1).stores({
      // Primary key is `_id` (string) for all temp stores
      recipes: '&_id',
      weeklyMenus: '&_id',
      categories: '&_id',
      allergens: '&_id',
      barcodePlaces: '&_id',
      cuisines: '&_id',
      dishTypes: '&_id',
      ingredients: '&_id',
      packagingMaterials: '&_id',
      permissions: '&_id',
      users: '&_id',
      variants: '&_id',
    })
  }
}

export const appIdb = new AppIdb()
