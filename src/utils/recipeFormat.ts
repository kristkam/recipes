import type { Ingredient } from '@/types/recipe'

export function formatPrepTime(minutes: number): string {
  return `${minutes} min`
}

export function formatTags(tags: string[]): string {
  return tags.join(', ')
}

export function formatRecipeMeta(
  prepTimeMinutes: number,
  portions: number,
  tags: string[],
): string {
  const parts = [formatPrepTime(prepTimeMinutes), `${portions} portions`]
  if (tags.length > 0) {
    parts.push(formatTags(tags))
  }
  return parts.join(' • ')
}

export function formatRecipeMetaShort(prepTimeMinutes: number, tags: string[]): string {
  const parts = [formatPrepTime(prepTimeMinutes)]
  if (tags.length > 0) {
    parts.push(formatTags(tags))
  }
  return parts.join(' • ')
}

export function scaleIngredientAmount(amount: number, basePortions: number, targetPortions: number): number {
  if (basePortions <= 0 || targetPortions <= 0) {
    return amount
  }
  const scaled = (amount * targetPortions) / basePortions
  return Math.round(scaled * 10) / 10
}

export function formatIngredientAmount(amount: number, unit: string): string {
  const displayAmount = Number.isInteger(amount) ? String(amount) : amount.toFixed(1)
  return `${displayAmount} ${unit}`
}

export function scaleIngredient(
  ingredient: Ingredient,
  basePortions: number,
  targetPortions: number,
): Ingredient {
  return {
    ...ingredient,
    amount: scaleIngredientAmount(ingredient.amount, basePortions, targetPortions),
  }
}
