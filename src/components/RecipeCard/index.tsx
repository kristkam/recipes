import { Link } from '@tanstack/react-router'

import type { RecipeSummary } from '@/types/recipe'
import { formatRecipeMeta } from '@/utils/recipeFormat'

import './RecipeCard.css'

type RecipeCardProps = {
  recipe: RecipeSummary
  compact?: boolean
}

export function RecipeCard({ recipe, compact = false }: RecipeCardProps): React.ReactElement {
  return (
    <Link
      to="/recipes/$recipeId"
      params={{ recipeId: recipe.id }}
      className={`recipe-card${compact ? ' recipe-card--compact' : ''}`}
    >
      <div
        className="recipe-card__thumb"
        style={{ background: recipe.thumbnail.background }}
        aria-hidden="true"
      >
        {recipe.thumbnail.emoji ? (
          <span className="recipe-card__emoji">{recipe.thumbnail.emoji}</span>
        ) : null}
      </div>
      <div className="recipe-card__body">
        <h2 className="recipe-card__title">{recipe.title}</h2>
        <p className="recipe-card__meta">
          {formatRecipeMeta(recipe.prepTimeMinutes, recipe.portions, recipe.tags)}
        </p>
      </div>
    </Link>
  )
}
