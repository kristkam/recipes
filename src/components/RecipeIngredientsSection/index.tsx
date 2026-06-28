import { RecipeFormSection } from '@/components/RecipeFormSection'
import type { IngredientDraft } from '@/types/recipe'
import { createEmptyIngredientDraft } from '@/utils/recipeCreate'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

import '@/styles/recipe-form.css'
import './RecipeIngredientsSection.css'

type RecipeIngredientsSectionProps = {
  ingredients: IngredientDraft[]
  errors?: RecipeDraftErrors
  onIngredientsChange: (ingredients: IngredientDraft[]) => void
}

export function RecipeIngredientsSection({
  ingredients,
  errors,
  onIngredientsChange,
}: RecipeIngredientsSectionProps): React.ReactElement {
  function addIngredient(): void {
    onIngredientsChange([...ingredients, createEmptyIngredientDraft()])
  }

  function removeIngredient(index: number): void {
    if (ingredients.length === 1) {
      onIngredientsChange([createEmptyIngredientDraft()])
      return
    }
    onIngredientsChange(ingredients.filter((_, itemIndex) => itemIndex !== index))
  }

  function updateIngredient(index: number, patch: Partial<IngredientDraft>): void {
    onIngredientsChange(
      ingredients.map((ingredient, itemIndex) =>
        itemIndex === index ? { ...ingredient, ...patch } : ingredient,
      ),
    )
  }

  return (
    <RecipeFormSection heading="Ingredients">
      {errors?.ingredients ? (
        <p className="recipe-form-field__error recipe-ingredients__error">{errors.ingredients}</p>
      ) : null}

      <ul className="recipe-ingredients__list">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="recipe-ingredients__row">
            <input
              value={ingredient.name}
              onChange={(event) => updateIngredient(index, { name: event.target.value })}
              className="recipe-form-field__input recipe-ingredients__name"
              type="text"
              placeholder="Ingredient"
              aria-label={`Ingredient ${index + 1} name`}
            />

            <div className="recipe-ingredients__meta">
              <div className="recipe-ingredients__measures">
                <input
                  value={ingredient.amount}
                  onChange={(event) => updateIngredient(index, { amount: event.target.value })}
                  className="recipe-form-field__input recipe-ingredients__amount"
                  type="text"
                  inputMode="decimal"
                  placeholder="Amount"
                  aria-label={`Ingredient ${index + 1} amount`}
                />
                <input
                  value={ingredient.unit}
                  onChange={(event) => updateIngredient(index, { unit: event.target.value })}
                  className="recipe-form-field__input recipe-ingredients__unit"
                  type="text"
                  placeholder="Unit"
                  aria-label={`Ingredient ${index + 1} unit`}
                />
              </div>
              <button
                type="button"
                className="recipe-form-link-btn recipe-form-link-btn--danger recipe-ingredients__remove"
                aria-label={`Remove ingredient ${index + 1}`}
                onClick={() => removeIngredient(index)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="recipe-form-row-actions">
        <button type="button" className="recipe-form-link-btn" onClick={addIngredient}>
          + Add ingredient
        </button>
      </div>
    </RecipeFormSection>
  )
}
