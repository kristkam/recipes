import type { Ingredient } from '@/types/recipe'
import { formatIngredientAmount } from '@/utils/recipeFormat'

import './IngredientList.css'

type IngredientListProps = {
  ingredients: Ingredient[]
}

export function IngredientList({ ingredients }: IngredientListProps): React.ReactElement {
  return (
    <section className="ingredient-list">
      <h2 className="ingredient-list__heading">Ingredients</h2>
      <ul className="ingredient-list__items">
        {ingredients.map((ingredient, index) => (
          <li
            key={`${ingredient.name}-${index}`}
            className={`ingredient-list__item list-row-divider list-row-divider--padded${
              index === 0 ? ' list-row-divider--flush-top' : ''
            }`}
          >
            <span className="ingredient-list__name">{ingredient.name}</span>
            <span className="ingredient-list__amount">
              {formatIngredientAmount(ingredient.amount, ingredient.unit)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
