import { describe, expect, it } from 'vitest'

import {
  applyRecipeUpdate,
  createUniqueRecipeId,
  draftToRecipeInput,
  normalizeTags,
  recipeToDraft,
  slugifyTitle,
} from '@/utils/recipeCreate'
import type { Recipe, RecipeDraft } from '@/types/recipe'

describe('recipeCreate', () => {
  it('slugifies titles into stable ids', () => {
    expect(slugifyTitle('Creamy Mushroom Pasta')).toBe('creamy-mushroom-pasta')
    expect(createUniqueRecipeId('Creamy Mushroom Pasta', ['creamy-mushroom-pasta'])).toBe(
      'creamy-mushroom-pasta-2',
    )
  })

  it('normalizes tags by trimming and deduplicating case-insensitively', () => {
    expect(normalizeTags([' Vegetarian ', 'vegetarian', 'Quick', ''])).toEqual([
      'Vegetarian',
      'Quick',
    ])
  })

  it('converts a draft into a recipe input payload', () => {
    const draft: RecipeDraft = {
      title: ' Test Salad ',
      prepTimeMinutes: '15',
      portions: 2,
      tags: ['Vegetarian', 'Quick'],
      ingredients: [
        { name: ' Lettuce ', amount: '200', unit: ' g ' },
        { name: '', amount: '', unit: '' },
      ],
      instructions: [' Wash lettuce ', ''],
    }

    expect(draftToRecipeInput(draft)).toEqual({
      title: 'Test Salad',
      prepTimeMinutes: 15,
      portions: 2,
      tags: ['Vegetarian', 'Quick'],
      ingredients: [{ name: 'Lettuce', amount: 200, unit: 'g' }],
      instructions: ['Wash lettuce'],
    })
  })

  it('converts a recipe into a draft for editing', () => {
    const recipe: Recipe = {
      id: 'creamy-mushroom-pasta',
      title: 'Creamy Mushroom Pasta',
      prepTimeMinutes: 25,
      portions: 4,
      tags: ['Vegetarian'],
      thumbnail: {
        background: 'linear-gradient(145deg, #d9cdb8 0%, #8a7358 55%, #5c4a38 100%)',
        emoji: '',
      },
      ingredients: [{ name: 'Pasta', amount: 400, unit: 'g' }],
      instructions: ['Cook the pasta.'],
    }

    expect(recipeToDraft(recipe)).toEqual({
      title: 'Creamy Mushroom Pasta',
      prepTimeMinutes: '25',
      portions: 4,
      tags: ['Vegetarian'],
      ingredients: [{ name: 'Pasta', amount: '400', unit: 'g' }],
      instructions: ['Cook the pasta.'],
    })
  })

  it('applies input to an existing recipe while preserving identity fields', () => {
    const recipe: Recipe = {
      id: 'creamy-mushroom-pasta',
      title: 'Creamy Mushroom Pasta',
      prepTimeMinutes: 25,
      portions: 4,
      tags: ['Vegetarian'],
      thumbnail: {
        background: 'linear-gradient(145deg, #d9cdb8 0%, #8a7358 55%, #5c4a38 100%)',
        emoji: '',
      },
      ingredients: [{ name: 'Pasta', amount: 400, unit: 'g' }],
      instructions: ['Cook the pasta.'],
    }

    const input = draftToRecipeInput({
      title: 'Mushroom Pasta Deluxe',
      prepTimeMinutes: '30',
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      ingredients: [{ name: 'Pasta', amount: '600', unit: 'g' }],
      instructions: ['Cook the pasta until al dente.'],
    })

    expect(applyRecipeUpdate(recipe, input)).toEqual({
      id: 'creamy-mushroom-pasta',
      title: 'Mushroom Pasta Deluxe',
      prepTimeMinutes: 30,
      portions: 6,
      tags: ['Vegetarian', 'Quick'],
      thumbnail: recipe.thumbnail,
      ingredients: [{ name: 'Pasta', amount: 600, unit: 'g' }],
      instructions: ['Cook the pasta until al dente.'],
    })
  })
})
