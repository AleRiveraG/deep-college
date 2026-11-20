import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.jsx', 'src/pages/Login.jsx'],
      reporter: ['text', 'html'],
      // minimo 60% en cada archivo medido (si alguno baja, el comando falla)
      thresholds: {
        perFile: true,
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
})