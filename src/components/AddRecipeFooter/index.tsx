import { MealIllustration } from '@/components/MealIllustration'

import './AddRecipeFooter.css'

type AddRecipeFooterProps = {
  heading?: string
  subtext?: string
  compact?: boolean
  onAddRecipe: () => void
}

export function AddRecipeFooter({
  heading = 'Keep building your collection.',
  subtext,
  compact = false,
  onAddRecipe,
}: AddRecipeFooterProps): React.ReactElement {
  return (
    <section
      className={`add-recipe-footer${compact ? ' add-recipe-footer--compact' : ''}`}
      aria-label="Add a recipe"
    >
      <MealIllustration size={compact ? 'sm' : 'md'} className="add-recipe-footer__illustration" />
      <p className="add-recipe-footer__heading">{heading}</p>
      {subtext ? <p className="add-recipe-footer__subtext">{subtext}</p> : null}
      <button type="button" className="add-recipe-footer__btn" onClick={onAddRecipe}>
        + Add Recipe
      </button>
    </section>
  )
}
