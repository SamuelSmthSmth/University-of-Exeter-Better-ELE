import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { exec } from 'child_process'

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

function betterEleSyncPlugin() {
  return {
    name: 'better-ele-sync-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/sync-ele', async (_req: any, res: any) => {
        exec('python3 scripts/sync_ele.py', { cwd: __dirname }, (error: any, stdout: string, stderr: string) => {
          res.setHeader('Content-Type', 'application/json');
          if (error) {
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: stderr || error.message }));
            return;
          }
          try {
            const jsonStart = stdout.lastIndexOf('{');
            const jsonStr = stdout.slice(jsonStart);
            res.statusCode = 200;
            res.end(jsonStr);
          } catch (e) {
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Sync complete', logs: [] }));
          }
        });
      });
    }
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    betterEleSyncPlugin(),
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
