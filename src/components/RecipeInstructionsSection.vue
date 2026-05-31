<script setup lang="ts">
import RecipeFormSection from '@/components/RecipeFormSection.vue'
import type { RecipeDraftErrors } from '@/utils/recipeValidation'

const instructions = defineModel<string[]>({ required: true })

defineProps<{
  errors?: RecipeDraftErrors
}>()

function addStep(): void {
  instructions.value = [...instructions.value, '']
}

function removeStep(index: number): void {
  if (instructions.value.length === 1) {
    instructions.value = ['']
    return
  }
  instructions.value = instructions.value.filter((_, itemIndex) => itemIndex !== index)
}
</script>

<template>
  <RecipeFormSection heading="Instructions">
    <p v-if="errors?.instructions" class="recipe-form-field__error recipe-instructions__error">
      {{ errors.instructions }}
    </p>

    <ol class="recipe-instructions__list">
      <li
        v-for="(step, index) in instructions"
        :key="index"
        class="recipe-instructions__row"
      >
        <div class="recipe-instructions__header">
          <span class="recipe-instructions__label">Step {{ index + 1 }}</span>
          <button
            type="button"
            class="recipe-form-link-btn recipe-form-link-btn--danger recipe-instructions__remove"
            :aria-label="`Remove step ${index + 1}`"
            @click="removeStep(index)"
          >
            Remove
          </button>
        </div>
        <textarea
          v-model="instructions[index]"
          class="recipe-form-field__textarea recipe-instructions__textarea"
          rows="2"
          :aria-label="`Instruction step ${index + 1}`"
          placeholder="Describe this step"
        />
      </li>
    </ol>

    <div class="recipe-form-row-actions">
      <button type="button" class="recipe-form-link-btn" @click="addStep">+ Add step</button>
    </div>
  </RecipeFormSection>
</template>

<style scoped>
@import '@/styles/recipe-form.css';

.recipe-instructions__error {
  margin: 0 0 0.75rem;
}

.recipe-instructions__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.recipe-instructions__row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-subtle);
}

.recipe-instructions__row:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.recipe-instructions__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.recipe-instructions__label {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--color-text);
}

.recipe-instructions__textarea {
  width: 100%;
  resize: vertical;
  min-height: 3.25rem;
}

.recipe-instructions__remove {
  flex-shrink: 0;
  white-space: nowrap;
}
</style>
