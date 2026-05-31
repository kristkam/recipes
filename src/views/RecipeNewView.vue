<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import RecipeBasicsSection from '@/components/RecipeBasicsSection.vue'
import RecipeIngredientsSection from '@/components/RecipeIngredientsSection.vue'
import RecipeInstructionsSection from '@/components/RecipeInstructionsSection.vue'
import RecipeReviewSection from '@/components/RecipeReviewSection.vue'
import RecipeTagsSection from '@/components/RecipeTagsSection.vue'
import RecipeWizardSteps from '@/components/RecipeWizardSteps.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { RecipeDraft, RecipeWizardStep } from '@/types/recipe'
import { RECIPE_WIZARD_STEPS } from '@/types/recipe'
import { createEmptyRecipeDraft, draftToRecipeInput } from '@/utils/recipeCreate'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'
import {
  hasValidationErrors,
  validateWizardStep,
} from '@/utils/recipeValidation'

const router = useRouter()
const store = useRecipesStore()

const draft = reactive<RecipeDraft>(createEmptyRecipeDraft())
const currentStep = ref<RecipeWizardStep>('basics')
const errors = ref<RecipeDraftErrors>({})

const currentStepIndex = computed((): number => RECIPE_WIZARD_STEPS.indexOf(currentStep.value))
const isFirstStep = computed((): boolean => currentStep.value === 'basics')
const isLastStep = computed((): boolean => currentStep.value === 'review')

function goToList(): void {
  router.push({ name: 'recipe-list' })
}

function goBack(): void {
  if (isFirstStep.value) {
    goToList()
    return
  }
  currentStep.value = RECIPE_WIZARD_STEPS[currentStepIndex.value - 1] ?? 'basics'
  errors.value = {}
}

function goNext(): void {
  const stepErrors = validateWizardStep(currentStep.value, draft)
  errors.value = stepErrors

  if (hasValidationErrors(stepErrors)) {
    return
  }

  if (isLastStep.value) {
    saveRecipe()
    return
  }

  currentStep.value = RECIPE_WIZARD_STEPS[currentStepIndex.value + 1] ?? 'review'
  errors.value = {}
}

function saveRecipe(): void {
  const stepErrors = validateWizardStep('review', draft)
  errors.value = stepErrors

  if (hasValidationErrors(stepErrors)) {
    return
  }

  const recipe = store.addRecipe(draftToRecipeInput(draft))
  router.push({ name: 'recipe-detail', params: { recipeId: recipe.id } })
}
</script>

<template>
  <div class="recipe-new-view">
    <header class="recipe-new-view__header">
      <button type="button" class="recipe-new-view__back" @click="goBack">
        {{ isFirstStep ? 'Cancel' : 'Back' }}
      </button>
      <h1 class="recipe-new-view__title">Add Recipe</h1>
      <span class="recipe-new-view__spacer" aria-hidden="true" />
    </header>

    <RecipeWizardSteps :current-step="currentStep" />

    <div class="recipe-new-view__content">
      <RecipeBasicsSection
        v-if="currentStep === 'basics'"
        v-model="draft"
        :errors="errors"
      />

      <RecipeIngredientsSection
        v-else-if="currentStep === 'ingredients'"
        v-model="draft.ingredients"
        :errors="errors"
      />

      <RecipeInstructionsSection
        v-else-if="currentStep === 'instructions'"
        v-model="draft.instructions"
        :errors="errors"
      />

      <template v-else-if="currentStep === 'review'">
        <RecipeTagsSection v-model="draft.tags" />
        <RecipeReviewSection :draft="draft" />
      </template>
    </div>

    <div class="recipe-form-actions recipe-new-view__actions">
      <button type="button" class="recipe-form-btn recipe-form-btn--primary" @click="goNext">
        {{ isLastStep ? 'Save Recipe' : 'Next' }}
      </button>
      <button
        v-if="!isFirstStep"
        type="button"
        class="recipe-form-btn recipe-form-btn--secondary"
        @click="goBack"
      >
        Back
      </button>
      <button
        v-else
        type="button"
        class="recipe-form-btn recipe-form-btn--secondary"
        @click="goToList"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/recipe-form.css';

.recipe-new-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.recipe-new-view__header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.recipe-new-view__back {
  border: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-nav-action);
  cursor: pointer;
}

.recipe-new-view__back:hover {
  color: var(--color-primary-hover);
}

.recipe-new-view__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
}

.recipe-new-view__spacer {
  width: 3rem;
}

.recipe-new-view__content {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
}

.recipe-new-view__actions {
  margin-top: auto;
  padding-top: 1rem;
}
</style>
