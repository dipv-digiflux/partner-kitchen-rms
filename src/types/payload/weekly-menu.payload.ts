export type WeeklyMenuPayload = {
  _id: string
  week_label: string
  start_date: string
  end_date: string
  menu_items: string
  finalize: boolean
  status?: string
}
