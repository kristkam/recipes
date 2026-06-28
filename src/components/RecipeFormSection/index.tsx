import type { ReactNode } from 'react'

import { AppCard } from '@/components/AppCard'

import './RecipeFormSection.css'

type RecipeFormSectionProps = {
  heading: string
  children: ReactNode
}

export function RecipeFormSection({ heading, children }: RecipeFormSectionProps): React.ReactElement {
  return (
    <AppCard className="recipe-form-section">
      <h2 className="recipe-form-section__heading">{heading}</h2>
      {children}
    </AppCard>
  )
}
