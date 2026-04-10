import { API_BASE } from './constants';
import type { Offer, ContactRequest } from '../types';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }
  return res.json();
}

// ── Public API ──
export async function getPublishedOffers(): Promise<Offer[]> {
  return fetchJSON('/offers?status=published');
}

export async function getOffersByDestination(destination: string): Promise<Offer[]> {
  return fetchJSON(`/offers?destination=${encodeURIComponent(destination)}&status=published`);
}

export async function getOfferBySlug(id: string): Promise<Offer> {
  return fetchJSON(`/offers/${encodeURIComponent(id)}`);
}

export async function getFeaturedOffers(): Promise<Offer[]> {
  return fetchJSON('/offers?featured=true&status=published');
}

export async function submitContactForm(data: Omit<ContactRequest, 'id' | 'createdAt' | 'read'>): Promise<{ success: boolean }> {
  return fetchJSON('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ── Admin API ──
function authHeaders(token: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function adminLogin(email: string, password: string): Promise<{ token: string }> {
  return fetchJSON('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function adminGetOffers(token: string): Promise<Offer[]> {
  return fetchJSON('/admin/offers', { headers: authHeaders(token) });
}

export async function adminCreateOffer(token: string, offer: Partial<Offer>): Promise<Offer> {
  return fetchJSON('/admin/offers', {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(offer),
  });
}

export async function adminUpdateOffer(token: string, id: string, offer: Partial<Offer>): Promise<Offer> {
  return fetchJSON(`/admin/offers/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify(offer),
  });
}

export async function adminDeleteOffer(token: string, id: string): Promise<void> {
  await fetchJSON(`/admin/offers/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
}

export async function adminUploadImage(token: string, file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function adminGetContacts(token: string): Promise<ContactRequest[]> {
  return fetchJSON('/admin/contacts', { headers: authHeaders(token) });
}
