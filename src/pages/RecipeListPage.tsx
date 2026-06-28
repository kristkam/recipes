import { useNavigate } from '@tanstack/react-router'

import { AddRecipeFooter } from '@/components/AddRecipeFooter'
import { EmptyRecipeState } from '@/components/EmptyRecipeState'
import { RecipeCard } from '@/components/RecipeCard'
import { RecipeSearch } from '@/components/RecipeSearch'
import { useRecipes } from '@/state/recipes-context'

import './RecipeListPage.css'

export function RecipeListPage(): React.ReactElement {
  const navigate = useNavigate()
  const { state, filteredRecipes, setSearchQuery } = useRecipes()

  const showEmptyCollection = state.recipes.length === 0
  const showNoSearchResults = !showEmptyCollection && filteredRecipes.length === 0
  const showRecipeList = !showEmptyCollection && filteredRecipes.length > 0

  function onAddRecipe(): void {
    void navigate({ to: '/new' })
  }

  return (
    <div className="recipe-list-view">
      <header className="recipe-list-view__header">
        <button type="button" className="recipe-list-view__back" aria-label="Go back" disabled>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M12.5 5 L7.5 10 L12.5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="recipe-list-view__title">My Recipes</h1>
        <button type="button" className="recipe-list-view__add-btn" onClick={onAddRecipe}>
          + Add Recipe
        </button>
      </header>

      <RecipeSearch
        value={state.searchQuery}
        onChange={setSearchQuery}
        compact
        className="recipe-list-view__search"
      />

      {showNoSearchResults ? (
        <div className="recipe-list-view__no-results">
          <p>No recipes match your search.</p>
        </div>
      ) : null}

      {showRecipeList ? (
        <ul className="recipe-list-view__list" aria-label="Recipes">
          {filteredRecipes.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} compact />
            </li>
          ))}
        </ul>
      ) : null}

      {showEmptyCollection ? <EmptyRecipeState onAddRecipe={onAddRecipe} /> : null}

      {showRecipeList ? (
        <AddRecipeFooter
          compact
          heading="Keep building your collection."
          subtext="Add another recipe anytime."
          onAddRecipe={onAddRecipe}
        />
      ) : null}
    </div>
  )
}
