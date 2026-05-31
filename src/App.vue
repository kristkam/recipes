<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <main class="app__frame">
      <div class="app__route">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  background: var(--color-bg-outer);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100dvh;
}
</style>

<style scoped>
.app {
  min-height: 100dvh;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1rem;
  overflow: hidden;
}

.app__frame {
  width: 100%;
  max-width: 23.75rem;
  height: 100%;
  max-height: 100%;
  background: var(--color-bg-app);
  border-radius: 2.25rem;
  box-shadow: var(--shadow-frame);
  padding: 1rem var(--space-page-x) 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.app__route {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

@media (min-width: 480px) {
  .app {
    padding: 1rem;
  }

  .app__frame {
    max-width: 24rem;
    max-height: min(42rem, calc(100dvh - 2rem));
  }
}
</style>
