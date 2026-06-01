import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useRecipesStore } from '@/stores/recipes'
import type { RecipeInput } from '@/types/recipe'

describe('recipes store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('updates an existing recipe while preserving id and thumbnail', () => {
    const store = useRecipesStore()
    const existing = store.getRecipeById('creamy-mushroom-pasta')

    expect(existing).toBeDefined()

    const input: RecipeInput = {
      title: 'Updated Mushroom Pasta',
      prepTimeMinutes: 30,
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      ingredients: [{ name: 'Pasta', amount: 500, unit: 'g' }],
      instructions: ['Cook pasta until al dente.'],
    }

    const updated = store.updateRecipe('creamy-mushroom-pasta', input)

    expect(updated).toEqual({
      id: 'creamy-mushroom-pasta',
      title: 'Updated Mushroom Pasta',
      prepTimeMinutes: 30,
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      thumbnail: existing!.thumbnail,
      ingredients: [{ name: 'Pasta', amount: 500, unit: 'g' }],
      instructions: ['Cook pasta until al dente.'],
    })
    expect(store.getRecipeById('creamy-mushroom-pasta')?.title).toBe('Updated Mushroom Pasta')
  })

  it('returns undefined when updating a missing recipe', () => {
    const store = useRecipesStore()

    const result = store.updateRecipe('missing-recipe', {
      title: 'Ghost Recipe',
      prepTimeMinutes: 10,
      portions: 2,
      tags: [],
      ingredients: [{ name: 'Salt', amount: 1, unit: 'pinch' }],
      instructions: ['Season to taste.'],
    })

    expect(result).toBeUndefined()
  })

  it('clears portion overrides when base portions change on update', () => {
    const store = useRecipesStore()
    const existing = store.getRecipeById('creamy-mushroom-pasta')

    expect(existing).toBeDefined()

    store.setPortions('creamy-mushroom-pasta', 5)
    expect(store.getPortionsForRecipe(existing!)).toBe(5)

    store.updateRecipe('creamy-mushroom-pasta', {
      title: existing!.title,
      prepTimeMinutes: existing!.prepTimeMinutes,
      portions: 6,
      tags: existing!.tags,
      ingredients: existing!.ingredients,
      instructions: existing!.instructions,
    })

    expect(store.getPortionsForRecipe(store.getRecipeById('creamy-mushroom-pasta')!)).toBe(6)
  })
})
