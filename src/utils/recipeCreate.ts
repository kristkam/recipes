import type { Recipe, RecipeDraft, RecipeId, RecipeInput, RecipeThumbnail } from '@/types/recipe'

const DEFAULT_THUMBNAILS: RecipeThumbnail[] = [
  {
    background: 'linear-gradient(145deg, #d9cdb8 0%, #8a7358 55%, #5c4a38 100%)',
    emoji: '',
  },
  {
    background: 'linear-gradient(145deg, #f0c4a0 0%, #d4783a 50%, #a84e20 100%)',
    emoji: '',
  },
  {
    background: 'linear-gradient(145deg, #e8b4d4 0%, #c76b9a 50%, #8e4570 100%)',
    emoji: '',
  },
  {
    background: 'linear-gradient(145deg, #f0d4a8 0%, #c87840 50%, #8b4020 100%)',
    emoji: '',
  },
  {
    background: 'linear-gradient(145deg, #c8d8c0 0%, #7a9a72 50%, #4a6844 100%)',
    emoji: '',
  },
]

export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function createUniqueRecipeId(title: string, existingIds: readonly RecipeId[]): RecipeId {
  const base = slugifyTitle(title) || 'recipe'
  const taken = new Set(existingIds)

  if (!taken.has(base)) {
    return base
  }

  let suffix = 2
  while (taken.has(`${base}-${suffix}`)) {
    suffix += 1
  }
  return `${base}-${suffix}`
}

export function normalizeTags(tags: readonly string[]): string[] {
  const seen = new Set<string>()
  const normalized: string[] = []

  for (const tag of tags) {
    const trimmed = tag.trim()
    if (!trimmed) continue

    const key = trimmed.toLowerCase()
    if (seen.has(key)) continue

    seen.add(key)
    normalized.push(trimmed)
  }

  return normalized
}

export function parseTagsInput(input: string): string[] {
  return normalizeTags(input.split(','))
}

export function createDefaultThumbnail(seed: string): RecipeThumbnail {
  let hash = 0
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash + seed.charCodeAt(index)) % DEFAULT_THUMBNAILS.length
  }
  return DEFAULT_THUMBNAILS[hash] ?? DEFAULT_THUMBNAILS[0]!
}

export function createEmptyIngredientDraft(): RecipeDraft['ingredients'][number] {
  return { name: '', amount: '', unit: '' }
}

export function createEmptyRecipeDraft(): RecipeDraft {
  return {
    title: '',
    prepTimeMinutes: '',
    portions: 4,
    tags: [],
    ingredients: [createEmptyIngredientDraft()],
    instructions: [''],
  }
}

export function recipeToDraft(recipe: Recipe): RecipeDraft {
  return {
    title: recipe.title,
    prepTimeMinutes: String(recipe.prepTimeMinutes),
    portions: recipe.portions,
    tags: [...recipe.tags],
    ingredients:
      recipe.ingredients.length > 0
        ? recipe.ingredients.map((ingredient) => ({
            name: ingredient.name,
            amount: String(ingredient.amount),
            unit: ingredient.unit,
          }))
        : [createEmptyIngredientDraft()],
    instructions: recipe.instructions.length > 0 ? [...recipe.instructions] : [''],
  }
}

export function applyRecipeUpdate(recipe: Recipe, input: RecipeInput): Recipe {
  return {
    ...recipe,
    title: input.title,
    prepTimeMinutes: input.prepTimeMinutes,
    portions: input.portions,
    tags: normalizeTags(input.tags),
    ingredients: input.ingredients,
    instructions: input.instructions,
  }
}

export function draftToRecipeInput(draft: RecipeDraft): RecipeInput {
  return {
    title: draft.title.trim(),
    prepTimeMinutes: Number.parseInt(String(draft.prepTimeMinutes).trim(), 10),
    portions: draft.portions,
    tags: normalizeTags(draft.tags),
    ingredients: draft.ingredients
      .filter((ingredient) => ingredient.name.trim())
      .map((ingredient) => ({
        name: ingredient.name.trim(),
        amount: Number.parseFloat(ingredient.amount),
        unit: ingredient.unit.trim(),
      })),
    instructions: draft.instructions.map((step) => step.trim()).filter(Boolean),
  }
}

export function buildRecipeFromInput(input: RecipeInput, existingIds: readonly RecipeId[]): Recipe {
  return {
    id: createUniqueRecipeId(input.title, existingIds),
    title: input.title,
    prepTimeMinutes: input.prepTimeMinutes,
    portions: input.portions,
    tags: normalizeTags(input.tags),
    thumbnail: createDefaultThumbnail(input.title),
    ingredients: input.ingredients,
    instructions: input.instructions,
  }
}
