import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  head:[
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.ico'}],
    ['meta', { name: 'theme-color', content: '#00bf30' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:title', content: 'Pepeunit | Federative IoT Platform' }],
    ['meta', { property: 'og:site_name', content: 'Pepeunit' }],
    ['meta', { property: 'og:description', content: 'Federative IoT Platform' }],
    ['meta', { property: 'og:image', content: process.env.VITE_SELF_URI + '/pepeunit-og.jpg' }],
    ['meta', { property: 'og:url', content: process.env.VITE_SELF_URI }],
  ],

})
