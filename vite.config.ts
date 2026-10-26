import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    proxy: {
      // Exeter Library Exam Papers endpoint (bypasses browser CORS)
      '/library-api': {
        target: 'https://library.exeter.ac.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/library-api/, ''),
      },
      // ELE 2 Moodle API proxy
      '/ele-api': {
        target: 'https://ele.exeter.ac.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ele-api/, ''),
      },
      // TimeEdit Programme & Module API
      '/timeedit-api': {
        target: 'https://uk-exeter.studyguide.timeedit.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timeedit-api/, '/api'),
      },
    },
  },
})
