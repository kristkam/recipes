import { RecipeFormSection } from '@/components/RecipeFormSection'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

import '@/styles/recipe-form.css'
import './RecipeInstructionsSection.css'

type RecipeInstructionsSectionProps = {
  instructions: string[]
  errors?: RecipeDraftErrors
  onInstructionsChange: (instructions: string[]) => void
}

export function RecipeInstructionsSection({
  instructions,
  errors,
  onInstructionsChange,
}: RecipeInstructionsSectionProps): React.ReactElement {
  function addStep(): void {
    onInstructionsChange([...instructions, ''])
  }

  function removeStep(index: number): void {
    if (instructions.length === 1) {
      onInstructionsChange([''])
      return
    }
    onInstructionsChange(instructions.filter((_, itemIndex) => itemIndex !== index))
  }

  function updateStep(index: number, value: string): void {
    onInstructionsChange(
      instructions.map((step, itemIndex) => (itemIndex === index ? value : step)),
    )
  }

  return (
    <RecipeFormSection heading="Instructions">
      {errors?.instructions ? (
        <p className="recipe-form-field__error recipe-instructions__error">{errors.instructions}</p>
      ) : null}

      <ol className="recipe-instructions__list">
        {instructions.map((step, index) => (
          <li key={index} className="recipe-instructions__row">
            <div className="recipe-instructions__header">
              <span className="recipe-instructions__label">Step {index + 1}</span>
              <button
                type="button"
                className="recipe-form-link-btn recipe-form-link-btn--danger recipe-instructions__remove"
                aria-label={`Remove step ${index + 1}`}
                onClick={() => removeStep(index)}
              >
                Remove
              </button>
            </div>
            <textarea
              value={step}
              onChange={(event) => updateStep(index, event.target.value)}
              className="recipe-form-field__textarea recipe-instructions__textarea"
              rows={2}
              aria-label={`Instruction step ${index + 1}`}
              placeholder="Describe this step"
            />
          </li>
        ))}
      </ol>

      <div className="recipe-form-row-actions">
        <button type="button" className="recipe-form-link-btn" onClick={addStep}>
          + Add step
        </button>
      </div>
    </RecipeFormSection>
  )
}
