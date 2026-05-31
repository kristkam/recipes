<script setup lang="ts">
import MealIllustration from '@/components/MealIllustration.vue'

const {
  heading = 'Keep building your collection.',
  subtext,
  compact = false,
} = defineProps<{
  heading?: string
  subtext?: string
  compact?: boolean
}>()

const emit = defineEmits<{
  addRecipe: []
}>()
</script>

<template>
  <section
    class="add-recipe-footer"
    :class="{ 'add-recipe-footer--compact': compact }"
    aria-label="Add a recipe"
  >
    <MealIllustration :size="compact ? 'sm' : 'md'" class="add-recipe-footer__illustration" />
    <p class="add-recipe-footer__heading">{{ heading }}</p>
    <p v-if="subtext" class="add-recipe-footer__subtext">{{ subtext }}</p>
    <button type="button" class="add-recipe-footer__btn" @click="emit('addRecipe')">
      + Add Recipe
    </button>
  </section>
</template>

<style scoped>
.add-recipe-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0.5rem 0.5rem;
  margin-top: auto;
  flex-shrink: 0;
}

.add-recipe-footer--compact {
  padding: 0.625rem 0.5rem 1.25rem;
  margin-top: 0.375rem;
}

.add-recipe-footer__illustration {
  margin-bottom: 1.25rem;
}

.add-recipe-footer--compact .add-recipe-footer__illustration {
  margin-bottom: 0.5rem;
}

.add-recipe-footer__heading {
  margin: 0 0 0.375rem;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.add-recipe-footer--compact .add-recipe-footer__heading {
  margin-bottom: 0.125rem;
  font-size: 0.875rem;
}

.add-recipe-footer__subtext {
  margin: 0 0 1.25rem;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.add-recipe-footer--compact .add-recipe-footer__subtext {
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
}

.add-recipe-footer__subtext:last-of-type {
  margin-bottom: 1.25rem;
}

.add-recipe-footer--compact .add-recipe-footer__subtext:last-of-type {
  margin-bottom: 0.5rem;
}

.add-recipe-footer__heading:last-child {
  margin-bottom: 1.25rem;
}

.add-recipe-footer--compact .add-recipe-footer__heading:last-child {
  margin-bottom: 0.5rem;
}

.add-recipe-footer__btn {
  width: 100%;
  max-width: 17.5rem;
  padding: 0.9375rem 1.5rem;
  background: var(--color-primary);
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 500;
  color: var(--color-primary-text);
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
}

.add-recipe-footer--compact .add-recipe-footer__btn {
  width: auto;
  min-width: 10.5rem;
  max-width: 13rem;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  line-height: 1.2;
}

.add-recipe-footer__btn:hover {
  background: var(--color-primary-hover);
}

.add-recipe-footer__btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
