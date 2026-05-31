<script setup lang="ts">
const { compact = false } = defineProps<{
  compact?: boolean
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <label class="recipe-search" :class="{ 'recipe-search--compact': compact }">
    <svg
      class="recipe-search__icon"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M12.5 12.5 L15.5 15.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
    <input
      v-model="model"
      type="search"
      class="recipe-search__input"
      placeholder="Search recipes"
      aria-label="Search recipes"
    />
  </label>
</template>

<style scoped>
.recipe-search {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-card);
}

.recipe-search__icon {
  flex-shrink: 0;
  color: var(--color-text-placeholder);
}

.recipe-search__input {
  flex: 1;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: var(--font-size-base);
  color: var(--color-text);
  outline: none;
  min-width: 0;
}

.recipe-search__input::placeholder {
  color: var(--color-text-placeholder);
}

.recipe-search--compact {
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
}

.recipe-search--compact .recipe-search__input {
  font-size: 0.875rem;
}
</style>
