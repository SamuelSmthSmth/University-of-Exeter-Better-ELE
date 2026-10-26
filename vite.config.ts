import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import https from 'node:https'
import http from 'node:http'
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

function betterElePanoptoPlugin() {
  const deliveryCache = new Map<string, any>();

  function getPanoptoCookies(): string {
    try {
      if (fs.existsSync('/tmp/zen_session.json')) {
        const data = JSON.parse(fs.readFileSync('/tmp/zen_session.json', 'utf8'));
        const cookies = (data.cookies || []).filter((c: any) => c.host && c.host.includes('panopto'));
        return cookies.map((c: any) => `${c.name}=${c.value}`).join('; ');
      }
    } catch (e: any) {
      console.error('[PanoptoProxy] Cookie read error:', e.message);
    }
    return '';
  }

  function rewriteM3u8(content: string, baseUrlStr: string): string {
    const baseUrl = new URL(baseUrlStr);
    const lines = content.split('\n');
    const out: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        out.push(line);
        continue;
      }
      if (trimmed.startsWith('#EXT-X-MAP:URI=')) {
        const match = trimmed.match(/#EXT-X-MAP:URI="([^"]+)"(.*)/);
        if (match) {
          const resolved = new URL(match[1], baseUrl);
          if (!resolved.search && baseUrl.search) resolved.search = baseUrl.search;
          out.push(`#EXT-X-MAP:URI="/api/panopto-proxy?url=${encodeURIComponent(resolved.toString())}"${match[2]}`);
          continue;
        }
      }
      if (trimmed.startsWith('#')) {
        out.push(line);
      } else {
        const resolved = new URL(trimmed, baseUrl);
        if (!resolved.search && baseUrl.search) resolved.search = baseUrl.search;
        out.push(`/api/panopto-proxy?url=${encodeURIComponent(resolved.toString())}`);
      }
    }
    return out.join('\n');
  }

  function postPanopto(endpoint: string, postData: string, cookieHeader: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const opt = {
        hostname: 'recapexeter.cloud.panopto.eu',
        port: 443,
        path: endpoint,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
          'Cookie': cookieHeader,
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
        },
      };
      const req = https.request(opt, (panoptoRes: any) => {
        let body = '';
        panoptoRes.on('data', (d: any) => (body += d));
        panoptoRes.on('end', () => resolve(body));
      });
      req.on('error', reject);
      req.setTimeout(8000, () => {
        req.destroy();
        reject(new Error('Timeout'));
      });
      req.write(postData);
      req.end();
    });
  }

  return {
    name: 'better-ele-panopto-plugin',
    configureServer(server: any) {
      // 1. DeliveryInfo endpoint: /api/panopto-delivery/:id or ?id=:id
      server.middlewares.use('/api/panopto-delivery', async (req: any, res: any) => {
        const parsedUrl = new URL(req.url, 'http://localhost');
        const pathParts = parsedUrl.pathname.split('/').filter(Boolean);
        const deliveryId = pathParts[0] || parsedUrl.searchParams.get('id');

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (!deliveryId) {
          res.statusCode = 400;
          res.end(JSON.stringify({ success: false, error: 'Missing delivery ID' }));
          return;
        }

        if (deliveryCache.has(deliveryId)) {
          res.statusCode = 200;
          res.end(JSON.stringify(deliveryCache.get(deliveryId)));
          return;
        }

        const deliveryPostData = `deliveryId=${encodeURIComponent(deliveryId)}&responseType=json`;
        const captionPostData = `deliveryId=${encodeURIComponent(deliveryId)}&getCaptions=true&language=1&responseType=json`;
        const cookieHeader = getPanoptoCookies();

        try {
          const [deliveryBody, captionBody] = await Promise.all([
            postPanopto('/Panopto/Pages/Viewer/DeliveryInfo.aspx', deliveryPostData, cookieHeader),
            postPanopto('/Panopto/Pages/Viewer/DeliveryInfo.aspx', captionPostData, cookieHeader).catch(() => '[]'),
          ]);

          const json = JSON.parse(deliveryBody);
          const delivery = json.Delivery || {};
          const rawStreams = delivery.Streams || [];
          const streams = rawStreams
            .filter((s: any) => s.StreamUrl)
            .map((s: any) => ({
              id: s.PublicId || s.StreamId || String(Math.random()),
              tag: s.Tag || (s.StreamType === 1 ? 'dv' : 'object'),
              name: s.Name || (s.StreamType === 1 ? 'Camera & Audio' : 'Lecture Screen/Visualiser'),
              streamType: s.StreamType || (s.Tag === 'dv' ? 1 : 2),
              rawUrl: s.StreamUrl,
              m3u8: `/api/panopto-proxy?url=${encodeURIComponent(s.StreamUrl)}`,
            }));

          let captions: any[] = [];
          try {
            const rawCaptions = JSON.parse(captionBody);
            if (Array.isArray(rawCaptions)) {
              captions = rawCaptions.map((c: any) => ({
                time: typeof c.Time === 'number' ? c.Time : 0,
                duration: typeof c.CaptionDuration === 'number' ? c.CaptionDuration : 3.0,
                text: (c.Caption || '').trim(),
              })).filter((c: any) => c.text.length > 0);
            }
          } catch {
            captions = [];
          }

          const result = {
            success: true,
            sessionName: delivery.SessionName || 'Panopto Recording',
            duration: delivery.Duration || 0,
            hasCaptions: captions.length > 0,
            captions,
            streams,
          };

          deliveryCache.set(deliveryId, result);
          res.statusCode = 200;
          res.end(JSON.stringify(result));
        } catch (err: any) {
          res.statusCode = 502;
          res.end(JSON.stringify({ success: false, error: err.message || 'Failed to fetch Panopto DeliveryInfo' }));
        }
      });

      // 2. Stream & Chunk Proxy: /api/panopto-proxy?url=...
      server.middlewares.use('/api/panopto-proxy', async (req: any, res: any) => {
        // Preflight CORS
        if (req.method === 'OPTIONS') {
          res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
            'Access-Control-Allow-Headers': '*',
          });
          res.end();
          return;
        }

        const parsedReq = new URL(req.url, 'http://localhost');
        const targetUrlStr = parsedReq.searchParams.get('url');

        if (!targetUrlStr) {
          res.statusCode = 400;
          res.end('Missing url parameter');
          return;
        }

        let targetUrl: URL;
        try {
          targetUrl = new URL(targetUrlStr);
        } catch {
          res.statusCode = 400;
          res.end('Invalid URL');
          return;
        }

        const client = targetUrl.protocol === 'https:' ? https : http;
        const forwardHeaders: Record<string, string> = {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)',
          Accept: '*/*',
        };

        if (req.headers.range) {
          forwardHeaders['Range'] = req.headers.range;
        }

        const clientReq = client.get(
          targetUrlStr,
          { headers: forwardHeaders },
          (remoteRes: any) => {
            const contentType = remoteRes.headers['content-type'] || '';
            const isM3u8 =
              targetUrl.pathname.endsWith('.m3u8') ||
              contentType.includes('mpegurl') ||
              contentType.includes('application/x-mpegURL');

            if (isM3u8) {
              let body = '';
              remoteRes.on('data', (chunk: any) => (body += chunk));
              remoteRes.on('end', () => {
                const rewritten = rewriteM3u8(body, targetUrlStr);
                res.writeHead(200, {
                  'Content-Type': 'application/vnd.apple.mpegurl',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': '*',
                  'Access-Control-Expose-Headers': '*',
                  'Cache-Control': 'no-cache',
                });
                res.end(rewritten);
              });
            } else {
              // Video chunk (mp4 / ts / init segment)
              const responseHeaders: Record<string, any> = {
                'Content-Type': remoteRes.headers['content-type'] || 'video/mp4',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Content-Type, Accept-Ranges',
                'Accept-Ranges': 'bytes',
              };

              if (remoteRes.headers['content-range']) {
                responseHeaders['Content-Range'] = remoteRes.headers['content-range'];
              }
              if (remoteRes.headers['content-length']) {
                responseHeaders['Content-Length'] = remoteRes.headers['content-length'];
              }

              res.writeHead(remoteRes.statusCode || 200, responseHeaders);
              remoteRes.pipe(res);
            }
          }
        );

        clientReq.on('error', (err: any) => {
          if (!res.headersSent) {
            res.statusCode = 502;
            res.end(`Proxy error: ${err.message}`);
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    betterEleSyncPlugin(),
    betterElePanoptoPlugin(),
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
