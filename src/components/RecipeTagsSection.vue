<script setup lang="ts">
import { ref } from 'vue'

import RecipeFormSection from '@/components/RecipeFormSection.vue'
import { normalizeTags } from '@/utils/recipeCreate'

const tags = defineModel<string[]>({ required: true })

const tagInput = ref('')

function addTag(): void {
  const nextTags = normalizeTags([...tags.value, tagInput.value])
  tags.value.splice(0, tags.value.length, ...nextTags)
  tagInput.value = ''
}

function removeTag(index: number): void {
  tags.value.splice(index, 1)
}

function onTagInputKeydown(event: KeyboardEvent): void {
  if (event.key === 'Enter') {
    event.preventDefault()
    addTag()
  }
}
</script>

<template>
  <RecipeFormSection heading="Tags">
    <p class="recipe-tags__hint">Optional. Add tags like Vegetarian, Quick, or Dinner.</p>

    <div v-if="tags.length > 0" class="recipe-tags__chips">
      <button
        v-for="(tag, index) in tags"
        :key="`${tag}-${index}`"
        type="button"
        class="recipe-tags__chip"
        :aria-label="`Remove tag ${tag}`"
        @click="removeTag(index)"
      >
        {{ tag }}
        <span aria-hidden="true">×</span>
      </button>
    </div>

    <div class="recipe-tags__input-row">
      <input
        v-model="tagInput"
        class="recipe-form-field__input"
        type="text"
        placeholder="Add a tag"
        aria-label="Add a tag"
        @keydown="onTagInputKeydown"
      />
      <button type="button" class="recipe-tags__add-btn" @click="addTag">+ Add tag</button>
    </div>
  </RecipeFormSection>
</template>

<style scoped>
@import '@/styles/recipe-form.css';

.recipe-tags__hint {
  margin: 0 0 0.875rem;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.recipe-tags__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.875rem;
}

.recipe-tags__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-chip);
  font-family: inherit;
  font-size: var(--font-size-sm);
  color: var(--color-text);
  cursor: pointer;
}

.recipe-tags__chip:hover {
  background: #e4e4e4;
}

.recipe-tags__input-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
  align-items: center;
}

.recipe-tags__add-btn {
  padding: 0.6875rem 0.875rem;
  border: none;
  border-radius: var(--radius-full);
  background: var(--color-chip);
  font-family: inherit;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  white-space: nowrap;
}

.recipe-tags__add-btn:hover {
  background: #e4e4e4;
}
</style>
