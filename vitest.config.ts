import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/**',
        '.next/**',
        'scripts/wasm-game-of-life/pkg/**',
        '**/*.d.ts',
        'coverage/**'
      ]
    },
  },
  resolve: {
    alias: {
      scripts: resolve(__dirname, './scripts'),
      '@': resolve(__dirname, './'),
      '@/pages': resolve(__dirname, './pages'),
      '@/styles': resolve(__dirname, './styles')
    },
  },
});