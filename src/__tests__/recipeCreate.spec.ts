import { describe, expect, it } from 'vitest'

import {
  createUniqueRecipeId,
  draftToRecipeInput,
  normalizeTags,
  slugifyTitle,
} from '@/utils/recipeCreate'
import type { RecipeDraft } from '@/types/recipe'

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
})
