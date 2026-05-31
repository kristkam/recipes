import type { RecipeDraft, RecipeWizardStep } from '@/types/recipe'

export type RecipeDraftErrors = Partial<{
  title: string
  prepTimeMinutes: string
  portions: string
  ingredients: string
  instructions: string
}>

const MIN_PORTIONS = 1
const MAX_PORTIONS = 20

function hasValidIngredient(draft: RecipeDraft): boolean {
  return draft.ingredients.some(
    (ingredient) =>
      ingredient.name.trim() &&
      ingredient.unit.trim() &&
      Number.parseFloat(ingredient.amount) > 0,
  )
}

function hasValidInstructions(draft: RecipeDraft): boolean {
  return draft.instructions.some((step) => step.trim().length > 0)
}

export function validateBasicsStep(draft: RecipeDraft): RecipeDraftErrors {
  const errors: RecipeDraftErrors = {}

  if (!draft.title.trim()) {
    errors.title = 'Recipe name is required.'
  }

  const prepTimeRaw = String(draft.prepTimeMinutes).trim()
  const prepTime = Number.parseInt(prepTimeRaw, 10)
  if (!prepTimeRaw || Number.isNaN(prepTime) || prepTime <= 0) {
    errors.prepTimeMinutes = 'Enter a cooking time greater than 0 minutes.'
  }

  if (draft.portions < MIN_PORTIONS || draft.portions > MAX_PORTIONS) {
    errors.portions = `Portions must be between ${MIN_PORTIONS} and ${MAX_PORTIONS}.`
  }

  return errors
}

export function validateIngredientsStep(draft: RecipeDraft): RecipeDraftErrors {
  if (hasValidIngredient(draft)) {
    return {}
  }

  return {
    ingredients: 'Add at least one ingredient with name, amount, and unit.',
  }
}

export function validateInstructionsStep(draft: RecipeDraft): RecipeDraftErrors {
  if (hasValidInstructions(draft)) {
    return {}
  }

  return {
    instructions: 'Add at least one instruction step.',
  }
}

export function validateReviewStep(draft: RecipeDraft): RecipeDraftErrors {
  return {
    ...validateBasicsStep(draft),
    ...validateIngredientsStep(draft),
    ...validateInstructionsStep(draft),
  }
}

export function validateWizardStep(step: RecipeWizardStep, draft: RecipeDraft): RecipeDraftErrors {
  switch (step) {
    case 'basics':
      return validateBasicsStep(draft)
    case 'ingredients':
      return validateIngredientsStep(draft)
    case 'instructions':
      return validateInstructionsStep(draft)
    case 'review':
      return validateReviewStep(draft)
  }
}

export function hasValidationErrors(errors: RecipeDraftErrors): boolean {
  return Object.keys(errors).length > 0
}
