import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

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
      // Route /timeedit-api/* → https://uk-exeter.studyguide.timeedit.net/api/*
      '/timeedit-api': {
        target: 'https://uk-exeter.studyguide.timeedit.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/timeedit-api/, '/api'),
      },
      // Route /mytimetable-api/* → https://mytimetable.exeter.ac.uk/*
      '/mytimetable-api': {
        target: 'https://mytimetable.exeter.ac.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mytimetable-api/, ''),
      },
    },
  },
})
