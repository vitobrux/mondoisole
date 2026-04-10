const ALLOWED_ORIGINS = [
  'https://mondoisole.pages.dev',
  'https://mondoisole.net',
  'https://www.mondoisole.net',
  'http://localhost:5173',
];

export function getCorsOrigin(request: Request): string {
  const origin = request.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  // Allow *.mondoisole.pages.dev preview deployments
  if (origin.endsWith('.mondoisole.pages.dev')) return origin;
  return ALLOWED_ORIGINS[0];
}

export function corsHeaders(request?: Request): HeadersInit {
  const origin = request ? getCorsOrigin(request) : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  };
}

export function jsonResponse(data: unknown, status = 200, request?: Request): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders(request),
    },
  });
}

export function errorResponse(message: string, status = 400, request?: Request): Response {
  return jsonResponse({ error: message }, status, request);
}
