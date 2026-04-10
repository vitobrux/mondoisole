export interface Env {
  DB: D1Database;
  R2: R2Bucket;
  JWT_SECRET: string;
  ADMIN_EMAIL: string;
  ADMIN_PASSWORD_HASH: string;
}

import { handlePublicRoutes } from './routes/public';
import { handleAdminRoutes } from './routes/admin';
import { corsHeaders, jsonResponse, errorResponse } from './utils/response';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    try {
      // Public API routes
      if (path.startsWith('/api/offers') || path.startsWith('/api/contact')) {
        return await handlePublicRoutes(request, env, url);
      }

      // Admin API routes
      if (path.startsWith('/api/admin')) {
        return await handleAdminRoutes(request, env, url);
      }

      return errorResponse('Not found', 404);
    } catch (err) {
      console.error('Worker error:', err);
      return errorResponse('Internal server error', 500);
    }
  },
};
