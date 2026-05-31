export type RecipeId = string

export type Ingredient = {
  name: string
  amount: number
  unit: string
}

export type RecipeThumbnail = {
  background: string
  emoji: string
}

export type Recipe = {
  id: RecipeId
  title: string
  prepTimeMinutes: number
  portions: number
  tags: string[]
  thumbnail: RecipeThumbnail
  ingredients: Ingredient[]
  instructions: string[]
}

export type RecipeSummary = Pick<
  Recipe,
  'id' | 'title' | 'prepTimeMinutes' | 'portions' | 'tags' | 'thumbnail'
>

export type RecipeInput = Pick<
  Recipe,
  'title' | 'prepTimeMinutes' | 'portions' | 'tags' | 'ingredients' | 'instructions'
>

export type IngredientDraft = {
  name: string
  amount: string
  unit: string
}

export type RecipeDraft = {
  title: string
  prepTimeMinutes: string
  portions: number
  tags: string[]
  ingredients: IngredientDraft[]
  instructions: string[]
}

export type RecipeWizardStep = 'basics' | 'ingredients' | 'instructions' | 'review'

export const RECIPE_WIZARD_STEPS: readonly RecipeWizardStep[] = [
  'basics',
  'ingredients',
  'instructions',
  'review',
] as const
