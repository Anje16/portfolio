import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Built into ../synapsex so the static portfolio serves it at /synapsex/ without a build step.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../synapsex',
    emptyOutDir: true,
  },
})
