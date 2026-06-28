import { createFileRoute } from '@tanstack/react-router'

import { RecipeWizard } from '@/components/RecipeWizard'

export const Route = createFileRoute('/recipes/new')({
  ssr: false,
  component: RecipeNewPage,
})

function RecipeNewPage(): React.ReactElement {
  return (
    <RecipeWizard
      mode="create"
      title="Add Recipe"
      cancelDestination="/"
    />
  )
}
