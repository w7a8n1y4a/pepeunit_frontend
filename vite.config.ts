import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      filename: 'dist/stats.html',
      template: 'treemap',
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@rootTypes': path.resolve(import.meta.dirname, './src/rootTypes'),
      '@stores': path.resolve(import.meta.dirname, './src/components/stores'),
      '@handlers': path.resolve(import.meta.dirname, './src/handlers'),
      '@primitives': path.resolve(import.meta.dirname, './src/components/forms/primitives'),
    }
  }
})
