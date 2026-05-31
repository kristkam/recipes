<script setup lang="ts">
import MealIllustration from '@/components/MealIllustration.vue'

const emit = defineEmits<{
  addRecipe: []
}>()
</script>

<template>
  <section class="empty-state" aria-label="No recipes">
    <MealIllustration class="empty-state__illustration" />
    <h2 class="empty-state__heading">No recipes yet.</h2>
    <p class="empty-state__text">Start building your collection.</p>
    <button type="button" class="empty-state__cta" @click="emit('addRecipe')">
      Add Your First Recipe
    </button>
  </section>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 0.5rem 1rem;
  text-align: center;
  margin-top: auto;
}

.empty-state__illustration {
  margin-bottom: 1.5rem;
}

.empty-state__heading {
  margin: 0 0 0.25rem;
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.empty-state__text {
  margin: 0 0 1.75rem;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.empty-state__cta {
  width: 100%;
  max-width: 17.5rem;
  padding: 0.9375rem 1.5rem;
  background: var(--color-primary);
  color: var(--color-primary-text);
  border: none;
  border-radius: var(--radius-full);
  font-family: inherit;
  font-size: var(--font-size-base);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease;
}

.empty-state__cta:hover {
  background: var(--color-primary-hover);
}

.empty-state__cta:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
