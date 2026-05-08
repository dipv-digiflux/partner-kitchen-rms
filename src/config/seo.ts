import { appRoutes } from "@/lib/utils/routes";

export const seoConfig = {
  siteName: "Molt Kitchen RMS",
  defaultTitle: "Molt Kitchen RMS",
  defaultDescription: "Kitchen operations workspace for recipes, menus, production, and vendor reporting.",
  routeMeta: [
    { path: appRoutes.home, title: "Dashboard" },
    { path: appRoutes.login, title: "Login" },
    { path: appRoutes.user, title: "Users" },
    { path: appRoutes.recipe, title: "Recipes" },
    { path: appRoutes.recipeForm, title: "Add Recipe" },
    { path: appRoutes.weeklyMenu, title: "Weekly Menus" },
    { path: appRoutes.weeklyMenuForm, title: "Add Weekly Menu" },
    { path: appRoutes.category, title: "Categories" },
    { path: appRoutes.ingredient, title: "Ingredients" },
    { path: appRoutes.dishtype, title: "Dish Types" },
    { path: appRoutes.cuisine, title: "Cuisines" },
    { path: appRoutes.packagingMaterial, title: "Packaging Materials" },
    { path: appRoutes.variant, title: "Variants" },
    { path: appRoutes.variantForm, title: "Add Variant" },
    { path: appRoutes.allergens, title: "Allergens" },
    { path: appRoutes.barcodePlace, title: "Barcode Places" },
    { path: appRoutes.vendorDashboard, title: "Vendor Dashboard" },
    { path: appRoutes.productionReportSummary, title: "Production Summary Report" },
    { path: appRoutes.productionReportList, title: "Production List Report" },
    { path: appRoutes.recipeRatings, title: "Recipe Ratings" },
  ],
} as const;
