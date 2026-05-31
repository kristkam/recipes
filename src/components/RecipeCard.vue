<script setup lang="ts">
import { RouterLink } from 'vue-router'

import type { RecipeSummary } from '@/types/recipe'
import { formatRecipeMeta } from '@/utils/recipeFormat'

const { recipe, compact = false } = defineProps<{
  recipe: RecipeSummary
  compact?: boolean
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'recipe-detail', params: { recipeId: recipe.id } }"
    class="recipe-card"
    :class="{ 'recipe-card--compact': compact }"
  >
    <div
      class="recipe-card__thumb"
      :style="{ background: recipe.thumbnail.background }"
      aria-hidden="true"
    >
      <span v-if="recipe.thumbnail.emoji" class="recipe-card__emoji">{{ recipe.thumbnail.emoji }}</span>
    </div>
    <div class="recipe-card__body">
      <h2 class="recipe-card__title">{{ recipe.title }}</h2>
      <p class="recipe-card__meta">
        {{ formatRecipeMeta(recipe.prepTimeMinutes, recipe.portions, recipe.tags) }}
      </p>
    </div>
  </RouterLink>
</template>

<style scoped>
.recipe-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.625rem 0.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.15s ease;
}

.recipe-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
}

.recipe-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.recipe-card__thumb {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.recipe-card__emoji {
  font-size: 1.5rem;
}

.recipe-card__body {
  min-width: 0;
  flex: 1;
}

.recipe-card__title {
  margin: 0 0 0.25rem;
  font-size: var(--font-size-base);
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-text);
}

.recipe-card__meta {
  margin: 0;
  font-size: var(--font-size-xs);
  line-height: 1.4;
  color: var(--color-text-secondary);
}

.recipe-card--compact {
  gap: 0.625rem;
  padding: 0.5rem 0.625rem;
}

.recipe-card--compact .recipe-card__thumb {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.5rem;
}

.recipe-card--compact .recipe-card__title {
  margin-bottom: 0.125rem;
  font-size: 0.875rem;
  line-height: 1.3;
}

.recipe-card--compact .recipe-card__meta {
  font-size: 0.75rem;
  line-height: 1.35;
}
</style>
