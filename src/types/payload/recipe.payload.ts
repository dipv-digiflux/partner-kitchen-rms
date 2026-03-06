export type RecipePayload = {
  _id: string
  recipe_name: string
  cuisine_type: string
  description: string
  photo: string
  calories_range: string
  meal_price: number
  macros_gms: string
  ingredients: string
  allergens_contained: string
  allowed_discount_percent: number
  multiple_portion_sizes: boolean
  finalize: boolean
  status?: string
}
