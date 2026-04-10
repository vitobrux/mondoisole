import type { Env } from '../index';

// Simple JWT-like token using HMAC-SHA256
// For production, consider a proper JWT library compatible with Workers

export async function createToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 8 * 60 * 60 * 1000 })); // 8h expiry
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return `${data}.${signature}`;
}

export async function verifyToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const [header, body, signature] = parts;
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  const sigBytes = Uint8Array.from(atob(signature), (c) => c.charCodeAt(0));
  const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data));
  if (!valid) return null;

  const payload = JSON.parse(atob(body));
  if (payload.exp && payload.exp < Date.now()) return null;

  return payload;
}

export async function authenticateRequest(request: Request, env: Env): Promise<boolean> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;

  const token = authHeader.slice(7);
  const payload = await verifyToken(token, env.JWT_SECRET);
  return payload !== null;
}

// Simple password verification using SHA-256
// The stored hash is a hex-encoded SHA-256 of the password
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  const hashHex = Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex === storedHash;
}
