import { Link, createFileRoute, useNavigate } from '@tanstack/react-router'

import { AppCard } from '@/components/AppCard'
import { IngredientList } from '@/components/IngredientList'
import { InstructionList } from '@/components/InstructionList'
import { PortionStepper } from '@/components/PortionStepper'
import { useRecipes } from '@/state/recipes-context'
import { formatRecipeMetaShort, scaleIngredient } from '@/utils/recipeFormat'

import './recipe-detail.css'

export const Route = createFileRoute('/$recipeId')({
  ssr: false,
  component: RecipeDetailPage,
})

function RecipeDetailPage(): React.ReactElement {
  const navigate = useNavigate()
  const { recipeId } = Route.useParams()
  const { getRecipeById, getPortionsForRecipe, incrementPortions, decrementPortions } = useRecipes()

  const recipe = getRecipeById(recipeId)

  if (!recipe) {
    return (
      <div className="recipe-detail-view recipe-detail-view--missing">
        <AppCard>
          <p>Recipe not found.</p>
          <Link to="/">Back to recipes</Link>
        </AppCard>
      </div>
    )
  }

  const currentPortions = getPortionsForRecipe(recipe)
  const scaledIngredients = recipe.ingredients.map((ingredient) =>
    scaleIngredient(ingredient, recipe.portions, currentPortions),
  )

  return (
    <div className="recipe-detail-view">
      <AppCard className="recipe-detail-view__card">
        <header className="recipe-detail-view__header">
          <button
            type="button"
            className="recipe-detail-view__nav-btn"
            onClick={() => void navigate({ to: '/' })}
          >
            &lt; Back
          </button>
          <Link
            to="/$recipeId/edit"
            params={{ recipeId: recipe.id }}
            className="recipe-detail-view__nav-btn"
          >
            Edit
          </Link>
        </header>

        <div className="recipe-detail-view__body">
          <section className="recipe-detail-view__section recipe-detail-view__section--intro">
            <div className="recipe-detail-view__intro list-row-divider list-row-divider--padded list-row-divider--flush-top">
              <h1 className="recipe-detail-view__title">{recipe.title}</h1>
              <p className="recipe-detail-view__meta">
                {formatRecipeMetaShort(recipe.prepTimeMinutes, recipe.tags)}
              </p>
            </div>
          </section>

          <section className="recipe-detail-view__section">
            <PortionStepper
              portions={currentPortions}
              onIncrement={() => incrementPortions(recipe.id)}
              onDecrement={() => decrementPortions(recipe.id)}
            />
          </section>

          <section className="recipe-detail-view__section">
            <IngredientList ingredients={scaledIngredients} />
          </section>

          <section className="recipe-detail-view__section">
            <InstructionList instructions={recipe.instructions} />
          </section>
        </div>
      </AppCard>
    </div>
  )
}
