import { fileURLToPath, URL } from 'node:url'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/recipes',
  server: {
    port: 5173,
  },
  preview: {
    port: 4173,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    react(),
  ],
})
