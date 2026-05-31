<script setup lang="ts">
import PortionStepper from '@/components/PortionStepper.vue'
import RecipeFormSection from '@/components/RecipeFormSection.vue'
import type { RecipeDraft } from '@/types/recipe'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

const draft = defineModel<RecipeDraft>({ required: true })

defineProps<{
  errors?: RecipeDraftErrors
}>()

function incrementPortions(): void {
  if (draft.value.portions < 20) {
    draft.value.portions += 1
  }
}

function decrementPortions(): void {
  if (draft.value.portions > 1) {
    draft.value.portions -= 1
  }
}
</script>

<template>
  <RecipeFormSection heading="Basics">
    <div class="recipe-form-field">
      <label class="recipe-form-field__label" for="recipe-title">Recipe name</label>
      <input
        id="recipe-title"
        v-model="draft.title"
        class="recipe-form-field__input"
        type="text"
        placeholder="e.g. Creamy Mushroom Pasta"
        autocomplete="off"
      />
      <p v-if="errors?.title" class="recipe-form-field__error">{{ errors.title }}</p>
    </div>

    <div class="recipe-form-field">
      <label class="recipe-form-field__label" for="recipe-prep-time">Cooking time (minutes)</label>
      <input
        id="recipe-prep-time"
        v-model="draft.prepTimeMinutes"
        class="recipe-form-field__input"
        type="text"
        inputmode="numeric"
        placeholder="25"
      />
      <p v-if="errors?.prepTimeMinutes" class="recipe-form-field__error">
        {{ errors.prepTimeMinutes }}
      </p>
    </div>

    <div class="recipe-form-field">
      <PortionStepper
        :portions="draft.portions"
        @increment="incrementPortions"
        @decrement="decrementPortions"
      />
      <p v-if="errors?.portions" class="recipe-form-field__error">{{ errors.portions }}</p>
    </div>
  </RecipeFormSection>
</template>

<style scoped>
@import '@/styles/recipe-form.css';
</style>
