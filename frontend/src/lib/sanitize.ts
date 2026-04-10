const DANGEROUS_TAGS = /<\/?(?:script|iframe|object|embed|form|input|link|style|meta|base)[^>]*>/gi;
const EVENT_HANDLERS = /\bon\w+\s*=/gi;

export function sanitizeText(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function stripHtml(input: string): string {
  return input
    .replace(DANGEROUS_TAGS, '')
    .replace(EVENT_HANDLERS, '')
    .trim();
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  return /^\d{6,15}$/.test(cleaned);
}
