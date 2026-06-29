import { beforeEach, describe, expect, it } from 'vitest'

import { PORTION_LIMITS } from '@/constants/recipe'
import {
  addRecipe,
  initialRecipesState,
  recipesReducer,
  updateRecipe,
} from '@/state/recipes-reducer'
import type { RecipeInput } from '@/types/recipe'

describe('recipes state', () => {
  let state = initialRecipesState

  beforeEach(() => {
    state = initialRecipesState
  })

  it('updates an existing recipe while preserving id and thumbnail', () => {
    const existing = state.recipes.find((recipe) => recipe.id === 'creamy-mushroom-pasta')

    expect(existing).toBeDefined()

    const input: RecipeInput = {
      title: 'Updated Mushroom Pasta',
      prepTimeMinutes: 30,
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      ingredients: [{ name: 'Pasta', amount: 500, unit: 'g' }],
      instructions: ['Cook pasta until al dente.'],
    }

    const result = updateRecipe(state, 'creamy-mushroom-pasta', input)

    expect(result.recipe).toEqual({
      id: 'creamy-mushroom-pasta',
      title: 'Updated Mushroom Pasta',
      prepTimeMinutes: 30,
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      thumbnail: existing!.thumbnail,
      ingredients: [{ name: 'Pasta', amount: 500, unit: 'g' }],
      instructions: ['Cook pasta until al dente.'],
    })
    expect(
      result.state.recipes.find((recipe) => recipe.id === 'creamy-mushroom-pasta')?.title,
    ).toBe('Updated Mushroom Pasta')
  })

  it('returns undefined when updating a missing recipe', () => {
    const result = updateRecipe(state, 'missing-recipe', {
      title: 'Ghost Recipe',
      prepTimeMinutes: 10,
      portions: 2,
      tags: [],
      ingredients: [{ name: 'Salt', amount: 1, unit: 'pinch' }],
      instructions: ['Season to taste.'],
    })

    expect(result.recipe).toBeUndefined()
  })

  it('clears portion overrides when base portions change on update', () => {
    const existing = state.recipes.find((recipe) => recipe.id === 'creamy-mushroom-pasta')

    expect(existing).toBeDefined()

    state = recipesReducer(state, {
      type: 'setPortions',
      recipeId: 'creamy-mushroom-pasta',
      portions: 5,
    })

    expect(state.portionOverrides['creamy-mushroom-pasta']).toBe(5)

    const result = updateRecipe(state, 'creamy-mushroom-pasta', {
      title: existing!.title,
      prepTimeMinutes: existing!.prepTimeMinutes,
      portions: 6,
      tags: existing!.tags,
      ingredients: existing!.ingredients,
      instructions: existing!.instructions,
    })

    expect(result.state.portionOverrides['creamy-mushroom-pasta']).toBeUndefined()
    expect(result.recipe?.portions).toBe(6)
  })

  it('clamps portion overrides to the shared bounds', () => {
    state = recipesReducer(state, {
      type: 'setPortions',
      recipeId: 'creamy-mushroom-pasta',
      portions: PORTION_LIMITS.max + 1,
    })

    expect(state.portionOverrides['creamy-mushroom-pasta']).toBe(PORTION_LIMITS.max)

    state = recipesReducer(state, {
      type: 'setPortions',
      recipeId: 'creamy-mushroom-pasta',
      portions: PORTION_LIMITS.min - 1,
    })

    expect(state.portionOverrides['creamy-mushroom-pasta']).toBe(PORTION_LIMITS.min)
  })

  it('adds a recipe with a generated id', () => {
    const result = addRecipe(state, {
      title: 'Weeknight Lentil Bowl',
      prepTimeMinutes: 20,
      portions: 4,
      tags: ['Vegetarian'],
      ingredients: [{ name: 'Red lentils', amount: 200, unit: 'g' }],
      instructions: ['Simmer lentils until tender.'],
    })

    expect(result.recipe.id).toBe('weeknight-lentil-bowl')
    expect(result.state.recipes).toHaveLength(state.recipes.length + 1)
  })
})
