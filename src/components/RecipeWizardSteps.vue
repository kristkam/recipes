<script setup lang="ts">
import type { RecipeWizardStep } from '@/types/recipe'
import { RECIPE_WIZARD_STEPS } from '@/types/recipe'

const STEP_LABELS: Record<RecipeWizardStep, string> = {
  basics: 'Basics',
  ingredients: 'Ingredients',
  instructions: 'Instructions',
  review: 'Review',
}

const currentStep = defineModel<RecipeWizardStep>('currentStep', { required: true })

function stepIndex(step: RecipeWizardStep): number {
  return RECIPE_WIZARD_STEPS.indexOf(step)
}

function isComplete(step: RecipeWizardStep): boolean {
  return stepIndex(step) < stepIndex(currentStep.value)
}

function isActive(step: RecipeWizardStep): boolean {
  return step === currentStep.value
}

function selectStep(step: RecipeWizardStep): void {
  if (step === currentStep.value) {
    return
  }
  currentStep.value = step
}
</script>

<template>
  <nav class="recipe-wizard-steps" aria-label="Recipe form progress">
    <ol class="recipe-wizard-steps__list">
      <li
        v-for="(step, index) in RECIPE_WIZARD_STEPS"
        :key="step"
        class="recipe-wizard-steps__item"
        :class="{
          'recipe-wizard-steps__item--active': isActive(step),
          'recipe-wizard-steps__item--complete': isComplete(step),
        }"
      >
        <button
          type="button"
          class="recipe-wizard-steps__step"
          :aria-current="isActive(step) ? 'step' : undefined"
          :aria-label="`Go to ${STEP_LABELS[step]}`"
          @click="selectStep(step)"
        >
          <span class="recipe-wizard-steps__marker" aria-hidden="true">{{ index + 1 }}</span>
          <span class="recipe-wizard-steps__label">{{ STEP_LABELS[step] }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.recipe-wizard-steps {
  margin-bottom: 1rem;
}

.recipe-wizard-steps__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.375rem;
}

.recipe-wizard-steps__item {
  position: relative;
  min-width: 0;
}

.recipe-wizard-steps__item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(0.375rem + 0.875rem);
  left: 50%;
  width: 100%;
  height: 1px;
  background: var(--color-divider);
  transform: translateY(-50%);
  z-index: 0;
}

.recipe-wizard-steps__step {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5625rem;
  width: 100%;
  padding: 0.375rem 0 0;
  border: none;
  background: transparent;
  font-family: inherit;
  text-align: center;
  cursor: pointer;
}

.recipe-wizard-steps__step:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.recipe-wizard-steps__marker {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: 700;
  background: var(--color-chip);
  color: var(--color-text-secondary);
}

.recipe-wizard-steps__label {
  font-size: 0.6875rem;
  line-height: 1.2;
  color: var(--color-text-secondary);
}

.recipe-wizard-steps__item--complete:not(:last-child)::after {
  background: #dce8e0;
}

.recipe-wizard-steps__item--active .recipe-wizard-steps__marker {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.recipe-wizard-steps__item--active .recipe-wizard-steps__label {
  color: var(--color-text);
  font-weight: 600;
}

.recipe-wizard-steps__item--complete .recipe-wizard-steps__marker {
  background: #dce8e0;
  color: var(--color-nav-action);
}

.recipe-wizard-steps__step:hover .recipe-wizard-steps__label {
  color: var(--color-text);
}
</style>
