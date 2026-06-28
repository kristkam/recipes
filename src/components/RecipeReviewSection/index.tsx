import { RecipeFormSection } from '@/components/RecipeFormSection'
import type { RecipeDraft } from '@/types/recipe'
import { formatRecipeMeta, formatTags } from '@/utils/recipeFormat'

import './RecipeReviewSection.css'

type RecipeReviewSectionProps = {
  draft: RecipeDraft
}

function formatIngredientLine(draft: RecipeDraft, index: number): string {
  const ingredient = draft.ingredients[index]
  if (!ingredient?.name.trim()) return ''
  const amount = ingredient.amount.trim()
  const unit = ingredient.unit.trim()
  if (!amount || !unit) return ingredient.name.trim()
  return `${ingredient.name.trim()} — ${amount} ${unit}`
}

function visibleIngredients(draft: RecipeDraft): string[] {
  return draft.ingredients
    .map((_, index) => formatIngredientLine(draft, index))
    .filter(Boolean)
}

function visibleInstructions(draft: RecipeDraft): string[] {
  return draft.instructions.map((step) => step.trim()).filter(Boolean)
}

export function RecipeReviewSection({ draft }: RecipeReviewSectionProps): React.ReactElement {
  const ingredients = visibleIngredients(draft)
  const instructions = visibleInstructions(draft)

  return (
    <RecipeFormSection heading="Review">
      <dl className="recipe-review">
        <div className="recipe-review__group">
          <dt className="recipe-review__label">Recipe name</dt>
          <dd className="recipe-review__value">{draft.title.trim() || '—'}</dd>
        </div>

        <div className="recipe-review__group">
          <dt className="recipe-review__label">Summary</dt>
          <dd className="recipe-review__value">
            {draft.title.trim()
              ? formatRecipeMeta(
                  Number.parseInt(draft.prepTimeMinutes, 10) || 0,
                  draft.portions,
                  draft.tags,
                )
              : '—'}
          </dd>
        </div>

        <div className="recipe-review__group">
          <dt className="recipe-review__label">Tags</dt>
          <dd className="recipe-review__value">
            {draft.tags.length > 0 ? formatTags(draft.tags) : 'None'}
          </dd>
        </div>

        <div className="recipe-review__group">
          <dt className="recipe-review__label">Ingredients</dt>
          <dd className="recipe-review__value">
            {ingredients.length > 0 ? (
              <ul className="recipe-review__list">
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <span>—</span>
            )}
          </dd>
        </div>

        <div className="recipe-review__group">
          <dt className="recipe-review__label">Instructions</dt>
          <dd className="recipe-review__value">
            {instructions.length > 0 ? (
              <ol className="recipe-review__list recipe-review__list--ordered">
                {instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            ) : (
              <span>—</span>
            )}
          </dd>
        </div>
      </dl>
    </RecipeFormSection>
  )
}
