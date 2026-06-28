import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { RecipeBasicsSection } from '@/components/RecipeBasicsSection'
import { RecipeIngredientsSection } from '@/components/RecipeIngredientsSection'
import { RecipeInstructionsSection } from '@/components/RecipeInstructionsSection'
import { RecipeReviewSection } from '@/components/RecipeReviewSection'
import { RecipeTagsSection } from '@/components/RecipeTagsSection'
import { RecipeWizardSteps } from '@/components/RecipeWizardSteps'
import { useRecipes } from '@/state/recipes-context'
import type { RecipeDraft, RecipeId, RecipeWizardStep } from '@/types/recipe'
import { RECIPE_WIZARD_STEPS } from '@/types/recipe'
import {
  createEmptyRecipeDraft,
  draftToRecipeInput,
  recipeToDraft,
} from '@/utils/recipeCreate'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'
import {
  hasValidationErrors,
  validateWizardStep,
} from '@/utils/recipeValidation'

import '@/styles/recipe-form.css'
import './RecipeWizard.css'

type RecipeWizardProps = {
  mode: 'create' | 'edit'
  recipeId?: RecipeId
  title: string
  cancelDestination: string
  cancelParams?: { recipeId: RecipeId }
}

export function RecipeWizard({
  mode,
  recipeId,
  title,
  cancelDestination,
  cancelParams,
}: RecipeWizardProps): React.ReactElement {
  const navigate = useNavigate()
  const { getRecipeById, addRecipe, updateRecipe } = useRecipes()

  const recipe = recipeId ? getRecipeById(recipeId) : undefined
  const [draft, setDraft] = useState<RecipeDraft>(createEmptyRecipeDraft())
  const [currentStep, setCurrentStep] = useState<RecipeWizardStep>('basics')
  const [errors, setErrors] = useState<RecipeDraftErrors>({})
  const [draftHydrated, setDraftHydrated] = useState(mode === 'create')

  useEffect(() => {
    if (mode !== 'edit' || !recipe || draftHydrated) {
      return
    }
    setDraft(recipeToDraft(recipe))
    setDraftHydrated(true)
  }, [mode, recipe, draftHydrated])

  useEffect(() => {
    setErrors({})
  }, [currentStep])

  const currentStepIndex = RECIPE_WIZARD_STEPS.indexOf(currentStep)
  const isFirstStep = currentStep === 'basics'
  const isLastStep = currentStep === 'review'

  function goToCancel(): void {
    if (cancelParams) {
      void navigate({ to: cancelDestination, params: cancelParams })
      return
    }
    void navigate({ to: cancelDestination })
  }

  function goBack(): void {
    if (isFirstStep) {
      goToCancel()
      return
    }
    setCurrentStep(RECIPE_WIZARD_STEPS[currentStepIndex - 1] ?? 'basics')
    setErrors({})
  }

  function goNext(): void {
    const stepErrors = validateWizardStep(currentStep, draft)
    setErrors(stepErrors)

    if (hasValidationErrors(stepErrors)) {
      return
    }

    if (isLastStep) {
      saveRecipe()
      return
    }

    setCurrentStep(RECIPE_WIZARD_STEPS[currentStepIndex + 1] ?? 'review')
    setErrors({})
  }

  function saveRecipe(): void {
    const stepErrors = validateWizardStep('review', draft)
    setErrors(stepErrors)

    if (hasValidationErrors(stepErrors)) {
      return
    }

    const input = draftToRecipeInput(draft)

    if (mode === 'create') {
      const created = addRecipe(input)
      void navigate({ to: '/recipes/$recipeId', params: { recipeId: created.id } })
      return
    }

    if (!recipeId) return

    const updated = updateRecipe(recipeId, input)
    if (!updated) return

    void navigate({ to: '/recipes/$recipeId', params: { recipeId: updated.id } })
  }

  if (mode === 'edit' && !recipe) {
    return (
      <div className="recipe-wizard recipe-wizard--missing">
        <p>Recipe not found.</p>
        <button type="button" className="recipe-wizard__link" onClick={() => void navigate({ to: '/' })}>
          Back to recipes
        </button>
      </div>
    )
  }

  if (mode === 'edit' && !draftHydrated) {
    return (
      <div className="recipe-wizard recipe-wizard--loading">
        <p>Loading recipe…</p>
      </div>
    )
  }

  return (
    <div className="recipe-wizard">
      <header className="recipe-wizard__header">
        <button type="button" className="recipe-wizard__back" onClick={goBack}>
          {isFirstStep ? 'Cancel' : 'Back'}
        </button>
        <h1 className="recipe-wizard__title">{title}</h1>
        <span className="recipe-wizard__spacer" aria-hidden="true" />
      </header>

      <RecipeWizardSteps currentStep={currentStep} onStepChange={setCurrentStep} />

      <div className="recipe-wizard__content">
        {currentStep === 'basics' ? (
          <RecipeBasicsSection draft={draft} errors={errors} onDraftChange={setDraft} />
        ) : null}

        {currentStep === 'ingredients' ? (
          <RecipeIngredientsSection
            ingredients={draft.ingredients}
            errors={errors}
            onIngredientsChange={(ingredients) => setDraft({ ...draft, ingredients })}
          />
        ) : null}

        {currentStep === 'instructions' ? (
          <RecipeInstructionsSection
            instructions={draft.instructions}
            errors={errors}
            onInstructionsChange={(instructions) => setDraft({ ...draft, instructions })}
          />
        ) : null}

        {currentStep === 'review' ? (
          <>
            <RecipeTagsSection
              tags={draft.tags}
              onTagsChange={(tags) => setDraft({ ...draft, tags })}
            />
            <RecipeReviewSection draft={draft} />
          </>
        ) : null}
      </div>

      <div className="recipe-form-actions recipe-wizard__actions">
        <button type="button" className="recipe-form-btn recipe-form-btn--primary" onClick={goNext}>
          {isLastStep ? 'Save Recipe' : 'Next'}
        </button>
        {!isFirstStep ? (
          <button
            type="button"
            className="recipe-form-btn recipe-form-btn--secondary"
            onClick={goBack}
          >
            Back
          </button>
        ) : (
          <button
            type="button"
            className="recipe-form-btn recipe-form-btn--secondary"
            onClick={goToCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
