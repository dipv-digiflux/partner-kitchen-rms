/** Per-recipe scheduling and meal tags for weekly menus (parallel to `menu_items` ids when both are sent). */
export type WeeklyMenuRecipeEntry = {
  recipeId: string
  days: string[]
  highProtein?: boolean
  balanced?: boolean
  vegetarian?: boolean
}

export type WeeklyMenuPayload = {
  _id: string
  /** PRD feedback: vendor selects a category first (breakfast/snacks/main meals). */
  categoryId?: string
  week_label: string
  start_date: string
  end_date: string
  menu_items: string[]
  /** Optional detail rows; backends may ignore until supported. */
  menu_items_config?: WeeklyMenuRecipeEntry[]
  finalize: boolean
  status?: string
}
