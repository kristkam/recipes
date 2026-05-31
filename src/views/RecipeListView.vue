<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

import AddRecipeFooter from '@/components/AddRecipeFooter.vue'
import EmptyRecipeState from '@/components/EmptyRecipeState.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import RecipeSearch from '@/components/RecipeSearch.vue'
import { useRecipesStore } from '@/stores/recipes'

const router = useRouter()
const store = useRecipesStore()
const { searchQuery, filteredRecipes } = storeToRefs(store)

const showEmptyCollection = computed((): boolean => store.recipes.length === 0)
const showNoSearchResults = computed(
  (): boolean => !showEmptyCollection.value && filteredRecipes.value.length === 0,
)
const showRecipeList = computed(
  (): boolean => !showEmptyCollection.value && filteredRecipes.value.length > 0,
)

function onAddRecipe(): void {
  router.push({ name: 'recipe-new' })
}
</script>

<template>
  <div class="recipe-list-view">
    <header class="recipe-list-view__header">
      <button type="button" class="recipe-list-view__back" aria-label="Go back" disabled>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M12.5 5 L7.5 10 L12.5 15"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <h1 class="recipe-list-view__title">My Recipes</h1>
      <button type="button" class="recipe-list-view__add-btn" @click="onAddRecipe">
        + Add Recipe
      </button>
    </header>

    <RecipeSearch v-model="searchQuery" compact class="recipe-list-view__search" />

    <div v-if="showNoSearchResults" class="recipe-list-view__no-results">
      <p>No recipes match your search.</p>
    </div>

    <ul v-else-if="showRecipeList" class="recipe-list-view__list" aria-label="Recipes">
      <li v-for="recipe in filteredRecipes" :key="recipe.id">
        <RecipeCard :recipe="recipe" compact />
      </li>
    </ul>

    <EmptyRecipeState v-if="showEmptyCollection" @add-recipe="onAddRecipe" />

    <AddRecipeFooter
      v-else-if="showRecipeList"
      compact
      heading="Keep building your collection."
      subtext="Add another recipe anytime."
      @add-recipe="onAddRecipe"
    />
  </div>
</template>

<style scoped>
.recipe-list-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding-bottom: 0.5rem;
}

.recipe-list-view__header {
  display: grid;
  grid-template-columns: 1.5rem 1fr auto;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
  flex-shrink: 0;
}

.recipe-list-view__back {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  background: transparent;
  color: var(--color-text-secondary);
  cursor: default;
  opacity: 0.5;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.recipe-list-view__title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--color-text);
}

.recipe-list-view__add-btn {
  padding: 0.375rem 0.75rem;
  background: var(--color-chip);
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.recipe-list-view__add-btn:hover {
  background: #e4e4e4;
}

.recipe-list-view__add-btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.recipe-list-view__search {
  margin-bottom: 0.75rem;
  flex-shrink: 0;
}

.recipe-list-view__list {
  list-style: none;
  margin: 0 0 0.5rem;
  padding: 0;
  padding-right: 0.125rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1 1 0;
  min-height: 0;
  max-height: calc(100% - 0.5rem);
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.recipe-list-view__list::-webkit-scrollbar {
  width: 4px;
}

.recipe-list-view__list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-full);
}

.recipe-list-view__list li {
  flex-shrink: 0;
}

.recipe-list-view__no-results {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 0;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-base);
}

.recipe-list-view__no-results p {
  margin: 0;
}
</style>
