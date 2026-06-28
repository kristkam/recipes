import { createFileRoute } from '@tanstack/react-router'

import { RecipeWizard } from '@/components/RecipeWizard'

export const Route = createFileRoute('/$recipeId_/edit')({
  ssr: false,
  component: RecipeEditPage,
})

function RecipeEditPage(): React.ReactElement {
  const { recipeId } = Route.useParams()

  return (
    <RecipeWizard
      mode="edit"
      recipeId={recipeId}
      title="Edit Recipe"
      cancelDestination="/$recipeId"
      cancelParams={{ recipeId }}
    />
  )
}
