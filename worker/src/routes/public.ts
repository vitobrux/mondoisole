import type { Env } from '../index';
import { jsonResponse, errorResponse } from '../utils/response';
import { sanitizeString, validateEmail, validatePhone } from '../utils/sanitize';

// Rate limiting: simple in-memory counter (resets on Worker restart)
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5; // max 5 requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = contactAttempts.get(ip);
  if (!entry || entry.resetAt < now) {
    contactAttempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function handlePublicRoutes(request: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname;

  // GET /api/offers — list published offers
  if (path === '/api/offers' && request.method === 'GET') {
    const destination = url.searchParams.get('destination');
    const featured = url.searchParams.get('featured');
    const status = url.searchParams.get('status') || 'published';

    let query = 'SELECT * FROM offers WHERE status = ?1';
    const params: unknown[] = [status];
    let paramIndex = 2;

    if (destination) {
      query += ` AND destination = ?${paramIndex}`;
      params.push(destination);
      paramIndex++;
    }
    if (featured === 'true') {
      query += ` AND featured = 1`;
    }

    query += ' ORDER BY created_at DESC LIMIT 50';

    const results = await env.DB.prepare(query).bind(...params).all();
    const offers = (results.results || []).map(parseOfferRow);
    return jsonResponse(offers);
  }

  // GET /api/offers/:id — single offer
  if (path.startsWith('/api/offers/') && request.method === 'GET') {
    const id = path.split('/api/offers/')[1];
    if (!id) return errorResponse('Missing offer ID', 400);

    const result = await env.DB.prepare('SELECT * FROM offers WHERE id = ?1 AND status = ?2').bind(id, 'published').first();
    if (!result) return errorResponse('Offer not found', 404);
    return jsonResponse(parseOfferRow(result));
  }

  // POST /api/contact — submit contact form
  if (path === '/api/contact' && request.method === 'POST') {
    const clientIP = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return errorResponse('Troppe richieste. Riprova più tardi.', 429);
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON', 400);
    }

    const name = sanitizeString(body.name);
    const email = sanitizeString(body.email);
    const phone = sanitizeString(body.phone);
    const message = sanitizeString(body.message);
    const offerId = sanitizeString(body.offerId);

    if (!name || name.length < 2) return errorResponse('Nome richiesto.', 400);
    if (!validateEmail(email)) return errorResponse('Email non valida.', 400);
    if (!validatePhone(phone)) return errorResponse('Telefono non valido.', 400);
    if (!message || message.length < 10) return errorResponse('Messaggio troppo breve.', 400);

    const id = crypto.randomUUID();
    await env.DB.prepare(
      'INSERT INTO contacts (id, name, email, phone, message, offer_id, created_at, read) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 0)'
    ).bind(id, name, email, phone, message, offerId || null, new Date().toISOString()).run();

    return jsonResponse({ success: true });
  }

  return errorResponse('Not found', 404);
}

function parseOfferRow(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    destination: row.destination,
    coverImage: row.cover_image,
    gallery: row.gallery ? JSON.parse(row.gallery as string) : [],
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    priceFrom: row.price_from,
    priceType: row.price_type,
    datesAvailable: row.dates_available,
    services: row.services ? JSON.parse(row.services as string) : [],
    hotelStars: row.hotel_stars,
    status: row.status,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
