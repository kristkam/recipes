<script setup lang="ts">
const { size = 'md' } = defineProps<{
  size?: 'sm' | 'md'
}>()

const dimensions = {
  sm: { width: 64, height: 52 },
  md: { width: 88, height: 72 },
} as const

const { width, height } = dimensions[size]
</script>

<template>
  <div class="meal-illustration" aria-hidden="true">
    <svg :width="width" :height="height" viewBox="0 0 88 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="44"
        cy="42"
        rx="30"
        ry="11"
        stroke="var(--color-illustration)"
        stroke-width="1.25"
        fill="none"
      />
      <circle
        cx="44"
        cy="34"
        r="20"
        stroke="var(--color-illustration)"
        stroke-width="1.25"
        fill="var(--color-bg-app)"
      />
      <path
        d="M16 22 L16 50 M14 22 L18 22"
        stroke="var(--color-illustration)"
        stroke-width="1.25"
        stroke-linecap="round"
      />
      <path
        d="M72 22 L72 50 M70 22 L74 22"
        stroke="var(--color-illustration)"
        stroke-width="1.25"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<style scoped>
.meal-illustration {
  display: flex;
  justify-content: center;
  line-height: 0;
}
</style>
