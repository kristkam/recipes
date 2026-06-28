import { MealIllustration } from '@/components/MealIllustration'

import './EmptyRecipeState.css'

type EmptyRecipeStateProps = {
  onAddRecipe: () => void
}

export function EmptyRecipeState({ onAddRecipe }: EmptyRecipeStateProps): React.ReactElement {
  return (
    <section className="empty-state" aria-label="No recipes">
      <MealIllustration className="empty-state__illustration" />
      <h2 className="empty-state__heading">No recipes yet.</h2>
      <p className="empty-state__text">Start building your collection.</p>
      <button type="button" className="empty-state__cta" onClick={onAddRecipe}>
        Add Your First Recipe
      </button>
    </section>
  )
}
