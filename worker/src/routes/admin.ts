import type { Env } from '../index';
import { jsonResponse, errorResponse } from '../utils/response';
import { createToken, authenticateRequest, verifyPassword } from '../utils/auth';
import { sanitizeString } from '../utils/sanitize';

export async function handleAdminRoutes(request: Request, env: Env, url: URL): Promise<Response> {
  const path = url.pathname;

  // POST /api/admin/login
  if (path === '/api/admin/login' && request.method === 'POST') {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON', 400, request);
    }

    const email = sanitizeString(body.email);
    const password = typeof body.password === 'string' ? body.password : '';

    if (email !== env.ADMIN_EMAIL) {
      return errorResponse('Credenziali non valide.', 401, request);
    }

    const valid = await verifyPassword(password, env.ADMIN_PASSWORD_HASH);
    if (!valid) {
      return errorResponse('Credenziali non valide.', 401, request);
    }

    const token = await createToken({ email, role: 'admin' }, env.JWT_SECRET);
    return jsonResponse({ token }, 200, request);
  }

  // All other admin routes require authentication
  const authenticated = await authenticateRequest(request, env);
  if (!authenticated) {
    return errorResponse('Non autorizzato.', 401, request);
  }

  // GET /api/admin/offers
  if (path === '/api/admin/offers' && request.method === 'GET') {
    const results = await env.DB.prepare('SELECT * FROM offers ORDER BY created_at DESC').all();
    const offers = (results.results || []).map(parseOfferRow);
    return jsonResponse(offers, 200, request);
  }

  // POST /api/admin/offers — create
  if (path === '/api/admin/offers' && request.method === 'POST') {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON', 400, request);
    }

    const id = crypto.randomUUID();
    const now = new Date().toISOString();
    const title = sanitizeString(body.title);
    if (!title) return errorResponse('Titolo richiesto.', 400, request);

    await env.DB.prepare(`
      INSERT INTO offers (id, title, destination, cover_image, gallery, short_description, full_description, price_from, price_type, dates_available, services, hotel_stars, status, featured, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)
    `).bind(
      id, title,
      sanitizeString(body.destination) || 'croazia',
      sanitizeString(body.coverImage),
      JSON.stringify(Array.isArray(body.gallery) ? body.gallery : []),
      sanitizeString(body.shortDescription),
      sanitizeString(body.fullDescription),
      Number(body.priceFrom) || 0,
      sanitizeString(body.priceType) || 'p.p.',
      sanitizeString(body.datesAvailable),
      JSON.stringify(Array.isArray(body.services) ? body.services : []),
      Number(body.hotelStars) || 4,
      sanitizeString(body.status) || 'draft',
      body.featured ? 1 : 0,
      now, now
    ).run();

    const offer = await env.DB.prepare('SELECT * FROM offers WHERE id = ?1').bind(id).first();
    return jsonResponse(parseOfferRow(offer!), 201, request);
  }

  // PUT /api/admin/offers/:id — update
  if (path.startsWith('/api/admin/offers/') && request.method === 'PUT') {
    const id = path.split('/api/admin/offers/')[1];
    if (!id) return errorResponse('Missing ID', 400, request);

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return errorResponse('Invalid JSON', 400, request);
    }

    const existing = await env.DB.prepare('SELECT * FROM offers WHERE id = ?1').bind(id).first();
    if (!existing) return errorResponse('Offerta non trovata.', 404, request);

    const now = new Date().toISOString();
    await env.DB.prepare(`
      UPDATE offers SET title=?1, destination=?2, cover_image=?3, gallery=?4, short_description=?5, full_description=?6, price_from=?7, price_type=?8, dates_available=?9, services=?10, hotel_stars=?11, status=?12, featured=?13, updated_at=?14
      WHERE id=?15
    `).bind(
      sanitizeString(body.title) || existing.title,
      sanitizeString(body.destination) || existing.destination,
      sanitizeString(body.coverImage) ?? existing.cover_image,
      JSON.stringify(Array.isArray(body.gallery) ? body.gallery : JSON.parse(existing.gallery as string || '[]')),
      sanitizeString(body.shortDescription) ?? existing.short_description,
      sanitizeString(body.fullDescription) ?? existing.full_description,
      body.priceFrom !== undefined ? Number(body.priceFrom) : existing.price_from,
      sanitizeString(body.priceType) || existing.price_type,
      sanitizeString(body.datesAvailable) ?? existing.dates_available,
      JSON.stringify(Array.isArray(body.services) ? body.services : JSON.parse(existing.services as string || '[]')),
      body.hotelStars !== undefined ? Number(body.hotelStars) : existing.hotel_stars,
      sanitizeString(body.status) || existing.status,
      body.featured !== undefined ? (body.featured ? 1 : 0) : existing.featured,
      now,
      id
    ).run();

    const updated = await env.DB.prepare('SELECT * FROM offers WHERE id = ?1').bind(id).first();
    return jsonResponse(parseOfferRow(updated!), 200, request);
  }

  // DELETE /api/admin/offers/:id
  if (path.startsWith('/api/admin/offers/') && request.method === 'DELETE') {
    const id = path.split('/api/admin/offers/')[1];
    if (!id) return errorResponse('Missing ID', 400, request);
    await env.DB.prepare('DELETE FROM offers WHERE id = ?1').bind(id).run();
    return jsonResponse({ success: true }, 200, request);
  }

  // POST /api/admin/upload — upload image to R2
  if (path === '/api/admin/upload' && request.method === 'POST') {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return errorResponse('No file provided.', 400, request);

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse('Tipo di file non supportato. Usa JPG, PNG, WebP o AVIF.', 400, request);
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return errorResponse('File troppo grande. Massimo 10MB.', 400, request);
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const key = `images/${crypto.randomUUID()}.${ext}`;
    await env.R2.put(key, file.stream(), {
      httpMetadata: { contentType: file.type },
    });

    // Return the public URL (served via Worker /assets/ route)
    const publicUrl = `https://mondoisole.vito-brullo-brux.workers.dev/assets/${key}`;
    return jsonResponse({ url: publicUrl }, 200, request);
  }

  // GET /api/admin/contacts
  if (path === '/api/admin/contacts' && request.method === 'GET') {
    const results = await env.DB.prepare('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 100').all();
    const contacts = (results.results || []).map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      message: row.message,
      offerId: row.offer_id,
      createdAt: row.created_at,
      read: Boolean(row.read),
    }));
    return jsonResponse(contacts, 200, request);
  }

  return errorResponse('Not found', 404, request);
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
