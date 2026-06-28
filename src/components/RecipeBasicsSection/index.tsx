import { PortionStepper } from '@/components/PortionStepper'
import { RecipeFormSection } from '@/components/RecipeFormSection'
import type { RecipeDraft } from '@/types/recipe'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

import '@/styles/recipe-form.css'

type RecipeBasicsSectionProps = {
  draft: RecipeDraft
  errors?: RecipeDraftErrors
  onDraftChange: (draft: RecipeDraft) => void
}

export function RecipeBasicsSection({
  draft,
  errors,
  onDraftChange,
}: RecipeBasicsSectionProps): React.ReactElement {
  return (
    <RecipeFormSection heading="Basics">
      <div className="recipe-form-field">
        <label className="recipe-form-field__label" htmlFor="recipe-title">
          Recipe name
        </label>
        <input
          id="recipe-title"
          value={draft.title}
          onChange={(event) => onDraftChange({ ...draft, title: event.target.value })}
          className="recipe-form-field__input"
          type="text"
          placeholder="e.g. Creamy Mushroom Pasta"
          autoComplete="off"
        />
        {errors?.title ? <p className="recipe-form-field__error">{errors.title}</p> : null}
      </div>

      <div className="recipe-form-field">
        <label className="recipe-form-field__label" htmlFor="recipe-prep-time">
          Cooking time (minutes)
        </label>
        <input
          id="recipe-prep-time"
          value={draft.prepTimeMinutes}
          onChange={(event) => onDraftChange({ ...draft, prepTimeMinutes: event.target.value })}
          className="recipe-form-field__input"
          type="text"
          inputMode="numeric"
          placeholder="25"
        />
        {errors?.prepTimeMinutes ? (
          <p className="recipe-form-field__error">{errors.prepTimeMinutes}</p>
        ) : null}
      </div>

      <div className="recipe-form-field">
        <PortionStepper
          portions={draft.portions}
          onIncrement={() => {
            if (draft.portions < 20) {
              onDraftChange({ ...draft, portions: draft.portions + 1 })
            }
          }}
          onDecrement={() => {
            if (draft.portions > 1) {
              onDraftChange({ ...draft, portions: draft.portions - 1 })
            }
          }}
        />
        {errors?.portions ? <p className="recipe-form-field__error">{errors.portions}</p> : null}
      </div>
    </RecipeFormSection>
  )
}
