import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Открыть отчет в браузере после сборки
      filename: 'dist/stats.html', // Путь к HTML-отчету
      template: 'treemap', // Формат визуализации: treemap, sunburst, или network
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@rootTypes': path.resolve(__dirname, './src/rootTypes'),
      '@stores': path.resolve(__dirname, './src/components/stores'),
      '@handlers': path.resolve(__dirname, './src/handlers'),
      '@primitives': path.resolve(__dirname, './src/components/forms/primitives'),
    }
  }
})
