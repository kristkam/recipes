import { describe, expect, it } from 'vitest'

import { PORTION_LIMITS } from '@/constants/recipe'
import type { RecipeDraft } from '@/types/recipe'
import {
  hasValidationErrors,
  validateBasicsStep,
  validateIngredientsStep,
  validateInstructionsStep,
  validateReviewStep,
} from '@/utils/recipeValidation'

const validDraft: RecipeDraft = {
  title: 'Test Salad',
  prepTimeMinutes: '15',
  portions: 4,
  tags: ['Vegetarian'],
  ingredients: [{ name: 'Lettuce', amount: '200', unit: 'g' }],
  instructions: ['Wash the lettuce.'],
}

describe('recipeValidation', () => {
  it('requires basics fields', () => {
    const errors = validateBasicsStep({
      ...validDraft,
      title: '',
      prepTimeMinutes: '0',
    })

    expect(errors.title).toBeTruthy()
    expect(errors.prepTimeMinutes).toBeTruthy()
  })

  it('requires portions within the shared bounds', () => {
    expect(validateBasicsStep({ ...validDraft, portions: PORTION_LIMITS.min - 1 }).portions).toBe(
      `Portions must be between ${PORTION_LIMITS.min} and ${PORTION_LIMITS.max}.`,
    )
    expect(validateBasicsStep({ ...validDraft, portions: PORTION_LIMITS.max + 1 }).portions).toBe(
      `Portions must be between ${PORTION_LIMITS.min} and ${PORTION_LIMITS.max}.`,
    )
  })

  it('requires at least one valid ingredient', () => {
    expect(validateIngredientsStep(validDraft)).toEqual({})
    expect(
      validateIngredientsStep({ ...validDraft, ingredients: [{ name: '', amount: '', unit: '' }] })
        .ingredients,
    ).toBeTruthy()
  })

  it('requires at least one instruction', () => {
    expect(validateInstructionsStep(validDraft)).toEqual({})
    expect(validateInstructionsStep({ ...validDraft, instructions: [''] }).instructions).toBeTruthy()
  })

  it('validates the full review step', () => {
    expect(hasValidationErrors(validateReviewStep(validDraft))).toBe(false)
    expect(hasValidationErrors(validateReviewStep({ ...validDraft, title: '' }))).toBe(true)
  })
})
