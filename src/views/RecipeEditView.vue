<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AppCard from '@/components/AppCard.vue'
import RecipeBasicsSection from '@/components/RecipeBasicsSection.vue'
import RecipeIngredientsSection from '@/components/RecipeIngredientsSection.vue'
import RecipeInstructionsSection from '@/components/RecipeInstructionsSection.vue'
import RecipeReviewSection from '@/components/RecipeReviewSection.vue'
import RecipeTagsSection from '@/components/RecipeTagsSection.vue'
import RecipeWizardSteps from '@/components/RecipeWizardSteps.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { RecipeDraft, RecipeId, RecipeWizardStep } from '@/types/recipe'
import { RECIPE_WIZARD_STEPS } from '@/types/recipe'
import { draftToRecipeInput, recipeToDraft } from '@/utils/recipeCreate'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'
import {
  hasValidationErrors,
  validateWizardStep,
} from '@/utils/recipeValidation'

const props = defineProps<{
  recipeId: RecipeId
}>()

const router = useRouter()
const store = useRecipesStore()

const recipe = computed(() => store.getRecipeById(props.recipeId))

const draft = reactive<RecipeDraft>({
  title: '',
  prepTimeMinutes: '',
  portions: 4,
  tags: [],
  ingredients: [],
  instructions: [],
})
const currentStep = ref<RecipeWizardStep>('basics')
const errors = ref<RecipeDraftErrors>({})
const draftHydrated = ref(false)

watch(
  recipe,
  (value) => {
    if (!value || draftHydrated.value) {
      return
    }
    Object.assign(draft, recipeToDraft(value))
    draftHydrated.value = true
  },
  { immediate: true },
)

watch(currentStep, () => {
  errors.value = {}
})

const currentStepIndex = computed((): number => RECIPE_WIZARD_STEPS.indexOf(currentStep.value))
const isFirstStep = computed((): boolean => currentStep.value === 'basics')
const isLastStep = computed((): boolean => currentStep.value === 'review')

function goToDetail(): void {
  router.push({ name: 'recipe-detail', params: { recipeId: props.recipeId } })
}

function goBack(): void {
  if (isFirstStep.value) {
    goToDetail()
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

  const updated = store.updateRecipe(props.recipeId, draftToRecipeInput(draft))
  if (!updated) {
    return
  }

  router.push({ name: 'recipe-detail', params: { recipeId: updated.id } })
}
</script>

<template>
  <div v-if="recipe && draftHydrated" class="recipe-edit-view">
    <header class="recipe-edit-view__header">
      <button type="button" class="recipe-edit-view__back" @click="goBack">
        {{ isFirstStep ? 'Cancel' : 'Back' }}
      </button>
      <h1 class="recipe-edit-view__title">Edit Recipe</h1>
      <span class="recipe-edit-view__spacer" aria-hidden="true" />
    </header>

    <RecipeWizardSteps v-model:current-step="currentStep" />

    <div class="recipe-edit-view__content">
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

    <div class="recipe-form-actions recipe-edit-view__actions">
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
        @click="goToDetail"
      >
        Cancel
      </button>
    </div>
  </div>

  <div v-else-if="recipe && !draftHydrated" class="recipe-edit-view recipe-edit-view--loading">
    <p>Loading recipe…</p>
  </div>

  <div v-else class="recipe-edit-view recipe-edit-view--missing">
    <AppCard>
      <p>Recipe not found.</p>
      <RouterLink :to="{ name: 'recipe-list' }">Back to recipes</RouterLink>
    </AppCard>
  </div>
</template>

<style scoped>
@import '@/styles/recipe-form.css';

.recipe-edit-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.recipe-edit-view__header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.recipe-edit-view__back {
  border: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-nav-action);
  cursor: pointer;
}

.recipe-edit-view__back:hover {
  color: var(--color-primary-hover);
}

.recipe-edit-view__title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: var(--color-text);
}

.recipe-edit-view__spacer {
  width: 3rem;
}

.recipe-edit-view__content {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  flex: 1;
}

.recipe-edit-view__actions {
  margin-top: auto;
  padding-top: 1rem;
}

.recipe-edit-view--loading,
.recipe-edit-view--missing {
  text-align: center;
  color: var(--color-text-secondary);
}

.recipe-edit-view--missing p {
  margin: 0 0 1rem;
}
</style>
