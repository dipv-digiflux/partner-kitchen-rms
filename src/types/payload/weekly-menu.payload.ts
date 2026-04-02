export type WeeklyMenuPayload = {
  _id: string
  /** PRD feedback: vendor selects a category first (breakfast/snacks/main meals). */
  categoryId?: string
  week_label: string
  start_date: string
  end_date: string
  menu_items: string[]
  finalize: boolean
  status?: string
}
