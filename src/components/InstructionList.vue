<script setup lang="ts">
const { instructions } = defineProps<{
  instructions: string[]
}>()
</script>

<template>
  <section class="instruction-list">
    <h2 class="instruction-list__heading">Instructions</h2>
    <ol class="instruction-list__items">
      <li v-for="(step, index) in instructions" :key="index" class="instruction-list__item">
        <span class="instruction-list__number">{{ index + 1 }}.</span>
        <span class="instruction-list__text">{{ step }}</span>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.instruction-list__heading {
  margin: 0 0 0.875rem;
  padding-bottom: 0.875rem;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
}

.instruction-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
}

.instruction-list__item {
  display: flex;
  gap: 0.5rem;
  padding: 0.375rem 0;
  font-size: var(--font-size-base);
  line-height: 1.55;
}

.instruction-list__number {
  flex-shrink: 0;
  font-weight: 700;
  color: var(--color-text);
}

.instruction-list__text {
  flex: 1;
  color: var(--color-text);
  font-weight: 400;
}
</style>
