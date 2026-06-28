import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

import type { Recipe, RecipeId, RecipeInput } from '@/types/recipe'

import {
  addRecipe as addRecipeToState,
  getFilteredRecipes,
  getPortionsForRecipe,
  initialRecipesState,
  recipesReducer,
  updateRecipe as updateRecipeInState,
  type RecipesAction,
  type RecipesState,
} from './recipes-reducer'

type RecipesContextValue = {
  state: RecipesState
  dispatch: Dispatch<RecipesAction>
  filteredRecipes: Recipe[]
  getRecipeById: (id: RecipeId) => Recipe | undefined
  getPortionsForRecipe: (recipe: Recipe) => number
  setSearchQuery: (query: string) => void
  setPortions: (recipeId: RecipeId, portions: number) => void
  incrementPortions: (recipeId: RecipeId) => void
  decrementPortions: (recipeId: RecipeId) => void
  addRecipe: (input: RecipeInput) => Recipe
  updateRecipe: (recipeId: RecipeId, input: RecipeInput) => Recipe | undefined
}

const RecipesContext = createContext<RecipesContextValue | null>(null)

export function RecipesProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [state, dispatch] = useReducer(recipesReducer, initialRecipesState)

  const value = useMemo((): RecipesContextValue => {
    return {
      state,
      dispatch,
      filteredRecipes: getFilteredRecipes(state),
      getRecipeById: (id) => state.recipes.find((recipe) => recipe.id === id),
      getPortionsForRecipe: (recipe) => getPortionsForRecipe(state, recipe),
      setSearchQuery: (query) => dispatch({ type: 'setSearchQuery', query }),
      setPortions: (recipeId, portions) => dispatch({ type: 'setPortions', recipeId, portions }),
      incrementPortions: (recipeId) => dispatch({ type: 'incrementPortions', recipeId }),
      decrementPortions: (recipeId) => dispatch({ type: 'decrementPortions', recipeId }),
      addRecipe: (input) => {
        const { recipe } = addRecipeToState(state, input)
        dispatch({ type: 'addRecipe', input })
        return recipe
      },
      updateRecipe: (recipeId, input) => {
        const { recipe } = updateRecipeInState(state, recipeId, input)
        if (!recipe) return undefined
        dispatch({ type: 'updateRecipe', recipeId, input })
        return recipe
      },
    }
  }, [state])

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>
}

export function useRecipes(): RecipesContextValue {
  const context = useContext(RecipesContext)
  if (!context) {
    throw new Error('useRecipes must be used within RecipesProvider')
  }
  return context
}
