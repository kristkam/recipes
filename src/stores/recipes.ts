import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { mockRecipes } from '@/data/recipes'
import type { Recipe, RecipeId, RecipeInput } from '@/types/recipe'
import { buildRecipeFromInput } from '@/utils/recipeCreate'

const MIN_PORTIONS = 1
const MAX_PORTIONS = 20

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([...mockRecipes])
  const searchQuery = ref('')
  const portionOverrides = ref<Record<RecipeId, number>>({})

  const filteredRecipes = computed((): Recipe[] => {
    const query = searchQuery.value.trim().toLowerCase()
    if (!query) {
      return recipes.value
    }
    return recipes.value.filter((recipe) => {
      const haystack = [
        recipe.title,
        ...recipe.tags,
        ...recipe.ingredients.map((i) => i.name),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  })

  function getRecipeById(id: RecipeId): Recipe | undefined {
    return recipes.value.find((recipe) => recipe.id === id)
  }

  function getPortionsForRecipe(recipe: Recipe): number {
    return portionOverrides.value[recipe.id] ?? recipe.portions
  }

  function setSearchQuery(query: string): void {
    searchQuery.value = query
  }

  function setPortions(recipeId: RecipeId, portions: number): void {
    const clamped = Math.min(MAX_PORTIONS, Math.max(MIN_PORTIONS, portions))
    portionOverrides.value = { ...portionOverrides.value, [recipeId]: clamped }
  }

  function incrementPortions(recipeId: RecipeId): void {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return
    const current = getPortionsForRecipe(recipe)
    setPortions(recipeId, current + 1)
  }

  function decrementPortions(recipeId: RecipeId): void {
    const recipe = getRecipeById(recipeId)
    if (!recipe) return
    const current = getPortionsForRecipe(recipe)
    setPortions(recipeId, current - 1)
  }

  function addRecipe(input: RecipeInput): Recipe {
    const recipe = buildRecipeFromInput(input, recipes.value.map((item) => item.id))
    recipes.value = [...recipes.value, recipe]
    return recipe
  }

  return {
    recipes,
    searchQuery,
    filteredRecipes,
    getRecipeById,
    getPortionsForRecipe,
    setSearchQuery,
    setPortions,
    incrementPortions,
    decrementPortions,
    addRecipe,
  }
})
