<script setup lang="ts">
import RecipeFormSection from '@/components/RecipeFormSection.vue'
import type { IngredientDraft } from '@/types/recipe'
import { createEmptyIngredientDraft } from '@/utils/recipeCreate'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

const ingredients = defineModel<IngredientDraft[]>({ required: true })

defineProps<{
  errors?: RecipeDraftErrors
}>()

function addIngredient(): void {
  ingredients.value = [...ingredients.value, createEmptyIngredientDraft()]
}

function removeIngredient(index: number): void {
  if (ingredients.value.length === 1) {
    ingredients.value = [createEmptyIngredientDraft()]
    return
  }
  ingredients.value = ingredients.value.filter((_, itemIndex) => itemIndex !== index)
}
</script>

<template>
  <RecipeFormSection heading="Ingredients">
    <p v-if="errors?.ingredients" class="recipe-form-field__error recipe-ingredients__error">
      {{ errors.ingredients }}
    </p>

    <ul class="recipe-ingredients__list">
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="recipe-ingredients__row"
      >
        <input
          v-model="ingredient.name"
          class="recipe-form-field__input recipe-ingredients__name"
          type="text"
          placeholder="Ingredient"
          :aria-label="`Ingredient ${index + 1} name`"
        />

        <div class="recipe-ingredients__meta">
          <div class="recipe-ingredients__measures">
            <input
              v-model="ingredient.amount"
              class="recipe-form-field__input recipe-ingredients__amount"
              type="text"
              inputmode="decimal"
              placeholder="Amount"
              :aria-label="`Ingredient ${index + 1} amount`"
            />
            <input
              v-model="ingredient.unit"
              class="recipe-form-field__input recipe-ingredients__unit"
              type="text"
              placeholder="Unit"
              :aria-label="`Ingredient ${index + 1} unit`"
            />
          </div>
          <button
            type="button"
            class="recipe-form-link-btn recipe-form-link-btn--danger recipe-ingredients__remove"
            :aria-label="`Remove ingredient ${index + 1}`"
            @click="removeIngredient(index)"
          >
            Remove
          </button>
        </div>
      </li>
    </ul>

    <div class="recipe-form-row-actions">
      <button type="button" class="recipe-form-link-btn" @click="addIngredient">
        + Add ingredient
      </button>
    </div>
  </RecipeFormSection>
</template>

<style scoped>
@import '@/styles/recipe-form.css';

.recipe-ingredients__error {
  margin: 0 0 0.75rem;
}

.recipe-ingredients__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recipe-ingredients__row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.recipe-ingredients__row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.recipe-ingredients__name {
  width: 100%;
}

.recipe-ingredients__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.recipe-ingredients__measures {
  display: grid;
  grid-template-columns: 5.5rem 4.5rem;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.recipe-ingredients__amount,
.recipe-ingredients__unit {
  min-width: 0;
  width: 100%;
}

.recipe-ingredients__remove {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>
