import type { RecipeWizardStep } from '@/types/recipe'
import { RECIPE_WIZARD_STEPS } from '@/types/recipe'

import './RecipeWizardSteps.css'

const STEP_LABELS: Record<RecipeWizardStep, string> = {
  basics: 'Basics',
  ingredients: 'Ingredients',
  instructions: 'Instructions',
  review: 'Review',
}

type RecipeWizardStepsProps = {
  currentStep: RecipeWizardStep
  onStepChange: (step: RecipeWizardStep) => void
}

function stepIndex(step: RecipeWizardStep): number {
  return RECIPE_WIZARD_STEPS.indexOf(step)
}

export function RecipeWizardSteps({
  currentStep,
  onStepChange,
}: RecipeWizardStepsProps): React.ReactElement {
  return (
    <nav className="recipe-wizard-steps" aria-label="Recipe form progress">
      <ol className="recipe-wizard-steps__list">
        {RECIPE_WIZARD_STEPS.map((step, index) => {
          const isActive = step === currentStep
          const isComplete = stepIndex(step) < stepIndex(currentStep)

          return (
            <li
              key={step}
              className={`recipe-wizard-steps__item${
                isActive ? ' recipe-wizard-steps__item--active' : ''
              }${isComplete ? ' recipe-wizard-steps__item--complete' : ''}`}
            >
              <button
                type="button"
                className="recipe-wizard-steps__step"
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Go to ${STEP_LABELS[step]}`}
                onClick={() => {
                  if (step !== currentStep) {
                    onStepChange(step)
                  }
                }}
              >
                <span className="recipe-wizard-steps__marker" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="recipe-wizard-steps__label">{STEP_LABELS[step]}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
