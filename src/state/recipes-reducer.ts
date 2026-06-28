import type { Recipe, RecipeId, RecipeInput } from '@/types/recipe'
import { mockRecipes } from '@/data/recipes'
import { applyRecipeUpdate, buildRecipeFromInput } from '@/utils/recipeCreate'

const MIN_PORTIONS = 1
const MAX_PORTIONS = 20

export type RecipesState = {
  recipes: Recipe[]
  searchQuery: string
  portionOverrides: Record<RecipeId, number>
}

export type RecipesAction =
  | { type: 'setSearchQuery'; query: string }
  | { type: 'setPortions'; recipeId: RecipeId; portions: number }
  | { type: 'incrementPortions'; recipeId: RecipeId }
  | { type: 'decrementPortions'; recipeId: RecipeId }
  | { type: 'addRecipe'; input: RecipeInput }
  | { type: 'updateRecipe'; recipeId: RecipeId; input: RecipeInput }

export const initialRecipesState: RecipesState = {
  recipes: [...mockRecipes],
  searchQuery: '',
  portionOverrides: {},
}

function clampPortions(portions: number): number {
  return Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, portions))
}

function getRecipeById(recipes: Recipe[], id: RecipeId): Recipe | undefined {
  return recipes.find((recipe) => recipe.id === id)
}

export function recipesReducer(state: RecipesState, action: RecipesAction): RecipesState {
  switch (action.type) {
    case 'setSearchQuery':
      return { ...state, searchQuery: action.query }

    case 'setPortions':
      return {
        ...state,
        portionOverrides: {
          ...state.portionOverrides,
          [action.recipeId]: clampPortions(action.portions),
        },
      }

    case 'incrementPortions': {
      const recipe = getRecipeById(state.recipes, action.recipeId)
      if (!recipe) return state
      const current = state.portionOverrides[action.recipeId] ?? recipe.portions
      return recipesReducer(state, {
        type: 'setPortions',
        recipeId: action.recipeId,
        portions: current + 1,
      })
    }

    case 'decrementPortions': {
      const recipe = getRecipeById(state.recipes, action.recipeId)
      if (!recipe) return state
      const current = state.portionOverrides[action.recipeId] ?? recipe.portions
      return recipesReducer(state, {
        type: 'setPortions',
        recipeId: action.recipeId,
        portions: current - 1,
      })
    }

    case 'addRecipe': {
      const recipe = buildRecipeFromInput(
        action.input,
        state.recipes.map((item) => item.id),
      )
      return { ...state, recipes: [...state.recipes, recipe] }
    }

    case 'updateRecipe': {
      const index = state.recipes.findIndex((recipe) => recipe.id === action.recipeId)
      if (index === -1) return state

      const existing = state.recipes[index]!
      const updated = applyRecipeUpdate(existing, action.input)
      const recipes = state.recipes.map((recipe, recipeIndex) =>
        recipeIndex === index ? updated : recipe,
      )

      let portionOverrides = state.portionOverrides
      if (existing.portions !== updated.portions && state.portionOverrides[action.recipeId] !== undefined) {
        const nextOverrides = { ...state.portionOverrides }
        delete nextOverrides[action.recipeId]
        portionOverrides = nextOverrides
      }

      return { ...state, recipes, portionOverrides }
    }
  }
}

export function getFilteredRecipes(state: RecipesState): Recipe[] {
  const query = state.searchQuery.trim().toLowerCase()
  if (!query) return state.recipes

  return state.recipes.filter((recipe) => {
    const haystack = [
      recipe.title,
      ...recipe.tags,
      ...recipe.ingredients.map((ingredient) => ingredient.name),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(query)
  })
}

export function getPortionsForRecipe(state: RecipesState, recipe: Recipe): number {
  return state.portionOverrides[recipe.id] ?? recipe.portions
}

export function addRecipe(state: RecipesState, input: RecipeInput): { state: RecipesState; recipe: Recipe } {
  const recipe = buildRecipeFromInput(input, state.recipes.map((item) => item.id))
  return {
    state: { ...state, recipes: [...state.recipes, recipe] },
    recipe,
  }
}

export function updateRecipe(
  state: RecipesState,
  recipeId: RecipeId,
  input: RecipeInput,
): { state: RecipesState; recipe: Recipe | undefined } {
  const nextState = recipesReducer(state, { type: 'updateRecipe', recipeId, input })
  if (nextState === state) {
    return { state, recipe: undefined }
  }
  return { state: nextState, recipe: getRecipeById(nextState.recipes, recipeId) }
}
