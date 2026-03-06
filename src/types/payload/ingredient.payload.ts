export type IngredientPayload = {
  _id: string
  ingredientName: string
  categories: {
    categoryId: string
  }[]
}
