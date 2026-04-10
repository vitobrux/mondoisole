export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  KV: KVNamespace;
  JWT_SECRET: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD_HASH: string;
}

import { handlePublicRoutes } from './routes/public';
import { handleAdminRoutes } from './routes/admin';
import { corsHeaders, errorResponse } from './utils/response';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request) });
    }

    try {
      // Serve R2 assets publicly: /assets/images/xxx.jpg
      if (path.startsWith('/assets/') && request.method === 'GET') {
        const key = path.slice('/assets/'.length);
        if (!key) return errorResponse('Not found', 404, request);

        // Try KV cache first
        const cached = await env.KV.get(`r2:${key}`, 'arrayBuffer');
        if (cached) {
          const ext = key.split('.').pop() || '';
          return new Response(cached, {
            headers: {
              'Content-Type': getMimeType(ext),
              'Cache-Control': 'public, max-age=31536000, immutable',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }

        const object = await env.R2.get(key);
        if (!object) return errorResponse('Not found', 404, request);

        const body = await object.arrayBuffer();

        // Cache in KV for 24h (non-blocking)
        env.KV.put(`r2:${key}`, body, { expirationTtl: 86400 }).catch(() => {});

        return new Response(body, {
          headers: {
            'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Access-Control-Allow-Origin': '*',
            'ETag': object.etag,
          },
        });
      }

      // Public API routes
      if (path.startsWith('/api/offers') || path.startsWith('/api/contact')) {
        return await handlePublicRoutes(request, env, url);
      }

      // Admin API routes
      if (path.startsWith('/api/admin')) {
        return await handleAdminRoutes(request, env, url);
      }

      return errorResponse('Not found', 404, request);
    } catch (err) {
      console.error('Worker error:', err);
      return errorResponse('Internal server error', 500, request);
    }
  },
};

function getMimeType(ext: string): string {
  const types: Record<string, string> = {
    jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png',
    webp: 'image/webp', avif: 'image/avif', svg: 'image/svg+xml',
    gif: 'image/gif', pdf: 'application/pdf',
  };
  return types[ext.toLowerCase()] || 'application/octet-stream';
}
