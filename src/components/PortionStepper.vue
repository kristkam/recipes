<script setup lang="ts">
const { portions, min = 1, max = 20 } = defineProps<{
  portions: number
  min?: number
  max?: number
}>()

const emit = defineEmits<{
  increment: []
  decrement: []
}>()

const canDecrement = (): boolean => portions > min
const canIncrement = (): boolean => portions < max
</script>

<template>
  <div class="portion-stepper">
    <span class="portion-stepper__label">Portions:</span>
    <div class="portion-stepper__controls" role="group" aria-label="Adjust portions">
      <button
        type="button"
        class="portion-stepper__btn"
        :disabled="!canDecrement()"
        aria-label="Decrease portions"
        @click="emit('decrement')"
      >
        −
      </button>
      <span class="portion-stepper__value" aria-live="polite">{{ portions }}</span>
      <button
        type="button"
        class="portion-stepper__btn"
        :disabled="!canIncrement()"
        aria-label="Increase portions"
        @click="emit('increment')"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.portion-stepper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.portion-stepper__label {
  font-size: var(--font-size-base);
  font-weight: 600;
  color: var(--color-text);
}

.portion-stepper__controls {
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.portion-stepper__btn {
  width: 2.5rem;
  height: 2.25rem;
  border: none;
  background: var(--color-chip);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;
}

.portion-stepper__btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.6);
}

.portion-stepper__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.portion-stepper__btn:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 1px;
}

.portion-stepper__value {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.5rem;
  padding: 0 0.5rem;
  border-left: 1px solid var(--color-border);
  border-right: 1px solid var(--color-border);
  background: var(--color-surface);
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--color-text);
}
</style>
