export type PackagingMaterialItem = {
  materialId?: string
  labelTitle?: string
  labelInstruction?: string
}

export type VariantItem = {
  typeOfVariant?: string
  chefsChoice?: boolean
  sizeAvailable?: string
  price?: number
  kcal?: number
  protein?: number
  carb?: number
  fat?: number
  dietType?: string
  component1?: string
  gram1?: number
  component2?: string
  gram2?: number
  component3?: string
  gram3?: number
  component4?: string
  gram4?: number
  component5?: string
  gram5?: number
  component6?: string
  gram6?: number
  component7?: string
  gram7?: number
  component8?: string
  gram8?: number
  component9?: string
  gram9?: number
}

export type RecipePayload = {
  _id: string

  // Top Section
  categoryId: string
  nddMp: string
  menuForDays: string[]

  // Details
  dishName: string
  description: string
  dishTypeId: string
  cuisineId: string
  /** PRD: recipe photo (vendor uploads). Backend field name may vary. */
  photoUrl?: string
  /** PRD: calories range (kcal). Can be derived from variants; kept for compatibility. */
  caloriesKcalMin?: number
  caloriesKcalMax?: number
  /** PRD: allowed discount percentage per meal. */
  allowedDiscountPercentage?: number

  // Ingredients
  ingredientsFixed: string[]
  ingredientsRemovable: string[]

  // Allergens
  allergensContains: string[]
  allergensFreeFrom: string[]

  // Prep & Preference
  instructionOnLabel: string
  expirationDays: number | string
  mealPreference: number | string
  complexity: string

  // Packaging
  packagingMaterials: PackagingMaterialItem[]
  platingSummary: string

  // Photos
  websitePhotos: string[]
  internalPhotos: string[]

  // Variants
  variants: VariantItem[]

  // Status/Other
  status?: string
  /** PRD: Save as draft vs finalize. */
  finalize?: boolean
}
