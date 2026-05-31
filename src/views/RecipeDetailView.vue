<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AppCard from '@/components/AppCard.vue'
import IngredientList from '@/components/IngredientList.vue'
import InstructionList from '@/components/InstructionList.vue'
import PortionStepper from '@/components/PortionStepper.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { RecipeId } from '@/types/recipe'
import { formatRecipeMetaShort, scaleIngredient } from '@/utils/recipeFormat'

const props = defineProps<{
  recipeId: RecipeId
}>()

const router = useRouter()
const store = useRecipesStore()

const recipe = computed(() => store.getRecipeById(props.recipeId))

const currentPortions = computed((): number => {
  if (!recipe.value) return 1
  return store.getPortionsForRecipe(recipe.value)
})

const scaledIngredients = computed(() => {
  if (!recipe.value) return []
  return recipe.value.ingredients.map((ingredient) =>
    scaleIngredient(ingredient, recipe.value!.portions, currentPortions.value),
  )
})

function goBack(): void {
  router.push({ name: 'recipe-list' })
}
</script>

<template>
  <div v-if="recipe" class="recipe-detail-view">
    <AppCard class="recipe-detail-view__card">
      <header class="recipe-detail-view__header">
        <button type="button" class="recipe-detail-view__nav-btn" @click="goBack">&lt; Back</button>
        <RouterLink
          :to="{ name: 'recipe-edit', params: { recipeId: recipe.id } }"
          class="recipe-detail-view__nav-btn"
        >
          Edit
        </RouterLink>
      </header>

      <div class="recipe-detail-view__body">
        <section class="recipe-detail-view__section recipe-detail-view__section--intro">
          <div
            class="recipe-detail-view__intro list-row-divider list-row-divider--padded list-row-divider--flush-top"
          >
            <h1 class="recipe-detail-view__title">{{ recipe.title }}</h1>
            <p class="recipe-detail-view__meta">
              {{ formatRecipeMetaShort(recipe.prepTimeMinutes, recipe.tags) }}
            </p>
          </div>
        </section>

        <section class="recipe-detail-view__section">
          <PortionStepper
            :portions="currentPortions"
            @increment="store.incrementPortions(recipe.id)"
            @decrement="store.decrementPortions(recipe.id)"
          />
        </section>

        <section class="recipe-detail-view__section">
          <IngredientList :ingredients="scaledIngredients" />
        </section>

        <section class="recipe-detail-view__section">
          <InstructionList :instructions="recipe.instructions" />
        </section>
      </div>
    </AppCard>
  </div>

  <div v-else class="recipe-detail-view recipe-detail-view--missing">
    <AppCard>
      <p>Recipe not found.</p>
      <RouterLink :to="{ name: 'recipe-list' }">Back to recipes</RouterLink>
    </AppCard>
  </div>
</template>

<style scoped>
.recipe-detail-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.recipe-detail-view__card {
  flex: 1;
  min-height: 100%;
  overflow: hidden;
}

.recipe-detail-view__card.app-card--padding-default {
  padding: 0;
  border: 0;
  box-shadow: none;
}

.recipe-detail-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid var(--color-divider);
}

.recipe-detail-view__body {
  padding: 0;
}

/* Section breaks between portions, ingredients, instructions */
.recipe-detail-view__section {
  padding: 1.125rem 1.5rem;
  border-top: 1px solid var(--color-section-divider);
}

.recipe-detail-view__section--intro {
  padding: 1.5rem 1.5rem 0;
}

.recipe-detail-view__section--intro + .recipe-detail-view__section {
  border-top: none;
  padding-top: 0.875rem;
}

.recipe-detail-view__intro {
  padding-left: 0;
  padding-right: 0;
}

.recipe-detail-view__section:first-child {
  border-top: none;
}

.recipe-detail-view__section:last-child {
  padding-bottom: 1.625rem;
}

.recipe-detail-view__nav-btn {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: 400;
  color: var(--color-nav-action);
  cursor: pointer;
  padding: 0;
  text-decoration: none;
}

.recipe-detail-view__nav-btn:hover {
  color: var(--color-primary-hover);
}

.recipe-detail-view__nav-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

.recipe-detail-view__title {
  margin: 0 0 0.5rem;
  font-size: clamp(1.5rem, 6vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: var(--color-text);
}

.recipe-detail-view__meta {
  margin: 0;
  font-size: var(--font-size-base);
  line-height: 1.4;
  color: var(--color-text-secondary);
}

.recipe-detail-view--missing {
  text-align: center;
  color: var(--color-text-secondary);
}

.recipe-detail-view--missing p {
  margin: 0 0 1rem;
}
</style>
