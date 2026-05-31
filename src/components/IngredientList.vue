<script setup lang="ts">
import type { Ingredient } from '@/types/recipe'
import { formatIngredientAmount } from '@/utils/recipeFormat'

const { ingredients } = defineProps<{
  ingredients: Ingredient[]
}>()
</script>

<template>
  <section class="ingredient-list">
    <h2 class="ingredient-list__heading">Ingredients</h2>
    <ul class="ingredient-list__items">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient-list__item list-row-divider list-row-divider--padded"
        :class="{ 'list-row-divider--flush-top': index === 0 }"
      >
        <span class="ingredient-list__name">{{ ingredient.name }}</span>
        <span class="ingredient-list__amount">
          {{ formatIngredientAmount(ingredient.amount, ingredient.unit) }}
        </span>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.ingredient-list__heading {
  margin: 0 0 0.875rem;
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
}

.ingredient-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ingredient-list__item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: var(--font-size-base);
}

.ingredient-list__name {
  color: var(--color-text);
}

.ingredient-list__amount {
  color: var(--color-text);
  flex-shrink: 0;
}
</style>
