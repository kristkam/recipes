<script setup lang="ts">
const { padding = 'default' } = defineProps<{
  padding?: 'default' | 'compact'
}>()
</script>

<template>
  <div class="app-card" :class="`app-card--padding-${padding}`">
    <slot />
  </div>
</template>

<style scoped>
.app-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.app-card--padding-compact {
  padding: 0.625rem 0.75rem;
}

.app-card--padding-default {
  padding: 1rem 1.125rem 1.25rem;
}
</style>
