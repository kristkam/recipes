import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { RecipeListPage } from '@/pages/RecipeListPage'
import { RecipesProvider } from '@/state/recipes-context'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  Link: ({
    children,
    className,
    to,
    params,
  }: {
    children: React.ReactNode
    className?: string
    to: string
    params?: { recipeId: string }
  }) => (
    <a
      href={params?.recipeId ? to.replace('$recipeId', params.recipeId) : to}
      className={className}
    >
      {children}
    </a>
  ),
}))

describe('App shell', () => {
  it('renders the recipe list route', () => {
    render(
      <RecipesProvider>
        <RecipeListPage />
      </RecipesProvider>,
    )

    expect(screen.getByRole('heading', { name: 'My Recipes' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Creamy Mushroom Pasta/ })).toBeInTheDocument()
  })
})
