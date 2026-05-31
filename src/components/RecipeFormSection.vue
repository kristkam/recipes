<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'

defineProps<{
  heading: string
}>()
</script>

<template>
  <AppCard class="recipe-form-section">
    <h2 class="recipe-form-section__heading">{{ heading }}</h2>
    <slot />
  </AppCard>
</template>

<style scoped>
.recipe-form-section {
  margin-bottom: 0;
}

.recipe-form-section__heading {
  margin: 0 0 1rem;
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
}
</style>
