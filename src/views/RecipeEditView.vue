<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import AppCard from '@/components/AppCard.vue'
import { useRecipesStore } from '@/stores/recipes'
import type { RecipeId } from '@/types/recipe'

const props = defineProps<{
  recipeId: RecipeId
}>()

const router = useRouter()
const store = useRecipesStore()

const recipe = computed(() => store.getRecipeById(props.recipeId))

function goBack(): void {
  router.push({ name: 'recipe-detail', params: { recipeId: props.recipeId } })
}
</script>

<template>
  <div v-if="recipe" class="recipe-edit-view">
    <AppCard>
      <header class="recipe-edit-view__header">
        <button type="button" class="recipe-edit-view__back" @click="goBack">&lt; Back</button>
      </header>

      <h1 class="recipe-edit-view__title">Edit Recipe</h1>
      <p class="recipe-edit-view__subtitle">{{ recipe.title }}</p>

      <p class="recipe-edit-view__placeholder">
        Recipe editing is not implemented yet. This screen confirms navigation from the detail
        view.
      </p>

      <RouterLink
        :to="{ name: 'recipe-detail', params: { recipeId: recipe.id } }"
        class="recipe-edit-view__link"
      >
        Return to recipe
      </RouterLink>
    </AppCard>
  </div>

  <div v-else class="recipe-edit-view recipe-edit-view--missing">
    <AppCard>
      <p>Recipe not found.</p>
      <RouterLink :to="{ name: 'recipe-list' }">Back to recipes</RouterLink>
    </AppCard>
  </div>
</template>

<style scoped>
.recipe-edit-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.recipe-edit-view__header {
  margin-bottom: 1.25rem;
}

.recipe-edit-view__back {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
}

.recipe-edit-view__back:hover {
  color: var(--color-text);
}

.recipe-edit-view__back:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 2px;
}

.recipe-edit-view__title {
  margin: 0 0 0.25rem;
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--color-text);
}

.recipe-edit-view__subtitle {
  margin: 0 0 1.5rem;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.recipe-edit-view__placeholder {
  margin: 0 0 1.5rem;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: 1.5;
}

.recipe-edit-view__link {
  color: var(--color-primary);
  font-size: var(--font-size-base);
}

.recipe-edit-view--missing {
  text-align: center;
  color: var(--color-text-secondary);
}

.recipe-edit-view--missing p {
  margin: 0 0 1rem;
}
</style>
